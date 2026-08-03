"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";
import { revalidatePublicSite } from "@/app/actions/revalidate";
import type { CmsEntity } from "@/lib/cms";

interface Row {
  id: string;
  [key: string]: unknown;
}

export default function CmsEditor({
  cms,
  rows,
}: {
  cms: CmsEntity;
  rows: Row[];
}) {
  const router = useRouter();
  const [editing, setEditing] = useState<Row | null>(null);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  async function saveRow() {
    if (!supabaseClient) return;
    setBusy(true);

    const payload: Record<string, unknown> = {};
    for (const f of cms.fields) {
      const raw = draft[f.name] ?? "";
      if (f.type === "checkbox") {
        payload[f.name] = raw === "true";
      } else if (f.type === "number") {
        payload[f.name] = Number(raw) || 0;
      } else if (f.type === "json") {
        try {
          payload[f.name] = raw ? JSON.parse(raw) : [];
        } catch {
          alert(`"${f.label}" must be valid JSON.`);
          setBusy(false);
          return;
        }
      } else {
        payload[f.name] = raw;
      }
    }

    // New rows: auto-assign the next sort_order if not provided,
    // and fill required-ish defaults so inserts never fail.
    if (!editing) {
      if (payload.sort_order === 0 || payload.sort_order === undefined) {
        payload.sort_order = rows.length; // append at the end
      }
      // key is UNIQUE on experience/projects/cv_targets — generate one if empty
      if (cms.fields.some((f) => f.name === "key") && !draft["key"]) {
        payload.key =
          "item-" + Date.now().toString(36).slice(-6);
      }
      // JSON fields default to [] / {} so NOT NULL jsonb never fails
      for (const f of cms.fields) {
        if (f.type === "json" && (payload[f.name] === undefined || payload[f.name] === null)) {
          payload[f.name] = [];
        }
      }
    }

    const { error } = editing
      ? await supabaseClient.from(cms.table).update(payload).eq("id", editing.id)
      : await supabaseClient.from(cms.table).insert(payload);

    setBusy(false);
    if (error) {
      alert("Save failed: " + error.message);
      return;
    }
    setEditing(null);
    router.refresh();
    // Revalidate the public site so edits appear live immediately
    await revalidatePublicSite();
  }

  async function removeRow(id: string) {
    if (!confirm("Delete this row?")) return;
    if (!supabaseClient) return;
    const { error } = await supabaseClient.from(cms.table).delete().eq("id", id);
    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }
    router.refresh();
    // Revalidate the public site so deletions appear live immediately
    await revalidatePublicSite();
  }

  // Swap sort_order with the adjacent row to reorder (priority) visually
  async function moveRow(id: string, dir: -1 | 1) {
    if (!supabaseClient) return;
    const idx = rows.findIndex((r) => r.id === id);
    const other = rows[idx + dir];
    if (!other) return;
    const a = Number(rows[idx].sort_order ?? idx);
    const b = Number(other.sort_order ?? idx + dir);
    // Swap the two sort_order values atomically
    const { error: e1 } = await supabaseClient
      .from(cms.table)
      .update({ sort_order: b })
      .eq("id", id);
    const { error: e2 } = await supabaseClient
      .from(cms.table)
      .update({ sort_order: a })
      .eq("id", other.id);
    if (e1 || e2) {
      console.error("Reorder failed:", e1?.message ?? e2?.message);
      alert("Reorder failed. Please try again.");
      return;
    }
    router.refresh();
    await revalidatePublicSite();
  }

  function startEdit(row: Row | null) {
    setEditing(row);
    const d: Record<string, string> = {};
    for (const f of cms.fields) {
      const v = row?.[f.name];
      d[f.name] = v === undefined || v === null ? "" : String(v);
    }
    setDraft(d);
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-primary transition-colors text-sm";

  return (
    <div>
      {/* Editor form */}
      {editing && (
        <div className="rounded-xl bg-glass-bg border border-primary/40 p-6 mb-8">
          <h2 className="font-semibold text-white mb-4">
            {editing ? `Edit ${cms.singular}` : `New ${cms.singular}`}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {cms.fields.map((f) => {
              const val = draft[f.name] ?? "";
              if (f.type === "checkbox") {
                return (
                  <label key={f.name} className="flex items-center gap-3 text-sm text-gray-300">
                    <input
                      type="checkbox"
                      checked={val === "true"}
                      onChange={(e) => setDraft({ ...draft, [f.name]: String(e.target.checked) })}
                      className="w-4 h-4 accent-[#00f2ff]"
                    />
                    {f.label}
                  </label>
                );
              }
              if (f.type === "select") {
                return (
                  <div key={f.name} className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase">{f.label}</label>
                    <select
                      value={val}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                      className={inputCls}
                    >
                      {(f.options ?? []).map((o) => (
                        <option key={o} value={o} className="bg-bg">
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }
              if (f.type === "textarea") {
                return (
                  <div key={f.name} className="space-y-1 md:col-span-2">
                    <label className="text-xs font-bold text-gray-400 uppercase">{f.label}</label>
                    <textarea
                      value={val}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                      className={`${inputCls} h-24 resize-none font-mono text-xs`}
                    />
                  </div>
                );
              }
              return (
                <div key={f.name} className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase">{f.label}</label>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                    className={`${inputCls} ${f.type === "json" ? "font-mono text-xs" : ""}`}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex gap-3 mt-6">
            <button
              onClick={saveRow}
              disabled={busy}
              className="bg-primary text-black font-bold py-2 px-6 rounded-lg hover:bg-white transition-colors text-sm disabled:opacity-60"
            >
              {busy ? "Saving..." : "Save"}
            </button>
            <button
              onClick={() => setEditing(null)}
              className="bg-white/5 border border-white/10 text-gray-300 py-2 px-6 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Rows table */}
      <div className="rounded-xl bg-glass-bg border border-glass-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase">Title</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-gray-400 uppercase hidden md:table-cell">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs font-bold text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const titleField = cms.fields.find(
                (f) => f.type === "text" && !["key", "link", "icon", "icon_color", "period", "gpa"].includes(f.name)
              );
              const title = titleField ? String(r[titleField.name] ?? "") : r.id;
              const active = r.is_active !== false;
              return (
                <tr key={r.id} className="border-t border-white/5 hover:bg-white/5">
                  <td className="px-4 py-3 text-gray-200">
                    {title}
                    {!active && <span className="ml-2 text-[10px] text-gray-500 uppercase">(hidden)</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`text-[10px] uppercase tracking-wider border rounded px-2 py-0.5 ${
                        active ? "border-primary/40 text-primary" : "border-white/15 text-gray-500"
                      }`}
                    >
                      {active ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 mr-3 align-middle">
                      <button
                        onClick={() => moveRow(r.id, -1)}
                        disabled={rows.indexOf(r) === 0}
                        className="w-6 h-6 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-primary disabled:opacity-30 text-[10px] flex items-center justify-center transition-colors"
                        title="Move up"
                      >
                        <i className="fas fa-chevron-up"></i>
                      </button>
                      <button
                        onClick={() => moveRow(r.id, 1)}
                        disabled={rows.indexOf(r) === rows.length - 1}
                        className="w-6 h-6 rounded bg-white/5 border border-white/10 text-gray-400 hover:text-primary disabled:opacity-30 text-[10px] flex items-center justify-center transition-colors"
                        title="Move down"
                      >
                        <i className="fas fa-chevron-down"></i>
                      </button>
                    </span>
                    <button
                      onClick={() => startEdit(r)}
                      className="text-xs font-semibold text-primary hover:text-white transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeRow(r.id)}
                      className="text-xs font-semibold text-red-400 hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-gray-500">
                  No rows yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => startEdit(null)}
        className="mt-6 bg-primary text-black font-bold py-2.5 px-6 rounded-lg hover:bg-white transition-colors text-sm"
      >
        + Add {cms.singular}
      </button>
    </div>
  );
}

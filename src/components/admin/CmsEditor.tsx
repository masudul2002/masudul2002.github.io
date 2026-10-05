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

function detectSkillFromUrl(url: string): { name?: string; fallbackIcon?: string; color?: string } {
  const u = url.toLowerCase();
  if (u.includes("cplusplus") || u.includes("c++") || u.includes("cpp")) return { name: "C++", fallbackIcon: "fab fa-cuttlefish", color: "text-blue-500" };
  if (u.includes("python")) return { name: "Python", fallbackIcon: "fab fa-python", color: "text-yellow-300" };
  if (u.includes("javascript") || u.includes("/js") || u.includes("js.")) return { name: "JavaScript", fallbackIcon: "fab fa-js", color: "text-yellow-400" };
  if (u.includes("typescript") || u.includes("/ts") || u.includes("ts.")) return { name: "TypeScript", fallbackIcon: "fab fa-js", color: "text-blue-400" };
  if (u.includes("react")) return { name: "React", fallbackIcon: "fab fa-react", color: "text-cyan-400" };
  if (u.includes("nextjs") || u.includes("next-js") || u.includes("next.js")) return { name: "Next.js", fallbackIcon: "fas fa-code", color: "text-white" };
  if (u.includes("tailwind")) return { name: "Tailwind CSS", fallbackIcon: "fab fa-css3-alt", color: "text-cyan-400" };
  if (u.includes("html")) return { name: "HTML5", fallbackIcon: "fab fa-html5", color: "text-orange-500" };
  if (u.includes("css")) return { name: "CSS3", fallbackIcon: "fab fa-css3-alt", color: "text-blue-500" };
  if (u.includes("github")) return { name: "GitHub", fallbackIcon: "fab fa-github", color: "text-white" };
  if (u.includes("git")) return { name: "Git", fallbackIcon: "fab fa-git-alt", color: "text-red-500" };
  if (u.includes("node")) return { name: "Node.js", fallbackIcon: "fab fa-node-js", color: "text-green-500" };
  if (u.includes("docker")) return { name: "Docker", fallbackIcon: "fab fa-docker", color: "text-blue-400" };
  if (u.includes("postgres")) return { name: "PostgreSQL", fallbackIcon: "fas fa-database", color: "text-blue-400" };
  if (u.includes("mysql")) return { name: "MySQL", fallbackIcon: "fas fa-database", color: "text-blue-500" };
  if (u.includes("sql")) return { name: "SQL", fallbackIcon: "fas fa-database", color: "text-cyan-500" };
  if (u.includes("firebase")) return { name: "Firebase", fallbackIcon: "fas fa-fire", color: "text-orange-400" };
  if (u.includes("supabase")) return { name: "Supabase", fallbackIcon: "fas fa-bolt", color: "text-emerald-400" };
  if (u.includes("kotlin")) return { name: "Kotlin", fallbackIcon: "fab fa-android", color: "text-purple-400" };
  if (u.includes("android")) return { name: "Android", fallbackIcon: "fab fa-android", color: "text-green-500" };
  if (u.includes("java")) return { name: "Java", fallbackIcon: "fab fa-java", color: "text-red-500" };
  if (u.includes("flutter")) return { name: "Flutter", fallbackIcon: "fas fa-mobile-alt", color: "text-blue-400" };
  if (u.includes("dart")) return { name: "Dart", fallbackIcon: "fas fa-code", color: "text-cyan-400" };
  if (u.includes("linux")) return { name: "Linux", fallbackIcon: "fab fa-linux", color: "text-yellow-400" };
  if (u.includes("mongo")) return { name: "MongoDB", fallbackIcon: "fas fa-database", color: "text-green-500" };

  try {
    const parts = new URL(url).pathname.split("/").filter(Boolean);
    const last = parts[parts.length - 1]?.replace(/[-_](original|plain|wordmark|logo)?\.(svg|png|jpg|webp)$/i, "");
    if (last && last.length > 1) {
      return { name: last.charAt(0).toUpperCase() + last.slice(1), fallbackIcon: "fas fa-code", color: "text-primary" };
    }
  } catch {}
  return {};
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
  const [isCreating, setIsCreating] = useState(false);
  const [draft, setDraft] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  function startCreate() {
    setEditing(null);
    setIsCreating(true);
    const d: Record<string, string> = {};
    for (const f of cms.fields) {
      if (f.name === "is_active") d[f.name] = "true";
      else if (f.name === "sort_order") d[f.name] = String(rows.length);
      else if (f.name === "status") d[f.name] = "Live";
      else if (f.name === "key") d[f.name] = (cms.singular.toLowerCase() + "-" + Date.now().toString(36).slice(-4));
      else if (f.name === "fallback_icon") d[f.name] = "fas fa-code";
      else d[f.name] = "";
    }
    setDraft(d);
  }

  function startEdit(row: Row) {
    setIsCreating(false);
    setEditing(row);
    const d: Record<string, string> = {};
    for (const f of cms.fields) {
      const v = row[f.name];
      if (f.type === "json") {
        d[f.name] = Array.isArray(v)
          ? v.join(", ")
          : typeof v === "object" && v !== null
          ? JSON.stringify(v)
          : String(v ?? "");
      } else {
        d[f.name] = v === undefined || v === null ? "" : String(v);
      }
    }
    // If editing profile: parse CP handles from tagline JSON
    if (cms.key === "profile") {
      try {
        const parsed = JSON.parse(String(row?.tagline || ""));
        if (parsed && typeof parsed === "object") {
          d.cf_handle = parsed.cf || "MASUDUL2002";
          d.ac_handle = parsed.ac || "masudul2002";
          d.cc_handle = parsed.cc || "masudul2002";
          d.lc_handle = parsed.lc || "masudul2002";
          d.hr_handle = parsed.hr || "MASUDUL2002";
        }
      } catch {
        d.cf_handle = d.cf_handle || "MASUDUL2002";
        d.ac_handle = d.ac_handle || "masudul2002";
        d.cc_handle = d.cc_handle || "masudul2002";
        d.lc_handle = d.lc_handle || "masudul2002";
        d.hr_handle = d.hr_handle || "MASUDUL2002";
      }
    }
    setDraft(d);
  }

  function cancelForm() {
    setEditing(null);
    setIsCreating(false);
    setDraft({});
  }

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
        const trimmed = raw.trim();
        if (!trimmed) {
          payload[f.name] = [];
        } else if (trimmed.startsWith("[") || trimmed.startsWith("{")) {
          try {
            payload[f.name] = JSON.parse(trimmed);
          } catch {
            // Fallback to comma/newline separation
            payload[f.name] = trimmed
              .split(/[\n,]+/)
              .map((s) => s.trim().replace(/^[•\-*]\s*/, ""))
              .filter(Boolean);
          }
        } else {
          // Plain comma or newline separated items (e.g. "React, Next.js, Node.js")
          payload[f.name] = trimmed
            .split(/[\n,]+/)
            .map((s) => s.trim().replace(/^[•\-*]\s*/, ""))
            .filter(Boolean);
        }
      } else {
        payload[f.name] = raw;
      }
    }

    // Special handling for profile CP handles
    if (cms.key === "profile") {
      payload.tagline = JSON.stringify({
        cf: draft.cf_handle || "MASUDUL2002",
        ac: draft.ac_handle || "masudul2002",
        cc: draft.cc_handle || "masudul2002",
        lc: draft.lc_handle || "masudul2002",
        hr: draft.hr_handle || "MASUDUL2002",
      });
      delete payload.cf_handle;
      delete payload.ac_handle;
      delete payload.cc_handle;
      delete payload.lc_handle;
      delete payload.hr_handle;
    }

    // Creation defaults
    if (isCreating) {
      payload.id = crypto.randomUUID();
      if (payload.sort_order === undefined || payload.sort_order === null) {
        payload.sort_order = rows.length;
      }
      if (cms.fields.some((f) => f.name === "key") && !payload.key) {
        const title = String(payload.title ?? payload.role ?? "item");
        payload.key =
          title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || ("item-" + Date.now().toString(36).slice(-4));
      }
      for (const f of cms.fields) {
        if (f.type === "json" && !payload[f.name]) {
          payload[f.name] = [];
        }
      }
    }

    const { error } = editing
      ? await supabaseClient.from(cms.table).update(payload).eq("id", editing.id)
      : await supabaseClient.from(cms.table).insert([payload]);

    setBusy(false);
    if (error) {
      alert("Save failed: " + error.message);
      return;
    }
    cancelForm();
    router.refresh();
    await revalidatePublicSite();
  }

  async function removeRow(id: string) {
    if (!confirm("Are you sure you want to delete this row?")) return;
    if (!supabaseClient) return;
    const { error } = await supabaseClient.from(cms.table).delete().eq("id", id);
    if (error) {
      alert("Delete failed: " + error.message);
      return;
    }
    router.refresh();
    await revalidatePublicSite();
  }

  async function moveRow(id: string, dir: -1 | 1) {
    if (!supabaseClient) return;
    const idx = rows.findIndex((r) => r.id === id);
    const other = rows[idx + dir];
    if (!other) return;
    const a = Number(rows[idx].sort_order ?? idx);
    const b = Number(other.sort_order ?? idx + dir);

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

  const inputCls =
    "w-full bg-black/5 dark:bg-white/5 border border-glass-border rounded-lg px-3 py-2 text-text focus:outline-none focus:border-primary transition-colors text-sm";

  return (
    <div>
      {/* Editor form (Editing or Creating) */}
      {(editing || isCreating) && (
        <div className="rounded-xl bg-glass-bg border border-primary/50 p-6 mb-8 shadow-xl">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-glass-border">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-lg text-text flex items-center gap-2">
                <i className={`fas ${isCreating ? "fa-plus-circle text-emerald-400" : "fa-edit text-primary"}`}></i>
                {isCreating ? `Add New ${cms.singular}` : `Edit ${cms.singular}`}
              </h2>
              {cms.key === "skills" && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/25 text-xs font-semibold text-text">
                  <span className="text-[10px] uppercase font-mono text-primary font-bold">Preview:</span>
                  {draft.icon && (draft.icon.startsWith("http") || draft.icon.startsWith("/")) ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={draft.icon} alt="" className="w-5 h-5 object-contain" onError={(e) => (e.currentTarget.style.display = "none")} />
                  ) : (
                    <i className={`${draft.icon || "fas fa-code"} ${draft.icon_color || "text-primary"} text-sm`}></i>
                  )}
                  <span>{draft.name || "Skill Name"}</span>
                </div>
              )}
            </div>
            <button
              onClick={cancelForm}
              className="text-text-muted hover:text-text transition-colors p-1"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {cms.fields.map((f) => {
              if (cms.key === "profile" && f.name === "tagline") return null;
              const val = draft[f.name] ?? "";
              if (f.type === "checkbox") {
                return (
                  <label key={f.name} className="flex items-center gap-3 text-sm text-text cursor-pointer">
                    <input
                      type="checkbox"
                      checked={val === "true"}
                      onChange={(e) => setDraft({ ...draft, [f.name]: String(e.target.checked) })}
                      className="w-4 h-4 accent-primary rounded"
                    />
                    <span className="font-medium">{f.label}</span>
                  </label>
                );
              }
              if (f.type === "select") {
                return (
                  <div key={f.name} className="space-y-1">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">{f.label}</label>
                    <select
                      value={val}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                      className={inputCls}
                    >
                      {(f.options ?? []).map((o) => (
                        <option key={o} value={o} className="bg-bg text-text">
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
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">{f.label}</label>
                    <textarea
                      value={val}
                      onChange={(e) => setDraft({ ...draft, [f.name]: e.target.value })}
                      className={`${inputCls} h-24 resize-none text-xs`}
                    />
                  </div>
                );
              }
              const isSkillIcon = cms.key === "skills" && f.name === "icon";
              const isImage = f.name.includes("image") || f.name.includes("logo") || (isSkillIcon && (val.startsWith("http") || val.startsWith("/")));
              const isJsonArray = f.type === "json";
              return (
                <div key={f.name} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                      {isSkillIcon ? "Icon (Image/SVG URL or FA class)" : f.label}
                    </label>
                    {isJsonArray && (
                      <span className="text-[10px] text-text-muted">Comma-separated or JSON</span>
                    )}
                    {isSkillIcon && (
                      <span className="text-[10px] text-primary font-mono">Paste URL or FA class</span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={val}
                    onChange={(e) => {
                      const newVal = e.target.value;
                      if (isSkillIcon && (newVal.startsWith("http") || newVal.startsWith("/"))) {
                        const detected = detectSkillFromUrl(newVal);
                        const nextDraft = { ...draft, [f.name]: newVal };
                        if (detected.name && (!draft.name || draft.name.trim() === "" || draft.name === "New Skill")) {
                          nextDraft.name = detected.name;
                        }
                        if (detected.color && (!draft.icon_color || draft.icon_color.trim() === "")) {
                          nextDraft.icon_color = detected.color;
                        }
                        setDraft(nextDraft);
                      } else {
                        setDraft({ ...draft, [f.name]: newVal });
                      }
                    }}
                    className={`${inputCls} ${isJsonArray ? "text-xs" : ""}`}
                    placeholder={
                      isSkillIcon
                        ? "e.g. https://.../python.svg or fab fa-python"
                        : isImage
                        ? "/images/... or https://..."
                        : isJsonArray
                        ? "e.g. React, TypeScript, Tailwind"
                        : ""
                    }
                  />

                  {/* Image Preview for image/logo fields or URL icons */}
                  {isImage && val && (
                    <div className="mt-2 flex items-center gap-3 p-2.5 bg-black/5 dark:bg-black/40 rounded-lg border border-glass-border">
                      <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center shadow-xs border border-glass-border flex-shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={val}
                          alt="Preview"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-emerald-500 flex items-center gap-1">
                          <i className="fas fa-check-circle text-[10px]"></i> Image Icon Active
                        </div>
                        <div className="text-[11px] text-text-muted truncate font-mono">{val}</div>
                      </div>
                    </div>
                  )}

                  {/* FontAwesome Preview for Skill Icon */}
                  {isSkillIcon && val && !val.startsWith("http") && !val.startsWith("/") && (
                    <div className="mt-2 flex items-center gap-3 p-2.5 bg-black/5 dark:bg-black/40 rounded-lg border border-glass-border">
                      <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center border border-glass-border flex-shrink-0">
                        <i className={`${val} ${draft.icon_color || "text-primary"} text-2xl`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-semibold text-primary flex items-center gap-1">
                          <i className="fas fa-icons text-[10px]"></i> FontAwesome Icon Preview
                        </div>
                        <div className="text-[11px] text-text-muted truncate font-mono">{val}</div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Profile CP Handles */}
            {cms.key === "profile" && (
              <div className="md:col-span-2 border-t border-glass-border pt-4 mt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-primary mb-3">
                  Competitive Programming Handles (Live Sync)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    { key: "cf_handle", label: "Codeforces", placeholder: "MASUDUL2002" },
                    { key: "ac_handle", label: "AtCoder", placeholder: "masudul2002" },
                    { key: "cc_handle", label: "CodeChef", placeholder: "masudul2002" },
                    { key: "lc_handle", label: "LeetCode", placeholder: "masudul2002" },
                    { key: "hr_handle", label: "HackerRank", placeholder: "MASUDUL2002" },
                  ].map((h) => (
                    <div key={h.key} className="space-y-1">
                      <label className="text-[11px] font-semibold text-text-muted">{h.label}</label>
                      <input
                        type="text"
                        value={draft[h.key] ?? ""}
                        onChange={(e) => setDraft({ ...draft, [h.key]: e.target.value })}
                        className={`${inputCls} font-mono text-xs`}
                        placeholder={h.placeholder}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-3 mt-6 pt-4 border-t border-glass-border">
            <button
              onClick={saveRow}
              disabled={busy}
              className="bg-primary text-black font-bold py-2.5 px-6 rounded-lg hover:bg-white transition-colors text-sm disabled:opacity-50 flex items-center gap-2"
            >
              {busy ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Saving...
                </>
              ) : (
                <>
                  <i className="fas fa-check"></i> {isCreating ? `Create ${cms.singular}` : "Save Changes"}
                </>
              )}
            </button>
            <button
              onClick={cancelForm}
              className="bg-black/5 dark:bg-white/5 border border-glass-border text-text py-2.5 px-6 rounded-lg hover:bg-white/10 transition-colors text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Rows table */}
      <div className="rounded-xl bg-glass-bg border border-glass-border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-black/5 dark:bg-white/5">
            <tr>
              <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase">Title</th>
              <th className="text-left px-4 py-3 text-xs font-bold text-text-muted uppercase hidden md:table-cell">
                Status
              </th>
              <th className="text-right px-4 py-3 text-xs font-bold text-text-muted uppercase">Actions</th>
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
                <tr key={r.id} className="border-t border-glass-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  <td className="px-4 py-3 text-text font-medium">
                    {title}
                    {!active && <span className="ml-2 text-[10px] text-text-muted uppercase">(hidden)</span>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={`text-[10px] uppercase tracking-wider border rounded px-2 py-0.5 ${
                        active ? "border-primary/40 text-primary" : "border-glass-border text-text-muted"
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
                        className="w-6 h-6 rounded bg-black/5 dark:bg-white/5 border border-glass-border text-text-muted hover:text-primary disabled:opacity-30 text-[10px] flex items-center justify-center transition-colors"
                        title="Move up"
                      >
                        <i className="fas fa-chevron-up"></i>
                      </button>
                      <button
                        onClick={() => moveRow(r.id, 1)}
                        disabled={rows.indexOf(r) === rows.length - 1}
                        className="w-6 h-6 rounded bg-black/5 dark:bg-white/5 border border-glass-border text-text-muted hover:text-primary disabled:opacity-30 text-[10px] flex items-center justify-center transition-colors"
                        title="Move down"
                      >
                        <i className="fas fa-chevron-down"></i>
                      </button>
                    </span>
                    <button
                      onClick={() => startEdit(r)}
                      className="text-xs font-semibold text-primary hover:text-text transition-colors mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeRow(r.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
            {rows.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-text-muted">
                  No rows yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={startCreate}
        className="mt-6 bg-primary text-black font-bold py-2.5 px-6 rounded-lg hover:bg-white transition-colors text-sm flex items-center gap-2"
      >
        <i className="fas fa-plus"></i> Add {cms.singular}
      </button>
    </div>
  );
}

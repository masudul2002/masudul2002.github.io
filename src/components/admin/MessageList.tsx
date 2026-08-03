"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessageList({ messages }: { messages: Message[] }) {
  const [list, setList] = useState<Message[]>(messages);

  async function toggleRead(id: string, isRead: boolean) {
    if (!supabaseClient) return;
    const { error } = await supabaseClient
      .from("contact_messages")
      .update({ is_read: !isRead })
      .eq("id", id);
    if (error) {
      console.error("toggleRead error:", error.message);
      return;
    }
    setList((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: !isRead } : m)));
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    if (!supabaseClient) return;
    const { error } = await supabaseClient.from("contact_messages").delete().eq("id", id);
    if (error) {
      console.error("delete error:", error.message);
      return;
    }
    setList((prev) => prev.filter((m) => m.id !== id));
  }

  if (list.length === 0) {
    return (
      <div className="rounded-xl bg-glass-bg border border-glass-border p-8 text-center text-gray-400">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {list.map((m) => {
        const date = m.created_at ? new Date(m.created_at).toLocaleString() : "";
        return (
          <div key={m.id} className="rounded-xl bg-glass-bg border border-glass-border p-6">
            <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
                  {(m.name || "?").charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="font-semibold text-white">
                    {m.name}
                    {!m.is_read && (
                      <span className="ml-1 text-[10px] uppercase tracking-wider text-primary border border-primary/40 rounded px-1.5 py-0.5 align-middle">
                        New
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-400">
                    {m.email} {date && <>· {date}</>}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleRead(m.id, m.is_read)}
                  className="bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold py-1.5 px-3 rounded-lg hover:bg-white/10 transition-colors"
                >
                  {m.is_read ? "Unread" : "Mark read"}
                </button>
                <button
                  onClick={() => remove(m.id)}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold py-1.5 px-3 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="space-y-2">
              {m.subject && <div className="text-sm font-semibold text-primary">{m.subject}</div>}
              <p className="text-sm text-gray-300 whitespace-pre-wrap">{m.message}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

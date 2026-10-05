"use client";

import { useState } from "react";

export default function ChangePasswordModal() {
  const [open, setOpen] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);

    if (newPassword.length < 6) {
      setStatus({ type: "error", text: "Password must be at least 6 characters." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus({ type: "error", text: "Passwords do not match." });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
      });
      const data = await res.json();
      setLoading(false);

      if (!res.ok || data.error) {
        setStatus({ type: "error", text: data.error || "Failed to change password." });
      } else {
        setStatus({ type: "success", text: "Password changed successfully!" });
        setNewPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          setOpen(false);
          setStatus(null);
        }, 1500);
      }
    } catch {
      setLoading(false);
      setStatus({ type: "error", text: "Network error. Please try again." });
    }
  }

  const inputCls =
    "w-full bg-black/5 dark:bg-white/5 border border-glass-border rounded-lg px-3 py-2 text-text text-sm focus:outline-none focus:border-primary transition-colors";

  return (
    <>
      <button
        onClick={() => { setOpen(true); setStatus(null); }}
        className="px-3 py-1.5 rounded-lg border border-glass-border bg-black/5 dark:bg-white/5 hover:bg-primary/10 hover:border-primary/40 text-xs font-semibold text-text transition-colors flex items-center gap-1.5"
        title="Change Admin Password"
      >
        <i className="fas fa-key text-yellow-500"></i>
        <span className="hidden sm:inline">Change Password</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-bg border border-glass-border rounded-2xl p-6 w-full max-w-md shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-glass-border">
              <h3 className="font-bold text-base text-text flex items-center gap-2">
                <i className="fas fa-lock text-primary"></i> Change Admin Password
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="text-text-muted hover:text-text transition-colors p-1"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase">New Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className={`${inputCls} pr-10`}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-text-muted hover:text-text text-xs"
                  >
                    <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-text-muted uppercase">Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-type new password"
                  className={inputCls}
                  autoComplete="new-password"
                  required
                />
              </div>

              {status && (
                <div
                  className={`text-xs p-3 rounded-lg border ${
                    status.type === "success"
                      ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                      : "bg-red-500/10 border-red-500/30 text-red-500"
                  }`}
                >
                  {status.text}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-primary text-black font-bold py-2.5 rounded-lg hover:bg-white transition-colors text-sm disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Update Password"}
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2.5 rounded-lg border border-glass-border text-text text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

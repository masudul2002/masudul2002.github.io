"use client";

import { useState } from "react";
import { supabaseClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const [tab, setTab] = useState<"login" | "reset">("login");

  // Login states
  const [email, setEmail] = useState("admin@masudulhasan.me");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Reset states
  const [resetEmail, setResetEmail] = useState("admin@masudulhasan.me");
  const [recoveryPin, setRecoveryPin] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [resetStatus, setResetStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleLogin() {
    setError(null);
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }
    if (!supabaseClient) {
      setError("Supabase authentication is not configured.");
      return;
    }

    setLoading(true);
    const { data, error: authError } = await supabaseClient.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setLoading(false);
      setError("Login failed: " + authError.message);
      return;
    }

    if (data.session) {
      // Force hard navigation so browser passes fresh authentication cookies to middleware
      window.location.href = "/admin";
    } else {
      setLoading(false);
      setError("Session could not be established. Please try again.");
    }
  }

  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    setResetStatus(null);

    if (newPassword.length < 6) {
      setResetStatus({ type: "error", text: "New password must be at least 6 characters." });
      return;
    }

    if (newPassword !== confirmPassword) {
      setResetStatus({ type: "error", text: "Passwords do not match." });
      return;
    }

    setResetLoading(true);
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: resetEmail.trim(),
          recoveryPin: recoveryPin.trim(),
          newPassword,
        }),
      });

      const json = await res.json();
      setResetLoading(false);

      if (!res.ok || json.error) {
        setResetStatus({ type: "error", text: json.error || "Failed to reset password." });
      } else {
        setResetStatus({
          type: "success",
          text: "Password successfully updated! You can now log in.",
        });
        setPassword(newPassword);
        setTimeout(() => {
          setTab("login");
        }, 1500);
      }
    } catch {
      setResetLoading(false);
      setResetStatus({ type: "error", text: "Network error while connecting to reset service." });
    }
  }

  const inputCls =
    "w-full bg-black/5 dark:bg-white/5 border border-glass-border rounded-lg px-4 py-3 text-text focus:outline-none focus:border-primary transition-colors text-sm";

  return (
    <div className="rounded-2xl bg-glass-bg border border-glass-border p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Switch between Sign In and Reset Password */}
      <div className="flex border-b border-glass-border mb-6">
        <button
          type="button"
          onClick={() => { setTab("login"); setError(null); }}
          className={`flex-1 pb-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center justify-center gap-2 ${
            tab === "login"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          <i className="fas fa-sign-in-alt"></i> Sign In
        </button>
        <button
          type="button"
          onClick={() => { setTab("reset"); setResetStatus(null); }}
          className={`flex-1 pb-3 text-sm font-bold tracking-wide transition-all border-b-2 flex items-center justify-center gap-2 ${
            tab === "reset"
              ? "border-primary text-primary"
              : "border-transparent text-text-muted hover:text-text"
          }`}
        >
          <i className="fas fa-key"></i> Reset Password
        </button>
      </div>

      {tab === "login" ? (
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputCls}
              placeholder="admin@masudulhasan.me"
              autoComplete="email"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Password</label>
              <button
                type="button"
                onClick={() => setTab("reset")}
                className="text-xs text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className={`${inputCls} pr-10`}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3.5 text-text-muted hover:text-text text-sm transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                <i className={`fas ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-500 bg-red-500/10 border border-red-500/30 rounded-lg p-3 leading-relaxed">
              {error}
            </div>
          )}

          <button
            type="button"
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-wider text-sm shadow-neon disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Signing in...
              </>
            ) : (
              <>
                <i className="fas fa-lock-open"></i> Sign In
              </>
            )}
          </button>
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Admin Email</label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className={inputCls}
              placeholder="admin@masudulhasan.me"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Recovery PIN</label>
              <span className="text-[10px] text-text-muted">SSTU ID: 23240442</span>
            </div>
            <input
              type="text"
              value={recoveryPin}
              onChange={(e) => setRecoveryPin(e.target.value)}
              className={inputCls}
              placeholder="Enter 23240442"
              required
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">New Password</label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={`${inputCls} pr-10`}
                placeholder="At least 6 characters"
                required
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3.5 top-3.5 text-text-muted hover:text-text text-sm transition-colors"
              >
                <i className={`fas ${showNewPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-text-muted uppercase tracking-wider">Confirm New Password</label>
            <input
              type={showNewPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={inputCls}
              placeholder="Re-type new password"
              required
            />
          </div>

          {resetStatus && (
            <div
              className={`text-xs p-3 rounded-lg border ${
                resetStatus.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                  : "bg-red-500/10 border-red-500/30 text-red-500"
              }`}
            >
              {resetStatus.text}
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={resetLoading}
              className="flex-1 bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-wider text-sm disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {resetLoading ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i> Resetting...
                </>
              ) : (
                <>
                  <i className="fas fa-check-circle"></i> Set New Password
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setTab("login")}
              className="px-4 py-3 rounded-lg border border-glass-border text-text text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

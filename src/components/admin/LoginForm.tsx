"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    setError(null);
    if (!email || !password) {
      setError("Enter your email and password.");
      return;
    }
    if (!supabaseClient) {
      setError("Supabase is not configured.");
      return;
    }
    setLoading(true);
    const { error: authError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (authError) {
      setError("Login failed: " + authError.message);
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm";

  return (
    <div className="rounded-xl bg-glass-bg border border-glass-border p-8">
      <div className="space-y-5">
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputCls}
            placeholder="admin@example.com"
            autoComplete="email"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className={inputCls}
            placeholder="••••••••"
            autoComplete="current-password"
          />
        </div>
        {error && (
          <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3">
            {error}
          </div>
        )}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-neon disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </div>
  );
}

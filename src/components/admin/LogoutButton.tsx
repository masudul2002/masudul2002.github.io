"use client";

import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase/client";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    if (!supabaseClient) return;
    await supabaseClient.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-white/5 border border-white/10 text-gray-300 font-semibold py-2 px-5 rounded-lg hover:bg-white/10 transition-colors text-sm"
    >
      Logout
    </button>
  );
}

import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminUser } from "@/lib/supabase/guard";
import MessageList from "@/components/admin/MessageList";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = {
  title: "Admin | MD. MASUDUL HASAN",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  const user = await requireAdminUser();
  const supabase = await createSupabaseServerClient();

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-6 text-red-400">
        Failed to load messages: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pt-24">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Contact Messages</h1>
          <p className="text-gray-400 mt-1">
            Signed in as <span className="text-primary">{user.email}</span>
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/admin/content"
            className="bg-white/5 border border-white/10 text-gray-300 font-semibold py-2 px-5 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            <i className="fas fa-cog mr-1.5"></i>CMS Content
          </Link>
          <LogoutButton />
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-400">
          <span className="text-white font-bold">{messages.length}</span> messages
        </p>
      </div>

      <MessageList messages={messages} />
    </div>
  );
}

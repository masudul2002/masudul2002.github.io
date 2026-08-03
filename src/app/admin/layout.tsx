import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/admin/LogoutButton";

export const metadata = {
  robots: { index: false, follow: false },
};

// Admin shell: top bar with brand, section links, and the signed-in
// account block (email + logout). Login page is excluded via route group
// (it lives outside this layout — see /admin/login/page.tsx).
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If there's no user, the per-page guard (requireAdminUser) redirects.
  // We still render the shell; user may be null on the login page which is
  // NOT wrapped by this layout (login is a separate route).
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Admin top bar */}
      <header className="fixed top-0 left-0 w-full z-40 border-b border-glass-border"
        style={{ background: "rgba(5,5,5,0.9)", backdropFilter: "blur(12px)" }}>
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-primary font-mono font-bold text-lg">&lt;MH /&gt;</span>
            <span className="text-xs text-gray-500 uppercase tracking-wider border-l border-white/10 pl-3">
              Admin Panel
            </span>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <span className="hidden md:inline text-sm text-gray-400">
                <i className="fas fa-user-circle mr-1.5 text-primary"></i>
                <span className="text-gray-200">{user.email}</span>
              </span>
            )}
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Section tabs */}
      <nav className="pt-16 border-b border-glass-border bg-black/30">
        <div className="max-w-6xl mx-auto px-4 flex gap-6 overflow-x-auto">
          <Link href="/admin" className="py-3 px-1 text-sm font-semibold text-primary border-b-2 border-primary">
            <i className="fas fa-inbox mr-1.5"></i>Messages
          </Link>
          <Link href="/admin/content" className="py-3 px-1 text-sm font-semibold text-gray-400 hover:text-primary transition-colors">
            <i className="fas fa-cog mr-1.5"></i>Content (CMS)
          </Link>
          <Link href="/" className="py-3 px-1 text-sm font-semibold text-gray-400 hover:text-primary transition-colors">
            <i className="fas fa-globe mr-1.5"></i>View Site
          </Link>
        </div>
      </nav>

      <main className="pt-6">{children}</main>
    </div>
  );
}

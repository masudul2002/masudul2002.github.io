export const metadata = {
  robots: { index: false, follow: false },
};

// NOTE: The auth guard is per-page (requireAdminUser) so the login
// page can render without being redirected. See /admin/page.tsx,
// /admin/content/* for usage.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

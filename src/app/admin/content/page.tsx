import Link from "next/link";
import { CMS_ENTITIES } from "@/lib/cms";
import { requireAdminUser } from "@/lib/supabase/guard";

export const metadata = {
  title: "CMS Content | Admin",
  robots: { index: false, follow: false },
};

export default async function ContentIndexPage() {
  await requireAdminUser();
  return (
    <div className="max-w-4xl mx-auto px-4 py-10 pt-24">
      <h1 className="text-3xl font-bold text-white mb-8">Content Management</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {CMS_ENTITIES.map((e) => (
          <Link
            key={e.key}
            href={`/admin/content/${e.key}`}
            className="rounded-xl bg-glass-bg border border-glass-border p-6 hover:border-primary/40 hover:shadow-neon transition-all"
          >
            <h2 className="font-semibold text-white">{e.label}</h2>
            <p className="text-xs text-gray-400 mt-1">
              Edit {e.label.toLowerCase()} content
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { getCmsEntity } from "@/lib/cms";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CmsEditor from "@/components/admin/CmsEditor";

export const metadata = {
  title: "CMS Editor | Admin",
  robots: { index: false, follow: false },
};

export default async function EntityPage({
  params,
}: {
  params: Promise<{ entity: string }>;
}) {
  const { entity } = await params;
  const cms = getCmsEntity(entity);
  if (!cms) notFound();

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from(cms.table)
    .select("*")
    .order(cms.orderColumn, { ascending: true });

  if (error) {
    return (
      <div className="p-6 pt-24 text-red-400">
        Failed to load {cms.label}: {error.message}
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 pt-24">
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <Link
            href="/admin/content"
            className="text-xs text-gray-400 hover:text-primary mb-2 inline-block"
          >
            ← Back to content
          </Link>
          <h1 className="text-3xl font-bold text-white">{cms.label}</h1>
        </div>
      </div>
      <CmsEditor cms={cms} rows={data ?? []} />
    </div>
  );
}

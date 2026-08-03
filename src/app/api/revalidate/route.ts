import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

// POST /api/revalidate?secret=... — on-demand ISR invalidation
// (used by the admin CMS after edits; also callable via cron)
export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  revalidatePath("/", "layout");
  revalidatePath("/cv");
  return NextResponse.json({ revalidated: true });
}

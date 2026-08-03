"use server";

import { revalidatePath } from "next/cache";

// Server action called by the admin CMS after any content change.
// Revalidates the public pages so edits appear live immediately.
export async function revalidatePublicSite() {
  revalidatePath("/", "layout");
  revalidatePath("/cv");
  revalidatePath("/payment");
  return { ok: true };
}

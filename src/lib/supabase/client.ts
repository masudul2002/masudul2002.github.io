import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Browser (anon) client using @supabase/ssr's createBrowserClient.
// This stores the session in COOKIES (same mechanism the server client
// and middleware read), which is what makes /admin login work end-to-end.
export const supabaseClient =
  supabaseUrl && supabaseAnonKey
    ? createBrowserClient(supabaseUrl, supabaseAnonKey)
    : null;

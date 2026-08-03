// ============================================================
// Supabase client setup — Masudul Hasan Portfolio
// The anon (publishable) key is safe to expose in the browser;
// Row Level Security in the database is what protects the data.
// ============================================================
const SUPABASE_URL = "https://alxfiyywszzzhskdvotn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Mzb4Fyr56NOg28S6cUbEvw_J8sXVkTx";

window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

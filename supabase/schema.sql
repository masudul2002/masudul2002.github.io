-- ============================================================
-- Masudul Hasan Portfolio — Supabase Schema
-- Project ref: alxfiyywszzzhskdvotn
--
-- This script is idempotent and safe to run multiple times.
-- It creates the contact_messages table and its RLS policies.
-- ============================================================

-- ------------------------------------------------------------
-- 1. contact_messages table
--    Visitors submit the contact form -> rows land here.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name       text NOT NULL,
    email      text NOT NULL,
    subject    text NOT NULL DEFAULT '',
    message    text NOT NULL,
    is_read    boolean NOT NULL DEFAULT false,
    user_id    uuid REFERENCES auth.users(id),   -- set when an authenticated user owns the row
    created_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for the queries the admin page runs
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
    ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_user_id_idx
    ON public.contact_messages (user_id)
    WHERE user_id IS NOT NULL;

-- ------------------------------------------------------------
-- 2. Row Level Security
--    This site is static (GitHub Pages), so the anon key is
--    public. RLS is what actually protects the data:
--      - anon (visitors):        INSERT only
--      - authenticated (admin):  SELECT / UPDATE / DELETE
--                                only rows owned by them
-- ------------------------------------------------------------
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Visitors may submit the contact form. They may NEVER read anything.
DROP POLICY IF EXISTS "allow_public_insert" ON public.contact_messages;
CREATE POLICY "allow_public_insert"
    ON public.contact_messages
    FOR INSERT TO anon
    WITH CHECK (true);

-- Logged-in admin may read only their own messages.
DROP POLICY IF EXISTS "allow_owner_select" ON public.contact_messages;
CREATE POLICY "allow_owner_select"
    ON public.contact_messages
    FOR SELECT TO authenticated
    USING (auth.uid() = user_id);

-- Logged-in admin may delete only their own messages.
DROP POLICY IF EXISTS "allow_owner_delete" ON public.contact_messages;
CREATE POLICY "allow_owner_delete"
    ON public.contact_messages
    FOR DELETE TO authenticated
    USING (auth.uid() = user_id);

-- Logged-in admin may update (mark as read) only their own messages.
DROP POLICY IF EXISTS "allow_owner_update" ON public.contact_messages;
CREATE POLICY "allow_owner_update"
    ON public.contact_messages
    FOR UPDATE TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

-- ------------------------------------------------------------
-- 3. Helper: claim anonymous messages as the admin user
--    Run this once after creating your admin account:
--      UPDATE public.contact_messages
--      SET user_id = auth.uid()
--      WHERE user_id IS NULL;
--    (Also run it whenever you want to claim new messages.)
-- ------------------------------------------------------------

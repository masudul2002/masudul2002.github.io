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
--      - authenticated (admin):  SELECT / UPDATE / DELETE all rows
--
--    Why "all rows" instead of auth.uid() = user_id:
--    There is exactly ONE authenticated user (public signup is
--    DISABLED, only the admin account exists). The contact form
--    inserts rows as the anon role with no owner, so requiring
--    row ownership would force a manual "claim" step. Since the
--    authenticated role is effectively the owner by construction,
--    granting it full access = admin-only access, with no manual
--    maintenance. If other users are ever added, revisit this.
-- ------------------------------------------------------------
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Visitors may submit the contact form. They may NEVER read anything.
DROP POLICY IF EXISTS "allow_public_insert" ON public.contact_messages;
CREATE POLICY "allow_public_insert"
    ON public.contact_messages
    FOR INSERT TO anon
    WITH CHECK (true);

-- Logged-in admin (the only authenticated user) may read all messages.
DROP POLICY IF EXISTS "allow_admin_select" ON public.contact_messages;
CREATE POLICY "allow_admin_select"
    ON public.contact_messages
    FOR SELECT TO authenticated
    USING (true);

-- Logged-in admin may delete any message.
DROP POLICY IF EXISTS "allow_admin_delete" ON public.contact_messages;
CREATE POLICY "allow_admin_delete"
    ON public.contact_messages
    FOR DELETE TO authenticated
    USING (true);

-- Logged-in admin may update any message (mark as read).
DROP POLICY IF EXISTS "allow_admin_update" ON public.contact_messages;
CREATE POLICY "allow_admin_update"
    ON public.contact_messages
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

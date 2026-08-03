-- ============================================================
-- Masudul Hasan Portfolio — Supabase Schema (full CMS)
-- Project ref: alxfiyywszzzhskdvotn
--
-- Idempotent: safe to run multiple times.
-- Creates: contact_messages (contact form) + 8 CMS tables.
-- RLS: anon reads only active content; admin (authenticated)
--      has full CRUD. Public signup is disabled in Auth.
-- ============================================================

-- ------------------------------------------------------------
-- 1. contact_messages (contact form submissions)
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name       text NOT NULL,
    email      text NOT NULL,
    subject    text NOT NULL DEFAULT '',
    message    text NOT NULL,
    is_read    boolean NOT NULL DEFAULT false,
    user_id    uuid REFERENCES auth.users(id),
    created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx
    ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS contact_messages_user_id_idx
    ON public.contact_messages (user_id)
    WHERE user_id IS NOT NULL;

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "allow_public_insert" ON public.contact_messages;
CREATE POLICY "allow_public_insert"
    ON public.contact_messages
    FOR INSERT TO anon
    WITH CHECK (true);

DROP POLICY IF EXISTS "allow_admin_select" ON public.contact_messages;
CREATE POLICY "allow_admin_select"
    ON public.contact_messages
    FOR SELECT TO authenticated
    USING (true);

DROP POLICY IF EXISTS "allow_admin_delete" ON public.contact_messages;
CREATE POLICY "allow_admin_delete"
    ON public.contact_messages
    FOR DELETE TO authenticated
    USING (true);

DROP POLICY IF EXISTS "allow_admin_update" ON public.contact_messages;
CREATE POLICY "allow_admin_update"
    ON public.contact_messages
    FOR UPDATE TO authenticated
    USING (true)
    WITH CHECK (true);

-- ------------------------------------------------------------
-- 2. CMS content tables
--    Common columns: id, sort_order, is_active, created_at,
--    updated_at, updated_by (audit).
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profile (
    id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name            text NOT NULL,
    title           text NOT NULL,
    tagline         text NOT NULL DEFAULT '',
    location        text NOT NULL DEFAULT '',
    email           text NOT NULL DEFAULT '',
    alt_email       text NOT NULL DEFAULT '',
    phone           text NOT NULL DEFAULT '',
    linkedin        text NOT NULL DEFAULT '',
    linkedin_url    text NOT NULL DEFAULT '',
    github          text NOT NULL DEFAULT '',
    github_url      text NOT NULL DEFAULT '',
    summary         text NOT NULL DEFAULT '',
    profile_image   text NOT NULL DEFAULT '',
    whatsapp_number text NOT NULL DEFAULT '',
    sort_order      int NOT NULL DEFAULT 0,
    is_active       boolean NOT NULL DEFAULT true,
    created_at      timestamptz NOT NULL DEFAULT now(),
    updated_at      timestamptz NOT NULL DEFAULT now(),
    updated_by      uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.skills (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name        text NOT NULL,
    icon        text NOT NULL DEFAULT '',
    icon_color  text NOT NULL DEFAULT '',
    sort_order  int NOT NULL DEFAULT 0,
    is_active   boolean NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    updated_by  uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.education (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    institution text NOT NULL,
    degree      text NOT NULL DEFAULT '',
    period      text NOT NULL DEFAULT '',
    gpa         text NOT NULL DEFAULT '',
    sort_order  int NOT NULL DEFAULT 0,
    is_active   boolean NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    updated_by  uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.experience (
    id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key            text UNIQUE,
    role           text NOT NULL,
    org            text NOT NULL DEFAULT '',
    period         text NOT NULL DEFAULT '',
    status         text NOT NULL DEFAULT '',
    link           text NOT NULL DEFAULT '',
    brand_color    text NOT NULL DEFAULT 'cyan',
    logo_url       text NOT NULL DEFAULT '',
    fallback_icon  text NOT NULL DEFAULT 'fas fa-briefcase',
    bullets        jsonb NOT NULL DEFAULT '[]'::jsonb,
    cv_bullets     jsonb NOT NULL DEFAULT '[]'::jsonb,
    sort_order     int NOT NULL DEFAULT 0,
    is_active      boolean NOT NULL DEFAULT true,
    created_at     timestamptz NOT NULL DEFAULT now(),
    updated_at     timestamptz NOT NULL DEFAULT now(),
    updated_by     uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.projects (
    id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key            text UNIQUE,
    title          text NOT NULL,
    category       text NOT NULL DEFAULT '',
    status         text NOT NULL DEFAULT '',
    image_url      text NOT NULL DEFAULT '',
    fallback_icon  text NOT NULL DEFAULT 'fas fa-code',
    tech_stack     jsonb NOT NULL DEFAULT '[]'::jsonb,
    description    text NOT NULL DEFAULT '',
    live_url       text NOT NULL DEFAULT '',
    github_url     text NOT NULL DEFAULT '',
    is_placeholder boolean NOT NULL DEFAULT false,
    bullets        jsonb NOT NULL DEFAULT '[]'::jsonb,
    sort_order     int NOT NULL DEFAULT 0,
    is_active      boolean NOT NULL DEFAULT true,
    created_at     timestamptz NOT NULL DEFAULT now(),
    updated_at     timestamptz NOT NULL DEFAULT now(),
    updated_by     uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.org_roles (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    role        text NOT NULL,
    sort_order  int NOT NULL DEFAULT 0,
    is_active   boolean NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    updated_by  uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.activities (
    id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    activity    text NOT NULL,
    sort_order  int NOT NULL DEFAULT 0,
    is_active   boolean NOT NULL DEFAULT true,
    created_at  timestamptz NOT NULL DEFAULT now(),
    updated_at  timestamptz NOT NULL DEFAULT now(),
    updated_by  uuid REFERENCES auth.users(id)
);

CREATE TABLE IF NOT EXISTS public.cv_targets (
    id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key                 text UNIQUE,
    title               text NOT NULL,
    score               int NOT NULL DEFAULT 0,
    keywords            jsonb NOT NULL DEFAULT '[]'::jsonb,
    summary             text NOT NULL DEFAULT '',
    skills              jsonb NOT NULL DEFAULT '[]'::jsonb,
    experience_bullets  jsonb NOT NULL DEFAULT '{}'::jsonb,
    project_bullets     jsonb NOT NULL DEFAULT '{}'::jsonb,
    activities          jsonb NOT NULL DEFAULT '[]'::jsonb,
    sort_order          int NOT NULL DEFAULT 0,
    is_active           boolean NOT NULL DEFAULT true,
    created_at          timestamptz NOT NULL DEFAULT now(),
    updated_at          timestamptz NOT NULL DEFAULT now(),
    updated_by          uuid REFERENCES auth.users(id)
);

-- ------------------------------------------------------------
-- 3. RLS for CMS tables
--    anon: SELECT only active rows (public site reads)
--    authenticated: full CRUD on all rows (admin panel)
-- ------------------------------------------------------------
ALTER TABLE public.profile       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.org_roles     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cv_targets    ENABLE ROW LEVEL SECURITY;

-- anon read (active only)
DROP POLICY IF EXISTS "anon_read_active" ON public.profile;
CREATE POLICY "anon_read_active" ON public.profile
    FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "anon_read_active" ON public.skills;
CREATE POLICY "anon_read_active" ON public.skills
    FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "anon_read_active" ON public.education;
CREATE POLICY "anon_read_active" ON public.education
    FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "anon_read_active" ON public.experience;
CREATE POLICY "anon_read_active" ON public.experience
    FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "anon_read_active" ON public.projects;
CREATE POLICY "anon_read_active" ON public.projects
    FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "anon_read_active" ON public.org_roles;
CREATE POLICY "anon_read_active" ON public.org_roles
    FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "anon_read_active" ON public.activities;
CREATE POLICY "anon_read_active" ON public.activities
    FOR SELECT TO anon USING (is_active = true);

DROP POLICY IF EXISTS "anon_read_active" ON public.cv_targets;
CREATE POLICY "anon_read_active" ON public.cv_targets
    FOR SELECT TO anon USING (is_active = true);

-- admin full CRUD (all rows)
DROP POLICY IF EXISTS "auth_full_crud" ON public.profile;
CREATE POLICY "auth_full_crud" ON public.profile
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_full_crud" ON public.skills;
CREATE POLICY "auth_full_crud" ON public.skills
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_full_crud" ON public.education;
CREATE POLICY "auth_full_crud" ON public.education
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_full_crud" ON public.experience;
CREATE POLICY "auth_full_crud" ON public.experience
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_full_crud" ON public.projects;
CREATE POLICY "auth_full_crud" ON public.projects
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_full_crud" ON public.org_roles;
CREATE POLICY "auth_full_crud" ON public.org_roles
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_full_crud" ON public.activities;
CREATE POLICY "auth_full_crud" ON public.activities
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_full_crud" ON public.cv_targets;
CREATE POLICY "auth_full_crud" ON public.cv_targets
    FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ------------------------------------------------------------
-- 4. Indexes for common admin queries
-- ------------------------------------------------------------
CREATE INDEX IF NOT EXISTS skills_sort_idx       ON public.skills (sort_order);
CREATE INDEX IF NOT EXISTS education_sort_idx    ON public.education (sort_order);
CREATE INDEX IF NOT EXISTS experience_sort_idx   ON public.experience (sort_order);
CREATE INDEX IF NOT EXISTS projects_sort_idx     ON public.projects (sort_order);
CREATE INDEX IF NOT EXISTS org_roles_sort_idx    ON public.org_roles (sort_order);
CREATE INDEX IF NOT EXISTS activities_sort_idx   ON public.activities (sort_order);
CREATE INDEX IF NOT EXISTS cv_targets_sort_idx   ON public.cv_targets (sort_order);

-- ------------------------------------------------------------
-- 5. Auto-update updated_at on changes
-- ------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
DECLARE t text;
BEGIN
    FOREACH t IN ARRAY ARRAY['contact_messages','profile','skills','education','experience','projects','org_roles','activities','cv_targets']
    LOOP
        IF NOT EXISTS (
            SELECT 1 FROM pg_trigger WHERE tgname = 'set_updated_at' AND tgrelid = ('public.' || t)::regclass
        ) THEN
            EXECUTE format('CREATE TRIGGER set_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE FUNCTION public.set_updated_at()', t);
        END IF;
    END LOOP;
END $$;

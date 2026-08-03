# 🚀 MD. MASUDUL HASAN — Personal Portfolio

Modern portfolio built with **Next.js 16 (App Router) + TypeScript + Tailwind v4**, powered by **Supabase (Postgres)** CMS, deployed on **Vercel**.

🌐 **Live:** [masudulhasan.me](https://masudulhasan.me) · 🛠️ **Admin:** [masudulhasan.me/admin](https://masudulhasan.me/admin)

> ⚠️ **COPYRIGHT NOTICE:** This repository and all its contents are protected under copyright law. Copying, reusing, or redistributing any part of this project without explicit written permission is strictly prohibited. See `LICENSE` for full terms.

---

## ✨ Features

- **Home** — Hero (typed effect), About, Skills, Education, Experience, Leadership, live CP stats (Codeforces/AtCoder/CodeChef/LeetCode), Projects, Contact form
- **CV Generator** (`/cv`) — role-tailored ATS CV with PDF print + clipboard copy
- **Payment Portal** (`/payment`) — bKash/Nagad/Upay/Rocket + PDF receipt (simulated)
- **Admin Panel** (`/admin`) — secure login, contact-message inbox (mark-read/delete), CMS content editor for all profile data, password change
- **Full CMS** — every piece of content (profile, skills, education, experience, projects, org roles, activities, CV targets) is stored in Supabase and editable from the admin panel. Static fallback guarantees the site never renders blank.

## 🛠️ Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router, RSC) + TypeScript |
| Styling | Tailwind CSS v4 + brand tokens (`#00f2ff`/`#4d4dff`, Outfit/Space Grotesk) |
| Database | Supabase (Postgres) — 9 tables with RLS |
| Auth | Supabase email/password (public signup disabled, single admin) |
| Animations | Framer Motion (replaces AOS), Typed.js |
| Deploy | Vercel (custom domain masudulhasan.me) |

## 🗄️ Supabase Data Model

| Table | Purpose | anon | authenticated |
|---|---|---|---|
| `contact_messages` | Contact form submissions | INSERT only | full |
| `profile` | Personal info | SELECT active | full |
| `skills` / `education` / `experience` / `projects` / `org_roles` / `activities` / `cv_targets` | CMS content | SELECT active | full |

- Schema: `supabase/schema.sql` (idempotent)
- Seed: `supabase/seed.sql` (generated from `src/lib/profile-data.ts` — the canonical fallback)
- RLS: anon can only read active public content; authenticated (admin) has full CRUD. `service_role` is never exposed to the client.

## 🔐 Admin Access

- **URL:** `https://masudulhasan.me/admin`
- **Credentials:** stored locally in `ADMIN_CREDENTIALS.txt` (gitignored). Change the password immediately after first login via the **Change Password** option in the admin panel.
- Recovery: if you forget the password, reset it in Supabase Dashboard → Authentication → Users.

## 🚀 Local Development

```bash
npm install
cp .env.example .env.local   # fill in your Supabase values
npm run dev                  # http://localhost:3000
```

Env vars (all also set in Vercel):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `REVALIDATE_SECRET` (on-demand ISR invalidation)
- `SUPABASE_SERVICE_ROLE_KEY` (server-only, optional)

## 📦 Deployment

- GitHub `main` → Vercel auto-deploy → masudulhasan.me
- `legacy/` contains the original static site (frozen, kept for reference)
- On-demand revalidation: `POST /api/revalidate?secret=<REVALIDATE_SECRET>`

## 🆘 Recovery

- `git revert HEAD` — undo last change
- `git reset --hard backup/pre-supabase` — full restore to the pre-Supabase baseline
- `git push origin main` — deploy again

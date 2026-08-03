# Supabase Integration — Step-by-Step Prompts (Contact Form + Admin Auth)

> **এই ফাইলটা কী:** এখানে ধাপে-ধাপে প্রম্পট আছে। প্রতিটা ধাপের প্রম্পট কপি করে Claude-এ পেস্ট করে চালাবেন, তারপর পরের ধাপে যাবেন।
> প্রতিটা ধাপ **ইনক্রিমেন্টাল** — এক এক করে, প্রতিটা সফল হলে নতুন commit হবে, যাতে কিছু ভাঙলে সহজে আগের অবস্থায় ফিরতে পারেন।
>
> প্রম্পটগুলো ইংরেজিতে লেখা (Claude ঠিকমতো execute করার জন্য)। প্রতিটা ধাপের সাথে বাংলা ব্যাখ্যা আছে।

---

## 📋 Constants (সব ধাপে এই তথ্য ব্যবহার হবে)

| Item | Value |
|---|---|
| Project Ref | `alxfiyywszzzhskdvotn` |
| Supabase URL | `https://alxfiyywszzzhskdvotn.supabase.co` |
| Publishable (anon) Key | `sb_publishable_Mzb4Fyr56NOg28S6cUbEvw_J8sXVkTx` |
| GitHub repo | `masudul2002/masudul2002.github.io` (branch `main`, GitHub Pages deploy) |
| Live domain | `masudulhasan.me` |
| DB connection | `postgresql://postgres:[YOUR-PASSWORD]@db.alxfiyywszzzhskdvotn.supabase.co:5432/postgres` |

---

## 🛡️ SAFETY RULES (প্রতিটা প্রম্পটের সাথে যুক্ত থাকবে)

- **কখনো পুরো project rewrite করো না।** পুরো ফাইল কখনো নতুন করে লিখবে না।
- **কখনো UI redesign করো না।** HTML structure পরিবর্তন করবে না যতক্ষণ একান্ত দরকার না।
- **প্রতিটা CSS class preserve করো।** Animation, responsiveness, সব existing JavaScript অক্ষত রাখো।
- **ইনক্রিমেন্টাল কাজ করো।** প্রতিটা সফল ফিচার পরে **একটি করে commit** করো।
- **Unrelated ফাইল স্পর্শ করো না।** কাজ শুরুর আগে পুরো project inspect করো।
- **কিছু ভেঙে গেলে:** অবিলম্বে আগের working commit-এ ফিরে যাও (rollback), তারপর আবার চেষ্টা করো।
- Existing কোড শুধু **নিরাপদে replace** করলে মুছবে, এমনিতে মুছবে না।
- Repo: `masudul2002/masudul2002.github.io`, branch `main`। GitHub Pages live-এ যেতে `git push origin main` করলেই হবে।

**Rollback commands (যেকোনো ধাপে):**
```bash
git revert HEAD                          # শেষ commit টা undo
git reset --hard backup/pre-supabase     # পুরোটা ব্যাকআপে ফিরে যাও
```

---

## Step 0 — 🟢 Safety Baseline (একদম প্রথমে — সবচেয়ে গুরুত্বপূর্ণ)

**কেন:** আপনার মূল নিয়ম — "কোনো কারণে কোড ভেঙে গেলে যেন আগের কোডে ফিরে যেতে পারি"। সেজন্য প্রথমে একটা **নিরাপদ ব্যাকআপ পয়েন্ট** বানাতে হবে।

**কী হবে:** pending change commit → `backup/pre-supabase` ব্রাঞ্চ → `nul` ফাইল পরিষ্কার + `.gitignore`।

### প্রম্পট (কপি-পেস্ট):

```
I want to set up a safety baseline in my portfolio project before starting Supabase integration.

Steps:
1. Run `git status` and understand the pending changes (there is a small uncommitted change in index.html).
2. Commit the pending index.html change with message: "chore: commit pending index.html change before Supabase work"
3. Create a backup branch: `git branch backup/pre-supabase`
4. Create a `.gitignore` file with exactly this content:
   nul
   .DS_Store
   Thumbs.db
5. Delete the stray "nul" file (it is an untracked 34-byte artifact containing: "bash: type: .gitignore: not found"). Use `git rm --cached` if needed, then delete from disk. On Windows Git Bash, `rm ./nul` works.
6. Commit the .gitignore and the nul deletion together: "chore: add .gitignore and remove stray nul file"
7. Show `git status` — tree must be clean, backup branch exists, previous commits untouched.
8. Show `git log --oneline -5` to confirm the baseline commits.

SAFETY RULES:
- Do NOT rewrite the whole project.
- Do NOT modify profile.js, style.css, cv-generator.html, payment.html, contact.html, PNG/ assets.
- Do NOT make any unnecessary change to index.html beyond committing its pending change.
- Show status after each step. If anything breaks, report it and revert.
```

**ফলাফল:** Clean state + permanent backup branch। **এটাই সব রোলব্যাকের ভিত্তি।**

---

## Step 1 — ✅ Verify Supabase MCP Connection (read-only)

**কেন:** নিশ্চিত হতে হবে যে Claude-র কাছে Supabase tool গুলো আছে, নাহলে পরের ধাপের SQL কাজ হবে না।

### প্রম্পট (কপি-পেস্ট):

```
Check my Supabase MCP setup.

1. Scan the available MCP tools (look for mcp__supabase__* tools such as list, execute_sql, query, run).
2. Confirm the project connection for project ref: alxfiyywszzzhskdvotn
3. Run a simple test query: SELECT 1; — it must return a result row.
4. Do NOT edit, commit, or change any file. Read-only check only.

SAFETY RULES:
- Read-only. No commits, no file modifications.
- If the connection fails, do not ignore it — report exactly what error you get.
```

> **MCP আগে থেকে যোগ করা না থাকলে** (একবার, টার্মিনাল থেকে):
> ```
> claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=alxfiyywszzzhskdvotn&features=docs%2Caccount%2Cdatabase%2Cdebugging%2Cdevelopment%2Cfunctions%2Cbranching"
> ```
> তারপর `claude /mcp` চালিয়ে supabase সিলেক্ট করে **Authenticate** করুন।

---

## Step 2 — 🗃️ Create `contact_messages` Table (SQL via MCP — no code)

**কেন:** কন্টাক্ট ফর্মের message গুলোর ডেটাবেজ টেবিল। এখনো কোনো frontend কোড বদলাবে না — শুধু ডেটাবেজ।

### প্রম্পট (কপি-পেস্ট):

```
Create a contact_messages table in Supabase. Execute the SQL via the MCP SQL tool (mcp__supabase__*).

Exact SQL:

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    subject text DEFAULT '',
    message text NOT NULL,
    is_read boolean NOT NULL DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT now()
);

Then verify:
- SELECT * FROM public.contact_messages LIMIT 1; → must return an empty result (table exists, no rows).

Notes:
- Create in the public schema.
- This is database-only work. No files, no HTML/JS changes, no commits needed.

SAFETY RULES:
- Do not touch any file in the repo.
- Rollback if needed: DROP TABLE IF EXISTS public.contact_messages;
```

---

## Step 3 — 🔒 RLS (Row Level Security) Enable + Policies

**কেন:** সাইটটা pure static (GitHub Pages), তাই anon key public। মানে কেউ ব্রাউজ থেকে দেখতে পারবে। **RLS তাই অত্যাবশ্যক** — ভিজিটর শুধু *insert* পারবে (ফর্ম জমা দিতে), কিন্তু *কিছু পড়তে/ডিলিট করতে পারবে না*। শুধু লগ-ইন করা admin (আপনি) পড়বে/ডিলিট করবে।

### প্রম্পট (কপি-পেস্ট):

```
Enable Row Level Security on the contact_messages table and create policies in Supabase. Use the MCP SQL tool.

Step A — Add owner column (links messages to the admin user):
   ALTER TABLE public.contact_messages
   ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id);

Step B — Enable RLS:
   ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

Step C — Create policies (run DROP POLICY IF EXISTS first if any name already exists):

   CREATE POLICY "allow_public_insert" ON public.contact_messages
   FOR INSERT TO anon
   WITH CHECK (true);

   CREATE POLICY "allow_owner_select" ON public.contact_messages
   FOR SELECT TO authenticated
   USING (auth.uid() = user_id);

   CREATE POLICY "allow_owner_delete" ON public.contact_messages
   FOR DELETE TO authenticated
   USING (auth.uid() = user_id);

   CREATE POLICY "allow_owner_update" ON public.contact_messages
   FOR UPDATE TO authenticated
   USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

Step D — Verify:
   - List policies from pg_policies where table_name = 'contact_messages'.
   - Test: insert one temporary row as the anon role (then delete it again to clean up).
   - Test: SELECT as the anon role must return 0 rows (reads blocked).

Plain meaning: visitors can only submit the form; they cannot read anything. The logged-in admin can read/update/delete only messages where user_id matches their own account.

SAFETY RULES:
- Database changes only. No code, no commits.
- Rollback if needed: DROP POLICY IF EXISTS for each name, then ALTER TABLE public.contact_messages DISABLE ROW LEVEL SECURITY;
```

---

## Step 4 — 🔑 Enable Auth + Create Admin User (no code)

**কেন:** email + password লগইনের জন্য Auth চালু করতে হবে এবং আপনার একটা admin account থাকতে হবে, যা পরে `admin.html`-এ লগইন করবে।

### প্রম্পট (কপি-পেস্ট):

```
Set up Supabase Auth for my project (project ref alxfiyywszzzhskdvotn).

1. Check Authentication → Providers → Email: make sure "Enable Email signup" is ON (turn it on if off). Keep "Confirm email" on.
2. Create ONE admin user using the MCP management API (auth.admin.createUser):
   { email: "<YOUR_ADMIN_EMAIL>", password: "<A_STRONG_PASSWORD>", email_confirm: true }
   IMPORTANT: Use a strong password. Do NOT print the password in chat — the user will type it into the command themselves.
3. Verify in Authentication → Users that the admin account exists and email is confirmed.

SAFETY RULES:
- No code, no HTML changes, no commits. Supabase configuration only.
- The user will log in later at masudulhasan.me/admin.html.
```

> ⚠️ নিজের admin email আর password এখানে `<...>` জায়গায় বসিয়ে নিন। Password কপি করলেও বড় একটা কথা না — পরে change করতে পারবেন।

---

## Step 5 — 📨 Contact Form → Supabase (public site-এর একমাত্র code change)

**কেন:** এখন index.html-এর contact form থেকে message গুলো Supabase-এ জমা হবে। **WhatsApp-এর আগের behavior পুরোপুরি থাকবে** — DB সফল হলে WhatsApp-ও খুলবে; DB fail হলে শুধু WhatsApp (আগের মতো) — সাইট কখনো "broken" লাগবে না।

### প্রম্পট (কপি-পেস্ট):

```
Add Supabase to my static portfolio site and save contact form messages to the database.

Client setup:
1. Create a new file `supabase-config.js` with exactly this content:
   ```js
   // Global Supabase client (public anon key is safe for browser usage)
   const SUPABASE_URL = "https://alxfiyywszzzhskdvotn.supabase.co";
   const SUPABASE_ANON_KEY = "sb_publishable_Mzb4Fyr56NOg28S6cUbEvw_J8sXVkTx";
   window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
   ```

2. In index.html <head>, right after the existing `<script src="profile.js"></script>` (line 8), add these two script tags IN THIS ORDER:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
   <script src="supabase-config.js"></script>
   ```

3. In script.js, modify ONLY the existing send-btn click handler (currently around lines 148-168, "WhatsApp Contact Logic"). KEEP the existing WhatsApp logic intact. Add:
   - Read the same 4 fields: name, email, subject, message (same IDs: contact-name, contact-email, contact-subject, contact-message).
   - Await `supabase.from('contact_messages').insert([{ name, email, subject, message }])` — do NOT include user_id or any other column.
   - If insert succeeds → then open WhatsApp (existing window.open line).
   - If insert fails (offline, DB down) → STILL open WhatsApp (previous behavior) and log a console.error. The site must keep working exactly like before.

4. Do NOT touch the form HTML, any CSS class, or any animation.

Verify:
- Browser console: supabase client loaded, no errors.
- index.html still renders exactly as before.

Commit with message: "feat: save contact messages to Supabase"

SAFETY RULES:
- Do NOT touch profile.js, style.css, cv-generator.html, payment.html, contact.html.
- No CSS class or design changes.
- Rollback if broken: git revert HEAD
```

---

## Step 6 — 🔧 Create `admin.html` (private messages page)

**কেন:** লগইন করলে শুধু আপনি message গুলো দেখতে পাবেন। পেজটা navigation-এ **লিংক হবে না** (গোপন), শুধু টাইপ করে: `masudulhasan.me/admin.html`।

### প্রম্পট (কপি-পেস্ট):

```
Create a new file `admin.html` — a private page where I log in with email/password and read/delete messages from the contact_messages table. Match my site's existing design language exactly (borrow from index.html). Do NOT invent new CSS classes.

Design guidance (reuse from index.html):
- Same <head> pattern: Tailwind CDN script + the SAME tailwind.config (bg #050505, primary #00f2ff, secondary #4d4dff, glass colors, neon shadow, Outfit/Space Grotesk fonts) — copy from index.html lines 11-40.
- Same dark background style (bg-bg), AOS css/js if helpful.
- Cards: rounded-xl, bg-bg/50, border-white/10, p-6 — same look as index.html cards.
- Buttons: bg-primary text-black rounded-lg — same as the site's buttons.

Page logic (small inline <script>):
1. Load supabase CDN + supabase-config.js in the head (same order as index.html).
2. On load: const { data: { session } } = await supabase.auth.getSession()
3. If no session → show a login view (email + password inputs) with signInWithPassword; show error message inline on failure.
4. If session exists → show dashboard view: logout button + messages table.
   - Load: supabase.from('contact_messages').select('*').order('created_at', { ascending: false })
   - Each row shows: name, email, subject, message, created_at (formatted), is_read badge, mark-read toggle, delete button.
   - Mark read: .update({ is_read: true }); Delete: .delete(); then refresh the list.
5. Two view containers: #login-view and #dashboard-view, toggled with the Tailwind `hidden` class. No extra CSS file.
6. Do NOT add a link to admin.html in index.html navigation — it must stay unlisted (accessible only by typing the URL).
7. After creating the file: git add admin.html and commit "feat: add admin page for contact messages"

Verify:
- Open the file locally: login screen shows first; messages appear only after logging in.
- To test with data: insert a sample row via Supabase Table Editor with user_id = the admin user's id.

SAFETY RULES:
- New file only — do not modify any existing file.
- No design changes to index.html, style.css, or any other existing file.
- Rollback if broken: git revert HEAD
```

---

## Step 7 — ✅ Production Check + Live Push

**কেন:** সব ঠিক আছে কিনা চেক করে, তারপর GitHub Pages-এ push → live update।

### প্রম্পট (কপি-পেস্ট):

```
The Supabase integration is done. Run the full checklist, then deploy.

Checklist:
1. git status is clean and all commits are in place.
2. index.html still renders fully: all sections, AOS animations, custom cursor, CP stats load.
3. Contact form:
   a. Fill the form and submit.
   b. In Supabase Table Editor, contact_messages has a new row (user_id = NULL, fields correct).
   c. WhatsApp tab still opens (existing behavior intact).
4. admin.html:
   a. Without login → login screen shows (data invisible — RLS works).
   b. After admin login → messages list shows; mark-read and delete work.
   c. Logout → back to login state.
5. Browser console: no errors (no supabase 404 or network errors).
6. Responsive: layout intact on a mobile viewport.

Then push:
git push origin main

After about 1-2 minutes, verify live:
- Open https://masudulhasan.me — site works exactly as before.
- Submit the contact form once more live → a new row arrives in contact_messages.

If anything is wrong: report it and debug carefully. Do NOT skip any checklist item.
Rollback: git reset --hard backup/pre-supabase && git push --force-with-lease origin main
```

> ⚠️ Push করলে GitHub Pages auto-deploy-এ ১-২ মিনিট লাগে। চেকলিস্ট পুরো না করে push করবেন না।

---

## Step 8 — 📖 Future Workflow & Recovery (docs)

**কেন:** ভবিষ্যতে একই নিরাপদ পদ্ধতিতে কাজ করতে এবং README-এ রেকর্ড রাখতে।

### প্রম্পট (কপি-পেস্ট):

```
Append a new section to README.md titled "Supabase & Admin" (keep ALL existing content untouched — only append):

# Workflow
- One feature → one commit → push (GitHub Pages auto-deploys).
- Supabase tables: contact_messages
- RLS policies: anon can insert; only authenticated owner can select/update/delete
- Admin page: /admin.html (secret — no nav link) — email/password login

# Recovery
- Backup branch: backup/pre-supabase (baseline before Supabase work)
- git revert HEAD (undo last change)
- git reset --hard backup/pre-supabase (full restore)
- git push origin main (deploy again)

Then commit: "docs: add Supabase maintenance notes"

SAFETY RULES:
- Do not remove or rewrite any existing README content — append only.
```

---

## 🆘 যেকোনো ধাপে সমস্যা হলে (Emergency Handling)

| সমস্যা | সমাধান |
|---|---|
| Code ভেঙে গেছে, লাইভ broken | `git reset --hard backup/pre-supabase && git push --force origin main` — লাইভ আগের অবস্থায় (২ মিনিট) |
| শুধু শেষ commit-টা সমস্যা | `git revert HEAD` তারপর push |
| একটা নির্দিষ্ট ফাইল নষ্ট | `git checkout backup/pre-supabase -- <filename>` |
| `supabase login` / CLI দরকার (আলাদা, MCP ছাড়া) | একবার: `supabase login && supabase init && supabase link --project-ref alxfiyywszzzhskdvotn` |

---

> ✅ **সারসংক্ষেপ:** ধাপ 0 (ব্যাকআপ) → 1-4 (Supabase setup: DB / RLS / Auth) → 5 (ফর্ম → DB) → 6 (admin পেজ) → 7 (চেক + live push) → 8 (docs)। প্রতিটা ধাপের পরে commit, যেকোনো সময় `backup/pre-supabase`-এ ফেরা যায়।

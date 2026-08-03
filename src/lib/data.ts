import { supabaseClient } from "@/lib/supabase/client";
import { STATIC_FALLBACK, type ProfileData } from "@/lib/profile-data";

// Fetch all CMS content from Supabase, falling back to the static
// content (profile-data.ts) per-table if the DB is unreachable or
// env vars are missing. The site never renders blank.
export async function getProfileData(): Promise<ProfileData> {
  const fallback = STATIC_FALLBACK;
  if (!supabaseClient) return fallback;

  const db = supabaseClient;
  const fail = () => fallback;

  try {
    // profile (single row)
    const [profileRes, skillsRes, eduRes, expRes, projRes, orgRes, actRes, cvRes] =
      await Promise.all([
        db.from("profile").select("*").order("sort_order").maybeSingle(),
        db.from("skills").select("*").order("sort_order"),
        db.from("education").select("*").order("sort_order"),
        db.from("experience").select("*").order("sort_order"),
        db.from("projects").select("*").order("sort_order"),
        db.from("org_roles").select("*").order("sort_order"),
        db.from("activities").select("*").order("sort_order"),
        db.from("cv_targets").select("*").order("sort_order"),
      ]);

    const hasErr = [profileRes, skillsRes, eduRes, expRes, projRes, orgRes, actRes, cvRes].some(
      (r) => r.error
    );
    if (hasErr) return fail();

    const personal = profileRes.data as
      | {
          name?: string;
          title?: string;
          tagline?: string;
          location?: string;
          email?: string;
          alt_email?: string;
          phone?: string;
          linkedin?: string;
          linkedin_url?: string;
          github?: string;
          github_url?: string;
          summary?: string;
          profile_image?: string;
          whatsapp_number?: string;
        }
      | null;

    return {
      personal: {
        name: personal?.name ?? fallback.personal.name,
        title: personal?.title ?? fallback.personal.title,
        tagline: personal?.tagline ?? fallback.personal.tagline,
        location: personal?.location ?? fallback.personal.location,
        email: personal?.email ?? fallback.personal.email,
        altEmail: personal?.alt_email ?? fallback.personal.altEmail,
        phone: personal?.phone ?? fallback.personal.phone,
        linkedin: personal?.linkedin ?? fallback.personal.linkedin,
        linkedinUrl: personal?.linkedin_url ?? fallback.personal.linkedinUrl,
        github: personal?.github ?? fallback.personal.github,
        githubUrl: personal?.github_url ?? fallback.personal.githubUrl,
        summary: personal?.summary ?? fallback.personal.summary,
        profileImage: personal?.profile_image ?? fallback.personal.profileImage,
        whatsappNumber: personal?.whatsapp_number ?? fallback.personal.whatsappNumber,
      },
      organizationalRoles: (orgRes.data as { role: string }[])?.length
        ? (orgRes.data as { role: string }[]).map((r) => r.role)
        : fallback.organizationalRoles,
      skills: (skillsRes.data as { name: string; icon: string; icon_color: string }[])?.length
        ? (skillsRes.data as { name: string; icon: string; icon_color: string }[]).map((s) => ({
            name: s.name,
            icon: s.icon,
            iconColor: s.icon_color,
          }))
        : fallback.skills,
      education: (eduRes.data as { institution: string; degree: string; period: string; gpa: string }[])?.length
        ? (eduRes.data as { institution: string; degree: string; period: string; gpa: string }[]).map((e) => ({
            institution: e.institution,
            degree: e.degree,
            period: e.period,
            gpa: e.gpa,
          }))
        : fallback.education,
      experience: (expRes.data as {
        key: string;
        role: string;
        org: string;
        period: string;
        status: string;
        link: string;
        brand_color: string;
        logo_url: string;
        fallback_icon: string;
        bullets: string[];
        cv_bullets: string[];
      }[])?.length
        ? (expRes.data as {
            key: string;
            role: string;
            org: string;
            period: string;
            status: string;
            link: string;
            brand_color: string;
            logo_url: string;
            fallback_icon: string;
            bullets: string[];
            cv_bullets: string[];
          }[]).map((e) => ({
            key: e.key,
            role: e.role,
            org: e.org,
            period: e.period,
            status: e.status,
            link: e.link,
            brandColor: e.brand_color,
            logo: e.logo_url,
            fallbackIcon: e.fallback_icon,
            bullets: e.bullets ?? [],
            cvBullets: e.cv_bullets ?? [],
          }))
        : fallback.experience,
      projects: (projRes.data as {
        key: string;
        title: string;
        category: string;
        status: string;
        image_url: string;
        fallback_icon: string;
        tech_stack: string[];
        description: string;
        live_url: string;
        github_url: string;
        is_placeholder: boolean;
        bullets: string[];
      }[])?.length
        ? (projRes.data as {
            key: string;
            title: string;
            category: string;
            status: string;
            image_url: string;
            fallback_icon: string;
            tech_stack: string[];
            description: string;
            live_url: string;
            github_url: string;
            is_placeholder: boolean;
            bullets: string[];
          }[]).map((p) => ({
            key: p.key,
            title: p.title,
            category: p.category,
            status: p.status,
            image: p.image_url,
            fallbackIcon: p.fallback_icon,
            techStack: p.tech_stack ?? [],
            description: p.description,
            liveUrl: p.live_url,
            githubUrl: p.github_url,
            isPlaceholder: p.is_placeholder ?? false,
            bullets: p.bullets ?? [],
          }))
        : fallback.projects,
      activities: (actRes.data as { activity: string }[])?.length
        ? (actRes.data as { activity: string }[]).map((a) => a.activity)
        : fallback.activities,
      targetPositions: (cvRes.data as {
        key: string;
        title: string;
        score: number;
        keywords: string[];
        summary: string;
        skills: string[][];
        experience_bullets: Record<string, string[]>;
        project_bullets: Record<string, string[]>;
        activities: string[];
      }[])?.length
        ? Object.fromEntries(
            (cvRes.data as {
              key: string;
              title: string;
              score: number;
              keywords: string[];
              summary: string;
              skills: string[][];
              experience_bullets: Record<string, string[]>;
              project_bullets: Record<string, string[]>;
              activities: string[];
            }[]).map((t) => [
              t.key,
              {
                title: t.title,
                score: t.score,
                keywords: t.keywords ?? [],
                summary: t.summary,
                skills: t.skills ?? [],
                experienceBullets: t.experience_bullets ?? {},
                projectBullets: t.project_bullets ?? {},
                activities: t.activities ?? [],
              },
            ])
          )
        : fallback.targetPositions,
    };
  } catch {
    return fail();
  }
}

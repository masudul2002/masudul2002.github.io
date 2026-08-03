// CMS entity registry — one source of truth for the generic admin editor.
// Each entity maps to a Supabase table with its editable columns.

export interface CmsField {
  name: string;
  label: string;
  type: "text" | "textarea" | "number" | "checkbox" | "json" | "select";
  options?: string[];
}

export interface CmsEntity {
  key: string;
  table: string;
  label: string;
  singular: string;
  fields: CmsField[];
  idColumn: string;
  orderColumn: string;
}

export const CMS_ENTITIES: CmsEntity[] = [
  {
    key: "profile",
    table: "profile",
    label: "Profile",
    singular: "Profile",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "tagline", label: "Tagline", type: "text" },
      { name: "location", label: "Location", type: "text" },
      { name: "email", label: "Email", type: "text" },
      { name: "alt_email", label: "Alt Email", type: "text" },
      { name: "phone", label: "Phone", type: "text" },
      { name: "linkedin", label: "LinkedIn", type: "text" },
      { name: "linkedin_url", label: "LinkedIn URL", type: "text" },
      { name: "github", label: "GitHub", type: "text" },
      { name: "github_url", label: "GitHub URL", type: "text" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "profile_image", label: "Profile Image", type: "text" },
      { name: "whatsapp_number", label: "WhatsApp Number", type: "text" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
  {
    key: "skills",
    table: "skills",
    label: "Skills",
    singular: "Skill",
    fields: [
      { name: "name", label: "Name", type: "text" },
      { name: "icon", label: "Icon (FA class)", type: "text" },
      { name: "icon_color", label: "Icon Color (class)", type: "text" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
  {
    key: "education",
    table: "education",
    label: "Education",
    singular: "Education",
    fields: [
      { name: "institution", label: "Institution", type: "text" },
      { name: "degree", label: "Degree", type: "text" },
      { name: "period", label: "Period", type: "text" },
      { name: "gpa", label: "GPA", type: "text" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
  {
    key: "experience",
    table: "experience",
    label: "Experience",
    singular: "Experience",
    fields: [
      { name: "key", label: "Key (unique)", type: "text" },
      { name: "role", label: "Role", type: "text" },
      { name: "org", label: "Organization", type: "text" },
      { name: "period", label: "Period", type: "text" },
      {
        name: "status",
        label: "Status",
        type: "select",
        options: ["Current", "Ongoing", "Completed", "Past"],
      },
      { name: "link", label: "Link", type: "text" },
      {
        name: "brand_color",
        label: "Brand Color",
        type: "select",
        options: ["cyan", "indigo", "red", "teal", "rose", "blue"],
      },
      { name: "logo_url", label: "Logo URL", type: "text" },
      { name: "fallback_icon", label: "Fallback Icon", type: "text" },
      { name: "bullets", label: "Bullets (JSON array)", type: "json" },
      { name: "cv_bullets", label: "CV Bullets (JSON array)", type: "json" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
  {
    key: "projects",
    table: "projects",
    label: "Projects",
    singular: "Project",
    fields: [
      { name: "key", label: "Key (unique)", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "category", label: "Category", type: "text" },
      { name: "status", label: "Status", type: "text" },
      { name: "image_url", label: "Image URL", type: "text" },
      { name: "fallback_icon", label: "Fallback Icon", type: "text" },
      { name: "tech_stack", label: "Tech Stack (JSON array)", type: "json" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "live_url", label: "Live URL", type: "text" },
      { name: "github_url", label: "GitHub URL", type: "text" },
      { name: "is_placeholder", label: "Placeholder", type: "checkbox" },
      { name: "bullets", label: "Bullets (JSON array)", type: "json" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
  {
    key: "org_roles",
    table: "org_roles",
    label: "Organizational Roles",
    singular: "Role",
    fields: [
      { name: "role", label: "Role", type: "text" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
  {
    key: "activities",
    table: "activities",
    label: "Activities",
    singular: "Activity",
    fields: [
      { name: "activity", label: "Activity", type: "text" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
  {
    key: "cv_targets",
    table: "cv_targets",
    label: "CV Targets",
    singular: "CV Target",
    fields: [
      { name: "key", label: "Key (unique)", type: "text" },
      { name: "title", label: "Title", type: "text" },
      { name: "score", label: "Score", type: "number" },
      { name: "keywords", label: "Keywords (JSON array)", type: "json" },
      { name: "summary", label: "Summary", type: "textarea" },
      { name: "skills", label: "Skills (JSON)", type: "json" },
      { name: "experience_bullets", label: "Exp Bullets (JSON)", type: "json" },
      { name: "project_bullets", label: "Proj Bullets (JSON)", type: "json" },
      { name: "activities", label: "Activities (JSON array)", type: "json" },
      { name: "is_active", label: "Active", type: "checkbox" },
    ],
    idColumn: "id",
    orderColumn: "sort_order",
  },
];

export function getCmsEntity(key: string): CmsEntity | undefined {
  return CMS_ENTITIES.find((e) => e.key === key);
}

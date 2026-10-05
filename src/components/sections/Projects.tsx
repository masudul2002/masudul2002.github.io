import type { Project } from "@/lib/profile-data";

interface ProjectBrand {
  borderHover: string;
  glowHover: string;
  headerGradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  titleHover: string;
  accentText: string;
  liveBtn: string;
  logoRing: string;
  glowOrb: string;
}

const PROJECT_BRANDS: Record<string, ProjectBrand> = {
  "zero-pay": {
    borderHover: "hover:border-cyan-400/80",
    glowHover: "hover:shadow-[0_12px_32px_rgba(6,182,212,0.22)]",
    headerGradient: "bg-gradient-to-b from-cyan-500/15 via-blue-500/8 to-transparent",
    badgeBg: "bg-cyan-500/15",
    badgeText: "text-cyan-700 dark:text-cyan-300",
    badgeBorder: "border-cyan-500/30",
    titleHover: "group-hover:text-cyan-600 dark:group-hover:text-cyan-400",
    accentText: "text-cyan-600 dark:text-cyan-400",
    liveBtn: "text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300",
    logoRing: "ring-cyan-500/25",
    glowOrb: "bg-cyan-500/20",
  },
  "djs": {
    borderHover: "hover:border-rose-400/80",
    glowHover: "hover:shadow-[0_12px_32px_rgba(244,63,94,0.22)]",
    headerGradient: "bg-gradient-to-b from-rose-500/15 via-red-500/8 to-transparent",
    badgeBg: "bg-rose-500/15",
    badgeText: "text-rose-700 dark:text-rose-300",
    badgeBorder: "border-rose-500/30",
    titleHover: "group-hover:text-rose-600 dark:group-hover:text-rose-400",
    accentText: "text-rose-600 dark:text-rose-400",
    liveBtn: "text-rose-600 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300",
    logoRing: "ring-rose-500/25",
    glowOrb: "bg-rose-500/20",
  },
  "mealbook": {
    borderHover: "hover:border-emerald-400/80",
    glowHover: "hover:shadow-[0_12px_32px_rgba(16,185,129,0.22)]",
    headerGradient: "bg-gradient-to-b from-emerald-500/15 via-teal-500/8 to-transparent",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-700 dark:text-emerald-300",
    badgeBorder: "border-emerald-500/30",
    titleHover: "group-hover:text-emerald-600 dark:group-hover:text-emerald-400",
    accentText: "text-emerald-600 dark:text-emerald-400",
    liveBtn: "text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300",
    logoRing: "ring-emerald-500/25",
    glowOrb: "bg-emerald-500/20",
  },
  "mangostar": {
    borderHover: "hover:border-amber-400/80",
    glowHover: "hover:shadow-[0_12px_32px_rgba(245,158,11,0.22)]",
    headerGradient: "bg-gradient-to-b from-amber-500/15 via-orange-500/8 to-transparent",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-700 dark:text-amber-300",
    badgeBorder: "border-amber-500/30",
    titleHover: "group-hover:text-amber-600 dark:group-hover:text-amber-400",
    accentText: "text-amber-600 dark:text-amber-400",
    liveBtn: "text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300",
    logoRing: "ring-amber-500/25",
    glowOrb: "bg-amber-500/20",
  },
};

const DEFAULT_BRAND: ProjectBrand = {
  borderHover: "hover:border-primary/80",
  glowHover: "hover:shadow-[0_12px_32px_rgba(0,242,255,0.22)]",
  headerGradient: "bg-gradient-to-b from-primary/15 via-secondary/8 to-transparent",
  badgeBg: "bg-primary/15",
  badgeText: "text-primary",
  badgeBorder: "border-primary/30",
  titleHover: "group-hover:text-primary",
  accentText: "text-primary",
  liveBtn: "text-primary hover:text-text",
  logoRing: "ring-primary/25",
  glowOrb: "bg-primary/20",
};

function ComingSoonCard({ proj }: { proj: Project }) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-card vibe-card border border-glass-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
      <div className="h-32 relative overflow-hidden flex items-center justify-center p-3 bg-black/5 dark:bg-white/[0.02] border-b border-glass-border">
        <div className="cs-pulse cs-pulse-1"></div>
        <div className="cs-pulse cs-pulse-2"></div>
        <div className="cs-orbit"><div className="cs-orbit-dot"></div></div>
        <div className="cs-core"><i className="fas fa-code text-primary text-base"></i></div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-2 mb-1">
          <h4 className="text-base font-bold text-text group-hover:text-primary transition-colors truncate">
            {proj.title}
          </h4>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary shrink-0 cs-tag-pulse">
            {proj.status}
          </span>
        </div>
        <p className="text-[11px] font-medium text-text-muted mb-2 truncate">{proj.category}</p>
        <p className="text-xs text-text-muted line-clamp-2 mb-3 leading-relaxed">{proj.description}</p>
        <div className="pt-3 mt-auto border-t border-glass-border text-xs">
          <span className="text-xs font-bold text-primary/70 inline-flex items-center gap-1">
            <span className="cs-dot-loader"><span></span><span></span><span></span></span>
            In Progress
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-folder text-primary"></i> Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div id="projects-container" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {projects.map((proj) => {
            if (proj.isPlaceholder) return <ComingSoonCard key={proj.key} proj={proj} />;

            const brand = PROJECT_BRANDS[proj.key] ?? DEFAULT_BRAND;

            const imageSlot = proj.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proj.image}
                alt={proj.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-sm"
              />
            ) : (
              <i className={`${proj.fallbackIcon || "fas fa-code"} text-3xl ${brand.accentText}`}></i>
            );

            const liveBtn =
              proj.liveUrl && proj.liveUrl !== "#" ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 font-bold ${brand.liveBtn} transition-colors`}
                >
                  <span>Live Demo</span>
                  <i className="fas fa-arrow-right text-[10px]"></i>
                </a>
              ) : null;

            const githubBtn =
              proj.githubUrl && proj.githubUrl !== "#" ? (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-semibold text-text hover:text-primary transition-colors"
                >
                  <i className="fab fa-github text-sm"></i>
                  <span>Code</span>
                </a>
              ) : null;

            const isMango = proj.key === "mangostar";

            return (
              <div
                key={proj.key}
                className={`group relative flex flex-col rounded-2xl overflow-hidden glass-card vibe-card border border-glass-border ${brand.borderHover} ${brand.glowHover} transition-all duration-300 hover:-translate-y-1 ${
                  isMango ? "mango-gradient-border" : ""
                }`}
              >
                {/* Header with Distinct Brand Tint & Clean White Logo Container (No dark background!) */}
                <div className={`h-32 relative overflow-hidden flex items-center justify-center p-3 border-b border-glass-border/40 ${brand.headerGradient}`}>
                  {/* Subtle brand glow orb */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className={`w-24 h-24 rounded-full blur-2xl opacity-50 ${brand.glowOrb}`}></div>
                  </div>

                  {/* Clean, bright pure-white container so all logos are crisp, distinct, and unmistakable */}
                  <div className={`relative z-10 w-20 h-20 rounded-2xl bg-white shadow-md ring-1 ${brand.logoRing} flex items-center justify-center p-2.5 group-hover:scale-108 transition-all duration-300`}>
                    {imageSlot}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={`text-base font-bold text-text ${brand.titleHover} transition-colors truncate`}>
                      {proj.title}
                    </h4>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${brand.badgeBorder} ${brand.badgeBg} ${brand.badgeText} shrink-0`}>
                      {proj.status}
                    </span>
                  </div>

                  <p className={`text-[11px] font-semibold ${brand.accentText} mb-2 truncate`}>
                    {proj.category}
                  </p>

                  <p className="text-xs text-text-muted line-clamp-2 mb-3 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Compact Tech Badges */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {proj.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-text-muted border border-glass-border"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-black/5 dark:bg-white/5 text-text-muted">
                        +{proj.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Action Links */}
                  <div className="flex items-center justify-between pt-3 mt-auto border-t border-glass-border text-xs">
                    {liveBtn ? liveBtn : <span />}
                    {githubBtn ? githubBtn : (
                      <a href={proj.liveUrl || "#"} className={`text-xs font-semibold text-text ${brand.titleHover} transition-colors inline-flex items-center gap-1`}>
                        View <i className="fas fa-arrow-right text-[10px]"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

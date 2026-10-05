import type { Project } from "@/lib/profile-data";

function ComingSoonCard({ proj }: { proj: Project }) {
  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden glass-card vibe-card border border-glass-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5">
      <div className="h-36 relative overflow-hidden flex items-center justify-center p-3 bg-black/5 dark:bg-white/[0.02] border-b border-glass-border">
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

            const imageSlot = proj.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proj.image}
                alt={proj.title}
                className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <i className={`${proj.fallbackIcon || "fas fa-code"} text-3xl text-primary`}></i>
            );

            const liveBtn =
              proj.liveUrl && proj.liveUrl !== "#" ? (
                <a
                  href={proj.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-primary hover:text-text transition-colors"
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
                className={`group relative flex flex-col rounded-2xl overflow-hidden glass-card vibe-card border border-glass-border hover:border-primary/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/5 ${
                  isMango ? "mango-gradient-border" : ""
                }`}
              >
                {/* Minimal Header with Centered Official Logo */}
                <div className="h-36 relative overflow-hidden flex items-center justify-center p-3 bg-black/5 dark:bg-white/[0.02] border-b border-glass-border">
                  <div className="w-20 h-20 rounded-xl bg-white dark:bg-gray-900/80 border border-black/5 dark:border-white/10 shadow-sm flex items-center justify-center p-2 group-hover:scale-105 transition-transform duration-300">
                    {imageSlot}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-4 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="text-base font-bold text-text group-hover:text-primary transition-colors truncate">
                      {proj.title}
                    </h4>
                    <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 shrink-0">
                      {proj.status}
                    </span>
                  </div>

                  <p className="text-[11px] font-medium text-text-muted mb-2 truncate">
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
                      <a href={proj.liveUrl || "#"} className="text-xs font-semibold text-text hover:text-primary transition-colors inline-flex items-center gap-1">
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

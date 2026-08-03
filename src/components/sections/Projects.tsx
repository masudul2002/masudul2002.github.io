import type { Project } from "@/lib/profile-data";

const TECH_COLORS: Record<string, string> = {
  React: "bg-blue-900/50 text-blue-300 border-blue-500/30",
  TypeScript: "bg-purple-900/50 text-purple-300 border-purple-500/30",
  Supabase: "bg-cyan-900/50 text-cyan-300 border-cyan-500/30",
  "Tailwind CSS": "bg-sky-900/50 text-sky-300 border-sky-500/30",
  "TanStack Query": "bg-indigo-900/50 text-indigo-300 border-indigo-500/30",
  "Node.js": "bg-green-900/50 text-green-300 border-green-500/30",
  "Express.js": "bg-gray-900/50 text-gray-300 border-gray-500/30",
  PostgreSQL: "bg-sky-950/50 text-sky-200 border-sky-600/30",
  Stripe: "bg-indigo-900/50 text-indigo-300 border-indigo-500/30",
  JavaScript: "bg-yellow-900/50 text-yellow-300 border-yellow-500/30",
  HTML: "bg-orange-900/50 text-orange-300 border-orange-500/30",
  CSS: "bg-blue-900/50 text-blue-300 border-blue-500/30",
};

function ComingSoonCard({ proj }: { proj: Project }) {
  return (
    <div className="group relative rounded-xl overflow-hidden glass-card vibe-card border border-glass-border hover-neon transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
      <div className="h-48 bg-gray-900 relative flex items-center justify-center overflow-hidden">
        <div className="cs-pulse cs-pulse-1"></div>
        <div className="cs-pulse cs-pulse-2"></div>
        <div className="cs-orbit"><div className="cs-orbit-dot"></div></div>
        <div className="cs-core"><i className="fas fa-code text-primary text-lg"></i></div>
      </div>
      <div className="relative z-20 p-6 -mt-12">
        <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
          {proj.title}
          <span className="cs-blink text-primary text-xs font-mono">•</span>
        </h4>
        <div className="flex gap-2 my-3 flex-wrap">
          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{proj.category}</span>
          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20 cs-tag-pulse">{proj.status}</span>
        </div>
        <p className="text-sm text-gray-400 mb-4 line-clamp-3">{proj.description}</p>
        <a href="#" className="text-sm font-bold text-primary/60 cursor-not-allowed flex items-center gap-1">
          <span className="cs-dot-loader"><span></span><span></span><span></span></span>
          In Progress
        </a>
      </div>
    </div>
  );
}

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-folder text-primary"></i> Projects
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div id="projects-container" className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj) => {
            if (proj.isPlaceholder) return <ComingSoonCard key={proj.key} proj={proj} />;

            const techBadges = proj.techStack.map((tech) => (
              <span key={tech} className={`text-xs ${TECH_COLORS[tech] ?? "bg-blue-900/50 text-blue-300 border-blue-500/30"} px-2 py-1 rounded border`}>
                {tech}
              </span>
            ));

            const imageSlot = proj.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={proj.image} alt={proj.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 relative z-10" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-600 bg-gray-900">
                <i className={`${proj.fallbackIcon ?? "fas fa-code"} text-5xl`}></i>
              </div>
            );

            const liveBtn =
              proj.liveUrl && proj.liveUrl !== "#" ? (
                <a href={proj.liveUrl} target="_blank" rel="noopener" className="text-sm font-bold text-primary flex items-center gap-1 hover:gap-2 transition-all hover:text-white">
                  Live Demo <i className="fas fa-arrow-right"></i>
                </a>
              ) : null;

            const githubBtn =
              proj.githubUrl && proj.githubUrl !== "#" ? (
                <a href={proj.githubUrl} target="_blank" rel="noopener" className="text-sm font-bold text-white flex items-center gap-1 hover:gap-2 transition-all hover:text-primary">
                  GitHub <i className="fas fa-arrow-right text-primary"></i>
                </a>
              ) : null;

            const gradientBorderClass = proj.extraInteractivity ? "mango-gradient-border" : "";

            return (
              <div
                key={proj.key}
                className={`group relative rounded-xl overflow-hidden glass-card vibe-card border border-glass-border hover-neon ${gradientBorderClass} transition-all duration-300 hover:-translate-y-2`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent z-10"></div>
                <div className="h-48 bg-gray-800 relative overflow-hidden flex items-center justify-center px-6 py-4">
                  {proj.extraInteractivity && <div className="absolute w-24 h-24 rounded-full bg-primary/10 blur-2xl pointer-events-none"></div>}
                  {imageSlot}
                </div>
                <div className="relative z-20 p-6 -mt-12">
                  <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{proj.title}</h4>
                  <div className="flex gap-2 my-3 flex-wrap">
                    <span className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">{proj.category}</span>
                    <span className="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded border border-emerald-500/30">{proj.status}</span>
                    {techBadges}
                  </div>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-3">{proj.description}</p>
                  <div className="flex gap-6 items-center mt-4">
                    {liveBtn}
                    {githubBtn}
                    {!liveBtn && !githubBtn && (
                      <a href="#" className="text-sm font-bold text-white flex items-center gap-1 hover:gap-2 transition-all">
                        View Code <i className="fas fa-arrow-right text-primary"></i>
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

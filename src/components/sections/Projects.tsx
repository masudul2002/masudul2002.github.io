import type { Project } from "@/lib/profile-data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const TECH_COLORS: Record<string, string> = {
  React: "text-cyan-400 border-cyan-400/30",
  TypeScript: "text-blue-400 border-blue-400/30",
  JavaScript: "text-yellow-400 border-yellow-400/30",
  Supabase: "text-emerald-400 border-emerald-400/30",
  Tailwind: "text-teal-400 border-teal-400/30",
  "Tailwind CSS": "text-teal-400 border-teal-400/30",
};

export default function Projects({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
      <SectionHeading eyebrow="Projects" title="Featured Work" />
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((proj, i) => (
          <Reveal key={proj.key} delay={(i % 2) * 0.1}>
            <div className="rounded-xl bg-glass-bg border border-glass-border overflow-hidden h-full hover:border-primary/40 hover:shadow-neon transition-all flex flex-col">
              {proj.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={proj.image} alt={proj.title} className="w-full h-44 object-cover" />
              ) : (
                <div className="w-full h-44 flex items-center justify-center bg-gradient-to-br from-secondary/20 to-bg">
                  <i className={`${proj.fallbackIcon ?? "fas fa-code"} text-5xl text-primary/60`}></i>
                </div>
              )}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="text-lg font-semibold text-white leading-tight">{proj.title}</h3>
                  <span className="text-[10px] uppercase tracking-wider text-primary border border-primary/40 rounded px-2 py-0.5 shrink-0">
                    {proj.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mb-3">{proj.category}</p>
                <p className="text-sm text-gray-300 leading-relaxed mb-4">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {proj.techStack.map((t) => (
                    <span
                      key={t}
                      className={`text-[10px] border rounded px-2 py-0.5 font-mono ${TECH_COLORS[t] ?? "border-white/15 text-gray-300"}`}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2 mb-5 flex-1">
                  {proj.bullets.map((b) => (
                    <li key={b} className="text-sm text-gray-400 flex gap-2">
                      <i className="fas fa-circle text-[6px] mt-1.5 text-primary"></i>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex gap-4 pt-4 border-t border-white/10">
                  {proj.liveUrl && proj.liveUrl !== "#" && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-primary hover:text-white transition-colors"
                    >
                      <i className="fas fa-external-link-alt mr-1.5"></i>Live
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-semibold text-gray-300 hover:text-primary transition-colors"
                    >
                      <i className="fab fa-github mr-1.5"></i>Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
import type { Experience as ExperienceItem } from "@/lib/profile-data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const BRAND_COLORS: Record<string, string> = {
  cyan: "text-cyan-400 border-cyan-400/40",
  indigo: "text-indigo-400 border-indigo-400/40",
  red: "text-red-400 border-red-400/40",
  teal: "text-teal-400 border-teal-400/40",
  rose: "text-rose-400 border-rose-400/40",
  blue: "text-blue-400 border-blue-400/40",
};

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="py-20 px-4 max-w-5xl mx-auto">
      <SectionHeading eyebrow="Experience" title="Professional Journey" />
      <div className="grid md:grid-cols-2 gap-6">
        {experience.map((exp, i) => {
          const colorClasses = BRAND_COLORS[exp.brandColor] ?? BRAND_COLORS.cyan;
          const statusPill =
            exp.status === "Current"
              ? "border-primary/40 text-primary"
              : "border-white/15 text-gray-400";
          return (
            <Reveal key={exp.key} delay={(i % 2) * 0.1}>
              <div className="rounded-xl bg-glass-bg border border-glass-border p-6 h-full hover:border-primary/40 hover:shadow-neon transition-all">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center text-lg ${colorClasses}`}>
                      {exp.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={exp.logo} alt={exp.org} className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <i className={exp.fallbackIcon} aria-hidden="true"></i>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{exp.role}</h3>
                      <p className="text-xs text-gray-400">{exp.org}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] uppercase tracking-wider border rounded px-2 py-0.5 ${statusPill}`}>
                    {exp.status}
                  </span>
                </div>
                <p className="text-xs font-mono text-gray-400 mb-4">{exp.period}</p>
                <ul className="space-y-2">
                  {exp.bullets.map((b) => (
                    <li key={b} className="text-sm text-gray-300 flex gap-2">
                      <i className={`fas fa-chevron-right mt-1 text-[10px] ${BRAND_COLORS[exp.brandColor]?.split(" ")[0] ?? "text-primary"}`}></i>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
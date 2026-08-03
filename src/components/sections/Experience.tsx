"use client";

import type { Experience as ExperienceItem } from "@/lib/profile-data";

const BRAND: Record<
  string,
  { color: string; light: string; glow1: string; glow2: string; hoverBorder: string; link: string; icon: string }
> = {
  cyan: {
    color: "cyan-400",
    light: "cyan-300",
    glow1: "bg-cyan-500/8 group-hover:bg-cyan-500/20",
    glow2: "bg-cyan-700/5 group-hover:bg-cyan-700/15",
    hoverBorder: "hover:border-cyan-500/60 hover:shadow-[0_0_24px_rgba(0,242,255,0.25)]",
    link: "text-cyan-400/60 group-hover:text-cyan-400",
    icon: "text-cyan-400",
  },
  indigo: {
    color: "indigo-400",
    light: "indigo-300",
    glow1: "bg-indigo-500/8 group-hover:bg-indigo-500/20",
    glow2: "bg-indigo-700/5 group-hover:bg-indigo-700/15",
    hoverBorder: "hover:border-indigo-500/60 hover:shadow-[0_0_24px_rgba(79,70,229,0.25)]",
    link: "text-indigo-400/60 group-hover:text-indigo-400",
    icon: "text-indigo-400",
  },
  red: {
    color: "red-400",
    light: "red-300",
    glow1: "bg-red-500/8 group-hover:bg-red-500/20",
    glow2: "bg-orange-500/5 group-hover:bg-orange-500/15",
    hoverBorder: "hover:border-red-500/60 hover:shadow-[0_0_24px_rgba(239,68,68,0.22)]",
    link: "text-red-400/60 group-hover:text-red-400",
    icon: "text-red-400",
  },
  teal: {
    color: "teal-400",
    light: "teal-300",
    glow1: "bg-teal-500/8 group-hover:bg-teal-500/20",
    glow2: "bg-green-500/5 group-hover:bg-green-500/15",
    hoverBorder: "hover:border-teal-500/60 hover:shadow-[0_0_24px_rgba(20,184,166,0.22)]",
    link: "text-teal-400/60 group-hover:text-teal-400",
    icon: "text-teal-400",
  },
  rose: {
    color: "rose-400",
    light: "rose-300",
    glow1: "bg-rose-500/8 group-hover:bg-rose-500/20",
    glow2: "bg-pink-500/5 group-hover:bg-pink-500/15",
    hoverBorder: "hover:border-rose-500/60 hover:shadow-[0_0_24px_rgba(244,63,94,0.22)]",
    link: "text-rose-400/60 group-hover:text-rose-400",
    icon: "text-rose-400",
  },
  blue: {
    color: "blue-400",
    light: "blue-300",
    glow1: "bg-blue-500/8 group-hover:bg-blue-500/20",
    glow2: "bg-indigo-500/5 group-hover:bg-indigo-500/15",
    hoverBorder: "hover:border-blue-500/60 hover:shadow-[0_0_24px_rgba(59,130,246,0.22)]",
    link: "text-blue-400/60 group-hover:text-blue-400",
    icon: "text-blue-400",
  },
};

function domainOf(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

export default function Experience({ experience }: { experience: ExperienceItem[] }) {
  return (
    <section id="experience" className="py-24 bg-black/20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-briefcase text-primary"></i> Experience
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {experience.map((exp) => {
            const b = BRAND[exp.brandColor] ?? BRAND.cyan;
            return (
              <a
                key={exp.key}
                href={exp.link !== "#" ? exp.link : "#experience"}
                target={exp.link !== "#" ? "_blank" : undefined}
                rel={exp.link !== "#" ? "noopener" : undefined}
                className={`glass-card vibe-card p-6 rounded-xl border border-glass-border ${b.hoverBorder} transition-all duration-300 group relative overflow-hidden block hover:-translate-y-1`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 ${b.glow1} rounded-full blur-2xl transition-all duration-500`}></div>
                <div className={`absolute bottom-0 left-0 w-20 h-20 ${b.glow2} rounded-full blur-xl transition-all duration-500`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-${b.color}/10 flex items-center justify-center group-hover:bg-${b.color}/25 transition-colors duration-300 overflow-hidden flex-shrink-0 border border-${b.color}/20 group-hover:border-${b.color}/50`}
                    >
                      {exp.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={exp.logo}
                          alt={`${exp.org} Logo`}
                          className="w-8 h-8 object-contain vibe-icon"
                          onError={(e) => {
                            const el = e.currentTarget;
                            el.style.display = "none";
                            const parent = el.parentElement;
                            if (parent) {
                              const ic = document.createElement("i");
                              ic.className = `${exp.fallbackIcon} text-lg vibe-icon text-${b.color}`;
                              parent.appendChild(ic);
                            }
                          }}
                        />
                      ) : (
                        <i className={`${exp.fallbackIcon} text-lg vibe-icon text-${b.color}`}></i>
                      )}
                    </div>
                    <div className="flex-1">
                      <span
                        className={`bg-${b.color}/15 text-${b.color} text-xs font-bold px-3 py-1 rounded-full inline-block border border-${b.color}/20`}
                      >
                        {exp.status}
                      </span>
                    </div>
                    {exp.link !== "#" && (
                      <i className={`fas fa-external-link-alt text-gray-600 group-hover:text-${b.color} transition-colors text-xs`}></i>
                    )}
                  </div>
                  <h4 className={`text-xl font-bold mb-1 group-hover:text-${b.light} transition-colors duration-300`}>
                    {exp.role}
                  </h4>
                  <p className={`text-${b.color}/90 text-sm font-semibold mb-3`}>{exp.org}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {exp.bullets[0]}
                  </p>
                  {exp.link !== "#" && (
                    <div className={`mt-3 flex items-center gap-1 text-xs font-mono ${b.link} transition-colors`}>
                      <i className="fas fa-link text-[10px]"></i> {domainOf(exp.link) || exp.org}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

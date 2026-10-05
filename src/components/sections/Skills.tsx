import type { Skill } from "@/lib/profile-data";

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="py-24 bg-black/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-code text-primary"></i> Technical Skills
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div id="skills-container" className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {skills.map((skill) => {
            const isUrl = skill.icon && (skill.icon.startsWith("http") || skill.icon.startsWith("/"));
            const fallbackCls = skill.iconColor?.includes("fa-")
              ? skill.iconColor
              : "fas fa-code text-primary";

            return (
              <div
                key={skill.name}
                className="glass-card p-6 rounded-xl border border-glass-border hover:border-primary/50 hover-neon transition-all text-center flex flex-col items-center justify-center group"
              >
                {isUrl ? (
                  <>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-12 h-12 object-contain mb-4 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm"
                      onError={(e) => {
                        const el = e.currentTarget;
                        el.style.display = "none";
                        const next = el.nextElementSibling as HTMLElement;
                        if (next) next.style.display = "block";
                      }}
                    />
                    <i
                      className={`${fallbackCls} text-4xl mb-4`}
                      style={{ display: "none" }}
                    ></i>
                  </>
                ) : (
                  <i className={`${skill.icon || "fas fa-code"} ${skill.iconColor || "text-primary"} text-5xl mb-4 group-hover:scale-110 transition-transform duration-300`}></i>
                )}
                <h3 className="text-base sm:text-lg font-bold text-text group-hover:text-primary transition-colors">{skill.name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

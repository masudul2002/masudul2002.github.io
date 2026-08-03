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
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="glass-card p-6 rounded-xl border border-glass-border hover:border-primary/50 hover-neon transition-all text-center"
            >
              <i className={`${skill.icon} ${skill.iconColor} text-5xl mb-4`}></i>
              <h3 className="text-lg font-bold">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

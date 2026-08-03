import type { Skill } from "@/lib/profile-data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Skills({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="py-20 px-4 max-w-5xl mx-auto">
      <SectionHeading eyebrow="Skills" title="My Toolbox" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((skill, i) => (
          <Reveal key={skill.name} delay={i * 0.05}>
            <div className="rounded-xl bg-glass-bg border border-glass-border p-6 text-center hover:border-primary/50 hover:shadow-neon transition-all">
              <i className={`${skill.icon} ${skill.iconColor} text-4xl mb-3`}></i>
              <h3 className="font-semibold text-white text-sm">{skill.name}</h3>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

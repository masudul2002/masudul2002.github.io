import type { Education as EducationItem } from "@/lib/profile-data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Education({ education }: { education: EducationItem[] }) {
  return (
    <section id="education" className="py-20 px-4 max-w-4xl mx-auto">
      <SectionHeading eyebrow="Education" title="Academic Journey" />
      <div className="space-y-6">
        {education.map((ed, i) => (
          <Reveal key={ed.institution} delay={i * 0.1}>
            <div className="rounded-xl bg-glass-bg border border-glass-border p-6 hover:border-primary/50 transition-colors">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-white">{ed.institution}</h3>
                  <p className="text-primary text-sm mt-1">{ed.degree}</p>
                </div>
                <span className="text-xs font-mono text-gray-400 bg-white/5 border border-white/10 rounded px-2 py-1">
                  {ed.period}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-3">{ed.gpa}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Leadership({ roles }: { roles: string[] }) {
  return (
    <section id="leadership" className="py-20 px-4 max-w-4xl mx-auto">
      <SectionHeading eyebrow="Leadership" title="Organizational Roles" />
      <div className="grid md:grid-cols-2 gap-4">
        {roles.map((role, i) => (
          <Reveal key={role} delay={i * 0.05}>
            <div className="rounded-xl bg-glass-bg border border-glass-border p-5 flex items-center gap-4 hover:border-primary/40 transition-colors">
              <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary">
                <i className="fas fa-star"></i>
              </div>
              <p className="text-sm text-gray-200">{role}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
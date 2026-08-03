import type { Education as EducationItem } from "@/lib/profile-data";

const ED_STYLE: Record<number, { icon: string; iconCls: string; tint: string; glow: string }> = {
  0: { icon: "fas fa-university", iconCls: "text-primary", tint: "bg-primary/10 group-hover:bg-primary/20", glow: "bg-primary/5 group-hover:bg-primary/10" },
  1: { icon: "fas fa-school", iconCls: "text-secondary", tint: "bg-secondary/10 group-hover:bg-secondary/20", glow: "bg-secondary/5 group-hover:bg-secondary/10" },
  2: { icon: "fas fa-book-open", iconCls: "text-pink-400", tint: "bg-pink-500/10 group-hover:bg-pink-500/20", glow: "bg-pink-500/5 group-hover:bg-pink-500/10" },
};

export default function Education({ education }: { education: EducationItem[] }) {
  return (
    <section id="education" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-graduation-cap text-primary"></i> Education
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {education.map((ed, i) => {
            const s = ED_STYLE[i] ?? ED_STYLE[2];
            return (
              <div
                key={ed.institution}
                className="glass-card p-6 rounded-xl border border-glass-border hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 ${s.glow} rounded-full blur-2xl transition-all`}></div>
                <div className="relative z-10">
                  <div className={`w-10 h-10 ${s.tint} rounded-lg flex items-center justify-center mb-4 transition-colors`}>
                    <i className={`${s.icon} ${s.iconCls} text-lg`}></i>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block">
                    {ed.period.split(" – ")[0]}
                  </span>
                  <h4 className="text-lg font-bold mb-1">{ed.degree}</h4>
                  <p className="text-gray-400 text-sm mb-2">{ed.institution}</p>
                  <p className="text-gray-500 text-xs font-mono">{ed.gpa}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

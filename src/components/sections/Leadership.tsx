export default function Leadership({ roles }: { roles: string[] }) {
  return (
    <section id="leadership" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-star text-primary"></i> Leadership &amp; Activities
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Organizational Roles */}
          <div className="glass-card vibe-card p-8 rounded-xl border border-glass-border hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
              <i className="fas fa-medal text-2xl text-primary"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">Organizational Roles</h3>
            <ul id="org-roles-list" className="space-y-3 text-gray-400 text-sm">
              {roles.map((role) => (
                <li key={role} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></span>
                  {role}
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: Mentorship & Communication */}
          <div className="glass-card vibe-card p-8 rounded-xl border border-glass-border hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
              <i className="fas fa-chalkboard-teacher text-2xl text-secondary"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">Mentorship &amp; Communication</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                Strong communication, facilitation, and negotiation skills.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 flex-shrink-0"></span>
                Adaptable and Flexible team member.
              </li>
            </ul>
          </div>

          {/* Card 3: Digital Engagement */}
          <div className="glass-card vibe-card p-8 rounded-xl border border-glass-border hover:border-primary/50 transition-colors group">
            <div className="w-12 h-12 bg-pink-500/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-500/20 transition-colors">
              <i className="fas fa-bullhorn text-2xl text-pink-500"></i>
            </div>
            <h3 className="text-xl font-bold mb-4">Digital Engagement</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 flex-shrink-0"></span>
                Experienced in Live Streaming and Social Media Moderation&apos;s.
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mt-1.5 flex-shrink-0"></span>
                Knowledgeable in Digital Marketing strategies.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

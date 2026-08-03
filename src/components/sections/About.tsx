import type { Personal } from "@/lib/profile-data";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export default function About({ personal }: { personal: Personal }) {
  return (
    <section id="about" className="py-20 px-4 max-w-4xl mx-auto">
      <Reveal>
        <SectionHeading eyebrow="About Me" title="Who I Am" />
        <p className="text-gray-300 text-lg leading-relaxed">{personal.summary}</p>
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          <Reveal delay={0.1} className="rounded-xl bg-glass-bg border border-glass-border p-6">
            <h3 className="font-semibold text-primary mb-3">
              <i className="fas fa-envelope mr-2"></i>Contact
            </h3>
            <p className="text-sm text-gray-400 break-all">{personal.email}</p>
            <p className="text-sm text-gray-400 break-all mt-1">{personal.altEmail}</p>
            <p className="text-sm text-gray-400 mt-1">{personal.phone}</p>
          </Reveal>
          <Reveal delay={0.2} className="rounded-xl bg-glass-bg border border-glass-border p-6">
            <h3 className="font-semibold text-primary mb-3">
              <i className="fas fa-link mr-2"></i>Find Me
            </h3>
            <a
              href={personal.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-gray-300 hover:text-primary break-all mt-1"
            >
              <i className="fab fa-linkedin mr-2"></i>
              {personal.linkedin}
            </a>
            <a
              href={personal.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-gray-300 hover:text-primary break-all mt-1"
            >
              <i className="fab fa-github mr-2"></i>
              {personal.github}
            </a>
          </Reveal>
        </div>
      </Reveal>
    </section>
  );
}

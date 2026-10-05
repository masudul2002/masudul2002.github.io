"use client";

import { useState } from "react";
import { STATIC_FALLBACK, type ProfileData } from "@/lib/profile-data";

export default function CvGenerator({ data = STATIC_FALLBACK }: { data?: ProfileData }) {
  const profile = data ?? STATIC_FALLBACK;
  const [roleKey, setRoleKey] = useState("se");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const targetPositions = profile.targetPositions ?? STATIC_FALLBACK.targetPositions;
  const targetPos = targetPositions[roleKey] ?? targetPositions.se;
  const personal = profile.personal;

  // Real active experiences from portfolio data
  const experiences = profile.experience ?? [];

  // Real active canonical projects from portfolio data (skip placeholders)
  const projects = (profile.projects ?? []).filter((p) => !p.isPlaceholder);

  // Real skills from portfolio data
  const skillsList = (profile.skills ?? []).map((s) => s.name);

  // Categorize skills cleanly for ATS readability
  const coreLanguages = skillsList.filter((s) =>
    ["C++", "Python", "JavaScript", "TypeScript", "SQL", "HTML5 & CSS3"].includes(s)
  );
  const frameworksAndTools = skillsList.filter(
    (s) => !["C++", "Python", "JavaScript", "TypeScript", "SQL", "HTML5 & CSS3"].includes(s)
  );

  const summaryText = targetPos?.summary || personal.summary;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2800);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = async () => {
    const contactLine = `${personal.location} | ${personal.phone} | ${personal.email} | ${personal.linkedin} | ${personal.github}`;

    const expText = experiences
      .map((exp) => {
        const bullet = exp.cvBullets?.[0] || exp.bullets?.[0] || "";
        return `${exp.org} — ${exp.role} (${exp.period})\n• ${bullet}`;
      })
      .join("\n\n");

    const projText = projects
      .map((proj) => {
        const bullets = proj.bullets.slice(0, 2).map((b) => `• ${b}`).join("\n");
        return `${proj.title} | ${proj.techStack.join(", ")}\n${bullets}`;
      })
      .join("\n\n");

    const eduText = (profile.education ?? [])
      .map((edu) => `${edu.institution}\n${edu.degree} (${edu.period}) · GPA: ${edu.gpa}`)
      .join("\n\n");

    const fullCv = `${personal.name}
${targetPos?.title || personal.title}
${contactLine}

PROFESSIONAL SUMMARY
${summaryText}

TECHNICAL SKILLS
• Programming Languages: ${coreLanguages.join(", ")}
• Technologies & Tools: ${frameworksAndTools.join(", ")}

EXPERIENCE & LEADERSHIP
${expText}

KEY PROJECTS
${projText}

EDUCATION
${eduText}`;

    try {
      await navigator.clipboard.writeText(fullCv);
      showToast("📋 Copied ATS formatted text to clipboard!");
    } catch {
      showToast("❌ Copy failed. Please select and copy manually.");
    }
  };

  return (
    <div className="pt-20 max-w-5xl mx-auto px-4 py-8">
      {/* Control Bar (Hidden when printing) */}
      <div className="rounded-2xl bg-glass-bg border border-glass-border p-5 mb-6 shadow-xl print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <label htmlFor="roleSelect" className="text-xs font-bold uppercase tracking-wider text-text-muted">
              Target Role:
            </label>
            <select
              id="roleSelect"
              value={roleKey}
              onChange={(e) => setRoleKey(e.target.value)}
              className="bg-black/5 dark:bg-white/5 border border-glass-border rounded-lg px-3 py-1.5 text-text focus:outline-none focus:border-primary text-sm font-medium"
            >
              {Object.entries(targetPositions).map(([k, v]) => (
                <option key={k} value={k} className="bg-bg text-text">
                  {v.title} (Match {v.score}%)
                </option>
              ))}
            </select>
          </div>

          {/* ATS Match Meter */}
          <div className="flex items-center gap-3 min-w-[180px]">
            <span className="text-xs font-mono text-text-muted font-bold">ATS Score:</span>
            <div className="flex-1 h-2 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                style={{ width: `${targetPos?.score || 92}%` }}
              ></div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-500">
              {targetPos?.score || 92}%
            </span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={handlePrint}
              className="bg-primary text-black font-bold py-2 px-4 rounded-lg hover:bg-white transition-colors text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
            >
              <i className="fas fa-file-pdf"></i>
              <span>Download PDF</span>
            </button>
            <button
              onClick={handleCopyText}
              className="bg-black/5 dark:bg-white/5 border border-glass-border text-text font-semibold py-2 px-4 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-xs flex items-center gap-1.5"
            >
              <i className="fas fa-copy"></i>
              <span>Copy ATS Text</span>
            </button>
          </div>
        </div>

        {/* ATS Target Keywords */}
        {targetPos?.keywords && (
          <div className="mt-3.5 pt-3 border-t border-glass-border/40 flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-bold text-text-muted uppercase">Target Keywords:</span>
            {targetPos.keywords.map((kw) => (
              <span
                key={kw}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20"
              >
                {kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* A4 Paper CV — Tailored, 1-Page Compact ATS Format */}
      <div
        id="cv"
        className="bg-white text-slate-900 rounded-lg p-6 sm:p-7 max-w-[210mm] mx-auto shadow-2xl print:shadow-none print:p-0 print:m-0 print:max-w-none print:w-full print:rounded-none"
        style={{
          fontFamily: "Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "11px",
          lineHeight: "1.35",
          color: "#111827",
        }}
      >
        {/* Header */}
        <header className="text-center border-b-2 border-slate-900 pb-2 mb-2.5">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-black mb-0.5">
            {personal.name}
          </h1>
          <p className="text-xs font-bold text-slate-800 tracking-wide uppercase mb-1">
            {targetPos?.title || personal.title}
          </p>
          <div className="text-[10px] sm:text-[11px] text-slate-700 flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
            <span>{personal.location}</span>
            <span>•</span>
            <a href={`tel:${personal.phone.replace(/\s+/g, "")}`} className="text-slate-800 hover:underline">
              {personal.phone}
            </a>
            <span>•</span>
            <a href={`mailto:${personal.email}`} className="text-slate-800 hover:underline">
              {personal.email}
            </a>
            <span>•</span>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">
              {personal.linkedin}
            </a>
            <span>•</span>
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-800 hover:underline">
              {personal.github}
            </a>
          </div>
        </header>

        {/* Professional Summary */}
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1">
            Professional Summary
          </h2>
          <p className="text-[10.5px] text-slate-800 leading-relaxed text-justify">
            {summaryText}
          </p>
        </section>

        {/* Technical Skills */}
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1">
            Technical Skills
          </h2>
          <div className="text-[10.5px] space-y-0.5 text-slate-800">
            <p>
              <strong className="font-bold text-black">Programming Languages:</strong>{" "}
              {coreLanguages.join(", ") || "C++, Python, JavaScript, TypeScript, SQL, HTML5, CSS3, Data Structures & Algorithms, OOP"}
            </p>
            <p>
              <strong className="font-bold text-black">Frameworks &amp; Tools:</strong>{" "}
              {frameworksAndTools.join(", ") || "React, Next.js, Node.js, Supabase, Firebase, REST APIs, Git, GitHub, Linux, VS Code"}
            </p>
            {targetPos?.keywords && (
              <p>
                <strong className="font-bold text-black">Domain &amp; Architecture:</strong>{" "}
                {targetPos.keywords.slice(0, 8).join(", ")}
              </p>
            )}
          </div>
        </section>

        {/* Professional & Campus Experience */}
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">
            Experience &amp; Leadership
          </h2>
          <div className="space-y-1.5">
            {experiences.map((exp) => {
              const bullet = exp.cvBullets?.[0] || exp.bullets?.[0] || "";
              return (
                <div key={exp.key} className="break-inside-avoid">
                  <div className="flex items-baseline justify-between text-[11px]">
                    <span className="font-bold text-black">{exp.org}</span>
                    <span className="text-[10px] font-semibold text-slate-600">{exp.period}</span>
                  </div>
                  <div className="text-[10.5px] italic text-slate-800 mb-0.5">{exp.role}</div>
                  {bullet && (
                    <ul className="list-disc ml-4 text-[10px] sm:text-[10.5px] text-slate-800 leading-snug">
                      <li>{bullet}</li>
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Key Projects */}
        <section className="mb-2.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1.5">
            Key Projects
          </h2>
          <div className="space-y-1.5">
            {projects.slice(0, 4).map((proj) => {
              const bullets = targetPos?.projectBullets?.[proj.key] || proj.bullets.slice(0, 2);
              return (
                <div key={proj.key} className="break-inside-avoid">
                  <div className="flex items-baseline justify-between text-[11px]">
                    <div>
                      <span className="font-bold text-black">{proj.title}</span>
                      <span className="text-[10px] text-slate-600 ml-1.5">
                        ({proj.techStack.slice(0, 4).join(" · ")})
                      </span>
                    </div>
                    {proj.liveUrl && proj.liveUrl !== "#" && (
                      <span className="text-[10px] font-mono text-slate-600">
                        {proj.liveUrl.replace("https://", "").replace("www.", "").split("/")[0]}
                      </span>
                    )}
                  </div>
                  <ul className="list-disc ml-4 text-[10px] sm:text-[10.5px] text-slate-800 leading-snug">
                    {bullets.slice(0, 2).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>

        {/* Education */}
        <section className="mb-1.5">
          <h2 className="text-[11px] font-bold uppercase tracking-wider text-black border-b border-slate-400 pb-0.5 mb-1">
            Education
          </h2>
          <div className="space-y-1">
            {(profile.education ?? []).map((edu) => (
              <div key={edu.institution} className="break-inside-avoid">
                <div className="flex items-baseline justify-between text-[11px]">
                  <span className="font-bold text-black">{edu.institution}</span>
                  <span className="text-[10px] text-slate-600 font-semibold">{edu.period}</span>
                </div>
                <div className="text-[10.5px] text-slate-800 flex items-center justify-between">
                  <span>{edu.degree}</span>
                  <span className="text-[10px] text-slate-600 font-semibold">{edu.gpa}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-black font-semibold px-6 py-3 rounded-lg shadow-2xl z-50 animate-bounce print:hidden">
          {toastMsg}
        </div>
      )}

      {/* Print styles for pixel-perfect 1-page A4 document */}
      <style jsx global>{`
        @page {
          size: A4 portrait;
          margin: 8mm 10mm;
        }
        @media print {
          html, body {
            background: #ffffff !important;
            color: #000000 !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          body * {
            visibility: hidden !important;
          }
          #cv, #cv * {
            visibility: visible !important;
          }
          #cv {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .break-inside-avoid {
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}

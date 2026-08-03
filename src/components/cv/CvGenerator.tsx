"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { STATIC_FALLBACK, type ProfileData } from "@/lib/profile-data";

export default function CvGenerator() {
  const dataRef = useRef<ProfileData>(STATIC_FALLBACK);
  const [roleKey, setRoleKey] = useState("se");

  const render = useCallback(() => {
    const data = dataRef.current;
    const targetPos = data.targetPositions[roleKey];
    const personal = data.personal;
    if (!targetPos) return;

    const set = (id: string, val: string) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };

    // Name & contact
    set("cv-name", personal.name);
    set("cv-location", personal.location);
    set(
      "cv-contact",
      `${personal.altEmail || personal.email} — ${personal.phone} — ${personal.linkedin} — ${personal.github}`
    );
    set("cv-summary", targetPos.summary || personal.summary);

    // Skills
    const skEl = document.getElementById("cv-skills");
    if (skEl) {
      skEl.innerHTML = "";
      (targetPos.skills || []).forEach(([label, vals]) => {
        const p = document.createElement("p");
        p.className = "sk-row-item";
        p.innerHTML = `<strong>${label}:</strong> ${vals}`;
        skEl.appendChild(p);
      });
    }

    // Experience (1 bullet each, like the original)
    const expEl = document.getElementById("cv-experience");
    if (expEl) {
      expEl.innerHTML = "";
      data.experience.forEach((exp) => {
        let bullets =
          targetPos.experienceBullets?.[exp.key] ?? exp.cvBullets ?? exp.bullets;
        bullets = bullets.slice(0, 1);
        const div = document.createElement("div");
        div.className = "exp-item";
        div.innerHTML = `
          <div class="exp-hd">
            <span class="exp-org">${exp.org}</span>
            <span class="exp-date">${exp.period}</span>
          </div>
          <div class="exp-role">${exp.role}</div>
          <ul class="exp-ul">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
        expEl.appendChild(div);
      });
    }

    // Education
    const eduEl = document.getElementById("cv-education");
    if (eduEl) {
      eduEl.innerHTML = "";
      data.education.forEach((edu) => {
        const div = document.createElement("div");
        div.className = "edu-item";
        div.innerHTML = `
          <div class="edu-hd">
            <span class="edu-inst">${edu.institution}</span>
            <span class="edu-date">${edu.period}</span>
          </div>
          <div class="edu-deg">${edu.degree}</div>
          <div class="edu-gpa">${edu.gpa}</div>`;
        eduEl.appendChild(div);
      });
    }

    // Projects (skip placeholders)
    const projEl = document.getElementById("cv-projects");
    if (projEl) {
      projEl.innerHTML = "";
      data.projects
        .filter((p) => !p.isPlaceholder)
        .forEach((proj) => {
          const bullets = targetPos.projectBullets?.[proj.key] ?? proj.bullets;
          const div = document.createElement("div");
          div.className = "proj-item";
          div.innerHTML = `
            <div class="proj-hd">
              <span class="proj-name">${proj.title}</span>
              <span class="proj-date">2024</span>
            </div>
            <div class="proj-stack">${proj.techStack.join(" · ")}</div>
            <ul class="proj-ul">${bullets.map((b) => `<li>${b}</li>`).join("")}</ul>`;
          projEl.appendChild(div);
        });
    }

    // Activities
    const actEl = document.getElementById("cv-activities");
    if (actEl) {
      actEl.innerHTML = "";
      (targetPos.activities ?? data.activities).forEach((act) => {
        const li = document.createElement("li");
        li.textContent = act;
        actEl.appendChild(li);
      });
    }

    // Keywords + score
    const kwEl = document.getElementById("kws");
    if (kwEl) {
      kwEl.innerHTML = "";
      (targetPos.keywords || []).forEach((k) => {
        const b = document.createElement("span");
        b.className = "kw";
        b.textContent = k;
        kwEl.appendChild(b);
      });
    }
    set("scoreNum", String(targetPos.score));
    const sfill = document.getElementById("sfill");
    if (sfill) sfill.style.width = targetPos.score + "%";
  }, [roleKey]);

  useEffect(() => {
    render();
  }, [render]);

  const showToast = (msg: string) => {
    const t = document.getElementById("toast");
    if (!t) return;
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 2800);
  };

  const dlPDF = () => {
    render();
    setTimeout(() => window.print(), 300);
  };

  const cpy = async () => {
    const data = dataRef.current;
    const targetPos = data.targetPositions[roleKey];
    const personal = data.personal;
    if (!targetPos) return;

    const skLines = (targetPos.skills || []).map(([l, v]) => `${l}: ${v}`).join("\n");
    const expLines = data.experience
      .map((exp) => {
        let bullets = targetPos.experienceBullets?.[exp.key] ?? exp.cvBullets ?? exp.bullets;
        bullets = bullets.slice(0, 1);
        return `${exp.org} | ${exp.role} | ${exp.period}\n${bullets.map((b) => "• " + b).join("\n")}`;
      })
      .join("\n\n");
    const eduLines = data.education
      .map((edu) => `${edu.institution} | ${edu.period}\n${edu.degree}\n${edu.gpa}`)
      .join("\n\n");
    const projLines = data.projects
      .filter((p) => !p.isPlaceholder)
      .map((proj) => {
        const bullets = targetPos.projectBullets?.[proj.key] ?? proj.bullets;
        return `${proj.title} (2024) | ${proj.techStack.join(" · ")}\n${bullets.map((b) => "• " + b).join("\n")}`;
      })
      .join("\n\n");
    const actLines = (targetPos.activities ?? data.activities).map((b) => "• " + b).join("\n");

    const txt = `${personal.name} — ${targetPos.title}
${personal.location}
${personal.altEmail || personal.email} — ${personal.phone} — ${personal.linkedin} — ${personal.github}

PROFESSIONAL SUMMARY
${targetPos.summary || personal.summary}

SKILLS
${skLines}

EXPERIENCE

${expLines}

EDUCATION

${eduLines}

PROJECTS

${projLines}

ACTIVITIES & INTERESTS
${actLines}`;

    try {
      await navigator.clipboard.writeText(txt);
      showToast("📋 Copied to clipboard!");
    } catch {
      showToast("❌ Copy failed. Try manually.");
    }
  };

  return (
    <div className="pt-20 max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-white text-center mb-8">CV Generator</h1>

      <div className="rounded-xl bg-glass-bg border border-glass-border p-6 mb-8 flex flex-wrap items-center gap-4">
        <label className="text-sm text-gray-300 font-semibold">
          Target Role:
          <select
            id="roleSelect"
            value={roleKey}
            onChange={(e) => setRoleKey(e.target.value)}
            className="ml-3 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary text-sm"
          >
            {Object.entries(STATIC_FALLBACK.targetPositions).map(([k, v]) => (
              <option key={k} value={k} className="bg-bg">
                {v.title} — Match {v.score}%
              </option>
            ))}
          </select>
        </label>

        <div className="flex-1 min-w-[200px]">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div id="sfill" className="h-full bg-primary transition-all" style={{ width: "92%" }}></div>
            </div>
            <span id="scoreNum" className="text-primary font-bold font-mono">92</span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={dlPDF}
            className="bg-primary text-black font-bold py-2.5 px-5 rounded-lg hover:bg-white transition-colors text-sm uppercase tracking-wider"
          >
            <i className="fas fa-download mr-1.5"></i>PDF
          </button>
          <button
            onClick={cpy}
            className="bg-white/5 border border-white/10 text-gray-300 font-semibold py-2.5 px-5 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            <i className="fas fa-copy mr-1.5"></i>Copy
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8" id="kws"></div>

      {/* A4 CV preview — same structure as legacy */}
      <div id="cv" className="bg-white text-black rounded-lg p-8 print:shadow-none">
        <div className="cv-hd text-center border-b-2 border-black pb-4 mb-4">
          <h2 id="cv-name" className="text-2xl font-bold uppercase"></h2>
          <div id="cv-location" className="text-sm text-gray-700"></div>
          <div id="cv-contact" className="text-xs text-gray-700 mt-1"></div>
        </div>
        <div className="cv-body space-y-4">
          <div className="cs">
            <div className="cs-title font-bold uppercase text-sm">Professional Summary</div>
            <div className="cs-line border-b border-gray-300 mb-2"></div>
            <p id="cv-summary" className="text-sm leading-relaxed"></p>
          </div>
          <div className="cs">
            <div className="cs-title font-bold uppercase text-sm">Skills</div>
            <div className="cs-line border-b border-gray-300 mb-2"></div>
            <div id="cv-skills" className="space-y-1 text-sm"></div>
          </div>
          <div className="cs">
            <div className="cs-title font-bold uppercase text-sm">Experience</div>
            <div className="cs-line border-b border-gray-300 mb-2"></div>
            <div id="cv-experience"></div>
          </div>
          <div className="cs">
            <div className="cs-title font-bold uppercase text-sm">Education</div>
            <div className="cs-line border-b border-gray-300 mb-2"></div>
            <div id="cv-education"></div>
          </div>
          <div className="cs">
            <div className="cs-title font-bold uppercase text-sm">Projects</div>
            <div className="cs-line border-b border-gray-300 mb-2"></div>
            <div id="cv-projects"></div>
          </div>
          <div className="cs last">
            <div className="cs-title font-bold uppercase text-sm">Activities &amp; Interests</div>
            <div className="cs-line border-b border-gray-300 mb-2"></div>
            <ul id="cv-activities" className="list-disc list-inside text-sm"></ul>
          </div>
        </div>
      </div>

      <div id="toast" className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-primary text-black font-semibold px-6 py-3 rounded-lg opacity-0 transition-opacity pointer-events-none print:hidden"></div>
      <style>{`#toast.show { opacity: 1; }`}</style>
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cv, #cv * { visibility: visible; }
          #cv { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
}

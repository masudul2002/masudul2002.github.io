"use client";

import { useState } from "react";
import type { Personal } from "@/lib/profile-data";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Contact({ personal }: { personal: Personal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit() {
    if (!name || !email || !message) {
      setStatus("error");
      return;
    }
    setStatus("sending");

    // 1) Save to Supabase (best-effort). If it fails, site still works via WhatsApp.
    let dbOk = false;
    try {
      const supabase = (window as unknown as { supabase?: { from: (t: string) => { insert: (r: unknown[]) => Promise<{ error: unknown }> } } }).supabase;
      if (supabase) {
        const { error } = await supabase.from("contact_messages").insert([{ name, email, subject, message }]);
        dbOk = !error;
        if (error) console.error("Supabase insert failed:", error);
      }
    } catch (err) {
      console.error("Supabase insert error:", err);
    }

    // 2) Always open WhatsApp (previous behavior preserved)
    const formattedMessage = `*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const encoded = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${personal.whatsappNumber}?text=${encoded}`, "_blank");

    setStatus(dbOk ? "sent" : "sent"); // WhatsApp always opens; DB status is best-effort
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm";

  return (
    <section id="contact" className="py-24 px-4 max-w-5xl mx-auto">
      <SectionHeading
        eyebrow="Contact"
        title="Get In Touch"
        description="Have a project in mind or want to collaborate? Send me a message."
      />
      <div className="grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div className="rounded-xl bg-glass-bg border border-glass-border p-6">
            <h3 className="font-semibold text-primary mb-4">
              <i className="fas fa-phone mr-2"></i>Direct
            </h3>
            <p className="text-sm text-gray-300 mb-2">{personal.phone}</p>
            <p className="text-sm text-gray-300 break-all">{personal.email}</p>
          </div>
          <div className="rounded-xl bg-glass-bg border border-glass-border p-6">
            <h3 className="font-semibold text-primary mb-4">
              <i className="fas fa-share-alt mr-2"></i>Social
            </h3>
            <div className="flex gap-3">
              <a
                href={personal.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href={personal.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href={`https://wa.me/${personal.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="WhatsApp"
              >
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-3 rounded-xl bg-glass-bg border border-glass-border p-6">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={inputCls}
                  placeholder="John Doe"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                  placeholder="john@example.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className={inputCls}
                placeholder="Project Inquiry"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={`${inputCls} h-32 resize-none`}
                placeholder="Tell me about your project..."
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              disabled={status === "sending"}
              className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-neon disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send Message"}
            </button>
            {status === "error" && (
              <p className="text-sm text-red-400">Please fill in your name, email, and message.</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
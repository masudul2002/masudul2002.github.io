"use client";

import { useState } from "react";
import type { Personal } from "@/lib/profile-data";

export default function Contact({ personal }: { personal: Personal }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSend() {
    setError(null);
    if (!name || !email || !message) {
      setError("Please fill in your name, email, and message.");
      return;
    }
    setSending(true);

    // 1) Save to Supabase (best-effort, anon insert allowed by RLS)
    let dbOk = false;
    try {
      const supabase = (window as unknown as { supabase?: { from: (t: string) => { insert: (r: unknown[]) => Promise<{ error: unknown }> } } }).supabase;
      if (supabase) {
        const { error: e } = await supabase.from("contact_messages").insert([{ name, email, subject, message }]);
        dbOk = !e;
        if (e) console.error("Supabase insert failed:", e);
      }
    } catch (err) {
      console.error("Supabase insert error:", err);
    }

    // 2) Always open WhatsApp (previous behavior preserved)
    const formatted = `*Name:* ${name}\n*Email:* ${email}\n*Subject:* ${subject}\n*Message:* ${message}`;
    const encoded = encodeURIComponent(formatted);
    window.open(`https://wa.me/${personal.whatsappNumber}?text=${encoded}`, "_blank");

    setSending(false);
    if (dbOk) console.log("Message saved to Supabase.");
  }

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors text-sm";

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute -left-20 top-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -right-20 bottom-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 flex items-center gap-3">
            <i className="fas fa-envelope text-primary"></i> Get In Touch
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto glass-card rounded-2xl border border-glass-border overflow-hidden flex flex-col md:flex-row shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          {/* Contact Info */}
          <div className="p-10 md:w-2/5 bg-gradient-to-br from-gray-900 to-black">
            <h3 className="text-2xl font-bold mb-6 text-white">Contact Info</h3>
            <p className="text-sm text-gray-400 mb-8">
              Feel free to reach out for collaborations, questions, or just to say hi!
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <i className="fas fa-envelope mt-1 text-primary"></i>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Email</p>
                  <a href={`mailto:${personal.email}`} className="text-white hover:text-primary transition-colors text-sm break-all">
                    {personal.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <i className="fas fa-phone mt-1 text-secondary"></i>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Phone</p>
                  <a href={`https://wa.me/${personal.whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                    className="text-white hover:text-secondary transition-colors text-sm">
                    {personal.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <i className="fas fa-map-marker-alt mt-1 text-pink-500"></i>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
                  <p className="text-white text-sm">{personal.location}</p>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <p className="text-xs text-gray-500 uppercase font-bold mb-4">Connect on Socials</p>
              <div className="flex gap-4">
                <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-black transition-all">
                  <i className="fab fa-github"></i>
                </a>
                <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-secondary hover:text-white transition-all">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.facebook.com/masudul2002" target="_blank" rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-blue-600 hover:text-white transition-all">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-10 md:w-3/5 bg-bg/50">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Name</label>
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="john@example.com" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Subject</label>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className={inputCls} placeholder="Project Inquiry" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase">Message</label>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} className={`${inputCls} h-32 resize-none`} placeholder="Tell me about your project..."></textarea>
              </div>
              {error && <p className="text-sm text-red-400">{error}</p>}
              <button
                type="submit"
                onClick={handleSend}
                disabled={sending}
                className="w-full bg-primary text-black font-bold py-3 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-[0_0_15px_rgba(0,242,255,0.3)] hover:shadow-[0_0_25px_rgba(0,242,255,0.5)] disabled:opacity-60"
              >
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

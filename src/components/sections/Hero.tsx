"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import type { Personal } from "@/lib/profile-data";

const TYPED_STRINGS = ["Programmer", "FinTech Enthusiast", "Problem Solver", "Leader"];

export default function Hero({ personal }: { personal: Personal }) {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!typedRef.current) return;
    const typed = new Typed(typedRef.current, {
      strings: TYPED_STRINGS,
      typeSpeed: 50,
      backSpeed: 30,
      backDelay: 2000,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Neon background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div className="mb-8 flex justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={personal.profileImage}
            alt={personal.name}
            className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-2 border-primary/50 shadow-neon"
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
          {personal.name}
        </h1>

        <p className="text-xl md:text-2xl text-primary mb-3">
          <span ref={typedRef}></span>
        </p>

        <p className="text-lg text-gray-300 mb-2">{personal.title}</p>
        <p className="text-gray-400 mb-8">
          <i className="fas fa-map-marker-alt mr-2"></i>
          {personal.location}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={`https://wa.me/${personal.whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-black font-bold py-3 px-8 rounded-lg hover:bg-white transition-colors uppercase tracking-widest text-sm shadow-neon"
          >
            Contact Me
          </a>
          <a
            href={personal.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-glass-bg border border-glass-border text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            GitHub
          </a>
          <a
            href={personal.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-glass-bg border border-glass-border text-white font-semibold py-3 px-8 rounded-lg hover:bg-white/10 transition-colors text-sm"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}

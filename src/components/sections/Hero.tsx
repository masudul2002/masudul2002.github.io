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
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 relative overflow-hidden">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <div className="order-2 md:order-1">
          <div className="inline-block px-3 py-1 mb-4 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono tracking-wider">
            WELCOME TO MY PORTFOLIO
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            Hi, I&apos;m <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400">
              MD. Masudul
            </span>
            <span className="text-primary">Hasan</span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-light mb-6 font-mono h-12">
            I am a <span ref={typedRef} className="text-secondary font-semibold"></span>
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-lg leading-relaxed">
            {personal.summary}
          </p>

          <div className="flex flex-wrap gap-4">
            <a href="#contact"
              className="group relative px-8 py-3 rounded-none overflow-hidden bg-primary text-black font-bold transition-all hover:scale-105 active:scale-95">
              <div className="absolute inset-0 w-0 bg-white transition-all duration-[250ms] ease-out group-hover:w-full opacity-20"></div>
              <span className="relative flex items-center gap-2">Contact Me <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i></span>
            </a>
            <a href="/cv"
              className="group relative px-8 py-3 rounded-none overflow-hidden border border-primary text-primary font-bold transition-all hover:bg-primary/10 hover:scale-105 active:scale-95">
              <span className="relative flex items-center gap-2">Generate Resume <i className="fas fa-file-lines group-hover:translate-x-1 transition-transform"></i></span>
            </a>
            <a href="#projects"
              className="px-8 py-3 rounded-none border border-glass-border bg-glass-bg backdrop-blur hover:bg-white/10 transition-all font-medium flex items-center gap-2">
              View Work <i className="fas fa-code"></i>
            </a>
          </div>

          <div className="mt-12 flex gap-6 text-2xl text-gray-400">
            <a href={personal.githubUrl} target="_blank" rel="noopener noreferrer"
              className="hover:text-white hover:scale-110 transition-all"><i className="fab fa-github"></i></a>
            <a href={personal.linkedinUrl} target="_blank" rel="noopener noreferrer"
              className="hover:text-[#0077b5] hover:scale-110 transition-all"><i className="fab fa-linkedin"></i></a>
            <a href={`mailto:${personal.email}`}
              className="hover:text-red-400 hover:scale-110 transition-all"><i className="fas fa-envelope"></i></a>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center relative">
          <div className="relative w-72 h-72 md:w-[450px] md:h-[450px]">
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-[100px] opacity-20 animate-pulse"></div>
            <div className="glass-card relative z-10 w-full h-full rounded-2xl overflow-hidden border border-glass-border p-2 rotate-3 hover:rotate-0 transition-all duration-500 shadow-2xl shadow-primary/10">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-50 z-20 mix-blend-overlay"></div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={personal.profileImage} alt="MD MASUDUL HASAN"
                className="w-full h-full object-cover rounded-xl filter grayscale hover:grayscale-0 transition-all duration-500 scale-100 hover:scale-110" />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -left-6 glass-card p-4 rounded-lg animate-float border border-glass-border z-30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <i className="fas fa-code"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Expertise</p>
                  <p className="font-bold text-sm">C++ &amp; Python</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-6 -right-2 glass-card p-4 rounded-lg animate-float-delayed border border-glass-border z-30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <i className="fas fa-trophy"></i>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Competitive</p>
                  <p className="font-bold text-sm">Programmer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-gray-500">
        <a href="#about" className="flex flex-col items-center gap-2 text-sm uppercase tracking-widest hover:text-primary transition-colors">
          Scroll
          <i className="fas fa-chevron-down"></i>
        </a>
      </div>
    </section>
  );
}

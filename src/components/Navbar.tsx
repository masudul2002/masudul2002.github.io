"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";

const DESKTOP_LINKS = [
  { href: "#home", icon: "fas fa-home", label: "Home" },
  { href: "#about", icon: "fas fa-user", label: "About" },
  { href: "#skills", icon: "fas fa-code", label: "Skills" },
  { href: "#experience", icon: "fas fa-briefcase", label: "Experience" },
  { href: "#projects", icon: "fas fa-laptop-code", label: "Projects" },
  { href: "/payment", icon: "fas fa-credit-card", label: "Payment" },
];

const MOBILE_LINKS = [
  { href: "#home", icon: "fas fa-home", label: "Home" },
  { href: "#about", icon: "fas fa-user", label: "About" },
  { href: "#skills", icon: "fas fa-code", label: "Skills" },
  { href: "#experience", icon: "fas fa-briefcase", label: "Experience" },
  { href: "#leadership", icon: "fas fa-star", label: "Leadership" },
  { href: "#cp", icon: "fas fa-trophy", label: "CP" },
  { href: "#projects", icon: "fas fa-laptop-code", label: "Projects" },
  { href: "/payment", icon: "fas fa-credit-card", label: "Payment" },
  { href: "#contact", icon: "fas fa-envelope", label: "Contact" },
];

function subscribeTheme(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

function getThemeSnapshot() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") === "light" ? "light" : "dark";
}

function getThemeServerSnapshot() {
  return "dark";
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    window.dispatchEvent(new Event("storage"));
  };

  const navLink =
    "group relative px-3 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors";

  return (
    <nav
      id="navbar"
      className={`fixed w-full z-50 ${scrolled ? "scrolled" : ""}`}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold font-mono text-white flex items-center gap-2 group">
          <span className="text-primary group-hover:drop-shadow-[0_0_8px_rgba(0,242,255,0.8)] transition-all">
            &lt;MH /&gt;
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {DESKTOP_LINKS.map((l) => (
            <a key={l.label} href={l.href} className={navLink}>
              <span className="relative z-10 flex items-center gap-2">
                <i className={`${l.icon} text-xs text-gray-500 group-hover:text-primary transition-colors duration-300`}></i>
                {l.label}
              </span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
              <span className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </a>
          ))}

          {/* Theme Toggle */}
          <button id="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme" title="Toggle Light / Dark mode"
            className="w-10 h-10 rounded-full bg-glass-bg border border-glass-border flex items-center justify-center text-primary hover:bg-white/10 transition-colors">
            <span className="toggle-thumb">
              <i className={theme === "dark" ? "fas fa-moon" : "fas fa-sun"} id="toggle-icon"></i>
            </span>
          </button>

          <a href="#contact"
            className="px-5 py-2 rounded-full border border-primary text-primary hover:bg-primary hover:text-black transition-all duration-300 text-sm font-bold shadow-[0_0_10px_rgba(0,242,255,0.2)] hover:shadow-[0_0_20px_rgba(0,242,255,0.6)] flex items-center gap-2 group">
            <span>Let&apos;s Talk</span>
            <i className="fas fa-arrow-right -rotate-45 group-hover:rotate-0 transition-transform duration-300"></i>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white text-2xl focus:outline-none hover:text-primary transition-colors"
          onClick={() => setOpen(!open)} aria-label="Menu">
          <i className={`fas ${open ? "fa-times" : "fa-bars"}`}></i>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-x-0 top-0 bg-black/97 z-[60] transform transition-transform duration-500 ease-out md:hidden flex flex-col items-center backdrop-blur-2xl overflow-y-auto ${
          open ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ maxHeight: "100dvh", padding: "72px 16px 24px" }}
      >
        <button className="absolute top-5 right-6 text-3xl text-gray-400 hover:text-white transition-colors"
          onClick={() => setOpen(false)} aria-label="Close">
          &times;
        </button>

        <div className="w-12 h-0.5 bg-primary/40 rounded-full mb-4"></div>

        <div className="grid grid-cols-2 gap-2 w-full max-w-xs mb-4">
          {MOBILE_LINKS.map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="mobile-link flex items-center gap-2 px-4 py-2.5 rounded-xl text-gray-300 hover:text-primary hover:bg-white/5 transition-all text-sm font-medium border border-transparent hover:border-primary/20">
              <i className={`${l.icon} text-primary w-4 text-center text-xs`}></i> {l.label}
            </a>
          ))}
        </div>

        <div className="w-12 h-0.5 bg-primary/40 rounded-full mb-4"></div>

        <a href="#contact" onClick={() => setOpen(false)}
          className="mobile-link w-full max-w-xs px-8 py-3 rounded-full bg-primary text-black font-bold shadow-neon text-center hover:scale-105 active:scale-95 transition-transform text-sm">
          Let&apos;s Talk
        </a>
      </div>
    </nav>
  );
}

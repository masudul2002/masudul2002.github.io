"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 transition-all ${
        scrolled ? "bg-black/80 shadow-lg backdrop-blur-sm" : "bg-black/30"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="font-mono text-primary font-bold tracking-widest text-lg">
          M<span className="text-white">.</span>H
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-gray-300 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/cv"
            className="text-sm font-semibold bg-primary text-black px-4 py-2 rounded-lg hover:bg-white transition-colors"
          >
            CV
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white text-xl"
          aria-label="Menu"
        >
          <i className={open ? "fas fa-times" : "fas fa-bars"}></i>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-black/95 border-t border-white/10 px-4 py-4 space-y-3">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block text-gray-300 hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href="/cv"
            onClick={() => setOpen(false)}
            className="block text-primary font-semibold"
          >
            CV Generator
          </Link>
        </div>
      )}
    </nav>
  );
}

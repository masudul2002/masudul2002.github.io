"use client";

import { useEffect, useSyncExternalStore } from "react";

function getSnapshot() {
  if (typeof window === "undefined") return "dark";
  return localStorage.getItem("theme") === "light" ? "light" : "dark";
}

function getServerSnapshot() {
  return "dark";
}

function subscribe(cb: () => void) {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Apply the theme class to <html> whenever the stored value changes
  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    // Notify other hooks (useSyncExternalStore on storage event won't fire for same-tab,
    // so dispatch manually)
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <>
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-glass-bg border border-glass-border text-primary flex items-center justify-center hover:bg-white/10 transition-colors shadow-neon"
      >
        {theme === "dark" ? (
          <i className="fas fa-sun" aria-hidden="true"></i>
        ) : (
          <i className="fas fa-moon" aria-hidden="true"></i>
        )}
      </button>
      {children}
    </>
  );
}
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

// ThemeProvider is a PURE provider — no UI. The only theme toggle is in the
// Navbar (switch-style). It syncs the html.light class with localStorage.
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    document.documentElement.classList.toggle("light", theme === "light");
  }, [theme]);

  return <>{children}</>;
}

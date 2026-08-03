"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const interval = setInterval(cb, 60000);
  window.addEventListener("focus", cb);
  return () => {
    clearInterval(interval);
    window.removeEventListener("focus", cb);
  };
}

function getSnapshot() {
  return new Date().getFullYear();
}

function getServerSnapshot() {
  return 2026;
}

export function Footer() {
  const year = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <footer className="py-8 border-t border-glass-border bg-black/50 backdrop-blur text-center relative z-10">
      <div className="container mx-auto px-6">
        <p className="text-gray-500 text-sm">
          &copy; {year} <span className="text-primary font-bold">MD. MASUDUL HASAN</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

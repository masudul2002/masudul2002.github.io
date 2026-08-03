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
    <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-400">
      <p>
        © {year} <span className="text-white font-semibold">MD. MASUDUL HASAN</span>. All
        rights reserved.
      </p>
    </footer>
  );
}
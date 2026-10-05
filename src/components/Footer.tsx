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
      <div className="container mx-auto px-6 flex flex-col items-center justify-center gap-3">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/icon-192.png"
            alt="MH Logo"
            className="w-7 h-7 object-contain drop-shadow-[0_0_6px_rgba(0,242,255,0.4)]"
          />
          <span className="font-mono text-sm font-bold text-white tracking-wider">&lt;MH /&gt;</span>
        </div>
        <p className="text-gray-500 text-xs sm:text-sm">
          &copy; {year} <span className="text-primary font-bold">MD. MASUDUL HASAN</span>. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}

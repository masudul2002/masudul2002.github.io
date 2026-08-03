"use client";

import { useEffect } from "react";

export default function Cursor() {
  useEffect(() => {
    if (window.matchMedia("(hover: none) and (pointer: coarse)").matches) return;

    const dot = document.getElementById("cursor-dot");
    const glow = document.getElementById("cursor-glow");
    if (!dot || !glow) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.left = mouseX + "px";
      dot.style.top = mouseY + "px";
    };

    const animate = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.left = glowX + "px";
      glow.style.top = glowY + "px";
      requestAnimationFrame(animate);
    };

    const selectors = "a, button, input, textarea, select, label, [role='button'], .glass-card";
    const onEnter = (e: Event) => {
      if ((e.target as Element).closest?.(selectors)) document.body.classList.add("cursor-hover");
    };
    const onLeave = (e: Event) => {
      if ((e.target as Element).closest?.(selectors)) document.body.classList.remove("cursor-hover");
    };
    const onDown = () => document.body.classList.add("cursor-click");
    const onUp = () => document.body.classList.remove("cursor-click");
    const onDocLeave = () => {
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    };
    const onDocEnter = () => {
      dot.style.opacity = "1";
      glow.style.opacity = "1";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onDocLeave);
    document.addEventListener("mouseenter", onDocEnter);
    animate();

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onDocLeave);
      document.removeEventListener("mouseenter", onDocEnter);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"></div>
      <div id="cursor-glow"></div>
    </>
  );
}

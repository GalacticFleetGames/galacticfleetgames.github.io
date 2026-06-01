"use client";

import { useEffect, useRef } from "react";

export default function CosmicBackground() {
  const baseRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (baseRef.current) {
          baseRef.current.style.transform = `translate3d(0, ${y * -0.12}px, 0)`;
        }
        if (starsRef.current) {
          // Stars drift slower than the base cosmic image — they feel like a
          // distant, almost-static starfield while the cosmos in front of them
          // moves more.
          starsRef.current.style.transform = `translate3d(0, ${y * -0.05}px, 0)`;
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-wrap" aria-hidden="true">
      <div className="bg-inner" ref={baseRef}>
        <img className="bg-layer bg-base" src="/assets/bg.png" alt="" />
      </div>
      <div className="bg-stars" ref={starsRef}></div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

type Star = { x: number; y: number; size: number; dur: number; delay: number };

const STAR_COUNT = 90;

function generateStars(): Star[] {
  return Array.from({ length: STAR_COUNT }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() < 0.85 ? 1 : Math.random() < 0.6 ? 2 : 3,
    dur: 2 + Math.random() * 6,
    delay: Math.random() * 6,
  }));
}

export function CosmicBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setStars(generateStars());
  }, []);

  // Subtle parallax on mouse + a gentle drift on scroll
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let mouseX = 0;
    let mouseY = 0;

    const apply = () => {
      const x = mouseX * 14;
      const baseY = mouseY * 10;
      // Scroll progress 0..1, capped so the image never drifts past its bleed.
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      const scrollOffset = -progress * window.innerHeight * 0.08;
      el.style.transform = `translate3d(${x}px, ${baseY + scrollOffset}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX / window.innerWidth - 0.5;
      mouseY = e.clientY / window.innerHeight - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(apply);
    };
    const onScroll = () => {
      apply();
    };

    apply();
    window.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true, capture: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll, { capture: true });
      document.removeEventListener("scroll", onScroll, { capture: true });
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg"
    >
      {/* Painted nebula — extra bleed so the scroll drift never reveals an edge */}
      <div
        ref={ref}
        className="absolute inset-[-10%] bg-cover bg-center opacity-90"
        style={{
          backgroundImage: "url(/bg/cosmos.png)",
          transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
          willChange: "transform",
        }}
      />
      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#07030f_85%)]" />
      {/* Aurora blobs */}
      <div
        className="aurora absolute -top-1/4 -left-1/4 h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(168,85,247,0.45), transparent 60%)",
        }}
      />
      <div
        className="aurora absolute -bottom-1/3 -right-1/4 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          animationDelay: "-9s",
          background:
            "radial-gradient(circle at 70% 70%, rgba(236,72,153,0.28), transparent 60%)",
        }}
      />
      <div
        className="aurora absolute top-1/3 right-1/4 h-[40vmax] w-[40vmax] rounded-full"
        style={{
          animationDelay: "-4s",
          background:
            "radial-gradient(circle at 50% 50%, rgba(124,58,237,0.35), transparent 60%)",
        }}
      />
      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full bg-white shadow-[0_0_6px_rgba(216,180,254,0.8)]"
            style={
              {
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: s.size,
                height: s.size,
                "--dur": `${s.dur}s`,
                "--delay": `${s.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
    </div>
  );
}

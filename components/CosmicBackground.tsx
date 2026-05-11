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

  // Subtle parallax on mouse
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 14;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-bg"
    >
      {/* Painted nebula */}
      <div
        ref={ref}
        className="absolute inset-[-6%] bg-cover bg-center opacity-90 transition-transform duration-[4000ms] ease-out"
        style={{ backgroundImage: "url(/bg/cosmos.png)" }}
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

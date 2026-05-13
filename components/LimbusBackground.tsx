"use client";

import { useEffect, useMemo, useState } from "react";

type Ember = {
  x: number;
  y: number;
  size: number;
  dur: number;
  delay: number;
  hue: string;
};

function generateEmbers(count: number): Ember[] {
  const hues = ["#ef4444", "#fb7185", "#fbbf24", "#f97316", "#fde047"];
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1 + Math.random() * 2.4,
    dur: 3 + Math.random() * 6,
    delay: Math.random() * 6,
    hue: hues[Math.floor(Math.random() * hues.length)],
  }));
}

export function LimbusBackground() {
  const [embers, setEmbers] = useState<Ember[]>([]);

  useEffect(() => {
    setEmbers(generateEmbers(60));
  }, []);

  const cornerSeals = useMemo(
    () => (
      <>
        <Seal className="top-24 left-6 hidden lg:block" rotate={-8} />
        <Seal className="top-24 right-6 hidden lg:block" rotate={8} />
        <Seal
          className="bottom-24 left-6 hidden lg:block"
          rotate={6}
          number="VIII"
        />
        <Seal
          className="bottom-24 right-6 hidden lg:block"
          rotate={-6}
          number="VIII"
        />
      </>
    ),
    []
  );

  return (
    <>
      {/* Base crimson-to-black gradient */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-30"
        style={{
          background:
            "linear-gradient(180deg, #2a070d 0%, #1a0508 35%, #100307 65%, #0a0205 100%)",
        }}
      />

      {/* Veil image: hand-painted crimson smoke */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url(/bg/limbus-veil.png)",
          opacity: 0.55,
          mixBlendMode: "screen",
        }}
      />

      {/* Corner ember glows */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 -left-32 -z-20 h-[55vmax] w-[55vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 38, 38, 0.32), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-48 -right-40 -z-20 h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(251, 146, 60, 0.22), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/3 right-1/4 -z-20 h-[35vmax] w-[35vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(190, 18, 60, 0.18), transparent 60%)",
        }}
      />

      {/* Floating embers */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10">
        {embers.map((e, i) => (
          <span
            key={i}
            className="twinkle absolute rounded-full"
            style={
              {
                left: `${e.x}%`,
                top: `${e.y}%`,
                width: e.size,
                height: e.size,
                background: e.hue,
                boxShadow: `0 0 6px ${e.hue}, 0 0 12px ${e.hue}aa`,
                "--dur": `${e.dur}s`,
                "--delay": `${e.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Vignette at edges to push focus inward */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(7, 1, 5, 0.55) 100%)",
        }}
      />

      {/* Decorative gothic corner seals */}
      {cornerSeals}
    </>
  );
}

function Seal({
  className,
  rotate = 0,
  number = "Bus 8",
}: {
  className?: string;
  rotate?: number;
  number?: string;
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed z-0 ${className ?? ""}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <svg width="78" height="78" viewBox="0 0 80 80" fill="none">
        <circle
          cx="40"
          cy="40"
          r="34"
          stroke="rgba(239, 68, 68, 0.35)"
          strokeWidth="1"
          strokeDasharray="2 4"
        />
        <circle
          cx="40"
          cy="40"
          r="26"
          stroke="rgba(239, 68, 68, 0.45)"
          strokeWidth="0.8"
        />
        <text
          x="40"
          y="44"
          textAnchor="middle"
          fontFamily="serif"
          fontSize="11"
          fontStyle="italic"
          fill="rgba(252, 165, 165, 0.7)"
          letterSpacing="2"
        >
          {number}
        </text>
        <line
          x1="40"
          y1="6"
          x2="40"
          y2="14"
          stroke="rgba(239, 68, 68, 0.5)"
          strokeWidth="1"
        />
        <line
          x1="40"
          y1="66"
          x2="40"
          y2="74"
          stroke="rgba(239, 68, 68, 0.5)"
          strokeWidth="1"
        />
        <line
          x1="6"
          y1="40"
          x2="14"
          y2="40"
          stroke="rgba(239, 68, 68, 0.5)"
          strokeWidth="1"
        />
        <line
          x1="66"
          y1="40"
          x2="74"
          y2="40"
          stroke="rgba(239, 68, 68, 0.5)"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}

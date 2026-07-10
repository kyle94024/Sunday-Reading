"use client";

import type { CSSProperties, ReactNode } from "react";

/* Tiny limbus nods shared by the cutesy limbus drafts: each sinner's
   canonical numeral worn in a soft hexagon (Dante a tiny clock, the
   Golden Bough a star). No game art — just shapes. */

export const SINNER_NUM: Record<string, string> = {
  yisang: "I", faust: "II", donquixote: "III", ryoshu: "IV",
  meursault: "V", honglu: "VI", heathcliff: "VII", ishmael: "VIII",
  rodion: "IX", sinclair: "X", outis: "XI", gregor: "XII",
};

export function nameSlug(name?: string | null): string | null {
  if (!name) return null;
  const s = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  return s || null;
}

export function Hex({ size = 42, color = "#5f93bd", children, style }: { size?: number; color?: string; children?: ReactNode; style?: CSSProperties }) {
  const h = size * 1.15;
  return (
    <span aria-hidden style={{ position: "relative", display: "inline-grid", placeItems: "center", width: size, height: h, ...style }}>
      <svg viewBox="0 0 100 115" width={size} height={h} style={{ position: "absolute", inset: 0 }}>
        <polygon points="50,3 96,30 96,85 50,112 4,85 4,30" fill={`color-mix(in oklab, ${color} 18%, white)`} stroke={color} strokeWidth="6" strokeLinejoin="round" />
      </svg>
      <span style={{ position: "relative", zIndex: 1, lineHeight: 1 }}>{children}</span>
    </span>
  );
}

export function TinyClock({ size = 20, color = "#33465a" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="9" />
      <line x1="50" y1="50" x2="50" y2="26" stroke={color} strokeWidth="9" strokeLinecap="round" />
      <line x1="50" y1="50" x2="68" y2="58" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

"use client";

import type { CSSProperties, ReactNode } from "react";

/* ── Limbus Company asset helpers ──────────────────────────────────────
   Sprites live in public/drafts/lc (pulled from the community wiki):
   stand-<slug>.png  full standing sprites (~500×1700, transparent)
   face-<slug>.png   512² announcer portraits (11 sinners + vergilius)
   sin-<sin>.png     108² sin-affinity icons
   Art © Project Moon — non-commercial fan usage, credited in footers. */

export type LcTheme = "canto" | "terminal" | "library" | "dossier";

export const SINS = ["wrath", "lust", "sloth", "gluttony", "gloom", "pride", "envy"] as const;

const HAS_FACE = new Set([
  "yisang", "donquixote", "ryoshu", "honglu", "heathcliff", "ishmael",
  "rodion", "sinclair", "gregor", "dante", "vergilius",
]);

export function sinnerSlug(name?: string | null): string | null {
  if (!name) return null;
  const s = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
  return s || null;
}

/* square head-shot: real announcer art when it exists, otherwise a
   bust crop of the standing sprite (Faust / Meursault / Outis) */
export function SinnerFace({
  sinner,
  size = 48,
  className = "",
  style,
}: {
  sinner?: string | null;
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const slug = sinnerSlug(sinner);
  if (!slug) return null;
  if (HAS_FACE.has(slug)) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`/drafts/lc/face-${slug}.png`}
        alt=""
        width={size}
        height={size}
        draggable={false}
        aria-hidden
        className={className}
        style={{ objectFit: "cover", ...style }}
      />
    );
  }
  return (
    <span
      aria-hidden
      className={className}
      style={{ width: size, height: size, display: "inline-block", position: "relative", overflow: "hidden", ...style }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`/drafts/lc/stand-${slug}.png`}
        alt=""
        draggable={false}
        style={{ position: "absolute", left: "50%", top: -size * 0.06, width: size * 2.4, maxWidth: "none", transform: "translateX(-50%)", height: "auto" }}
      />
    </span>
  );
}

/* full standing sprite, scaled by height */
export function SinnerStand({
  sinner,
  h = 220,
  flip = false,
  glow,
  className = "",
  style,
}: {
  sinner?: string | null;
  h?: number;
  flip?: boolean;
  glow?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const slug = sinnerSlug(sinner);
  if (!slug) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/drafts/lc/stand-${slug}.png`}
      alt=""
      draggable={false}
      aria-hidden
      className={className}
      style={{
        height: h,
        width: "auto",
        filter: glow ? `drop-shadow(0 0 16px ${glow})` : undefined,
        transform: flip ? "scaleX(-1)" : undefined,
        ...style,
      }}
    />
  );
}

export function SinIcon({
  sin,
  size = 30,
  className = "",
  style,
}: {
  sin: (typeof SINS)[number];
  size?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/drafts/lc/sin-${sin}.png`}
      alt=""
      width={size}
      height={size}
      draggable={false}
      aria-hidden
      className={className}
      style={style}
    />
  );
}

/* Abnormality risk class from a rating — dossier flavor */
export function riskClass(rating: number | null): string {
  if (rating == null) return "—";
  if (rating < 2) return "ZAYIN";
  if (rating < 3) return "TETH";
  if (rating < 4) return "HE";
  if (rating < 4.8) return "WAW";
  return "ALEPH";
}

/* ── themed side rails: sprites and icons only, no words ── */

const RAIL_STANDS: Record<LcTheme, [string[], string[]]> = {
  canto: [["yisang", "heathcliff", "ryoshu"], ["faust", "ishmael", "outis"]],
  terminal: [["gregor", "rodion", "sinclair"], ["meursault", "donquixote", "honglu"]],
  library: [["faust", "honglu", "sinclair"], ["ryoshu", "yisang", "rodion"]],
  dossier: [["donquixote", "gregor", "ishmael"], ["heathcliff", "outis", "meursault"]],
};

function railSet(theme: LcTheme, side: 0 | 1, glow: string): ReactNode[] {
  const stands = RAIL_STANDS[theme][side];
  const sins = side === 0 ? SINS.slice(0, 4) : SINS.slice(4);
  const items: ReactNode[] = [];
  stands.forEach((s, i) => {
    items.push(<SinnerStand key={`st-${s}`} sinner={s} h={i === 1 ? 250 : 210} flip={side === 1 ? i !== 1 : i === 1} glow={glow} />);
    const sin = sins[i % sins.length];
    if (theme === "dossier") {
      items.push(
        <span key={`sn-${String(sin)}`} style={{ background: "#f5ecd4", padding: 7, paddingBottom: 18, boxShadow: "0 6px 14px -8px rgba(40,28,12,0.7)", transform: `rotate(${i % 2 ? 4 : -4}deg)`, display: "inline-block" }}>
          <SinIcon sin={sin} size={44} />
        </span>
      );
    } else {
      items.push(<SinIcon key={`sn-${String(sin)}`} sin={sin} size={i === 1 ? 46 : 38} className={theme === "library" ? "lc-flicker" : ""} style={{ filter: `drop-shadow(0 0 10px ${glow})` }} />);
    }
  });
  return items;
}

export function lcRails(theme: LcTheme): { left: ReactNode[]; right: ReactNode[]; glow: string } {
  const glow =
    theme === "canto" ? "rgba(201,164,92,0.55)" :
    theme === "terminal" ? "rgba(232,163,61,0.5)" :
    theme === "library" ? "rgba(185,141,84,0.55)" :
    "rgba(60,42,20,0.35)";
  return { left: railSet(theme, 0, glow), right: railSet(theme, 1, glow), glow };
}

export const LC_STATUS: Record<LcTheme, Record<string, string>> = {
  canto: { read: "the canto closes", reading: "mid-verse", queued: "yet unsung" },
  terminal: { read: "ARRIVED", reading: "IN TRANSIT", queued: "AWAITING BOARDING" },
  library: { read: "shelved", reading: "in hand", queued: "awaited" },
  dossier: { read: "RETURNED", reading: "CHECKED OUT", queued: "ON HOLD" },
};

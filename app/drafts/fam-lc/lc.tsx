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

/* ── character-free ornaments for the About pages: the theme's mood
   without any Limbus figures (per Kyle: characters live on /limbus only) ── */

function Candle({ h = 80, delay = 0, wax = "#e6dcc2" }: { h?: number; delay?: number; wax?: string }) {
  return (
    <span aria-hidden style={{ display: "inline-flex", flexDirection: "column", alignItems: "center" }}>
      <span
        className="lc-flicker"
        style={{
          width: 11,
          height: 16,
          borderRadius: "50% 50% 46% 46%",
          background: "radial-gradient(circle at 50% 32%, #fff3c0, #e8a33d 62%, transparent 78%)",
          filter: "drop-shadow(0 0 12px rgba(232,163,61,0.85))",
          animationDelay: `${delay}s`,
        }}
      />
      <span style={{ width: 15, height: h, borderRadius: 4, background: `linear-gradient(180deg, ${wax}, color-mix(in oklab, ${wax} 70%, #6b5a3c))`, boxShadow: "inset -3px 0 5px rgba(0,0,0,0.25)" }} />
    </span>
  );
}

function Gem({ ch = "❖", size = 34, glow = true }: { ch?: string; size?: number; glow?: boolean }) {
  return (
    <span aria-hidden style={{ fontSize: size, lineHeight: 1, color: "var(--gold)", filter: glow ? "drop-shadow(0 0 9px color-mix(in oklab, var(--gold) 60%, transparent))" : undefined }}>
      {ch}
    </span>
  );
}

function Wax({ size = 20, color = "var(--red)" }: { size?: number; color?: string }) {
  return <span className="wax" aria-hidden style={{ width: size, height: size, background: color }} />;
}

function Lamp({ color, blink = false, size = 16 }: { color: string; blink?: boolean; size?: number }) {
  return <span className={`lamp ${blink ? "lc-blink" : ""}`} aria-hidden style={{ color, width: size, height: size }} />;
}

function Stripe({ w = 56, h = 20, flip = false }: { w?: number; h?: number; flip?: boolean }) {
  return (
    <span
      aria-hidden
      style={{
        width: w,
        height: h,
        display: "inline-block",
        borderRadius: 3,
        opacity: 0.75,
        background: `repeating-linear-gradient(${flip ? -45 : 45}deg, var(--gold) 0 9px, transparent 9px 19px)`,
        border: "1px solid var(--line)",
      }}
    />
  );
}

function ClipScrap({ rotate = -4, w = 74, h = 88 }: { rotate?: number; w?: number; h?: number }) {
  return (
    <span aria-hidden className="photo-d relative inline-block" style={{ width: w, height: h, transform: `rotate(${rotate}deg)`, padding: 0 }}>
      <span className="clip" style={{ left: 12 }} />
      <span style={{ position: "absolute", inset: 10, borderTop: "2px solid rgba(51,41,28,0.25)", borderBottom: "2px solid rgba(51,41,28,0.18)" }} />
      <span style={{ position: "absolute", left: 10, right: 24, top: "46%", height: 2, background: "rgba(51,41,28,0.2)" }} />
    </span>
  );
}

function InkRing({ size = 52 }: { size?: number }) {
  return <span aria-hidden style={{ width: size, height: size, display: "inline-block", borderRadius: "50%", border: "5px solid rgba(107,74,32,0.3)", filter: "blur(0.4px)" }} />;
}

function Redaction({ w = 64, h = 14 }: { w?: number; h?: number }) {
  return <span aria-hidden style={{ width: w, height: h, display: "inline-block", background: "var(--ink)", borderRadius: 2, opacity: 0.85 }} />;
}

export function aboutRails(theme: LcTheme): { left: ReactNode[]; right: ReactNode[] } {
  if (theme === "canto") {
    return {
      left: [<Gem key="g0" size={42} />, <Candle key="c0" h={92} />, <Gem key="g1" ch="❦" size={34} />, <Wax key="w0" />, <Candle key="c1" h={64} delay={-2} />, <Gem key="g2" ch="✦" size={26} />],
      right: [<Candle key="c0" h={76} delay={-1} />, <Gem key="g0" ch="❦" size={38} />, <Wax key="w0" size={16} />, <Gem key="g1" size={30} />, <Candle key="c1" h={100} delay={-3.4} />, <Gem key="g2" ch="✦" size={24} />],
    };
  }
  if (theme === "terminal") {
    return {
      left: [<Lamp key="l0" color="#3fd67a" blink />, <Stripe key="s0" />, <Gem key="g0" ch="◆" size={26} glow={false} />, <Lamp key="l1" color="#e8a33d" size={13} />, <Stripe key="s1" w={40} h={14} flip />, <Lamp key="l2" color="#e04545" size={12} />],
      right: [<Stripe key="s0" w={44} flip />, <Lamp key="l0" color="#e8a33d" blink size={14} />, <Gem key="g0" ch="◆" size={22} glow={false} />, <Stripe key="s1" w={60} h={16} />, <Lamp key="l1" color="#3fd67a" size={13} />, <Gem key="g1" ch="▮" size={20} glow={false} />],
    };
  }
  if (theme === "library") {
    return {
      left: [<Candle key="c0" h={104} wax="#ddcdb2" />, <Gem key="g0" ch="❦" size={36} />, <Wax key="w0" color="#8c3a44" />, <Candle key="c1" h={70} delay={-2.6} wax="#ddcdb2" />, <Gem key="g1" ch="✦" size={24} />],
      right: [<Gem key="g0" ch="❦" size={32} />, <Candle key="c0" h={88} delay={-1.4} wax="#ddcdb2" />, <Wax key="w0" size={17} color="#8c3a44" />, <Gem key="g1" size={28} />, <Candle key="c1" h={62} delay={-3.8} wax="#ddcdb2" />],
    };
  }
  return {
    left: [<ClipScrap key="p0" />, <InkRing key="i0" />, <Redaction key="r0" />, <ClipScrap key="p1" rotate={5} w={64} h={76} />, <Stripe key="s0" w={54} h={18} flip />],
    right: [<InkRing key="i0" size={40} />, <ClipScrap key="p0" rotate={3} />, <Redaction key="r0" w={48} />, <Stripe key="s0" w={60} h={20} />, <ClipScrap key="p1" rotate={-6} w={58} h={70} />],
  };
}

export const LC_STATUS: Record<LcTheme, Record<string, string>> = {
  canto: { read: "the canto closes", reading: "mid-verse", queued: "yet unsung" },
  terminal: { read: "ARRIVED", reading: "IN TRANSIT", queued: "AWAITING BOARDING" },
  library: { read: "shelved", reading: "in hand", queued: "awaited" },
  dossier: { read: "RETURNED", reading: "CHECKED OUT", queued: "ON HOLD" },
};

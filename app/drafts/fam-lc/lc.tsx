"use client";

import type { CSSProperties, ReactNode } from "react";

/* ── Limbus Company iconography helpers ────────────────────────────────
   No character art — signature shapes only: chains, numbered sinner
   hexagons, sin-affinity sigils (public/drafts/lc/sin-*.png, 108²),
   clash dice, clock hands. Sin sigils © Project Moon (fan usage,
   credited on pages that show them). */

export type LcTheme = "canto" | "terminal" | "library" | "dossier";

export const SINS = ["wrath", "lust", "sloth", "gluttony", "gloom", "pride", "envy"] as const;

/* canonical sinner numbering, worn as hex emblems in place of sprites */
const SINNER_NUM: Record<string, string> = {
  yisang: "I", faust: "II", donquixote: "III", ryoshu: "IV",
  meursault: "V", honglu: "VI", heathcliff: "VII", ishmael: "VIII",
  rodion: "IX", sinclair: "X", outis: "XI", gregor: "XII",
};

export function sinnerSlug(name?: string | null): string | null {
  if (!name) return null;
  const s = name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");
  return s || null;
}

export function sinnerNumeral(name?: string | null): string | null {
  const slug = sinnerSlug(name);
  return slug ? SINNER_NUM[slug] ?? null : null;
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

/* pointy-top double-ring hexagon with centered content */
export function Hex({
  size = 64,
  color = "var(--gold)",
  fill = "transparent",
  glow,
  className = "",
  style,
  children,
}: {
  size?: number;
  color?: string;
  fill?: string;
  glow?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}) {
  const h = size * 1.15;
  return (
    <span
      aria-hidden
      className={className}
      style={{
        position: "relative",
        display: "inline-grid",
        placeItems: "center",
        width: size,
        height: h,
        filter: glow ? `drop-shadow(0 0 10px ${glow})` : undefined,
        ...style,
      }}
    >
      <svg viewBox="0 0 100 115" width={size} height={h} style={{ position: "absolute", inset: 0 }}>
        <polygon points="50,3 96,30 96,85 50,112 4,85 4,30" fill={fill} stroke={color} strokeWidth="3.5" />
        <polygon points="50,12.5 87.5,34.5 87.5,80.5 50,102.5 12.5,80.5 12.5,34.5" fill="none" stroke={color} strokeWidth="1.2" opacity="0.6" />
      </svg>
      <span style={{ position: "relative", zIndex: 1, lineHeight: 1 }}>{children}</span>
    </span>
  );
}

/* vertical chain of interlocking links */
export function Chain({
  links = 6,
  size = 16,
  color = "var(--gold)",
  className = "",
  style,
}: {
  links?: number;
  size?: number;
  color?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const step = size * 1.5;
  const h = (links - 1) * step + size * 2.1;
  return (
    <svg viewBox={`0 0 ${size * 2} ${h}`} width={size * 2} height={h} className={className} style={style} aria-hidden>
      {Array.from({ length: links }, (_, i) => {
        const y = i * step + size;
        return i % 2 === 0 ? (
          <ellipse key={i} cx={size} cy={y} rx={size * 0.62} ry={size * 0.95} fill="none" stroke={color} strokeWidth={size * 0.3} />
        ) : (
          <ellipse key={i} cx={size} cy={y} rx={size * 0.26} ry={size * 0.9} fill="none" stroke={color} strokeWidth={size * 0.26} opacity="0.85" />
        );
      })}
    </svg>
  );
}

/* clash die: tilted rounded square with pips */
export function Die({
  size = 44,
  color = "var(--gold)",
  fill = "transparent",
  pips = 5,
  rotate = -12,
  className = "",
  style,
}: {
  size?: number;
  color?: string;
  fill?: string;
  pips?: 1 | 2 | 3 | 4 | 5 | 6;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const P: Record<number, [number, number][]> = {
    1: [[50, 50]],
    2: [[31, 31], [69, 69]],
    3: [[29, 29], [50, 50], [71, 71]],
    4: [[31, 31], [69, 31], [31, 69], [69, 69]],
    5: [[30, 30], [70, 30], [50, 50], [30, 70], [70, 70]],
    6: [[31, 26], [69, 26], [31, 50], [69, 50], [31, 74], [69, 74]],
  };
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={{ transform: `rotate(${rotate}deg)`, ...style }} aria-hidden>
      <rect x="6" y="6" width="88" height="88" rx="17" fill={fill} stroke={color} strokeWidth="5" />
      {P[pips].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="7.5" fill={color} />
      ))}
    </svg>
  );
}

/* abstract pocket-clock: LC runs on borrowed time */
export function ClockGlyph({ size = 60, color = "var(--gold)", className = "", style }: { size?: number; color?: string; className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} style={style} aria-hidden>
      <circle cx="50" cy="50" r="44" fill="none" stroke={color} strokeWidth="4" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="1.2" opacity="0.55" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6;
        const x1 = (50 + Math.sin(a) * 40).toFixed(2);
        const y1 = (50 - Math.cos(a) * 40).toFixed(2);
        const x2 = (50 + Math.sin(a) * 33).toFixed(2);
        const y2 = (50 - Math.cos(a) * 33).toFixed(2);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={i % 3 === 0 ? 3 : 1.4} />;
      })}
      <line x1="50" y1="50" x2="50" y2="24" stroke={color} strokeWidth="4" strokeLinecap="round" />
      <line x1="50" y1="50" x2="69" y2="59" stroke={color} strokeWidth="3" strokeLinecap="round" />
      <circle cx="50" cy="50" r="4" fill={color} />
    </svg>
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

/* ── themed side rails: chains, hexes, sigils, dice — no characters ── */

function railSet(theme: LcTheme, side: 0 | 1, glow: string): ReactNode[] {
  const sins = side === 0 ? SINS.slice(0, 4) : SINS.slice(3);
  const nums = side === 0 ? ["I", "III", "VII", "IX"] : ["II", "VI", "VIII", "XII"];
  const sig = (i: number) => <SinIcon key={`sn${i}`} sin={sins[i % sins.length]} size={44} className={theme === "library" ? "lc-flicker" : ""} style={{ filter: `drop-shadow(0 0 10px ${glow})` }} />;

  if (theme === "dossier") {
    /* evidence photos of dice & hexes, clipped to manila scraps */
    return [
      <span key="a" className="photo-d relative inline-block" style={{ padding: "12px 14px 22px", transform: `rotate(${side ? 3 : -4}deg)` }}>
        <span className="clip" style={{ left: 12 }} />
        <Die size={56} pips={side ? 3 : 5} color="var(--ink)" rotate={side ? 9 : -9} />
      </span>,
      sig(0),
      <Hex key="h0" size={64} color="var(--ink)"><span className="display" style={{ fontSize: 20, color: "var(--ink)" }}>{nums[0]}</span></Hex>,
      <span key="b" className="photo-d relative inline-block" style={{ padding: "12px 14px 20px", transform: `rotate(${side ? -5 : 4}deg)` }}>
        <span className="clip" style={{ left: 10 }} />
        <Hex size={52} color="var(--red)"><span className="display" style={{ fontSize: 17, color: "var(--red)" }}>{nums[1]}</span></Hex>
      </span>,
      <Die key="d1" size={44} pips={side ? 6 : 2} color="var(--gold)" rotate={side ? -14 : 12} />,
      sig(1),
      <Hex key="h1" size={56} color="var(--gold)"><span className="display" style={{ fontSize: 17, color: "var(--gold)" }}>{nums[2]}</span></Hex>,
    ];
  }

  return [
    <Chain key="c0" links={6} size={15} color={theme === "terminal" ? "var(--gold)" : "var(--gold)"} style={{ opacity: 0.85 }} />,
    <Hex key="h0" size={72} glow={glow}><span className="display" style={{ fontSize: 24, color: "var(--gold)" }}>{nums[0]}</span></Hex>,
    sig(0),
    <Die key="d0" size={48} pips={side ? 4 : 5} rotate={side ? 12 : -12} style={{ opacity: 0.9 }} />,
    <Hex key="h1" size={58} color={theme === "terminal" ? "var(--red)" : "var(--red)"} glow={glow}>
      <span className="display" style={{ fontSize: 19, color: "var(--red)" }}>{nums[1]}</span>
    </Hex>,
    <Chain key="c1" links={4} size={13} style={{ opacity: 0.7 }} />,
    sig(1),
    <Hex key="h2" size={64} glow={glow}><span className="display" style={{ fontSize: 21, color: "var(--gold)" }}>{nums[2]}</span></Hex>,
    <Die key="d1" size={40} pips={side ? 2 : 6} rotate={side ? -16 : 14} style={{ opacity: 0.8 }} />,
  ];
}

export function lcRails(theme: LcTheme): { left: ReactNode[]; right: ReactNode[]; glow: string } {
  const glow =
    theme === "canto" ? "rgba(201,164,92,0.55)" :
    theme === "terminal" ? "rgba(232,163,61,0.5)" :
    theme === "library" ? "rgba(185,141,84,0.55)" :
    "rgba(60,42,20,0.35)";
  return { left: railSet(theme, 0, glow), right: railSet(theme, 1, glow), glow };
}

/* ── character-free ornaments for the About pages: the theme's mood,
   no Limbus iconography beyond shapes (per Kyle: game art stays on
   /limbus drafts only) ── */

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
      left: [<Gem key="g0" size={42} />, <Candle key="c0" h={92} />, <Chain key="ch0" links={4} size={13} style={{ opacity: 0.7 }} />, <Wax key="w0" />, <Candle key="c1" h={64} delay={-2} />, <Gem key="g2" ch="✦" size={26} />],
      right: [<Candle key="c0" h={76} delay={-1} />, <Gem key="g0" ch="❦" size={38} />, <Wax key="w0" size={16} />, <Chain key="ch0" links={3} size={12} style={{ opacity: 0.6 }} />, <Candle key="c1" h={100} delay={-3.4} />, <Gem key="g2" ch="✦" size={24} />],
    };
  }
  if (theme === "terminal") {
    return {
      left: [<Lamp key="l0" color="#3fd67a" blink />, <Stripe key="s0" />, <Hex key="h0" size={54}><span style={{ color: "var(--gold)", fontSize: 18 }}>◆</span></Hex>, <Lamp key="l1" color="#e8a33d" size={13} />, <Stripe key="s1" w={40} h={14} flip />, <Lamp key="l2" color="#e04545" size={12} />],
      right: [<Stripe key="s0" w={44} flip />, <Lamp key="l0" color="#e8a33d" blink size={14} />, <Hex key="h0" size={46} color="var(--red)"><span style={{ color: "var(--red)", fontSize: 15 }}>◆</span></Hex>, <Stripe key="s1" w={60} h={16} />, <Lamp key="l1" color="#3fd67a" size={13} />],
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

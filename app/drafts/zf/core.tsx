"use client";

// Shared building blocks for the zine-family drafts. Pure presentational,
// client-safe (no server imports). Themes compose these and set colors.

import ReactMarkdown from "react-markdown";
import { Fragment, useMemo, useState } from "react";
import type { CSSProperties, ReactNode } from "react";

/* ── intro markdown with real links AND inline music embeds ──────────
   Mirrors the live site: #lor / #tpov hash links (or bare italicized
   phrases) become toggles that expand a Spotify player styled with
   currentColor so it fits any theme. External links open in new tabs. */

const INTRO_EMBEDS = [
  {
    marker: "#lor",
    phrase: "Library of Ruina",
    subtitle: "Mili · album",
    embed:
      "https://open.spotify.com/embed/album/1OVibN37sJiU2M9cCbL950?utm_source=generator",
    external:
      "https://open.spotify.com/album/1OVibN37sJiU2M9cCbL950?si=ed3wbXsdQ4ure5vrp8GRwQ",
    externalLabel: "Spotify ↗",
  },
  {
    marker: "#tpov",
    phrase: "Through Patches of Violet",
    subtitle: "Mili · track",
    embed:
      "https://open.spotify.com/embed/track/6C3NjslaxrAHpiU9W5XTiV?utm_source=generator",
    external: "https://www.youtube.com/watch?v=G_JfKOjwzwo",
    externalLabel: "YouTube ↗",
  },
];

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// Bare *phrase* → [*phrase*](#marker), unless it's already a link.
function injectEmbedLinks(text: string): string {
  let out = text;
  for (const e of INTRO_EMBEDS) {
    const re = new RegExp(`\\*${escapeRegex(e.phrase)}\\*(?!\\])`, "g");
    out = out.replace(re, `[*${e.phrase}*](${e.marker})`);
  }
  return out;
}

export function IntroMd({ text }: { text: string }) {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const paragraphs = useMemo(
    () => injectEmbedLinks(text).split(/\n\n+/),
    [text]
  );

  const components = {
    a: ({ href, children }: { href?: string; children?: ReactNode }) => {
      const emb = INTRO_EMBEDS.find((e) => e.marker === href);
      if (emb) {
        const isOpen = !!open[emb.marker];
        return (
          <button
            type="button"
            onClick={() => setOpen((m) => ({ ...m, [emb.marker]: !m[emb.marker] }))}
            style={{
              font: "inherit",
              color: "inherit",
              fontStyle: "italic",
              fontWeight: "inherit",
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
              textDecoration: "underline",
              textDecorationThickness: 2,
              textUnderlineOffset: 3,
            }}
            aria-expanded={isOpen}
            title={isOpen ? "Hide the player" : "Play it here"}
          >
            {children}
            <span aria-hidden style={{ fontStyle: "normal", fontSize: "0.82em" }}>
              {" "}♪{isOpen ? "▾" : "▸"}
            </span>
          </button>
        );
      }
      if (!href || href.startsWith("#")) return <em>{children}</em>;
      return (
        <a href={href} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  };

  return (
    <>
      {paragraphs.map((para, i) => {
        const embHere = INTRO_EMBEDS.filter((e) => para.includes(`(${e.marker})`));
        return (
          <Fragment key={i}>
            <ReactMarkdown components={components}>{para}</ReactMarkdown>
            {embHere.map(
              (e) =>
                open[e.marker] && (
                  <div
                    key={e.marker}
                    style={{
                      border: "2px solid currentColor",
                      borderRadius: 12,
                      padding: "10px 12px 12px",
                      margin: "0.1em 0 1.4em",
                      background: "rgba(127,127,127,0.09)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 12,
                        fontSize: 11.5,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        opacity: 0.8,
                        marginBottom: 8,
                        fontStyle: "normal",
                      }}
                    >
                      <span>now playing · {e.subtitle}</span>
                      <a
                        href={e.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 2 }}
                      >
                        {e.externalLabel}
                      </a>
                    </div>
                    <iframe
                      src={e.embed}
                      width="100%"
                      height="152"
                      frameBorder="0"
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      style={{ borderRadius: 10, display: "block", colorScheme: "normal" }}
                      title={e.phrase}
                    />
                  </div>
                )
            )}
          </Fragment>
        );
      })}
    </>
  );
}

/* ── expand/collapse body ── */
export function Expandable({
  open,
  children,
}: {
  open: boolean;
  children: ReactNode;
}) {
  return (
    <div
      className="zf-expand"
      style={{ maxHeight: open ? 4400 : 0, opacity: open ? 1 : 0 }}
      aria-hidden={!open}
    >
      {children}
    </div>
  );
}

/* ── infinite ticker ── */
export function Marquee({
  children,
  speed = 26,
  className = "",
  style,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div className={`zf-marquee-wrap ${className}`} style={style} aria-hidden>
      <div className="zf-marquee-track" style={{ animationDuration: `${speed}s` }}>
        <span>{children}</span>
        <span>{children}</span>
      </div>
    </div>
  );
}

/* ── side-rail decorations ── */
export function SideRails({
  left,
  right,
}: {
  left: ReactNode[];
  right: ReactNode[];
}) {
  const wrap = (nodes: ReactNode[]) =>
    nodes.map((n, i) => (
      <div
        key={i}
        className={`${i % 2 ? "zf-sway" : "zf-float"} zf-d${i % 4}`}
      >
        {n}
      </div>
    ));
  return (
    <>
      <div className="zf-rail zf-rail-left" aria-hidden>
        {wrap(left)}
      </div>
      <div className="zf-rail zf-rail-right" aria-hidden>
        {wrap(right)}
      </div>
    </>
  );
}

/* ── rating widgets ── */
export function GlyphRating({
  rating,
  glyph = "★",
  color = "currentColor",
  size = 17,
  showStar = false,
  starColor = "#f4c542",
}: {
  rating: number;
  glyph?: string;
  color?: string;
  size?: number;
  showStar?: boolean;
  starColor?: string;
}) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-label={`Rated ${rating.toFixed(1)}`}>
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} style={{ color, fontSize: size, opacity: 0.16 + fill * 0.84, lineHeight: 1 }} aria-hidden>
            {glyph}
          </span>
        );
      })}
      {showStar && (
        <span aria-hidden style={{ color: starColor, fontSize: size, lineHeight: 1, filter: `drop-shadow(0 0 5px ${starColor})` }}>
          ✦
        </span>
      )}
      <span style={{ fontSize: size * 0.72, marginLeft: 6, opacity: 0.75, fontWeight: 700 }}>
        {rating.toFixed(1)}
      </span>
    </span>
  );
}

export function PixelHearts({
  rating,
  on = "#ff2d95",
  off = "rgba(255,255,255,0.18)",
  showStar = false,
}: {
  rating: number;
  on?: string;
  off?: string;
  showStar?: boolean;
}) {
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rated ${rating.toFixed(1)}`}>
      {Array.from({ length: 5 }, (_, i) => (
        <PixelHeart key={i} color={rating - i >= 0.5 ? on : off} size={15} />
      ))}
      {showStar && <Sparkle size={15} color="#ffe86b" />}
      <span style={{ fontSize: 12, marginLeft: 5, opacity: 0.8, fontWeight: 700 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

export function VolumeBars({
  rating,
  color = "#ff8c42",
  off = "rgba(255,255,255,0.15)",
  animate = false,
  showStar = false,
}: {
  rating: number;
  color?: string;
  off?: string;
  animate?: boolean;
  showStar?: boolean;
}) {
  const lit = Math.round(rating * 2);
  return (
    <span className={`inline-flex items-end gap-[3px] ${animate ? "zf-eq-on" : ""}`} aria-label={`Rated ${rating.toFixed(1)}`}>
      {Array.from({ length: 10 }, (_, i) => (
        <span
          key={i}
          className="zf-eqbar"
          style={{
            width: 5,
            height: 7 + i * 1.8,
            background: i < lit ? color : off,
            borderRadius: 1,
            display: "inline-block",
          }}
        />
      ))}
      {showStar && (
        <span aria-hidden style={{ color: "#f4c542", fontSize: 15, marginLeft: 4, lineHeight: 1 }}>✦</span>
      )}
      <span style={{ fontSize: 12, marginLeft: 6, opacity: 0.8, fontWeight: 700 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

/* ── doodad SVG kit (cute margin furniture) ── */

type S = { size?: number; color?: string; stroke?: string; className?: string; style?: CSSProperties };

export function Star({ size = 26, color = "#ffe86b", className = "", style }: S) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M12 1.5l3 7 7.5.6-5.7 5 1.7 7.4L12 17.6l-6.5 3.9 1.7-7.4-5.7-5 7.5-.6z" fill={color} stroke="rgba(0,0,0,0.45)" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ size = 20, color = "#fff", className = "", style }: S) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M12 1c1 5 2.5 7.5 6 8.5-3.5 1-5 3.5-6 8.5-1-5-2.5-7.5-6-8.5 3.5-1 5-3.5 6-8.5z" fill={color} />
    </svg>
  );
}

export function Heart({ size = 22, color = "#f9a8d4", stroke = "rgba(0,0,0,0.4)", className = "", style }: S) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M12 21C6 16 2.5 12.5 2.5 8.6 2.5 5.9 4.6 4 7.2 4c1.9 0 3.6 1 4.8 2.9C13.2 5 14.9 4 16.8 4c2.6 0 4.7 1.9 4.7 4.6 0 3.9-3.5 7.4-9.5 12.4z" fill={color} stroke={stroke} strokeWidth="1.2" />
    </svg>
  );
}

export function Flower({ size = 30, color = "#c4b5fd", center = "#fde68a", className = "", style }: S & { center?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} style={style} aria-hidden>
      {Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2;
        const cx = (16 + Math.cos(a) * 7.5).toFixed(2);
        const cy = (16 + Math.sin(a) * 7.5).toFixed(2);
        return <circle key={i} cx={cx} cy={cy} r="5.4" fill={color} stroke="rgba(0,0,0,0.28)" strokeWidth="0.8" />;
      })}
      <circle cx="16" cy="16" r="4.6" fill={center} stroke="rgba(0,0,0,0.35)" strokeWidth="0.9" />
    </svg>
  );
}

export function Cloud({ size = 40, color = "#fff", className = "", style }: S) {
  return (
    <svg viewBox="0 0 48 30" width={size} height={size * 0.62} className={className} style={style} aria-hidden>
      <path d="M12 26h26a7 7 0 0 0 1.4-13.9A10 10 0 0 0 20 8.5 8 8 0 0 0 6.4 14 6.5 6.5 0 0 0 12 26z" fill={color} stroke="rgba(0,0,0,0.3)" strokeWidth="1.1" />
    </svg>
  );
}

export function Moon({ size = 26, color = "#fde68a", className = "", style }: S) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M20 14.5A9 9 0 0 1 9.5 4 9 9 0 1 0 20 14.5z" fill={color} stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
    </svg>
  );
}

export function MusicNote({ size = 24, color = "#f5e9d6", className = "", style }: S) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden>
      <path d="M9 19.5a3 3 0 1 1-2-2.83V5l12-2.5V16a3 3 0 1 1-2-2.83V6.9L11 8.9v10.6a3 3 0 0 1-2 0z" fill={color} />
    </svg>
  );
}

export function Ghost({ size = 30, color = "#2de2ff", className = "", style }: S) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden shapeRendering="crispEdges">
      <path d="M5 22V9a7 7 0 0 1 14 0v13l-2.4-2-2.3 2-2.3-2-2.3 2-2.3-2z" fill={color} />
      <rect x="8" y="9" width="2.6" height="3.4" fill="#0b0d1f" />
      <rect x="13.4" y="9" width="2.6" height="3.4" fill="#0b0d1f" />
    </svg>
  );
}

export function PixelHeart({ size = 16, color = "#ff2d95", className = "", style }: S) {
  return (
    <svg viewBox="0 0 14 12" width={size} height={size * 0.86} className={className} style={style} aria-hidden shapeRendering="crispEdges">
      <path
        d="M1 2h2V1h3v1h1V1h3v1h2v3h-1v1h-1v1h-1v1h-1v1h-1v1h-1v1h-1v-1H5V9H4V8H3V7H2V6H1V5H0V3h1z"
        fill={color}
      />
    </svg>
  );
}

export function Pushpin({ size = 22, color = "#e2504c", className = "", style }: S) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} className={className} style={style} aria-hidden>
      <circle cx="12" cy="8" r="6" fill={color} stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <circle cx="10" cy="6" r="1.8" fill="rgba(255,255,255,0.55)" />
      <path d="M12 14v7" stroke="#5a5a5a" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function Washi({
  w = 86,
  h = 24,
  color = "rgba(217,255,61,0.85)",
  rotate = -5,
  className = "",
  style,
}: {
  w?: number;
  h?: number;
  color?: string;
  rotate?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <span
      className={className}
      aria-hidden
      style={{
        display: "inline-block",
        width: w,
        height: h,
        background: color,
        transform: `rotate(${rotate}deg)`,
        borderLeft: "2px dashed rgba(0,0,0,0.25)",
        borderRight: "2px dashed rgba(0,0,0,0.25)",
        opacity: 0.95,
        ...style,
      }}
    />
  );
}

export function Cat({ size = 34, color = "#4a3550", className = "", style }: S) {
  return (
    <svg viewBox="0 0 32 26" width={size} height={size * 0.8} className={className} style={style} aria-hidden>
      <path d="M6 10 L4 2 L11 6" fill={color} />
      <path d="M26 10 L28 2 L21 6" fill={color} />
      <circle cx="16" cy="14" r="10" fill={color} />
      <circle cx="12.4" cy="12.5" r="1.4" fill="#fff" />
      <circle cx="19.6" cy="12.5" r="1.4" fill="#fff" />
      <path d="M13.5 17c1 1.6 4 1.6 5 0" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M4 14h5M4 17h5M23 14h5M23 17h5" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function Blob({
  size = 44,
  color = "#c4b5fd",
  blink = true,
  className = "",
  style,
}: S & { blink?: boolean }) {
  return (
    <svg
      viewBox="0 0 48 42"
      width={size}
      height={size * 0.875}
      className={`${blink ? "zf-blink-eyes" : ""} ${className}`}
      style={style}
      aria-hidden
    >
      <path
        d="M24 2C35 2 45 10 45 22c0 11-8 18-21 18S3 33 3 22C3 10 13 2 24 2z"
        fill={color}
        stroke="rgba(0,0,0,0.35)"
        strokeWidth="1.4"
      />
      <g className="zf-eyes">
        <circle cx="17" cy="20" r="2.6" fill="#2b2333" />
        <circle cx="31" cy="20" r="2.6" fill="#2b2333" />
      </g>
      <path d="M20 27c2.2 2.4 5.8 2.4 8 0" stroke="#2b2333" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="25" r="2.2" fill="rgba(249,168,212,0.75)" />
      <circle cx="36" cy="25" r="2.2" fill="rgba(249,168,212,0.75)" />
    </svg>
  );
}

export function SunAst({ size = 40, color = "#ff6b35", className = "", style }: S) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} style={style} aria-hidden>
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const x1 = (20 + Math.cos(a) * 6).toFixed(2);
        const y1 = (20 + Math.sin(a) * 6).toFixed(2);
        const x2 = (20 + Math.cos(a) * 17).toFixed(2);
        const y2 = (20 + Math.sin(a) * 17).toFixed(2);
        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth="4.6" strokeLinecap="round" />;
      })}
    </svg>
  );
}

export function MiniCassette({ size = 56, body = "#f5e9d6", accent = "#ff8c42", spin = true, className = "", style }: S & { body?: string; accent?: string; spin?: boolean }) {
  return (
    <svg viewBox="0 0 56 36" width={size} height={size * 0.64} className={className} style={style} aria-hidden>
      <rect x="1" y="1" width="54" height="34" rx="4" fill={body} stroke="rgba(0,0,0,0.5)" strokeWidth="1.4" />
      <rect x="8" y="6" width="40" height="12" rx="2" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
      <g className={spin ? "zf-spin-slow" : ""} style={{ transformOrigin: "18px 12px", transformBox: "fill-box" }}>
        <circle cx="18" cy="12" r="4" fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray="2.5 2.5" />
      </g>
      <g className={spin ? "zf-spin-slow" : ""} style={{ transformOrigin: "38px 12px", transformBox: "fill-box", animationDirection: "reverse" }}>
        <circle cx="38" cy="12" r="4" fill="none" stroke={accent} strokeWidth="1.6" strokeDasharray="2.5 2.5" />
      </g>
      <path d="M14 35v-6a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v6" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="1.2" />
    </svg>
  );
}

export function Joystick({ size = 36, base = "#1c2040", stick = "#2de2ff", ball = "#ff2d95", className = "", style }: S & { base?: string; stick?: string; ball?: string }) {
  return (
    <svg viewBox="0 0 36 36" width={size} height={size} className={className} style={style} aria-hidden>
      <rect x="4" y="24" width="28" height="9" rx="3" fill={base} stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
      <rect x="16.5" y="10" width="3" height="15" rx="1.5" fill={stick} />
      <circle cx="18" cy="8" r="5" fill={ball} stroke="rgba(0,0,0,0.4)" strokeWidth="1" />
      <circle cx="26" cy="28" r="2.2" fill="#ffe86b" />
    </svg>
  );
}

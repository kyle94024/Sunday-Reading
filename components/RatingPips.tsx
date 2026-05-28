"use client";

import { useId } from "react";

type Props = { rating: number | null; accent?: string; showStar?: boolean };

// The five-level scale. Index 0 = 1st dot (Bad) … index 4 = 5th dot (Amazing).
export const RATING_LEVELS: {
  label: string;
  color: string; // solid base colour (the "Amazing" level is drawn as a gradient)
  gradient?: string;
  glow: string;
}[] = [
  { label: "Bad", color: "#f87171", glow: "0 0 8px #f8717199" },
  { label: "Decent", color: "#fb923c", glow: "0 0 8px #fb923c99" },
  { label: "Good", color: "#facc15", glow: "0 0 8px #facc1599" },
  { label: "Great", color: "#4ade80", glow: "0 0 8px #4ade8099" },
  {
    label: "Amazing",
    color: "#d946ef",
    gradient:
      "radial-gradient(circle at 32% 28%, #93c5fd 0%, #d946ef 46%, #a21caf 100%)",
    glow: "0 0 11px #d946ef99, 0 0 7px #60a5fa66",
  },
];

export const STAR_COLOR = "#fbbf24";
export const STAR_GLOW = "0 0 7px rgba(251, 191, 36, 0.85)";
// Classic 5-point star, centered in a 24×24 viewBox.
export const STAR_PATH =
  "M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z";

function clamp01(n: number): number {
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

export function RatingStar({
  fill,
  size = 15,
}: {
  fill: number;
  size?: number;
}) {
  const id = useId();
  const pct = `${clamp01(fill) * 100}%`;
  return (
    <span
      className="relative inline-flex shrink-0"
      style={{ width: size, height: size, filter: `drop-shadow(${STAR_GLOW})` }}
      aria-hidden
    >
      <svg viewBox="0 0 24 24" width={size} height={size}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="0">
            <stop offset={pct} stopColor={STAR_COLOR} />
            <stop offset={pct} stopColor="transparent" />
          </linearGradient>
        </defs>
        <path
          d={STAR_PATH}
          fill={`url(#${id})`}
          stroke={STAR_COLOR}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

// On book cards the dots stay a single accent colour (the book's theme).
// The meaningful per-level colour scale only appears in the About-page
// legend (which maps over RATING_LEVELS directly). The gold star is the
// one exception — it's always gold, on cards too.
export function RatingPips({ rating, accent = "#c084fc", showStar = false }: Props) {
  if (rating == null) return null;
  const showNumber = rating <= 5;
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rating: ${rating.toFixed(1)}`}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = clamp01(rating - i);
        return (
          <span key={i} className="relative h-3 w-3">
            <span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `${accent}55` }}
            />
            <span
              className="absolute inset-0 rounded-full transition-[clip-path] duration-500"
              style={{
                background: accent,
                boxShadow: fill > 0 ? `0 0 8px ${accent}99` : "none",
                clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
              }}
            />
          </span>
        );
      })}
      {showStar && <RatingStar fill={clamp01(rating - 5)} />}
      <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted/70">
        {showNumber ? `${rating.toFixed(1)} / 5` : rating.toFixed(1)}
      </span>
    </div>
  );
}

type Props = { rating: number | null; accent?: string };

const MAX = 5;

export function RatingPips({ rating, accent = "#c084fc" }: Props) {
  if (rating == null) return null;
  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rating: ${rating.toFixed(1)} out of ${MAX}`}
    >
      {Array.from({ length: MAX }).map((_, i) => {
        // Fractional fill for each pip: 0 = empty, 1 = full, anything in
        // between = partial. So 4.8 renders as four full pips and one 80%.
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
                boxShadow:
                  fill > 0 ? `0 0 10px ${accent}99` : "none",
                clipPath: `inset(0 ${(1 - fill) * 100}% 0 0)`,
              }}
            />
          </span>
        );
      })}
      <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted/70">
        {rating.toFixed(1)} / {MAX}
      </span>
    </div>
  );
}

function clamp01(n: number): number {
  if (n <= 0) return 0;
  if (n >= 1) return 1;
  return n;
}

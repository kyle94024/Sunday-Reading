type Props = { rating: number | null; accent?: string };

export function RatingPips({ rating, accent = "#c084fc" }: Props) {
  if (rating == null) return null;
  const max = 5;
  const filled = Math.round((rating / 5) * max * 2) / 2; // half-step
  return (
    <div className="flex items-center gap-1.5" aria-label={`Rating: ${rating} out of 5`}>
      {Array.from({ length: max }).map((_, i) => {
        const isFull = i + 1 <= Math.floor(filled);
        const isHalf = !isFull && i + 0.5 < filled;
        return (
          <span key={i} className="relative h-2.5 w-2.5">
            <span
              className="absolute inset-0 rounded-full border"
              style={{ borderColor: `${accent}55` }}
            />
            <span
              className="absolute inset-0 rounded-full transition-all"
              style={{
                background: accent,
                boxShadow: `0 0 8px ${accent}90`,
                clipPath: isFull
                  ? "inset(0)"
                  : isHalf
                  ? "inset(0 50% 0 0)"
                  : "inset(0 100% 0 0)",
              }}
            />
          </span>
        );
      })}
      <span className="ml-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted/70">
        {rating.toFixed(1)} / 5
      </span>
    </div>
  );
}

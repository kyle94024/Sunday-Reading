"use client";

import Image from "next/image";

type Props = {
  title: string;
  author: string;
  accent?: string | null;
  coverUrl?: string | null;
  index?: string | number;
  compact?: boolean;
};

// Scale the title font based on length so even long titles fit on the spine
// without overflowing the placeholder cover.
function titleSizeClass(title: string): string {
  const len = title.length;
  if (len <= 10) return "text-xl";
  if (len <= 18) return "text-lg leading-[1.1]";
  if (len <= 28) return "text-base leading-[1.15]";
  return "text-sm leading-[1.2]";
}

export function BookCover({
  title,
  author,
  accent,
  coverUrl,
  index,
  compact = false,
}: Props) {
  if (coverUrl) {
    return (
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
        <Image
          src={coverUrl}
          alt={`${title} cover`}
          fill
          sizes="(min-width: 768px) 240px, 50vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>
    );
  }

  const a = accent || "#a855f7";
  return (
    <div
      className="relative aspect-[2/3] w-full overflow-hidden rounded-md transition-all duration-500"
      style={{
        background: `
          radial-gradient(120% 80% at 30% 20%, ${a}38 0%, transparent 60%),
          linear-gradient(150deg, #1a0b2e 0%, #07030f 100%)
        `,
        boxShadow: `inset 0 0 0 1px ${a}30, inset 0 0 24px ${a}20`,
      }}
    >
      {/* Spine */}
      <div
        className="absolute inset-y-0 left-0 w-[8px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${a}55, transparent)`,
          boxShadow: `inset -1px 0 0 ${a}40`,
        }}
      />
      {/* Top index */}
      {index !== undefined && (
        <div
          className={`absolute font-display uppercase transition-all duration-500 ${
            compact
              ? "right-1.5 top-1.5 text-[8px] tracking-[0.25em]"
              : "right-3 top-3 text-[10px] tracking-[0.35em]"
          }`}
          style={{ color: `${a}cc` }}
        >
          № {index}
        </div>
      )}

      {/* Compact: monogram. Expanded: full title block. */}
      {compact ? (
        <div className="absolute inset-0 flex items-center justify-center pl-2">
          <span
            className="font-display text-3xl tracking-tight"
            style={{
              color: `${a}cc`,
              textShadow: `0 0 12px ${a}55`,
            }}
          >
            {title.charAt(0)}
          </span>
        </div>
      ) : (
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-4 text-left">
          <div
            className={`font-serif text-ink/95 ${titleSizeClass(title)}`}
            style={{ hyphens: "auto", wordBreak: "break-word" }}
          >
            {title}
          </div>
          <div className="mt-2 h-px w-8" style={{ background: a }} />
          <div
            className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-ink-muted/80"
            style={{ wordBreak: "break-word" }}
          >
            {author}
          </div>
        </div>
      )}

      {/* Subtle bottom shimmer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          background: `radial-gradient(80% 100% at 50% 100%, ${a}25, transparent 70%)`,
        }}
      />
    </div>
  );
}

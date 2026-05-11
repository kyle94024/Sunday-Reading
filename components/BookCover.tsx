"use client";

import Image from "next/image";

type Props = {
  title: string;
  author: string;
  accent?: string | null;
  coverUrl?: string | null;
  index?: string | number;
};

// Stylized book cover placeholder shown when no real cover exists.
// Designed to look intentional rather than missing.
export function BookCover({ title, author, accent, coverUrl, index }: Props) {
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
      className="relative aspect-[2/3] w-full overflow-hidden rounded-md"
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
        className="absolute inset-y-0 left-0 w-[10px]"
        style={{
          background: `linear-gradient(90deg, ${a}55, transparent)`,
          boxShadow: `inset -1px 0 0 ${a}40`,
        }}
      />
      {/* Top index */}
      {index !== undefined && (
        <div
          className="absolute right-3 top-3 font-display text-[10px] uppercase tracking-[0.35em]"
          style={{ color: `${a}cc` }}
        >
          № {index}
        </div>
      )}
      {/* Title block */}
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-5 text-left">
        <div className="font-serif text-xl leading-tight text-ink/95 sm:text-2xl">
          {title}
        </div>
        <div className="mt-3 h-px w-10" style={{ background: a }} />
        <div className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/80">
          {author}
        </div>
      </div>
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

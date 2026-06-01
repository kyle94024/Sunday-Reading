"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "motion/react";
import type { Book } from "@/lib/db";
import { BookCover } from "./BookCover";

function romanize(n: number): string {
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

export function CoverCarousel({
  books,
  eyebrow,
  title,
  href,
}: {
  books: Book[];
  eyebrow: string;
  title: string;
  href: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.8, 520), behavior: "smooth" });
  };

  if (books.length === 0) return null;

  return (
    <section className="relative mx-auto mt-28 max-w-6xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-6 flex items-end justify-between gap-4"
      >
        <div>
          <div className="mb-1.5 text-[11px] uppercase tracking-[0.45em] text-ink-muted/75">
            {eyebrow}
          </div>
          <Link
            href={href}
            className="group/h inline-flex items-center gap-2 font-display text-3xl tracking-[0.04em] text-gradient-violet sm:text-4xl"
          >
            {title}
            <span className="text-base text-violet-glow transition-transform duration-300 group-hover/h:translate-x-1">
              →
            </span>
          </Link>
        </div>
        {/* desktop arrows */}
        <div className="hidden gap-2 sm:flex">
          {([-1, 1] as const).map((dir) => (
            <button
              key={dir}
              type="button"
              onClick={() => nudge(dir)}
              aria-label={dir === -1 ? "Scroll left" : "Scroll right"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-violet-bright/25 bg-violet-deep/30 text-ink-muted/80 transition hover:border-violet-bright/60 hover:text-ink"
            >
              {dir === -1 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </motion.div>

      {/* snap track with soft edge fades */}
      <div className="relative">
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        >
          {books.map((b, i) => {
            const accent = b.limbus_color || "#a855f7";
            return (
              <Link
                key={b.id}
                href={href}
                className="group/card snap-start shrink-0"
                style={{ width: 168 }}
              >
                <div className="transition-transform duration-500 group-hover/card:-translate-y-1.5">
                  <BookCover
                    title={b.title}
                    author={b.author}
                    accent={accent}
                    coverUrl={b.cover_url}
                    index={romanize(i + 1)}
                  />
                </div>
                <div className="mt-3 px-0.5">
                  <div className="truncate font-serif text-[0.95rem] leading-tight text-ink">
                    {b.title}
                  </div>
                  <div className="mt-0.5 truncate font-serif text-[0.8rem] italic text-ink-muted/85">
                    {b.author}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        {/* edge fades — robust overlay gradients (no mask compositing) */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-bg to-transparent" />
      </div>
    </section>
  );
}

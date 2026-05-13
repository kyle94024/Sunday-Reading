"use client";

import { LayoutGroup, motion } from "motion/react";
import type { Book } from "@/lib/db";
import { BookCard } from "./BookCard";
import { TrainGlyph } from "./TrainGlyph";

export function LimbusSection({ books }: { books: Book[] }) {
  return (
    <section
      id="limbus"
      className="relative pt-36 pb-24 sm:pt-44"
    >
      {/* Twin train marquees: one near the top, one near the bottom, going
          opposite directions. */}
      <div className="pointer-events-none absolute inset-x-0 top-24 flex overflow-hidden text-crimson-bright/35">
        <div className="marquee-track flex shrink-0 gap-12">
          {Array.from({ length: 6 }).map((_, i) => (
            <TrainGlyph key={`a-${i}`} className="h-12 shrink-0" />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <TrainGlyph key={`b-${i}`} className="h-12 shrink-0" />
          ))}
        </div>
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-12 mb-4 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.5em] text-ember/75"
        >
          <span className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-crimson-bright/55" />
          Bus 8 · 14 books
          <span className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-crimson-bright/55" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          className="mb-4 text-center"
        >
          <h1 className="font-display text-5xl tracking-[0.06em] text-gradient-crimson sm:text-7xl">
            Limbus Company Books
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          className="mx-auto mb-14 max-w-xl text-center font-serif italic text-ember/85 sm:text-lg"
        >
          The fourteen literary works behind Project Moon's roster of sinners
          and managers — the point of departure for this whole shelf.
        </motion.p>

        <LayoutGroup>
          <div className="book-grid grid grid-cols-1 gap-5 sm:grid-cols-2">
            {books.map((b, i) => (
              <BookCard key={b.id} book={b} index={i} variant="limbus" />
            ))}
          </div>
        </LayoutGroup>

        {/* Bottom train marquee, mirrored */}
        <div className="pointer-events-none mt-16 flex overflow-hidden text-crimson-bright/25">
          <div className="marquee-track flex shrink-0 gap-12" style={{ animationDirection: "reverse" }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <TrainGlyph key={`c-${i}`} className="h-10 shrink-0" />
            ))}
            {Array.from({ length: 6 }).map((_, i) => (
              <TrainGlyph key={`d-${i}`} className="h-10 shrink-0" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import type { Book } from "@/lib/db";
import { BookCard } from "./BookCard";
import { TrainGlyph } from "./TrainGlyph";

export function LimbusSection({ books }: { books: Book[] }) {
  return (
    <section
      id="limbus"
      className="relative mt-20 overflow-hidden border-y border-crimson-bright/20 py-24"
    >
      {/* Crimson veil background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-60"
        style={{ backgroundImage: "url(/bg/limbus-veil.png)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(58,10,15,0.6) 0%, rgba(7,3,15,0.85) 60%, rgba(7,3,15,0.95) 100%)",
        }}
      />

      {/* Train ribbon — slow marquee */}
      <div className="pointer-events-none absolute inset-x-0 top-8 flex overflow-hidden text-crimson-bright/40">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="mt-16 mb-10 text-center"
        >
          <div className="mb-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.45em] text-ember/80">
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-crimson-bright/60" />
            Bus 8 · 12 sinners · 12 books
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-crimson-bright/60" />
          </div>
          <h2 className="font-display text-5xl tracking-[0.18em] text-gradient-crimson sm:text-6xl">
            LIMBUS
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-serif italic text-ink-muted/85">
            The point of departure. Each carriage carries a sinner, and each
            sinner carries a book.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((b, i) => (
            <BookCard key={b.id} book={b} index={i} variant="limbus" />
          ))}
        </div>
      </div>
    </section>
  );
}

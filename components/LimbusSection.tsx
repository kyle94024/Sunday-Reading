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
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-16 mb-10 text-center"
        >
          <h2 className="font-display text-4xl tracking-[0.06em] text-gradient-crimson sm:text-6xl">
            Limbus Company Books
          </h2>
        </motion.div>

        <div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          style={{ gridAutoFlow: "dense" }}
        >
          {books.map((b, i) => (
            <BookCard key={b.id} book={b} index={i} variant="limbus" />
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "motion/react";
import type { Book } from "@/lib/db";
import { BookCard } from "./BookCard";

export function WiderLibrarySection({ books }: { books: Book[] }) {
  return (
    <section id="library" className="relative mx-auto mt-32 max-w-6xl px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="mb-12 text-center"
      >
        <div className="mb-5 flex items-center justify-center gap-3 text-[11px] uppercase tracking-[0.45em] text-ink-muted/70">
          <span className="h-px w-12 bg-gradient-to-r from-transparent to-violet-bright/60" />
          Beyond Limbus
          <span className="h-px w-12 bg-gradient-to-l from-transparent to-violet-bright/60" />
        </div>
        <h2 className="font-display text-5xl tracking-[0.18em] text-gradient-violet sm:text-6xl">
          THE WIDER LIBRARY
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-serif italic text-ink-muted/85">
          Books I've reached for outside the original twelve — found through
          friends, footnotes, and falling down rabbit holes.
        </p>
      </motion.div>

      {books.length === 0 ? (
        <div className="mx-auto max-w-md rounded-xl border border-violet-bright/20 bg-violet-deep/20 p-10 text-center">
          <p className="font-serif italic text-ink-muted/80">
            The shelf is still being arranged. New entries soon.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </section>
  );
}

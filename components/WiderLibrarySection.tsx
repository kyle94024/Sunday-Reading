"use client";

import { motion } from "motion/react";
import type { Book } from "@/lib/db";
import { BookCard } from "./BookCard";

export function WiderLibrarySection({ books }: { books: Book[] }) {
  return (
    <section id="library" className="relative mx-auto mt-32 max-w-6xl px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-12 text-center"
      >
        <h2 className="font-display text-4xl tracking-[0.06em] text-gradient-violet sm:text-6xl">
          all book reviews
        </h2>
      </motion.div>

      {books.length === 0 ? (
        <div className="mx-auto max-w-md rounded-xl border border-violet-bright/20 bg-violet-deep/20 p-10 text-center">
          <p className="font-serif italic text-ink-muted/80">
            Nothing here yet — I'll add things as I read them.
          </p>
        </div>
      ) : (
        <div className="book-grid grid grid-cols-1 gap-5 sm:grid-cols-2">
          {books.map((b, i) => (
            <BookCard key={b.id} book={b} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

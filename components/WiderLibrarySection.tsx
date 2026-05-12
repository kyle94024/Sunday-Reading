"use client";

import { motion } from "motion/react";
import type { Book } from "@/lib/db";
import { BookCard } from "./BookCard";

export function WiderLibrarySection({ books }: { books: Book[] }) {
  return (
    <section id="library" className="relative mx-auto mt-32 max-w-6xl px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "400px 0px" }}
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
        <div className="flex flex-col gap-5">
          {books.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      )}
    </section>
  );
}

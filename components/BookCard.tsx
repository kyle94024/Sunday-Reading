"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import type { Book } from "@/lib/db";
import { BookCover } from "./BookCover";
import { RatingPips } from "./RatingPips";

const STATUS_LABEL: Record<Book["status"], string> = {
  read: "Read",
  reading: "Currently reading",
  queued: "On the shelf",
};

function romanize(n: number): string {
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) { out += s; n -= v; }
  }
  return out;
}

export function BookCard({
  book,
  index,
  variant = "default",
}: {
  book: Book;
  index?: number;
  variant?: "default" | "limbus";
}) {
  const [open, setOpen] = useState(false);
  const accent = book.limbus_color || "#a855f7";
  const isLimbus = variant === "limbus";
  const hasReview = !!book.review && book.review.trim().length > 0;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
      }}
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl p-5 transition-all duration-500 ${
        isLimbus ? "glass-crimson" : "glass"
      } hover:-translate-y-1`}
      style={{
        boxShadow: open
          ? `0 24px 80px -30px ${accent}80, inset 0 0 0 1px ${accent}50`
          : undefined,
      }}
    >
      <motion.div layout className="flex flex-row items-start gap-5">
        <div className="w-[110px] shrink-0 sm:w-[140px]">
          <BookCover
            title={book.title}
            author={book.author}
            accent={accent}
            coverUrl={book.cover_url}
            index={
              isLimbus && index !== undefined
                ? romanize(index + 1)
                : undefined
            }
          />
        </div>

        <div className="flex flex-1 flex-col">
          <div className="flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ink-muted/70">
            <span
              className="rounded-full border px-2 py-0.5"
              style={{
                borderColor: `${accent}66`,
                color: `${accent}`,
                background: `${accent}10`,
              }}
            >
              {STATUS_LABEL[book.status]}
            </span>
            {isLimbus && book.limbus_sinner && (
              <span className="text-ink-muted/50">
                Sinner · <span className="text-ink-muted">{book.limbus_sinner}</span>
              </span>
            )}
            {book.year_published != null && (
              <span className="text-ink-muted/50">
                {book.year_published < 0
                  ? `${Math.abs(book.year_published)} BCE`
                  : book.year_published}
              </span>
            )}
          </div>

          <h3 className="mt-3 font-serif text-2xl leading-tight text-ink sm:text-3xl">
            {book.title}
          </h3>
          <p className="mt-1 font-serif italic text-ink-muted/90">
            by {book.author}
          </p>

          {book.rating != null && (
            <div className="mt-4">
              <RatingPips rating={Number(book.rating)} accent={accent} />
            </div>
          )}

          <div className="mt-auto flex items-center justify-between pt-5">
            <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-ink-muted/80 transition group-hover:text-ink">
              <span
                className="h-px w-6 transition-all group-hover:w-10"
                style={{ background: accent }}
              />
              {open
                ? "Close review"
                : hasReview
                ? "Read review"
                : "Open notes"}
            </span>
            <span
              className="font-mono text-[10px] uppercase tracking-widest"
              style={{ color: `${accent}aa` }}
            >
              {open ? "—" : "+"}
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="review"
            layout
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="mt-6 border-t pt-6 font-serif text-[1.02rem] leading-[1.85] text-ink/85"
              style={{ borderColor: `${accent}30` }}
            >
              {hasReview ? (
                <ReactMarkdown>{book.review!}</ReactMarkdown>
              ) : (
                <div className="flex items-center gap-3 text-ink/80 italic">
                  <span
                    className="inline-block h-px w-6"
                    style={{ background: accent }}
                  />
                  <span>
                    {book.status === "read"
                      ? "Haven't written this one up yet."
                      : book.status === "reading"
                      ? "Still reading — notes coming after."
                      : "Haven't read this one yet."}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-60"
        style={{ background: accent }}
      />
    </motion.article>
  );
}

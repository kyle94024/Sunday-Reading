"use client";

import { motion } from "motion/react";
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
  // Public visibility: a review only shows if it has content AND is published.
  const hasReview =
    !!book.review &&
    book.review.trim().length > 0 &&
    book.review_published !== false;
  const isDraft =
    !!book.review &&
    book.review.trim().length > 0 &&
    book.review_published === false;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "400px 0px" }}
      transition={{
        layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
      }}
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
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl transition-all duration-500 ${
        isLimbus ? "glass-crimson" : "glass"
      } hover:-translate-y-0.5 ${open ? "p-6 sm:col-span-2 sm:p-7" : "p-3.5 sm:p-4"}`}
      style={{
        boxShadow: open
          ? `0 24px 80px -30px ${accent}80, inset 0 0 0 1px ${accent}50`
          : undefined,
      }}
    >
      <div
        className={`flex flex-row gap-4 transition-all duration-500 ${
          open ? "items-start sm:gap-7" : "items-center sm:gap-5"
        }`}
      >
        <div
          className={`shrink-0 transition-all duration-500 ${
            open ? "w-[120px] sm:w-[150px]" : "w-[64px] sm:w-[78px]"
          }`}
        >
          <BookCover
            title={book.title}
            author={book.author}
            accent={accent}
            coverUrl={book.cover_url}
            compact={!open}
            index={
              isLimbus && index !== undefined ? romanize(index + 1) : undefined
            }
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div
            className={`flex flex-wrap items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ink-muted/70 transition-all duration-500 ${
              open ? "" : "text-[9px]"
            }`}
          >
            <span
              className={`rounded-full border ${
                open ? "px-2 py-0.5" : "px-1.5 py-px"
              }`}
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
                Sinner ·{" "}
                <span className="text-ink-muted">{book.limbus_sinner}</span>
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

          <h3
            className={`truncate font-serif leading-tight text-ink transition-all duration-500 ${
              open
                ? "mt-3 whitespace-normal text-2xl sm:text-3xl md:text-4xl"
                : "mt-1.5 text-lg sm:text-xl"
            }`}
          >
            {book.title}
          </h3>
          <p
            className={`font-serif italic text-ink-muted/90 transition-all duration-500 ${
              open ? "mt-1 sm:text-lg" : "mt-0 truncate text-sm"
            }`}
          >
            by {book.author}
          </p>

          {open && book.rating != null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="mt-4"
            >
              <RatingPips rating={Number(book.rating)} accent={accent} />
            </motion.div>
          )}

          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              open ? "mt-auto pt-5" : "mt-2"
            }`}
          >
            <span
              className={`inline-flex items-center gap-2 uppercase tracking-[0.28em] text-ink-muted/80 transition group-hover:text-ink ${
                open ? "text-[11px]" : "text-[10px]"
              }`}
            >
              <span
                className={`h-px transition-all group-hover:w-10 ${
                  open ? "w-6" : "w-4"
                }`}
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
      </div>

      <div
        aria-hidden={!open}
        className="overflow-hidden"
        style={{
          maxHeight: open ? 2000 : 0,
          opacity: open ? 1 : 0,
          marginTop: open ? 28 : 0,
          transition:
            "max-height 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 380ms ease-out, margin-top 380ms ease-out",
        }}
      >
        <div
          className="min-h-[200px] rounded-lg border-t px-1 pt-7 font-serif text-[1.05rem] leading-[1.85] text-ink/90 sm:px-2 sm:text-[1.1rem] [&_p]:mb-4 [&_em]:italic [&_strong]:font-semibold"
          style={{
            borderColor: `${accent}30`,
            background: `linear-gradient(180deg, ${accent}08, transparent 80%)`,
          }}
        >
          {hasReview ? (
            <>
              {book.reviewer_name && (
                <div className="mb-5 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-ink-muted/65">
                  <span
                    className="inline-block h-px w-5"
                    style={{ background: accent }}
                  />
                  Guest review by{" "}
                  <span className="text-ink-muted">{book.reviewer_name}</span>
                </div>
              )}
              <ReactMarkdown>{book.review!}</ReactMarkdown>
            </>
          ) : (
            <div className="flex h-full min-h-[160px] flex-col items-center justify-center gap-3 italic text-ink/70">
              <span
                className="inline-block h-px w-12"
                style={{ background: accent }}
              />
              <span className="text-base">
                {isDraft
                  ? "Review still cooking — published soon."
                  : book.status === "read"
                  ? "Haven't written this one up yet."
                  : book.status === "reading"
                  ? "Still reading — notes coming after."
                  : "Haven't read this one yet."}
              </span>
              <span
                className="inline-block h-px w-12"
                style={{ background: accent }}
              />
            </div>
          )}
        </div>
      </div>

      {/* Decorative corner glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -right-12 h-40 w-40 rounded-full blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-60"
        style={{ background: accent }}
      />
    </motion.article>
  );
}

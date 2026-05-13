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
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        layout: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
        opacity: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: (index ?? 0) * 0.04,
        },
        y: {
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
          delay: (index ?? 0) * 0.04,
        },
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
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-xl transition-[padding,background,box-shadow,border-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isLimbus ? "glass-crimson" : "glass"
      } hover:-translate-y-0.5 ${open ? "p-6 sm:col-span-2 sm:p-7" : "p-3.5 sm:p-4"}`}
      style={{
        boxShadow: open
          ? `0 24px 80px -30px ${accent}80, inset 0 0 0 1px ${accent}50`
          : undefined,
        // When expanded, layer a darker tint over the glass so the
        // review prose reads cleanly against the nebula behind.
        // A soft radial of the accent colour rides on top of a uniformly
        // dark fill so the middle of the card doesn't thin out.
        background: open
          ? `radial-gradient(120% 70% at 50% 50%, ${accent}24, transparent 75%), linear-gradient(180deg, rgba(7,3,15,0.78) 0%, rgba(12,4,28,0.82) 55%, rgba(15,4,30,0.78) 100%)`
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

      {/* Compact-mode spine ornament: inset outline + top/bottom headbands
          + a faint vertical page-edge line near the right. All very subtle. */}
      {!open && (
        <>
          <span
            aria-hidden
            className="pointer-events-none absolute inset-2 rounded-md border"
            style={{ borderColor: `${accent}22` }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-4 top-2.5 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}55 50%, transparent)`,
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-4 bottom-2.5 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accent}55 50%, transparent)`,
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-5 right-3 w-px"
            style={{
              background: `linear-gradient(180deg, transparent, ${accent}30 30%, ${accent}30 70%, transparent)`,
            }}
          />
        </>
      )}

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
          className="min-h-[200px] rounded-lg border-t px-1 pt-7 font-sans text-[1rem] font-medium leading-[1.7] text-ink sm:px-2 sm:text-[1.05rem] [&_p]:mb-5 [&_em]:italic [&_strong]:font-semibold"
          style={{
            borderColor: `${accent}30`,
            background: `linear-gradient(180deg, ${accent}08, transparent 80%)`,
          }}
        >
          {book.summary && (
            <div
              className="mb-7 rounded-lg border px-4 py-4 sm:px-5 sm:py-5"
              style={{
                borderColor: `${accent}33`,
                background: `linear-gradient(150deg, ${accent}10, transparent 80%)`,
              }}
            >
              <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-ink-muted/65">
                <span
                  className="inline-block h-px w-5"
                  style={{ background: accent }}
                />
                Summary
              </div>
              <div className="font-serif text-[1.02rem] font-semibold leading-[1.7] text-ink sm:text-[1.08rem] [&>:first-child]:mt-0 [&_p]:mb-3 [&_em]:italic [&_strong]:font-bold">
                <ReactMarkdown>{book.summary}</ReactMarkdown>
              </div>
            </div>
          )}
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

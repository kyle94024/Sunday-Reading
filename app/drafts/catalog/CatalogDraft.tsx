"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState, type ReactNode } from "react";
import type { Book } from "@/lib/db";
import { callNumber, romanize, stampDate, yearLabel } from "../util";
import { IntroMd } from "../zf/core";

/* ── little pieces ─────────────────────────────────────────────── */

function Stamp({
  children,
  color = "#c1301c",
  rotate = -5,
}: {
  children: ReactNode;
  color?: string;
  rotate?: number;
}) {
  return (
    <span
      className="cat-stamp"
      style={{ color, transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}

function StatusStamp({ status }: { status: Book["status"] }) {
  if (status === "read") return <Stamp color="#c1301c">Read</Stamp>;
  if (status === "reading")
    return (
      <Stamp color="#2c4f8f" rotate={-3}>
        Reading
      </Stamp>
    );
  return (
    <Stamp color="#55606e" rotate={-4}>
      To read
    </Stamp>
  );
}

// Typed-character rating: ●●●●◑ + optional brass star.
function typedRating(rating: number): string {
  const half = Math.round(rating * 2) / 2;
  const full = Math.floor(half);
  const hasHalf = half - full === 0.5;
  return (
    "●".repeat(Math.min(full, 5)) +
    (hasHalf ? "◑" : "") +
    "○".repeat(Math.max(0, 5 - full - (hasHalf ? 1 : 0)))
  );
}

function Cover({
  book,
  w,
  h,
  rotate = 0,
}: {
  book: Book;
  w: number;
  h: number;
  rotate?: number;
}) {
  return (
    <span className="mount" style={{ transform: `rotate(${rotate}deg)` }}>
      <span className="corner tl" />
      <span className="corner tr" />
      <span className="corner bl" />
      <span className="corner br" />
      <span
        className="relative block overflow-hidden"
        style={{ width: w, height: h, background: "#241d16" }}
      >
        {book.cover_url ? (
          <Image
            src={book.cover_url}
            alt=""
            fill
            sizes={`${w}px`}
            className="object-cover"
            style={{ filter: "sepia(0.14) contrast(0.98)" }}
          />
        ) : (
          <span
            className="type flex h-full w-full items-center justify-center p-2 text-center text-[11px] leading-tight"
            style={{ color: "#f5eedb", background: "#3a3046" }}
          >
            {book.title}
          </span>
        )}
      </span>
    </span>
  );
}

/* ── a full catalog card (review entry) ────────────────────────── */

function CatalogCard({
  book,
  n,
  defaultOpen = false,
}: {
  book: Book;
  n: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;
  const due = stampDate(book.date_read);

  return (
    <article className="card lean" style={{ paddingBottom: 44 }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full cursor-pointer text-left"
        style={{ padding: "18px 26px 0 74px" }}
      >
        {/* header line */}
        <div className="type flex items-baseline justify-between text-[12px] tracking-[0.12em]" style={{ color: "#4c4234" }}>
          <span>{callNumber(book.author, book.year_published)}</span>
          <span>CARD № {String(n).padStart(3, "0")}</span>
        </div>

        {/* title + author */}
        <h3
          className="type mt-2 text-[clamp(1.15rem,2.6vw,1.6rem)] uppercase leading-[28px]"
          style={{
            color: "#241d16",
            textDecoration: "underline",
            textDecorationColor: "rgba(193,48,28,0.65)",
            textDecorationThickness: 2,
            textUnderlineOffset: 5,
          }}
        >
          {book.title}
        </h3>
        <p className="ruled-text" style={{ color: "#4c4234", marginBottom: 0 }}>
          {book.author} · first pub. {yearLabel(book.year_published)}
          {book.limbus_sinner ? ` · sinner: ${book.limbus_sinner}` : ""}
        </p>

        {/* stamps + rating row */}
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 pb-4">
          <StatusStamp status={book.status} />
          {exceptional && (
            <Stamp color="#8a6a33" rotate={4}>
              ★ exceptional
            </Stamp>
          )}
          {rating != null && (
            <span className="type text-[14px]" style={{ color: "#241d16" }}>
              RATING{" "}
              <span style={{ letterSpacing: "0.18em" }}>
                {typedRating(rating)}
              </span>
              {book.show_star && (
                <span style={{ color: "#b98b4e" }}> ★</span>
              )}{" "}
              <span style={{ color: "#4c4234" }}>({rating.toFixed(1)})</span>
            </span>
          )}
          <span
            className="type ml-auto text-[12px] tracking-[0.14em]"
            style={{ color: open ? "#c1301c" : "#4c4234" }}
          >
            {open ? "[ CLOSE ]" : "[ PULL CARD ]"}
          </span>
        </div>
      </button>

      {/* expanding body */}
      <div
        className="cat-expand"
        style={{ maxHeight: open ? 4000 : 0, opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div style={{ padding: "0 26px 8px 74px" }}>
          {book.reviewer_name && (
            <p
              className="hand text-[20px]"
              style={{ color: "#c1301c", transform: "rotate(-1.2deg)" }}
            >
              guest card — filed by {book.reviewer_name} ✎
            </p>
          )}

          {book.summary && (
            <>
              <div className="type mt-1 text-[12px] tracking-[0.22em]" style={{ color: "#4c4234" }}>
                ABSTRACT —
              </div>
              <div className="ruled-text" style={{ color: "#241d16" }}>
                <ReactMarkdown>{book.summary}</ReactMarkdown>
              </div>
            </>
          )}

          {book.review && (
            <>
              <div className="type text-[12px] tracking-[0.22em]" style={{ color: "#4c4234" }}>
                REVIEW —
              </div>
              <div className="ruled-text" style={{ color: "#241d16" }}>
                <ReactMarkdown>{book.review}</ReactMarkdown>
              </div>
            </>
          )}

          {/* date-due grid */}
          <div className="duegrid mb-2 mt-1 max-w-sm bg-white/30">
            <div className="head">DATE DUE</div>
            <div>
              {due && (
                <span
                  className="type inline-block text-[11px]"
                  style={{ color: "#c1301c", transform: "rotate(-3deg)" }}
                >
                  {due}
                </span>
              )}
            </div>
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>

      <span className="hole" aria-hidden />
    </article>
  );
}

/* ── the page ──────────────────────────────────────────────────── */

export function CatalogDraft({
  name,
  tagline,
  intro,
  limbus,
  reviews,
}: {
  name: string;
  tagline: string;
  intro: string;
  limbus: Book[];
  reviews: Book[];
}) {
  return (
    <div className="d-catalog">
      <div className="relative mx-auto max-w-4xl px-5 pt-8">
        {/* typed nav */}
        <nav className="cat-nav flex items-center justify-between">
          <span className="type text-[13px] tracking-[0.18em]" style={{ color: "#b98b4e" }}>
            EST. 2026
          </span>
          <div className="flex gap-7">
            <Link href="/">HOME</Link>
            <Link href="/limbus">LIMBUS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </nav>

        {/* drawer plate masthead */}
        <header className="mx-auto mt-14 max-w-xl">
          <div className="plate">
            <span className="screw" style={{ top: 8, left: 10 }} />
            <span className="screw" style={{ top: 8, right: 10 }} />
            <span className="screw" style={{ bottom: 8, left: 10 }} />
            <span className="screw" style={{ bottom: 8, right: 10 }} />
            <div className="plate-card">
              <div className="type text-[11px] tracking-[0.3em]" style={{ color: "#4c4234" }}>
                FICTION · REVIEWS · RECOMMENDATIONS
              </div>
              <h1 className="type mt-2 text-[clamp(1.7rem,5vw,2.6rem)] uppercase tracking-[0.06em]">
                {name}
              </h1>
              <div className="type mt-1 text-[13px]" style={{ color: "#4c4234" }}>
                {tagline.toLowerCase()} — kept by Kyle
              </div>
            </div>
          </div>
          <div className="pull" aria-hidden />
        </header>

        {/* intro index card */}
        <section className="relative mx-auto mt-16 max-w-2xl">
          <span
            className="hand absolute -top-7 right-2 z-10 text-[22px]"
            style={{ color: "#e0684f", transform: "rotate(4deg)" }}
          >
            start here ↓
          </span>
          <div
            className="card"
            style={{ padding: "20px 28px 40px 74px", transform: "rotate(-0.4deg)" }}
          >
            <div className="type mb-3 text-[12px] tracking-[0.22em]" style={{ color: "#4c4234" }}>
              FROM THE DESK OF K. —
            </div>
            <div className="ruled-text" style={{ color: "#241d16" }}>
              <IntroMd text={intro} />
            </div>
            <span className="hole" aria-hidden />
          </div>
        </section>

        {/* Limbus drawer */}
        <section className="mt-20">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="type text-[15px] tracking-[0.24em]" style={{ color: "#f5eedb" }}>
              DRAWER 08 — LIMBUS COMPANY
            </h2>
            <Stamp color="#b98b4e" rotate={-3}>
              {limbus.length} cards
            </Stamp>
            <Link
              href="/limbus"
              className="type ml-auto text-[12px] tracking-[0.18em] underline decoration-dashed underline-offset-4"
              style={{ color: "#b98b4e" }}
            >
              OPEN DRAWER →
            </Link>
          </div>

          <div className="scroll-row mt-4">
            {limbus.map((b, i) => (
              <Link key={b.id} href="/limbus" className="tabcard">
                <span className="tab">{romanize(i + 1)}</span>
                <span
                  className="card relative z-[1] block"
                  style={{ padding: "16px 14px 34px", minHeight: 236 }}
                >
                  <span className="flex justify-center">
                    <Cover book={b} w={78} h={112} rotate={i % 2 ? 1.2 : -1.2} />
                  </span>
                  <span
                    className="type mt-3 block text-center text-[12.5px] uppercase leading-tight"
                    style={{ color: "#241d16" }}
                  >
                    {b.title}
                  </span>
                  <span
                    className="block text-center text-[11px]"
                    style={{ color: "#4c4234" }}
                  >
                    {b.author}
                  </span>
                  <span className="hole" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section className="mt-20">
          <div className="mb-6 flex items-center gap-4">
            <h2 className="type text-[15px] tracking-[0.24em]" style={{ color: "#f5eedb" }}>
              REVIEW CARDS — ALL BOOKS
            </h2>
            <span className="h-px flex-1" style={{ background: "rgba(185,139,78,0.4)" }} />
          </div>
          <div className="flex flex-col gap-8">
            {reviews.map((b, i) => (
              <CatalogCard key={b.id} book={b} n={i + 1} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="type mt-24 text-center text-[12px] tracking-[0.22em]" style={{ color: "rgba(245,238,219,0.5)" }}>
          MISFILED WITH LOVE · SUNDAY&rsquo;S SHELF
        </footer>
      </div>
    </div>
  );
}

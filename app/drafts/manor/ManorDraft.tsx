"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { jitter, stampDate, yearLabel } from "../util";
import { IntroMd } from "../zf/core";

function vulgar(r: number): string {
  const half = Math.round(r * 2) / 2;
  if (half === Math.floor(half)) return String(Math.floor(half));
  return `${Math.floor(half)}½`;
}

function Fleurons({ rating }: { rating: number }) {
  return (
    <span className="inline-flex items-center gap-1">
      {Array.from({ length: 5 }, (_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className="fleuron" style={{ opacity: 0.2 + fill * 0.8 }} aria-hidden>
            ❦
          </span>
        );
      })}
      <span className="fell ml-2 text-[15px]" style={{ color: "#c9a45c" }}>
        {vulgar(rating)}
      </span>
    </span>
  );
}

function Moth() {
  return (
    <svg viewBox="0 0 72 44" className="mx-auto h-11 w-16" aria-hidden>
      <g stroke="#c9a45c" strokeWidth="1.1" fill="rgba(201,164,92,0.09)" strokeLinecap="round">
        <path d="M36 20 C26 4, 6 4, 8 16 C9.5 25, 24 28, 36 24" />
        <path d="M36 20 C46 4, 66 4, 64 16 C62.5 25, 48 28, 36 24" />
        <path d="M36 24 C29 30, 22 38, 26 40 C31 42, 35 32, 36 27" />
        <path d="M36 24 C43 30, 50 38, 46 40 C41 42, 37 32, 36 27" />
        <line x1="36" y1="14" x2="36" y2="30" strokeWidth="2" />
        <path d="M35 13 C33 8, 30 5, 27 4" fill="none" />
        <path d="M37 13 C39 8, 42 5, 45 4" fill="none" />
      </g>
    </svg>
  );
}

function Frame({ children, className = "", style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`frame ${className}`} style={style}>
      <span className="floret" style={{ top: 7, left: 9 }}>❖</span>
      <span className="floret" style={{ top: 7, right: 9 }}>❖</span>
      <span className="floret" style={{ bottom: 7, left: 9 }}>❖</span>
      <span className="floret" style={{ bottom: 7, right: 9 }}>❖</span>
      {children}
    </div>
  );
}

function Volume({
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
  const finished = stampDate(book.date_read);
  const statusWord =
    book.status === "read" ? "read" : book.status === "reading" ? "in hand" : "awaiting";

  return (
    <Frame className="relative">
      {exceptional && (
        <span className="seal absolute -right-4 -top-5 z-10" title="Exceptional">
          <span style={{ fontSize: 20, transform: "rotate(-12deg)" }}>✶</span>
        </span>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full cursor-pointer text-left"
        style={{ padding: "28px 32px 20px" }}
      >
        <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
          <span className="sc">plate {n}</span>
          <span className="sc" style={{ color: "#b9ab92" }}>
            · {statusWord} ·
          </span>
          <span className="sc ml-auto" style={{ color: "#b9ab92" }}>
            {open ? "close −" : "open +"}
          </span>
        </div>

        <div className="mt-4 flex items-start gap-7">
          {book.cover_url && (
            <span className="gilt hidden shrink-0 sm:block">
              <span className="relative block h-[136px] w-[92px] overflow-hidden">
                <Image
                  src={book.cover_url}
                  alt=""
                  fill
                  sizes="92px"
                  className="object-cover"
                  style={{ filter: "sepia(0.18) saturate(0.9) brightness(0.96)" }}
                />
              </span>
            </span>
          )}
          <div className="min-w-0">
            <h3 className="fell text-[clamp(1.5rem,3.4vw,2.2rem)] leading-[1.08]" style={{ color: "#ecdfc8" }}>
              {book.title}
            </h3>
            <p className="fell mt-1 italic text-[1.1rem]" style={{ color: "#b9ab92" }}>
              {book.author}, {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` — after ${book.limbus_sinner}` : ""}
            </p>
            {rating != null && (
              <div className="mt-3">
                <Fleurons rating={rating} />
                {book.show_star && (
                  <span
                    className="ml-2"
                    style={{ color: "#e9c86a", textShadow: "0 0 9px rgba(233,200,106,0.75)", fontSize: 17 }}
                    aria-hidden
                  >
                    ★
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      </button>

      <div
        className="manor-expand"
        style={{ maxHeight: open ? 4200 : 0, opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div style={{ padding: "0 32px 28px" }}>
          <div className="orn sc mb-6" style={{ color: "#c9a45c" }}>❦</div>

          {book.reviewer_name && (
            <p className="fell mb-5 italic text-[1.05rem]" style={{ color: "#c9a45c" }}>
              set down by the hand of {book.reviewer_name}
            </p>
          )}

          {book.summary && (
            <div className="mb-7">
              <div className="sc mb-2">in which —</div>
              <div className="prose-m" style={{ color: "#d5c8ae", fontSize: "1.1rem" }}>
                <ReactMarkdown>{book.summary}</ReactMarkdown>
              </div>
            </div>
          )}

          {book.review && (
            <div>
              <div className="sc mb-2">the reading —</div>
              <div className="prose-m">
                <ReactMarkdown>{book.review}</ReactMarkdown>
              </div>
            </div>
          )}

          {finished && (
            <p className="fell mt-2 italic text-[0.98rem]" style={{ color: "#b9ab92" }}>
              finished {finished.toLowerCase()}, by candlelight
            </p>
          )}
        </div>
      </div>
    </Frame>
  );
}

export function ManorDraft({
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
    <div className="d-manor">
      <div className="mx-auto max-w-4xl">
        {/* nav */}
        <nav className="mn-nav flex items-center justify-between">
          <span className="sc">Anno MMXXVI</span>
          <div className="flex gap-8">
            <Link href="/">Home</Link>
            <Link href="/limbus">Limbus</Link>
            <Link href="/about">About</Link>
          </div>
        </nav>

        {/* bookplate masthead */}
        <header className="mx-auto mt-14 max-w-xl">
          <Frame className="px-8 py-10 text-center sm:px-14">
            <div className="sc">ex libris</div>
            <Moth />
            <h1 className="fell text-[clamp(2.2rem,7vw,3.4rem)] leading-none" style={{ color: "#ecdfc8" }}>
              {name}
            </h1>
            <p className="fell mt-3 italic text-[1.2rem]" style={{ color: "#b9ab92" }}>
              {tagline.toLowerCase()}, honestly kept
            </p>
            <div className="orn mt-6" style={{ fontSize: 13 }}>❦</div>
          </Frame>
        </header>

        {/* intro */}
        <section className="mx-auto mt-16 max-w-2xl">
          <div className="prose-m">
            <IntroMd text={intro} />
          </div>
        </section>

        {/* the shelf of spines */}
        <section className="mt-16">
          <div className="orn sc mb-1">the fourteen volumes</div>
          <Link href="/limbus" className="block" title="Open the Limbus shelf">
            <div className="shelfrow">
              {limbus.map((b, i) => {
                const h = 158 + Math.round(Math.abs(jitter(i, 1)) * 52);
                const w = 32 + Math.round(Math.abs(jitter(i + 7, 1)) * 13);
                const tone = b.limbus_color || "#7a4a3a";
                return (
                  <span
                    key={b.id}
                    className="spine"
                    style={{
                      height: h,
                      width: w,
                      background: `linear-gradient(168deg, color-mix(in oklab, ${tone} 42%, #2a1626) 0%, #1d1017 85%)`,
                    }}
                    title={`${b.title} — ${b.author}`}
                  >
                    <span className="bands" aria-hidden />
                    <span className="stitle">{b.title}</span>
                  </span>
                );
              })}
            </div>
            <div className="shelfboard" />
            <p className="fell mt-3 text-center italic text-[1.02rem]" style={{ color: "#b9ab92" }}>
              the Limbus fourteen, spines to the candle — tap to browse the shelf
            </p>
          </Link>
        </section>

        {/* volumes reviewed */}
        <section className="mt-16">
          <div className="orn sc mb-8">volumes reviewed</div>
          <div className="flex flex-col gap-8">
            {reviews.map((b, i) => (
              <Volume key={b.id} book={b} n={i + 1} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="sc mt-20 text-center" style={{ color: "#b9ab92" }}>
          ❦ shelved by candlelight ❦
        </footer>
      </div>
    </div>
  );
}

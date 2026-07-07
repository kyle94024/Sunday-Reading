"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { jitter, yearLabel } from "../util";
import {
  Expandable,
  GlyphRating,
  IntroMd,
  SideRails,
  Sparkle,
  Star,
  SunAst,
} from "../zf/core";

function HalftoneBall({ size = 64, tint = "v" }: { size?: number; tint?: "v" | "t" }) {
  return (
    <span
      className={tint === "v" ? "dots-v" : "dots-t"}
      style={{ display: "inline-block", width: size, height: size, borderRadius: "50%" }}
      aria-hidden
    />
  );
}

function RisoCard({ book, defaultOpen = false, i }: { book: Book; defaultOpen?: boolean; i: number }) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;

  return (
    <article className="card relative" style={{ transform: `rotate(${jitter(i + 2, 0.5)}deg)` }}>
      {exceptional && (
        <span className="stamp absolute -top-3 right-6 bg-[#f4efe4]">top shelf ✶</span>
      )}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full cursor-pointer text-left"
        style={{ padding: "22px 24px 16px" }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className={`pill ${book.status === "read" ? "tan" : ""}`}>
            {book.status === "read" ? "READ" : book.status === "reading" ? "READING" : "TO READ"}
          </span>
          {book.reviewer_name && <span className="pill">✦ guest · {book.reviewer_name}</span>}
          {rating != null && (
            <GlyphRating rating={rating} glyph="●" color="#ff6b35" size={15} showStar={book.show_star === true} starColor="#6d28d9" />
          )}
          <span className="big ml-auto text-[12px]" style={{ color: "#6d28d9" }}>
            {open ? "− FOLD" : "+ UNFOLD"}
          </span>
        </div>
        <div className="mt-4 flex items-start gap-5">
          {book.cover_url && (
            <span className="duo hidden h-[118px] w-[80px] shrink-0 sm:block">
              <span className="relative block h-full w-full">
                <Image src={book.cover_url} alt="" fill sizes="80px" className="object-cover" />
              </span>
            </span>
          )}
          <div className="min-w-0">
            <h3 className="overprint">
              <span className="c1 block" style={{ fontSize: "clamp(1.4rem,3.6vw,2.1rem)" }}>{book.title}</span>
              <span className="c2 block" style={{ fontSize: "clamp(1.4rem,3.6vw,2.1rem)" }} aria-hidden>{book.title}</span>
            </h3>
            <p className="mt-2 font-bold" style={{ fontSize: 13.5, color: "#5c5348" }}>
              {book.author} · {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` · ${book.limbus_sinner}` : ""}
            </p>
          </div>
        </div>
      </button>
      <Expandable open={open}>
        <div style={{ padding: "2px 24px 24px" }}>
          <div style={{ borderTop: "2.5px solid #6d28d9", marginBottom: 16 }} />
          {book.summary && (
            <div className="mb-5">
              <div className="big mb-1.5 text-[12px] uppercase tracking-[0.16em]" style={{ color: "#ff6b35" }}>the setup ↓</div>
              <div className="prose"><ReactMarkdown>{book.summary}</ReactMarkdown></div>
            </div>
          )}
          {book.review && (
            <div>
              <div className="big mb-1.5 text-[12px] uppercase tracking-[0.16em]" style={{ color: "#6d28d9" }}>the verdict ↓</div>
              <div className="prose"><ReactMarkdown>{book.review}</ReactMarkdown></div>
            </div>
          )}
        </div>
      </Expandable>
    </article>
  );
}

export function RisoDraft({ name, tagline, intro, limbus, reviews }: { name: string; tagline: string; intro: string; limbus: Book[]; reviews: Book[] }) {
  return (
    <div className="d-riso">
      <SideRails
        left={[
          <HalftoneBall key="a" size={70} tint="v" />,
          <span key="b" className="stamp">printed by hand</span>,
          <Star key="c" size={30} color="#ff6b35" />,
          <HalftoneBall key="d" size={46} tint="t" />,
          <SunAst key="e" size={44} color="#6d28d9" className="zf-spin-slower" />,
        ]}
        right={[
          <SunAst key="a" size={52} color="#ff6b35" className="zf-spin-slower" />,
          <Sparkle key="b" size={26} color="#6d28d9" />,
          <HalftoneBall key="c" size={62} tint="t" />,
          <span key="d" className="stamp" style={{ transform: "rotate(5deg)" }}>2 inks only</span>,
          <Star key="e" size={26} color="#6d28d9" />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="big text-[13px]" style={{ color: "#ff6b35" }}>SS/26 · RISO EDITION</span>
          <div className="flex gap-6">
            <Link href="/">HOME</Link>
            <Link href="/limbus">LIMBUS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </nav>

        <header className="relative mt-14 text-center">
          <span className="absolute -top-4 right-4 hidden sm:block">
            <SunAst size={56} color="#ff6b35" className="zf-spin-slower" />
          </span>
          <p className="big text-[13px] uppercase tracking-[0.24em]" style={{ color: "#6d28d9" }}>
            a homemade book-review poster
          </p>
          <h1 className="overprint mt-3">
            <span className="c1 block" style={{ fontSize: "clamp(2.8rem,10vw,5.6rem)" }}>{name}</span>
            <span className="c2 block" style={{ fontSize: "clamp(2.8rem,10vw,5.6rem)" }} aria-hidden>{name}</span>
          </h1>
          <p className="mx-auto mt-5 inline-block border-2 border-[#241d16] px-4 py-1.5 font-bold" style={{ fontSize: 14 }}>
            {tagline} — pulled in two inks
          </p>
        </header>

        <section className="card prose relative mx-auto mt-14 max-w-2xl" style={{ padding: "26px 28px 14px", transform: "rotate(-0.3deg)" }}>
          <span className="stamp absolute -top-3 left-6 bg-[#fbf8f0]">why this exists</span>
          <IntroMd text={intro} />
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-4">
            <h2 className="overprint">
              <span className="c1 block text-[clamp(1.4rem,4vw,2rem)]">THE LIMBUS 14</span>
              <span className="c2 block text-[clamp(1.4rem,4vw,2rem)]" aria-hidden>THE LIMBUS 14</span>
            </h2>
            <Link href="/limbus" className="pill tan ml-auto zf-wiggle">see the shelf →</Link>
          </div>
          <div className="zf-row">
            {limbus.map((b, i) => (
              <Link key={b.id} href="/limbus" style={{ width: 132, transform: `rotate(${jitter(i, 1.6)}deg)` }}>
                <span className="duo block h-[186px] w-full">
                  {b.cover_url ? (
                    <span className="relative block h-full w-full">
                      <Image src={b.cover_url} alt="" fill sizes="132px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="big flex h-full items-center justify-center p-2 text-center text-[12px] uppercase leading-tight" style={{ background: "#6d28d9", color: "#f4efe4" }}>
                      {b.title}
                    </span>
                  )}
                </span>
                <span className="big mt-1.5 block truncate text-center text-[11px]" style={{ color: "#241d16" }}>
                  {String(i + 1).padStart(2, "0")} · {b.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="overprint mb-8">
            <span className="c1 block text-[clamp(1.4rem,4vw,2rem)]">FRESH REVIEWS</span>
            <span className="c2 block text-[clamp(1.4rem,4vw,2rem)]" aria-hidden>FRESH REVIEWS</span>
          </h2>
          <div className="flex flex-col gap-9">
            {reviews.map((b, i) => (
              <RisoCard key={b.id} book={b} i={i} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="big mt-20 text-center text-[12px] uppercase tracking-[0.2em]" style={{ color: "#6d28d9" }}>
          misprints are personality (◡̈) · sunday&rsquo;s shelf
        </footer>
      </div>
    </div>
  );
}

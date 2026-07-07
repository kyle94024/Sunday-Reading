"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { jitter, yearLabel } from "../util";
import {
  Blob,
  Cloud,
  Expandable,
  Flower,
  GlyphRating,
  Heart,
  IntroMd,
  SideRails,
  Sparkle,
  Star,
} from "../zf/core";

function StickerCard({ book, i, defaultOpen = false }: { book: Book; i: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;

  return (
    <article className="stick relative" style={{ transform: `rotate(${jitter(i + 2, 0.8)}deg)` }}>
      {i === 0 && (
        <span className="absolute -top-9 right-10 z-10 zf-bob" aria-hidden>
          <Blob size={54} color="#a7f3d0" />
        </span>
      )}
      {exceptional && (
        <span className="absolute -left-3 -top-4 z-10 zf-float">
          <Star size={46} color="#fde68a" />
        </span>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "24px 26px 18px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`chip ${book.status === "read" ? "" : ""}`} style={{ background: book.status === "read" ? "#f9a8d4" : book.status === "reading" ? "#a7f3d0" : "#fde68a" }}>
            {book.status === "read" ? "finished ♡" : book.status === "reading" ? "reading rn" : "on the pile"}
          </span>
          {book.reviewer_name && <span className="chip" style={{ background: "#c4b5fd" }}>guest: {book.reviewer_name} ✎</span>}
          {rating != null && (
            <GlyphRating rating={rating} glyph="★" color="#f0a532" size={17} showStar={book.show_star === true} starColor="#8b5cf6" />
          )}
          <span className="round ml-auto text-[15px] font-bold" style={{ color: "#8b5cf6" }}>
            {open ? "close −" : "peel open +"}
          </span>
        </div>
        <div className="mt-4 flex items-start gap-5">
          {book.cover_url && (
            <span className="stick relative hidden h-[124px] w-[86px] shrink-0 overflow-hidden sm:block" style={{ borderRadius: 12, transform: `rotate(${jitter(i, 2.4)}deg)` }}>
              <Image src={book.cover_url} alt="" fill sizes="86px" className="object-cover" style={{ borderRadius: 10 }} />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="round font-bold leading-[1.02]" style={{ fontSize: "clamp(1.5rem,4vw,2.2rem)" }}>
              {book.title}
            </h3>
            <p className="mt-1.5 font-bold" style={{ fontSize: 13.5, color: "#6a5f85" }}>
              by {book.author} · {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` · ${book.limbus_sinner}` : ""}
            </p>
          </div>
        </div>
      </button>
      <Expandable open={open}>
        <div style={{ padding: "0 26px 24px" }}>
          <div className="polka mb-4" style={{ height: 10, borderRadius: 999 }} />
          {book.summary && (
            <div className="mb-5">
              <div className="round mb-1 text-[15px] font-bold" style={{ color: "#d17bab" }}>what it&rsquo;s about ✿</div>
              <div className="prose"><ReactMarkdown>{book.summary}</ReactMarkdown></div>
            </div>
          )}
          {book.review && (
            <div>
              <div className="round mb-1 text-[15px] font-bold" style={{ color: "#8b5cf6" }}>what i think ↓</div>
              <div className="prose"><ReactMarkdown>{book.review}</ReactMarkdown></div>
            </div>
          )}
        </div>
      </Expandable>
    </article>
  );
}

export function StickersDraft({ name, tagline, intro, limbus, reviews }: { name: string; tagline: string; intro: string; limbus: Book[]; reviews: Book[] }) {
  return (
    <div className="d-stick">
      <SideRails
        left={[
          <Blob key="a" size={52} color="#c4b5fd" />,
          <Flower key="b" size={34} color="#f9a8d4" center="#fde68a" />,
          <Sparkle key="c" size={24} color="#8b5cf6" />,
          <Cloud key="d" size={46} color="#fff" />,
          <Heart key="e" size={26} color="#f9a8d4" />,
        ]}
        right={[
          <Cloud key="a" size={40} color="#fff" />,
          <Star key="b" size={30} color="#fde68a" />,
          <Blob key="c" size={44} color="#f9a8d4" />,
          <span key="d" className="chip round" style={{ background: "#a7f3d0" }}>yay!</span>,
          <Flower key="e" size={30} color="#a7f3d0" center="#f9a8d4" />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="round font-bold" style={{ color: "#8b5cf6", fontSize: 16 }}>sticker club est. 2026</span>
          <div className="flex gap-2">
            <Link href="/">home</Link>
            <Link href="/limbus">limbus</Link>
            <Link href="/about">about</Link>
          </div>
        </nav>

        <header className="relative mx-auto mt-12 max-w-xl text-center">
          <div className="stick lilac relative" style={{ padding: "34px 26px 28px", borderRadius: 28, transform: "rotate(-0.8deg)" }}>
            <span className="absolute -top-7 -left-5 zf-float"><Star size={44} color="#fde68a" /></span>
            <span className="absolute -bottom-6 -right-4 zf-bob"><Heart size={40} color="#f9a8d4" /></span>
            <h1 className="round font-bold leading-none" style={{ fontSize: "clamp(2.2rem,7.5vw,3.6rem)", color: "#fff", textShadow: "0 2.5px 0 rgba(59,51,80,0.55)" }}>
              {name}
            </h1>
            <p className="round mt-2 font-bold" style={{ fontSize: 17, color: "#453a63" }}>
              {tagline.toLowerCase()} · collect them all!
            </p>
          </div>
          <span className="absolute -bottom-8 left-6 zf-bob" aria-hidden>
            <Blob size={62} color="#fde68a" />
          </span>
        </header>

        <section className="stick prose relative mx-auto mt-16 max-w-2xl" style={{ padding: "26px 28px 14px", borderRadius: 22 }}>
          <span className="chip round absolute -top-4 left-8" style={{ background: "#f9a8d4" }}>the origin story</span>
          <IntroMd text={intro} />
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="round font-bold" style={{ fontSize: "clamp(1.4rem,4vw,1.9rem)" }}>
              the limbus fourteen <Sparkle size={20} color="#8b5cf6" className="inline" />
            </h2>
            <Link href="/limbus" className="chip round ml-auto zf-wiggle" style={{ background: "#a7f3d0" }}>see the sheet →</Link>
          </div>
          <div className="zf-row">
            {limbus.map((b, i) => (
              <Link key={b.id} href="/limbus" className="stick" style={{ width: 126, padding: 7, borderRadius: 16, transform: `rotate(${jitter(i, 2.6)}deg)` }}>
                <span className="relative block h-[150px] w-full overflow-hidden" style={{ borderRadius: 10 }}>
                  {b.cover_url ? (
                    <Image src={b.cover_url} alt="" fill sizes="126px" className="object-cover" />
                  ) : (
                    <span className="round flex h-full w-full items-center justify-center p-2 text-center text-[14px] font-bold leading-tight" style={{ background: "#c4b5fd", color: "#fff" }}>{b.title}</span>
                  )}
                </span>
                <span className="round block pt-1.5 text-center text-[13px] font-bold leading-tight" style={{ color: "#3b3350" }}>
                  {b.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="round mb-9 font-bold" style={{ fontSize: "clamp(1.4rem,4vw,1.9rem)" }}>
            fresh reviews <Heart size={20} color="#f9a8d4" className="inline" />
          </h2>
          <div className="flex flex-col gap-11">
            {reviews.map((b, i) => (
              <StickerCard key={b.id} book={b} i={i} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="round mt-20 text-center text-[16px] font-bold" style={{ color: "#8b7ba8" }}>
          stuck on books forever ✿ sunday&rsquo;s shelf
        </footer>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { jitter, stampDate, yearLabel } from "../util";
import {
  Cat,
  Expandable,
  Flower,
  GlyphRating,
  Heart,
  IntroMd,
  Pushpin,
  SideRails,
  Sparkle,
  Star,
  Washi,
} from "../zf/core";

function HandNote({ children, rotate = -3, size = 21 }: { children: React.ReactNode; rotate?: number; size?: number }) {
  return (
    <span className="hand doodle-note" style={{ display: "inline-block", transform: `rotate(${rotate}deg)`, fontSize: size }}>
      {children}
    </span>
  );
}

function ScrapCard({ book, i, defaultOpen = false }: { book: Book; i: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;
  const finished = stampDate(book.date_read);

  return (
    <article className="page relative" style={{ transform: `rotate(${jitter(i + 1, 0.7)}deg)` }}>
      <Washi w={92} h={22} color={i % 2 ? "rgba(157,184,160,0.85)" : "rgba(232,160,168,0.85)"} rotate={i % 2 ? 4 : -5} className="absolute -top-2.5 left-8" />
      <Washi w={70} h={20} color="rgba(242,217,141,0.9)" rotate={i % 2 ? -6 : 5} className="absolute -top-2 right-10" />
      {exceptional && (
        <span className="absolute -right-3 -top-4 z-10 zf-bob">
          <Star size={44} color="#f2d98d" />
        </span>
      )}

      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "24px 26px 16px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`label ${book.status === "read" ? "rose" : book.status === "reading" ? "sage" : ""}`} style={{ fontSize: 11 }}>
            {book.status === "read" ? "finished!" : book.status === "reading" ? "reading now" : "someday pile"}
          </span>
          {book.reviewer_name && (
            <HandNote rotate={-2} size={20}>✎ {book.reviewer_name} wrote this one!</HandNote>
          )}
          <span className="hand ml-auto text-[20px]" style={{ color: "#4a3550" }}>
            {open ? "fold it up ↑" : "open me ↓"}
          </span>
        </div>

        <div className="mt-4 flex items-start gap-6">
          {book.cover_url && (
            <span className="photo relative hidden w-[104px] shrink-0 sm:block" style={{ transform: `rotate(${jitter(i + 4, 3)}deg)` }}>
              <span className="absolute -top-2.5 left-1/2 z-10 -translate-x-1/2"><Pushpin size={20} /></span>
              <span className="relative block h-[118px] w-full overflow-hidden">
                <Image src={book.cover_url} alt="" fill sizes="104px" className="object-cover" />
              </span>
              <span className="hand absolute bottom-0.5 left-0 right-0 text-center text-[15px]">{yearLabel(book.year_published)}</span>
            </span>
          )}
          <div className="min-w-0">
            <h3 className="flex flex-wrap items-center gap-x-2 gap-y-1.5" style={{ fontSize: "clamp(1.3rem,3.3vw,1.9rem)" }}>
              {book.title.split(" ").map((w, wi) => (
                <span key={wi} className="label" style={{ transform: `rotate(${jitter(wi + i, 1.6)}deg)` }}>{w}</span>
              ))}
            </h3>
            <p className="hand mt-2 text-[21px]" style={{ color: "#6a5a72" }}>
              by {book.author}
              {book.limbus_sinner ? ` — ${book.limbus_sinner}'s book` : ""}
            </p>
            {rating != null && (
              <div className="mt-1.5">
                <GlyphRating rating={rating} glyph="♥" color="#e8737f" size={18} showStar={book.show_star === true} starColor="#e0a92e" />
              </div>
            )}
          </div>
        </div>
      </button>

      <Expandable open={open}>
        <div style={{ padding: "0 26px 24px" }}>
          <div style={{ borderTop: "2px dashed rgba(74,53,80,0.35)", marginBottom: 16 }} />
          {book.summary && (
            <div className="mb-5">
              <HandNote size={22} rotate={-1}>what it&rsquo;s about —</HandNote>
              <div className="prose mt-1"><ReactMarkdown>{book.summary}</ReactMarkdown></div>
            </div>
          )}
          {book.review && (
            <div>
              <HandNote size={22} rotate={1}>dear diary —</HandNote>
              <div className="prose mt-1"><ReactMarkdown>{book.review}</ReactMarkdown></div>
            </div>
          )}
          {finished && <HandNote size={19} rotate={-2}>finished {finished.toLowerCase()} ✿</HandNote>}
        </div>
      </Expandable>
    </article>
  );
}

export function ScrapbookDraft({ name, tagline, intro, limbus, reviews }: { name: string; tagline: string; intro: string; limbus: Book[]; reviews: Book[] }) {
  const hung = limbus.slice(0, 5);
  return (
    <div className="d-scrap">
      <SideRails
        left={[
          <Flower key="a" size={38} color="#e8a0a8" />,
          <HandNote key="b" size={22} rotate={-8}>so good!!</HandNote>,
          <Heart key="c" size={26} color="#e8737f" />,
          <Star key="d" size={28} color="#f2d98d" />,
          <Cat key="e" size={40} color="#4a3550" />,
        ]}
        right={[
          <Sparkle key="a" size={24} color="#9db8a0" />,
          <Flower key="b" size={32} color="#9db8a0" center="#e8a0a8" />,
          <HandNote key="c" size={22} rotate={6}>cried here →</HandNote>,
          <Heart key="d" size={22} color="#e8a0a8" />,
          <Washi key="e" w={70} h={20} color="rgba(157,184,160,0.9)" rotate={10} />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <HandNote size={22} rotate={-2}>est. 2026 ✿</HandNote>
          <div className="flex gap-6">
            <Link href="/">home</Link>
            <Link href="/limbus">limbus</Link>
            <Link href="/about">about</Link>
          </div>
        </nav>

        {/* hanging photo string */}
        <div className="string mt-8 hidden sm:block" aria-hidden>
          <svg className="line" viewBox="0 0 800 110" preserveAspectRatio="none">
            <path d="M0 18 Q 400 64 800 14" fill="none" stroke="rgba(74,53,80,0.5)" strokeWidth="2" strokeDasharray="1 0" />
          </svg>
          {hung.map((b, i) => {
            const left = 8 + i * 19;
            return (
              <span key={b.id} className="photo hung zf-sway" style={{ left: `${left}%`, animationDuration: `${6 + (i % 3)}s`, padding: "4px 4px 12px", transform: `rotate(${jitter(i, 5)}deg)` }}>
                <span className="relative block h-[64px] w-full overflow-hidden">
                  {b.cover_url ? (
                    <Image src={b.cover_url} alt="" fill sizes="64px" className="object-cover" />
                  ) : (
                    <span className="block h-full w-full" style={{ background: "#c4b5cf" }} />
                  )}
                </span>
              </span>
            );
          })}
        </div>

        <header className="relative mx-auto mt-6 max-w-xl text-center">
          <div className="page relative" style={{ padding: "30px 26px 26px", transform: "rotate(-0.6deg)" }}>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2"><Pushpin size={24} /></span>
            <h1 className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: "clamp(1.7rem,5.5vw,2.6rem)" }}>
              {name.split(" ").map((w, i) => (
                <span key={i} className={`label ${i % 2 ? "rose" : ""}`} style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>{w}</span>
              ))}
            </h1>
            <p className="hand mt-3 text-[24px]" style={{ color: "#6a5a72" }}>{tagline.toLowerCase()} ♡ kept by kyle</p>
          </div>
          <span className="absolute -right-7 -bottom-5 zf-bob"><Flower size={44} color="#f2d98d" center="#e8a0a8" /></span>
        </header>

        <section className="page lined prose relative mx-auto mt-14 max-w-2xl" style={{ padding: "26px 30px 14px", transform: "rotate(0.35deg)", lineHeight: "27px" }}>
          <Washi w={110} h={24} color="rgba(232,160,168,0.85)" rotate={-4} className="absolute -top-3 left-10" />
          <HandNote size={22} rotate={-1}>the story so far —</HandNote>
          <div className="mt-1"><IntroMd text={intro} /></div>
        </section>

        <section className="mt-16">
          <div className="flex items-center gap-4">
            <h2><span className="label sage" style={{ fontSize: 15 }}>the limbus fourteen</span></h2>
            <Link href="/limbus" className="hand text-[22px] zf-wiggle" style={{ color: "#8a4a55" }}>see them all →</Link>
          </div>
          <div className="zf-row">
            {limbus.map((b, i) => (
              <Link key={b.id} href="/limbus" className="photo" style={{ width: 128, transform: `rotate(${jitter(i, 3.4)}deg)` }}>
                <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2"><Pushpin size={18} color={i % 3 === 0 ? "#e2504c" : i % 3 === 1 ? "#5c8a63" : "#4a6da8"} /></span>
                <span className="relative block h-[142px] w-full overflow-hidden">
                  {b.cover_url ? (
                    <Image src={b.cover_url} alt="" fill sizes="128px" className="object-cover" />
                  ) : (
                    <span className="hand flex h-full w-full items-center justify-center p-2 text-center text-[17px] leading-tight" style={{ background: "#cfc0dd", color: "#4a3550" }}>{b.title}</span>
                  )}
                </span>
                <span className="hand block pt-1 text-center text-[16px] leading-none" style={{ color: "#4a3550" }}>{b.title}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="mb-8"><span className="label rose" style={{ fontSize: 15 }}>pages about books</span> <HandNote size={22} rotate={-2}>← the good stuff</HandNote></h2>
          <div className="flex flex-col gap-10">
            {reviews.map((b, i) => (
              <ScrapCard key={b.id} book={b} i={i} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="hand mt-20 text-center text-[22px]" style={{ color: "#6a5a72" }}>
          glued with too much glue ✿ sunday&rsquo;s shelf
        </footer>
      </div>
    </div>
  );
}

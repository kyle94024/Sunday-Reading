"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { jitter, yearLabel } from "../util";
import {
  Expandable,
  Ghost,
  IntroMd,
  Joystick,
  Marquee,
  PixelHearts,
  SideRails,
  Sparkle,
} from "../zf/core";

function NeonSign({ text, color = "c" }: { text: string; color?: "c" | "m" | "y" }) {
  return (
    <span className={`px zf-flicker neon-${color}`} style={{ fontSize: 24, border: "2px solid currentColor", borderRadius: 8, padding: "2px 12px", boxShadow: "0 0 14px rgba(45,226,255,0.35), inset 0 0 10px rgba(45,226,255,0.15)" }}>
      {text}
    </span>
  );
}

function ArcadeCard({ book, i, defaultOpen = false }: { book: Book; i: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;

  return (
    <article className="cab relative" style={{ transform: `rotate(${jitter(i + 5, 0.4)}deg)` }}>
      {exceptional && (
        <span className="px neon-y absolute -top-3.5 right-6 z-10 zf-pulse" style={{ fontSize: 20, background: "#0b0d1f", padding: "0 10px", border: "2px solid #ffe86b", borderRadius: 6 }}>
          ★ HI-SCORE ★
        </span>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "22px 24px 16px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className={`btn-coin ${book.status === "read" ? "m" : book.status === "reading" ? "c" : ""}`}>
            {book.status === "read" ? "CLEARED!" : book.status === "reading" ? "NOW PLAYING" : "IN QUEUE"}
          </span>
          {book.reviewer_name && <span className="btn-coin c">P2: {book.reviewer_name}</span>}
          {rating != null && (
            <PixelHearts rating={rating} showStar={book.show_star === true} off="rgba(255,255,255,0.14)" />
          )}
          <span className="px ml-auto text-[19px]" style={{ color: "#9aa0d8" }}>
            {open ? "[B] CLOSE" : "[A] OPEN"}
          </span>
        </div>
        <div className="mt-4 flex items-start gap-5">
          {book.cover_url && (
            <span className="slot relative hidden h-[122px] w-[84px] shrink-0 overflow-hidden sm:block">
              <Image src={book.cover_url} alt="" fill sizes="84px" className="object-cover" style={{ filter: "saturate(1.15) contrast(1.05)" }} />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="big aber uppercase leading-[0.95]" style={{ fontSize: "clamp(1.5rem,4vw,2.3rem)" }}>
              {book.title}
            </h3>
            <p className="px mt-2 text-[19px]" style={{ color: "#9aa0d8" }}>
              {book.author} · {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` · CHARACTER: ${book.limbus_sinner.toUpperCase()}` : ""}
            </p>
          </div>
        </div>
      </button>
      <Expandable open={open}>
        <div style={{ padding: "0 24px 24px" }}>
          <div style={{ borderTop: "2.5px solid rgba(45,226,255,0.6)", marginBottom: 16 }} />
          {book.summary && (
            <div className="mb-5">
              <div className="px mb-1 text-[19px] neon-c">» BRIEFING</div>
              <div className="prose"><ReactMarkdown>{book.summary}</ReactMarkdown></div>
            </div>
          )}
          {book.review && (
            <div>
              <div className="px mb-1 text-[19px] neon-m">» DEBRIEF</div>
              <div className="prose"><ReactMarkdown>{book.review}</ReactMarkdown></div>
            </div>
          )}
        </div>
      </Expandable>
    </article>
  );
}

export function ArcadeDraft({ name, tagline, intro, limbus, reviews }: { name: string; tagline: string; intro: string; limbus: Book[]; reviews: Book[] }) {
  const readCount = limbus.filter((b) => b.status === "read").length;
  return (
    <div className="d-arcade">
      <SideRails
        left={[
          <NeonSign key="a" text="BOOKS" color="c" />,
          <Ghost key="b" size={34} color="#2de2ff" />,
          <Sparkle key="c" size={24} color="#ffe86b" />,
          <Joystick key="d" size={42} />,
          <span key="e" className="px neon-m zf-pulse" style={{ fontSize: 19 }}>INSERT COIN</span>,
        ]}
        right={[
          <span key="a" className="px neon-y" style={{ fontSize: 19 }}>1UP = 1 BOOK</span>,
          <Ghost key="b" size={30} color="#ff2d95" />,
          <NeonSign key="c" text="24H" color="m" />,
          <Sparkle key="d" size={22} color="#2de2ff" />,
          <Ghost key="e" size={26} color="#ffe86b" />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="px neon-c" style={{ fontSize: 20 }}>CREDIT 26</span>
          <div className="flex gap-6">
            <Link href="/">HOME</Link>
            <Link href="/limbus">LIMBUS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </nav>

        <header className="mt-12 text-center">
          <p className="px neon-y zf-pulse" style={{ fontSize: 21 }}>PRESS START TO READ</p>
          <h1 className="big aber mt-3 uppercase leading-[0.92]" style={{ fontSize: "clamp(2.7rem,9.5vw,5.6rem)" }}>
            {name}
          </h1>
          <p className="px mt-4" style={{ fontSize: 21, color: "#9aa0d8" }}>
            {tagline.toUpperCase()} — NO CONTINUES NEEDED
          </p>
        </header>

        <Marquee className="ticker mt-10" speed={22}>
          ★ NOW REVIEWING: {reviews[0]?.title?.toUpperCase() ?? "BOOKS"} ★ {readCount}/14 LIMBUS BOOKS CLEARED ★ NEW REVIEWS EVERY SUNDAY ★ NO ADS NO ALGORITHM ★
        </Marquee>

        <section className="cab prose relative mx-auto mt-12 max-w-2xl" style={{ padding: "26px 28px 14px" }}>
          <span className="px neon-c absolute -top-3.5 left-6" style={{ background: "#131635", padding: "0 10px", fontSize: 19 }}>
            » MISSION LOG
          </span>
          <IntroMd text={intro} />
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="big aber uppercase" style={{ fontSize: "clamp(1.4rem,4vw,2rem)" }}>SELECT YOUR BOOK</h2>
            <Link href="/limbus" className="btn-coin c ml-auto zf-wiggle">FULL ROSTER →</Link>
          </div>
          <div className="zf-row">
            {limbus.map((b, i) => (
              <Link key={b.id} href="/limbus" className="slot" style={{ width: 128 }}>
                <span className="relative block h-[176px] w-full overflow-hidden">
                  {b.cover_url ? (
                    <Image src={b.cover_url} alt="" fill sizes="128px" className="object-cover" />
                  ) : (
                    <span className="px flex h-full w-full items-center justify-center p-2 text-center text-[18px] leading-tight" style={{ color: "#2de2ff" }}>{b.title}</span>
                  )}
                </span>
                <span className="px block py-1 text-center text-[17px]" style={{ color: b.status === "read" ? "#ffe86b" : "#9aa0d8" }}>
                  {String(i + 1).padStart(2, "0")} {b.status === "read" ? "★" : ""}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="big aber mb-8 uppercase" style={{ fontSize: "clamp(1.4rem,4vw,2rem)" }}>PLAYER REVIEWS</h2>
          <div className="flex flex-col gap-9">
            {reviews.map((b, i) => (
              <ArcadeCard key={b.id} book={b} i={i} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <div className="grid-floor mt-16" aria-hidden />
        <footer className="px mt-4 text-center" style={{ fontSize: 19, color: "#9aa0d8" }}>
          GAME OVER? NEVER. · SUNDAY&rsquo;S SHELF
        </footer>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { yearLabel } from "../util";
import { Expandable, IntroMd, Marquee, SideRails } from "../zf/core";

function starsText(rating: number): string {
  const half = Math.round(rating * 2) / 2;
  const full = Math.floor(half);
  return "★".repeat(Math.min(full, 5)) + (half - full === 0.5 ? "½" : "") + "☆".repeat(Math.max(0, 5 - Math.ceil(half)));
}

function Classified({ head, body }: { head: string; body: string }) {
  return (
    <div className="classified">
      <b>{head}</b>
      {body}
    </div>
  );
}

function Story({ book, i, defaultOpen = false }: { book: Book; i: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;

  return (
    <article className="story relative">
      {exceptional && (
        <span className="redbox zf-pulse absolute -top-3 right-5 text-[11px] tracking-[0.14em]">FRONT-PAGE PICK ★</span>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "20px 24px 16px" }}>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11px] uppercase tracking-[0.14em]" style={{ color: "#8a8578" }}>
          <span className="redbox text-[10px] tracking-[0.16em]">
            {book.status === "read" ? "REVIEWED" : book.status === "reading" ? "DEVELOPING STORY" : "ON THE DESK"}
          </span>
          <span>{book.author}</span>
          <span>{yearLabel(book.year_published)}</span>
          {book.limbus_sinner && <span>RE: {book.limbus_sinner}</span>}
          {rating != null && (
            <span className="ml-auto" style={{ color: "#efe9dc", fontSize: 14, letterSpacing: 0 }}>
              {starsText(rating)}{book.show_star ? <span style={{ color: "#d92b2b" }}> ✦</span> : null}{" "}
              <span style={{ fontSize: 11, color: "#8a8578" }}>({rating.toFixed(1)})</span>
            </span>
          )}
        </div>
        <div className="mt-3 flex items-start gap-5">
          {book.cover_url && (
            <span className="halfpic hidden h-[124px] w-[86px] shrink-0 sm:block">
              <span className="relative block h-full w-full">
                <Image src={book.cover_url} alt="" fill sizes="86px" className="object-cover" />
              </span>
            </span>
          )}
          <div className="min-w-0">
            <h3 className="big uppercase leading-[0.94]" style={{ fontSize: "clamp(1.5rem,4.2vw,2.4rem)", color: "#efe9dc" }}>
              {book.title}
            </h3>
            <p className="mt-2 italic" style={{ fontSize: 14, color: "#b6ae9c" }}>
              {book.summary
                ? `${book.summary.replace(/\*/g, "").slice(0, 110)}…`
                : "Full story below the fold."}
              <span className="ml-2 font-bold not-italic" style={{ color: "#d92b2b" }}>
                {open ? "fold it ▲" : "read on ▼"}
              </span>
            </p>
          </div>
        </div>
      </button>
      <Expandable open={open}>
        <div style={{ padding: "0 24px 22px" }}>
          <div className="rule-thin mb-4" />
          {book.reviewer_name && (
            <p className="mb-4 text-[11px] uppercase tracking-[0.16em]" style={{ color: "#8a8578" }}>
              special correspondent — <span style={{ color: "#efe9dc" }}>{book.reviewer_name}</span>
            </p>
          )}
          {book.summary && (
            <div className="mb-5">
              <div className="big mb-1.5 text-[11px] uppercase tracking-[0.2em]" style={{ color: "#d92b2b" }}>the story so far</div>
              <div className="prose" style={{ fontStyle: "italic" }}><ReactMarkdown>{book.summary}</ReactMarkdown></div>
            </div>
          )}
          {book.review && (
            <div>
              <div className="big mb-1.5 text-[11px] uppercase tracking-[0.2em]" style={{ color: "#d92b2b" }}>our verdict</div>
              <div className="prose"><ReactMarkdown>{book.review}</ReactMarkdown></div>
            </div>
          )}
          <p className="mt-2 text-[10.5px] uppercase tracking-[0.16em]" style={{ color: "#6f6a5e" }}>
            continued on p. {7 + i} (there is no p. {7 + i})
          </p>
        </div>
      </Expandable>
    </article>
  );
}

export function TabloidDraft({ name, tagline, intro, limbus, reviews }: { name: string; tagline: string; intro: string; limbus: Book[]; reviews: Book[] }) {
  const readCount = limbus.filter((b) => b.status === "read").length;
  return (
    <div className="d-tab">
      <SideRails
        left={[
          <Classified key="a" head="LOST" body="my place in Crime & Punishment. ch. 4. reward." />,
          <Classified key="b" head="WANTED" body="one (1) reading lamp that flatters." />,
          <Classified key="c" head="FOR TRADE" body="sleep, gently used, for one more chapter." />,
        ]}
        right={[
          <Classified key="a" head="FOUND" body="a receipt used as a bookmark. dated 2019." />,
          <Classified key="b" head="NOTICE" body="the TBR pile is now load-bearing." />,
          <Classified key="c" head="MISSED CONNECTION" body="you, the bookstore cat. me, allergic. call me." />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="big text-[12px] tracking-[0.14em]" style={{ color: "#d92b2b" }}>VOL. 1 · NO. 26</span>
          <div className="flex gap-6">
            <Link href="/">HOME</Link>
            <Link href="/limbus">LIMBUS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </nav>

        <header className="mt-8">
          <div className="rule-x" />
          <div className="flex items-baseline justify-between py-1 text-[10.5px] uppercase tracking-[0.18em]" style={{ color: "#8a8578" }}>
            <span>sunday edition</span>
            <span>est. may 2026</span>
            <span>price: one recommendation</span>
          </div>
          <div className="rule-x" />
          <h1 className="big mt-4 text-center uppercase leading-[0.88]" style={{ fontSize: "clamp(3rem,11vw,6.4rem)", color: "#efe9dc" }}>
            {name.replace("'s", "’s")}
          </h1>
          <p className="mt-3 text-center italic" style={{ color: "#b6ae9c", fontSize: 16 }}>
            “{tagline}” — all the books fit to print
          </p>
          <div className="rule-x mt-4" />
        </header>

        <Marquee className="ticker mt-3" speed={20}>
          EXTRA!! EXTRA!! {readCount} OF 14 LIMBUS BOOKS NOW REVIEWED ★ LOCAL READER REFUSES TO APOLOGIZE FOR TBR PILE ★ CRITICS AGREE: PAPER SMELLS GREAT ★
        </Marquee>

        <section className="story torn prose relative mx-auto mt-12 max-w-2xl" style={{ padding: "24px 28px 26px" }}>
          <span className="redbox absolute -top-3 left-6 text-[11px] tracking-[0.16em]">OP-ED: WHY THIS PAPER EXISTS</span>
          <IntroMd text={intro} />
        </section>

        <section className="mt-14">
          <div className="flex items-baseline gap-4">
            <h2 className="big uppercase" style={{ fontSize: "clamp(1.3rem,3.6vw,1.9rem)", color: "#efe9dc" }}>
              THE LIMBUS FOURTEEN
            </h2>
            <span className="rule-thin flex-1" />
            <Link href="/limbus" className="redbox zf-wiggle text-[11px] tracking-[0.14em]">SEE SECTION B →</Link>
          </div>
          <div className="zf-row">
            {limbus.map((b, i) => (
              <Link key={b.id} href="/limbus" style={{ width: 122 }}>
                <span className="halfpic block h-[168px] w-full">
                  {b.cover_url ? (
                    <span className="relative block h-full w-full">
                      <Image src={b.cover_url} alt="" fill sizes="122px" className="object-cover" />
                    </span>
                  ) : (
                    <span className="big flex h-full w-full items-center justify-center p-2 text-center text-[11px] uppercase leading-tight" style={{ color: "#efe9dc" }}>
                      {b.title}
                    </span>
                  )}
                </span>
                <span className="block pt-1 text-center text-[10.5px] uppercase tracking-[0.1em]" style={{ color: "#8a8578" }}>
                  fig. {i + 1} — {b.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <div className="flex items-baseline gap-4">
            <h2 className="big uppercase" style={{ fontSize: "clamp(1.3rem,3.6vw,1.9rem)", color: "#efe9dc" }}>
              REVIEWS &amp; OPINIONS
            </h2>
            <span className="rule-thin flex-1" />
          </div>
          <div className="mt-6 flex flex-col gap-8">
            {reviews.map((b, i) => (
              <Story key={b.id} book={b} i={i} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="mt-16">
          <div className="rule-x" />
          <p className="py-3 text-center text-[10.5px] uppercase tracking-[0.18em]" style={{ color: "#8a8578" }}>
            printed at midnight · corrections happily issued · sunday&rsquo;s shelf
          </p>
          <div className="rule-x" />
        </footer>
      </div>
    </div>
  );
}

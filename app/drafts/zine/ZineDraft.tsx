"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { jitter, yearLabel } from "../util";
import { IntroMd } from "../zf/core";

function StatusSticker({ status }: { status: Book["status"] }) {
  if (status === "read") return <span className="sticker acid">READ!</span>;
  if (status === "reading")
    return <span className="sticker violet">READING…</span>;
  return <span className="sticker grey">TBR PILE</span>;
}

function ZineCard({
  book,
  i,
  defaultOpen = false,
}: {
  book: Book;
  i: number;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;
  const rot = jitter(i + 3, 0.8);

  return (
    <article
      className="paper hs-v relative"
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {book.reviewer_name && (
        <span className="tape" style={{ top: -14, right: 18, transform: "rotate(4deg)" }}>
          guest review!!
        </span>
      )}
      {exceptional && (
        <span className="burst gold burst-card" style={{ transform: "scale(0.9)" }}>
          <span>
            TOP
            <br />
            SHELF
          </span>
        </span>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="block w-full cursor-pointer text-left"
        style={{ padding: "22px 24px 16px" }}
      >
        <div className="flex flex-wrap items-center gap-4">
          <StatusSticker status={book.status} />
          {rating != null && (
            <span className="flag">
              {rating.toFixed(1)}/5{book.show_star ? " ★" : ""}
            </span>
          )}
          <span className="ml-auto font-bold" style={{ fontSize: 13 }}>
            {open ? "FOLD IT [−]" : "READ IT [+]"}
          </span>
        </div>

        <div className="mt-4 flex items-start gap-5">
          {book.cover_url && (
            <span className="bdr relative hidden h-[120px] w-[82px] shrink-0 overflow-hidden sm:block" style={{ transform: `rotate(${jitter(i, 2)}deg)` }}>
              <Image src={book.cover_url} alt="" fill sizes="82px" className="object-cover" style={{ filter: "contrast(1.08) saturate(1.05)" }} />
            </span>
          )}
          <div className="min-w-0">
            <h3
              className="big uppercase leading-[0.95]"
              style={{ fontSize: "clamp(1.6rem, 4.5vw, 2.6rem)", letterSpacing: "-0.01em" }}
            >
              {book.title}
            </h3>
            <p className="mt-2 font-bold" style={{ fontSize: 14, color: "#3c3a40" }}>
              by {book.author} · {yearLabel(book.year_published)}
              {book.limbus_sinner ? (
                <>
                  {" "}
                  · <span className="mark">{book.limbus_sinner}</span>
                </>
              ) : null}
            </p>
          </div>
        </div>
      </button>

      <div
        className="zine-expand"
        style={{ maxHeight: open ? 4200 : 0, opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <div style={{ padding: "4px 24px 26px" }}>
          <div className="bdr" style={{ borderWidth: "3px 0 0 0", margin: "0 0 18px" }} />
          {book.reviewer_name && (
            <p className="mb-4 font-bold" style={{ fontSize: 14 }}>
              ✂ pasted in by <span className="mark">{book.reviewer_name}</span>
            </p>
          )}
          {book.summary && (
            <div className="mb-6">
              <div className="big mb-2" style={{ fontSize: 13, letterSpacing: "0.14em" }}>
                THE SETUP →
              </div>
              <div className="prose-z" style={{ fontWeight: 500 }}>
                <ReactMarkdown>{book.summary}</ReactMarkdown>
              </div>
            </div>
          )}
          {book.review && (
            <div>
              <div className="big mb-2" style={{ fontSize: 13, letterSpacing: "0.14em" }}>
                THE VERDICT →
              </div>
              <div className="prose-z">
                <ReactMarkdown>{book.review}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

export function ZineDraft({
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
    <div className="d-zine">
      <div className="mx-auto max-w-4xl">
        {/* nav */}
        <nav className="zn-nav flex flex-wrap items-center gap-3">
          <span className="big" style={{ fontSize: 14, color: "#d9ff3d" }}>
            SS/26
          </span>
          <div className="ml-auto flex gap-3">
            <Link href="/">HOME</Link>
            <Link href="/limbus">LIMBUS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </nav>

        {/* hero block */}
        <header
          className="bdr hs-a relative mt-10 overflow-hidden"
          style={{ background: "#6d28d9", padding: "clamp(28px,6vw,60px)" }}
        >
          <div className="halftone absolute right-0 top-0 h-full w-24 opacity-60 sm:w-40" aria-hidden />
          <span className="burst burst-hero -rotate-6" aria-hidden>
            <span>
              EST.
              <br />
              2026★
            </span>
          </span>

          <p className="big relative z-[1] md:pr-32" style={{ fontSize: 14, letterSpacing: "0.2em", color: "#d9ff3d" }}>
            A HOMEMADE BOOK-REVIEW PAPER
          </p>
          <h1 className="big mt-3 uppercase leading-[0.92]" style={{ fontSize: "clamp(2.6rem,9vw,5.4rem)", textShadow: "5px 5px 0 #0b0a0c" }}>
            SUNDAY&rsquo;S
            <br />
            <span className="mark" style={{ textShadow: "none" }}>SHELF</span>{" "}
            <span className="outline-w">VOL.1</span>
          </h1>
          <p className="mt-5 inline-block border-2 border-[#f7f5ef] px-3 py-1 font-bold" style={{ fontSize: 14, letterSpacing: "0.06em" }}>
            {tagline.toUpperCase()} — NO ADS, NO ALGORITHM, JUST {name.split("'")[0].toUpperCase()}
          </p>
        </header>

        {/* intro cutout */}
        <section className="relative mt-14">
          <span className="tape" style={{ top: -13, left: 26, transform: "rotate(-3deg)" }}>
            why this exists
          </span>
          <div className="paper hs-b prose-z" style={{ padding: "26px 26px 14px", transform: "rotate(-0.4deg)" }}>
            <IntroMd text={intro} />
          </div>
        </section>

        {/* limbus wall */}
        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-5">
            <h2 className="big uppercase" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", textShadow: "3px 3px 0 #6d28d9" }}>
              THE LIMBUS <span className="mark">14</span>
            </h2>
            <Link href="/limbus" className="burst ml-auto" style={{ width: 76, height: 76 }}>
              <span>
                GO
                <br />→
              </span>
            </Link>
          </div>
          <div className="scroll-row">
            {limbus.map((b, i) => (
              <Link
                key={b.id}
                href="/limbus"
                className="pola shrink-0 snap-start"
                style={{ width: 148, transform: `rotate(${jitter(i, 2.4)}deg)` }}
              >
                <span className="bdr relative block h-[168px] w-full overflow-hidden" style={{ borderWidth: 2 }}>
                  {b.cover_url ? (
                    <Image src={b.cover_url} alt="" fill sizes="148px" className="object-cover" />
                  ) : (
                    <span className="big flex h-full items-center justify-center p-2 text-center uppercase leading-tight" style={{ fontSize: 12, background: "#241a30", color: "#f7f5ef" }}>
                      {b.title}
                    </span>
                  )}
                </span>
                <span className="mt-2 block truncate text-center font-bold" style={{ fontSize: 12, color: "#0b0a0c" }}>
                  {b.title}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* reviews */}
        <section className="mt-16">
          <h2 className="big mb-8 uppercase" style={{ fontSize: "clamp(1.5rem,4vw,2.1rem)", textShadow: "3px 3px 0 #6d28d9" }}>
            FRESH <span className="mark">REVIEWS</span>
          </h2>
          <div className="flex flex-col gap-10">
            {reviews.map((b, i) => (
              <ZineCard key={b.id} book={b} i={i} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="mt-20 text-center font-bold" style={{ fontSize: 13, color: "rgba(247,245,239,0.55)" }}>
          PHOTOCOPIED AT 2 A.M. · STAPLES INCLUDED · SUNDAY&rsquo;S SHELF
        </footer>
      </div>
    </div>
  );
}

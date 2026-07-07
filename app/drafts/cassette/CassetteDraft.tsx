"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { useState } from "react";
import type { Book } from "@/lib/db";
import { jitter, stampDate, yearLabel } from "../util";
import {
  Expandable,
  IntroMd,
  MiniCassette,
  MusicNote,
  SideRails,
  Sparkle,
  VolumeBars,
} from "../zf/core";

function BigCassette({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="deck relative mx-auto max-w-lg" style={{ padding: "22px 26px" }}>
      <div className="spine-label hand text-center" style={{ fontSize: 30, transform: "rotate(-0.6deg)" }}>
        {label} <span style={{ fontSize: 20 }}>♪</span>
      </div>
      <div className="reels mt-4 rounded-md border-2 border-black/50 bg-black/25 px-8 py-4">
        <svg viewBox="0 0 44 44" width="52" height="52" className="zf-spin-slow" style={{ transformOrigin: "center" }} aria-hidden>
          <circle cx="22" cy="22" r="20" fill="none" stroke="#6fb3a8" strokeWidth="2.5" />
          <circle cx="22" cy="22" r="7" fill="#f5e9d6" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line key={deg} x1="22" y1="4" x2="22" y2="12" stroke="#6fb3a8" strokeWidth="2.5" transform={`rotate(${deg} 22 22)`} />
          ))}
        </svg>
        <div className="hand text-center" style={{ color: "#b9a48f", fontSize: 20 }}>
          side A<br />
          <span style={{ fontSize: 15 }}>{sub}</span>
        </div>
        <svg viewBox="0 0 44 44" width="52" height="52" className="zf-spin-slow" style={{ transformOrigin: "center", animationDirection: "reverse", animationDuration: "11s" }} aria-hidden>
          <circle cx="22" cy="22" r="20" fill="none" stroke="#ff8c42" strokeWidth="2.5" />
          <circle cx="22" cy="22" r="7" fill="#f5e9d6" />
          {[0, 60, 120, 180, 240, 300].map((deg) => (
            <line key={deg} x1="22" y1="4" x2="22" y2="12" stroke="#ff8c42" strokeWidth="2.5" transform={`rotate(${deg} 22 22)`} />
          ))}
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]" style={{ color: "#b9a48f" }}>
        <span>◀◀ rew</span>
        <span className="zf-pulse" style={{ color: "#ff8c42" }}>● rec</span>
        <span>play ▶</span>
        <span>ff ▶▶</span>
      </div>
    </div>
  );
}

function Track({ book, i, defaultOpen = false }: { book: Book; i: number; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const rating = book.rating != null ? Number(book.rating) : null;
  const exceptional = rating != null && rating >= 5.1;
  const logged = stampDate(book.date_read);

  return (
    <article className="deck relative" style={{ transform: `rotate(${jitter(i + 3, 0.4)}deg)` }}>
      {exceptional && (
        <span className="track-chip o zf-pulse absolute -top-3 right-6" style={{ background: "#2f2229" }}>
          ✶ single of the year
        </span>
      )}
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open} className="block w-full cursor-pointer text-left" style={{ padding: "22px 24px 16px" }}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="track-chip o">track {String(i + 1).padStart(2, "0")}</span>
          <span className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em]" style={{ color: "#b9a48f" }}>
            <span className={`led ${book.status === "reading" ? "zf-pulse" : ""}`} style={{ color: book.status === "read" ? "#6fb3a8" : book.status === "reading" ? "#ff8c42" : "#5c4f56", background: "currentColor" }} />
            {book.status === "read" ? "recorded" : book.status === "reading" ? "recording…" : "blank tape"}
          </span>
          {book.reviewer_name && <span className="track-chip">feat. {book.reviewer_name}</span>}
          {rating != null && (
            <span className="ml-auto">
              <VolumeBars rating={rating} animate={open} showStar={book.show_star === true} />
            </span>
          )}
        </div>
        <div className="mt-4 flex items-start gap-5">
          {book.cover_url && (
            <span className="relative hidden h-[118px] w-[82px] shrink-0 overflow-hidden rounded-md border-2 border-black/50 sm:block">
              <Image src={book.cover_url} alt="" fill sizes="82px" className="object-cover" style={{ filter: "sepia(0.22) saturate(1.05)" }} />
            </span>
          )}
          <div className="min-w-0">
            <h3 className="big uppercase leading-[0.96]" style={{ fontSize: "clamp(1.4rem,3.8vw,2.1rem)", color: "#f5e9d6" }}>
              {book.title}
            </h3>
            <p className="hand mt-1.5" style={{ fontSize: 22, color: "#b9a48f" }}>
              {book.author} · {yearLabel(book.year_published)}
              {book.limbus_sinner ? ` · ${book.limbus_sinner}'s song` : ""}
            </p>
          </div>
        </div>
      </button>
      <Expandable open={open}>
        <div style={{ padding: "0 24px 22px" }}>
          <div style={{ borderTop: "2px solid rgba(111,179,168,0.5)", marginBottom: 16 }} />
          {book.summary && (
            <div className="mb-5">
              <div className="track-chip mb-2">a-side · what it&rsquo;s about</div>
              <div className="prose"><ReactMarkdown>{book.summary}</ReactMarkdown></div>
            </div>
          )}
          {book.review && (
            <div>
              <div className="track-chip o mb-2">b-side · what i think</div>
              <div className="prose"><ReactMarkdown>{book.review}</ReactMarkdown></div>
            </div>
          )}
          {logged && (
            <p className="hand mt-1" style={{ fontSize: 20, color: "#b9a48f" }}>
              taped {logged.toLowerCase()} ♪
            </p>
          )}
        </div>
      </Expandable>
    </article>
  );
}

export function CassetteDraft({ name, tagline, intro, limbus, reviews }: { name: string; tagline: string; intro: string; limbus: Book[]; reviews: Book[] }) {
  return (
    <div className="d-tape">
      <SideRails
        left={[
          <MiniCassette key="a" size={64} accent="#ff8c42" />,
          <MusicNote key="b" size={26} color="#6fb3a8" />,
          <span key="c" className="hand" style={{ color: "#b9a48f", fontSize: 21, transform: "rotate(-6deg)", display: "inline-block" }}>rewind kindly!</span>,
          <Sparkle key="d" size={22} color="#ff8c42" />,
          <MiniCassette key="e" size={52} body="#e8d4b8" accent="#6fb3a8" />,
        ]}
        right={[
          <MusicNote key="a" size={30} color="#ff8c42" />,
          <MiniCassette key="b" size={58} body="#d9c2a0" accent="#ff8c42" />,
          <span key="c" className="track-chip">stereo</span>,
          <MusicNote key="d" size={22} color="#f5e9d6" />,
          <Sparkle key="e" size={24} color="#6fb3a8" />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="big text-[12px] tracking-[0.14em]" style={{ color: "#ff8c42" }}>SS-90 · TYPE I</span>
          <div className="flex gap-6">
            <Link href="/">HOME</Link>
            <Link href="/limbus">LIMBUS</Link>
            <Link href="/about">ABOUT</Link>
          </div>
        </nav>

        <header className="mt-12 text-center">
          <p className="big text-[12px] uppercase tracking-[0.24em]" style={{ color: "#6fb3a8" }}>
            a mixtape of books, dubbed with care
          </p>
          <h1 className="big mt-3 uppercase leading-[0.92]" style={{ fontSize: "clamp(2.4rem,8.5vw,4.8rem)", color: "#f5e9d6", textShadow: "4px 4px 0 rgba(255,140,66,0.55)" }}>
            {name}
          </h1>
          <p className="hand mt-2" style={{ fontSize: 26, color: "#b9a48f" }}>{tagline.toLowerCase()} ♪</p>
          <div className="mt-8">
            <BigCassette label={`${name} — vol. 1`} sub="books that stuck" />
          </div>
        </header>

        <section className="deck prose relative mx-auto mt-14 max-w-2xl" style={{ padding: "26px 28px 14px" }}>
          <span className="track-chip absolute -top-3 left-6" style={{ background: "#2f2229" }}>liner notes · intro</span>
          <IntroMd text={intro} />
        </section>

        <section className="mt-16">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="big uppercase" style={{ fontSize: "clamp(1.3rem,3.8vw,1.9rem)", color: "#f5e9d6" }}>
              the limbus box set
            </h2>
            <Link href="/limbus" className="track-chip o ml-auto zf-wiggle">browse all 14 →</Link>
          </div>
          <div className="zf-row">
            {limbus.map((b, i) => {
              const tone = b.limbus_color || "#8a5a3a";
              return (
                <Link key={b.id} href="/limbus" className="spine-tape" style={{ background: `linear-gradient(165deg, color-mix(in oklab, ${tone} 55%, #2a1d24), #241a20 85%)` }}>
                  <div className="spine-label hand truncate" style={{ fontSize: 19 }}>
                    {String(i + 1).padStart(2, "0")}. {b.title}
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <svg viewBox="0 0 20 20" width="20" height="20" className="zf-spin-slower" aria-hidden>
                      <circle cx="10" cy="10" r="8.5" fill="none" stroke="rgba(245,233,214,0.7)" strokeWidth="1.6" strokeDasharray="3 3" />
                    </svg>
                    <span className="text-[10px] uppercase tracking-[0.16em]" style={{ color: "rgba(245,233,214,0.75)" }}>
                      {b.status === "read" ? "recorded" : "blank"}
                    </span>
                    <svg viewBox="0 0 20 20" width="20" height="20" className="zf-spin-slower" style={{ animationDirection: "reverse" }} aria-hidden>
                      <circle cx="10" cy="10" r="8.5" fill="none" stroke="rgba(245,233,214,0.7)" strokeWidth="1.6" strokeDasharray="3 3" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="mt-16">
          <h2 className="big mb-8 uppercase" style={{ fontSize: "clamp(1.3rem,3.8vw,1.9rem)", color: "#f5e9d6" }}>
            track list <span style={{ color: "#ff8c42" }}>·</span> the reviews
          </h2>
          <div className="flex flex-col gap-9">
            {reviews.map((b, i) => (
              <Track key={b.id} book={b} i={i} defaultOpen={i === 0} />
            ))}
          </div>
        </section>

        <footer className="hand mt-20 text-center" style={{ fontSize: 24, color: "#b9a48f" }}>
          dubbed at 2am, side b is yours ♪ — sunday&rsquo;s shelf
        </footer>
      </div>
    </div>
  );
}

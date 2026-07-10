"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import type { Book } from "@/lib/db";
import { jitter, yearLabel } from "../util";
import { GlyphRating, Heart, Pic, Pushpin, SideRails, Star, Washi } from "../zf/core";
import { MiniShot } from "./ScrapFam";
import type { ScrapTheme } from "./ScrapFam";

/* the one limbus nod that survives the picnic: each sinner's canonical
   numeral in a soft hexagon, colored with the book's limbus color */
const SINNER_NUM: Record<string, string> = {
  yisang: "I", faust: "II", donquixote: "III", ryoshu: "IV",
  meursault: "V", honglu: "VI", heathcliff: "VII", ishmael: "VIII",
  rodion: "IX", sinclair: "X", outis: "XI", gregor: "XII",
};

function slug(name?: string | null): string | null {
  if (!name) return null;
  const s = name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
  return s || null;
}

function Hex({ size = 42, color = "var(--a1)", children, style }: { size?: number; color?: string; children?: ReactNode; style?: CSSProperties }) {
  const h = size * 1.15;
  return (
    <span aria-hidden style={{ position: "relative", display: "inline-grid", placeItems: "center", width: size, height: h, ...style }}>
      <svg viewBox="0 0 100 115" width={size} height={h} style={{ position: "absolute", inset: 0 }}>
        <polygon points="50,3 96,30 96,85 50,112 4,85 4,30" fill={`color-mix(in oklab, ${color} 18%, white)`} stroke={color} strokeWidth="6" strokeLinejoin="round" />
      </svg>
      <span style={{ position: "relative", zIndex: 1, lineHeight: 1 }}>{children}</span>
    </span>
  );
}

function TinyClock({ size = 20, color = "var(--ink)" }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} aria-hidden>
      <circle cx="50" cy="50" r="42" fill="none" stroke={color} strokeWidth="9" />
      <line x1="50" y1="50" x2="50" y2="26" stroke={color} strokeWidth="9" strokeLinecap="round" />
      <line x1="50" y1="50" x2="68" y2="58" stroke={color} strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

function Badge({ b }: { b: Book }) {
  const s = slug(b.limbus_sinner);
  const color = b.limbus_color || "#5f93bd";
  const num = s ? SINNER_NUM[s] : null;
  return (
    <span className="flex items-center gap-2">
      <Hex size={40} color={color}>
        {s === "dante" ? (
          <TinyClock size={18} color="color-mix(in oklab, var(--ink) 80%, transparent)" />
        ) : num ? (
          <span className="big" style={{ fontSize: 13, color: "var(--ink)" }}>{num}</span>
        ) : (
          <span style={{ fontSize: 16, color: "var(--ink)" }}>✦</span>
        )}
      </Hex>
      <span className="hand" style={{ fontSize: 20, color: "color-mix(in oklab, var(--ink) 82%, transparent)" }}>
        {b.limbus_sinner ? `${b.limbus_sinner}'s book` : "the mysterious one"}
      </span>
    </span>
  );
}

function statusNote(b: Book): string {
  return b.status === "read" ? "finished! ✓" : b.status === "reading" ? "reading now…" : "someday pile";
}

function BookPage({ b, i }: { b: Book; i: number }) {
  const rating = b.rating != null ? Number(b.rating) : null;
  const mascots = ["duck", "teddy", "rabbit"];
  return (
    <article className={`page relative ${i % 3 === 1 ? "stitched" : ""}`} style={{ padding: "22px 22px 16px", transform: `rotate(${jitter(i + 2, 0.9)}deg)` }}>
      {i % 4 === 0 && <Washi w={72} h={18} color="color-mix(in oklab, var(--a3) 80%, white)" rotate={-6} className="absolute -top-2 left-8" />}
      {i % 4 === 2 && <Washi w={60} h={16} color="color-mix(in oklab, var(--a2) 80%, white)" rotate={5} className="absolute -top-2 right-8" />}
      {i % 5 === 3 && (
        <span className="pointer-events-none absolute -top-7 right-6 z-[2]" aria-hidden>
          <Pic name={mascots[i % 3]} size={44} />
        </span>
      )}
      <div className="flex items-start gap-5">
        <span className="photo relative w-[96px] shrink-0" style={{ transform: `rotate(${jitter(i + 5, 3.2)}deg)`, padding: "6px 6px 16px" }}>
          <span className="absolute -top-2 left-1/2 z-10 -translate-x-1/2">
            <Pushpin size={17} color={["var(--a1)", "var(--a2)", "var(--a3)"][i % 3]} />
          </span>
          <span className="relative block h-[112px] w-full overflow-hidden">
            {b.cover_url ? (
              <Image src={b.cover_url} alt="" fill sizes="96px" className="object-cover" />
            ) : (
              <span className="hand flex h-full w-full items-center justify-center p-2 text-center text-[16px] leading-tight" style={{ background: "color-mix(in oklab, var(--a2) 40%, white)" }}>{b.title}</span>
            )}
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="hand leading-[1.05]" style={{ fontSize: "clamp(1.5rem,2.6vw,1.9rem)", color: "var(--ink)" }}>{b.title}</h3>
          <p className="mt-0.5" style={{ fontSize: 12.5, color: "color-mix(in oklab, var(--ink) 72%, transparent)" }}>
            {b.author} · {yearLabel(b.year_published)}
          </p>
          <div className="mt-2.5"><Badge b={b} /></div>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <span className={`label ${b.status === "read" ? "a2" : b.status === "reading" ? "a3" : ""}`} style={{ fontSize: 10 }}>
              {statusNote(b)}
            </span>
            {rating != null && <GlyphRating rating={rating} glyph="♥" color="var(--a1)" size={15} showStar={b.show_star === true} starColor="#e0a92e" />}
            {b.review && b.review_published !== false && (
              <Link href="/drafts/picnic" className="hand zf-wiggle" style={{ fontSize: 18, color: "var(--a1)" }}>
                reviewed on the shelf →
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function LimbusScrap({ theme, books, tagline }: { theme: ScrapTheme; books: Book[]; tagline: string }) {
  const hung = books.filter((b) => b.cover_url).slice(2, 7);
  const shots = books.filter((b) => b.cover_url).slice(9, 13);
  const read = books.filter((b) => b.status === "read").length;

  return (
    <div className={`d-scrap2 t-${theme}`}>
      <div className="zf-edge zf-edge-left edge-gingham" aria-hidden />
      <div className="zf-edge zf-edge-right edge-gingham" aria-hidden />

      <SideRails
        interactive
        left={[
          <Pic key="m0" name="duck" size={64} />,
          <Washi key="t0" w={84} h={20} color="color-mix(in oklab, var(--a3) 80%, white)" rotate={-7} />,
          <MiniShot key="p0" book={shots[0]} r={-4} />,
          <Pic key="d0" name="butterfly" size={46} />,
          <Heart key="h0" size={26} color="var(--a1)" />,
          <Pic key="m1" name="teddy" size={58} flip />,
          <Pic key="d1" name="rainbow" size={48} />,
          <MiniShot key="p1" book={shots[1]} r={3} pin="var(--a2)" />,
          <Pic key="d2" name="sunflower" size={42} />,
          <Pic key="m2" name="rabbit" size={58} />,
          <Star key="s0" size={30} color="var(--a3)" />,
        ]}
        right={[
          <MiniShot key="p2" book={shots[2]} r={4} pin="var(--a3)" />,
          <Pic key="m0" name="rabbit" size={62} flip />,
          <Pic key="d0" name="balloon" size={46} />,
          <Heart key="h0" size={22} color="var(--a2)" />,
          <Pic key="d1" name="sunface" size={46} />,
          <Pic key="m1" name="duck" size={54} flip />,
          <Pic key="d2" name="basket" size={48} />,
          <MiniShot key="p3" book={shots[3]} r={-3} />,
          <Pic key="m2" name="teddy" size={56} />,
          <Washi key="t1" w={72} h={18} color="color-mix(in oklab, var(--a1) 60%, white)" rotate={6} />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="hand doodle-note" style={{ fontSize: 22, display: "inline-block", transform: "rotate(-2deg)" }}>est. 2026 ✿</span>
          <div className="flex gap-6">
            <Link href="/drafts/picnic">home</Link>
            <Link href="/drafts/picnic-about">about</Link>
            <Link href="/drafts">drafts</Link>
          </div>
        </nav>

        {/* hanging string of covers */}
        <div className="string mt-8 hidden sm:block" aria-hidden>
          <svg className="line" viewBox="0 0 800 110" preserveAspectRatio="none">
            <path d="M0 18 Q 400 64 800 14" fill="none" stroke="color-mix(in oklab, var(--ink) 50%, transparent)" strokeWidth="2" />
          </svg>
          {hung.map((b, i) => (
            <span key={b.id} className="photo hung zf-sway" style={{ left: `${8 + i * 16}%`, width: 62, animationDuration: `${6 + (i % 3)}s`, padding: "4px 4px 12px", transform: `rotate(${jitter(i, 5)}deg)` }}>
              <span className="relative block h-[62px] w-full overflow-hidden">
                <Image src={b.cover_url!} alt="" fill sizes="62px" className="object-cover" />
              </span>
            </span>
          ))}
          <span className="hung zf-sway" style={{ left: "90%", animationDuration: "7s" }}>
            <Pic name="bow" size={38} />
          </span>
        </div>

        <header className="relative mx-auto mt-6 max-w-xl text-center">
          <div className="page stitched relative" style={{ padding: "32px 26px 24px", transform: "rotate(-0.6deg)" }}>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2"><Pushpin size={24} color="var(--a1)" /></span>
            <span className="pointer-events-none absolute -left-5 -top-8" aria-hidden><Pic name="teddy" size={48} /></span>
            <span className="pointer-events-none absolute -right-4 -bottom-4" aria-hidden><Pic name="basket" size={44} /></span>
            <h1 className="flex flex-wrap items-center justify-center gap-2" style={{ fontSize: "clamp(1.6rem,5vw,2.4rem)" }}>
              {["The", "Limbus", "Fourteen"].map((w, i) => (
                <span key={w} className={`label ${i % 2 ? "a1" : ""}`} style={{ transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>{w}</span>
              ))}
            </h1>
            <p className="hand mt-3 text-[22px]" style={{ color: "color-mix(in oklab, var(--ink) 78%, transparent)" }}>
              {tagline.toLowerCase()}
            </p>
            <p className="hand mt-1 text-[19px]" style={{ color: "var(--a1)" }}>
              {read} of {books.length} finished — bring a blanket, stay a while ♡
            </p>
          </div>
        </header>

        <section className="mt-14">
          <div className="mb-8 flex flex-wrap items-center gap-4">
            <h2><span className="label a2" style={{ fontSize: 14 }}>every book, one picnic blanket</span></h2>
            <span className="hand doodle-note" style={{ fontSize: 21, display: "inline-block", transform: "rotate(-2deg)" }}>
              the hexagon = whose book it is!
            </span>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {books.map((b, i) => <BookPage key={b.id} b={b} i={i} />)}
          </div>
        </section>

        <footer className="mt-20 text-center">
          <p className="hand text-[22px]" style={{ color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>
            fourteen stories in the sun ✿ sunday&rsquo;s shelf
          </p>
          <p className="mt-1 text-[11px]" style={{ color: "color-mix(in oklab, var(--ink) 55%, transparent)" }}>
            critters &amp; props by{" "}
            <a href="https://openmoji.org" target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>OpenMoji</a>{" "}
            · CC BY-SA 4.0
          </p>
        </footer>
      </div>
    </div>
  );
}

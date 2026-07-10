"use client";

import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/lib/db";
import { Hex, nameSlug, SINNER_NUM, TinyClock } from "../hexbits";
import { jitter, yearLabel } from "../util";
import { GlyphRating, Pic, SideRails, Sparkle, Star } from "../zf/core";
import { CAST, MiniPeel } from "./StickFam";
import type { StickTheme } from "./StickFam";

export const STICK_ROUTES: Record<StickTheme, { home: string; limbus: string; about: string }> = {
  mix: { home: "/drafts/stickers", limbus: "/drafts/stickers-limbus", about: "/drafts/stickers-about" },
  bunny: { home: "/drafts/bunny", limbus: "/drafts/bunny-limbus", about: "/drafts/bunny-about" },
  pond: { home: "/drafts/pond", limbus: "/drafts/pond-limbus", about: "/drafts/pond-about" },
  honey: { home: "/drafts/honey", limbus: "/drafts/honey-limbus", about: "/drafts/honey-about" },
};

function Badge({ b }: { b: Book }) {
  const s = nameSlug(b.limbus_sinner);
  const color = b.limbus_color || "#a78bfa";
  const num = s ? SINNER_NUM[s] : null;
  return (
    <span className="flex items-center gap-2">
      <span style={{ filter: "drop-shadow(0 0 0 #fff)" }}>
        <Hex size={38} color={color}>
          {s === "dante" ? (
            <TinyClock size={17} color="color-mix(in oklab, var(--ink) 80%, transparent)" />
          ) : num ? (
            <span className="round font-bold" style={{ fontSize: 13, color: "var(--ink)" }}>{num}</span>
          ) : (
            <span style={{ fontSize: 15, color: "var(--ink)" }}>✦</span>
          )}
        </Hex>
      </span>
      <span className="round font-bold" style={{ fontSize: 13, opacity: 0.85 }}>
        {b.limbus_sinner ? `${b.limbus_sinner}'s pick` : "the mystery sticker"}
      </span>
    </span>
  );
}

function StatusChip({ b }: { b: Book }) {
  return (
    <span className={`chip ${b.status === "read" ? "c3" : b.status === "reading" ? "c4" : "c2"}`} style={{ fontSize: 11 }}>
      {b.status === "read" ? "collected ✓" : b.status === "reading" ? "peeling now…" : "still on the sheet"}
    </span>
  );
}

function BookSticker({ b, i, theme }: { b: Book; i: number; theme: StickTheme }) {
  const rating = b.rating != null ? Number(b.rating) : null;
  const cast = CAST[theme];
  return (
    <article className={`stick relative ${["c1", "c2", "c3", "c4"][i % 4]}`} style={{ padding: "22px 22px 16px", transform: `rotate(${jitter(i + 2, 0.9)}deg)` }}>
      {i % 5 === 2 && (
        <span className="pointer-events-none absolute -top-7 right-6 z-[2]" aria-hidden>
          <Pic name={cast.mascots[i % cast.mascots.length]} size={46} />
        </span>
      )}
      <div className="flex items-start gap-5">
        <span className="relative block h-[110px] w-[78px] shrink-0 overflow-hidden rounded-[9px]" style={{ transform: `rotate(${jitter(i + 5, 3)}deg)`, boxShadow: "0 0 0 3.5px #fff, 0 0 0 5px color-mix(in oklab, var(--ink) 28%, transparent), 0 8px 16px -8px color-mix(in oklab, var(--ink) 50%, transparent)" }}>
          {b.cover_url ? (
            <Image src={b.cover_url} alt="" fill sizes="78px" className="object-cover" />
          ) : (
            <span className="round flex h-full w-full items-center justify-center p-2 text-center font-bold" style={{ fontSize: 12, background: "color-mix(in oklab, var(--a2) 40%, white)" }}>{b.title}</span>
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="round font-bold leading-[1.08]" style={{ fontSize: "clamp(1.25rem,2.4vw,1.6rem)" }}>{b.title}</h3>
          <p className="mt-0.5" style={{ fontSize: 12.5, opacity: 0.8 }}>
            {b.author} · {yearLabel(b.year_published)}
          </p>
          <div className="mt-2.5"><Badge b={b} /></div>
          <div className="mt-2 flex flex-wrap items-center gap-2.5">
            <StatusChip b={b} />
            {rating != null && <GlyphRating rating={rating} glyph="✿" color="var(--a1)" size={15} showStar={b.show_star === true} starColor="#e8b23d" />}
            {b.review && b.review_published !== false && (
              <Link href={STICK_ROUTES[theme].home} className="round font-bold zf-wiggle" style={{ fontSize: 13, color: "color-mix(in oklab, var(--a1) 80%, var(--ink))" }}>
                peel my review →
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function LimbusStick({ theme, books, tagline }: { theme: StickTheme; books: Book[]; tagline: string }) {
  const cast = CAST[theme];
  const routes = STICK_ROUTES[theme];
  const shots = books.filter((b) => b.cover_url).slice(9, 13);
  const read = books.filter((b) => b.status === "read").length;

  return (
    <div className={`d-stick2 t-${theme}`}>
      <div className="zf-edge zf-edge-left edge-scallop-left" aria-hidden />
      <div className="zf-edge zf-edge-right edge-scallop-right" aria-hidden />

      <SideRails
        interactive
        left={[
          <Pic key="m0" name={cast.mascots[0]} size={66} />,
          <Star key="s0" size={30} color="var(--a4)" />,
          <MiniPeel key="p0" book={shots[0]} r={-4} />,
          <Pic key="d0" name={cast.doodads[0]} size={46} />,
          <Pic key="m1" name={cast.mascots[1]} size={58} flip />,
          <Pic key="d1" name={cast.doodads[3]} size={44} />,
          <Sparkle key="k0" size={26} color="var(--a1)" />,
          <MiniPeel key="p1" book={shots[1]} r={3} />,
          <Pic key="d2" name={cast.doodads[1]} size={40} />,
          <Pic key="m2" name={cast.mascots[2 % cast.mascots.length]} size={60} />,
        ]}
        right={[
          <MiniPeel key="p2" book={shots[2]} r={4} />,
          <Pic key="m0" name={cast.mascots[2 % cast.mascots.length]} size={64} flip />,
          <Pic key="d0" name={cast.doodads[2]} size={46} />,
          <Star key="s0" size={26} color="var(--a2)" />,
          <Pic key="l0" name={cast.lineup[0]} size={56} />,
          <Pic key="d1" name={cast.doodads[5]} size={44} />,
          <MiniPeel key="p3" book={shots[3]} r={-3} />,
          <Sparkle key="k0" size={28} color="var(--a3)" />,
          <Pic key="m1" name={cast.mascots[1]} size={58} />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="chip c4" style={{ fontSize: 12 }}>est. 2026 ✦</span>
          <div className="flex gap-2">
            <Link href={routes.home}>home</Link>
            <Link href={routes.about}>about</Link>
            <Link href="/drafts">drafts</Link>
          </div>
        </nav>

        <header className="mx-auto mt-12 max-w-xl">
          <div className="stick relative px-7 py-9 text-center sm:px-12" style={{ transform: "rotate(-0.6deg)" }}>
            <span className="pointer-events-none absolute -top-5 -left-3 zf-bob" aria-hidden><Star size={40} color="var(--a4)" /></span>
            <span className="pointer-events-none absolute -right-2 -bottom-4 zf-bob zf-d2" aria-hidden><Sparkle size={30} color="var(--a1)" /></span>
            <span className="chip c1" style={{ fontSize: 12 }}>sticker club field trip</span>
            <h1 className="round mt-3 font-bold leading-[0.98]" style={{ fontSize: "clamp(2.1rem,6vw,3rem)" }}>
              the limbus fourteen
            </h1>
            <p className="mt-2" style={{ fontSize: 14, opacity: 0.8 }}>{tagline.toLowerCase()}</p>
            <p className="round mt-1 font-bold" style={{ fontSize: 14, color: "color-mix(in oklab, var(--a1) 80%, var(--ink))" }}>
              {read}/{books.length} collected — the hexagon says whose book it is!
            </p>
            <div className="mt-5 flex items-end justify-center gap-4" aria-hidden>
              {cast.lineup.map((m, i) => (
                <span key={i} className={`zf-hop zf-d${i % 4}`} style={{ display: "inline-block" }}>
                  <Pic name={m} size={i === 0 || i === 4 ? 42 : 48} />
                </span>
              ))}
            </div>
          </div>
        </header>

        <section className="mt-14">
          <div className="grid gap-9 sm:grid-cols-2">
            {books.map((b, i) => <BookSticker key={b.id} b={b} i={i} theme={theme} />)}
          </div>
        </section>

        <footer className="mt-20 text-center">
          <p className="round font-bold" style={{ fontSize: 16, opacity: 0.7 }}>
            fourteen on the sheet, {cast.word} ✦ sunday&rsquo;s shelf
          </p>
          <p className="mt-1" style={{ fontSize: 11, opacity: 0.55 }}>
            critters by{" "}
            <a href="https://openmoji.org" target="_blank" rel="noreferrer" style={{ textDecoration: "underline", color: "inherit" }}>OpenMoji</a>{" "}
            · CC BY-SA 4.0
          </p>
        </footer>
      </div>
    </div>
  );
}

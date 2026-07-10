"use client";

import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import { RATING_LEVELS, RatingStar } from "@/components/RatingPips";
import { Heart, Pic, Pushpin, SideRails, Star, Washi } from "../zf/core";
import { EXTRAS, lilacRails } from "./ScrapFam";
import { SCRAP_ROUTES } from "./LimbusScrap";
import type { ScrapTheme } from "./ScrapFam";

function RatingLegend() {
  return (
    <div className="mt-6 w-full text-left">
      <div className="label a1" style={{ fontSize: 10 }}>how i rate</div>
      <ul className="mt-3 space-y-2">
        {RATING_LEVELS.map((lvl) => (
          <li key={lvl.label} className="flex items-center gap-3">
            <span className="h-3.5 w-3.5 shrink-0 rounded-full" style={{ background: lvl.gradient ?? lvl.color, boxShadow: lvl.glow }} />
            <span className="hand" style={{ fontSize: 19, color: "var(--ink)" }}>{lvl.label.toLowerCase()}</span>
            <span className="ml-auto" style={{ fontSize: 10.5, color: "color-mix(in oklab, var(--ink) 62%, transparent)" }}>{lvl.range}</span>
          </li>
        ))}
        <li className="flex items-center gap-3 pt-2" style={{ borderTop: "2px dashed color-mix(in oklab, var(--ink) 30%, transparent)" }}>
          <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center"><RatingStar fill={1} size={15} /></span>
          <span className="hand" style={{ fontSize: 19, color: "var(--ink)" }}>and, rarely, beyond</span>
          <span className="ml-auto" style={{ fontSize: 10.5, color: "color-mix(in oklab, var(--ink) 62%, transparent)" }}>5.0+</span>
        </li>
      </ul>
    </div>
  );
}

export function AboutScrap({ theme, text, contributors }: { theme: ScrapTheme; text: string; contributors: string[] }) {
  const ex = EXTRAS[theme];
  const routes = SCRAP_ROUTES[theme];
  const lr = theme === "lilac" ? lilacRails() : null;
  return (
    <div className={`d-scrap2 t-${theme}`}>
      <div className="zf-edge zf-edge-left edge-gingham" aria-hidden />
      <div className="zf-edge zf-edge-right edge-gingham" aria-hidden />

      <SideRails
        left={lr ? lr.left : [
          <Pic key="m0" name={ex.mascots[2]} size={62} />,
          <Washi key="t0" w={80} h={20} color="color-mix(in oklab, var(--a3) 80%, white)" rotate={-7} />,
          <Pic key="d0" name={ex.doodads[3]} size={52} />,
          <Heart key="h0" size={26} color="var(--a1)" />,
          <Pic key="m1" name={ex.mascots[0]} size={56} flip />,
          <Pic key="d1" name={ex.doodads[0]} size={44} />,
          <Pic key="d2" name={ex.doodads[4]} size={46} />,
          <Pic key="m2" name={ex.mascots[1]} size={60} />,
          <Star key="s0" size={28} color="var(--a3)" />,
        ]}
        right={lr ? lr.right : [
          <Pic key="d0" name={ex.doodads[5]} size={52} />,
          <Pic key="m0" name={ex.mascots[1]} size={60} flip />,
          <Heart key="h0" size={22} color="var(--a2)" />,
          <Pic key="d1" name={ex.doodads[1]} size={46} />,
          <Pic key="m1" name={ex.mascots[2]} size={56} flip />,
          <Washi key="t1" w={70} h={18} color="color-mix(in oklab, var(--a1) 60%, white)" rotate={6} />,
          <Pic key="d2" name={ex.doodads[2]} size={50} />,
          <Pic key="m2" name={ex.mascots[0]} size={54} />,
        ]}
      />

      <div className="mx-auto max-w-4xl">
        <nav className="nav flex items-center justify-between">
          <span className="hand doodle-note" style={{ fontSize: 22, display: "inline-block", transform: "rotate(-2deg)" }}>est. 2026 ✿</span>
          <div className="flex gap-6">
            <Link href={routes.home}>home</Link>
            <Link href={routes.limbus}>limbus</Link>
            <Link href="/drafts">drafts</Link>
          </div>
        </nav>

        <header className="mt-10">
          <h1 className="flex flex-wrap items-center gap-2" style={{ fontSize: "clamp(1.6rem,5vw,2.3rem)" }}>
            <span className="label a1" style={{ transform: "rotate(-1.5deg)" }}>About</span>
            <span className="label" style={{ transform: "rotate(1.2deg)" }}>Me</span>
          </h1>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
          {/* profile card */}
          <aside className="page stitched relative self-start p-6 text-center" style={{ transform: "rotate(-0.8deg)" }}>
            <span className="absolute -top-2 left-1/2 -translate-x-1/2"><Pushpin size={22} color="var(--a1)" /></span>
            <span className="pointer-events-none absolute -right-4 -top-7" aria-hidden><Pic name={ex.mascots[2]} size={46} /></span>
            <div className="flex justify-center">
              <span className="photo relative inline-block" style={{ width: 132, padding: "7px 7px 22px", transform: "rotate(2.5deg)" }}>
                <span className="relative block h-[128px] w-full overflow-hidden">
                  <Image src="/kyle.jpg" alt="Kyle" fill sizes="132px" className="object-cover" />
                </span>
                <span className="hand absolute bottom-0 left-0 right-0 text-center text-[15px]">me!</span>
              </span>
            </div>
            <h2 className="hand mt-4" style={{ fontSize: 38, color: "var(--ink)" }}>Kyle</h2>
            <div className="mt-1"><span className="label a3" style={{ fontSize: 10 }}>fiction aficionado</span></div>
            <dl className="mt-5 space-y-3 text-left">
              <div>
                <dt className="label" style={{ fontSize: 9 }}>currently reading</dt>
                <dd className="hand mt-1" style={{ fontSize: 20 }}>1950s and beyond</dd>
              </div>
              <div>
                <dt className="label" style={{ fontSize: 9 }}>started reviewing</dt>
                <dd className="hand mt-1" style={{ fontSize: 20 }}>may 2026</dd>
              </div>
            </dl>
            <RatingLegend />
          </aside>

          {/* the letter */}
          <div>
            {contributors.length > 0 && (
              <div className="mb-8">
                <span className="label a2" style={{ fontSize: 11 }}>contributors</span>
                <div className="mt-3 flex flex-wrap gap-2.5">
                  {contributors.map((name, i) => (
                    <span key={name} className={`label ${["a1", "a3", ""][i % 3]}`} style={{ fontSize: 12, transform: `rotate(${i % 2 ? 1.5 : -1.5}deg)` }}>
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <section className="page lined prose relative" style={{ padding: "28px 32px 18px", transform: "rotate(0.4deg)", lineHeight: "27px" }}>
              <Washi w={110} h={24} color="color-mix(in oklab, var(--a1) 60%, white)" rotate={-4} className="absolute -top-3 left-10" />
              <span className="pointer-events-none absolute -top-7 right-8" aria-hidden><Pic name={ex.mascots[0]} size={46} /></span>
              <ReactMarkdown
                components={{
                  h2: ({ children }) => (
                    <h2 className="hand" style={{ fontSize: 30, color: "var(--a1)", margin: "0.9em 0 0.35em" }}>{children}</h2>
                  ),
                }}
              >
                {text}
              </ReactMarkdown>
            </section>
          </div>
        </div>

        <footer className="mt-20 text-center">
          <p className="hand text-[22px]" style={{ color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>
            {ex.word} ✿ sunday&rsquo;s shelf
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

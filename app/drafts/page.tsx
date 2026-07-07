import Link from "next/link";

const DRAFTS = [
  {
    href: "/drafts/catalog",
    n: "I",
    name: "The Card Catalog",
    pitch:
      "A midnight library's card drawer: cream index cards, typewriter slips, red rubber stamps, hole punches, a date-due grid.",
    keeps: "the dark purple room",
    changes: "gradients & glass → paper, ink, and stamps",
    palette: ["#f5eedb", "#c1301c", "#191022", "#b98b4e"],
  },
  {
    href: "/drafts/atlas",
    n: "II",
    name: "The Celestial Atlas",
    pitch:
      "A vintage star chart of your reading sky: gold hairlines, a plotted Limbus constellation, observation-log review plates.",
    keeps: "the cosmos identity",
    changes: "glow & blur → engraved instrument precision",
    palette: ["#05060f", "#d8c08a", "#f4efe2", "#30365c"],
  },
  {
    href: "/drafts/zine",
    n: "III",
    name: "The Zine",
    pitch:
      "Photocopier punk: hard offset shadows, stickers and tape, acid highlights, huge grotesque type. Loud and unmistakably human.",
    keeps: "the violet heart",
    changes: "elegance → energy; soft glow → hard edges",
    palette: ["#6d28d9", "#d9ff3d", "#f7f5ef", "#0b0a0c"],
  },
  {
    href: "/drafts/manor",
    n: "IV",
    name: "Ex Libris",
    pitch:
      "A private library bookplate: candlelight, gold tooling, a shelf of leather spines, wax seals, antique Fell type.",
    keeps: "the bookish romance",
    changes: "neon violet → aubergine, brass & candle-warmth",
    palette: ["#171019", "#c9a45c", "#8c2f26", "#2a1a2e"],
  },
];

// Round two: Kyle picked the Zine — these are riffs around it.
const FAMILY = [
  {
    href: "/drafts/zine",
    n: "z·0",
    name: "The Zine (original)",
    pitch:
      "The one that won round one — violet block, acid highlighter, hard shadows. Baseline for the riffs below.",
    keeps: "everything",
    changes: "nothing — the reference point",
    palette: ["#6d28d9", "#d9ff3d", "#f7f5ef", "#0b0a0c"],
  },
  {
    href: "/drafts/riso",
    n: "z·1",
    name: "Riso Poster",
    pitch:
      "The light-mode zine: two-ink risograph on warm paper. Violet + tangerine overprint headlines, halftone suns, duotone covers, hand-stamped margins.",
    keeps: "the loud type & hard shadows",
    changes: "dark → warm paper; acid → tangerine",
    palette: ["#f4efe4", "#6d28d9", "#ff6b35", "#241d16"],
  },
  {
    href: "/drafts/scrapbook",
    n: "z·2",
    name: "Scrapbook",
    pitch:
      "The homiest one. Kraft paper, washi tape, pushpinned polaroids, a swaying photo string, label-maker titles, handwritten margin notes ('cried here →').",
    keeps: "the collage spirit",
    changes: "punk → cozy; print-shop → craft box",
    palette: ["#d9c7ae", "#e8a0a8", "#9db8a0", "#4a3550"],
  },
  {
    href: "/drafts/arcade",
    n: "z·3",
    name: "Night Arcade",
    pitch:
      "The zine after dark: neon magenta & cyan, pixel hearts, a ticker that never stops, CRT scanlines, HI-SCORE badges. Most ambient animation of the set.",
    keeps: "the dark + loud energy",
    changes: "paper → phosphor; stickers → neon signs",
    palette: ["#0b0d1f", "#ff2d95", "#2de2ff", "#ffe86b"],
  },
  {
    href: "/drafts/stickers",
    n: "z·4",
    name: "Sticker Club",
    pitch:
      "Puffy pastel stickers on lavender graph paper. Everything peels; a small blob mascot blinks at you. The cutest possible reading of the zine.",
    keeps: "sticker culture",
    changes: "acid contrast → pastel softness",
    palette: ["#f3eefc", "#f9a8d4", "#a7f3d0", "#3b3350"],
  },
  {
    href: "/drafts/tabloid",
    n: "z·5",
    name: "Midnight Tabloid",
    pitch:
      "A punk front page: newsprint charcoal, double rules, halftone photos, an EXTRA!! ticker — and the margins are filled with fake classifieds about your reading life.",
    keeps: "the print-object fantasy",
    changes: "poster → newspaper; margins become content",
    palette: ["#17161a", "#efe9dc", "#d92b2b", "#8a8578"],
  },
  {
    href: "/drafts/cassette",
    n: "z·6",
    name: "Mixtape",
    pitch:
      "Books as a hand-dubbed tape (fitting, since this whole site started with a soundtrack). Spinning reels, handwritten labels, liner-note reviews, equalizer ratings.",
    keeps: "the handmade warmth",
    changes: "paper → plastic & chrome; ties into the Mili origin",
    palette: ["#241a20", "#ff8c42", "#6fb3a8", "#f5e9d6"],
  },
];

export const metadata = { title: "Style drafts · Sunday's Shelf" };

export default function DraftsIndex() {
  return (
    <div className="min-h-screen bg-[#0b0812] px-6 py-20 text-[#efeaf6]">
      <div className="mx-auto max-w-3xl">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
          Style drafts · unlisted
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-[0.02em] sm:text-5xl">
          Four ways Sunday&rsquo;s Shelf could feel
        </h1>
        <p className="mt-4 max-w-xl font-serif text-lg text-white/70">
          Same live content, four personalities. Click through — books,
          reviews, and ratings are pulled from the real database. Pick one, or
          point at the pieces you like and we&rsquo;ll cross-breed.
        </p>

        <h2 className="mt-12 font-mono text-[11px] uppercase tracking-[0.35em] text-[#d9ff3d]/70">
          Round two — the zine family
        </h2>
        <p className="mt-2 max-w-xl font-serif text-white/60">
          The Zine won round one. Seven takes on it: different palettes,
          populated margins, ambient motion, varying doses of cute.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {FAMILY.map((d) => (
            <DraftTile key={d.href} d={d} accent="#d9ff3d" />
          ))}
        </div>

        <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
          Round one — the four originals
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {DRAFTS.map((d) => (
            <DraftTile key={d.href} d={d} />
          ))}
        </div>

        <p className="mt-10 font-mono text-[11px] text-white/35">
          These pages are noindex and not linked from the site — safe to leave
          up while deciding.
        </p>
      </div>
    </div>
  );
}

function DraftTile({
  d,
  accent = "#ffffff",
}: {
  d: {
    href: string;
    n: string;
    name: string;
    pitch: string;
    keeps: string;
    changes: string;
    palette: string[];
  };
  accent?: string;
}) {
  return (
    <Link
      href={d.href}
      className="group rounded-lg border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.05]"
    >
      <div className="flex items-baseline gap-4">
        <span className="font-mono text-sm" style={{ color: `${accent}59` }}>
          {d.n}
        </span>
        <h3 className="font-display text-2xl tracking-[0.02em] sm:text-3xl">
          {d.name}
        </h3>
        <span className="ml-auto flex gap-1.5">
          {d.palette.map((c) => (
            <span
              key={c}
              className="h-4 w-4 rounded-full border border-white/20"
              style={{ background: c }}
            />
          ))}
        </span>
      </div>
      <p className="mt-3 max-w-2xl font-serif text-[1.05rem] leading-relaxed text-white/75">
        {d.pitch}
      </p>
      <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
        keeps {d.keeps} · {d.changes}
        <span className="ml-3 inline-block text-white/60 transition group-hover:translate-x-1 group-hover:text-white">
          visit →
        </span>
      </p>
    </Link>
  );
}

import Link from "next/link";

type Tile = {
  href: string;
  n: string;
  name: string;
  pitch: string;
  keeps: string;
  changes: string;
  palette: string[];
};

// Round three: Kyle's favorites (scrapbook, sticker club, tabloid), each
// grown into a small family. Sidebars are now real widget columns; cards
// rotate through different silhouettes; cuteness turned up.
const SCRAP_FAM: Tile[] = [
  {
    href: "/drafts/scrapbook",
    n: "s·1",
    name: "Scrapbook · Kraft",
    pitch:
      "The original craft box, rebuilt. Side rails are now pinned widgets — the nightstand book, shelf stats, a photobooth strip, a review-day calendar — plus mascots peeking over cards. Reviews rotate through three shapes: taped page, pinned polaroid, and a mailed letter with a postmark.",
    keeps: "the warm kraft paper",
    changes: "side doodles → a real pinboard; one card → three",
    palette: ["#dcc9ae", "#e8737f", "#7fa886", "#4a3550"],
  },
  {
    href: "/drafts/strawberry",
    n: "s·2",
    name: "Strawberry Milk",
    pitch:
      "The same album dipped in strawberry milk: blush pages, berry-jam accents, bunnies with pink cheeks. The pastel take for maximum soft.",
    keeps: "every scrapbook trick",
    changes: "kraft brown → strawberry pink",
    palette: ["#fbe4ea", "#e05c74", "#8fbf98", "#58324a"],
  },
  {
    href: "/drafts/picnic",
    n: "s·3",
    name: "Picnic Day",
    pitch:
      "A checkered-blanket afternoon: sky blue into meadow green, gingham ribbons down the edges, ducks and butterflies in the margins.",
    keeps: "the cozy clutter",
    changes: "indoors → outdoors; brown → blue-green pastels",
    palette: ["#d9edf6", "#5f93bd", "#e8848f", "#33465a"],
  },
  {
    href: "/drafts/lavender",
    n: "s·4",
    name: "Pressed Lavender",
    pitch:
      "The quietest of the four: lilac paper, pressed sprigs, violet ink. Same cute bones, gentler volume.",
    keeps: "the handwritten soul",
    changes: "sugar → floral; loudest cute → calmest cute",
    palette: ["#ece3f8", "#8d6fd1", "#e8849b", "#46375e"],
  },
];

const STICK_FAM: Tile[] = [
  {
    href: "/drafts/stickers",
    n: "c·1",
    name: "Sticker Club · Mix",
    pitch:
      "The club, upgraded: a whole cast of blinking, hopping critters (blob, bunny, frog, bear, duck), a sticker-album widget that fills as you read, and cards that are puffy stickers, die-cut sheets with peel corners, or speech bubbles from a mascot.",
    keeps: "puffy white-ring stickers",
    changes: "one blob → a cast; empty rails → the club noticeboard",
    palette: ["#f3eefc", "#a78bfa", "#f9a8d4", "#3b3350"],
  },
  {
    href: "/drafts/bunny",
    n: "c·2",
    name: "Bunny Mail",
    pitch:
      "Pen-pal edition: pink graph paper, bunnies, carrots, stamps and envelopes. Every review reads like a letter from a very soft correspondent.",
    keeps: "the sticker-sheet cards",
    changes: "mixed cast → all bunny post office",
    palette: ["#fdf1f4", "#f472b6", "#a7f3d0", "#58324a"],
  },
  {
    href: "/drafts/pond",
    n: "c·3",
    name: "Frog Pond",
    pitch:
      "Reading by the water: mint paper, lilypads, a frog who reviews books and a duck who mostly supervises.",
    keeps: "the hop animation, obviously",
    changes: "pastel purple → pond green & sky blue",
    palette: ["#e9f6ef", "#3f9e7f", "#8ec9ea", "#2f4858"],
  },
  {
    href: "/drafts/honey",
    n: "c·4",
    name: "Honey Jar",
    pitch:
      "Warm amber club: bears, bees, honey pots, golden graph paper. The snuggest palette of the family.",
    keeps: "the collection album",
    changes: "cool pastels → toast & honey",
    palette: ["#fdf5e0", "#dd9a2f", "#e0876d", "#5a4632"],
  },
];

const PRESS_FAM: Tile[] = [
  {
    href: "/drafts/tabloid",
    n: "p·1",
    name: "The Evening Edition",
    pitch:
      "The midnight tabloid, re-anchored on the books: a real front page with a lead review, a ticker of actual headlines, margins that are an issue index (clickable), pull quotes from real reviews, a box score — and exactly one classified gag left in.",
    keeps: "newsprint & double rules",
    changes: "charcoal → brighter; gags → mostly real content",
    palette: ["#201f26", "#f2ecdd", "#e04545", "#e8b93d"],
  },
  {
    href: "/drafts/gazette",
    n: "p·2",
    name: "The Sunday Gazette",
    pitch:
      "The daylight broadsheet: ivory paper, a serif masthead, sepia photographs, navy and cardinal ink. The most grown-up of the three — still a newspaper, clearly about books.",
    keeps: "the editorial furniture",
    changes: "night → morning; halftone → sepia",
    palette: ["#f5f0e4", "#c1272d", "#274168", "#26221c"],
  },
  {
    href: "/drafts/digest",
    n: "p·3",
    name: "The Reader's Digestif",
    pitch:
      "A warm mid-century review digest: oat paper, plum ink, coral and mustard accents. Softer than the gazette, cozier than the tabloid.",
    keeps: "the verdict boxes",
    changes: "hard news → after-dinner reading",
    palette: ["#ece2ce", "#d95f4b", "#c99a2e", "#46313e"],
  },
];

// Round two: riffs on the winning Zine that didn't graduate to a family.
const ROUND2: Tile[] = [
  {
    href: "/drafts/zine",
    n: "z·0",
    name: "The Zine (original)",
    pitch:
      "The round-one winner — violet block, acid highlighter, hard shadows. Baseline everything else riffs on.",
    keeps: "everything",
    changes: "nothing — the reference point",
    palette: ["#6d28d9", "#d9ff3d", "#f7f5ef", "#0b0a0c"],
  },
  {
    href: "/drafts/riso",
    n: "z·1",
    name: "Riso Poster",
    pitch:
      "Two-ink risograph on warm paper: violet + tangerine overprint headlines, halftone suns, duotone covers.",
    keeps: "the loud type & hard shadows",
    changes: "dark → warm paper; acid → tangerine",
    palette: ["#f4efe4", "#6d28d9", "#ff6b35", "#241d16"],
  },
  {
    href: "/drafts/arcade",
    n: "z·2",
    name: "Night Arcade",
    pitch:
      "Neon magenta & cyan, pixel hearts, CRT scanlines, HI-SCORE badges. Most ambient animation of the set.",
    keeps: "the dark + loud energy",
    changes: "paper → phosphor",
    palette: ["#0b0d1f", "#ff2d95", "#2de2ff", "#ffe86b"],
  },
  {
    href: "/drafts/cassette",
    n: "z·3",
    name: "Mixtape",
    pitch:
      "Books as a hand-dubbed tape: spinning reels, liner-note reviews, equalizer ratings. Ties into the Mili origin story.",
    keeps: "the handmade warmth",
    changes: "paper → plastic & chrome",
    palette: ["#241a20", "#ff8c42", "#6fb3a8", "#f5e9d6"],
  },
];

const ROUND1: Tile[] = [
  {
    href: "/drafts/catalog",
    n: "I",
    name: "The Card Catalog",
    pitch:
      "A midnight library's card drawer: cream index cards, typewriter slips, red rubber stamps, a date-due grid.",
    keeps: "the dark purple room",
    changes: "gradients & glass → paper, ink, and stamps",
    palette: ["#f5eedb", "#c1301c", "#191022", "#b98b4e"],
  },
  {
    href: "/drafts/atlas",
    n: "II",
    name: "The Celestial Atlas",
    pitch:
      "A vintage star chart of your reading sky: gold hairlines, a plotted Limbus constellation, observation-log plates.",
    keeps: "the cosmos identity",
    changes: "glow & blur → engraved precision",
    palette: ["#05060f", "#d8c08a", "#f4efe2", "#30365c"],
  },
  {
    href: "/drafts/zine",
    n: "III",
    name: "The Zine",
    pitch:
      "Photocopier punk: hard offset shadows, stickers and tape, acid highlights, huge grotesque type.",
    keeps: "the violet heart",
    changes: "elegance → energy",
    palette: ["#6d28d9", "#d9ff3d", "#f7f5ef", "#0b0a0c"],
  },
  {
    href: "/drafts/manor",
    n: "IV",
    name: "Ex Libris",
    pitch:
      "A private library bookplate: candlelight, gold tooling, leather spines, wax seals, antique Fell type.",
    keeps: "the bookish romance",
    changes: "neon violet → aubergine & brass",
    palette: ["#171019", "#c9a45c", "#8c2f26", "#2a1a2e"],
  },
];

// Round four: the /limbus and /about pages in the Picnic Day style, so
// the whole site reads as one place. Home is /drafts/picnic below.
const PICNIC_SITE: Tile[] = [
  {
    href: "/drafts/picnic-limbus",
    n: "p·L",
    name: "Picnic Day · Limbus",
    pitch:
      "The fourteen on the picnic blanket: pinned polaroid covers, hand-written titles, washi and critters — and each book wears a small pastel hexagon with its sinner's canonical numeral (Dante gets a tiny clock, the Golden Bough a star). Status notes, heart ratings, and links back to reviews.",
    keeps: "the full limbus history & sinner colors",
    changes: "ominous → sunny; sprites → soft hexagons",
    palette: ["#d9edf6", "#5f93bd", "#e8848f", "#33465a"],
  },
  {
    href: "/drafts/picnic-about",
    n: "p·A",
    name: "Picnic Day · About",
    pitch:
      "The profile as a pinned polaroid, contributors as name-tag labels, the rating scale hand-written with its real colors, and the bio on lined letter paper — same critters in the margins as home.",
    keeps: "everything the real /about says",
    changes: "cosmic violet → picnic pastels",
    palette: ["#d9edf6", "#5f93bd", "#ecc25c", "#fdfcf3"],
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
          Round four: the picnic site
        </h1>
        <p className="mt-4 max-w-xl font-serif text-lg text-white/70">
          Picnic Day, extended to the whole site: home, limbus, and about in
          one matching style, cross-linked in each page&rsquo;s nav (or via
          the picnic·site tab in the switcher). The limbus page keeps its
          full fourteen-book history with a soft hexagon numeral as the only
          nod to the game.
        </p>

        <FamilyHeading accent="#5f93bd">
          Picnic Day, three pages — home is s·3 below
        </FamilyHeading>
        <div className="mt-6 flex flex-col gap-4">
          {PICNIC_SITE.map((d) => (
            <DraftTile key={d.href} d={d} accent="#5f93bd" />
          ))}
        </div>

        <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
          Round three: three families
        </h2>
        <p className="mt-2 max-w-xl font-serif text-white/60">
          Scrapbook, Sticker Club and the Tabloid each grew into a family —
          widget margins, rotating card shapes, more cute. Picnic Day is the
          current front-runner.
        </p>

        <FamilyHeading accent="#e8a0a8">
          The scrapbook four — cutest, craftiest
        </FamilyHeading>
        <p className="mt-2 max-w-xl font-serif text-white/60">
          One craft box, four palettes: kraft brown (the original mood), then
          three pastels — strawberry, picnic, lavender.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {SCRAP_FAM.map((d) => (
            <DraftTile key={d.href} d={d} accent="#e8a0a8" />
          ))}
        </div>

        <FamilyHeading accent="#a78bfa">
          The sticker club four — properly cute sprites
        </FamilyHeading>
        <p className="mt-2 max-w-xl font-serif text-white/60">
          A full cast of soft creatures that blink and hop, plus a sticker
          album that fills up as books get read.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {STICK_FAM.map((d) => (
            <DraftTile key={d.href} d={d} accent="#a78bfa" />
          ))}
        </div>

        <FamilyHeading accent="#e04545">
          The press three — cool, but about the books
        </FamilyHeading>
        <p className="mt-2 max-w-xl font-serif text-white/60">
          The tabloid's swagger, re-aimed at the reviews. Brighter, and the
          margins are real editorial furniture now — issue index, pull
          quotes, box score.
        </p>
        <div className="mt-6 flex flex-col gap-4">
          {PRESS_FAM.map((d) => (
            <DraftTile key={d.href} d={d} accent="#e04545" />
          ))}
        </div>

        <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.35em] text-[#d9ff3d]/70">
          Round two — the zine riffs
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {ROUND2.map((d) => (
            <DraftTile key={d.href} d={d} accent="#d9ff3d" />
          ))}
        </div>

        <h2 className="mt-16 font-mono text-[11px] uppercase tracking-[0.35em] text-white/40">
          Round one — the four originals
        </h2>
        <div className="mt-6 flex flex-col gap-4">
          {ROUND1.map((d) => (
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

function FamilyHeading({ accent, children }: { accent: string; children: React.ReactNode }) {
  return (
    <h2 className="mt-14 font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: `${accent}b3` }}>
      {children}
    </h2>
  );
}

function DraftTile({
  d,
  accent = "#ffffff",
}: {
  d: Tile;
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

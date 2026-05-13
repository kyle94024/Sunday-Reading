import { config } from "dotenv";
config({ path: ".env.local" });
import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!);

const INTRO = `Near the start of the 2025 school year, Mili's [*Library of Ruina*](#lor) soundtrack sparked a reflection upon my abundance (or rather a lack thereof) of literary exploration. I found that, as school progressed, the pressures of time's finitude drew me unarguably towards work; regardless of whether that zugzwang manifested as tangible progress, or as wasted time on social media. Still, the soundtrack resonated with my sentiments in unexplainable ways.

Thereby, it was inevitable that I soon discovered *Limbus Company*, a game for which Mili had composed soundtracks, each attuned to a canonical literary "sinner" from classical works of fiction. Although I never courted the game, I quickly fell in love with their most-listened song, [*Through Patches of Violet*](#tpov), which is based on Emily Brontë's *Wuthering Heights*. The game itself features archaic characters, such as Charon, Mephistopheles, and Dante (as a shortlist from many more) — famous figures from Greek, Faustian, and medieval mythologies of hell. But the range of literary characters span millennia, including modern works such as *The Stranger* by Albert Camus and *Moby Dick* by Herman Melville.

I adopted a vow to pierce into the world of iconic literary fiction, using Limbus' [reference list of 14 books](https://www.goodreads.com/list/show/180411.Limbus_Company) as a point of departure. After reading *Hell Screen*, *The Stranger*, and *Crime and Punishment*, this effort bloomed into a larger interest in the literary world.`;

const ABOUT = `## About Me

Hello! I'm Kyle, a student learning to learn. I read fiction. Not because non-fiction is boring. In fact, quite the opposite: reality is profoundly interesting. And yet, I consider myself a reader of fiction. Writers write with the intent to portray a certain story. What's more often missed are the assumptions that unintentionally seep into the work, revealing fascinating angles of society that the author takes for granted. For instance, Camus' essays on "the meaning of life" occur shortly after the world relapsed into war for a second time, likely contributing to his absurdist outlook. Either way, fiction is just as thought-provoking, if not more so, than non-fiction.

My recommendations are made solely in hopes that someone will, in the near or far future, recognize the name of one of these excellent titles for the second time. I am certainly an imperfect reader. I almost never buy a book I have never heard of before. Only through gradual exposure from others does the breadth of what I am willing to read expand.

## Labor of Love

While some reviews or recommendations will look long and hefty, I promise that length is used efficiently on strong thoughts or the personal impact created by that work. While this may not always hold, a reasonable proxy is review length. Because ultimately, the better the book, the more of an impression it will make! Hence, the longer, the better!

I might also invite guests to write reviews for Sunday's Shelf. Who knows! Please respect everyone's privacy and opinions.`;

type Seed = {
  slug: string;
  title: string;
  author: string;
  year: number | null;
  status: "queued" | "reading" | "read";
  collection: string | null;
  sinner: string | null;
  color: string | null;
  order: number;
  cover: string | null;
  rating?: number | null;
  summary?: string | null;
  review?: string | null;
  published?: boolean;
};

const BRAVE_NEW_WORLD_REVIEW = `I first picked up *Brave New World* because a friend promised she'd read the book — which had been on both of our lists for a while — alongside me. Funnily enough, despite months of persistent effort, she… didn't end up finishing (cough, Nina).

This little anecdote is not to say that the book was bad by any means. On quite the contrary, *Brave New World* effortlessly cements itself as one of my **favorite** dystopian novels of all time. However, this movement reflects the novel's initial reception, in some arbitrary sense. In the 1930s, Huxley's novel had evoked strong emotions on both ends for his readers. On one hand, many now-famous literary authors recognized Huxley's brilliance, such as George Orwell, who used *Brave New World* as direct inspiration for his quintessentially-western novels *1984* and *Animal Farm*. On the other hand, this novel was both criticized and banned for its obscenity and rejection of 1900s social norms.

Should you read *Brave New World*? A resounding yes from my end. It's the perfect mix of world building and surprising plot, perfectly devoid of clichés. If you can handle the sexual content, I think the story will leave you shocked and in deep thought. Although it's not horror, it's an iconic piece of dystopian literature that isn't afraid to explore the darkest parts of human nature.`;

const BRAVE_NEW_WORLD_SUMMARY = `Set in a dystopian, futuristic London, humans are split into social classes and raised in factories, with impulses controlled through the use of conditioning, drugs, and sexual pleasure. Relationships are no longer monogamies — everyone has sex with everyone else, and marriage is forbidden and uncivilized. Although, barring the human "savages" that live in unurbanized areas, everyone is "happy" as they have been conditioned to be. What happens when one of those "savages" — a human with a culture not so different from our society — is brought to this supposed utopia?`;

// Books outside the Limbus collection.
// Each `published?: false` book starts out as a hidden draft — the
// public site shows the placeholder until the admin checks "Publish
// review" on it.
const wider: Seed[] = [
  {
    slug: "brave-new-world",
    title: "Brave New World",
    author: "Aldous Huxley",
    year: 1932,
    status: "read",
    collection: null,
    sinner: null,
    color: "#14b8a6",
    order: 1,
    cover: null,
    rating: 5,
    summary: BRAVE_NEW_WORLD_SUMMARY,
    review: BRAVE_NEW_WORLD_REVIEW,
  },
  // ── Queued / hidden drafts: every book the admin wants on the shelf
  // but hasn't published a review for yet. Authors and dates filled in
  // here so the listing reads complete from day one.
  { slug: "we", title: "We", author: "Yevgeny Zamyatin", year: 1924, status: "queued", collection: null, sinner: null, color: "#6366f1", order: 2, cover: null, published: false },
  { slug: "the-myth-of-sisyphus", title: "The Myth of Sisyphus", author: "Albert Camus", year: 1942, status: "queued", collection: null, sinner: null, color: "#f97316", order: 3, cover: null, published: false },
  { slug: "the-trial", title: "The Trial", author: "Franz Kafka", year: 1925, status: "queued", collection: null, sinner: null, color: "#71717a", order: 4, cover: null, published: false },
  { slug: "dantes-inferno", title: "Dante's Inferno", author: "Dante Alighieri", year: 1320, status: "queued", collection: null, sinner: null, color: "#b91c1c", order: 5, cover: null, published: false },
  { slug: "stories-of-your-life-and-others", title: "Stories of Your Life and Others", author: "Ted Chiang", year: 2002, status: "queued", collection: null, sinner: null, color: "#06b6d4", order: 6, cover: null, published: false },
  { slug: "exhalation", title: "Exhalation", author: "Ted Chiang", year: 2019, status: "queued", collection: null, sinner: null, color: "#0891b2", order: 7, cover: null, published: false },
  { slug: "recursion", title: "Recursion", author: "Blake Crouch", year: 2019, status: "queued", collection: null, sinner: null, color: "#8b5cf6", order: 8, cover: null, published: false },
  { slug: "the-great-gatsby", title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: 1925, status: "queued", collection: null, sinner: null, color: "#facc15", order: 9, cover: null, published: false },
  { slug: "the-girl-on-the-shore", title: "The Girl on the Shore", author: "Haruto Ryo", year: null, status: "queued", collection: null, sinner: null, color: "#3b82f6", order: 10, cover: null, published: false },
  { slug: "a-short-stay-in-hell", title: "A Short Stay in Hell", author: "Steven L. Peck", year: 2012, status: "queued", collection: null, sinner: null, color: "#ea580c", order: 11, cover: null, published: false },
  { slug: "the-vegetarian", title: "The Vegetarian", author: "Han Kang", year: 2007, status: "queued", collection: null, sinner: null, color: "#16a34a", order: 12, cover: null, published: false },
  { slug: "1984", title: "1984", author: "George Orwell", year: 1949, status: "queued", collection: null, sinner: null, color: "#525252", order: 13, cover: null, published: false },
  { slug: "animal-farm", title: "Animal Farm", author: "George Orwell", year: 1945, status: "queued", collection: null, sinner: null, color: "#84cc16", order: 14, cover: null, published: false },
  { slug: "play-it-as-it-lays", title: "Play It as It Lays", author: "Joan Didion", year: 1970, status: "queued", collection: null, sinner: null, color: "#fb7185", order: 15, cover: null, published: false },
  { slug: "slaughterhouse-five", title: "Slaughterhouse-Five", author: "Kurt Vonnegut", year: 1969, status: "queued", collection: null, sinner: null, color: "#94a3b8", order: 16, cover: null, published: false },
  { slug: "cats-cradle", title: "Cat's Cradle", author: "Kurt Vonnegut", year: 1963, status: "queued", collection: null, sinner: null, color: "#f59e0b", order: 17, cover: null, published: false },
  { slug: "the-bluest-eye", title: "The Bluest Eye", author: "Toni Morrison", year: 1970, status: "queued", collection: null, sinner: null, color: "#2563eb", order: 18, cover: null, published: false },
  {
    slug: "the-bell-jar",
    title: "The Bell Jar",
    author: "Sylvia Plath",
    year: 1963,
    status: "queued",
    collection: null,
    sinner: null,
    color: "#581c87",
    order: 19,
    cover: null,
    published: false,
    summary:
      "The Bell Jar was published just one month before author Sylvia Plath, suffering a depressive episode, thrust her head inside a gas oven and committed suicide. With inspiration from her own mental health struggles, *The Bell Jar* chronicles the crack-up of Esther Greenwood: brilliant, beautiful, enormously talented, and successful, but slowly going under—maybe for the last time. Sylvia Plath masterfully draws the reader into Esther's breakdown with such intensity that Esther's insanity becomes disturbingly real. Such deep penetration into the dark and harrowing corners of the psyche is an extraordinary accomplishment and has made *The Bell Jar* a haunting American classic.",
  },
];

// Limbus Company's 14 reference books (Goodreads list order). The first 12
// are sinner-anchored; the last two are broader Project Moon references.
const limbus: Seed[] = [
  { slug: "wings", title: "The Wings", author: "Yi Sang", year: 1936, status: "queued", collection: "limbus", sinner: "Yi Sang", color: "#7dd3fc", order: 1, cover: null },
  { slug: "don-quixote", title: "Don Quixote", author: "Miguel de Cervantes Saavedra", year: 1605, status: "queued", collection: "limbus", sinner: "Don Quixote", color: "#fb923c", order: 2, cover: null },
  { slug: "the-stranger", title: "The Stranger", author: "Albert Camus", year: 1942, status: "read", collection: "limbus", sinner: "Meursault", color: "#94a3b8", order: 3, cover: null },
  { slug: "hell-screen", title: "Hell Screen", author: "Ryūnosuke Akutagawa", year: 1918, status: "read", collection: "limbus", sinner: "Ryōshū", color: "#f43f5e", order: 4, cover: null },
  { slug: "wuthering-heights", title: "Wuthering Heights", author: "Emily Brontë", year: 1847, status: "queued", collection: "limbus", sinner: "Heathcliff", color: "#a855f7", order: 5, cover: null },
  { slug: "faust", title: "Faust", author: "Johann Wolfgang von Goethe", year: 1808, status: "queued", collection: "limbus", sinner: "Faust", color: "#fde047", order: 6, cover: null },
  { slug: "moby-dick", title: "Moby-Dick or, The Whale", author: "Herman Melville", year: 1851, status: "queued", collection: "limbus", sinner: "Ishmael", color: "#22d3ee", order: 7, cover: null },
  { slug: "crime-and-punishment", title: "Crime and Punishment", author: "Fyodor Dostoevsky", year: 1866, status: "read", collection: "limbus", sinner: "Rodion", color: "#dc2626", order: 8, cover: null },
  { slug: "the-odyssey", title: "The Odyssey", author: "Homer", year: -800, status: "queued", collection: "limbus", sinner: "Outis", color: "#84cc16", order: 9, cover: null },
  { slug: "the-golden-bough", title: "The Golden Bough", author: "James George Frazer", year: 1890, status: "queued", collection: "limbus", sinner: null, color: "#facc15", order: 10, cover: null },
  { slug: "the-metamorphosis", title: "The Metamorphosis", author: "Franz Kafka", year: 1915, status: "queued", collection: "limbus", sinner: "Gregor", color: "#a3a3a3", order: 11, cover: null },
  { slug: "dream-of-the-red-chamber", title: "Dream of the Red Chamber", author: "Cao Xueqin", year: 1791, status: "queued", collection: "limbus", sinner: "Hong Lu", color: "#ef4444", order: 12, cover: null },
  { slug: "demian", title: "Demian / Siddhartha", author: "Hermann Hesse", year: 1919, status: "queued", collection: "limbus", sinner: "Sinclair", color: "#60a5fa", order: 13, cover: null },
  { slug: "the-divine-comedy", title: "The Divine Comedy", author: "Dante Alighieri", year: 1320, status: "queued", collection: "limbus", sinner: "Dante", color: "#fbbf24", order: 14, cover: null },
];

async function main() {
  console.log("Seeding site_content…");
  await sql`
    INSERT INTO site_content (key, value)
    VALUES ('intro', ${INTRO}), ('about', ${ABOUT}), ('hero_name', 'Sunday''s Shelf'), ('hero_tagline', 'Book reviews and recommendations')
    ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()
  `;

  console.log(`Seeding ${limbus.length} Limbus books…`);
  for (const b of limbus) {
    await sql`
      INSERT INTO books (slug, title, author, year_published, cover_url, status, collection, limbus_sinner, limbus_color, display_order)
      VALUES (${b.slug}, ${b.title}, ${b.author}, ${b.year}, ${b.cover}, ${b.status}, ${b.collection}, ${b.sinner}, ${b.color}, ${b.order})
      ON CONFLICT (slug) DO UPDATE SET
        -- Structural metadata always refreshes from the seed.
        title = EXCLUDED.title,
        author = EXCLUDED.author,
        year_published = EXCLUDED.year_published,
        collection = EXCLUDED.collection,
        limbus_sinner = EXCLUDED.limbus_sinner,
        limbus_color = EXCLUDED.limbus_color,
        display_order = EXCLUDED.display_order,
        -- Editable: status only re-syncs while still queued.
        status = CASE WHEN books.status = 'queued' THEN EXCLUDED.status ELSE books.status END,
        updated_at = NOW()
    `;
  }

  console.log(`Seeding ${wider.length} wider-library book(s)…`);
  for (const b of wider) {
    const published = b.published ?? true;
    await sql`
      INSERT INTO books
        (slug, title, author, year_published, cover_url, status, collection,
         limbus_sinner, limbus_color, display_order, rating, summary, review,
         review_published)
      VALUES
        (${b.slug}, ${b.title}, ${b.author}, ${b.year}, ${b.cover}, ${b.status},
         ${b.collection}, ${b.sinner}, ${b.color}, ${b.order},
         ${b.rating ?? null}, ${b.summary ?? null}, ${b.review ?? null},
         ${published})
      ON CONFLICT (slug) DO UPDATE SET
        -- Structural metadata always refreshes from the seed file.
        title = EXCLUDED.title,
        author = EXCLUDED.author,
        year_published = EXCLUDED.year_published,
        collection = EXCLUDED.collection,
        limbus_sinner = EXCLUDED.limbus_sinner,
        limbus_color = EXCLUDED.limbus_color,
        display_order = EXCLUDED.display_order,
        -- Editable fields (status, rating, summary, review, publish toggle)
        -- are preserved if the admin has already touched them. The seed
        -- only fills them in when they're still null/default.
        status = CASE WHEN books.status = 'queued' THEN EXCLUDED.status ELSE books.status END,
        rating = COALESCE(books.rating, EXCLUDED.rating),
        summary = COALESCE(books.summary, EXCLUDED.summary),
        review = COALESCE(books.review, EXCLUDED.review),
        review_published = books.review_published,
        updated_at = NOW()
    `;
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

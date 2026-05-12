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
};

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
        title = EXCLUDED.title,
        author = EXCLUDED.author,
        year_published = EXCLUDED.year_published,
        status = EXCLUDED.status,
        collection = EXCLUDED.collection,
        limbus_sinner = EXCLUDED.limbus_sinner,
        limbus_color = EXCLUDED.limbus_color,
        display_order = EXCLUDED.display_order,
        updated_at = NOW()
    `;
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

import { config } from "dotenv";
config({ path: ".env.local" });
import OpenAI from "openai";
import fs from "node:fs";
import path from "node:path";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

type Job = { name: string; prompt: string; size: "1024x1024" | "1536x1024" | "1024x1536" };

const jobs: Job[] = [
  {
    name: "cosmos.png",
    size: "1536x1024",
    prompt:
      "An ultra-deep purple cosmic nebula, dreamlike and painterly. Soft swirls of violet, indigo, magenta, and a hint of crimson plasma. Distant stars and faint dust lanes. Cinematic depth, subtle film grain, no text, no watermark, no characters. Designed as a quiet website background — extremely dark overall (about 90% near-black violet) with luminous accents reading like distant galaxies. Ratio 3:2.",
  },
  {
    name: "limbus-veil.png",
    size: "1536x1024",
    prompt:
      "A moody crimson-and-violet veil background: dark plum vignette with subtle vermilion smoke and ember sparks drifting. Suggests a midnight train carriage lit by red lanterns, but abstract — no people, no text, no logos. Painterly, cinematic, deeply atmospheric. Designed as a website section background, around 85% dark.",
  },
  {
    name: "starfield.png",
    size: "1024x1024",
    prompt:
      "A square seamless tile of tiny scattered white and pale lavender stars on a near-black violet sky, very dark, flat, no nebula, no text, suitable for tiling as a subtle overlay. Minimal, clean, soft anti-aliasing.",
  },
];

async function run() {
  const outDir = path.join(process.cwd(), "public", "bg");
  fs.mkdirSync(outDir, { recursive: true });

  for (const job of jobs) {
    const target = path.join(outDir, job.name);
    if (fs.existsSync(target) && !process.env.FORCE) {
      console.log(`skip (exists): ${job.name} — set FORCE=1 to regenerate`);
      continue;
    }
    console.log(`generating ${job.name} (${job.size})…`);
    const res = await openai.images.generate({
      model: "gpt-image-1",
      prompt: job.prompt,
      size: job.size,
      quality: "high",
    });
    const b64 = res.data?.[0]?.b64_json;
    if (!b64) {
      console.error(`no image returned for ${job.name}`);
      continue;
    }
    fs.writeFileSync(target, Buffer.from(b64, "base64"));
    console.log(`  wrote ${target}`);
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

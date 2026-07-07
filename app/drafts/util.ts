// Client-safe helpers shared by the draft pages. No server imports here.

export function romanize(n: number): string {
  const map: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  for (const [v, s] of map) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
}

export function surname(author: string): string {
  const parts = author.replace(/[.,]/g, "").trim().split(/\s+/);
  return parts[parts.length - 1] ?? author;
}

// Library-style call number: FIC HUX 1932
export function callNumber(author: string, year: number | null): string {
  const tag = surname(author).slice(0, 3).toUpperCase();
  return `FIC ${tag}${year ? ` ${year}` : ""}`;
}

const MONTHS = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC",
];

export function stampDate(iso: string | null): string | null {
  if (!iso) return null;
  const [y, m, d] = iso.split("-").map((s) => parseInt(s, 10));
  if (!y || !m || !d) return null;
  return `${MONTHS[m - 1]} ${d} ${y}`;
}

// Deterministic jitter so rotations/positions never trip hydration.
export function jitter(i: number, max: number): number {
  const t = ((i * 9301 + 49297) % 233280) / 233280;
  return (t * 2 - 1) * max;
}

export function yearLabel(year: number | null): string {
  if (year == null) return "—";
  return year < 0 ? `${Math.abs(year)} BCE` : String(year);
}

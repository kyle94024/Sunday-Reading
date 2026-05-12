import { Flower, Leaf, Sprout } from "./Flower";

// Purple-only flower palette so the side decorations feel like part of
// the lavender backdrop, not stickers laid on top.
const PALETTES = [
  { petal: "#ede9fe", outline: "#c4b5fd", center: "#7c3aed" }, // very light
  { petal: "#e9d5ff", outline: "#c084fc", center: "#6d28d9" }, // light
  { petal: "#ddd6fe", outline: "#a78bfa", center: "#5b21b6" }, // medium
  { petal: "#d8b4fe", outline: "#9333ea", center: "#4c1d95" }, // medium-deep
];

function LeftColumn() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-0 hidden w-24 flex-col items-center justify-around py-20 lg:flex xl:w-28">
      <Flower size={60} rotate={-12} opacity={0.55} {...PALETTES[1]} />
      <Leaf size={36} rotate={28} color="#d8c8ee" outline="#b8a3e3" opacity={0.45} />
      <Flower size={44} rotate={6} opacity={0.5} {...PALETTES[0]} />
      <Sprout size={28} rotate={-12} color="#c8b8e3" />
      <Flower size={54} rotate={-22} opacity={0.6} {...PALETTES[2]} />
      <Leaf size={32} rotate={-18} color="#cebbe5" outline="#a78bfa" opacity={0.4} />
      <Flower size={38} rotate={14} opacity={0.55} {...PALETTES[3]} />
    </div>
  );
}

function RightColumn() {
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden w-24 flex-col items-center justify-around py-20 lg:flex xl:w-28">
      <Flower size={50} rotate={18} opacity={0.55} {...PALETTES[2]} />
      <Sprout size={26} rotate={12} color="#c8b8e3" />
      <Flower size={62} rotate={-8} opacity={0.5} {...PALETTES[0]} />
      <Leaf size={38} rotate={-22} color="#d8c8ee" outline="#b8a3e3" opacity={0.45} />
      <Flower size={40} rotate={28} opacity={0.55} {...PALETTES[3]} />
      <Leaf size={32} rotate={20} color="#cebbe5" outline="#a78bfa" opacity={0.4} />
      <Flower size={56} rotate={-15} opacity={0.6} {...PALETTES[1]} />
    </div>
  );
}

export function AboutBackground() {
  return (
    <>
      {/* Darker lavender backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #d4c2f5 0%, #b8a3e3 30%, #9d85c9 65%, #7c66a8 100%)",
        }}
      />
      {/* Soft violet glows at opposing corners */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -left-32 -z-10 h-[45vmax] w-[45vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(192, 132, 252, 0.32), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -right-32 -z-10 h-[50vmax] w-[50vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(124, 58, 237, 0.28), transparent 65%)",
        }}
      />
      <LeftColumn />
      <RightColumn />
    </>
  );
}

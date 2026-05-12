import { Flower, Leaf, Sprout } from "./Flower";

// Cute side-column decoration. Different flower picks for left vs right
// so the page isn't mirrored.
function LeftColumn() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-0 z-0 hidden w-24 flex-col items-center justify-around py-20 lg:flex xl:w-28">
      <Flower size={60} rotate={-12} petal="#fff1f2" outline="#fda4af" center="#f59e0b" />
      <Leaf size={36} rotate={28} />
      <Flower
        size={44}
        rotate={6}
        petal="#fef3c7"
        outline="#fcd34d"
        center="#f97316"
      />
      <Sprout size={28} rotate={-12} />
      <Flower
        size={54}
        rotate={-22}
        petal="#fce7f3"
        outline="#f9a8d4"
        center="#ec4899"
      />
      <Leaf size={32} rotate={-18} color="#d9f99d" outline="#bef264" />
      <Flower
        size={38}
        rotate={14}
        petal="#ede9fe"
        outline="#c4b5fd"
        center="#a855f7"
      />
    </div>
  );
}

function RightColumn() {
  return (
    <div className="pointer-events-none fixed inset-y-0 right-0 z-0 hidden w-24 flex-col items-center justify-around py-20 lg:flex xl:w-28">
      <Flower
        size={50}
        rotate={18}
        petal="#fdf2f8"
        outline="#f9a8d4"
        center="#ec4899"
      />
      <Sprout size={26} rotate={12} />
      <Flower
        size={62}
        rotate={-8}
        petal="#fffbeb"
        outline="#fcd34d"
        center="#f59e0b"
      />
      <Leaf size={38} rotate={-22} color="#bbf7d0" />
      <Flower
        size={40}
        rotate={28}
        petal="#fce7f3"
        outline="#f472b6"
        center="#db2777"
      />
      <Leaf size={32} rotate={20} color="#d9f99d" outline="#bef264" />
      <Flower
        size={56}
        rotate={-15}
        petal="#f5f3ff"
        outline="#c4b5fd"
        center="#a855f7"
      />
    </div>
  );
}

export function AboutBackground() {
  return (
    <>
      {/* Lavender backdrop */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, #f5f3ff 0%, #ede9fe 28%, #e0d4fb 60%, #d4c2f5 100%)",
        }}
      />
      {/* Soft sun-glow accents at the corners */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -left-32 -z-10 h-[40vmax] w-[40vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(252, 211, 77, 0.22), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-40 -right-32 -z-10 h-[45vmax] w-[45vmax] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(244, 114, 182, 0.18), transparent 65%)",
        }}
      />
      <LeftColumn />
      <RightColumn />
    </>
  );
}

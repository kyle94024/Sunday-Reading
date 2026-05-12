"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

type ShelfBook = {
  href: string;
  label: string;
  h: number;
  accent: string;
};

const SHELF: ShelfBook[] = [
  { href: "/", label: "Home", h: 86, accent: "#a855f7" },
  { href: "/about", label: "About", h: 96, accent: "#ec4899" },
];

const FALL_MS = 320;
const WIPE_UP_MS = 220;
const HOLD_AFTER_PUSH_MS = 120;
const WIPE_DOWN_MS = 320;

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function BookShelfNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [falling, setFalling] = useState<string | null>(null);
  const [wiping, setWiping] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isAbout = pathname === "/about";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // When the route changes and we're mid-wipe, dismiss the wipe (slides out)
  useEffect(() => {
    if (!wiping) return;
    const t = setTimeout(() => setWiping(false), HOLD_AFTER_PUSH_MS);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const travelTo = useCallback(
    async (href: string) => {
      if (falling || wiping || href === pathname) return;
      setFalling(href);
      await wait(FALL_MS);
      setWiping(true);
      await wait(WIPE_UP_MS);
      router.push(href);
      // pathname effect will dismiss wiping after HOLD_AFTER_PUSH_MS
      await wait(WIPE_UP_MS + HOLD_AFTER_PUSH_MS + WIPE_DOWN_MS);
      setFalling(null);
    },
    [falling, wiping, pathname, router]
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          isAbout
            ? "backdrop-blur-md bg-white/35 border-b border-violet/20"
            : scrolled
            ? "backdrop-blur-xl bg-bg/55 border-b border-violet-bright/10"
            : "backdrop-blur-0 bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-end justify-between gap-6 px-6 pt-4 pb-3">
          <Link
            href="/"
            onClick={(e) => {
              e.preventDefault();
              travelTo("/");
            }}
            className="group flex items-center gap-3 self-center"
          >
            <span
              aria-hidden
              className="block h-2 w-2 rounded-full bg-violet-bright shadow-[0_0_12px_rgba(192,132,252,0.9)] transition-transform duration-500 group-hover:scale-150"
            />
            <span
              className={`font-display text-lg tracking-[0.05em] sm:text-xl ${
                isAbout ? "text-violet-deep" : "text-ink"
              }`}
            >
              Sunday&rsquo;s{" "}
              <span className="text-gradient-violet">Shelf</span>
            </span>
          </Link>

          <Shelf
            books={SHELF}
            pathname={pathname}
            falling={falling}
            onPick={travelTo}
          />
        </nav>
      </header>

      <AnimatePresence>
        {wiping && (
          <motion.div
            key="wipe"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              y: {
                duration: wiping ? WIPE_UP_MS / 1000 : WIPE_DOWN_MS / 1000,
                ease: [0.7, 0, 0.3, 1],
              },
            }}
            className="pointer-events-none fixed inset-0 z-[200]"
            style={{
              background:
                "linear-gradient(180deg, #1d0b3a 0%, #07030f 60%, #1d0b3a 100%)",
            }}
          >
            <span className="absolute inset-x-0 top-0 h-px bg-violet-bright/70 shadow-[0_0_18px_rgba(192,132,252,0.7)]" />
            <span className="absolute inset-x-0 bottom-0 h-px bg-violet-bright/40" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Shelf({
  books,
  pathname,
  falling,
  onPick,
}: {
  books: ShelfBook[];
  pathname: string;
  falling: string | null;
  onPick: (href: string) => void;
}) {
  return (
    <div className="relative pt-2">
      <div className="flex items-end gap-2.5">
        {books.map((b) => (
          <BookSpine
            key={b.href}
            book={b}
            active={pathname === b.href}
            falling={falling === b.href}
            disabled={!!falling && falling !== b.href}
            onClick={() => onPick(b.href)}
          />
        ))}
      </div>
      {/* shelf line */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-14px] bottom-0 h-px bg-gradient-to-r from-transparent via-violet-bright/55 to-transparent"
      />
      {/* end brackets */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-3.5 bottom-0 h-3 w-px bg-violet-bright/55"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-3.5 bottom-0 h-3 w-px bg-violet-bright/55"
      />
    </div>
  );
}

function BookSpine({
  book,
  active,
  falling,
  disabled,
  onClick,
}: {
  book: ShelfBook;
  active: boolean;
  falling: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  // Pivot at bottom-center so books rotate about the shelf line.
  const restState = active
    ? { rotate: -6, y: -3, opacity: 1 }
    : { rotate: 0, y: 0, opacity: 1 };

  const fallenState = {
    rotate: 108,
    y: 320,
    opacity: 0.25,
    transition: { duration: FALL_MS / 1000, ease: [0.45, 0, 0.85, 1] as const },
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`Go to ${book.label}`}
      whileHover={!falling && !disabled ? { rotate: -22, y: -6 } : {}}
      animate={falling ? fallenState : restState}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      style={{
        transformOrigin: "50% 100%",
        height: book.h,
        width: 32,
        borderColor: `${book.accent}99`,
        background: `linear-gradient(180deg, ${book.accent}1a 0%, ${book.accent}08 60%, transparent 100%)`,
        zIndex: falling ? 10 : 1,
        boxShadow: active
          ? `0 6px 18px -6px ${book.accent}aa, inset 0 0 0 1px ${book.accent}22`
          : undefined,
      }}
      className="group/spine relative shrink-0 cursor-pointer rounded-[3px] border backdrop-blur-sm transition-shadow disabled:cursor-default hover:shadow-[0_10px_28px_-4px_rgba(168,85,247,0.45)]"
    >
      {/* page-edge line (right inside) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-1.5 right-1 w-px"
        style={{ background: `${book.accent}55` }}
      />
      {/* top/bottom decorative bands */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 top-1.5 h-px"
        style={{ background: `${book.accent}aa` }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-1 bottom-1.5 h-px"
        style={{ background: `${book.accent}aa` }}
      />
      {/* vertical label */}
      <span
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-sans text-[13px] font-semibold uppercase tracking-[0.16em]"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          color: active ? "#fff" : "rgba(245,243,255,0.9)",
          textShadow: "0 1px 2px rgba(0,0,0,0.5)",
        }}
      >
        {book.label}
      </span>
      {/* glow on hover */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-1 rounded-md opacity-0 transition-opacity duration-500 group-hover/spine:opacity-100"
        style={{
          background: `radial-gradient(60% 60% at 50% 50%, ${book.accent}33, transparent 70%)`,
          filter: "blur(8px)",
        }}
      />
    </motion.button>
  );
}

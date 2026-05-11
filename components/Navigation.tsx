"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-bg/55 border-b border-violet-bright/10"
          : "backdrop-blur-0 bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span
            aria-hidden
            className="block h-2 w-2 rounded-full bg-violet-bright shadow-[0_0_12px_rgba(192,132,252,0.9)] transition-transform duration-500 group-hover:scale-150"
          />
          <span className="font-display text-xl tracking-[0.18em] text-ink">
            SUNDAY <span className="text-ink-muted/60">·</span>{" "}
            <span className="text-gradient-violet">READING</span>
          </span>
        </Link>
        <ul className="flex items-center gap-8 text-[13px] uppercase tracking-[0.24em]">
          {links.map((l) => {
            const active =
              l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className={`ink-underline transition-colors ${
                    active ? "text-ink" : "text-ink-muted/70 hover:text-ink"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}

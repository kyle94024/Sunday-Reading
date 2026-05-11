import Link from "next/link";
import type { ReactNode } from "react";
import { isLoggedIn } from "@/lib/auth";
import { logoutAction } from "./actions";
import "./admin.css";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authed = await isLoggedIn();
  return (
    <div className="admin-shell relative min-h-screen text-ink">
      {/* Subtle backdrop separate from public site */}
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 0%, rgba(109,40,217,0.18), transparent 65%), radial-gradient(50% 50% at 80% 100%, rgba(236,72,153,0.12), transparent 60%), #07030f",
        }}
      />
      {authed && (
        <header className="sticky top-0 z-30 border-b border-violet-bright/15 backdrop-blur-xl bg-bg/55">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-6 py-3">
            <Link
              href="/admin"
              className="flex items-center gap-3 text-sm font-medium text-ink"
            >
              <span className="block h-2 w-2 rounded-full bg-violet-bright shadow-[0_0_10px_rgba(192,132,252,0.9)]" />
              <span className="font-display text-base tracking-[0.04em]">
                Sunday&rsquo;s Shelf{" "}
                <span className="text-ink-muted/60">·</span>{" "}
                <span className="text-gradient-violet">admin</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-[12px]">
              <Link
                href="/admin/books"
                className="rounded px-3 py-1.5 text-ink-muted/85 transition hover:bg-violet-deep/30 hover:text-ink"
              >
                Books
              </Link>
              <Link
                href="/admin/content"
                className="rounded px-3 py-1.5 text-ink-muted/85 transition hover:bg-violet-deep/30 hover:text-ink"
              >
                Site copy
              </Link>
              <Link
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded px-3 py-1.5 text-ink-muted/85 transition hover:bg-violet-deep/30 hover:text-ink"
              >
                View site ↗
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded px-3 py-1.5 text-ink-muted/85 transition hover:bg-crimson-deep/40 hover:text-ember"
                >
                  Sign out
                </button>
              </form>
            </nav>
          </div>
        </header>
      )}
      <main className="mx-auto max-w-5xl px-6 py-10">{children}</main>
    </div>
  );
}

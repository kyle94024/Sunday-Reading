import Link from "next/link";
import { BookShelfNav } from "@/components/BookShelfNav";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="grain" aria-hidden />
      <BookShelfNav />
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 mt-32 flex items-center justify-center gap-3 border-t border-violet-bright/10 py-10 text-xs uppercase tracking-[0.3em] text-ink-muted/60">
        <span className="text-gradient-violet">Sunday&rsquo;s Shelf</span>
        <Link
          href="/admin/login"
          aria-label="admin"
          title="admin"
          className="inline-block h-1.5 w-1.5 rounded-full bg-violet-bright/15 transition-all duration-500 hover:scale-150 hover:bg-violet-glow hover:shadow-[0_0_12px_rgba(192,132,252,0.9)]"
        />
      </footer>
    </>
  );
}

import { BookShelfNav } from "@/components/BookShelfNav";
import { CosmicBackground } from "@/components/CosmicBackground";

export default function PublicLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <CosmicBackground />
      <div className="grain" aria-hidden />
      <BookShelfNav />
      <main className="relative z-10">{children}</main>
      <footer className="relative z-10 mt-32 border-t border-violet-bright/10 py-10 text-center text-xs uppercase tracking-[0.3em] text-ink-muted/60">
        <span className="text-gradient-violet">Sunday&rsquo;s Shelf</span>
      </footer>
    </>
  );
}

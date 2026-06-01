"use client";

import { LayoutGroup } from "motion/react";
import type { Book } from "@/lib/db";
import { BookCard } from "./BookCard";

// Books are laid out in fixed pairs. Each pair is its own 2-column grid, so
// opening a card can never ripple into other pairs. When a card opens it
// takes the full width and `sm:order-first` floats it to the top of its
// pair, pushing its partner down — identical behaviour whether you click
// the left or the right card.
export function BookGrid({
  books,
  variant,
}: {
  books: Book[];
  variant?: "default" | "limbus";
}) {
  const pairs: Book[][] = [];
  for (let i = 0; i < books.length; i += 2) {
    pairs.push(books.slice(i, i + 2));
  }

  return (
    <LayoutGroup>
      <div className="flex flex-col gap-5">
        {pairs.map((pair, pi) => (
          <div
            key={pair.map((b) => b.id).join("-")}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2"
          >
            {pair.map((b, j) => (
              <BookCard
                key={b.id}
                book={b}
                index={pi * 2 + j}
                variant={variant}
              />
            ))}
          </div>
        ))}
      </div>
    </LayoutGroup>
  );
}

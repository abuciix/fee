"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui";
import type { LibraryCategory, LibraryItem } from "@/lib/tools-data";

const CATEGORIES: ("All" | LibraryCategory)[] = [
  "All",
  "BIM Families",
  "CAD Blocks",
  "Materials & Finishes",
  "Furniture",
];

export default function DesignLibrariesView({ libraryItems }: { libraryItems: LibraryItem[] }) {
  const [category, setCategory] = useState<"All" | LibraryCategory>("All");

  const filtered = useMemo(
    () => libraryItems.filter((item) => category === "All" || item.category === category),
    [libraryItems, category]
  );

  return (
    <div>
      <PageHeader
        icon="📚"
        title="Design Libraries"
        description="Shared CAD/BIM blocks, materials, and component libraries."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCategory(c)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              category === c
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-border bg-surface text-status-neutral hover:border-brand-tan"
            }`}
          >
            {c}
          </button>
        ))}
        <div className="ml-auto flex items-center text-xs text-status-neutral">
          {filtered.length} items
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-lg border border-border bg-surface shadow-sm transition-colors hover:border-brand-tan"
          >
            <div className={`flex h-28 items-center justify-center text-4xl ${item.color}`}>
              <span aria-hidden>{item.icon}</span>
            </div>
            <div className="p-3">
              <div className="text-sm font-medium text-brand-navy">{item.name}</div>
              <div className="mt-1 flex items-center justify-between text-xs text-status-neutral">
                <span>{item.format}</span>
                <span>
                  {new Date(item.updated).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

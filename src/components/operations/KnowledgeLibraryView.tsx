"use client";

import { useMemo, useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import { KNOWLEDGE_ARTICLES, KNOWLEDGE_CATEGORIES } from "@/lib/operations-data";

const CATEGORY_OPTIONS = ["All", ...KNOWLEDGE_CATEGORIES];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function KnowledgeLibraryView() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return KNOWLEDGE_ARTICLES.filter((article) => {
      if (category !== "All" && article.category !== category) return false;
      if (!q) return true;
      const haystack = `${article.title} ${article.summary} ${article.tags.join(" ")} ${article.author}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [search, category]);

  return (
    <div>
      <PageHeader
        icon="🏢"
        title="Knowledge Library"
        description="Standards, precedents, and institutional knowledge in one library."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search standards, precedents, wiki articles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All categories" : c}
            </option>
          ))}
        </select>
        <div className="flex items-center text-xs text-status-neutral">
          {filtered.length} of {KNOWLEDGE_ARTICLES.length} articles
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No articles match “{search}”.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((article) => (
            <Card key={article.id}>
              <span className="inline-block rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-brand-navy">
                {article.category}
              </span>
              <div className="mt-2 font-medium text-brand-navy">{article.title}</div>
              <p className="mt-1 text-sm text-status-neutral">{article.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs text-status-neutral">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-status-neutral">
                <span>{article.author}</span>
                <span>Updated {formatDate(article.lastUpdated)}</span>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

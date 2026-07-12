"use client";

import { useMemo, useState } from "react";
import { PageHeader } from "@/components/ui";
import type { Template, TemplateType } from "@/lib/tools-data";

const TYPES: ("All" | TemplateType)[] = ["All", "Proposal", "Contract", "Drawing Sheet", "Report"];

const TYPE_STYLES: Record<TemplateType, string> = {
  Proposal: "bg-status-good-bg text-status-good",
  Contract: "bg-status-warning-bg text-status-warning",
  "Drawing Sheet": "bg-status-neutral-bg text-status-neutral",
  Report: "bg-brand-platinum text-brand-navy",
};

export default function TemplatesView({ templates }: { templates: Template[] }) {
  const [type, setType] = useState<"All" | TemplateType>("All");
  const [usedId, setUsedId] = useState<string | null>(null);

  const filtered = useMemo(
    () => templates.filter((t) => type === "All" || t.type === type),
    [templates, type]
  );

  return (
    <div>
      <PageHeader
        icon="🗂"
        title="Templates"
        description="Reusable document and drawing templates."
      />

      <div className="mb-5 flex flex-wrap gap-2">
        {TYPES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setType(t)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              type === t
                ? "border-brand-blue bg-brand-blue text-white"
                : "border-border bg-surface text-status-neutral hover:border-brand-tan"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((template) => (
          <div
            key={template.id}
            className="flex flex-col rounded-lg border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="font-medium text-brand-navy">{template.name}</div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${TYPE_STYLES[template.type]}`}
              >
                {template.type}
              </span>
            </div>
            <p className="mt-2 flex-1 text-sm text-status-neutral">{template.description}</p>
            <div className="mt-3 flex items-center justify-between text-xs text-status-neutral">
              <span>{template.owner}</span>
              <span>
                Updated{" "}
                {new Date(template.lastUpdated).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setUsedId(template.id)}
              className="mt-4 w-full rounded-md bg-brand-blue px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
            >
              {usedId === template.id ? "Template ready ✓" : "Use template"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

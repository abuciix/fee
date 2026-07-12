"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ui";
import { PROJECTS, getProject } from "@/lib/project-data";
import { DRAWINGS, DRAWING_STATUS_META, type DrawingStatus } from "./drawings-data";

const STATUS_FILTERS: { value: "All" | DrawingStatus; label: string }[] = [
  { value: "All", label: "All statuses" },
  { value: "draft", label: "Draft" },
  { value: "for_review", label: "For Review" },
  { value: "issued", label: "Issued" },
  { value: "revise_resubmit", label: "Revise & Resubmit" },
];

export default function DrawingsRegisterView() {
  const [projectFilter, setProjectFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState<"All" | DrawingStatus>("All");

  const filtered = useMemo(() => {
    return DRAWINGS.filter((d) => {
      if (projectFilter !== "All" && d.projectId !== projectFilter) return false;
      if (statusFilter !== "All" && d.status !== statusFilter) return false;
      return true;
    }).sort((a, b) => (a.lastIssuedDate < b.lastIssuedDate ? 1 : -1));
  }, [projectFilter, statusFilter]);

  const issuedCount = DRAWINGS.filter((d) => d.status === "issued").length;
  const reviewCount = DRAWINGS.filter((d) => d.status === "for_review").length;
  const flaggedCount = DRAWINGS.filter((d) => d.status === "revise_resubmit").length;

  return (
    <div>
      <PageHeader
        icon="🏗"
        title="Drawings & Documents"
        description="Version-controlled drawing sets and project documentation."
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">Issued</div>
          <div className="mt-1 text-xl font-semibold text-brand-navy">{issuedCount}</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">For Review</div>
          <div className="mt-1 text-xl font-semibold text-brand-navy">{reviewCount}</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">Revise &amp; Resubmit</div>
          <div className="mt-1 text-xl font-semibold text-brand-navy">{flaggedCount}</div>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select
          value={projectFilter}
          onChange={(e) => setProjectFilter(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          <option value="All">All projects</option>
          {PROJECTS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as "All" | DrawingStatus)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
        <div className="text-xs text-status-neutral">
          {filtered.length} of {DRAWINGS.length} drawings
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No drawings match these filters.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border bg-surface-muted/40 text-xs uppercase tracking-wide text-status-neutral">
                <th className="px-4 py-3 font-medium">Sheet</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Discipline</th>
                <th className="px-4 py-3 font-medium">Rev</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Last Issued</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((d) => {
                const project = getProject(d.projectId);
                const meta = DRAWING_STATUS_META[d.status];
                return (
                  <tr key={d.id} className="hover:bg-surface-muted/30">
                    <td className="px-4 py-3 font-medium text-brand-navy">{d.sheetNumber}</td>
                    <td className="px-4 py-3 text-brand-navy">{d.title}</td>
                    <td className="px-4 py-3 text-status-neutral">{d.discipline}</td>
                    <td className="px-4 py-3 text-status-neutral">{d.revision}</td>
                    <td className="px-4 py-3">
                      {project ? (
                        <Link
                          href={`/projects/active/${project.id}`}
                          className="text-brand-blue hover:underline"
                        >
                          {project.name}
                        </Link>
                      ) : (
                        <span className="text-status-neutral">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-status-neutral">
                      {new Date(d.lastIssuedDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={meta.pill} label={meta.label} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { PageHeader, Card, StatusPill } from "@/components/ui";
import { DISCIPLINES, MILESTONE_STATUS_META, type Intern } from "@/lib/operations-data";

const DISCIPLINE_OPTIONS = ["All", ...DISCIPLINES];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function InternshipRosterView({ interns }: { interns: Intern[] }) {
  const [search, setSearch] = useState("");
  const [discipline, setDiscipline] = useState("All");

  const filtered = useMemo(() => {
    return interns.filter((intern) => {
      if (discipline !== "All" && intern.discipline !== discipline) return false;
      if (search && !`${intern.name} ${intern.mentor} ${intern.school}`.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [search, discipline, interns]);

  return (
    <div>
      <PageHeader
        icon="🏢"
        title="Internship Management"
        description="Track interns, mentors, and program milestones."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by name, mentor, or school…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
        <select
          value={discipline}
          onChange={(e) => setDiscipline(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {DISCIPLINE_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {d === "All" ? "All disciplines" : d}
            </option>
          ))}
        </select>
        <div className="flex items-center text-xs text-status-neutral">
          {filtered.length} of {interns.length} interns
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No interns match these filters.
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((intern) => {
            const completedCount = intern.milestones.filter((m) => m.status === "completed").length;
            return (
              <Card key={intern.id}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-brand-navy">{intern.name}</div>
                    <div className="text-xs text-status-neutral">{intern.school}</div>
                  </div>
                  <span className="rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-brand-navy">
                    {completedCount}/{intern.milestones.length} milestones
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-status-neutral">
                  <span>{intern.discipline}</span>
                  <span>Mentor: {intern.mentor}</span>
                </div>

                <div className="mt-2 text-xs text-status-neutral">
                  {formatDate(intern.startDate)} → {formatDate(intern.endDate)}
                </div>

                <ul className="mt-4 space-y-2">
                  {intern.milestones.map((milestone) => {
                    const meta = MILESTONE_STATUS_META[milestone.status];
                    return (
                      <li
                        key={milestone.label}
                        className="flex items-center justify-between gap-3 border-t border-border pt-2 text-sm first:border-t-0 first:pt-0"
                      >
                        <span className="text-brand-navy">{milestone.label}</span>
                        <StatusPill status={meta.pill} label={meta.label} />
                      </li>
                    );
                  })}
                </ul>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

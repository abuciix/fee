"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, Card, StatusPill } from "@/components/ui";
import { DISCIPLINES, getUtilizationMeta, type TeamMember } from "@/lib/operations-data";

const DISCIPLINE_OPTIONS = ["All", ...DISCIPLINES];

export default function TeamDirectoryView({ members }: { members: TeamMember[] }) {
  const [search, setSearch] = useState("");
  const [discipline, setDiscipline] = useState("All");

  const filtered = useMemo(() => {
    return members.filter((m) => {
      if (discipline !== "All" && m.discipline !== discipline) return false;
      if (search && !`${m.name} ${m.role}`.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [members, search, discipline]);

  return (
    <div>
      <PageHeader
        icon="🏢"
        title="Team Management"
        description="The studio roster, roles, and reporting lines."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by name or role…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
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
          {filtered.length} of {members.length} team members
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No team members match these filters.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((member) => {
            const meta = getUtilizationMeta(member.utilization);
            return (
              <Link
                key={member.id}
                href={`/operations/team/${member.id}`}
                className="block rounded-lg border border-border bg-surface p-4 shadow-sm transition-colors hover:border-brand-tan"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-brand-navy">{member.name}</div>
                    <div className="text-xs text-status-neutral">{member.role}</div>
                  </div>
                  <StatusPill status={meta.pill} label={meta.label} />
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-status-neutral">
                  <span>{member.discipline}</span>
                  <span>{member.location}</span>
                </div>

                <div className="mt-3">
                  <div className="mb-1 flex justify-between text-xs text-status-neutral">
                    <span>Utilization</span>
                    <span>{member.utilization}%</span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                    <div
                      className={`h-full rounded-full ${meta.band === "high" ? "bg-status-warning" : "bg-brand-blue"}`}
                      style={{ width: `${Math.min(member.utilization, 100)}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 text-xs text-status-neutral">
                  {member.activeProjects.length > 0 ? (
                    <>
                      <span className="text-brand-navy">{member.activeProjects.length}</span> active project
                      {member.activeProjects.length === 1 ? "" : "s"}
                    </>
                  ) : (
                    "No active projects"
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      )}

      <Card className="mt-6 border-dashed">
        <h3 className="mb-2 text-sm font-semibold text-brand-navy">About this view</h3>
        <p className="text-sm text-status-neutral">
          Utilization is calculated from active project assignments. Near-capacity staff (90%+) may need
          workload rebalancing; under-utilized staff (under 40%) have room to take on new work.
        </p>
      </Card>
    </div>
  );
}

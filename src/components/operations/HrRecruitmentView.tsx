"use client";

import { useMemo, useState } from "react";
import { PageHeader, Card, StatusPill } from "@/components/ui";
import {
  RECRUITMENT_STAGES,
  RECRUITMENT_STAGE_META,
  ROLE_STATUS_META,
  type Candidate,
  type OpenRole,
} from "@/lib/operations-data";

export default function HrRecruitmentView({
  roles,
  candidates,
}: {
  roles: OpenRole[];
  candidates: Candidate[];
}) {
  const [roleFilter, setRoleFilter] = useState("All");

  const filteredCandidates = useMemo(
    () => (roleFilter === "All" ? candidates : candidates.filter((c) => c.roleId === roleFilter)),
    [roleFilter, candidates]
  );

  return (
    <div>
      <PageHeader
        icon="🏢"
        title="HR & Recruitment"
        description="Hiring pipeline and core HR records."
      />

      <h3 className="mb-3 text-sm font-semibold text-brand-navy">Open Roles</h3>
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {roles.map((role) => {
          const meta = ROLE_STATUS_META[role.status];
          const candidateCount = candidates.filter((c) => c.roleId === role.id).length;
          return (
            <Card key={role.id}>
              <div className="flex items-start justify-between gap-2">
                <div className="font-medium text-brand-navy">{role.title}</div>
                <StatusPill status={meta.pill} label={meta.label} />
              </div>
              <div className="mt-2 text-xs text-status-neutral">
                {role.department} · {role.location}
              </div>
              <div className="mt-1 text-xs text-status-neutral">{role.employmentType}</div>
              <div className="mt-3 flex items-center justify-between text-xs text-status-neutral">
                <span>
                  Posted{" "}
                  {new Date(role.postedDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                </span>
                <span className="rounded-full bg-surface-muted px-2 py-0.5 font-medium text-brand-navy">
                  {candidateCount} candidate{candidateCount === 1 ? "" : "s"}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-sm font-semibold text-brand-navy">Candidate Pipeline</h3>
        <div className="flex items-center gap-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
          >
            <option value="All">All roles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.title}
              </option>
            ))}
          </select>
          <div className="text-xs text-status-neutral">{filteredCandidates.length} candidates</div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {RECRUITMENT_STAGES.map((stage) => {
          const stageCandidates = filteredCandidates.filter((c) => c.stage === stage);
          return (
            <div key={stage} className="rounded-lg border border-border bg-surface-muted/40">
              <div className="flex items-center justify-between border-b border-border p-3">
                <h4 className="text-sm font-semibold text-brand-navy">{RECRUITMENT_STAGE_META[stage].label}</h4>
                <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-brand-navy">
                  {stageCandidates.length}
                </span>
              </div>
              <ul className="space-y-2 p-2">
                {stageCandidates.length === 0 && (
                  <li className="p-2 text-center text-xs text-status-neutral">No candidates at this stage.</li>
                )}
                {stageCandidates.map((candidate) => {
                  const role = roles.find((r) => r.id === candidate.roleId);
                  return (
                    <li key={candidate.id} className="rounded-md border border-border bg-surface p-3 shadow-sm">
                      <div className="text-sm text-brand-navy">{candidate.name}</div>
                      {role && <div className="mt-1 text-xs text-status-neutral">{role.title}</div>}
                      <div className="mt-2 flex items-center justify-between text-xs text-status-neutral">
                        <span>{candidate.source}</span>
                        <span>
                          {new Date(candidate.appliedDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

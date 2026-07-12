"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ui";
import { PROJECTS, getProject } from "@/lib/project-data";
import { BIM_MODELS, clashStatus } from "./bim-data";

export default function BimCoordinationView() {
  const [projectFilter, setProjectFilter] = useState("All");

  const filtered = useMemo(
    () => BIM_MODELS.filter((m) => projectFilter === "All" || m.projectId === projectFilter),
    [projectFilter]
  );

  const totalClashes = BIM_MODELS.reduce((sum, m) => sum + m.openClashes, 0);
  const modelsAtRisk = BIM_MODELS.filter((m) => clashStatus(m.openClashes) !== "good").length;
  const cleanModels = BIM_MODELS.filter((m) => m.openClashes === 0).length;

  return (
    <div>
      <PageHeader
        icon="🏗"
        title="BIM Management"
        description="Model coordination, clash detection, and BIM execution plans."
      />

      <div className="mb-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">Models Tracked</div>
          <div className="mt-1 text-xl font-semibold text-brand-navy">{BIM_MODELS.length}</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">Open Clashes</div>
          <div className="mt-1 text-xl font-semibold text-brand-navy">{totalClashes}</div>
        </div>
        <div className="rounded-lg border border-border bg-surface p-4 shadow-sm">
          <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">
            Clean Models / Flagged
          </div>
          <div className="mt-1 text-xl font-semibold text-brand-navy">
            {cleanModels} / {modelsAtRisk}
          </div>
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
        <div className="text-xs text-status-neutral">
          {filtered.length} of {BIM_MODELS.length} models
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No models match this filter.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((model) => {
            const project = getProject(model.projectId);
            const status = clashStatus(model.openClashes);
            const label =
              model.openClashes === 0
                ? "No open clashes"
                : `${model.openClashes} open clash${model.openClashes === 1 ? "" : "es"}`;
            return (
              <div key={model.id} className="rounded-lg border border-border bg-surface p-4 shadow-sm">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-brand-navy">{model.modelName}</div>
                    {project && (
                      <Link
                        href={`/projects/active/${project.id}`}
                        className="text-xs text-brand-blue hover:underline"
                      >
                        {project.name}
                      </Link>
                    )}
                  </div>
                  <StatusPill status={status} label={label} />
                </div>

                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-status-neutral">
                  <span>{model.discipline}</span>
                  <span>LOD {model.lod}</span>
                </div>

                <div className="mt-3 text-xs text-status-neutral">
                  Last federated:{" "}
                  <span className="text-brand-navy">
                    {new Date(model.lastFederatedDate).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

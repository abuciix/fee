import Link from "next/link";
import { PageHeader, StatTile, StatusPill } from "@/components/ui";
import { PROJECTS, PROJECT_STATUS_META } from "@/lib/project-data";

export const metadata = { title: "Project Reports" };

const REPORT_DATE = "2026-07-12";

export default function ProjectReportsPage() {
  const totalBudget = PROJECTS.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = PROJECTS.reduce((sum, p) => sum + p.budgetSpent, 0);
  const atRiskCount = PROJECTS.filter((p) => p.status !== "on_track").length;
  const overallSpentPct = Math.round((totalSpent / totalBudget) * 100);

  return (
    <div>
      <PageHeader
        icon="🏗"
        title="Project Reports"
        description="Status reports rolled up for internal review or client updates."
      />

      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs text-status-neutral">
          Rollup as of{" "}
          {new Date(REPORT_DATE).toLocaleDateString(undefined, {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </div>
        <button
          type="button"
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-brand-navy shadow-sm hover:border-brand-tan print:hidden"
        >
          Export to PDF
        </button>
      </div>

      <div className="mb-6 mt-4 grid gap-4 sm:grid-cols-4">
        <StatTile label="Active Projects" value={String(PROJECTS.length)} />
        <StatTile label="Needs Attention" value={String(atRiskCount)} hint="At risk or delayed" />
        <StatTile label="Portfolio Budget" value={`$${(totalBudget / 1000).toFixed(0)}k`} />
        <StatTile
          label="Portfolio Spend"
          value={`${overallSpentPct}%`}
          hint={`$${totalSpent.toLocaleString()} of $${totalBudget.toLocaleString()}`}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {PROJECTS.map((project) => {
          const meta = PROJECT_STATUS_META[project.status];
          const spentPct = Math.round((project.budgetSpent / project.budget) * 100);
          return (
            <Link
              key={project.id}
              href={`/projects/active/${project.id}`}
              className="block rounded-lg border border-border bg-surface p-4 shadow-sm transition-colors hover:border-brand-tan"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-medium text-brand-navy">{project.name}</div>
                  <div className="text-xs text-status-neutral">{project.client}</div>
                </div>
                <StatusPill status={meta.pill} label={meta.label} />
              </div>

              <div className="mt-3 text-xs text-status-neutral">Stage: {project.stage}</div>

              <div className="mt-3">
                <div className="mb-1 flex justify-between text-xs text-status-neutral">
                  <span>Budget health</span>
                  <span>
                    ${project.budgetSpent.toLocaleString()} / ${project.budget.toLocaleString()} ({spentPct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={`h-full rounded-full ${spentPct > 90 ? "bg-status-critical" : "bg-brand-blue"}`}
                    style={{ width: `${Math.min(spentPct, 100)}%` }}
                  />
                </div>
              </div>

              <div className="mt-3 text-xs text-status-neutral">
                Next: <span className="text-brand-navy">{project.nextMilestone}</span> ·{" "}
                {new Date(project.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

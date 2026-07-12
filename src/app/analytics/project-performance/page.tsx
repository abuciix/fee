import { Card, PageHeader, StatTile, StatusPill } from "@/components/ui";
import { BarList } from "@/components/analytics/charts";
import { PROJECT_STATUS_META } from "@/lib/project-data";
import { getProjects } from "@/lib/project-queries";
import { ON_TIME_DELIVERY, formatUSD } from "@/lib/analytics-data";

export const metadata = { title: "Project Performance" };

export default async function ProjectPerformancePage() {
  const projects = await getProjects();

  const budgetRows = [...projects]
    .map((p) => ({
      label: p.name,
      value: Math.round((p.budgetSpent / p.budget) * 100),
      valueLabel: `${Math.round((p.budgetSpent / p.budget) * 100)}% of ${formatUSD(p.budget)}`,
    }))
    .sort((a, b) => b.value - a.value);

  const flaggedProjects = projects
    .filter((p) => p.status === "at_risk" || p.status === "delayed")
    .sort((a, b) => (a.status === b.status ? 0 : a.status === "delayed" ? -1 : 1));

  return (
    <div>
      <PageHeader
        icon="📊"
        title="Project Performance"
        description="How individual projects are tracking against plan."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="On-Time Delivery Rate"
          value={`${ON_TIME_DELIVERY.ratePct}%`}
          hint={`${ON_TIME_DELIVERY.onTime} of ${ON_TIME_DELIVERY.delivered} projects, ${ON_TIME_DELIVERY.periodLabel}`}
        />
        <StatTile
          label="Active Projects"
          value={String(projects.length)}
          hint={`${flaggedProjects.length} flagged for risk or delay`}
        />
        <StatTile
          label="Avg. Budget Spent"
          value={`${Math.round(budgetRows.reduce((s, r) => s + r.value, 0) / budgetRows.length)}%`}
          hint="across active portfolio"
        />
        <StatTile
          label="At Risk / Delayed"
          value={String(flaggedProjects.length)}
          hint="need attention this week"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Budget Spent by Project</h3>
            <span className="text-xs text-status-neutral">% of contracted budget</span>
          </div>
          <BarList rows={budgetRows} max={100} />
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Flagged Projects</h3>
          {flaggedProjects.length === 0 ? (
            <p className="text-sm text-status-neutral">No projects are currently at risk or delayed.</p>
          ) : (
            <ul className="space-y-4">
              {flaggedProjects.map((project) => {
                const meta = PROJECT_STATUS_META[project.status];
                const spentPct = Math.round((project.budgetSpent / project.budget) * 100);
                return (
                  <li key={project.id}>
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-medium text-brand-navy">{project.name}</div>
                        <div className="text-xs text-status-neutral">
                          {project.leadArchitect} · {spentPct}% spent
                        </div>
                      </div>
                      <StatusPill status={meta.pill} label={meta.label} />
                    </div>
                    <div className="mt-1 text-xs text-status-neutral">
                      Next: <span className="text-brand-navy">{project.nextMilestone}</span> ·{" "}
                      {new Date(project.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        Project figures are live from the database. Delivery-rate and other portfolio benchmarks are
        still sample data pending a full analytics data migration.
      </p>
    </div>
  );
}

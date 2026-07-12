import { Card, PageHeader, StatTile, StatusPill } from "@/components/ui";
import { getProjects } from "@/lib/project-queries";

export const metadata = { title: "Project Cost Control" };

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function burnStatus(spentPct: number): { status: "good" | "warning" | "critical"; label: string } {
  if (spentPct > 100) return { status: "critical", label: "Over budget" };
  if (spentPct >= 80) return { status: "warning", label: "Near limit" };
  return { status: "good", label: "On budget" };
}

export default async function ProjectCostControlPage() {
  const projects = await getProjects();
  const totalBudget = projects.reduce((sum, p) => sum + p.budget, 0);
  const totalSpent = projects.reduce((sum, p) => sum + p.budgetSpent, 0);
  const overBudgetCount = projects.filter((p) => p.budgetSpent > p.budget).length;

  return (
    <div>
      <PageHeader
        icon="📊"
        title="Project Cost Control"
        description="Budget vs. actual tracking for every active project."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Total Budget" value={formatCurrency(totalBudget)} hint={`across ${projects.length} projects`} />
        <StatTile
          label="Total Spent"
          value={formatCurrency(totalSpent)}
          hint={`${Math.round((totalSpent / totalBudget) * 100)}% of total budget`}
        />
        <StatTile
          label="Projects Over Budget"
          value={String(overBudgetCount)}
          hint={overBudgetCount === 0 ? "None currently" : "Needs review"}
        />
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Stage</th>
              <th className="px-4 py-3 font-medium">Budget</th>
              <th className="px-4 py-3 font-medium">Spent</th>
              <th className="px-4 py-3 font-medium">Spend %</th>
              <th className="px-4 py-3 font-medium">Burn</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => {
              const spentPct = Math.round((project.budgetSpent / project.budget) * 100);
              const burn = burnStatus(spentPct);
              return (
                <tr key={project.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <div className="font-medium text-brand-navy">{project.name}</div>
                    <div className="text-xs text-status-neutral">{project.client}</div>
                  </td>
                  <td className="px-4 py-3 text-status-neutral">{project.stage}</td>
                  <td className="px-4 py-3 text-brand-navy">{formatCurrency(project.budget)}</td>
                  <td className="px-4 py-3 text-brand-navy">{formatCurrency(project.budgetSpent)}</td>
                  <td className="px-4 py-3">
                    <div className="mb-1 text-xs text-status-neutral">{spentPct}%</div>
                    <div className="h-1.5 w-28 overflow-hidden rounded-full bg-surface-muted">
                      <div
                        className={`h-full rounded-full ${
                          burn.status === "critical"
                            ? "bg-status-critical"
                            : burn.status === "warning"
                              ? "bg-status-warning"
                              : "bg-brand-blue"
                        }`}
                        style={{ width: `${Math.min(spentPct, 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusPill status={burn.status} label={burn.label} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>

      <p className="mt-4 text-xs text-status-neutral">
        Burn indicator: on budget below 80% spent, near limit between 80–100%, over budget above 100% of the approved
        budget.
      </p>
    </div>
  );
}

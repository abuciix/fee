import { Card, PageHeader, StatTile } from "@/components/ui";
import { StackedBarRow } from "@/components/analytics/charts";
import { TEAM_HOURS_BY_DISCIPLINE, TEAM_HOURS_BY_PERSON, TEAM_UTILIZATION_STATS } from "@/lib/analytics-data";

export const metadata = { title: "Team Performance" };

const disciplineRows = TEAM_HOURS_BY_DISCIPLINE.map((d) => ({
  label: d.discipline,
  a: d.billableHours,
  b: d.nonBillableHours,
}));

const personRows = [...TEAM_HOURS_BY_PERSON].sort(
  (a, b) => b.billableHours / (b.billableHours + b.nonBillableHours) - a.billableHours / (a.billableHours + a.nonBillableHours),
);

export default function TeamPerformancePage() {
  return (
    <div>
      <PageHeader
        icon="📊"
        title="Team Performance"
        description="Utilization and output across the team."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Studio Utilization"
          value={`${TEAM_UTILIZATION_STATS.studioUtilizationPct}%`}
          hint={`target ${TEAM_UTILIZATION_STATS.targetUtilizationPct}%`}
        />
        <StatTile
          label="Billable Hours"
          value={TEAM_UTILIZATION_STATS.billableHoursMonth.toLocaleString()}
          hint="this month"
        />
        <StatTile
          label="Non-Billable Hours"
          value={TEAM_UTILIZATION_STATS.nonBillableHoursMonth.toLocaleString()}
          hint="this month"
        />
        <StatTile
          label="Team Members"
          value={String(TEAM_HOURS_BY_PERSON.length)}
          hint={`across ${TEAM_HOURS_BY_DISCIPLINE.length} disciplines`}
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-1 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Hours by Discipline</h3>
          </div>
          <p className="mb-4 text-xs text-status-neutral">This month, billable vs. non-billable hours logged.</p>
          <StackedBarRow rows={disciplineRows} aLabel="Billable" bLabel="Non-billable" />
        </Card>

        <Card>
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Utilization by Person</h3>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs text-status-neutral">
                  <th className="pb-2 font-medium">Name</th>
                  <th className="pb-2 font-medium">Discipline</th>
                  <th className="pb-2 text-right font-medium">Billable</th>
                  <th className="pb-2 text-right font-medium">Non-billable</th>
                  <th className="pb-2 text-right font-medium">Utilization</th>
                </tr>
              </thead>
              <tbody>
                {personRows.map((p) => {
                  const total = p.billableHours + p.nonBillableHours;
                  const util = Math.round((p.billableHours / total) * 100);
                  return (
                    <tr key={p.name} className="border-b border-border last:border-0">
                      <td className="py-2 text-brand-navy">{p.name}</td>
                      <td className="py-2 text-status-neutral">{p.discipline}</td>
                      <td className="py-2 text-right tabular-nums text-status-neutral">{p.billableHours}h</td>
                      <td className="py-2 text-right tabular-nums text-status-neutral">{p.nonBillableHours}h</td>
                      <td className="py-2 text-right tabular-nums font-medium text-brand-navy">{util}%</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        Figures shown are sample data for layout purposes and will be replaced once the system is connected to live data.
      </p>
    </div>
  );
}

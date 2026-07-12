import { Card, PageHeader, StatTile } from "@/components/ui";
import { ColumnChart } from "@/components/analytics/charts";
import { BUSINESS_KPIS, BUSINESS_TREND_NOTE, QUARTERLY_REVENUE, formatUSD } from "@/lib/analytics-data";

export const metadata = { title: "Business Dashboard" };

const revenueRows = QUARTERLY_REVENUE.map((q) => ({
  label: q.quarter,
  value: q.revenue,
  valueLabel: formatUSD(q.revenue),
}));

export default function BusinessDashboardPage() {
  return (
    <div>
      <PageHeader
        icon="📊"
        title="Business Dashboard"
        description="Top-line KPIs for the whole studio."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Trailing Revenue"
          value={formatUSD(BUSINESS_KPIS.trailingRevenue)}
          hint="last 4 quarters"
        />
        <StatTile
          label="Pipeline Value"
          value={formatUSD(BUSINESS_KPIS.pipelineValue)}
          hint="12 open opportunities"
        />
        <StatTile
          label="Team Utilization"
          value={`${BUSINESS_KPIS.utilizationPct}%`}
          hint="last 30 days"
        />
        <StatTile
          label="Active Projects"
          value={String(BUSINESS_KPIS.activeProjects)}
          hint="across the live portfolio"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Revenue by Quarter</h3>
            <span className="text-xs text-status-neutral">USD, billed</span>
          </div>
          <ColumnChart rows={revenueRows} />
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Trend Note</h3>
          <p className="text-sm text-foreground">{BUSINESS_TREND_NOTE}</p>
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        Figures shown are sample data for layout purposes and will be replaced once the system is connected to live data.
      </p>
    </div>
  );
}

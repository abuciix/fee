import { Card, PageHeader, StatTile } from "@/components/ui";
import { BarList } from "@/components/analytics/charts";
import { PIPELINE_BY_STAGE, SALES_STATS, WIN_RATE_BY_SOURCE, formatUSD } from "@/lib/analytics-data";

export const metadata = { title: "Sales Analytics" };

const pipelineRows = PIPELINE_BY_STAGE.map((s) => ({
  label: s.stage,
  value: s.value,
  valueLabel: `${formatUSD(s.value)} · ${s.count} opp.`,
}));

const winRateRows = WIN_RATE_BY_SOURCE.map((w) => ({
  label: w.source,
  value: w.winRatePct,
  valueLabel: `${w.winRatePct}%`,
}));

export default function SalesAnalyticsPage() {
  return (
    <div>
      <PageHeader
        icon="📊"
        title="Sales Analytics"
        description="Pipeline conversion and business development performance."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="Pipeline Value" value={formatUSD(SALES_STATS.pipelineTotal)} hint="all open stages" />
        <StatTile label="Win Rate" value={`${SALES_STATS.winRatePct}%`} hint="trailing 12 months" />
        <StatTile
          label="Proposal → Signed"
          value={`${SALES_STATS.avgProposalToSignedDays} days`}
          hint="average conversion time"
        />
        <StatTile label="Open Opportunities" value={String(SALES_STATS.openOpportunities)} hint="pre-signature" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Pipeline Value by Stage</h3>
          </div>
          <BarList rows={pipelineRows} />
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Win Rate by Lead Source</h3>
          </div>
          <BarList rows={winRateRows} max={100} />
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        Figures shown are sample data for layout purposes and will be replaced once the system is connected to live data.
      </p>
    </div>
  );
}

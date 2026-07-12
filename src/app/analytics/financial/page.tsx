import { Card, PageHeader, StatTile } from "@/components/ui";
import { ColumnChart, DivergingBarList, SvgLineChart } from "@/components/analytics/charts";
import { CASH_FLOW_NOTE, MONTHLY_FINANCIALS, PROJECT_PROFITABILITY, formatUSD } from "@/lib/analytics-data";

export const metadata = { title: "Financial Analytics" };

const revenueRows = MONTHLY_FINANCIALS.map((m) => ({
  label: m.month,
  value: m.revenue,
  valueLabel: formatUSD(m.revenue),
}));

const marginPoints = MONTHLY_FINANCIALS.map((m) => ({ label: m.month, value: m.marginPct }));

const profitabilityRows = PROJECT_PROFITABILITY.map((p) => ({ label: p.name, marginPct: p.marginPct }));

const avgMargin = Math.round(
  MONTHLY_FINANCIALS.reduce((s, m) => s + m.marginPct, 0) / MONTHLY_FINANCIALS.length,
);
const sixMonthRevenue = MONTHLY_FINANCIALS.reduce((s, m) => s + m.revenue, 0);

export default function FinancialAnalyticsPage() {
  return (
    <div>
      <PageHeader
        icon="📊"
        title="Financial Analytics"
        description="Deeper financial trends across the studio."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile label="6-Month Revenue" value={formatUSD(sixMonthRevenue)} hint="Feb – Jul 2026" />
        <StatTile label="Average Margin" value={`${avgMargin}%`} hint="Feb – Jul 2026" />
        <StatTile
          label="Latest Month Margin"
          value={`${MONTHLY_FINANCIALS[MONTHLY_FINANCIALS.length - 1].marginPct}%`}
          hint="July 2026, month to date"
        />
        <StatTile
          label="Projects Below Cost"
          value={String(PROJECT_PROFITABILITY.filter((p) => p.marginPct < 0).length)}
          hint="of 6 tracked projects"
        />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Monthly Revenue</h3>
            <span className="text-xs text-status-neutral">USD, billed</span>
          </div>
          <ColumnChart rows={revenueRows} />
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Margin Trend</h3>
            <span className="text-xs text-status-neutral">% of revenue</span>
          </div>
          <SvgLineChart points={marginPoints} valueSuffix="%" />
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Project Profitability</h3>
            <span className="text-xs text-status-neutral">margin % by project</span>
          </div>
          <DivergingBarList rows={profitabilityRows} />
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Cash Flow Note</h3>
          <p className="text-sm text-foreground">{CASH_FLOW_NOTE}</p>
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        Figures shown are sample data for layout purposes and will be replaced once the system is connected to live data.
      </p>
    </div>
  );
}

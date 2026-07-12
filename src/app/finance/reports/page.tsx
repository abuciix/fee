import { Card, PageHeader, StatTile } from "@/components/ui";
import { EXPENSES, INVOICES, PAYROLL } from "@/lib/finance-data";

export const metadata = { title: "Financial Reports" };

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

const QUARTER_START = "2026-07-01";
const CASH_ON_HAND = 512000;

const quarterInvoices = INVOICES.filter((i) => i.status !== "draft" && i.issueDate >= QUARTER_START);
const revenueThisQuarter = quarterInvoices.reduce((sum, i) => sum + i.amount, 0);

const quarterExpenses = EXPENSES.filter((e) => e.date >= QUARTER_START);
const expensesThisQuarter = quarterExpenses.reduce((sum, e) => sum + e.amount, 0);

const monthlyPayroll = PAYROLL.reduce((sum, p) => sum + p.monthlyCompensation, 0);
const quarterlyPayroll = monthlyPayroll * 3;

const totalCosts = expensesThisQuarter + quarterlyPayroll;
const netMargin = revenueThisQuarter - totalCosts;
const netMarginPct = revenueThisQuarter > 0 ? Math.round((netMargin / revenueThisQuarter) * 100) : 0;

const revenueByProject = Array.from(new Set(INVOICES.map((i) => i.project)))
  .map((project) => ({
    project,
    amount: INVOICES.filter((i) => i.project === project && i.status !== "draft").reduce(
      (sum, i) => sum + i.amount,
      0
    ),
  }))
  .sort((a, b) => b.amount - a.amount);

const maxProjectRevenue = Math.max(...revenueByProject.map((r) => r.amount));

export default function FinancialReportsPage() {
  return (
    <div>
      <PageHeader
        icon="📈"
        title="Financial Reports"
        description="Studio-wide financial reporting and forecasting."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Revenue This Quarter"
          value={formatCurrency(revenueThisQuarter)}
          hint={`${quarterInvoices.length} invoices issued in Q3 2026`}
        />
        <StatTile
          label="Studio Expenses"
          value={formatCurrency(expensesThisQuarter)}
          hint="Captured this quarter, excludes payroll"
        />
        <StatTile
          label="Net Margin"
          value={`${netMarginPct}%`}
          hint={`${formatCurrency(netMargin)} after payroll & expenses`}
        />
        <StatTile label="Cash on Hand" value={formatCurrency(CASH_ON_HAND)} hint="As of Jul 12, 2026" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Invoiced Revenue by Project</h3>
          <ul className="space-y-3">
            {revenueByProject.map((row) => (
              <li key={row.project}>
                <div className="mb-1 flex justify-between text-xs text-status-neutral">
                  <span>{row.project}</span>
                  <span>{formatCurrency(row.amount)}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-brand-blue"
                    style={{ width: `${maxProjectRevenue > 0 ? (row.amount / maxProjectRevenue) * 100 : 0}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-status-neutral">
            Sent, overdue, and paid invoices issued to date; draft invoices excluded.
          </p>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Q3 2026 P&amp;L Snapshot</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Revenue</dt>
              <dd className="text-brand-navy">{formatCurrency(revenueThisQuarter)}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Payroll (3 mo.)</dt>
              <dd className="text-brand-navy">{formatCurrency(quarterlyPayroll)}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Studio Expenses</dt>
              <dd className="text-brand-navy">{formatCurrency(expensesThisQuarter)}</dd>
            </div>
            <div className="flex justify-between pb-2">
              <dt className="font-medium text-brand-navy">Net Margin</dt>
              <dd className="font-medium text-brand-navy">{formatCurrency(netMargin)}</dd>
            </div>
          </dl>
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        Figures shown are sample data for layout purposes and will be replaced once the system is connected to live
        accounting data.
      </p>
    </div>
  );
}

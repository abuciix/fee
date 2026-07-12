import { Card, PageHeader, StatTile, StatusPill } from "@/components/ui";
import { PAYROLL_STATUS_META } from "@/lib/finance-data";
import { getPayrollRuns } from "@/lib/finance-queries";

export const metadata = { title: "Payroll" };

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default async function PayrollPage() {
  const payroll = await getPayrollRuns();
  const totalMonthly = payroll.reduce((sum, p) => sum + p.monthlyCompensation, 0);
  const processedCount = payroll.filter((p) => p.lastRunStatus === "processed").length;

  return (
    <div>
      <PageHeader
        icon="🧮"
        title="Payroll"
        description="Studio payroll runs and compensation records."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Monthly Payroll" value={formatCurrency(totalMonthly)} hint={`${payroll.length} team members`} />
        <StatTile label="Last Run Processed" value={`${processedCount} of ${payroll.length}`} hint="June 28, 2026 cycle" />
        <StatTile label="Next Run" value="Jul 31, 2026" hint="Scheduled" />
      </div>

      <Card className="mt-6 overflow-x-auto p-0">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role</th>
              <th className="px-4 py-3 font-medium">Monthly Compensation</th>
              <th className="px-4 py-3 font-medium">Last Run</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {payroll.map((person) => {
              const meta = PAYROLL_STATUS_META[person.lastRunStatus];
              return (
                <tr key={person.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-brand-navy">{person.name}</td>
                  <td className="px-4 py-3 text-status-neutral">{person.role}</td>
                  <td className="px-4 py-3 text-brand-navy">{formatCurrency(person.monthlyCompensation)}</td>
                  <td className="px-4 py-3 text-status-neutral">{formatDate(person.lastRunDate)}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={meta.pill} label={meta.label} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

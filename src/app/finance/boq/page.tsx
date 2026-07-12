import { Card, PageHeader, StatTile } from "@/components/ui";
import { BOQ_ITEMS, boqProjectTotal, boqTotal } from "@/lib/finance-data";

export const metadata = { title: "BOQ & Estimation" };

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

const PROJECTS_IN_BOQ = Array.from(new Set(BOQ_ITEMS.map((item) => item.project)));

export default function BOQPage() {
  const grandTotal = PROJECTS_IN_BOQ.reduce((sum, project) => sum + boqProjectTotal(project), 0);

  return (
    <div>
      <PageHeader
        icon="📐"
        title="BOQ & Estimation"
        description="Bills of quantities and cost estimation for projects."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Sample Projects" value={String(PROJECTS_IN_BOQ.length)} hint="representative BOQ shown" />
        <StatTile label="Combined Estimate" value={formatCurrency(grandTotal)} hint="line items below" />
        <StatTile label="Line Items" value={String(BOQ_ITEMS.length)} hint="across both projects" />
      </div>

      <div className="mt-6 space-y-6">
        {PROJECTS_IN_BOQ.map((project) => {
          const items = BOQ_ITEMS.filter((item) => item.project === project);
          const projectTotal = boqProjectTotal(project);
          return (
            <Card key={project} className="overflow-x-auto p-0">
              <div className="flex items-center justify-between border-b border-border p-4">
                <h3 className="text-sm font-semibold text-brand-navy">{project}</h3>
                <span className="text-sm text-brand-navy">{formatCurrency(projectTotal)}</span>
              </div>
              <table className="w-full min-w-[720px] text-left text-sm">
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Description</th>
                    <th className="px-4 py-3 font-medium">Unit</th>
                    <th className="px-4 py-3 font-medium">Qty</th>
                    <th className="px-4 py-3 font-medium">Unit Cost</th>
                    <th className="px-4 py-3 font-medium">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 text-status-neutral">{item.category}</td>
                      <td className="px-4 py-3 font-medium text-brand-navy">{item.description}</td>
                      <td className="px-4 py-3 text-status-neutral">{item.unit}</td>
                      <td className="px-4 py-3 text-status-neutral">{item.quantity.toLocaleString()}</td>
                      <td className="px-4 py-3 text-status-neutral">{formatCurrency(item.unitCost)}</td>
                      <td className="px-4 py-3 text-brand-navy">{formatCurrency(boqTotal(item))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-status-neutral">
        Showing a representative BOQ for two sample projects rather than the full studio portfolio.
      </p>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Card, PageHeader, StatTile, StatusPill } from "@/components/ui";
import { INVOICES, INVOICE_STATUS_META, type InvoiceStatus } from "@/lib/finance-data";

const STATUS_FILTERS: Array<"All" | InvoiceStatus> = ["All", "draft", "sent", "paid", "overdue"];

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function InvoicesView() {
  const [status, setStatus] = useState<"All" | InvoiceStatus>("All");
  const [search, setSearch] = useState("");

  const outstanding = useMemo(
    () => INVOICES.filter((i) => i.status === "sent" || i.status === "overdue").reduce((sum, i) => sum + i.amount, 0),
    []
  );
  const overdueAmount = useMemo(
    () => INVOICES.filter((i) => i.status === "overdue").reduce((sum, i) => sum + i.amount, 0),
    []
  );
  const paidThisMonth = useMemo(
    () =>
      INVOICES.filter((i) => i.status === "paid" && i.paidDate?.startsWith("2026-07")).reduce(
        (sum, i) => sum + i.amount,
        0
      ),
    []
  );

  const filtered = useMemo(() => {
    return INVOICES.filter((i) => {
      if (status !== "All" && i.status !== status) return false;
      if (search && !`${i.client} ${i.project} ${i.number}`.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [status, search]);

  return (
    <div>
      <PageHeader
        icon="💰"
        title="Invoices & Payments"
        description="Issue invoices and track payment status."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile
          label="Total Outstanding"
          value={formatCurrency(outstanding)}
          hint={`${INVOICES.filter((i) => i.status === "sent" || i.status === "overdue").length} unpaid invoices`}
        />
        <StatTile
          label="Overdue Amount"
          value={formatCurrency(overdueAmount)}
          hint={`${INVOICES.filter((i) => i.status === "overdue").length} invoices past due`}
        />
        <StatTile label="Paid This Month" value={formatCurrency(paidThisMonth)} hint="July 2026" />
      </div>

      <div className="mt-6 mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          placeholder="Search client, project, or invoice #…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "All" | InvoiceStatus)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : INVOICE_STATUS_META[s].label}
            </option>
          ))}
        </select>
        <div className="text-xs text-status-neutral">
          {filtered.length} of {INVOICES.length} invoices
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Issued</th>
              <th className="px-4 py-3 font-medium">Due</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-status-neutral">
                  No invoices match these filters.
                </td>
              </tr>
            ) : (
              filtered.map((invoice) => {
                const meta = INVOICE_STATUS_META[invoice.status];
                return (
                  <tr key={invoice.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-brand-navy">{invoice.number}</td>
                    <td className="px-4 py-3 text-foreground">{invoice.client}</td>
                    <td className="px-4 py-3 text-status-neutral">{invoice.project}</td>
                    <td className="px-4 py-3 text-brand-navy">{formatCurrency(invoice.amount)}</td>
                    <td className="px-4 py-3 text-status-neutral">{formatDate(invoice.issueDate)}</td>
                    <td className="px-4 py-3 text-status-neutral">{formatDate(invoice.dueDate)}</td>
                    <td className="px-4 py-3">
                      <StatusPill status={meta.pill} label={meta.label} />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { Card, PageHeader, StatTile, StatusPill } from "@/components/ui";
import { EXPENSES, EXPENSE_APPROVAL_META, type ExpenseApprovalStatus } from "@/lib/finance-data";

const APPROVAL_FILTERS: Array<"All" | ExpenseApprovalStatus> = ["All", "pending", "approved", "rejected"];
const CATEGORIES = ["All", ...Array.from(new Set(EXPENSES.map((e) => e.category)))];

function formatCurrency(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function ExpensesView() {
  const [approval, setApproval] = useState<"All" | ExpenseApprovalStatus>("All");
  const [category, setCategory] = useState("All");

  const totalThisMonth = useMemo(
    () => EXPENSES.filter((e) => e.date.startsWith("2026-07")).reduce((sum, e) => sum + e.amount, 0),
    []
  );
  const pendingApproval = useMemo(
    () => EXPENSES.filter((e) => e.approvalStatus === "pending").reduce((sum, e) => sum + e.amount, 0),
    []
  );
  const reimbursableDue = useMemo(
    () =>
      EXPENSES.filter((e) => e.reimbursable && e.approvalStatus === "approved").reduce(
        (sum, e) => sum + e.amount,
        0
      ),
    []
  );

  const filtered = useMemo(() => {
    return EXPENSES.filter((e) => {
      if (approval !== "All" && e.approvalStatus !== approval) return false;
      if (category !== "All" && e.category !== category) return false;
      return true;
    });
  }, [approval, category]);

  return (
    <div>
      <PageHeader
        icon="🧾"
        title="Expenses"
        description="Studio and project expense tracking and approvals."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <StatTile label="Expenses This Month" value={formatCurrency(totalThisMonth)} hint="July 2026" />
        <StatTile
          label="Pending Approval"
          value={formatCurrency(pendingApproval)}
          hint={`${EXPENSES.filter((e) => e.approvalStatus === "pending").length} expenses awaiting review`}
        />
        <StatTile label="Reimbursable (Approved)" value={formatCurrency(reimbursableDue)} hint="Due to staff" />
      </div>

      <div className="mt-6 mb-4 flex flex-wrap items-center gap-3">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All categories" : c}
            </option>
          ))}
        </select>
        <select
          value={approval}
          onChange={(e) => setApproval(e.target.value as "All" | ExpenseApprovalStatus)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {APPROVAL_FILTERS.map((a) => (
            <option key={a} value={a}>
              {a === "All" ? "All approval statuses" : EXPENSE_APPROVAL_META[a].label}
            </option>
          ))}
        </select>
        <div className="text-xs text-status-neutral">
          {filtered.length} of {EXPENSES.length} expenses
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
              <th className="px-4 py-3 font-medium">Description</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Reimbursable</th>
              <th className="px-4 py-3 font-medium">Submitted By</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-status-neutral">
                  No expenses match these filters.
                </td>
              </tr>
            ) : (
              filtered.map((expense) => {
                const meta = EXPENSE_APPROVAL_META[expense.approvalStatus];
                return (
                  <tr key={expense.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-brand-navy">{expense.description}</td>
                    <td className="px-4 py-3 text-status-neutral">{expense.category}</td>
                    <td className="px-4 py-3 text-status-neutral">{expense.project ?? "Studio-wide"}</td>
                    <td className="px-4 py-3 text-brand-navy">{formatCurrency(expense.amount)}</td>
                    <td className="px-4 py-3 text-status-neutral">{expense.reimbursable ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 text-status-neutral">{expense.submittedBy}</td>
                    <td className="px-4 py-3 text-status-neutral">{formatDate(expense.date)}</td>
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

import "server-only";
import { prisma } from "./db";
import type {
  BOQItem,
  Expense,
  ExpenseApprovalStatus,
  Invoice,
  InvoiceStatus,
  PayrollRecord,
  PayrollRunStatus,
} from "./finance-data";

function toInvoice(row: {
  id: string;
  number: string;
  amount: number;
  status: string;
  issueDate: Date;
  dueDate: Date;
  paidDate: Date | null;
  client: { company: string };
  project: { name: string } | null;
}): Invoice {
  return {
    id: row.id,
    number: row.number,
    client: row.client.company,
    project: row.project?.name ?? "",
    amount: row.amount,
    status: row.status as InvoiceStatus,
    issueDate: row.issueDate.toISOString().slice(0, 10),
    dueDate: row.dueDate.toISOString().slice(0, 10),
    paidDate: row.paidDate ? row.paidDate.toISOString().slice(0, 10) : undefined,
  };
}

function toExpense(row: {
  id: string;
  description: string;
  category: string;
  amount: number;
  reimbursable: boolean;
  approvalStatus: string;
  date: Date;
  project: { name: string } | null;
  submittedBy: { name: string } | null;
}): Expense {
  return {
    id: row.id,
    description: row.description,
    category: row.category,
    project: row.project?.name,
    amount: row.amount,
    reimbursable: row.reimbursable,
    approvalStatus: row.approvalStatus as ExpenseApprovalStatus,
    submittedBy: row.submittedBy?.name ?? "Unassigned",
    date: row.date.toISOString().slice(0, 10),
  };
}

function toPayrollRecord(row: {
  id: string;
  monthlyCompensation: number;
  lastRunDate: Date;
  lastRunStatus: string;
  user: { name: string; title: string };
}): PayrollRecord {
  return {
    id: row.id,
    name: row.user.name,
    role: row.user.title,
    monthlyCompensation: row.monthlyCompensation,
    lastRunDate: row.lastRunDate.toISOString().slice(0, 10),
    lastRunStatus: row.lastRunStatus as PayrollRunStatus,
  };
}

function toBOQItem(row: {
  id: string;
  category: string;
  description: string;
  unit: string;
  quantity: number;
  unitCost: number;
  project: { name: string };
}): BOQItem {
  return {
    id: row.id,
    project: row.project.name,
    category: row.category,
    description: row.description,
    unit: row.unit,
    quantity: row.quantity,
    unitCost: row.unitCost,
  };
}

export async function getInvoices(): Promise<Invoice[]> {
  const rows = await prisma.invoice.findMany({
    include: { client: true, project: true },
    orderBy: { id: "asc" },
  });
  return rows.map(toInvoice);
}

export async function getExpenses(): Promise<Expense[]> {
  const rows = await prisma.expense.findMany({
    include: { project: true, submittedBy: true },
    orderBy: { id: "asc" },
  });
  return rows.map(toExpense);
}

export async function getPayrollRuns(): Promise<PayrollRecord[]> {
  const rows = await prisma.payrollRun.findMany({
    include: { user: true },
    orderBy: { id: "asc" },
  });
  return rows.map(toPayrollRecord);
}

export async function getBoqItems(): Promise<BOQItem[]> {
  const rows = await prisma.bOQItem.findMany({
    include: { project: true },
    orderBy: { id: "asc" },
  });
  return rows.map(toBOQItem);
}

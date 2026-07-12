// Mock data for the Finance & Administration section.
// Mirrors the style of `src/lib/project-data.ts` — typed arrays plus small
// helper/meta objects. Client and project names intentionally match the
// records in `project-data.ts` for narrative consistency; this module does
// not import from or duplicate the actual project budget fields (those are
// read directly from `project-data.ts` on the cost-control page).

// ---------------------------------------------------------------------------
// Invoices & Payments
// ---------------------------------------------------------------------------

export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type Invoice = {
  id: string;
  number: string;
  client: string;
  project: string;
  amount: number;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidDate?: string;
};

export const INVOICES: Invoice[] = [
  {
    id: "inv-1031",
    number: "INV-1031",
    client: "Al Rayan Group",
    project: "Marina Tower",
    amount: 84000,
    status: "paid",
    issueDate: "2026-06-01",
    dueDate: "2026-06-15",
    paidDate: "2026-06-10",
  },
  {
    id: "inv-1032",
    number: "INV-1032",
    client: "Falcon Education Trust",
    project: "Greenfield Campus",
    amount: 120000,
    status: "overdue",
    issueDate: "2026-06-05",
    dueDate: "2026-06-20",
  },
  {
    id: "inv-1033",
    number: "INV-1033",
    client: "Al Noor Development",
    project: "Al Noor Residences",
    amount: 46500,
    status: "sent",
    issueDate: "2026-06-25",
    dueDate: "2026-07-25",
  },
  {
    id: "inv-1034",
    number: "INV-1034",
    client: "Harbor Capital",
    project: "Harbor View Offices",
    amount: 62000,
    status: "paid",
    issueDate: "2026-06-10",
    dueDate: "2026-06-24",
    paidDate: "2026-06-22",
  },
  {
    id: "inv-1035",
    number: "INV-1035",
    client: "Falcon Retail Group",
    project: "Falcon Retail Fitout",
    amount: 18500,
    status: "draft",
    issueDate: "2026-07-10",
    dueDate: "2026-08-09",
  },
  {
    id: "inv-1036",
    number: "INV-1036",
    client: "Oasis Hospitality",
    project: "Desert Oasis Resort",
    amount: 210000,
    status: "sent",
    issueDate: "2026-07-01",
    dueDate: "2026-07-31",
  },
  {
    id: "inv-1037",
    number: "INV-1037",
    client: "Ministry of Culture",
    project: "Central Library Renovation",
    amount: 32000,
    status: "sent",
    issueDate: "2026-07-05",
    dueDate: "2026-08-04",
  },
  {
    id: "inv-1038",
    number: "INV-1038",
    client: "Blue Horizon Properties",
    project: "Seaside Villas",
    amount: 95000,
    status: "overdue",
    issueDate: "2026-06-01",
    dueDate: "2026-06-30",
  },
  {
    id: "inv-1039",
    number: "INV-1039",
    client: "Al Rayan Group",
    project: "Marina Tower",
    amount: 54000,
    status: "paid",
    issueDate: "2026-07-01",
    dueDate: "2026-07-15",
    paidDate: "2026-07-08",
  },
  {
    id: "inv-1040",
    number: "INV-1040",
    client: "Harbor Capital",
    project: "Harbor View Offices",
    amount: 28000,
    status: "overdue",
    issueDate: "2026-06-15",
    dueDate: "2026-06-29",
  },
  {
    id: "inv-1041",
    number: "INV-1041",
    client: "Falcon Education Trust",
    project: "Greenfield Campus",
    amount: 75000,
    status: "draft",
    issueDate: "2026-07-11",
    dueDate: "2026-08-10",
  },
  {
    id: "inv-1042",
    number: "INV-1042",
    client: "Al Noor Development",
    project: "Al Noor Residences",
    amount: 38000,
    status: "paid",
    issueDate: "2026-06-18",
    dueDate: "2026-07-02",
    paidDate: "2026-06-29",
  },
  {
    id: "inv-1043",
    number: "INV-1043",
    client: "Oasis Hospitality",
    project: "Desert Oasis Resort",
    amount: 64000,
    status: "sent",
    issueDate: "2026-07-08",
    dueDate: "2026-08-07",
  },
  {
    id: "inv-1044",
    number: "INV-1044",
    client: "Ministry of Culture",
    project: "Central Library Renovation",
    amount: 12500,
    status: "paid",
    issueDate: "2026-07-02",
    dueDate: "2026-07-16",
    paidDate: "2026-07-11",
  },
];

export const INVOICE_STATUS_META: Record<
  InvoiceStatus,
  { label: string; pill: "good" | "warning" | "critical" | "neutral" }
> = {
  draft: { label: "Draft", pill: "neutral" },
  sent: { label: "Sent", pill: "warning" },
  paid: { label: "Paid", pill: "good" },
  overdue: { label: "Overdue", pill: "critical" },
};

// ---------------------------------------------------------------------------
// Expenses
// ---------------------------------------------------------------------------

export type ExpenseApprovalStatus = "pending" | "approved" | "rejected";

export type Expense = {
  id: string;
  description: string;
  category: string;
  project?: string;
  amount: number;
  reimbursable: boolean;
  approvalStatus: ExpenseApprovalStatus;
  submittedBy: string;
  date: string;
};

export const EXPENSES: Expense[] = [
  {
    id: "exp-2201",
    description: "Site visit travel — Doha",
    category: "Travel",
    project: "Marina Tower",
    amount: 640,
    reimbursable: true,
    approvalStatus: "approved",
    submittedBy: "Sara Haddad",
    date: "2026-07-02",
  },
  {
    id: "exp-2202",
    description: "Structural software license renewal",
    category: "Software & Licenses",
    amount: 3200,
    reimbursable: false,
    approvalStatus: "approved",
    submittedBy: "Nadia Fares",
    date: "2026-07-01",
  },
  {
    id: "exp-2203",
    description: "Facade material samples",
    category: "Materials & Samples",
    project: "Marina Tower",
    amount: 480,
    reimbursable: true,
    approvalStatus: "pending",
    submittedBy: "Sara Haddad",
    date: "2026-07-09",
  },
  {
    id: "exp-2204",
    description: "Construction site inspection — Riyadh",
    category: "Site Visit",
    project: "Greenfield Campus",
    amount: 910,
    reimbursable: true,
    approvalStatus: "approved",
    submittedBy: "Omar Nasser",
    date: "2026-06-28",
  },
  {
    id: "exp-2205",
    description: "Large-format plotting — CD set Rev B",
    category: "Printing & Reprographics",
    project: "Seaside Villas",
    amount: 265,
    reimbursable: false,
    approvalStatus: "approved",
    submittedBy: "Yusuf Al Amin",
    date: "2026-07-06",
  },
  {
    id: "exp-2206",
    description: "Heritage consultant meeting — taxi & parking",
    category: "Travel",
    project: "Central Library Renovation",
    amount: 95,
    reimbursable: true,
    approvalStatus: "pending",
    submittedBy: "Layla Kanaan",
    date: "2026-07-10",
  },
  {
    id: "exp-2207",
    description: "Office pantry & supplies — July",
    category: "Office & Admin",
    amount: 410,
    reimbursable: false,
    approvalStatus: "approved",
    submittedBy: "Rana Idris",
    date: "2026-07-03",
  },
  {
    id: "exp-2208",
    description: "MEP consultant coordination fee",
    category: "Consultant Fees",
    project: "Marina Tower",
    amount: 5400,
    reimbursable: false,
    approvalStatus: "approved",
    submittedBy: "Nadia Fares",
    date: "2026-06-30",
  },
  {
    id: "exp-2209",
    description: "Landscape reference trip — Al Ain",
    category: "Travel",
    project: "Desert Oasis Resort",
    amount: 1180,
    reimbursable: true,
    approvalStatus: "rejected",
    submittedBy: "Omar Nasser",
    date: "2026-06-25",
  },
  {
    id: "exp-2210",
    description: "Studio electricity & internet — July",
    category: "Utilities",
    amount: 720,
    reimbursable: false,
    approvalStatus: "approved",
    submittedBy: "Rana Idris",
    date: "2026-07-01",
  },
  {
    id: "exp-2211",
    description: "Submittal review binding & printing",
    category: "Printing & Reprographics",
    project: "Harbor View Offices",
    amount: 140,
    reimbursable: false,
    approvalStatus: "pending",
    submittedBy: "Karim Odeh",
    date: "2026-07-11",
  },
  {
    id: "exp-2212",
    description: "Interior finishes sample library restock",
    category: "Materials & Samples",
    project: "Al Noor Residences",
    amount: 860,
    reimbursable: true,
    approvalStatus: "approved",
    submittedBy: "Rana Idris",
    date: "2026-07-04",
  },
  {
    id: "exp-2213",
    description: "Punch list follow-up — mileage",
    category: "Travel",
    project: "Harbor View Offices",
    amount: 75,
    reimbursable: true,
    approvalStatus: "approved",
    submittedBy: "Karim Odeh",
    date: "2026-07-08",
  },
  {
    id: "exp-2214",
    description: "Concept presentation model materials",
    category: "Materials & Samples",
    project: "Falcon Retail Fitout",
    amount: 320,
    reimbursable: true,
    approvalStatus: "pending",
    submittedBy: "Sara Haddad",
    date: "2026-07-09",
  },
];

export const EXPENSE_APPROVAL_META: Record<
  ExpenseApprovalStatus,
  { label: string; pill: "good" | "warning" | "critical" | "neutral" }
> = {
  approved: { label: "Approved", pill: "good" },
  pending: { label: "Pending", pill: "warning" },
  rejected: { label: "Rejected", pill: "critical" },
};

// ---------------------------------------------------------------------------
// Payroll
// ---------------------------------------------------------------------------

export type PayrollRunStatus = "processed" | "pending" | "scheduled";

export type PayrollRecord = {
  id: string;
  name: string;
  role: string;
  monthlyCompensation: number;
  lastRunDate: string;
  lastRunStatus: PayrollRunStatus;
};

export const PAYROLL: PayrollRecord[] = [
  {
    id: "pay-01",
    name: "Rami Boustani",
    role: "Studio Principal",
    monthlyCompensation: 11500,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-02",
    name: "Sara Haddad",
    role: "Senior Architect",
    monthlyCompensation: 8200,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-03",
    name: "Omar Nasser",
    role: "Senior Architect",
    monthlyCompensation: 8000,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-04",
    name: "Layla Kanaan",
    role: "Design Architect",
    monthlyCompensation: 6400,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-05",
    name: "Yusuf Al Amin",
    role: "Design Architect",
    monthlyCompensation: 6200,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-06",
    name: "Nadia Fares",
    role: "MEP Coordinator",
    monthlyCompensation: 5600,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-07",
    name: "Karim Odeh",
    role: "Construction Administrator",
    monthlyCompensation: 5400,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-08",
    name: "Rana Idris",
    role: "Interior Designer",
    monthlyCompensation: 4800,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-09",
    name: "Huda Mansour",
    role: "Office Manager",
    monthlyCompensation: 4200,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-10",
    name: "Tariq Saleh",
    role: "Junior Architect",
    monthlyCompensation: 3600,
    lastRunDate: "2026-06-28",
    lastRunStatus: "processed",
  },
  {
    id: "pay-11",
    name: "Dana Khoury",
    role: "Accountant",
    monthlyCompensation: 4600,
    lastRunDate: "2026-07-31",
    lastRunStatus: "scheduled",
  },
];

export const PAYROLL_STATUS_META: Record<
  PayrollRunStatus,
  { label: string; pill: "good" | "warning" | "critical" | "neutral" }
> = {
  processed: { label: "Processed", pill: "good" },
  pending: { label: "Pending", pill: "warning" },
  scheduled: { label: "Scheduled", pill: "neutral" },
};

// ---------------------------------------------------------------------------
// BOQ & Estimation
// ---------------------------------------------------------------------------

export type BOQItem = {
  id: string;
  project: string;
  category: string;
  description: string;
  unit: string;
  quantity: number;
  unitCost: number;
};

export const BOQ_ITEMS: BOQItem[] = [
  // Marina Tower — sample BOQ
  { id: "boq-mt-01", project: "Marina Tower", category: "Concrete Works", description: "Reinforced concrete, columns & slabs", unit: "m³", quantity: 2400, unitCost: 145 },
  { id: "boq-mt-02", project: "Marina Tower", category: "Structural Steel", description: "Structural steel framing, roof canopy", unit: "ton", quantity: 180, unitCost: 1850 },
  { id: "boq-mt-03", project: "Marina Tower", category: "Facade & Glazing", description: "Curtain wall unitized glazing system", unit: "m²", quantity: 3600, unitCost: 320 },
  { id: "boq-mt-04", project: "Marina Tower", category: "Masonry", description: "Block partition walls, internal", unit: "m²", quantity: 5200, unitCost: 28 },
  { id: "boq-mt-05", project: "Marina Tower", category: "MEP", description: "HVAC ductwork & chiller plant allowance", unit: "ls", quantity: 1, unitCost: 610000 },
  { id: "boq-mt-06", project: "Marina Tower", category: "Finishes", description: "Lobby stone flooring & cladding", unit: "m²", quantity: 850, unitCost: 165 },
  { id: "boq-mt-07", project: "Marina Tower", category: "Joinery", description: "Custom reception & millwork joinery", unit: "ls", quantity: 1, unitCost: 92000 },

  // Al Noor Residences — sample BOQ
  { id: "boq-anr-01", project: "Al Noor Residences", category: "Concrete Works", description: "Reinforced concrete foundations & frame", unit: "m³", quantity: 1150, unitCost: 138 },
  { id: "boq-anr-02", project: "Al Noor Residences", category: "Masonry", description: "External & partition block walls", unit: "m²", quantity: 4100, unitCost: 26 },
  { id: "boq-anr-03", project: "Al Noor Residences", category: "Facade & Glazing", description: "Aluminum windows & sliding doors", unit: "m²", quantity: 980, unitCost: 210 },
  { id: "boq-anr-04", project: "Al Noor Residences", category: "Finishes", description: "Porcelain flooring, units & common areas", unit: "m²", quantity: 3200, unitCost: 42 },
  { id: "boq-anr-05", project: "Al Noor Residences", category: "MEP", description: "Plumbing & electrical rough-in, per unit", unit: "unit", quantity: 64, unitCost: 3400 },
  { id: "boq-anr-06", project: "Al Noor Residences", category: "Landscaping", description: "Podium landscaping & irrigation", unit: "m²", quantity: 1800, unitCost: 65 },
];

export function boqTotal(item: BOQItem): number {
  return item.quantity * item.unitCost;
}

export function boqProjectTotal(project: string): number {
  return BOQ_ITEMS.filter((i) => i.project === project).reduce((sum, i) => sum + boqTotal(i), 0);
}

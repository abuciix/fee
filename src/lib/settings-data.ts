// Mock data for the "Settings" section. Reference style: src/lib/project-data.ts

export type UserRole = "Admin" | "Architect" | "Accountant" | "Intern";
export type UserStatus = "Active" | "Invited" | "Deactivated";

export type StudioUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  lastActive: string;
};

export const USERS: StudioUser[] = [
  { id: "u1", name: "Sara Haddad", email: "sara.haddad@andalus-arch.com", role: "Admin", status: "Active", lastActive: "2026-07-12" },
  { id: "u2", name: "Omar Nasser", email: "omar.nasser@andalus-arch.com", role: "Architect", status: "Active", lastActive: "2026-07-11" },
  { id: "u3", name: "Layla Kanaan", email: "layla.kanaan@andalus-arch.com", role: "Architect", status: "Active", lastActive: "2026-07-12" },
  { id: "u4", name: "Yusuf Al Amin", email: "yusuf.alamin@andalus-arch.com", role: "Architect", status: "Active", lastActive: "2026-07-10" },
  { id: "u5", name: "Nadia Fares", email: "nadia.fares@andalus-arch.com", role: "Architect", status: "Active", lastActive: "2026-07-09" },
  { id: "u6", name: "Karim Odeh", email: "karim.odeh@andalus-arch.com", role: "Accountant", status: "Active", lastActive: "2026-07-08" },
  { id: "u7", name: "Rana Idris", email: "rana.idris@andalus-arch.com", role: "Intern", status: "Active", lastActive: "2026-07-11" },
  { id: "u8", name: "Hassan Malik", email: "hassan.malik@andalus-arch.com", role: "Intern", status: "Invited", lastActive: "—" },
  { id: "u9", name: "Dana Saab", email: "dana.saab@andalus-arch.com", role: "Accountant", status: "Invited", lastActive: "—" },
  { id: "u10", name: "Fadi Chamoun", email: "fadi.chamoun@andalus-arch.com", role: "Architect", status: "Deactivated", lastActive: "2026-03-02" },
];

export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  Admin: ["Full access to all modules", "Manage users and permissions", "Configure integrations and preferences"],
  Architect: ["Full access to projects, tasks, and drawings", "View client and finance summaries", "No access to payroll or user management"],
  Accountant: ["Full access to finance and invoicing modules", "Read-only access to project budgets", "No access to design tools or user management"],
  Intern: ["View assigned projects and tasks", "Limited edit access on assigned work", "No access to finance or settings"],
};

export const USER_STATUS_META: Record<UserStatus, { label: string; pill: "good" | "warning" | "critical" }> = {
  Active: { label: "Active", pill: "good" },
  Invited: { label: "Invited", pill: "warning" },
  Deactivated: { label: "Deactivated", pill: "critical" },
};

export type CompanyProfile = {
  studioName: string;
  legalEntity: string;
  address: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  brandGuidelinesUrl: string;
};

export const COMPANY_PROFILE: CompanyProfile = {
  studioName: "Andalus Architecture",
  legalEntity: "Andalus Architecture & Design Consultants LLC",
  address: "Building 14, Al Waha Business District",
  city: "Doha",
  country: "Qatar",
  phone: "+974 4444 5566",
  email: "studio@andalus-arch.com",
  website: "https://www.andalus-arch.com",
  brandGuidelinesUrl:
    "https://www.behance.net/gallery/183000731/Andalus-Architecture-Brand-Identity",
};

export type IntegrationCategory = "Accounting" | "Storage" | "BIM" | "Communication" | "Calendar";

export type Integration = {
  id: string;
  name: string;
  category: IntegrationCategory;
  description: string;
  icon: string;
  connected: boolean;
};

export const INTEGRATIONS: Integration[] = [
  { id: "int-1", name: "QuickBooks", category: "Accounting", description: "Sync invoices, payments, and expense records with QuickBooks Online.", icon: "💵", connected: true },
  { id: "int-2", name: "Google Drive", category: "Storage", description: "Store and share drawings, contracts, and project documents.", icon: "📁", connected: true },
  { id: "int-3", name: "Autodesk BIM 360", category: "BIM", description: "Coordinate models and issues across design and construction teams.", icon: "🏗", connected: false },
  { id: "int-4", name: "Slack", category: "Communication", description: "Send project and finance notifications to studio Slack channels.", icon: "💬", connected: true },
  { id: "int-5", name: "Google Calendar", category: "Calendar", description: "Sync milestones, meetings, and site visits with team calendars.", icon: "📅", connected: false },
  { id: "int-6", name: "DocuSign", category: "Accounting", description: "Send and track e-signatures for proposals and contracts.", icon: "✍️", connected: false },
];

export type ThemeOption = "Light" | "Dark" | "System";
export type DateFormatOption = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export type CurrencyOption = "USD" | "EUR" | "QAR" | "AED" | "SAR";
export type UnitOption = "Metric" | "Imperial";

export type Preferences = {
  theme: ThemeOption;
  dateFormat: DateFormatOption;
  currency: CurrencyOption;
  units: UnitOption;
  notifyTaskAssigned: boolean;
  notifyInvoiceOverdue: boolean;
  notifyProjectMilestone: boolean;
  notifyWeeklyDigest: boolean;
};

export const DEFAULT_PREFERENCES: Preferences = {
  theme: "System",
  dateFormat: "DD/MM/YYYY",
  currency: "USD",
  units: "Metric",
  notifyTaskAssigned: true,
  notifyInvoiceOverdue: true,
  notifyProjectMilestone: true,
  notifyWeeklyDigest: false,
};

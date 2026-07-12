// Mock data for the "Tools & Intelligence" section. Reference style: src/lib/project-data.ts

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
};

export const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "assistant",
    content:
      "Hi, I'm the Andalus studio assistant. Ask me to draft a proposal section, summarize a meeting, or answer a quick code/standards question.",
    timestamp: "9:02 AM",
  },
];

const CANNED_REPLIES = [
  "Here's a draft based on your request — I've outlined the scope, fee assumptions, and a suggested timeline. Let me know if you'd like it adjusted.",
  "Got it. Summarizing: three action items were raised, two owners assigned, and one open question on the facade material sign-off.",
  "Based on typical local code requirements, you'll want to confirm setback and FAR limits with the municipal authority before finalizing massing.",
  "I've put together a short outline for that — happy to expand any section into full paragraphs if you'd like.",
  "That's logged. I can turn this into a formatted document if you tell me which template to use.",
];

export function getCannedReply(userText: string): string {
  const trimmed = userText.trim().toLowerCase();
  if (trimmed.includes("summar")) {
    return CANNED_REPLIES[1];
  }
  if (trimmed.includes("code") || trimmed.includes("standard") || trimmed.includes("regulation")) {
    return CANNED_REPLIES[2];
  }
  if (trimmed.includes("draft") || trimmed.includes("proposal") || trimmed.includes("write")) {
    return CANNED_REPLIES[0];
  }
  const index = Math.abs(hashString(trimmed)) % CANNED_REPLIES.length;
  return CANNED_REPLIES[index];
}

function hashString(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

export type TemplateType = "Proposal" | "Contract" | "Drawing Sheet" | "Report";

export type Template = {
  id: string;
  name: string;
  type: TemplateType;
  description: string;
  lastUpdated: string;
  owner: string;
};

export const TEMPLATES: Template[] = [
  {
    id: "tpl-1",
    name: "Standard Fee Proposal",
    type: "Proposal",
    description: "Scope, fee schedule, and terms for new client engagements.",
    lastUpdated: "2026-06-28",
    owner: "Business Development",
  },
  {
    id: "tpl-2",
    name: "Design-Build Contract",
    type: "Contract",
    description: "Master agreement template for combined design-build engagements.",
    lastUpdated: "2026-05-14",
    owner: "Legal",
  },
  {
    id: "tpl-3",
    name: "A-Series Title Block",
    type: "Drawing Sheet",
    description: "Standard title block and sheet border for architectural drawing sets.",
    lastUpdated: "2026-07-02",
    owner: "BIM Team",
  },
  {
    id: "tpl-4",
    name: "Monthly Client Status Report",
    type: "Report",
    description: "Progress, budget, and schedule summary formatted for client circulation.",
    lastUpdated: "2026-07-09",
    owner: "Project Management",
  },
  {
    id: "tpl-5",
    name: "Consultant Services Agreement",
    type: "Contract",
    description: "Sub-consultant agreement template with standard scope exhibits.",
    lastUpdated: "2026-04-30",
    owner: "Legal",
  },
  {
    id: "tpl-6",
    name: "Concept Presentation Deck",
    type: "Proposal",
    description: "Client-facing concept design presentation with narrative and imagery slots.",
    lastUpdated: "2026-06-11",
    owner: "Design Team",
  },
  {
    id: "tpl-7",
    name: "RFI Log Template",
    type: "Drawing Sheet",
    description: "Structured request-for-information log for construction administration.",
    lastUpdated: "2026-07-05",
    owner: "Site Team",
  },
  {
    id: "tpl-8",
    name: "Quarterly Financial Summary",
    type: "Report",
    description: "Studio-wide revenue, cost, and profitability rollup by project.",
    lastUpdated: "2026-06-20",
    owner: "Finance",
  },
];

export type LibraryCategory = "BIM Families" | "CAD Blocks" | "Materials & Finishes" | "Furniture";

export type LibraryItem = {
  id: string;
  name: string;
  category: LibraryCategory;
  format: string;
  icon: string;
  color: string;
  updated: string;
};

export const LIBRARY_ITEMS: LibraryItem[] = [
  { id: "lib-1", name: "Curtain Wall System — Type A", category: "BIM Families", format: "RFA", icon: "🏢", color: "bg-brand-blue", updated: "2026-06-30" },
  { id: "lib-2", name: "Structural Column Family", category: "BIM Families", format: "RFA", icon: "🏛", color: "bg-brand-blue", updated: "2026-06-18" },
  { id: "lib-3", name: "Door — Double Glazed", category: "BIM Families", format: "RFA", icon: "🚪", color: "bg-brand-blue", updated: "2026-05-22" },
  { id: "lib-4", name: "Site Plan Symbols", category: "CAD Blocks", format: "DWG", icon: "📐", color: "bg-brand-navy", updated: "2026-06-05" },
  { id: "lib-5", name: "Parking Layout Blocks", category: "CAD Blocks", format: "DWG", icon: "🅿️", color: "bg-brand-navy", updated: "2026-04-27" },
  { id: "lib-6", name: "Landscape Planting Symbols", category: "CAD Blocks", format: "DWG", icon: "🌳", color: "bg-brand-navy", updated: "2026-07-01" },
  { id: "lib-7", name: "Porcelain Tile — Sand Grey", category: "Materials & Finishes", format: "Material", icon: "🧱", color: "bg-brand-tan", updated: "2026-06-14" },
  { id: "lib-8", name: "Natural Oak Veneer", category: "Materials & Finishes", format: "Material", icon: "🪵", color: "bg-brand-tan", updated: "2026-05-30" },
  { id: "lib-9", name: "Brushed Bronze Metal Panel", category: "Materials & Finishes", format: "Material", icon: "✨", color: "bg-brand-tan", updated: "2026-06-25" },
  { id: "lib-10", name: "Lobby Lounge Chair", category: "Furniture", format: "FBX", icon: "🪑", color: "bg-brand-navy-light", updated: "2026-06-09" },
  { id: "lib-11", name: "Reception Desk — Modular", category: "Furniture", format: "FBX", icon: "🛋️", color: "bg-brand-navy-light", updated: "2026-05-16" },
  { id: "lib-12", name: "Outdoor Dining Set", category: "Furniture", format: "FBX", icon: "🌤", color: "bg-brand-navy-light", updated: "2026-07-04" },
];

export type AutomationRule = {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
};

export const AUTOMATION_RULES: AutomationRule[] = [
  {
    id: "auto-1",
    name: "Auto-generate weekly status report",
    description: "Compiles budget, schedule, and task progress into a status report for every active project.",
    trigger: "Every Monday at 8:00 AM",
    action: "Generate report and email to project leads",
    enabled: true,
  },
  {
    id: "auto-2",
    name: "Remind on overdue invoice",
    description: "Flags invoices that have passed their due date without payment and notifies accounting.",
    trigger: "Invoice due date passes with balance outstanding",
    action: "Send reminder notification to Finance",
    enabled: true,
  },
  {
    id: "auto-3",
    name: "Notify on stalled project stage",
    description: "Detects projects that haven't advanced stage gates in over 30 days.",
    trigger: "Project stage unchanged for 30+ days",
    action: "Notify lead architect and studio principal",
    enabled: false,
  },
  {
    id: "auto-4",
    name: "Auto-archive completed tasks",
    description: "Moves tasks marked done for more than 14 days into the archived task view.",
    trigger: "Task status = Done for 14+ days",
    action: "Move task to archive",
    enabled: true,
  },
  {
    id: "auto-5",
    name: "New lead welcome sequence",
    description: "Sends an introductory email and creates a follow-up reminder when a new lead is logged.",
    trigger: "New lead created in Leads & Opportunities",
    action: "Send welcome email and schedule 3-day follow-up",
    enabled: false,
  },
  {
    id: "auto-6",
    name: "BIM clash report digest",
    description: "Bundles new clash detection results into a single digest for the coordination team.",
    trigger: "New clash results published",
    action: "Send digest to BIM coordination team",
    enabled: true,
  },
];

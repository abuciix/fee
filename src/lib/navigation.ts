export type NavLeaf = {
  label: string;
  href: string;
  description: string;
  features: string[];
};

export type NavSection = {
  label: string;
  icon: string;
  href: string;
  description: string;
  features: string[];
  children?: NavLeaf[];
};

export const navigation: NavSection[] = [
  {
    label: "Dashboard",
    icon: "\u{1F3E0}",
    href: "/",
    description: "A single view of studio health across projects, clients, and finances.",
    features: [],
  },
  {
    label: "Projects",
    icon: "\u{1F3D7}",
    href: "/projects",
    description: "Everything about the studio's active and past work, from concept to handover.",
    features: [
      "Portfolio view across all active and archived projects",
      "Stage gates from concept through construction administration",
      "Task boards synced to each project's schedule",
    ],
    children: [
      {
        label: "Active Projects",
        href: "/projects/active",
        description: "The live portfolio, grouped by phase, type, and lead architect.",
        features: [
          "Project cards with phase, budget health, and next milestone",
          "Filter by typology, location, or project lead",
          "Quick links into drawings, tasks, and cost control for each project",
        ],
      },
      {
        label: "Project Stages",
        href: "/projects/stages",
        description: "Define and track the phase gates every project moves through.",
        features: [
          "Configurable stage templates (Concept, DD, CD, CA, etc.)",
          "Gate checklists and sign-off requirements per stage",
          "Studio-wide view of which projects are stuck at which gate",
        ],
      },
      {
        label: "Tasks & Workflow",
        href: "/projects/tasks",
        description: "Kanban and list views for the work each project needs done.",
        features: [
          "Board, list, and calendar views of tasks per project",
          "Assignment, due dates, and dependency tracking",
          "Workload view across the design team",
        ],
      },
      {
        label: "Drawings & Documents",
        href: "/projects/drawings",
        description: "Version-controlled drawing sets and project documentation.",
        features: [
          "Drawing register with revision history",
          "Issue/transmittal logs to clients and consultants",
          "Document approval workflow",
        ],
      },
      {
        label: "BIM Management",
        href: "/projects/bim",
        description: "Model coordination, clash detection, and BIM execution plans.",
        features: [
          "Model federation and clash detection log",
          "BIM execution plan tracking per project",
          "Level-of-detail and model health reporting",
        ],
      },
      {
        label: "Site & Construction",
        href: "/projects/site",
        description: "Site visits, RFIs, and construction administration in one log.",
        features: [
          "Site visit reports with photo logs",
          "RFI and submittal tracking",
          "Punch lists and construction progress",
        ],
      },
      {
        label: "Project Reports",
        href: "/projects/reports",
        description: "Status reports rolled up for internal review or client updates.",
        features: [
          "Weekly/monthly status report generator",
          "Budget vs. schedule variance summaries",
          "Export to PDF for client-facing reports",
        ],
      },
    ],
  },
  {
    label: "Clients & Business Development",
    icon: "\u{1F91D}",
    href: "/clients",
    description: "Relationships, pipeline, and everything that turns a lead into a project.",
    features: [
      "Full client relationship history in one place",
      "Pipeline view from lead to signed contract",
      "Client-facing portal for shared project updates",
    ],
    children: [
      {
        label: "Client CRM",
        href: "/clients/crm",
        description: "The master record of every client and contact the studio works with.",
        features: [
          "Contact and organization records with interaction history",
          "Linked projects, proposals, and invoices per client",
          "Notes and follow-up reminders",
        ],
      },
      {
        label: "Leads & Opportunities",
        href: "/clients/leads",
        description: "Track prospective work from first inquiry to decision.",
        features: [
          "Pipeline board by stage and estimated value",
          "Source tracking (referral, RFP, inbound, etc.)",
          "Win/loss reporting",
        ],
      },
      {
        label: "Proposals",
        href: "/clients/proposals",
        description: "Build, send, and track fee proposals and scopes of work.",
        features: [
          "Proposal templates with fee and scope builder",
          "Send and e-sign tracking",
          "Version history per proposal",
        ],
      },
      {
        label: "Contracts",
        href: "/clients/contracts",
        description: "Signed agreements, amendments, and key contract terms.",
        features: [
          "Contract repository linked to projects",
          "Key date and milestone reminders",
          "Amendment and change-order tracking",
        ],
      },
      {
        label: "Client Portal",
        href: "/clients/portal",
        description: "A shared space where clients can view progress and documents.",
        features: [
          "Client-facing project status and milestone view",
          "Shared drawing and document access",
          "Secure messaging and approvals",
        ],
      },
      {
        label: "Marketing & Portfolio",
        href: "/clients/marketing",
        description: "The studio's public-facing portfolio and marketing assets.",
        features: [
          "Portfolio project showcase management",
          "Award and publication tracking",
          "Marketing asset library",
        ],
      },
    ],
  },
  {
    label: "Studio Operations",
    icon: "\u{1F3E2}",
    href: "/operations",
    description: "Running the studio as a business — people, resources, and knowledge.",
    features: [
      "Team directory and org structure",
      "Attendance, leave, and resource scheduling",
      "Shared knowledge base for standards and precedents",
    ],
    children: [
      {
        label: "Team Management",
        href: "/operations/team",
        description: "The studio roster, roles, and reporting lines.",
        features: [
          "Team directory with roles and disciplines",
          "Org chart and reporting structure",
          "Utilization view across active projects",
        ],
      },
      {
        label: "HR & Recruitment",
        href: "/operations/hr",
        description: "Hiring pipeline and core HR records.",
        features: [
          "Open roles and candidate pipeline",
          "Onboarding checklists",
          "Personnel records and reviews",
        ],
      },
      {
        label: "Internship Management",
        href: "/operations/internships",
        description: "Track interns, mentors, and program milestones.",
        features: [
          "Intern roster with mentor assignments",
          "Program milestones and evaluations",
          "Conversion-to-hire tracking",
        ],
      },
      {
        label: "Attendance & Leave",
        href: "/operations/attendance",
        description: "Time tracking, leave requests, and approvals.",
        features: [
          "Daily attendance and timesheet capture",
          "Leave request and approval workflow",
          "Team calendar of absences",
        ],
      },
      {
        label: "Resources & Assets",
        href: "/operations/resources",
        description: "Studio equipment, software licenses, and room bookings.",
        features: [
          "Asset register (hardware, licenses, plotters, etc.)",
          "Meeting room and equipment booking",
          "Maintenance and renewal reminders",
        ],
      },
      {
        label: "Knowledge Library",
        href: "/operations/knowledge",
        description: "Standards, precedents, and institutional knowledge in one library.",
        features: [
          "Standards, specs, and detail library",
          "Precedent project archive",
          "Searchable studio wiki",
        ],
      },
    ],
  },
  {
    label: "Finance & Administration",
    icon: "\u{1F4B0}",
    href: "/finance",
    description: "Fees, costs, and the financial health of the studio and its projects.",
    features: [
      "Invoicing and payment tracking per client and project",
      "Project-level cost control against budget",
      "Studio-wide financial reporting",
    ],
    children: [
      {
        label: "Invoices & Payments",
        href: "/finance/invoices",
        description: "Issue invoices and track payment status.",
        features: [
          "Invoice generation from fee schedules",
          "Payment status and aging tracking",
          "Reminders for overdue invoices",
        ],
      },
      {
        label: "Expenses",
        href: "/finance/expenses",
        description: "Studio and project expense tracking and approvals.",
        features: [
          "Expense capture with receipts",
          "Approval workflow by category",
          "Reimbursable vs. non-reimbursable tagging",
        ],
      },
      {
        label: "Project Cost Control",
        href: "/finance/cost-control",
        description: "Budget vs. actual tracking for every active project.",
        features: [
          "Budget vs. actual by project phase",
          "Burn-rate and forecast-to-complete",
          "Change order cost impact tracking",
        ],
      },
      {
        label: "Payroll",
        href: "/finance/payroll",
        description: "Studio payroll runs and compensation records.",
        features: [
          "Payroll run scheduling and history",
          "Compensation and bonus records",
          "Payslip generation",
        ],
      },
      {
        label: "BOQ & Estimation",
        href: "/finance/boq",
        description: "Bills of quantities and cost estimation for projects.",
        features: [
          "BOQ builder linked to drawings",
          "Cost estimation by trade/category",
          "Comparison against contractor quotes",
        ],
      },
      {
        label: "Financial Reports",
        href: "/finance/reports",
        description: "Studio-wide financial reporting and forecasting.",
        features: [
          "P&L and cash flow reporting",
          "Project profitability breakdown",
          "Exportable reports for stakeholders",
        ],
      },
    ],
  },
  {
    label: "Tools & Intelligence",
    icon: "\u{1F916}",
    href: "/tools",
    description: "Utilities that speed up day-to-day studio work.",
    features: [
      "AI assistant for drafting and research help",
      "Fee and cost calculators",
      "Shared templates and design libraries",
    ],
    children: [
      {
        label: "AI Assistant",
        href: "/tools/ai-assistant",
        description: "An assistant for drafting proposals, summarizing meetings, and research.",
        features: [
          "Chat-based assistant with project context",
          "Document drafting and summarization",
          "Quick answers on code and standards questions",
        ],
      },
      {
        label: "Calculators",
        href: "/tools/calculators",
        description: "Fee, area, and cost calculators used across the studio.",
        features: [
          "Architectural animation fee calculator",
          "Area and FSI/FAR calculators",
          "Fee percentage and staffing calculators",
        ],
      },
      {
        label: "Templates",
        href: "/tools/templates",
        description: "Reusable document and drawing templates.",
        features: [
          "Proposal and contract templates",
          "Drawing sheet and title block templates",
          "Report and presentation templates",
        ],
      },
      {
        label: "Design Libraries",
        href: "/tools/design-libraries",
        description: "Shared CAD/BIM blocks, materials, and component libraries.",
        features: [
          "BIM family and CAD block library",
          "Materials and finishes catalog",
          "Furniture and fixture libraries",
        ],
      },
      {
        label: "Automation",
        href: "/tools/automation",
        description: "Automated workflows that remove repetitive studio tasks.",
        features: [
          "Automated status report generation",
          "Notification and reminder rules",
          "Integration-triggered workflows",
        ],
      },
    ],
  },
  {
    label: "Analytics",
    icon: "\u{1F4CA}",
    href: "/analytics",
    description: "Studio-wide performance, from individual projects to overall business health.",
    features: [
      "Business-level KPIs and trends",
      "Project and team performance views",
      "Sales and financial analytics",
    ],
    children: [
      {
        label: "Business Dashboard",
        href: "/analytics/business",
        description: "Top-line KPIs for the whole studio.",
        features: [
          "Revenue, pipeline, and utilization at a glance",
          "Trend lines across quarters",
          "Configurable KPI widgets",
        ],
      },
      {
        label: "Project Performance",
        href: "/analytics/project-performance",
        description: "How individual projects are tracking against plan.",
        features: [
          "Schedule and budget variance by project",
          "On-time delivery rate",
          "Risk flags for at-risk projects",
        ],
      },
      {
        label: "Team Performance",
        href: "/analytics/team-performance",
        description: "Utilization and output across the team.",
        features: [
          "Billable vs. non-billable hours",
          "Utilization by discipline",
          "Workload balance across staff",
        ],
      },
      {
        label: "Sales Analytics",
        href: "/analytics/sales",
        description: "Pipeline conversion and business development performance.",
        features: [
          "Win rate by lead source",
          "Pipeline value by stage",
          "Proposal-to-signed conversion time",
        ],
      },
      {
        label: "Financial Analytics",
        href: "/analytics/financial",
        description: "Deeper financial trends across the studio.",
        features: [
          "Revenue and margin trends",
          "Project profitability distribution",
          "Cash flow forecasting",
        ],
      },
    ],
  },
  {
    label: "Settings",
    icon: "⚙",
    href: "/settings",
    description: "Configure the system to match how the studio actually works.",
    features: [
      "User accounts and permission levels",
      "Studio/company profile details",
      "Third-party integrations and preferences",
    ],
    children: [
      {
        label: "Users & Permissions",
        href: "/settings/users",
        description: "Manage who has access to what.",
        features: [
          "User roles and permission levels",
          "Invite and deactivate team members",
          "Access audit log",
        ],
      },
      {
        label: "Company Profile",
        href: "/settings/company-profile",
        description: "The studio's core details, branding, and contact information.",
        features: [
          "Studio name, logo, and contact details",
          "Brand guidelines and asset links",
          "Office locations and legal entity details",
        ],
      },
      {
        label: "Integrations",
        href: "/settings/integrations",
        description: "Connect the system to the other tools the studio uses.",
        features: [
          "Accounting and payment integrations",
          "Cloud storage and BIM tool connections",
          "Calendar and email sync",
        ],
      },
      {
        label: "System Preferences",
        href: "/settings/preferences",
        description: "General preferences for how the system behaves.",
        features: [
          "Notification preferences",
          "Date, currency, and unit formats",
          "Theme and display options",
        ],
      },
    ],
  },
];

export type FlatNavItem = (NavSection | NavLeaf) & { parent?: NavSection };

export function flattenNavigation(): FlatNavItem[] {
  const items: FlatNavItem[] = [];
  for (const section of navigation) {
    items.push(section);
    for (const child of section.children ?? []) {
      items.push({ ...child, parent: section });
    }
  }
  return items;
}

export function findNavItemByHref(href: string): FlatNavItem | undefined {
  return flattenNavigation().find((item) => item.href === href);
}

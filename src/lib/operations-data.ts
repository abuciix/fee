// Mock data for the Studio Operations section (Team, HR, Interns, Attendance, Resources, Knowledge).
// Typed arrays + helper functions, mirroring the style of `src/lib/project-data.ts`.

export const DISCIPLINES = [
  "Architecture",
  "Interior Design",
  "Structural Engineering",
  "MEP Engineering",
  "BIM & Technology",
  "Business Development",
  "Administration",
] as const;

export type Discipline = (typeof DISCIPLINES)[number];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  discipline: Discipline;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  utilization: number; // 0-100
  activeProjects: string[];
};

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "sara-haddad",
    name: "Sara Haddad",
    role: "Senior Architect",
    discipline: "Architecture",
    email: "sara.haddad@andalus-arch.com",
    phone: "+974 5555 0101",
    location: "Doha HQ",
    joinDate: "2019-03-04",
    utilization: 92,
    activeProjects: ["Marina Tower", "Falcon Retail Fitout"],
  },
  {
    id: "omar-nasser",
    name: "Omar Nasser",
    role: "Principal Architect",
    discipline: "Architecture",
    email: "omar.nasser@andalus-arch.com",
    phone: "+974 5555 0102",
    location: "Doha HQ",
    joinDate: "2015-09-14",
    utilization: 88,
    activeProjects: ["Greenfield Campus", "Desert Oasis Resort"],
  },
  {
    id: "layla-kanaan",
    name: "Layla Kanaan",
    role: "Senior Architect",
    discipline: "Architecture",
    email: "layla.kanaan@andalus-arch.com",
    phone: "+971 5555 0103",
    location: "Dubai Studio",
    joinDate: "2018-01-22",
    utilization: 78,
    activeProjects: ["Al Noor Residences", "Central Library Renovation"],
  },
  {
    id: "yusuf-al-amin",
    name: "Yusuf Al Amin",
    role: "Senior Architect",
    discipline: "Architecture",
    email: "yusuf.alamin@andalus-arch.com",
    phone: "+973 5555 0104",
    location: "Manama Site Office",
    joinDate: "2017-06-11",
    utilization: 95,
    activeProjects: ["Harbor View Offices", "Seaside Villas"],
  },
  {
    id: "nadia-fares",
    name: "Nadia Fares",
    role: "MEP Engineer",
    discipline: "MEP Engineering",
    email: "nadia.fares@andalus-arch.com",
    phone: "+974 5555 0105",
    location: "Doha HQ",
    joinDate: "2020-11-02",
    utilization: 70,
    activeProjects: ["Marina Tower", "Desert Oasis Resort"],
  },
  {
    id: "karim-odeh",
    name: "Karim Odeh",
    role: "Construction Administrator",
    discipline: "Architecture",
    email: "karim.odeh@andalus-arch.com",
    phone: "+974 5555 0106",
    location: "Doha HQ",
    joinDate: "2021-02-15",
    utilization: 65,
    activeProjects: ["Greenfield Campus", "Harbor View Offices"],
  },
  {
    id: "rana-idris",
    name: "Rana Idris",
    role: "Interior Designer",
    discipline: "Interior Design",
    email: "rana.idris@andalus-arch.com",
    phone: "+971 5555 0107",
    location: "Dubai Studio",
    joinDate: "2022-04-18",
    utilization: 60,
    activeProjects: ["Al Noor Residences", "Seaside Villas"],
  },
  {
    id: "huda-barakat",
    name: "Huda Barakat",
    role: "BIM Coordinator",
    discipline: "BIM & Technology",
    email: "huda.barakat@andalus-arch.com",
    phone: "+974 5555 0108",
    location: "Doha HQ",
    joinDate: "2020-05-27",
    utilization: 55,
    activeProjects: ["Marina Tower", "Al Noor Residences"],
  },
  {
    id: "tariq-mansour",
    name: "Tariq Mansour",
    role: "Structural Engineer (Liaison)",
    discipline: "Structural Engineering",
    email: "tariq.mansour@andalus-arch.com",
    phone: "+966 5555 0109",
    location: "Riyadh Office",
    joinDate: "2023-01-09",
    utilization: 40,
    activeProjects: ["Greenfield Campus"],
  },
  {
    id: "dana-freij",
    name: "Dana Freij",
    role: "Business Development Manager",
    discipline: "Business Development",
    email: "dana.freij@andalus-arch.com",
    phone: "+974 5555 0110",
    location: "Doha HQ",
    joinDate: "2019-08-19",
    utilization: 50,
    activeProjects: [],
  },
  {
    id: "fadi-haddad",
    name: "Fadi Haddad",
    role: "HR Manager",
    discipline: "Administration",
    email: "fadi.haddad@andalus-arch.com",
    phone: "+974 5555 0111",
    location: "Doha HQ",
    joinDate: "2018-10-01",
    utilization: 45,
    activeProjects: [],
  },
  {
    id: "mona-saleh",
    name: "Mona Saleh",
    role: "Office Manager",
    discipline: "Administration",
    email: "mona.saleh@andalus-arch.com",
    phone: "+974 5555 0112",
    location: "Doha HQ",
    joinDate: "2016-07-25",
    utilization: 35,
    activeProjects: [],
  },
  {
    id: "zeina-khoury",
    name: "Zeina Khoury",
    role: "Junior Architect",
    discipline: "Architecture",
    email: "zeina.khoury@andalus-arch.com",
    phone: "+974 5555 0113",
    location: "Doha HQ",
    joinDate: "2024-09-02",
    utilization: 82,
    activeProjects: ["Falcon Retail Fitout", "Central Library Renovation"],
  },
  {
    id: "adam-farouk",
    name: "Adam Farouk",
    role: "IT & Systems Administrator",
    discipline: "BIM & Technology",
    email: "adam.farouk@andalus-arch.com",
    phone: "+974 5555 0114",
    location: "Doha HQ",
    joinDate: "2021-11-08",
    utilization: 30,
    activeProjects: [],
  },
];

export function getTeamMember(id: string): TeamMember | undefined {
  return TEAM_MEMBERS.find((m) => m.id === id);
}

export type UtilizationBand = "high" | "balanced" | "low";

export function getUtilizationMeta(
  utilization: number
): { band: UtilizationBand; label: string; pill: "good" | "warning" | "critical" | "neutral" } {
  if (utilization >= 90) return { band: "high", label: "Near capacity", pill: "warning" };
  if (utilization < 40) return { band: "low", label: "Under-utilized", pill: "neutral" };
  return { band: "balanced", label: "Balanced", pill: "good" };
}

// ---------------------------------------------------------------------------
// HR & Recruitment
// ---------------------------------------------------------------------------

export type RoleStatus = "open" | "on_hold" | "filled";

export type OpenRole = {
  id: string;
  title: string;
  department: Discipline;
  location: string;
  employmentType: string;
  postedDate: string;
  status: RoleStatus;
};

export const OPEN_ROLES: OpenRole[] = [
  {
    id: "role-sr-architect",
    title: "Senior Architect",
    department: "Architecture",
    location: "Doha, QA",
    employmentType: "Full-time",
    postedDate: "2026-06-01",
    status: "open",
  },
  {
    id: "role-structural-engineer",
    title: "Structural Engineer",
    department: "Structural Engineering",
    location: "Riyadh, SA",
    employmentType: "Full-time",
    postedDate: "2026-06-15",
    status: "open",
  },
  {
    id: "role-interior-designer",
    title: "Interior Designer",
    department: "Interior Design",
    location: "Dubai, AE",
    employmentType: "Full-time",
    postedDate: "2026-06-20",
    status: "open",
  },
  {
    id: "role-marketing-coordinator",
    title: "Marketing Coordinator",
    department: "Business Development",
    location: "Doha, QA",
    employmentType: "Part-time",
    postedDate: "2026-07-01",
    status: "on_hold",
  },
];

export const RECRUITMENT_STAGES = ["applied", "interview", "offer", "hired"] as const;

export type RecruitmentStage = (typeof RECRUITMENT_STAGES)[number];

export type Candidate = {
  id: string;
  roleId: string;
  name: string;
  stage: RecruitmentStage;
  appliedDate: string;
  source: string;
};

export const CANDIDATES: Candidate[] = [
  { id: "c1", roleId: "role-sr-architect", name: "Ahmed Zayed", stage: "interview", appliedDate: "2026-06-05", source: "Referral" },
  { id: "c2", roleId: "role-sr-architect", name: "Noor Kassab", stage: "applied", appliedDate: "2026-06-22", source: "Careers Page" },
  { id: "c3", roleId: "role-sr-architect", name: "Faris Idris", stage: "offer", appliedDate: "2026-06-03", source: "LinkedIn" },
  { id: "c4", roleId: "role-structural-engineer", name: "Lina Sabbagh", stage: "applied", appliedDate: "2026-06-18", source: "LinkedIn" },
  { id: "c5", roleId: "role-structural-engineer", name: "Rami Choukair", stage: "interview", appliedDate: "2026-06-16", source: "Referral" },
  { id: "c6", roleId: "role-interior-designer", name: "Maya Salloum", stage: "applied", appliedDate: "2026-06-25", source: "Careers Page" },
  { id: "c7", roleId: "role-interior-designer", name: "Yara Nassar", stage: "interview", appliedDate: "2026-06-21", source: "LinkedIn" },
  { id: "c8", roleId: "role-interior-designer", name: "Dina Fakhoury", stage: "hired", appliedDate: "2026-05-30", source: "Referral" },
  { id: "c9", roleId: "role-marketing-coordinator", name: "Jad Haddad", stage: "applied", appliedDate: "2026-07-03", source: "Careers Page" },
];

export const RECRUITMENT_STAGE_META: Record<RecruitmentStage, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  applied: { label: "Applied", pill: "neutral" },
  interview: { label: "Interview", pill: "warning" },
  offer: { label: "Offer", pill: "warning" },
  hired: { label: "Hired", pill: "good" },
};

export const ROLE_STATUS_META: Record<RoleStatus, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  open: { label: "Open", pill: "good" },
  on_hold: { label: "On hold", pill: "warning" },
  filled: { label: "Filled", pill: "neutral" },
};

export function getCandidatesForRole(roleId: string): Candidate[] {
  return CANDIDATES.filter((c) => c.roleId === roleId);
}

// ---------------------------------------------------------------------------
// Internship Management
// ---------------------------------------------------------------------------

export type MilestoneStatus = "not_started" | "in_progress" | "completed";

export type InternMilestone = {
  label: string;
  status: MilestoneStatus;
};

export type Intern = {
  id: string;
  name: string;
  school: string;
  discipline: Discipline;
  mentor: string;
  startDate: string;
  endDate: string;
  milestones: InternMilestone[];
};

export const INTERNS: Intern[] = [
  {
    id: "ali-marzouk",
    name: "Ali Marzouk",
    school: "American University of Beirut",
    discipline: "Architecture",
    mentor: "Sara Haddad",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    milestones: [
      { label: "Orientation & studio onboarding", status: "completed" },
      { label: "Design studio rotation", status: "in_progress" },
      { label: "Final presentation", status: "not_started" },
    ],
  },
  {
    id: "farah-nassif",
    name: "Farah Nassif",
    school: "American University of Beirut",
    discipline: "Architecture",
    mentor: "Omar Nasser",
    startDate: "2026-06-01",
    endDate: "2026-08-31",
    milestones: [
      { label: "Orientation & studio onboarding", status: "completed" },
      { label: "Concept design assist", status: "in_progress" },
      { label: "Final presentation", status: "not_started" },
    ],
  },
  {
    id: "khalil-rahme",
    name: "Khalil Rahme",
    school: "German Jordanian University",
    discipline: "BIM & Technology",
    mentor: "Huda Barakat",
    startDate: "2026-07-01",
    endDate: "2026-09-30",
    milestones: [
      { label: "Orientation & studio onboarding", status: "completed" },
      { label: "Model coordination shadowing", status: "not_started" },
      { label: "Clash detection exercise", status: "not_started" },
    ],
  },
  {
    id: "sami-qureshi",
    name: "Sami Qureshi",
    school: "American University of Sharjah",
    discipline: "Interior Design",
    mentor: "Rana Idris",
    startDate: "2026-06-15",
    endDate: "2026-09-15",
    milestones: [
      { label: "Orientation & studio onboarding", status: "completed" },
      { label: "Materials library research", status: "completed" },
      { label: "FF&E schedule assist", status: "in_progress" },
    ],
  },
  {
    id: "nour-abdallah",
    name: "Nour Abdallah",
    school: "Qatar University",
    discipline: "MEP Engineering",
    mentor: "Nadia Fares",
    startDate: "2026-07-06",
    endDate: "2026-09-30",
    milestones: [
      { label: "Orientation & studio onboarding", status: "in_progress" },
      { label: "MEP coordination shadowing", status: "not_started" },
      { label: "Final presentation", status: "not_started" },
    ],
  },
];

export const MILESTONE_STATUS_META: Record<MilestoneStatus, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  completed: { label: "Completed", pill: "good" },
  in_progress: { label: "In progress", pill: "warning" },
  not_started: { label: "Not started", pill: "neutral" },
};

// ---------------------------------------------------------------------------
// Attendance & Leave
// ---------------------------------------------------------------------------

export const LEAVE_TYPES = ["Annual Leave", "Sick Leave", "Unpaid Leave", "Parental Leave"] as const;

export type LeaveType = (typeof LEAVE_TYPES)[number];

export type LeaveStatus = "pending" | "approved" | "denied";

export type LeaveRequest = {
  id: string;
  name: string;
  type: LeaveType;
  startDate: string;
  endDate: string;
  status: LeaveStatus;
  notes?: string;
};

export const LEAVE_REQUESTS: LeaveRequest[] = [
  { id: "l1", name: "Sara Haddad", type: "Annual Leave", startDate: "2026-07-20", endDate: "2026-07-24", status: "approved" },
  { id: "l2", name: "Karim Odeh", type: "Sick Leave", startDate: "2026-07-11", endDate: "2026-07-12", status: "approved" },
  { id: "l3", name: "Rana Idris", type: "Annual Leave", startDate: "2026-08-03", endDate: "2026-08-10", status: "pending" },
  { id: "l4", name: "Nadia Fares", type: "Parental Leave", startDate: "2026-08-01", endDate: "2026-09-15", status: "approved" },
  { id: "l5", name: "Dana Freij", type: "Annual Leave", startDate: "2026-07-14", endDate: "2026-07-16", status: "pending" },
  { id: "l6", name: "Mona Saleh", type: "Unpaid Leave", startDate: "2026-07-25", endDate: "2026-07-26", status: "denied", notes: "Coincides with payroll close." },
  { id: "l7", name: "Zeina Khoury", type: "Annual Leave", startDate: "2026-07-12", endDate: "2026-07-13", status: "approved" },
  { id: "l8", name: "Adam Farouk", type: "Sick Leave", startDate: "2026-07-09", endDate: "2026-07-10", status: "approved" },
  { id: "l9", name: "Yusuf Al Amin", type: "Annual Leave", startDate: "2026-09-01", endDate: "2026-09-05", status: "pending" },
  { id: "l10", name: "Tariq Mansour", type: "Annual Leave", startDate: "2026-07-13", endDate: "2026-07-15", status: "approved" },
];

export const LEAVE_STATUS_META: Record<LeaveStatus, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  approved: { label: "Approved", pill: "good" },
  pending: { label: "Pending", pill: "warning" },
  denied: { label: "Denied", pill: "critical" },
};

/** Returns true if the [startDate, endDate] range (inclusive) overlaps the [rangeStart, rangeEnd] window. */
export function overlapsRange(startDate: string, endDate: string, rangeStart: string, rangeEnd: string): boolean {
  return startDate <= rangeEnd && endDate >= rangeStart;
}

// ---------------------------------------------------------------------------
// Resources & Assets
// ---------------------------------------------------------------------------

export const ASSET_CATEGORIES = ["Hardware", "Software License", "Equipment"] as const;

export type AssetCategory = (typeof ASSET_CATEGORIES)[number];

export type AssetStatus = "in_use" | "available" | "maintenance";

export type Asset = {
  id: string;
  name: string;
  category: AssetCategory;
  assignedTo: string;
  location: string;
  status: AssetStatus;
  purchaseDate: string;
  nextRenewal?: string;
};

export const ASSETS: Asset[] = [
  { id: "a1", name: 'MacBook Pro 16" (A102)', category: "Hardware", assignedTo: "Sara Haddad", location: "Doha HQ", status: "in_use", purchaseDate: "2024-03-01" },
  { id: "a2", name: "Dell Precision 5570", category: "Hardware", assignedTo: "Karim Odeh", location: "Doha HQ", status: "in_use", purchaseDate: "2023-11-12" },
  { id: "a3", name: "Autodesk Revit — Seat 4", category: "Software License", assignedTo: "Huda Barakat", location: "Doha HQ", status: "in_use", purchaseDate: "2023-01-15", nextRenewal: "2026-12-01" },
  { id: "a4", name: "Autodesk Revit — Seat 7", category: "Software License", assignedTo: "Unassigned", location: "Studio Pool", status: "available", purchaseDate: "2023-01-15", nextRenewal: "2026-12-01" },
  { id: "a5", name: "Adobe Creative Cloud — Team", category: "Software License", assignedTo: "Studio Pool", location: "Doha HQ", status: "in_use", purchaseDate: "2022-05-01", nextRenewal: "2026-10-15" },
  { id: "a6", name: "HP DesignJet T2600 Plotter", category: "Equipment", assignedTo: "Print Room", location: "Doha HQ", status: "maintenance", purchaseDate: "2021-08-20" },
  { id: "a7", name: "Site Survey Drone (DJI Matrice)", category: "Equipment", assignedTo: "Yusuf Al Amin", location: "Manama Site Office", status: "in_use", purchaseDate: "2024-02-10" },
  { id: "a8", name: "Conference Room A/V System", category: "Equipment", assignedTo: "Studio Pool", location: "Doha HQ", status: "in_use", purchaseDate: "2022-09-05" },
  { id: "a9", name: 'iPad Pro 12.9" (Site)', category: "Hardware", assignedTo: "Karim Odeh", location: "Doha HQ", status: "in_use", purchaseDate: "2024-06-18" },
  { id: "a10", name: "VR Headset (Meta Quest 3)", category: "Hardware", assignedTo: "Unassigned", location: "Doha HQ", status: "available", purchaseDate: "2025-01-09" },
  { id: "a11", name: "Enscape — Seat 2", category: "Software License", assignedTo: "Rana Idris", location: "Dubai Studio", status: "in_use", purchaseDate: "2023-04-22", nextRenewal: "2026-11-01" },
  { id: "a12", name: "MacBook Air M2", category: "Hardware", assignedTo: "Zeina Khoury", location: "Doha HQ", status: "in_use", purchaseDate: "2024-09-02" },
  { id: "a13", name: "Laser Measure (Leica DISTO)", category: "Equipment", assignedTo: "Unassigned", location: "Doha HQ", status: "available", purchaseDate: "2022-12-01" },
  { id: "a14", name: "Dell Precision (spare)", category: "Hardware", assignedTo: "Unassigned", location: "IT Storage", status: "maintenance", purchaseDate: "2022-02-14" },
];

export const ASSET_STATUS_META: Record<AssetStatus, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  in_use: { label: "In use", pill: "good" },
  available: { label: "Available", pill: "neutral" },
  maintenance: { label: "Maintenance", pill: "warning" },
};

// ---------------------------------------------------------------------------
// Knowledge Library
// ---------------------------------------------------------------------------

export const KNOWLEDGE_CATEGORIES = [
  "Standards & Specs",
  "Precedent Projects",
  "Studio Wiki",
  "Templates & Guides",
] as const;

export type KnowledgeCategory = (typeof KNOWLEDGE_CATEGORIES)[number];

export type KnowledgeArticle = {
  id: string;
  title: string;
  category: KnowledgeCategory;
  tags: string[];
  summary: string;
  lastUpdated: string;
  author: string;
};

export const KNOWLEDGE_ARTICLES: KnowledgeArticle[] = [
  {
    id: "k1",
    title: "Facade Detailing Standards — v3",
    category: "Standards & Specs",
    tags: ["facade", "details", "curtain wall"],
    summary: "Studio-standard facade detail library covering curtain wall, cladding, and thermal break assemblies.",
    lastUpdated: "2026-06-10",
    author: "Omar Nasser",
  },
  {
    id: "k2",
    title: "Marina Tower Precedent Study",
    category: "Precedent Projects",
    tags: ["mixed-use", "high-rise", "facade"],
    summary: "Design rationale, massing studies, and facade strategy from the Marina Tower concept phase.",
    lastUpdated: "2026-05-28",
    author: "Sara Haddad",
  },
  {
    id: "k3",
    title: "Client Onboarding Checklist",
    category: "Studio Wiki",
    tags: ["process", "clients"],
    summary: "Step-by-step checklist for kicking off a new client relationship, from intake to first proposal.",
    lastUpdated: "2026-04-15",
    author: "Dana Freij",
  },
  {
    id: "k4",
    title: "BIM Execution Plan Template",
    category: "Templates & Guides",
    tags: ["bim", "template"],
    summary: "Standard BEP structure used to kick off model coordination on every new project.",
    lastUpdated: "2026-06-22",
    author: "Huda Barakat",
  },
  {
    id: "k5",
    title: "Accessibility Compliance Guide (GCC)",
    category: "Standards & Specs",
    tags: ["accessibility", "code"],
    summary: "Regional accessibility code summary and detailing guidance for GCC jurisdictions.",
    lastUpdated: "2026-03-02",
    author: "Layla Kanaan",
  },
  {
    id: "k6",
    title: "Greenfield Campus Case Study",
    category: "Precedent Projects",
    tags: ["education", "sustainability"],
    summary: "Passive cooling and daylighting strategies developed for the Greenfield Campus project.",
    lastUpdated: "2026-05-05",
    author: "Omar Nasser",
  },
  {
    id: "k7",
    title: "Site Visit Report Template",
    category: "Templates & Guides",
    tags: ["construction", "template"],
    summary: "Standard site visit report format with photo log and punch-list sections.",
    lastUpdated: "2026-06-30",
    author: "Karim Odeh",
  },
  {
    id: "k8",
    title: "Studio Style Guide & Branding",
    category: "Studio Wiki",
    tags: ["branding", "marketing"],
    summary: "Logo usage, typography, and presentation deck standards for all client-facing material.",
    lastUpdated: "2026-02-18",
    author: "Dana Freij",
  },
  {
    id: "k9",
    title: "Sustainable Materials Reference",
    category: "Standards & Specs",
    tags: ["materials", "sustainability"],
    summary: "Preferred materials list with embodied carbon notes and regional supplier availability.",
    lastUpdated: "2026-06-01",
    author: "Rana Idris",
  },
  {
    id: "k10",
    title: "Desert Oasis Resort Landscape Precedent",
    category: "Precedent Projects",
    tags: ["hospitality", "landscape"],
    summary: "Landscape and water-feature strategy reference from the Desert Oasis Resort DD package.",
    lastUpdated: "2026-06-27",
    author: "Omar Nasser",
  },
  {
    id: "k11",
    title: "New Hire Onboarding Wiki",
    category: "Studio Wiki",
    tags: ["hr", "onboarding"],
    summary: "Everything a new hire needs in week one — accounts, tools, studio norms, and key contacts.",
    lastUpdated: "2026-05-19",
    author: "Fadi Haddad",
  },
  {
    id: "k12",
    title: "Fee Proposal Template",
    category: "Templates & Guides",
    tags: ["proposal", "fees"],
    summary: "Standard fee proposal structure with scope, schedule, and payment milestone sections.",
    lastUpdated: "2026-04-30",
    author: "Dana Freij",
  },
];

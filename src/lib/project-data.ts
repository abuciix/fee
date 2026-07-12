export const STAGES = [
  "Concept",
  "Design Development",
  "Construction Documents",
  "Construction Administration",
] as const;

export type Stage = (typeof STAGES)[number];

export type ProjectStatus = "on_track" | "at_risk" | "delayed";

export type Project = {
  id: string;
  name: string;
  client: string;
  typology: string;
  location: string;
  leadArchitect: string;
  stage: Stage;
  status: ProjectStatus;
  budget: number;
  budgetSpent: number;
  nextMilestone: string;
  dueDate: string;
};

export const PROJECTS: Project[] = [
  {
    id: "marina-tower",
    name: "Marina Tower",
    client: "Al Rayan Group",
    typology: "Mixed-Use",
    location: "Doha, QA",
    leadArchitect: "Sara Haddad",
    stage: "Construction Documents",
    status: "at_risk",
    budget: 420000,
    budgetSpent: 318000,
    nextMilestone: "Client facade review",
    dueDate: "2026-07-18",
  },
  {
    id: "greenfield-campus",
    name: "Greenfield Campus",
    client: "Falcon Education Trust",
    typology: "Education",
    location: "Riyadh, SA",
    leadArchitect: "Omar Nasser",
    stage: "Construction Administration",
    status: "delayed",
    budget: 890000,
    budgetSpent: 812000,
    nextMilestone: "RFI response — structural",
    dueDate: "2026-07-14",
  },
  {
    id: "al-noor-residences",
    name: "Al Noor Residences",
    client: "Al Noor Development",
    typology: "Residential",
    location: "Dubai, AE",
    leadArchitect: "Layla Kanaan",
    stage: "Design Development",
    status: "on_track",
    budget: 310000,
    budgetSpent: 142000,
    nextMilestone: "Phase 2 BOQ finalization",
    dueDate: "2026-07-22",
  },
  {
    id: "harbor-view-offices",
    name: "Harbor View Offices",
    client: "Harbor Capital",
    typology: "Commercial",
    location: "Manama, BH",
    leadArchitect: "Yusuf Al Amin",
    stage: "Construction Administration",
    status: "on_track",
    budget: 560000,
    budgetSpent: 398000,
    nextMilestone: "Monthly site visit report",
    dueDate: "2026-07-16",
  },
  {
    id: "falcon-retail-fitout",
    name: "Falcon Retail Fitout",
    client: "Falcon Retail Group",
    typology: "Retail",
    location: "Jeddah, SA",
    leadArchitect: "Sara Haddad",
    stage: "Concept",
    status: "on_track",
    budget: 95000,
    budgetSpent: 8000,
    nextMilestone: "Concept presentation",
    dueDate: "2026-08-02",
  },
  {
    id: "desert-oasis-resort",
    name: "Desert Oasis Resort",
    client: "Oasis Hospitality",
    typology: "Hospitality",
    location: "Al Ain, AE",
    leadArchitect: "Omar Nasser",
    stage: "Design Development",
    status: "at_risk",
    budget: 1250000,
    budgetSpent: 540000,
    nextMilestone: "Landscape DD submission",
    dueDate: "2026-07-25",
  },
  {
    id: "central-library",
    name: "Central Library Renovation",
    client: "Ministry of Culture",
    typology: "Civic",
    location: "Amman, JO",
    leadArchitect: "Layla Kanaan",
    stage: "Concept",
    status: "on_track",
    budget: 210000,
    budgetSpent: 21000,
    nextMilestone: "Heritage consultant review",
    dueDate: "2026-08-05",
  },
  {
    id: "seaside-villas",
    name: "Seaside Villas",
    client: "Blue Horizon Properties",
    typology: "Residential",
    location: "Muscat, OM",
    leadArchitect: "Yusuf Al Amin",
    stage: "Construction Documents",
    status: "on_track",
    budget: 640000,
    budgetSpent: 401000,
    nextMilestone: "Issue CD set Rev B",
    dueDate: "2026-07-20",
  },
];

export type TaskStatus = "todo" | "in_progress" | "done";

export type ProjectTask = {
  id: string;
  projectId: string;
  title: string;
  assignee: string;
  status: TaskStatus;
  dueDate: string;
};

export const TASKS: ProjectTask[] = [
  { id: "t1", projectId: "marina-tower", title: "Client review — facade materials", assignee: "Sara Haddad", status: "in_progress", dueDate: "2026-07-14" },
  { id: "t2", projectId: "marina-tower", title: "Coordinate MEP clash resolution", assignee: "Nadia Fares", status: "todo", dueDate: "2026-07-17" },
  { id: "t3", projectId: "marina-tower", title: "Update drawing register", assignee: "Sara Haddad", status: "done", dueDate: "2026-07-10" },
  { id: "t4", projectId: "greenfield-campus", title: "Submit RFI response — structural", assignee: "Omar Nasser", status: "in_progress", dueDate: "2026-07-14" },
  { id: "t5", projectId: "greenfield-campus", title: "Review contractor submittal #12", assignee: "Karim Odeh", status: "todo", dueDate: "2026-07-15" },
  { id: "t6", projectId: "al-noor-residences", title: "Finalize BOQ for phase 2", assignee: "Layla Kanaan", status: "in_progress", dueDate: "2026-07-16" },
  { id: "t7", projectId: "al-noor-residences", title: "Interior finishes schedule", assignee: "Rana Idris", status: "todo", dueDate: "2026-07-21" },
  { id: "t8", projectId: "harbor-view-offices", title: "Site visit report — July", assignee: "Yusuf Al Amin", status: "todo", dueDate: "2026-07-16" },
  { id: "t9", projectId: "harbor-view-offices", title: "Punch list follow-up", assignee: "Karim Odeh", status: "in_progress", dueDate: "2026-07-19" },
  { id: "t10", projectId: "falcon-retail-fitout", title: "Concept presentation deck", assignee: "Sara Haddad", status: "in_progress", dueDate: "2026-07-30" },
  { id: "t11", projectId: "desert-oasis-resort", title: "Landscape DD package", assignee: "Omar Nasser", status: "in_progress", dueDate: "2026-07-25" },
  { id: "t12", projectId: "desert-oasis-resort", title: "Structural coordination meeting", assignee: "Nadia Fares", status: "todo", dueDate: "2026-07-18" },
  { id: "t13", projectId: "central-library", title: "Heritage consultant review", assignee: "Layla Kanaan", status: "todo", dueDate: "2026-08-01" },
  { id: "t14", projectId: "seaside-villas", title: "Issue CD set Rev B", assignee: "Yusuf Al Amin", status: "in_progress", dueDate: "2026-07-20" },
  { id: "t15", projectId: "seaside-villas", title: "Coordinate pool consultant drawings", assignee: "Rana Idris", status: "done", dueDate: "2026-07-08" },
];

export const PROJECT_STATUS_META: Record<ProjectStatus, { label: string; pill: "good" | "warning" | "critical" }> = {
  on_track: { label: "On track", pill: "good" },
  at_risk: { label: "At risk", pill: "warning" },
  delayed: { label: "Delayed", pill: "critical" },
};

export const TASK_STATUS_META: Record<TaskStatus, { label: string }> = {
  todo: { label: "To do" },
  in_progress: { label: "In progress" },
  done: { label: "Done" },
};

export function getProject(id: string): Project | undefined {
  return PROJECTS.find((p) => p.id === id);
}

export function getProjectTasks(projectId: string): ProjectTask[] {
  return TASKS.filter((t) => t.projectId === projectId);
}

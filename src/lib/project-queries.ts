import "server-only";
import { prisma } from "./db";
import type { Project, ProjectTask } from "./project-data";

function toProject(row: {
  id: string;
  name: string;
  typology: string;
  location: string;
  stage: string;
  status: string;
  budget: number;
  budgetSpent: number;
  nextMilestone: string;
  dueDate: Date;
  client: { company: string } | null;
  leadArchitect: { name: string } | null;
}): Project {
  return {
    id: row.id,
    name: row.name,
    client: row.client?.company ?? "Unassigned",
    typology: row.typology,
    location: row.location,
    leadArchitect: row.leadArchitect?.name ?? "Unassigned",
    stage: row.stage as Project["stage"],
    status: row.status as Project["status"],
    budget: row.budget,
    budgetSpent: row.budgetSpent,
    nextMilestone: row.nextMilestone,
    dueDate: row.dueDate.toISOString().slice(0, 10),
  };
}

function toTask(row: {
  id: string;
  projectId: string;
  title: string;
  status: string;
  dueDate: Date;
  assignee: { name: string } | null;
}): ProjectTask {
  return {
    id: row.id,
    projectId: row.projectId,
    title: row.title,
    assignee: row.assignee?.name ?? "Unassigned",
    status: row.status as ProjectTask["status"],
    dueDate: row.dueDate.toISOString().slice(0, 10),
  };
}

export async function getProjects(): Promise<Project[]> {
  const rows = await prisma.project.findMany({
    include: { client: true, leadArchitect: true },
    orderBy: { name: "asc" },
  });
  return rows.map(toProject);
}

export async function getProjectById(id: string): Promise<Project | null> {
  const row = await prisma.project.findUnique({
    where: { id },
    include: { client: true, leadArchitect: true },
  });
  return row ? toProject(row) : null;
}

export type ProjectEditData = Project & {
  clientId: string | null;
  leadArchitectId: string | null;
};

export async function getProjectForEdit(id: string): Promise<ProjectEditData | null> {
  const row = await prisma.project.findUnique({
    where: { id },
    include: { client: true, leadArchitect: true },
  });
  if (!row) return null;
  return { ...toProject(row), clientId: row.clientId, leadArchitectId: row.leadArchitectId };
}

export async function getTasks(): Promise<ProjectTask[]> {
  const rows = await prisma.task.findMany({
    include: { assignee: true },
    orderBy: { dueDate: "asc" },
  });
  return rows.map(toTask);
}

export async function getProjectTasks(projectId: string): Promise<ProjectTask[]> {
  const rows = await prisma.task.findMany({
    where: { projectId },
    include: { assignee: true },
    orderBy: { dueDate: "asc" },
  });
  return rows.map(toTask);
}

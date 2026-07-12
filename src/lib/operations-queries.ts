import "server-only";
import { prisma } from "./db";
import type {
  Asset,
  AssetCategory,
  AssetStatus,
  Candidate,
  Discipline,
  Intern,
  KnowledgeArticle,
  KnowledgeCategory,
  LeaveRequest,
  LeaveStatus,
  LeaveType,
  MilestoneStatus,
  OpenRole,
  RecruitmentStage,
  RoleStatus,
  TeamMember,
} from "./operations-data";

async function toTeamMember(row: {
  id: string;
  name: string;
  title: string;
  discipline: string | null;
  email: string;
  phone: string | null;
  location: string | null;
  joinDate: Date | null;
  utilization: number | null;
}): Promise<TeamMember> {
  const leadProjects = await prisma.project.findMany({
    where: { leadArchitectId: row.id },
    select: { name: true },
  });

  return {
    id: row.id,
    name: row.name,
    role: row.title,
    discipline: (row.discipline ?? "Administration") as Discipline,
    email: row.email,
    phone: row.phone ?? "",
    location: row.location ?? "",
    joinDate: (row.joinDate ?? new Date()).toISOString().slice(0, 10),
    utilization: row.utilization ?? 0,
    activeProjects: leadProjects.map((p) => p.name),
  };
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const rows = await prisma.user.findMany({
    where: { discipline: { not: null } },
    orderBy: { name: "asc" },
  });
  return Promise.all(rows.map(toTeamMember));
}

export async function getTeamMemberById(id: string): Promise<TeamMember | null> {
  const row = await prisma.user.findUnique({ where: { id } });
  if (!row || !row.discipline) return null;
  return toTeamMember(row);
}

// ---------------------------------------------------------------------------
// HR & Recruitment
// ---------------------------------------------------------------------------

export async function getOpenRoles(): Promise<OpenRole[]> {
  const rows = await prisma.openRole.findMany({ orderBy: { postedDate: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    department: row.department as Discipline,
    location: row.location,
    employmentType: row.employmentType,
    postedDate: row.postedDate.toISOString().slice(0, 10),
    status: row.status as RoleStatus,
  }));
}

export async function getCandidates(): Promise<Candidate[]> {
  const rows = await prisma.candidate.findMany({ orderBy: { id: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    roleId: row.roleId,
    name: row.name,
    stage: row.stage as RecruitmentStage,
    appliedDate: row.appliedDate.toISOString().slice(0, 10),
    source: row.source,
  }));
}

// ---------------------------------------------------------------------------
// Internship Management
// ---------------------------------------------------------------------------

export async function getInterns(): Promise<Intern[]> {
  const rows = await prisma.intern.findMany({
    include: { mentor: true, milestones: { orderBy: { order: "asc" } } },
    orderBy: { name: "asc" },
  });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    school: row.school,
    discipline: row.discipline as Discipline,
    mentor: row.mentor?.name ?? "Unassigned",
    startDate: row.startDate.toISOString().slice(0, 10),
    endDate: row.endDate.toISOString().slice(0, 10),
    milestones: row.milestones.map((m) => ({
      label: m.label,
      status: m.status as MilestoneStatus,
    })),
  }));
}

// ---------------------------------------------------------------------------
// Attendance & Leave
// ---------------------------------------------------------------------------

export async function getLeaveRequests(): Promise<LeaveRequest[]> {
  const rows = await prisma.leaveRequest.findMany({
    include: { user: true },
    orderBy: { startDate: "asc" },
  });
  return rows.map((row) => ({
    id: row.id,
    name: row.user.name,
    type: row.type as LeaveType,
    startDate: row.startDate.toISOString().slice(0, 10),
    endDate: row.endDate.toISOString().slice(0, 10),
    status: row.status as LeaveStatus,
    notes: row.notes ?? undefined,
  }));
}

// ---------------------------------------------------------------------------
// Resources & Assets
// ---------------------------------------------------------------------------

export async function getAssets(): Promise<Asset[]> {
  const rows = await prisma.asset.findMany({ orderBy: { name: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category as AssetCategory,
    assignedTo: row.assignedTo,
    location: row.location,
    status: row.status as AssetStatus,
    purchaseDate: row.purchaseDate.toISOString().slice(0, 10),
    nextRenewal: row.nextRenewal ? row.nextRenewal.toISOString().slice(0, 10) : undefined,
  }));
}

// ---------------------------------------------------------------------------
// Knowledge Library
// ---------------------------------------------------------------------------

export async function getKnowledgeArticles(): Promise<KnowledgeArticle[]> {
  const rows = await prisma.knowledgeArticle.findMany({
    include: { author: true },
    orderBy: { lastUpdated: "desc" },
  });
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    category: row.category as KnowledgeCategory,
    tags: row.tags.split(",").filter(Boolean),
    summary: row.summary,
    lastUpdated: row.lastUpdated.toISOString().slice(0, 10),
    author: row.author?.name ?? "Unknown",
  }));
}

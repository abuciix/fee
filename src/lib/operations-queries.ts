import "server-only";
import { prisma } from "./db";
import type { Discipline, TeamMember } from "./operations-data";

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

import "server-only";
import { prisma } from "./db";
import type { Integration, StudioUser, UserRole, UserStatus } from "./settings-data";

export async function getIntegrations(): Promise<Integration[]> {
  const rows = await prisma.integration.findMany({ orderBy: { name: "asc" } });
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    category: row.category as Integration["category"],
    description: row.description,
    icon: row.icon,
    connected: row.connected,
  }));
}

function deriveRole(title: string, systemRole: string): UserRole {
  if (systemRole === "admin") return "Admin";
  const lower = title.toLowerCase();
  if (lower.includes("account")) return "Accountant";
  if (lower.includes("intern") || lower.includes("junior")) return "Intern";
  return "Architect";
}

export async function getStudioUsers(): Promise<StudioUser[]> {
  const rows = await prisma.user.findMany({ orderBy: { name: "asc" } });
  const status: UserStatus = "Active";

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    email: row.email,
    role: deriveRole(row.title, row.systemRole),
    status,
    // Real login-activity tracking isn't implemented yet, so this always
    // shows "—" rather than fabricating a timestamp.
    lastActive: "—",
  }));
}

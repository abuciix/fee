"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { STAGES } from "@/lib/project-data";
import { verifySession } from "@/lib/dal";

const ProjectSchema = z.object({
  name: z.string().trim().min(1, "Project name is required."),
  clientId: z.string().trim().optional(),
  typology: z.string().trim().min(1, "Typology is required."),
  location: z.string().trim().min(1, "Location is required."),
  leadArchitectId: z.string().trim().optional(),
  stage: z.enum(STAGES),
  status: z.enum(["on_track", "at_risk", "delayed"]),
  budget: z.coerce.number().min(0, "Budget must be zero or greater."),
  budgetSpent: z.coerce.number().min(0, "Budget spent must be zero or greater."),
  nextMilestone: z.string().trim().min(1, "Next milestone is required."),
  dueDate: z.string().trim().min(1, "Due date is required."),
});

export type ProjectFormState = { error?: string } | undefined;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueProjectId(name: string) {
  const base = slugify(name) || "project";
  let id = base;
  let suffix = 2;
  while (await prisma.project.findUnique({ where: { id }, select: { id: true } })) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

export async function createProject(_prevState: ProjectFormState, formData: FormData): Promise<ProjectFormState> {
  await verifySession();

  const parsed = ProjectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const data = parsed.data;
  const id = await uniqueProjectId(data.name);

  await prisma.project.create({
    data: {
      id,
      name: data.name,
      clientId: data.clientId || null,
      typology: data.typology,
      location: data.location,
      leadArchitectId: data.leadArchitectId || null,
      stage: data.stage,
      status: data.status,
      budget: data.budget,
      budgetSpent: data.budgetSpent,
      nextMilestone: data.nextMilestone,
      dueDate: new Date(data.dueDate),
    },
  });

  revalidatePath("/projects/active");
  revalidatePath("/projects/stages");
  redirect(`/projects/active/${id}`);
}

export async function updateProject(
  id: string,
  _prevState: ProjectFormState,
  formData: FormData
): Promise<ProjectFormState> {
  await verifySession();

  const parsed = ProjectSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const data = parsed.data;

  await prisma.project.update({
    where: { id },
    data: {
      name: data.name,
      clientId: data.clientId || null,
      typology: data.typology,
      location: data.location,
      leadArchitectId: data.leadArchitectId || null,
      stage: data.stage,
      status: data.status,
      budget: data.budget,
      budgetSpent: data.budgetSpent,
      nextMilestone: data.nextMilestone,
      dueDate: new Date(data.dueDate),
    },
  });

  revalidatePath("/projects/active");
  revalidatePath("/projects/stages");
  revalidatePath(`/projects/active/${id}`);
  redirect(`/projects/active/${id}`);
}

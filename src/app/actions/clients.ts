"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { verifySession } from "@/lib/dal";

const ClientSchema = z.object({
  company: z.string().trim().min(1, "Company name is required."),
  industry: z.string().trim().min(1, "Industry is required."),
  status: z.enum(["active", "prospect", "past"]),
  location: z.string().trim().min(1, "Location is required."),
  contactName: z.string().trim().min(1, "Contact name is required."),
  contactRole: z.string().trim().min(1, "Contact role is required."),
  contactEmail: z.string().trim().email("Enter a valid email address."),
  contactPhone: z.string().trim().min(1, "Contact phone is required."),
  lastInteraction: z.string().trim().min(1, "Last interaction date is required."),
});

export type ClientFormState = { error?: string } | undefined;

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function uniqueClientId(company: string) {
  const base = slugify(company) || "client";
  let id = base;
  let suffix = 2;
  while (await prisma.client.findUnique({ where: { id }, select: { id: true } })) {
    id = `${base}-${suffix}`;
    suffix += 1;
  }
  return id;
}

export async function createClient(_prevState: ClientFormState, formData: FormData): Promise<ClientFormState> {
  await verifySession();

  const parsed = ClientSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const data = parsed.data;
  const id = await uniqueClientId(data.company);

  await prisma.client.create({
    data: {
      id,
      company: data.company,
      industry: data.industry,
      status: data.status,
      location: data.location,
      contactName: data.contactName,
      contactRole: data.contactRole,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      lastInteraction: new Date(data.lastInteraction),
    },
  });

  revalidatePath("/clients/crm");
  redirect(`/clients/crm/${id}`);
}

export async function updateClient(
  id: string,
  _prevState: ClientFormState,
  formData: FormData
): Promise<ClientFormState> {
  await verifySession();

  const parsed = ClientSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Invalid input." };
  }
  const data = parsed.data;

  await prisma.client.update({
    where: { id },
    data: {
      company: data.company,
      industry: data.industry,
      status: data.status,
      location: data.location,
      contactName: data.contactName,
      contactRole: data.contactRole,
      contactEmail: data.contactEmail,
      contactPhone: data.contactPhone,
      lastInteraction: new Date(data.lastInteraction),
    },
  });

  revalidatePath("/clients/crm");
  revalidatePath(`/clients/crm/${id}`);
  redirect(`/clients/crm/${id}`);
}

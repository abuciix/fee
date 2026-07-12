import "server-only";
import { prisma } from "./db";
import type { Client, ClientStatus, Lead, LeadStage, Proposal, ProposalStatus, Contract, ContractStatus } from "./client-data";

function toClient(row: {
  id: string;
  company: string;
  industry: string;
  status: string;
  location: string;
  contactName: string;
  contactRole: string;
  contactEmail: string;
  contactPhone: string;
  lastInteraction: Date;
  projects: { id: string }[];
  notes: { date: Date; note: string; author: { name: string } | null }[];
}): Client {
  return {
    id: row.id,
    company: row.company,
    industry: row.industry,
    status: row.status as ClientStatus,
    location: row.location,
    primaryContact: {
      name: row.contactName,
      role: row.contactRole,
      email: row.contactEmail,
      phone: row.contactPhone,
    },
    linkedProjectIds: row.projects.map((p) => p.id),
    lastInteraction: row.lastInteraction.toISOString().slice(0, 10),
    notes: row.notes.map((n) => ({
      date: n.date.toISOString().slice(0, 10),
      author: n.author?.name ?? "Unknown",
      note: n.note,
    })),
  };
}

const clientInclude = {
  projects: { select: { id: true } },
  notes: {
    include: { author: true },
    orderBy: { date: "desc" as const },
  },
};

export async function getClients(): Promise<Client[]> {
  const rows = await prisma.client.findMany({
    include: clientInclude,
    orderBy: { company: "asc" },
  });
  return rows.map(toClient);
}

export async function getClientById(id: string): Promise<Client | null> {
  const row = await prisma.client.findUnique({
    where: { id },
    include: clientInclude,
  });
  return row ? toClient(row) : null;
}

function toLead(row: {
  id: string;
  company: string;
  contactName: string;
  stage: string;
  estValue: number;
  source: string;
  createdDate: Date;
}): Lead {
  return {
    id: row.id,
    company: row.company,
    contactName: row.contactName,
    stage: row.stage as LeadStage,
    estValue: row.estValue,
    source: row.source,
    createdDate: row.createdDate.toISOString().slice(0, 10),
  };
}

export async function getLeads(): Promise<Lead[]> {
  const rows = await prisma.lead.findMany({ orderBy: { createdDate: "asc" } });
  return rows.map(toLead);
}

function toProposal(row: {
  id: string;
  clientId: string;
  title: string;
  value: number;
  status: string;
  dateCreated: Date;
  dateSent: Date | null;
}): Proposal {
  return {
    id: row.id,
    clientId: row.clientId,
    title: row.title,
    value: row.value,
    status: row.status as ProposalStatus,
    dateCreated: row.dateCreated.toISOString().slice(0, 10),
    dateSent: row.dateSent ? row.dateSent.toISOString().slice(0, 10) : null,
  };
}

export async function getProposals(): Promise<Proposal[]> {
  const rows = await prisma.proposal.findMany({ orderBy: { dateCreated: "asc" } });
  return rows.map(toProposal);
}

export async function getClientProposals(clientId: string): Promise<Proposal[]> {
  const rows = await prisma.proposal.findMany({
    where: { clientId },
    orderBy: { dateCreated: "asc" },
  });
  return rows.map(toProposal);
}

function toContract(row: {
  id: string;
  clientId: string;
  projectId: string | null;
  title: string;
  value: number;
  status: string;
  signedDate: Date | null;
  startDate: Date;
  endDate: Date;
}): Contract {
  return {
    id: row.id,
    clientId: row.clientId,
    projectId: row.projectId,
    title: row.title,
    value: row.value,
    status: row.status as ContractStatus,
    signedDate: row.signedDate ? row.signedDate.toISOString().slice(0, 10) : null,
    startDate: row.startDate.toISOString().slice(0, 10),
    endDate: row.endDate.toISOString().slice(0, 10),
  };
}

export async function getContracts(): Promise<Contract[]> {
  const rows = await prisma.contract.findMany({ orderBy: { startDate: "asc" } });
  return rows.map(toContract);
}

export async function getClientContracts(clientId: string): Promise<Contract[]> {
  const rows = await prisma.contract.findMany({
    where: { clientId },
    orderBy: { startDate: "asc" },
  });
  return rows.map(toContract);
}

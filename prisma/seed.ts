import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PROJECTS, TASKS } from "../src/lib/project-data";
import { CLIENTS, LEADS, PROPOSALS, CONTRACTS } from "../src/lib/client-data";
import { INVOICES, EXPENSES, PAYROLL, BOQ_ITEMS } from "../src/lib/finance-data";
import {
  TEAM_MEMBERS,
  OPEN_ROLES,
  CANDIDATES,
  INTERNS,
  LEAVE_REQUESTS,
  ASSETS,
  KNOWLEDGE_ARTICLES,
} from "../src/lib/operations-data";
import { TEMPLATES, LIBRARY_ITEMS, AUTOMATION_RULES } from "../src/lib/tools-data";
import { INTEGRATIONS } from "../src/lib/settings-data";

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db",
});
const prisma = new PrismaClient({ adapter });

const DEMO_PASSWORD = "andalus2026";

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);

  // ---------------------------------------------------------------------
  // Users — seeded from the Team Management roster. Rami Boustani (Studio
  // Principal, referenced only in payroll data) becomes the admin login.
  // ---------------------------------------------------------------------
  const userIdByName = new Map<string, string>();

  for (const member of TEAM_MEMBERS) {
    await prisma.user.upsert({
      where: { id: member.id },
      update: {},
      create: {
        id: member.id,
        email: member.email,
        passwordHash,
        name: member.name,
        title: member.role,
        systemRole: "member",
        discipline: member.discipline,
        phone: member.phone,
        location: member.location,
        joinDate: new Date(member.joinDate),
        utilization: member.utilization,
      },
    });
    userIdByName.set(member.name, member.id);
  }

  // Payroll references a few people (principal, office manager, accountant,
  // a junior architect) that don't appear in the Team Management roster —
  // create lightweight user records for them so payroll runs have a real
  // linked user.
  for (const record of PAYROLL) {
    if (userIdByName.has(record.name)) continue;
    const id = slugify(record.name);
    await prisma.user.upsert({
      where: { id },
      update: {},
      create: {
        id,
        email: `${id}@andalus-arch.com`,
        passwordHash,
        name: record.name,
        title: record.role,
        systemRole: record.role === "Studio Principal" ? "admin" : "member",
      },
    });
    userIdByName.set(record.name, id);
  }

  function userId(name: string | undefined | null): string | undefined {
    if (!name) return undefined;
    return userIdByName.get(name);
  }

  // ---------------------------------------------------------------------
  // Clients
  // ---------------------------------------------------------------------
  const clientIdByCompany = new Map<string, string>();
  for (const client of CLIENTS) {
    await prisma.client.upsert({
      where: { id: client.id },
      update: {},
      create: {
        id: client.id,
        company: client.company,
        industry: client.industry,
        status: client.status,
        location: client.location,
        contactName: client.primaryContact.name,
        contactRole: client.primaryContact.role,
        contactEmail: client.primaryContact.email,
        contactPhone: client.primaryContact.phone,
        lastInteraction: new Date(client.lastInteraction),
      },
    });
    clientIdByCompany.set(client.company, client.id);

    for (const [i, note] of client.notes.entries()) {
      await prisma.clientNote.upsert({
        where: { id: `${client.id}-note-${i}` },
        update: {},
        create: {
          id: `${client.id}-note-${i}`,
          clientId: client.id,
          date: new Date(note.date),
          authorId: userId(note.author),
          note: note.note,
        },
      });
    }
  }

  // ---------------------------------------------------------------------
  // Projects
  // ---------------------------------------------------------------------
  const projectIdByName = new Map<string, string>();
  for (const project of PROJECTS) {
    await prisma.project.upsert({
      where: { id: project.id },
      update: {},
      create: {
        id: project.id,
        name: project.name,
        clientId: clientIdByCompany.get(project.client),
        typology: project.typology,
        location: project.location,
        leadArchitectId: userId(project.leadArchitect),
        stage: project.stage,
        status: project.status,
        budget: project.budget,
        budgetSpent: project.budgetSpent,
        nextMilestone: project.nextMilestone,
        dueDate: new Date(project.dueDate),
      },
    });
    projectIdByName.set(project.name, project.id);
  }

  // ---------------------------------------------------------------------
  // Tasks
  // ---------------------------------------------------------------------
  for (const task of TASKS) {
    await prisma.task.upsert({
      where: { id: task.id },
      update: {},
      create: {
        id: task.id,
        projectId: task.projectId,
        title: task.title,
        assigneeId: userId(task.assignee),
        status: task.status,
        dueDate: new Date(task.dueDate),
      },
    });
  }

  // ---------------------------------------------------------------------
  // Leads
  // ---------------------------------------------------------------------
  for (const lead of LEADS) {
    await prisma.lead.upsert({
      where: { id: lead.id },
      update: {},
      create: {
        id: lead.id,
        company: lead.company,
        contactName: lead.contactName,
        stage: lead.stage,
        estValue: lead.estValue,
        source: lead.source,
        createdDate: new Date(lead.createdDate),
        clientId: clientIdByCompany.get(lead.company),
      },
    });
  }

  // ---------------------------------------------------------------------
  // Proposals
  // ---------------------------------------------------------------------
  for (const proposal of PROPOSALS) {
    await prisma.proposal.upsert({
      where: { id: proposal.id },
      update: {},
      create: {
        id: proposal.id,
        clientId: proposal.clientId,
        title: proposal.title,
        value: proposal.value,
        status: proposal.status,
        dateCreated: new Date(proposal.dateCreated),
        dateSent: proposal.dateSent ? new Date(proposal.dateSent) : null,
      },
    });
  }

  // ---------------------------------------------------------------------
  // Contracts
  // ---------------------------------------------------------------------
  for (const contract of CONTRACTS) {
    await prisma.contract.upsert({
      where: { id: contract.id },
      update: {},
      create: {
        id: contract.id,
        clientId: contract.clientId,
        projectId: contract.projectId,
        title: contract.title,
        value: contract.value,
        status: contract.status,
        signedDate: contract.signedDate ? new Date(contract.signedDate) : null,
        startDate: new Date(contract.startDate),
        endDate: new Date(contract.endDate),
      },
    });
  }

  // ---------------------------------------------------------------------
  // Invoices
  // ---------------------------------------------------------------------
  for (const invoice of INVOICES) {
    const clientId = clientIdByCompany.get(invoice.client);
    if (!clientId) continue;
    await prisma.invoice.upsert({
      where: { id: invoice.id },
      update: {},
      create: {
        id: invoice.id,
        number: invoice.number,
        clientId,
        projectId: projectIdByName.get(invoice.project),
        amount: invoice.amount,
        status: invoice.status,
        issueDate: new Date(invoice.issueDate),
        dueDate: new Date(invoice.dueDate),
        paidDate: invoice.paidDate ? new Date(invoice.paidDate) : null,
      },
    });
  }

  // ---------------------------------------------------------------------
  // Expenses
  // ---------------------------------------------------------------------
  for (const expense of EXPENSES) {
    await prisma.expense.upsert({
      where: { id: expense.id },
      update: {},
      create: {
        id: expense.id,
        description: expense.description,
        category: expense.category,
        projectId: expense.project ? projectIdByName.get(expense.project) : undefined,
        amount: expense.amount,
        reimbursable: expense.reimbursable,
        approvalStatus: expense.approvalStatus,
        submittedById: userId(expense.submittedBy),
        date: new Date(expense.date),
      },
    });
  }

  // ---------------------------------------------------------------------
  // Payroll
  // ---------------------------------------------------------------------
  for (const record of PAYROLL) {
    const id = userId(record.name);
    if (!id) continue;
    await prisma.payrollRun.upsert({
      where: { id: record.id },
      update: {},
      create: {
        id: record.id,
        userId: id,
        monthlyCompensation: record.monthlyCompensation,
        lastRunDate: new Date(record.lastRunDate),
        lastRunStatus: record.lastRunStatus,
      },
    });
  }

  // ---------------------------------------------------------------------
  // BOQ items
  // ---------------------------------------------------------------------
  for (const item of BOQ_ITEMS) {
    const projectId = projectIdByName.get(item.project);
    if (!projectId) continue;
    await prisma.bOQItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        projectId,
        category: item.category,
        description: item.description,
        unit: item.unit,
        quantity: item.quantity,
        unitCost: item.unitCost,
      },
    });
  }

  // ---------------------------------------------------------------------
  // HR & Recruitment
  // ---------------------------------------------------------------------
  for (const role of OPEN_ROLES) {
    await prisma.openRole.upsert({
      where: { id: role.id },
      update: {},
      create: {
        id: role.id,
        title: role.title,
        department: role.department,
        location: role.location,
        employmentType: role.employmentType,
        postedDate: new Date(role.postedDate),
        status: role.status,
      },
    });
  }

  for (const candidate of CANDIDATES) {
    await prisma.candidate.upsert({
      where: { id: candidate.id },
      update: {},
      create: {
        id: candidate.id,
        roleId: candidate.roleId,
        name: candidate.name,
        stage: candidate.stage,
        appliedDate: new Date(candidate.appliedDate),
        source: candidate.source,
      },
    });
  }

  // ---------------------------------------------------------------------
  // Internship Management
  // ---------------------------------------------------------------------
  for (const intern of INTERNS) {
    await prisma.intern.upsert({
      where: { id: intern.id },
      update: {},
      create: {
        id: intern.id,
        name: intern.name,
        school: intern.school,
        discipline: intern.discipline,
        mentorId: userId(intern.mentor),
        startDate: new Date(intern.startDate),
        endDate: new Date(intern.endDate),
      },
    });

    for (const [i, milestone] of intern.milestones.entries()) {
      await prisma.internMilestone.upsert({
        where: { id: `${intern.id}-milestone-${i}` },
        update: {},
        create: {
          id: `${intern.id}-milestone-${i}`,
          internId: intern.id,
          label: milestone.label,
          status: milestone.status,
          order: i,
        },
      });
    }
  }

  // ---------------------------------------------------------------------
  // Attendance & Leave
  // ---------------------------------------------------------------------
  for (const leave of LEAVE_REQUESTS) {
    const holderId = userId(leave.name);
    if (!holderId) continue;
    await prisma.leaveRequest.upsert({
      where: { id: leave.id },
      update: {},
      create: {
        id: leave.id,
        userId: holderId,
        type: leave.type,
        startDate: new Date(leave.startDate),
        endDate: new Date(leave.endDate),
        status: leave.status,
        notes: leave.notes,
      },
    });
  }

  // ---------------------------------------------------------------------
  // Resources & Assets
  // ---------------------------------------------------------------------
  for (const asset of ASSETS) {
    await prisma.asset.upsert({
      where: { id: asset.id },
      update: {},
      create: {
        id: asset.id,
        name: asset.name,
        category: asset.category,
        assignedTo: asset.assignedTo,
        location: asset.location,
        status: asset.status,
        purchaseDate: new Date(asset.purchaseDate),
        nextRenewal: asset.nextRenewal ? new Date(asset.nextRenewal) : null,
      },
    });
  }

  // ---------------------------------------------------------------------
  // Knowledge Library
  // ---------------------------------------------------------------------
  for (const article of KNOWLEDGE_ARTICLES) {
    await prisma.knowledgeArticle.upsert({
      where: { id: article.id },
      update: {},
      create: {
        id: article.id,
        title: article.title,
        category: article.category,
        tags: article.tags.join(","),
        summary: article.summary,
        lastUpdated: new Date(article.lastUpdated),
        authorId: userId(article.author),
      },
    });
  }

  // ---------------------------------------------------------------------
  // Templates, Design Libraries, Automation (Tools & Intelligence)
  // ---------------------------------------------------------------------
  for (const template of TEMPLATES) {
    await prisma.template.upsert({
      where: { id: template.id },
      update: {},
      create: {
        id: template.id,
        name: template.name,
        type: template.type,
        description: template.description,
        lastUpdated: new Date(template.lastUpdated),
        owner: template.owner,
      },
    });
  }

  for (const item of LIBRARY_ITEMS) {
    await prisma.libraryItem.upsert({
      where: { id: item.id },
      update: {},
      create: {
        id: item.id,
        name: item.name,
        category: item.category,
        format: item.format,
        icon: item.icon,
        color: item.color,
        updated: new Date(item.updated),
      },
    });
  }

  for (const rule of AUTOMATION_RULES) {
    await prisma.automationRule.upsert({
      where: { id: rule.id },
      update: {},
      create: {
        id: rule.id,
        name: rule.name,
        description: rule.description,
        trigger: rule.trigger,
        action: rule.action,
        enabled: rule.enabled,
      },
    });
  }

  // ---------------------------------------------------------------------
  // Integrations (Settings)
  // ---------------------------------------------------------------------
  for (const integration of INTEGRATIONS) {
    await prisma.integration.upsert({
      where: { id: integration.id },
      update: {},
      create: {
        id: integration.id,
        name: integration.name,
        category: integration.category,
        description: integration.description,
        icon: integration.icon,
        connected: integration.connected,
      },
    });
  }

  console.log(`Seed complete. Demo password for every user: "${DEMO_PASSWORD}"`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

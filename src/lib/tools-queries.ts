import "server-only";
import { prisma } from "./db";
import type { AutomationRule, LibraryItem, Template } from "./tools-data";

function toTemplate(row: {
  id: string;
  name: string;
  type: string;
  description: string;
  lastUpdated: Date;
  owner: string;
}): Template {
  return {
    id: row.id,
    name: row.name,
    type: row.type as Template["type"],
    description: row.description,
    lastUpdated: row.lastUpdated.toISOString().slice(0, 10),
    owner: row.owner,
  };
}

function toLibraryItem(row: {
  id: string;
  name: string;
  category: string;
  format: string;
  icon: string;
  color: string;
  updated: Date;
}): LibraryItem {
  return {
    id: row.id,
    name: row.name,
    category: row.category as LibraryItem["category"],
    format: row.format,
    icon: row.icon,
    color: row.color,
    updated: row.updated.toISOString().slice(0, 10),
  };
}

function toAutomationRule(row: {
  id: string;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
}): AutomationRule {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    trigger: row.trigger,
    action: row.action,
    enabled: row.enabled,
  };
}

// IDs like "lib-12" sort incorrectly under plain lexicographic order (before
// "lib-2"), so order by the numeric suffix to match the original mock order.
function byIdNumber(a: { id: string }, b: { id: string }): number {
  const numOf = (id: string) => Number(id.split("-").pop());
  return numOf(a.id) - numOf(b.id);
}

export async function getTemplates(): Promise<Template[]> {
  const rows = await prisma.template.findMany();
  return rows.sort(byIdNumber).map(toTemplate);
}

export async function getLibraryItems(): Promise<LibraryItem[]> {
  const rows = await prisma.libraryItem.findMany();
  return rows.sort(byIdNumber).map(toLibraryItem);
}

export async function getAutomationRules(): Promise<AutomationRule[]> {
  const rows = await prisma.automationRule.findMany();
  return rows.sort(byIdNumber).map(toAutomationRule);
}

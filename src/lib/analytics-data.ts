import { PROJECTS } from "@/lib/project-data";

/**
 * Mock analytics data for the Analytics section.
 * Mirrors the style of `project-data.ts` — typed consts, no fetching.
 * Figures are illustrative sample data for layout purposes.
 */

// ---------------------------------------------------------------------------
// Business Dashboard
// ---------------------------------------------------------------------------

export type QuarterRevenue = { quarter: string; revenue: number };

export const QUARTERLY_REVENUE: QuarterRevenue[] = [
  { quarter: "Q3 2025", revenue: 612000 },
  { quarter: "Q4 2025", revenue: 684000 },
  { quarter: "Q1 2026", revenue: 705000 },
  { quarter: "Q2 2026", revenue: 758000 },
];

export const BUSINESS_KPIS = {
  trailingRevenue: QUARTERLY_REVENUE.reduce((sum, q) => sum + q.revenue, 0),
  pipelineValue: 1240000,
  utilizationPct: 78,
  activeProjects: PROJECTS.length,
};

export const BUSINESS_TREND_NOTE =
  "Revenue has grown for four consecutive quarters, up 24% since Q3 2025, led by Marina Tower and Desert Oasis Resort billings. Pipeline remains healthy at $1.24M across 12 open opportunities.";

// ---------------------------------------------------------------------------
// Project Performance
// ---------------------------------------------------------------------------

export const ON_TIME_DELIVERY = {
  ratePct: 81,
  delivered: 42,
  onTime: 34,
  periodLabel: "trailing 12 months",
};

// ---------------------------------------------------------------------------
// Team Performance
// ---------------------------------------------------------------------------

export type DisciplineHours = {
  discipline: string;
  billableHours: number;
  nonBillableHours: number;
};

export const TEAM_HOURS_BY_DISCIPLINE: DisciplineHours[] = [
  { discipline: "Design Architecture", billableHours: 1240, nonBillableHours: 260 },
  { discipline: "Technical / CD", billableHours: 1080, nonBillableHours: 190 },
  { discipline: "BIM & Coordination", billableHours: 860, nonBillableHours: 140 },
  { discipline: "Site & CA", billableHours: 720, nonBillableHours: 110 },
  { discipline: "Interiors", billableHours: 540, nonBillableHours: 95 },
];

export type PersonHours = {
  name: string;
  discipline: string;
  billableHours: number;
  nonBillableHours: number;
};

export const TEAM_HOURS_BY_PERSON: PersonHours[] = [
  { name: "Sara Haddad", discipline: "Design Architect", billableHours: 152, nonBillableHours: 18 },
  { name: "Omar Nasser", discipline: "Design Architect", billableHours: 148, nonBillableHours: 24 },
  { name: "Layla Kanaan", discipline: "Design Architect", billableHours: 140, nonBillableHours: 20 },
  { name: "Yusuf Al Amin", discipline: "Technical Architect", billableHours: 158, nonBillableHours: 16 },
  { name: "Nadia Fares", discipline: "BIM Coordinator", billableHours: 132, nonBillableHours: 28 },
  { name: "Karim Odeh", discipline: "Site Architect", billableHours: 126, nonBillableHours: 22 },
  { name: "Rana Idris", discipline: "Interior Designer", billableHours: 118, nonBillableHours: 30 },
];

export const TEAM_UTILIZATION_STATS = {
  studioUtilizationPct: 78,
  billableHoursMonth: 4440,
  nonBillableHoursMonth: 795,
  targetUtilizationPct: 75,
};

// ---------------------------------------------------------------------------
// Sales Analytics
// ---------------------------------------------------------------------------

export type PipelineStage = { stage: string; value: number; count: number };

export const PIPELINE_BY_STAGE: PipelineStage[] = [
  { stage: "Inquiry", value: 480000, count: 9 },
  { stage: "Qualified", value: 610000, count: 7 },
  { stage: "Proposal Sent", value: 390000, count: 5 },
  { stage: "Negotiation", value: 240000, count: 3 },
  { stage: "Signed", value: 165000, count: 2 },
];

export const SALES_STATS = {
  winRatePct: 38,
  avgProposalToSignedDays: 27,
  openOpportunities: PIPELINE_BY_STAGE.slice(0, 4).reduce((sum, s) => sum + s.count, 0),
  pipelineTotal: PIPELINE_BY_STAGE.reduce((sum, s) => sum + s.value, 0),
};

export type LeadSourceWinRate = { source: string; winRatePct: number };

export const WIN_RATE_BY_SOURCE: LeadSourceWinRate[] = [
  { source: "Referral", winRatePct: 54 },
  { source: "Repeat client", winRatePct: 48 },
  { source: "RFP", winRatePct: 31 },
  { source: "Inbound", winRatePct: 22 },
];

// ---------------------------------------------------------------------------
// Financial Analytics
// ---------------------------------------------------------------------------

export type MonthlyFinancial = { month: string; revenue: number; marginPct: number };

export const MONTHLY_FINANCIALS: MonthlyFinancial[] = [
  { month: "Feb", revenue: 215000, marginPct: 22 },
  { month: "Mar", revenue: 238000, marginPct: 24 },
  { month: "Apr", revenue: 226000, marginPct: 19 },
  { month: "May", revenue: 251000, marginPct: 26 },
  { month: "Jun", revenue: 268000, marginPct: 25 },
  { month: "Jul", revenue: 143000, marginPct: 23 },
];

export type ProjectProfitability = { name: string; marginPct: number };

export const PROJECT_PROFITABILITY: ProjectProfitability[] = [
  { name: "Harbor View Offices", marginPct: 24 },
  { name: "Seaside Villas", marginPct: 19 },
  { name: "Al Noor Residences", marginPct: 16 },
  { name: "Desert Oasis Resort", marginPct: 9 },
  { name: "Marina Tower", marginPct: -4 },
  { name: "Greenfield Campus", marginPct: -11 },
];

export const CASH_FLOW_NOTE =
  "July revenue is tracking to a partial month (through Jul 12). Margin has held between 19–26% since February; Marina Tower and Greenfield Campus are the two projects currently running below cost.";

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

export function formatUSD(value: number): string {
  if (Math.abs(value) >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }
  if (Math.abs(value) >= 1_000) {
    return `$${(value / 1_000).toFixed(0)}K`;
  }
  return `$${value.toLocaleString()}`;
}

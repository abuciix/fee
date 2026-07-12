import Link from "next/link";
import { Card, PageHeader, StatTile, StatusPill } from "@/components/ui";

const stats = [
  { label: "Active Projects", value: "18", hint: "across 4 typologies" },
  { label: "Pipeline Value", value: "$1.24M", hint: "12 open opportunities" },
  { label: "Overdue Invoices", value: "$86,400", hint: "5 invoices past due" },
  { label: "Team Utilization", value: "78%", hint: "last 30 days" },
];

const stageBreakdown = [
  { stage: "Concept", count: 5 },
  { stage: "Design Development", count: 6 },
  { stage: "Construction Docs", count: 4 },
  { stage: "Construction Admin", count: 3 },
];

const maxStageCount = Math.max(...stageBreakdown.map((s) => s.count));

const tasks: { title: string; project: string; status: "good" | "warning" | "critical" }[] = [
  { title: "Client review — Marina Tower facade", project: "Marina Tower", status: "warning" },
  { title: "Submit RFI response", project: "Greenfield Campus", status: "critical" },
  { title: "Finalize BOQ for phase 2", project: "Al Noor Residences", status: "good" },
  { title: "Site visit report", project: "Harbor View Offices", status: "good" },
];

const statusLabel: Record<string, string> = {
  good: "On track",
  warning: "Due soon",
  critical: "Overdue",
};

const activity = [
  { text: "Proposal sent to Al Rayan Group", time: "2h ago" },
  { text: "Invoice #1042 marked paid", time: "5h ago" },
  { text: "Drawing set A-101 revised to Rev C", time: "Yesterday" },
  { text: "New lead: Falcon Retail Fitout", time: "Yesterday" },
];

export default function DashboardView() {
  return (
    <div>
      <PageHeader
        icon="🏠"
        title="Dashboard"
        description="A single view of studio health across projects, clients, and finances."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatTile key={stat.label} {...stat} />
        ))}
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Active Projects by Stage</h3>
          <ul className="space-y-3">
            {stageBreakdown.map((row) => (
              <li key={row.stage}>
                <div className="mb-1 flex justify-between text-xs text-status-neutral">
                  <span>{row.stage}</span>
                  <span>{row.count}</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className="h-full rounded-full bg-brand-blue"
                    style={{ width: `${(row.count / maxStageCount) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-1">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-brand-navy">Tasks Needing Attention</h3>
            <Link href="/projects/tasks" className="text-xs font-medium text-brand-blue hover:underline">
              View all
            </Link>
          </div>
          <ul className="space-y-3">
            {tasks.map((task) => (
              <li key={task.title} className="flex items-start justify-between gap-2">
                <div>
                  <div className="text-sm text-brand-navy">{task.title}</div>
                  <div className="text-xs text-status-neutral">{task.project}</div>
                </div>
                <StatusPill status={task.status} label={statusLabel[task.status]} />
              </li>
            ))}
          </ul>
        </Card>

        <Card className="lg:col-span-1">
          <h3 className="mb-4 text-sm font-semibold text-brand-navy">Recent Activity</h3>
          <ul className="space-y-3">
            {activity.map((item) => (
              <li key={item.text} className="flex items-start justify-between gap-2 text-sm">
                <span className="text-brand-navy">{item.text}</span>
                <span className="shrink-0 text-xs text-status-neutral">{item.time}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        Figures shown are sample data for layout purposes and will be replaced once the system is connected to live data.
      </p>
    </div>
  );
}

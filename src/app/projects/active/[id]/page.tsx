import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, StatusPill } from "@/components/ui";
import {
  PROJECT_STATUS_META,
  TASK_STATUS_META,
  getProject,
  getProjectTasks,
} from "@/lib/project-data";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = getProject(id);
  return { title: project?.name ?? "Project not found" };
}

const relatedLinks = [
  { label: "Drawings & Documents", href: "/projects/drawings" },
  { label: "BIM Management", href: "/projects/bim" },
  { label: "Site & Construction", href: "/projects/site" },
  { label: "Project Reports", href: "/projects/reports" },
];

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();

  const tasks = getProjectTasks(id);
  const meta = PROJECT_STATUS_META[project.status];
  const spentPct = Math.round((project.budgetSpent / project.budget) * 100);

  return (
    <div>
      <Link href="/projects/active" className="mb-4 inline-block text-sm text-brand-blue hover:underline">
        ← Active Projects
      </Link>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-brand-navy">{project.name}</h2>
          <p className="mt-1 text-sm text-status-neutral">
            {project.client} · {project.typology} · {project.location}
          </p>
        </div>
        <StatusPill status={meta.pill} label={meta.label} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Project Details</h3>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Stage</dt>
              <dd className="text-brand-navy">{project.stage}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Lead Architect</dt>
              <dd className="text-brand-navy">{project.leadArchitect}</dd>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <dt className="text-status-neutral">Next Milestone</dt>
              <dd className="text-brand-navy">{project.nextMilestone}</dd>
            </div>
            <div className="flex justify-between pb-2">
              <dt className="text-status-neutral">Due Date</dt>
              <dd className="text-brand-navy">
                {new Date(project.dueDate).toLocaleDateString(undefined, {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </dd>
            </div>
          </dl>

          <div className="mt-4">
            <div className="mb-1 flex justify-between text-xs text-status-neutral">
              <span>Budget</span>
              <span>
                ${project.budgetSpent.toLocaleString()} / ${project.budget.toLocaleString()} ({spentPct}%)
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted">
              <div
                className={`h-full rounded-full ${spentPct > 90 ? "bg-status-critical" : "bg-brand-blue"}`}
                style={{ width: `${Math.min(spentPct, 100)}%` }}
              />
            </div>
          </div>

          <div className="mt-5">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-status-neutral">
              Related
            </h4>
            <ul className="space-y-1">
              {relatedLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-brand-blue hover:underline">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Tasks</h3>
          {tasks.length === 0 ? (
            <p className="text-sm text-status-neutral">No tasks logged for this project yet.</p>
          ) : (
            <ul className="divide-y divide-border">
              {tasks.map((task) => (
                <li key={task.id} className="flex items-center justify-between gap-3 py-2.5">
                  <div>
                    <div className="text-sm text-brand-navy">{task.title}</div>
                    <div className="text-xs text-status-neutral">
                      {task.assignee} · Due{" "}
                      {new Date(task.dueDate).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-brand-navy">
                    {TASK_STATUS_META[task.status].label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

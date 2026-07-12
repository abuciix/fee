import Link from "next/link";
import { PROJECT_STATUS_META, type Project } from "@/lib/project-data";
import { StatusPill } from "@/components/ui";

export default function ProjectCard({ project }: { project: Project }) {
  const meta = PROJECT_STATUS_META[project.status];
  const spentPct = Math.round((project.budgetSpent / project.budget) * 100);

  return (
    <Link
      href={`/projects/active/${project.id}`}
      className="block rounded-lg border border-border bg-surface p-4 shadow-sm transition-colors hover:border-brand-tan"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-medium text-brand-navy">{project.name}</div>
          <div className="text-xs text-status-neutral">{project.client}</div>
        </div>
        <StatusPill status={meta.pill} label={meta.label} />
      </div>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-status-neutral">
        <span>{project.typology}</span>
        <span>{project.location}</span>
        <span>{project.leadArchitect}</span>
      </div>

      <div className="mt-3">
        <div className="mb-1 flex justify-between text-xs text-status-neutral">
          <span>{project.stage}</span>
          <span>{spentPct}% of budget spent</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
          <div
            className="h-full rounded-full bg-brand-blue"
            style={{ width: `${Math.min(spentPct, 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-3 text-xs text-status-neutral">
        Next: <span className="text-brand-navy">{project.nextMilestone}</span> ·{" "}
        {new Date(project.dueDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
      </div>
    </Link>
  );
}

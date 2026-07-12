import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ui";
import { PROJECTS, PROJECT_STATUS_META, STAGES } from "@/lib/project-data";

export const metadata = { title: "Project Stages" };

const STAGE_INFO: Record<(typeof STAGES)[number], string> = {
  Concept: "Client brief, site analysis, and initial massing options.",
  "Design Development": "Design refined and coordinated across disciplines.",
  "Construction Documents": "Permit and construction-ready drawing sets.",
  "Construction Administration": "Site support through to project handover.",
};

export default function ProjectStagesPage() {
  return (
    <div>
      <PageHeader
        icon="🏗"
        title="Project Stages"
        description="Every active project, grouped by the phase gate it's currently in."
      />

      <div className="grid gap-4 lg:grid-cols-4">
        {STAGES.map((stage) => {
          const projects = PROJECTS.filter((p) => p.stage === stage);
          return (
            <div key={stage} className="rounded-lg border border-border bg-surface-muted/40">
              <div className="border-b border-border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-brand-navy">{stage}</h3>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-brand-navy">
                    {projects.length}
                  </span>
                </div>
                <p className="mt-1 text-xs text-status-neutral">{STAGE_INFO[stage]}</p>
              </div>

              <ul className="space-y-2 p-2">
                {projects.length === 0 && (
                  <li className="p-2 text-center text-xs text-status-neutral">No projects at this stage.</li>
                )}
                {projects.map((project) => {
                  const meta = PROJECT_STATUS_META[project.status];
                  return (
                    <li key={project.id}>
                      <Link
                        href={`/projects/active/${project.id}`}
                        className="block rounded-md border border-border bg-surface p-3 shadow-sm transition-colors hover:border-brand-tan"
                      >
                        <div className="text-sm font-medium text-brand-navy">{project.name}</div>
                        <div className="text-xs text-status-neutral">{project.client}</div>
                        <div className="mt-2">
                          <StatusPill status={meta.pill} label={meta.label} />
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

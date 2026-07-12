import Link from "next/link";
import { PageHeader, StatTile, StatusPill } from "@/components/ui";
import { getProject } from "@/lib/project-data";
import { RFIS, SITE_VISITS } from "@/components/projects/site-data";

export const metadata = { title: "Site & Construction" };

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" });

export default function SiteConstructionPage() {
  const sortedVisits = [...SITE_VISITS].sort((a, b) => (a.date < b.date ? 1 : -1));
  const sortedRfis = [...RFIS].sort((a, b) => (a.dateRaised < b.dateRaised ? 1 : -1));
  const openRfis = RFIS.filter((r) => r.status === "open").length;

  return (
    <div>
      <PageHeader
        icon="🏗"
        title="Site & Construction"
        description="Site visits, RFIs, and construction administration in one log."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <StatTile label="Site Visits Logged" value={String(SITE_VISITS.length)} />
        <StatTile label="Open RFIs" value={String(openRfis)} hint={`${RFIS.length} total`} />
        <StatTile
          label="Answered RFIs"
          value={String(RFIS.length - openRfis)}
          hint="Closed out this quarter"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">Site Visit Reports</h3>
          <ul className="space-y-3">
            {sortedVisits.map((visit) => {
              const project = getProject(visit.projectId);
              return (
                <li key={visit.id} className="rounded-lg border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-brand-navy">{visit.reportNumber}</div>
                    <span className="text-xs text-status-neutral">{formatDate(visit.date)}</span>
                  </div>
                  {project && (
                    <Link
                      href={`/projects/active/${project.id}`}
                      className="text-xs text-brand-blue hover:underline"
                    >
                      {project.name}
                    </Link>
                  )}
                  <p className="mt-2 text-sm text-status-neutral">{visit.summary}</p>
                  <div className="mt-2 text-xs text-status-neutral">Logged by {visit.author}</div>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm font-semibold text-brand-navy">RFI Log</h3>
          <ul className="space-y-3">
            {sortedRfis.map((rfi) => {
              const project = getProject(rfi.projectId);
              return (
                <li key={rfi.id} className="rounded-lg border border-border bg-surface p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="font-medium text-brand-navy">{rfi.rfiNumber}</div>
                    <StatusPill
                      status={rfi.status === "open" ? "warning" : "good"}
                      label={rfi.status === "open" ? "Open" : "Answered"}
                    />
                  </div>
                  {project && (
                    <Link
                      href={`/projects/active/${project.id}`}
                      className="text-xs text-brand-blue hover:underline"
                    >
                      {project.name}
                    </Link>
                  )}
                  <p className="mt-2 text-sm text-status-neutral">{rfi.question}</p>
                  <div className="mt-2 text-xs text-status-neutral">
                    Raised by {rfi.raisedBy} · {formatDate(rfi.dateRaised)}
                    {rfi.dateAnswered && <> · Answered {formatDate(rfi.dateAnswered)}</>}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

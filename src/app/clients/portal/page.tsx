import { Card, PageHeader } from "@/components/ui";
import { PORTAL_DEMO_CLIENT } from "@/lib/client-data";

export const metadata = { title: "Client Portal" };

export default function ClientPortalPage() {
  const demo = PORTAL_DEMO_CLIENT;

  return (
    <div>
      <PageHeader
        icon="🤝"
        title="Client Portal"
        description="A preview of the shared, read-only status view a client sees for their project."
      />

      <div className="mb-5 rounded-lg border border-dashed border-brand-tan bg-surface p-3 text-xs text-status-neutral">
        Preview mode — this is what <span className="font-medium text-brand-navy">{demo.clientName}</span>{" "}
        sees when they log into the portal for their <span className="font-medium text-brand-navy">{demo.projectName}</span> project.
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-brand-navy">{demo.projectName}</h3>
              <p className="mt-1 text-sm text-status-neutral">Current phase: {demo.stage}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-semibold text-brand-navy">{demo.percentComplete}%</div>
              <div className="text-xs text-status-neutral">complete</div>
            </div>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-surface-muted">
            <div
              className="h-full rounded-full bg-brand-blue"
              style={{ width: `${demo.percentComplete}%` }}
            />
          </div>

          <div className="mt-2 text-xs text-status-neutral">
            Next: <span className="text-brand-navy">{demo.nextMilestone}</span> ·{" "}
            {new Date(demo.nextMilestoneDate).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>

          <h4 className="mt-6 mb-2 text-xs font-semibold uppercase tracking-wide text-status-neutral">
            Milestones
          </h4>
          <ul className="space-y-2">
            {demo.milestones.map((m) => (
              <li key={m.label} className="flex items-center justify-between gap-3 border-b border-border pb-2 last:border-b-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      m.complete ? "bg-status-good" : "bg-status-neutral"
                    }`}
                  />
                  <span className={m.complete ? "text-brand-navy" : "text-status-neutral"}>{m.label}</span>
                </div>
                <span className="text-xs text-status-neutral">
                  {new Date(m.date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </li>
            ))}
          </ul>
        </Card>

        <div className="space-y-4">
          <Card>
            <h4 className="mb-3 text-sm font-semibold text-brand-navy">Shared Documents</h4>
            <ul className="space-y-2">
              {demo.documents.map((doc) => (
                <li key={doc.name} className="text-sm">
                  <div className="text-brand-navy">{doc.name}</div>
                  <div className="text-xs text-status-neutral">
                    {doc.type} ·{" "}
                    {new Date(doc.uploadedDate).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h4 className="mb-3 text-sm font-semibold text-brand-navy">Messages</h4>
            <ul className="space-y-3">
              {demo.messages.map((msg, idx) => (
                <li key={idx} className="text-sm">
                  <div className="text-xs font-medium text-brand-navy">{msg.from}</div>
                  <p className="mt-0.5 text-status-neutral">{msg.message}</p>
                  <div className="mt-0.5 text-xs text-status-neutral">
                    {new Date(msg.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>
    </div>
  );
}

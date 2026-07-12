import { PageHeader } from "@/components/ui";
import { LEADS, LEAD_STAGES, LEAD_STAGE_META } from "@/lib/client-data";

export const metadata = { title: "Leads & Opportunities" };

const STAGE_ACCENT: Record<(typeof LEAD_STAGES)[number], string> = {
  new: "bg-status-neutral-bg text-status-neutral",
  contacted: "bg-status-neutral-bg text-status-neutral",
  proposal_sent: "bg-status-warning-bg text-status-warning",
  negotiation: "bg-status-warning-bg text-status-warning",
  won: "bg-status-good-bg text-status-good",
  lost: "bg-status-critical-bg text-status-critical",
};

export default function LeadsOpportunitiesPage() {
  const totalValue = LEADS.filter((l) => l.stage !== "lost").reduce((sum, l) => sum + l.estValue, 0);
  const wonValue = LEADS.filter((l) => l.stage === "won").reduce((sum, l) => sum + l.estValue, 0);

  return (
    <div>
      <PageHeader
        icon="🤝"
        title="Leads & Opportunities"
        description="Prospective work tracked from first inquiry to decision."
      />

      <div className="mb-5 flex flex-wrap gap-4 text-xs text-status-neutral">
        <span>
          Open pipeline value:{" "}
          <span className="font-medium text-brand-navy">${totalValue.toLocaleString()}</span>
        </span>
        <span>
          Won this year: <span className="font-medium text-brand-navy">${wonValue.toLocaleString()}</span>
        </span>
        <span>
          <span className="font-medium text-brand-navy">{LEADS.length}</span> total opportunities
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2">
        {LEAD_STAGES.map((stage) => {
          const leads = LEADS.filter((l) => l.stage === stage);
          const stageValue = leads.reduce((sum, l) => sum + l.estValue, 0);
          return (
            <div key={stage} className="w-[240px] shrink-0 rounded-lg border border-border bg-surface-muted/40">
              <div className="border-b border-border p-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-brand-navy">{LEAD_STAGE_META[stage].label}</h3>
                  <span className="rounded-full bg-surface px-2 py-0.5 text-xs font-medium text-brand-navy">
                    {leads.length}
                  </span>
                </div>
                <p className="mt-1 text-xs text-status-neutral">${stageValue.toLocaleString()}</p>
              </div>

              <ul className="space-y-2 p-2">
                {leads.length === 0 && (
                  <li className="p-2 text-center text-xs text-status-neutral">No leads here.</li>
                )}
                {leads.map((lead) => (
                  <li key={lead.id} className="rounded-md border border-border bg-surface p-3 shadow-sm">
                    <div className="text-sm font-medium text-brand-navy">{lead.company}</div>
                    <div className="text-xs text-status-neutral">{lead.contactName}</div>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="text-brand-navy">${lead.estValue.toLocaleString()}</span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-medium ${STAGE_ACCENT[stage]}`}
                      >
                        {lead.source}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

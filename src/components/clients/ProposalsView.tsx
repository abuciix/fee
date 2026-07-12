"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ui";
import { PROPOSAL_STATUS_META, type Client, type Proposal, type ProposalStatus } from "@/lib/client-data";

const STATUSES: Array<ProposalStatus | "All"> = ["All", "draft", "sent", "accepted", "declined"];

export default function ProposalsView({
  proposals,
  clients,
}: {
  proposals: Proposal[];
  clients: Client[];
}) {
  const [status, setStatus] = useState<ProposalStatus | "All">("All");

  const filtered = useMemo(
    () => proposals.filter((p) => status === "All" || p.status === status),
    [proposals, status]
  );

  const totalValue = filtered.reduce((sum, p) => sum + p.value, 0);

  return (
    <div>
      <PageHeader
        icon="🤝"
        title="Proposals"
        description="Fee proposals and scopes of work, from draft to decision."
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ProposalStatus | "All")}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : PROPOSAL_STATUS_META[s].label}
            </option>
          ))}
        </select>
        <div className="text-xs text-status-neutral">
          {filtered.length} proposals · ${totalValue.toLocaleString()} total value
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No proposals match this filter.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
                <th className="px-4 py-3 font-medium">Proposal</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((proposal) => {
                const client = clients.find((c) => c.id === proposal.clientId);
                const meta = PROPOSAL_STATUS_META[proposal.status];
                return (
                  <tr key={proposal.id} className="transition-colors hover:bg-surface-muted/50">
                    <td className="px-4 py-3 text-brand-navy">{proposal.title}</td>
                    <td className="px-4 py-3">
                      {client ? (
                        <Link
                          href={`/clients/crm/${client.id}`}
                          className="text-brand-blue hover:underline"
                        >
                          {client.company}
                        </Link>
                      ) : (
                        <span className="text-status-neutral">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-brand-navy">${proposal.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-status-neutral">
                      {new Date(proposal.dateSent ?? proposal.dateCreated).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <StatusPill status={meta.pill} label={meta.label} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

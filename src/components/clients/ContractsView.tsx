"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ui";
import { CONTRACT_STATUS_META, type Client, type Contract, type ContractStatus } from "@/lib/client-data";
import type { Project } from "@/lib/project-data";

const STATUSES: Array<ContractStatus | "All"> = ["All", "pending_signature", "active", "completed"];

export default function ContractsView({
  contracts,
  clients,
  projects,
}: {
  contracts: Contract[];
  clients: Client[];
  projects: Project[];
}) {
  const [status, setStatus] = useState<ContractStatus | "All">("All");

  const filtered = useMemo(
    () => contracts.filter((c) => status === "All" || c.status === status),
    [contracts, status]
  );

  const totalValue = filtered.reduce((sum, c) => sum + c.value, 0);

  return (
    <div>
      <PageHeader
        icon="🤝"
        title="Contracts"
        description="Signed agreements, key dates, and the projects and clients they cover."
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ContractStatus | "All")}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : CONTRACT_STATUS_META[s].label}
            </option>
          ))}
        </select>
        <div className="text-xs text-status-neutral">
          {filtered.length} contracts · ${totalValue.toLocaleString()} total value
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No contracts match this filter.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
                <th className="px-4 py-3 font-medium">Contract</th>
                <th className="px-4 py-3 font-medium">Client</th>
                <th className="px-4 py-3 font-medium">Project</th>
                <th className="px-4 py-3 font-medium">Value</th>
                <th className="px-4 py-3 font-medium">Signed</th>
                <th className="px-4 py-3 font-medium">Ends</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((contract) => {
                const client = clients.find((c) => c.id === contract.clientId);
                const project = projects.find((p) => p.id === contract.projectId);
                const meta = CONTRACT_STATUS_META[contract.status];
                return (
                  <tr key={contract.id} className="transition-colors hover:bg-surface-muted/50">
                    <td className="px-4 py-3 text-brand-navy">{contract.title}</td>
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
                    <td className="px-4 py-3">
                      {project ? (
                        <Link
                          href={`/projects/active/${project.id}`}
                          className="text-brand-blue hover:underline"
                        >
                          {project.name}
                        </Link>
                      ) : (
                        <span className="text-status-neutral">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-brand-navy">${contract.value.toLocaleString()}</td>
                    <td className="px-4 py-3 text-status-neutral">
                      {contract.signedDate
                        ? new Date(contract.signedDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "—"}
                    </td>
                    <td className="px-4 py-3 text-status-neutral">
                      {new Date(contract.endDate).toLocaleDateString(undefined, {
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

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PageHeader, StatusPill } from "@/components/ui";
import { CLIENTS, CLIENT_STATUS_META, type ClientStatus } from "@/lib/client-data";

const STATUSES: Array<ClientStatus | "All"> = ["All", "active", "prospect", "past"];
const INDUSTRIES = ["All", ...Array.from(new Set(CLIENTS.map((c) => c.industry)))];

export default function ClientCrmView() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ClientStatus | "All">("All");
  const [industry, setIndustry] = useState("All");

  const filtered = useMemo(() => {
    return CLIENTS.filter((c) => {
      if (status !== "All" && c.status !== status) return false;
      if (industry !== "All" && c.industry !== industry) return false;
      if (
        search &&
        !`${c.company} ${c.primaryContact.name}`.toLowerCase().includes(search.toLowerCase())
      )
        return false;
      return true;
    });
  }, [search, status, industry]);

  return (
    <div>
      <PageHeader
        icon="🤝"
        title="Client CRM"
        description="The master record of every client and contact the studio works with."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search clients or contacts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-56 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ClientStatus | "All")}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : CLIENT_STATUS_META[s].label}
            </option>
          ))}
        </select>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {INDUSTRIES.map((i) => (
            <option key={i} value={i}>
              {i === "All" ? "All industries" : i}
            </option>
          ))}
        </select>
        <div className="flex items-center text-xs text-status-neutral">
          {filtered.length} of {CLIENTS.length} clients
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border bg-surface p-8 text-center text-sm text-status-neutral">
          No clients match these filters.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-surface shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wide text-status-neutral">
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Primary Contact</th>
                <th className="px-4 py-3 font-medium">Linked Projects</th>
                <th className="px-4 py-3 font-medium">Last Interaction</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((client) => {
                const meta = CLIENT_STATUS_META[client.status];
                return (
                  <tr key={client.id} className="transition-colors hover:bg-surface-muted/50">
                    <td className="px-4 py-3">
                      <Link
                        href={`/clients/crm/${client.id}`}
                        className="font-medium text-brand-navy hover:text-brand-blue hover:underline"
                      >
                        {client.company}
                      </Link>
                      <div className="text-xs text-status-neutral">{client.industry}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-brand-navy">{client.primaryContact.name}</div>
                      <div className="text-xs text-status-neutral">{client.primaryContact.role}</div>
                    </td>
                    <td className="px-4 py-3 text-brand-navy">{client.linkedProjectIds.length}</td>
                    <td className="px-4 py-3 text-status-neutral">
                      {new Date(client.lastInteraction).toLocaleDateString(undefined, {
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

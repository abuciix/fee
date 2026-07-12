"use client";

import { useMemo, useState } from "react";
import { PageHeader, Card, StatusPill } from "@/components/ui";
import { ASSET_CATEGORIES, ASSET_STATUS_META, type Asset, type AssetStatus } from "@/lib/operations-data";

const CATEGORY_OPTIONS = ["All", ...ASSET_CATEGORIES];
const STATUS_OPTIONS: ("All" | AssetStatus)[] = ["All", "in_use", "available", "maintenance"];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function ResourcesAssetsView({ assets }: { assets: Asset[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState<"All" | AssetStatus>("All");

  const filtered = useMemo(() => {
    return assets.filter((a) => {
      if (category !== "All" && a.category !== category) return false;
      if (status !== "All" && a.status !== status) return false;
      if (search && !`${a.name} ${a.assignedTo} ${a.location}`.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [search, category, status, assets]);

  return (
    <div>
      <PageHeader
        icon="🏢"
        title="Resources & Assets"
        description="Studio equipment, software licenses, and room bookings."
      />

      <div className="mb-5 flex flex-wrap gap-3">
        <input
          type="search"
          placeholder="Search by item, assignee, or location…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64 rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {CATEGORY_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All categories" : c}
            </option>
          ))}
        </select>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as "All" | AssetStatus)}
          className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm outline-none focus:border-brand-blue"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All statuses" : ASSET_STATUS_META[s].label}
            </option>
          ))}
        </select>
        <div className="flex items-center text-xs text-status-neutral">
          {filtered.length} of {assets.length} assets
        </div>
      </div>

      <Card className="overflow-x-auto p-0">
        <table className="w-full min-w-[760px] text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-status-neutral">
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Category</th>
              <th className="px-4 py-3 font-medium">Assigned To</th>
              <th className="px-4 py-3 font-medium">Location</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Next Renewal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {filtered.map((asset) => {
              const meta = ASSET_STATUS_META[asset.status];
              return (
                <tr key={asset.id}>
                  <td className="px-4 py-3 text-brand-navy">{asset.name}</td>
                  <td className="px-4 py-3 text-status-neutral">{asset.category}</td>
                  <td className="px-4 py-3 text-status-neutral">{asset.assignedTo}</td>
                  <td className="px-4 py-3 text-status-neutral">{asset.location}</td>
                  <td className="px-4 py-3">
                    <StatusPill status={meta.pill} label={meta.label} />
                  </td>
                  <td className="px-4 py-3 text-status-neutral">
                    {asset.nextRenewal ? formatDate(asset.nextRenewal) : "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="p-8 text-center text-sm text-status-neutral">No assets match these filters.</div>
        )}
      </Card>
    </div>
  );
}

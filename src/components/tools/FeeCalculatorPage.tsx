"use client";

import { useState } from "react";
import { Card, PageHeader } from "@/components/ui";

const QUALITY_OPTIONS = [
  { value: 50, label: "Basic ($50/sec)" },
  { value: 100, label: "Medium ($100/sec)" },
  { value: 200, label: "High-quality ($200/sec)" },
];

const DETAIL_OPTIONS = [
  { value: 1, label: "Simple (no extra cost)" },
  { value: 1.2, label: "Moderate (+20%)" },
  { value: 1.5, label: "Complex (+50%)" },
];

const REVISION_OPTIONS = [
  { value: 0, label: "1 (no extra cost)" },
  { value: 200, label: "2 (+$200)" },
  { value: 500, label: "3+ (+$500)" },
];

const RESOLUTION_OPTIONS = [
  { value: 0, label: "1080p (no extra cost)" },
  { value: 500, label: "4K (+$500)" },
];

export default function FeeCalculatorPage() {
  const [duration, setDuration] = useState<string>("");
  const [quality, setQuality] = useState(QUALITY_OPTIONS[0].value);
  const [detail, setDetail] = useState(DETAIL_OPTIONS[0].value);
  const [revisions, setRevisions] = useState(REVISION_OPTIONS[0].value);
  const [resolution, setResolution] = useState(RESOLUTION_OPTIONS[0].value);
  const [rush, setRush] = useState(false);
  const [result, setResult] = useState<null | {
    total: number;
    base: number;
  }>(null);

  function calculateFee(e: React.FormEvent) {
    e.preventDefault();
    const durationNum = parseFloat(duration) || 0;
    const base = durationNum * quality;
    let total = base * detail + revisions + resolution;
    if (rush) total *= 1.3;
    setResult({ total, base });
  }

  return (
    <div>
      <PageHeader
        icon="🧮"
        title="Fee Calculator"
        description="Estimate architectural animation costs based on duration, quality, and scope."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,420px)_1fr]">
        <Card>
          <form onSubmit={calculateFee} className="space-y-4">
            <div>
              <label htmlFor="duration" className="mb-1 block text-sm font-medium text-brand-navy">
                Video Duration (in seconds)
              </label>
              <input
                id="duration"
                type="number"
                min="0"
                required
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="Enter duration"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              />
            </div>

            <div>
              <label htmlFor="quality" className="mb-1 block text-sm font-medium text-brand-navy">
                Rendering Quality
              </label>
              <select
                id="quality"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {QUALITY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="detail" className="mb-1 block text-sm font-medium text-brand-navy">
                Level of Detail
              </label>
              <select
                id="detail"
                value={detail}
                onChange={(e) => setDetail(Number(e.target.value))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {DETAIL_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="revisions" className="mb-1 block text-sm font-medium text-brand-navy">
                Revisions Included
              </label>
              <select
                id="revisions"
                value={revisions}
                onChange={(e) => setRevisions(Number(e.target.value))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {REVISION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="resolution" className="mb-1 block text-sm font-medium text-brand-navy">
                Output Resolution
              </label>
              <select
                id="resolution"
                value={resolution}
                onChange={(e) => setResolution(Number(e.target.value))}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue"
              >
                {RESOLUTION_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-2 text-sm text-brand-navy">
              <input
                type="checkbox"
                checked={rush}
                onChange={(e) => setRush(e.target.checked)}
                className="h-4 w-4 rounded border-border"
              />
              Rush Delivery (+30%)
            </label>

            <button
              type="submit"
              className="w-full rounded-md bg-brand-blue px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
            >
              Calculate Fee
            </button>
          </form>
        </Card>

        <Card>
          {result ? (
            <div>
              <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">
                Estimated Fee
              </div>
              <div className="mt-1 text-3xl font-semibold text-brand-blue">
                ${result.total.toFixed(2)}
              </div>
              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-status-neutral">Base cost</dt>
                  <dd className="text-brand-navy">${result.base.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-status-neutral">Level of detail multiplier</dt>
                  <dd className="text-brand-navy">×{detail}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-status-neutral">Revisions</dt>
                  <dd className="text-brand-navy">${revisions}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-status-neutral">Resolution upgrade</dt>
                  <dd className="text-brand-navy">${resolution}</dd>
                </div>
                <div className="flex justify-between pb-2">
                  <dt className="text-status-neutral">Rush delivery</dt>
                  <dd className="text-brand-navy">{rush ? "Yes (+30%)" : "No"}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="flex h-full min-h-40 items-center justify-center text-center text-sm text-status-neutral">
              Enter details and click &quot;Calculate Fee&quot; to see the estimate.
            </div>
          )}
        </Card>
      </div>

      <p className="mt-6 text-xs text-status-neutral">
        More calculators (area/FSI, fee percentage, staffing) are planned for this section.
      </p>
    </div>
  );
}

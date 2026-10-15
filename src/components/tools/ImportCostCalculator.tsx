"use client";

import { useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import {
  calculateImportCost,
  VAT_RATE,
  WITHHOLDING_RATE,
} from "@/lib/import-cost";

type MiscLine = { id: number; label: string; amount: string };

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue";

const fmt = (n: number) =>
  n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : 0;
};

function Field({
  label,
  value,
  onChange,
  suffix,
  placeholder = "0.00",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-status-neutral">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="number"
          inputMode="decimal"
          min="0"
          step="any"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={inputClass}
        />
        {suffix && <span className="text-xs text-status-neutral">{suffix}</span>}
      </div>
    </label>
  );
}

function Row({
  label,
  value,
  strong,
  hint,
}: {
  label: string;
  value: number;
  strong?: boolean;
  hint?: string;
}) {
  return (
    <div
      className={`flex items-baseline justify-between gap-4 py-1.5 text-sm ${
        strong ? "border-t border-border pt-3 font-semibold text-brand-navy" : ""
      }`}
    >
      <span>
        {label}
        {hint && <span className="ml-2 text-xs text-status-neutral">{hint}</span>}
      </span>
      <span className="tabular-nums">{fmt(value)}</span>
    </div>
  );
}

let lineId = 0;

export default function ImportCostCalculator() {
  const [hsCode, setHsCode] = useState("");
  const [goods, setGoods] = useState("");
  const [sea, setSea] = useState("");
  const [land, setLand] = useState("");
  const [desk, setDesk] = useState("");
  const [insurance, setInsurance] = useState("");
  const [dutyPct, setDutyPct] = useState("");
  const [misc, setMisc] = useState<MiscLine[]>([{ id: 0, label: "", amount: "" }]);

  const r = calculateImportCost({
    goodsValue: num(goods),
    seaFreight: num(sea),
    landFreight: num(land),
    deskClearance: num(desk),
    insurance: num(insurance),
    dutyRatePct: num(dutyPct),
    miscExpenses: misc.map((m) => num(m.amount)),
  });

  function updateMisc(id: number, patch: Partial<MiscLine>) {
    setMisc((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function reset() {
    setHsCode("");
    setGoods("");
    setSea("");
    setLand("");
    setDesk("");
    setInsurance("");
    setDutyPct("");
    setMisc([{ id: ++lineId, label: "", amount: "" }]);
  }

  return (
    <div>
      <PageHeader
        icon="🧮"
        title="Import Cost Calculator"
        description="Build up the CIF value, apply customs duty, VAT and withholding tax, then add miscellaneous expenses to get the total cost of an import."
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 text-sm font-semibold text-brand-navy">1. CIF value</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Goods value (FOB)" value={goods} onChange={setGoods} />
              <Field label="Sea freight" value={sea} onChange={setSea} />
              <Field label="Land freight" value={land} onChange={setLand} />
              <Field label="Desk clearance" value={desk} onChange={setDesk} />
              <Field label="Insurance" value={insurance} onChange={setInsurance} />
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-sm font-semibold text-brand-navy">2. Customs duty rate</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-status-neutral">
                  HS code
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  value={hsCode}
                  placeholder="e.g. 3303"
                  onChange={(e) => setHsCode(e.target.value)}
                  className={inputClass}
                />
              </label>
              <Field
                label="Duty rate for this HS code"
                value={dutyPct}
                onChange={setDutyPct}
                suffix="%"
                placeholder="0"
              />
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-sm font-semibold text-brand-navy">
              3. Miscellaneous expenses
            </h3>
            <div className="space-y-3">
              {misc.map((m) => (
                <div key={m.id} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={m.label}
                    placeholder="Description"
                    onChange={(e) => updateMisc(m.id, { label: e.target.value })}
                    className={inputClass}
                  />
                  <input
                    type="number"
                    inputMode="decimal"
                    min="0"
                    step="any"
                    value={m.amount}
                    placeholder="0.00"
                    onChange={(e) => updateMisc(m.id, { amount: e.target.value })}
                    className={`${inputClass} max-w-40`}
                  />
                  <button
                    type="button"
                    aria-label="Remove expense"
                    disabled={misc.length === 1}
                    onClick={() => setMisc((prev) => prev.filter((x) => x.id !== m.id))}
                    className="shrink-0 rounded-md px-2 py-2 text-sm text-status-neutral hover:text-status-critical disabled:opacity-30"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setMisc((prev) => [...prev, { id: ++lineId, label: "", amount: "" }])
              }
              className="mt-3 text-sm font-semibold text-brand-blue hover:text-brand-navy"
            >
              + Add expense
            </button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <h3 className="mb-2 text-sm font-semibold text-brand-navy">CIF value</h3>
            <Row label="Goods value (FOB)" value={num(goods)} />
            <Row label="Sea freight" value={num(sea)} />
            <Row label="Land freight" value={num(land)} />
            <Row label="Desk clearance" value={num(desk)} />
            <Row label="Insurance" value={num(insurance)} />
            <Row label="Total CIF" value={r.cif} strong />
          </Card>

          <Card>
            <h3 className="mb-2 text-sm font-semibold text-brand-navy">
              Customs tax{hsCode.trim() && ` (HS ${hsCode.trim()})`}
            </h3>
            <Row label="Customs duty" value={r.customsDuty} hint={`CIF × ${num(dutyPct)}%`} />
            <Row
              label="VAT"
              value={r.vat}
              hint={`(CIF + duty) × ${VAT_RATE * 100}%`}
            />
            <Row
              label="Withholding tax"
              value={r.withholdingTax}
              hint={`CIF × ${WITHHOLDING_RATE * 100}%`}
            />
            <Row label="Total customs tax" value={r.totalCustomsTax} strong />
          </Card>

          <Card>
            <h3 className="mb-2 text-sm font-semibold text-brand-navy">Total import cost</h3>
            <Row label="CIF" value={r.cif} />
            <Row label="Customs tax" value={r.totalCustomsTax} />
            <Row label="Miscellaneous expenses" value={r.totalMisc} />
            <Row label="Final total expenses" value={r.totalImportCost} strong />
          </Card>

          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-status-neutral hover:text-brand-navy"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

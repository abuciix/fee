"use client";

import { useEffect, useState } from "react";
import { PageHeader, Card } from "@/components/ui";
import { HS_CATEGORIES } from "@/lib/hs-codes";
import { buildReportHtml } from "@/lib/import-report";
import {
  calculateImportCost,
  VAT_RATE,
  WITHHOLDING_RATE,
} from "@/lib/import-cost";

// [reference, description, origin, FOB USD price per unit, unit]
type HsItem = [number, string, string, number, string];
type HsItems = Record<string, HsItem[]>;

const MAX_OPTIONS = 300;

type MiscLine = { id: number; label: string; amount: string };

const inputClass =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue";

const CURRENCIES = ["USD", "EUR", "GBP", "CNY", "AED", "TRY", "INR", "JPY", "KRW", "EGP", "SAR"];

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

const GRID = "grid grid-cols-[minmax(0,1fr)_5.5rem_6.5rem] gap-x-2 sm:grid-cols-[minmax(0,1fr)_8rem_9rem]";

function Row({
  label,
  value,
  strong,
  hint,
  rate = 0,
}: {
  label: string;
  value: number;
  strong?: boolean;
  hint?: string;
  rate?: number;
}) {
  return (
    <div
      className={`${GRID} items-baseline py-1.5 text-sm ${
        strong ? "mt-1 border-t border-border pt-3 font-semibold text-brand-navy" : ""
      }`}
    >
      <span className="min-w-0">
        {label}
        {hint && <span className="block text-xs font-normal text-status-neutral">{hint}</span>}
      </span>
      <span className="text-right tabular-nums">{fmt(value)}</span>
      <span className="text-right tabular-nums text-status-neutral">
        {rate > 0 ? fmt(value * rate) : "—"}
      </span>
    </div>
  );
}

function ResultCard({
  title,
  currency,
  localCurrency,
  children,
}: {
  title: string;
  currency: string;
  localCurrency: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <div className={`${GRID} mb-2 items-baseline`}>
        <h3 className="col-span-3 mb-1 min-w-0 text-sm font-semibold text-brand-navy sm:col-span-1 sm:mb-0 sm:truncate">
          {title}
        </h3>
        <span className="col-start-2 text-right text-xs font-semibold text-status-neutral sm:col-start-auto">
          {currency}
        </span>
        <span className="text-right text-xs font-semibold text-status-neutral">
          {localCurrency || "Local"}
        </span>
      </div>
      {children}
    </Card>
  );
}

let lineId = 0;

export default function ImportCostCalculator() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [hsCode, setHsCode] = useState("");
  const headings = HS_CATEGORIES.find((c) => c.chapter === category)?.headings ?? [];
  const [allItems, setAllItems] = useState<HsItems | null>(null);
  const [itemSearch, setItemSearch] = useState("");
  const [itemRef, setItemRef] = useState("");
  const [unit, setUnit] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [localCurrency, setLocalCurrency] = useState("ETB");
  const [rate, setRate] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [qty, setQty] = useState("");
  const [sea, setSea] = useState("");
  const [land, setLand] = useState("");
  const [desk, setDesk] = useState("");
  const [insurance, setInsurance] = useState("");
  const [dutyPct, setDutyPct] = useState("");
  const [misc, setMisc] = useState<MiscLine[]>([{ id: 0, label: "", amount: "" }]);

  // The price list is large, so load it only once an HS code is picked.
  useEffect(() => {
    if (!hsCode || allItems) return;
    let cancelled = false;
    import("@/lib/hs-items.json").then((m) => {
      if (!cancelled) setAllItems(m.default as unknown as HsItems);
    });
    return () => {
      cancelled = true;
    };
  }, [hsCode, allItems]);

  const items = (hsCode && allItems?.[hsCode]) || [];
  const needle = itemSearch.trim().toLowerCase();
  const matches = needle
    ? items.filter((i) => `${i[1]} ${i[2]}`.toLowerCase().includes(needle))
    : items;
  const shown = matches.slice(0, MAX_OPTIONS);
  const selected = items.find((i) => String(i[0]) === itemRef);

  function pickItem(ref: string) {
    setItemRef(ref);
    const it = items.find((i) => String(i[0]) === ref);
    if (!it) {
      setUnit("");
      return;
    }
    if (currency !== "USD") setRate(""); // the price list is in USD
    setCurrency("USD");
    setUnitPrice(String(it[3]));
    setUnit(it[4]);
    setTitle(it[1]);
  }

  function pickHsCode(code: string) {
    setHsCode(code);
    setItemRef("");
    setItemSearch("");
    setUnit("");
  }

  const goodsValue = num(unitPrice) * num(qty);

  const r = calculateImportCost({
    goodsValue,
    seaFreight: num(sea),
    landFreight: num(land),
    deskClearance: num(desk),
    insurance: num(insurance),
    dutyRatePct: num(dutyPct),
    miscExpenses: misc.map((m) => num(m.amount)),
  });

  const fx = num(rate);

  function updateMisc(id: number, patch: Partial<MiscLine>) {
    setMisc((prev) => prev.map((m) => (m.id === id ? { ...m, ...patch } : m)));
  }

  function reportHtml() {
    return buildReportHtml({
      title,
      hsCode,
      categoryName: HS_CATEGORIES.find((c) => c.chapter === category)?.name ?? "",
      currency,
      localCurrency,
      rate: fx,
      unitPrice: num(unitPrice),
      quantity: num(qty),
      unit,
      goodsValue,
      seaFreight: num(sea),
      landFreight: num(land),
      deskClearance: num(desk),
      insurance: num(insurance),
      dutyRatePct: num(dutyPct),
      misc: misc.map((m) => ({ label: m.label, amount: num(m.amount) })),
      result: r,
    });
  }

  function exportPdf() {
    const frame = document.createElement("iframe");
    frame.style.cssText = "position:fixed;right:0;bottom:0;width:0;height:0;border:0";
    frame.srcdoc = reportHtml();
    frame.onload = () => {
      frame.contentWindow?.focus();
      frame.contentWindow?.print();
      setTimeout(() => frame.remove(), 60_000);
    };
    document.body.appendChild(frame);
  }

  function downloadHtml() {
    const url = URL.createObjectURL(new Blob([reportHtml()], { type: "text/html" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = `import-cost-${hsCode || "report"}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
  }

  function reset() {
    setTitle("");
    setCategory("");
    pickHsCode("");
    setRate("");
    setUnitPrice("");
    setQty("");
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
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-status-neutral">
                Product title
              </span>
              <input
                type="text"
                value={title}
                placeholder="e.g. Ladies leather shoes, 500 pairs"
                onChange={(e) => setTitle(e.target.value)}
                className={inputClass}
              />
            </label>
          </Card>

          <Card>
            <h3 className="mb-4 text-sm font-semibold text-brand-navy">Currency</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-status-neutral">
                  Invoice currency
                </span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className={inputClass}
                >
                  {CURRENCIES.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-status-neutral">
                  Local currency
                </span>
                <input
                  type="text"
                  maxLength={3}
                  value={localCurrency}
                  onChange={(e) => setLocalCurrency(e.target.value.toUpperCase())}
                  className={inputClass}
                />
              </label>
              <Field
                label={`Exchange rate (1 ${currency} = ? ${localCurrency || "local"})`}
                value={rate}
                onChange={setRate}
                placeholder="0.0000"
              />
            </div>
            <p className="mt-3 text-xs text-status-neutral">
              Enter every amount below in {currency}. Results are shown in {currency} and
              converted to {localCurrency || "local currency"}.
            </p>
          </Card>

          <Card>
            <h3 className="mb-4 text-sm font-semibold text-brand-navy">1. HS code, product &amp; duty rate</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-status-neutral">
                  Category
                </span>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    pickHsCode("");
                  }}
                  className={inputClass}
                >
                  <option value="">Select category…</option>
                  {HS_CATEGORIES.map((c) => (
                    <option key={c.chapter} value={c.chapter}>
                      {c.chapter} · {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-status-neutral">
                  Sub-category
                </span>
                <select
                  value={hsCode}
                  disabled={!category}
                  onChange={(e) => pickHsCode(e.target.value)}
                  className={`${inputClass} disabled:opacity-50`}
                >
                  <option value="">{category ? "Select sub-category…" : "Select a category first"}</option>
                  {headings.map((h) => (
                    <option key={h.code} value={h.code}>
                      {h.code} · {h.examples.join(", ")}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-status-neutral">
                  HS code (filled automatically)
                </span>
                <input
                  type="text"
                  readOnly
                  value={hsCode}
                  placeholder="—"
                  className={`${inputClass} bg-surface-muted font-semibold`}
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

            <div className="mt-5 border-t border-border pt-4">
              <div className="mb-1 flex items-baseline justify-between">
                <span className="text-xs font-medium text-status-neutral">
                  Product from price list (fills unit price)
                </span>
                {hsCode && (
                  <span className="text-xs text-status-neutral">
                    {allItems ? `${matches.length} of ${items.length} items` : "Loading…"}
                  </span>
                )}
              </div>
              <input
                type="search"
                value={itemSearch}
                disabled={!hsCode}
                placeholder={hsCode ? "Search by product name or origin…" : "Select a sub-category first"}
                onChange={(e) => setItemSearch(e.target.value)}
                className={`${inputClass} mb-2 disabled:opacity-50`}
              />
              <select
                value={itemRef}
                disabled={!hsCode || !allItems}
                onChange={(e) => pickItem(e.target.value)}
                className={`${inputClass} disabled:opacity-50`}
              >
                <option value="">Select product…</option>
                {selected && !shown.includes(selected) && (
                  <option value={String(selected[0])}>{selected[1]}</option>
                )}
                {shown.map((i) => (
                  <option key={i[0]} value={String(i[0])}>
                    {i[1]} · {i[2]} · {fmt(i[3])} USD/{i[4]}
                  </option>
                ))}
              </select>
              {matches.length > MAX_OPTIONS && (
                <p className="mt-1 text-xs text-status-neutral">
                  Showing the first {MAX_OPTIONS} — type in the search box to narrow down.
                </p>
              )}
              {selected && (
                <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 rounded-md bg-surface-muted px-3 py-2 text-xs sm:grid-cols-4">
                  <div>
                    <dt className="text-status-neutral">HS code</dt>
                    <dd className="font-semibold">{hsCode}</dd>
                  </div>
                  <div>
                    <dt className="text-status-neutral">HS amount (FOB)</dt>
                    <dd className="font-semibold tabular-nums">
                      {fmt(selected[3])} USD / {selected[4]}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-status-neutral">Origin</dt>
                    <dd className="font-semibold">{selected[2]}</dd>
                  </div>
                  <div>
                    <dt className="text-status-neutral">Reference</dt>
                    <dd className="font-semibold">{selected[0]}</dd>
                  </div>
                </dl>
              )}
            </div>
          </Card>

          <Card>
            <h3 className="mb-4 text-sm font-semibold text-brand-navy">2. CIF value</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label={unit ? `Unit price (FOB per ${unit})` : "Unit price (FOB)"} value={unitPrice} onChange={setUnitPrice} />
              <Field label={unit ? `Quantity (${unit})` : "Quantity"} value={qty} onChange={setQty} placeholder="0" />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 rounded-md bg-surface-muted px-3 py-2 text-sm sm:col-span-2">
                <span className="text-status-neutral">Goods value (FOB) = unit price × quantity</span>
                <span className="font-semibold tabular-nums text-brand-navy">{fmt(goodsValue)}</span>
              </div>
              <Field label="Sea freight" value={sea} onChange={setSea} />
              <Field label="Land freight" value={land} onChange={setLand} />
              <Field label="Desk clearance" value={desk} onChange={setDesk} />
              <Field label="Insurance" value={insurance} onChange={setInsurance} />
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
          <ResultCard
            currency={currency}
            localCurrency={localCurrency}
            title={`CIF value${title.trim() ? ` — ${title.trim()}` : ""}`}
          >
            <Row rate={fx} label="Goods value (FOB)" value={goodsValue} />
            <Row rate={fx} label="Sea freight" value={num(sea)} />
            <Row rate={fx} label="Land freight" value={num(land)} />
            <Row rate={fx} label="Desk clearance" value={num(desk)} />
            <Row rate={fx} label="Insurance" value={num(insurance)} />
            <Row rate={fx} label="Total CIF" value={r.cif} strong />
          </ResultCard>

          <ResultCard
            currency={currency}
            localCurrency={localCurrency}
            title={`Customs tax${hsCode.trim() ? ` (HS ${hsCode.trim()})` : ""}`}
          >
            <Row rate={fx} label="Customs duty" value={r.customsDuty} hint={`CIF × ${num(dutyPct)}%`} />
            <Row
              rate={fx}
              label="VAT"
              value={r.vat}
              hint={`(CIF + duty) × ${VAT_RATE * 100}%`}
            />
            <Row
              rate={fx}
              label="Withholding tax"
              value={r.withholdingTax}
              hint={`CIF × ${WITHHOLDING_RATE * 100}%`}
            />
            <Row rate={fx} label="Total customs tax" value={r.totalCustomsTax} strong />
          </ResultCard>

          <ResultCard currency={currency} localCurrency={localCurrency} title="Total import cost">
            <Row rate={fx} label="CIF" value={r.cif} />
            <Row rate={fx} label="Customs tax" value={r.totalCustomsTax} />
            <Row rate={fx} label="Miscellaneous expenses" value={r.totalMisc} />
            <Row rate={fx} label="Final total expenses" value={r.totalImportCost} strong />
          </ResultCard>

          <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={exportPdf}
            className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-navy"
          >
            Export PDF
          </button>
          <button
            type="button"
            onClick={downloadHtml}
            className="rounded-md border border-border px-4 py-2 text-sm font-semibold text-brand-navy hover:bg-surface-muted"
          >
            Download HTML
          </button>
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
      <div className="sticky bottom-3 z-10 mt-6 flex items-baseline justify-between rounded-lg border border-border bg-surface px-4 py-3 shadow-lg lg:hidden">
        <span className="text-xs font-medium uppercase tracking-wide text-status-neutral">
          Final total
        </span>
        <span className="text-lg font-semibold tabular-nums text-brand-navy">
          {fmt(r.totalImportCost)} {currency}
        </span>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Card, PageHeader } from "@/components/ui";
import {
  CURRENCIES, DEFAULT_HS, LOCAL_CHARGES, PRESETS, calculate, parseHsCsv,
  type HsCategory, type Inputs,
} from "./import-data";

const field =
  "w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-brand-blue";
const label = "mb-1 block text-sm font-medium text-brand-navy";

function Num({
  id, text, value, onChange, step = "any",
}: { id: string; text: string; value: number; onChange: (n: number) => void; step?: string }) {
  return (
    <div>
      <label htmlFor={id} className={label}>{text}</label>
      <input
        id={id} type="number" min="0" step={step} className={field}
        value={value || ""} placeholder="0"
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
      />
    </div>
  );
}

export default function ImportCalculatorPage() {
  const [hsList, setHsList] = useState<HsCategory[]>(DEFAULT_HS);
  const [hsCode, setHsCode] = useState(DEFAULT_HS[0].code);
  const [presetId, setPresetId] = useState("uae");
  const preset = PRESETS.find((p) => p.id === presetId)!;
  const [localCur, setLocalCur] = useState(preset.local);
  const [cur, setCur] = useState("USD");
  const [rate, setRate] = useState(3.6725);
  const [goods, setGoods] = useState(0);
  const [freight, setFreight] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [origin, setOrigin] = useState(0);
  const [qty, setQty] = useState(1);
  const [dutyPct, setDutyPct] = useState(DEFAULT_HS[0].duty);
  const [extraDutyPct, setExtraDutyPct] = useState(0);
  const [excisePct, setExcisePct] = useState(0);
  const [vatPct, setVatPct] = useState(preset.vat);
  const [vatRecoverable, setVatRecoverable] = useState(true);
  const [local, setLocal] = useState<Record<string, number>>({});
  const [csvMsg, setCsvMsg] = useState("");

  const inputs: Inputs = {
    goods, freight, insurance, originCharges: origin, dutyPct, extraDutyPct,
    surchargePct: preset.surchargeOnDuty, excisePct, vatPct, vatRecoverable,
    rate, local, qty,
  };
  const r = calculate(inputs);

  const fmt = (n: number) => n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const money = (n: number) => `${fmt(n)} ${localCur}`;

  function pickHs(code: string) {
    setHsCode(code);
    const hs = hsList.find((h) => h.code === code);
    if (hs) setDutyPct(hs.duty);
  }

  function pickPreset(id: string) {
    const p = PRESETS.find((x) => x.id === id)!;
    setPresetId(id);
    setLocalCur(p.local);
    setVatPct(p.vat);
  }

  async function loadCsv(file: File) {
    const rows = parseHsCsv(await file.text());
    if (!rows.length) {
      setCsvMsg("No valid rows found. Expected columns: HS code, description, duty %.");
      return;
    }
    setHsList(rows);
    pickHsFrom(rows[0]);
    setCsvMsg(`Loaded ${rows.length} HS codes from ${file.name}.`);
  }
  function pickHsFrom(h: HsCategory) {
    setHsCode(h.code);
    setDutyPct(h.duty);
  }

  const rows: [string, string, boolean?][] = [
    [`Goods value (FOB) ${fmt(goods)} ${cur} × ${rate}`, money(r.goodsL)],
    [`Freight + origin charges ${fmt(freight + origin)} ${cur} × ${rate}`, money(r.freightL)],
    [`Insurance ${fmt(insurance)} ${cur} × ${rate}`, money(r.insuranceL)],
    ["CIF value = goods + freight + insurance", money(r.cif), true],
    [`Customs duty = CIF × ${dutyPct}%`, money(r.duty)],
    ...(extraDutyPct ? [[`Additional duty = CIF × ${extraDutyPct}%`, money(r.extraDuty)] as [string, string]] : []),
    ...(preset.surchargeOnDuty
      ? [[`${preset.surchargeLabel} = duty × ${preset.surchargeOnDuty}%`, money(r.surcharge)] as [string, string]]
      : []),
    ...(excisePct ? [[`Excise = (CIF + duties) × ${excisePct}%`, money(r.excise)] as [string, string]] : []),
    [`VAT/GST = (CIF + duties + excise) × ${vatPct}% on ${fmt(r.vatBase)}`, money(r.vat)],
    ["Local charges (port, clearance, transport, etc.)", money(r.localTotal)],
    ["Total landed cost", money(r.landed), true],
  ];

  return (
    <div>
      <PageHeader
        icon="🚢"
        title="Import Cost Calculator"
        description="Landed cost for imported goods: product, freight, insurance, customs duty, VAT and local clearance charges."
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,460px)_1fr]">
        <Card>
          <div className="space-y-4">
            <div>
              <label htmlFor="hs" className={label}>Product category (HS code)</label>
              <select id="hs" className={field} value={hsCode} onChange={(e) => pickHs(e.target.value)}>
                {hsList.map((h) => (
                  <option key={h.code} value={h.code}>{h.code} - {h.description} ({h.duty}%)</option>
                ))}
              </select>
              <label htmlFor="csv" className="mt-2 block text-xs text-status-neutral">
                Use your own HS archive: save the Excel sheet as CSV (code, description, duty %) and load it.
              </label>
              <input
                id="csv" type="file" accept=".csv,text/csv,text/plain" className="mt-1 text-xs"
                onChange={(e) => e.target.files?.[0] && loadCsv(e.target.files[0])}
              />
              {csvMsg && <p className="mt-1 text-xs text-status-neutral">{csvMsg}</p>}
            </div>

            <div>
              <label htmlFor="country" className={label}>Importing country (tax rules)</label>
              <select id="country" className={field} value={presetId} onChange={(e) => pickPreset(e.target.value)}>
                {PRESETS.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="cur" className={label}>Invoice currency</label>
                <select id="cur" className={field} value={cur} onChange={(e) => setCur(e.target.value)}>
                  {CURRENCIES.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="lc" className={label}>Local currency</label>
                <input id="lc" className={field} value={localCur} onChange={(e) => setLocalCur(e.target.value.toUpperCase())} />
              </div>
              <div className="col-span-2">
                <Num id="rate" text={`Exchange rate: 1 ${cur} = ? ${localCur}`} value={rate} onChange={setRate} />
              </div>
            </div>

            <fieldset className="space-y-3 border-t border-border pt-3">
              <legend className="text-sm font-semibold text-brand-navy">Costs in {cur}</legend>
              <div className="grid grid-cols-2 gap-3">
                <Num id="goods" text="Goods value (FOB)" value={goods} onChange={setGoods} />
                <Num id="qty" text="Quantity (units)" value={qty} onChange={setQty} />
                <Num id="freight" text="Sea/air freight" value={freight} onChange={setFreight} />
                <Num id="ins" text="Insurance" value={insurance} onChange={setInsurance} />
                <Num id="origin" text="Origin charges (inland, export clearance)" value={origin} onChange={setOrigin} />
              </div>
            </fieldset>

            <fieldset className="space-y-3 border-t border-border pt-3">
              <legend className="text-sm font-semibold text-brand-navy">Duties & taxes (%)</legend>
              <div className="grid grid-cols-2 gap-3">
                <Num id="duty" text="Customs duty" value={dutyPct} onChange={setDutyPct} />
                <Num id="xduty" text="Additional duty" value={extraDutyPct} onChange={setExtraDutyPct} />
                <Num id="excise" text="Excise" value={excisePct} onChange={setExcisePct} />
                <Num id="vat" text="VAT / GST" value={vatPct} onChange={setVatPct} />
              </div>
              <label className="flex items-center gap-2 text-sm text-brand-navy">
                <input type="checkbox" className="h-4 w-4" checked={vatRecoverable}
                  onChange={(e) => setVatRecoverable(e.target.checked)} />
                VAT is recoverable (exclude from unit cost)
              </label>
            </fieldset>

            <fieldset className="space-y-3 border-t border-border pt-3">
              <legend className="text-sm font-semibold text-brand-navy">Local charges in {localCur}</legend>
              <div className="grid grid-cols-2 gap-3">
                {LOCAL_CHARGES.map((c) => (
                  <Num key={c.key} id={`l-${c.key}`} text={c.label} value={local[c.key] ?? 0}
                    onChange={(n) => setLocal((s) => ({ ...s, [c.key]: n }))} />
                ))}
              </div>
            </fieldset>
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <div className="text-xs font-medium uppercase tracking-wide text-status-neutral">Total landed cost</div>
            <div className="mt-1 text-3xl font-semibold text-brand-blue">{money(r.landed)}</div>
            <div className="mt-1 text-sm text-status-neutral">
              ≈ {fmt(rate ? r.landed / rate : 0)} {cur} · Duties & taxes {money(r.taxes + r.vat)}
              {qty > 0 && <> · Cost per unit {money(r.perUnit)}{vatRecoverable ? " (excl. VAT)" : ""}</>}
            </div>
            <dl className="mt-5 space-y-2 text-sm">
              {rows.map(([k, v, bold]) => (
                <div key={k} className={`flex justify-between gap-4 border-b border-border pb-2 ${bold ? "font-semibold" : ""}`}>
                  <dt className="text-status-neutral">{k}</dt>
                  <dd className="whitespace-nowrap text-brand-navy">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>

          <Card>
            <h3 className="text-sm font-semibold text-brand-navy">Formula used - {preset.label}</h3>
            <p className="mt-1 text-sm text-status-neutral">{preset.note}</p>
            {preset.source && <p className="mt-1 text-xs text-status-neutral">Official reference: {preset.source}</p>}
            <p className="mt-2 text-xs text-status-neutral">
              Duty rates in the starter HS list are placeholders. Confirm the rate for your exact HS code in the official
              tariff before relying on the result.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}

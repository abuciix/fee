import type { ImportCostResult } from "@/lib/import-cost";
import { VAT_RATE, WITHHOLDING_RATE } from "@/lib/import-cost";

export type ImportReportData = {
  title: string;
  hsCode: string;
  categoryName: string;
  currency: string;
  localCurrency: string;
  rate: number;
  unitPrice: number;
  quantity: number;
  unit: string;
  goodsValue: number;
  seaFreight: number;
  landFreight: number;
  deskClearance: number;
  insurance: number;
  dutyRatePct: number;
  misc: { label: string; amount: number }[];
  result: ImportCostResult;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const fmt = (n: number) =>
  n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function buildReportHtml(d: ImportReportData): string {
  const local = d.rate > 0;
  const row = (label: string, v: number, cls = "") =>
    `<tr class="${cls}"><td>${esc(label)}</td><td class="n">${fmt(v)}</td><td class="n">${
      local ? fmt(v * d.rate) : "—"
    }</td></tr>`;
  const head = (t: string) =>
    `<tr class="h"><th>${esc(t)}</th><th class="n">${esc(d.currency)}</th><th class="n">${esc(
      d.localCurrency || "Local",
    )}</th></tr>`;
  const r = d.result;
  const misc = d.misc.filter((m) => m.amount > 0);

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<title>Import cost report${d.title ? " - " + esc(d.title) : ""}</title>
<style>
  @page { size: A4; margin: 16mm; }
  * { box-sizing: border-box; }
  body { font: 13px/1.45 -apple-system, "Segoe UI", Roboto, Arial, sans-serif; color: #171717; margin: 0; }
  h1 { font-size: 22px; margin: 0 0 4px; color: #12263a; }
  .sub { color: #6b7280; margin-bottom: 18px; }
  dl { display: grid; grid-template-columns: 160px 1fr; gap: 4px 12px; margin: 0 0 20px; }
  dt { color: #6b7280; } dd { margin: 0; font-weight: 600; }
  table { width: 100%; border-collapse: collapse; margin-bottom: 18px; }
  th, td { padding: 6px 8px; text-align: left; border-bottom: 1px solid #dfdcd5; }
  tr.h th { background: #12263a; color: #fff; font-size: 12px; }
  .n { text-align: right; font-variant-numeric: tabular-nums; width: 130px; }
  tr.t td { font-weight: 700; background: #eceae5; }
  tr.g td { font-weight: 700; background: #12263a; color: #fff; font-size: 14px; }
  .note { color: #6b7280; font-size: 11px; }
</style></head><body>
<h1>Import cost report</h1>
<div class="sub">Generated ${esc(new Date().toLocaleDateString("en-US", { dateStyle: "long" }))}</div>
<dl>
  <dt>Product</dt><dd>${esc(d.title || "—")}</dd>
  <dt>HS code</dt><dd>${esc(d.hsCode || "—")}${d.categoryName ? " · " + esc(d.categoryName) : ""}</dd>
  <dt>Unit price × quantity</dt><dd>${fmt(d.unitPrice)} × ${d.quantity.toLocaleString("en-US")}${d.unit ? " " + esc(d.unit) : ""} ${esc(d.currency)}</dd>
  <dt>Exchange rate</dt><dd>${
    local ? `1 ${esc(d.currency)} = ${d.rate} ${esc(d.localCurrency)}` : "not set"
  }</dd>
</dl>
<table>
  ${head("CIF value")}
  ${row("Goods value (FOB)", d.goodsValue)}
  ${row("Sea freight", d.seaFreight)}
  ${row("Land freight", d.landFreight)}
  ${row("Desk clearance", d.deskClearance)}
  ${row("Insurance", d.insurance)}
  ${row("Total CIF", r.cif, "t")}
</table>
<table>
  ${head("Customs tax")}
  ${row(`Customs duty (CIF × ${d.dutyRatePct}%)`, r.customsDuty)}
  ${row(`VAT ((CIF + duty) × ${VAT_RATE * 100}%)`, r.vat)}
  ${row(`Withholding tax (CIF × ${WITHHOLDING_RATE * 100}%)`, r.withholdingTax)}
  ${row("Total customs tax", r.totalCustomsTax, "t")}
</table>
<table>
  ${head("Miscellaneous expenses")}
  ${misc.map((m) => row(m.label.trim() || "Expense", m.amount)).join("\n  ")}
  ${row("Total miscellaneous", r.totalMisc, "t")}
</table>
<table>
  ${head("Total import cost")}
  ${row("CIF", r.cif)}
  ${row("Customs tax", r.totalCustomsTax)}
  ${row("Miscellaneous expenses", r.totalMisc)}
  ${row("Final total expenses", r.totalImportCost, "g")}
</table>
<p class="note">Estimate for planning purposes. Customs duty rate was entered manually for HS ${esc(d.hsCode || "—")}.</p>
</body></html>`;
}

export const VAT_RATE = 0.15;
export const WITHHOLDING_RATE = 0.03;
export const SURTAX_RATE = 0.1;

export type ImportCostInput = {
  goodsValue: number; // FOB value of the goods
  seaFreight: number;
  landFreight: number;
  deskClearance: number;
  insurance: number;
  dutyRatePct: number; // customs duty % for the HS code
  excisePct?: number; // excise % (only 19 product classes), on CIF + duty
  surtaxEnabled?: boolean; // 10% surtax on CIF + duty + excise
  miscExpenses: number[];
};

export type ImportCostResult = {
  cif: number;
  customsDuty: number;
  excise: number;
  vat: number;
  surtax: number;
  withholdingTax: number;
  totalCustomsTax: number;
  totalMisc: number;
  totalImportCost: number;
};

export function calculateImportCost(i: ImportCostInput): ImportCostResult {
  const cif = i.goodsValue + i.seaFreight + i.landFreight + i.deskClearance + i.insurance;
  const customsDuty = cif * (i.dutyRatePct / 100);
  const excise = (cif + customsDuty) * ((i.excisePct ?? 0) / 100);
  const taxBase = cif + customsDuty + excise;
  const vat = taxBase * VAT_RATE;
  const surtax = i.surtaxEnabled ? taxBase * SURTAX_RATE : 0;
  const withholdingTax = cif * WITHHOLDING_RATE;
  const totalCustomsTax = customsDuty + excise + vat + surtax + withholdingTax;
  const totalMisc = i.miscExpenses.reduce((s, n) => s + n, 0);
  return {
    cif,
    customsDuty,
    excise,
    vat,
    surtax,
    withholdingTax,
    totalCustomsTax,
    totalMisc,
    totalImportCost: cif + totalCustomsTax + totalMisc,
  };
}

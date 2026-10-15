export const VAT_RATE = 0.15;
export const WITHHOLDING_RATE = 0.03;

export type ImportCostInput = {
  goodsValue: number; // FOB value of the goods
  seaFreight: number;
  landFreight: number;
  deskClearance: number;
  insurance: number;
  dutyRatePct: number; // customs duty % for the HS code
  miscExpenses: number[];
};

export type ImportCostResult = {
  cif: number;
  customsDuty: number;
  vat: number;
  withholdingTax: number;
  totalCustomsTax: number;
  totalMisc: number;
  totalImportCost: number;
};

export function calculateImportCost(i: ImportCostInput): ImportCostResult {
  const cif = i.goodsValue + i.seaFreight + i.landFreight + i.deskClearance + i.insurance;
  const customsDuty = cif * (i.dutyRatePct / 100);
  const vat = (cif + customsDuty) * VAT_RATE;
  const withholdingTax = cif * WITHHOLDING_RATE;
  const totalCustomsTax = customsDuty + vat + withholdingTax;
  const totalMisc = i.miscExpenses.reduce((s, n) => s + n, 0);
  return {
    cif,
    customsDuty,
    vat,
    withholdingTax,
    totalCustomsTax,
    totalMisc,
    totalImportCost: cif + totalCustomsTax + totalMisc,
  };
}

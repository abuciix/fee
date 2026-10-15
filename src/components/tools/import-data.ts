export type HsCategory = { code: string; description: string; duty: number };

// Starter HS list (editable). Duty % are illustrative defaults only - replace with
// the rates from your customs tariff by importing your own HS archive (CSV).
export const DEFAULT_HS: HsCategory[] = [
  { code: "9403", description: "Furniture (other) and parts", duty: 5 },
  { code: "9405", description: "Lamps and lighting fittings", duty: 5 },
  { code: "8539", description: "LED lamps / electric filament lamps", duty: 5 },
  { code: "6907", description: "Ceramic tiles, flags and paving", duty: 5 },
  { code: "6910", description: "Ceramic sinks, washbasins, WCs", duty: 5 },
  { code: "6802", description: "Worked stone (marble, granite) and articles", duty: 5 },
  { code: "7013", description: "Glassware for table, kitchen, decoration", duty: 5 },
  { code: "7323", description: "Table, kitchen or household articles of iron/steel", duty: 5 },
  { code: "7418", description: "Table, kitchen, sanitary articles of copper", duty: 5 },
  { code: "8481", description: "Taps, cocks, valves", duty: 5 },
  { code: "8302", description: "Base-metal mountings, fittings (hardware)", duty: 5 },
  { code: "8205", description: "Hand tools", duty: 5 },
  { code: "8479", description: "Machines with individual functions (other)", duty: 5 },
  { code: "8415", description: "Air conditioning machines", duty: 5 },
  { code: "8516", description: "Electric heaters, kitchen/household appliances", duty: 5 },
  { code: "8517", description: "Telephones, smartphones, network equipment", duty: 0 },
  { code: "8504", description: "Electrical transformers, power supplies", duty: 5 },
  { code: "8507", description: "Electric accumulators (batteries)", duty: 5 },
  { code: "8541", description: "Semiconductor devices, solar cells/panels", duty: 5 },
  { code: "8544", description: "Insulated wire, cables", duty: 5 },
  { code: "8708", description: "Motor vehicle parts and accessories", duty: 5 },
  { code: "4418", description: "Builders' joinery - wooden doors, windows, flooring", duty: 5 },
  { code: "3924", description: "Plastic tableware, kitchenware, household articles", duty: 5 },
  { code: "3208", description: "Paints and varnishes (synthetic polymers)", duty: 5 },
  { code: "5703", description: "Carpets and tufted floor coverings", duty: 5 },
  { code: "6109", description: "T-shirts, knitted", duty: 5 },
  { code: "6403", description: "Footwear, leather uppers", duty: 5 },
  { code: "4202", description: "Trunks, suitcases, handbags", duty: 5 },
  { code: "9503", description: "Toys", duty: 5 },
  { code: "9506", description: "Sports and gym equipment", duty: 5 },
];

export type Preset = {
  id: string;
  label: string;
  local: string;
  vat: number;
  /** Extra duty charged as % of the basic duty (e.g. India SWS) */
  surchargeOnDuty: number;
  surchargeLabel: string;
  source: string;
  note: string;
};

export const PRESETS: Preset[] = [
  {
    id: "uae",
    label: "UAE",
    local: "AED",
    vat: 5,
    surchargeOnDuty: 0,
    surchargeLabel: "",
    source: "https://www.customs.ae / https://tax.gov.ae",
    note: "Customs duty = CIF x duty rate (most goods 5%). VAT 5% on (CIF + duty).",
  },
  {
    id: "ksa",
    label: "Saudi Arabia",
    local: "SAR",
    vat: 15,
    surchargeOnDuty: 0,
    surchargeLabel: "",
    source: "https://zatca.gov.sa",
    note: "Customs duty = CIF x duty rate (generally 5%, higher for some goods). Import VAT 15% on (CIF + duty + excise).",
  },
  {
    id: "india",
    label: "India",
    local: "INR",
    vat: 18,
    surchargeOnDuty: 10,
    surchargeLabel: "Social Welfare Surcharge (10% of BCD)",
    source: "https://www.cbic.gov.in",
    note: "Assessable value = CIF. BCD = AV x rate; SWS = 10% of BCD; IGST on (AV + BCD + SWS).",
  },
  {
    id: "custom",
    label: "Other / custom",
    local: "USD",
    vat: 0,
    surchargeOnDuty: 0,
    surchargeLabel: "",
    source: "",
    note: "Generic: duty on CIF; excise on (CIF + duty); VAT/GST on (CIF + duty + surcharge + excise). Set every rate yourself.",
  },
];

export const CURRENCIES = ["USD", "CNY", "EUR", "GBP", "AED", "SAR", "INR", "EGP"];

export type Inputs = {
  goods: number; // FOB, foreign currency
  freight: number;
  insurance: number;
  originCharges: number; // inland China, export clearance
  dutyPct: number;
  extraDutyPct: number; // additional duty on CIF
  surchargePct: number; // % of basic duty
  excisePct: number;
  vatPct: number;
  vatRecoverable: boolean;
  rate: number; // 1 foreign = rate local
  local: Record<string, number>; // local-currency charges
  qty: number;
};

export const LOCAL_CHARGES: { key: string; label: string }[] = [
  { key: "port", label: "Port / terminal handling (THC)" },
  { key: "clearance", label: "Customs clearance & broker fee" },
  { key: "doc", label: "Delivery order, documentation, inspection" },
  { key: "transport", label: "Inland transport to warehouse" },
  { key: "storage", label: "Demurrage / storage / unloading" },
  { key: "bank", label: "Bank, LC & remittance charges" },
  { key: "other", label: "Other costs" },
];

export function calculate(i: Inputs) {
  const goodsL = i.goods * i.rate;
  const freightL = (i.freight + i.originCharges) * i.rate;
  const insuranceL = i.insurance * i.rate;
  const cif = goodsL + freightL + insuranceL;
  const duty = cif * (i.dutyPct / 100);
  const extraDuty = cif * (i.extraDutyPct / 100);
  const surcharge = duty * (i.surchargePct / 100);
  const excise = (cif + duty + extraDuty + surcharge) * (i.excisePct / 100);
  const vatBase = cif + duty + extraDuty + surcharge + excise;
  const vat = vatBase * (i.vatPct / 100);
  const localTotal = Object.values(i.local).reduce((a, b) => a + (b || 0), 0);
  const taxes = duty + extraDuty + surcharge + excise;
  const landed = cif + taxes + vat + localTotal;
  const landedNet = i.vatRecoverable ? landed - vat : landed;
  return {
    goodsL, freightL, insuranceL, cif, duty, extraDuty, surcharge, excise,
    vatBase, vat, localTotal, taxes, landed, landedNet,
    perUnit: i.qty > 0 ? landedNet / i.qty : 0,
  };
}

/** Parse CSV text: code,description,duty (header optional, quotes supported). */
export function parseHsCsv(text: string): HsCategory[] {
  const out: HsCategory[] = [];
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const cells = (line.match(/("([^"]|"")*"|[^,;\t]*)([,;\t]|$)/g) ?? []).map((c) =>
      c.replace(/[,;\t]$/, "").replace(/^"|"$/g, "").replace(/""/g, '"').trim(),
    );
    const [code, description, duty] = cells;
    if (!code || !/^\d[\d.\s]*$/.test(code)) continue; // skips header / junk
    out.push({ code: code.replace(/[.\s]/g, ""), description: description ?? "", duty: parseFloat(duty) || 0 });
  }
  return out;
}

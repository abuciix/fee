export type BimModel = {
  id: string;
  projectId: string;
  modelName: string;
  discipline: "Architectural" | "Structural" | "MEP" | "Landscape" | "Federated";
  lod: 100 | 200 | 300 | 350 | 400 | 500;
  lastFederatedDate: string;
  openClashes: number;
};

export const BIM_MODELS: BimModel[] = [
  {
    id: "bim-01",
    projectId: "marina-tower",
    modelName: "Marina Tower — Architectural",
    discipline: "Architectural",
    lod: 350,
    lastFederatedDate: "2026-07-08",
    openClashes: 9,
  },
  {
    id: "bim-02",
    projectId: "marina-tower",
    modelName: "Marina Tower — MEP",
    discipline: "MEP",
    lod: 300,
    lastFederatedDate: "2026-07-08",
    openClashes: 14,
  },
  {
    id: "bim-03",
    projectId: "greenfield-campus",
    modelName: "Greenfield Campus — Structural",
    discipline: "Structural",
    lod: 400,
    lastFederatedDate: "2026-06-30",
    openClashes: 3,
  },
  {
    id: "bim-04",
    projectId: "greenfield-campus",
    modelName: "Greenfield Campus — MEP",
    discipline: "MEP",
    lod: 400,
    lastFederatedDate: "2026-06-28",
    openClashes: 7,
  },
  {
    id: "bim-05",
    projectId: "al-noor-residences",
    modelName: "Al Noor Residences — Architectural",
    discipline: "Architectural",
    lod: 300,
    lastFederatedDate: "2026-07-10",
    openClashes: 0,
  },
  {
    id: "bim-06",
    projectId: "al-noor-residences",
    modelName: "Al Noor Residences — Structural",
    discipline: "Structural",
    lod: 200,
    lastFederatedDate: "2026-07-09",
    openClashes: 2,
  },
  {
    id: "bim-07",
    projectId: "harbor-view-offices",
    modelName: "Harbor View Offices — Federated",
    discipline: "Federated",
    lod: 400,
    lastFederatedDate: "2026-07-11",
    openClashes: 0,
  },
  {
    id: "bim-08",
    projectId: "falcon-retail-fitout",
    modelName: "Falcon Retail Fitout — Concept Massing",
    discipline: "Architectural",
    lod: 100,
    lastFederatedDate: "2026-06-20",
    openClashes: 0,
  },
  {
    id: "bim-09",
    projectId: "desert-oasis-resort",
    modelName: "Desert Oasis Resort — Architectural",
    discipline: "Architectural",
    lod: 300,
    lastFederatedDate: "2026-07-07",
    openClashes: 4,
  },
  {
    id: "bim-10",
    projectId: "desert-oasis-resort",
    modelName: "Desert Oasis Resort — Landscape",
    discipline: "Landscape",
    lod: 200,
    lastFederatedDate: "2026-06-25",
    openClashes: 1,
  },
  {
    id: "bim-11",
    projectId: "central-library",
    modelName: "Central Library — Existing Conditions",
    discipline: "Architectural",
    lod: 200,
    lastFederatedDate: "2026-06-18",
    openClashes: 0,
  },
  {
    id: "bim-12",
    projectId: "seaside-villas",
    modelName: "Seaside Villas — Architectural",
    discipline: "Architectural",
    lod: 350,
    lastFederatedDate: "2026-07-09",
    openClashes: 0,
  },
  {
    id: "bim-13",
    projectId: "seaside-villas",
    modelName: "Seaside Villas — MEP",
    discipline: "MEP",
    lod: 300,
    lastFederatedDate: "2026-07-06",
    openClashes: 2,
  },
];

export function clashStatus(openClashes: number): "good" | "warning" | "critical" {
  if (openClashes === 0) return "good";
  if (openClashes <= 5) return "warning";
  return "critical";
}

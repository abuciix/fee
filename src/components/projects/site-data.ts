export type SiteVisit = {
  id: string;
  projectId: string;
  reportNumber: string;
  date: string;
  author: string;
  summary: string;
};

export const SITE_VISITS: SiteVisit[] = [
  {
    id: "sv-1",
    projectId: "greenfield-campus",
    reportNumber: "SV-014",
    date: "2026-07-09",
    author: "Karim Odeh",
    summary: "Structural frame inspection, level 4 slab pour observed. Minor rebar spacing issue flagged at grid C4.",
  },
  {
    id: "sv-2",
    projectId: "harbor-view-offices",
    reportNumber: "SV-021",
    date: "2026-07-08",
    author: "Yusuf Al Amin",
    summary: "Monthly progress visit. Facade glazing installation 70% complete on west elevation.",
  },
  {
    id: "sv-3",
    projectId: "marina-tower",
    reportNumber: "SV-009",
    date: "2026-07-02",
    author: "Nadia Fares",
    summary: "Site coordination meeting with MEP contractor re: riser clashes on levels 8–10.",
  },
  {
    id: "sv-4",
    projectId: "seaside-villas",
    reportNumber: "SV-006",
    date: "2026-07-05",
    author: "Yusuf Al Amin",
    summary: "Foundation and pool shell inspection for villas 3–6.",
  },
  {
    id: "sv-5",
    projectId: "greenfield-campus",
    reportNumber: "SV-013",
    date: "2026-06-30",
    author: "Omar Nasser",
    summary: "Punch list walkthrough — library wing. 14 items identified for contractor closeout.",
  },
  {
    id: "sv-6",
    projectId: "harbor-view-offices",
    reportNumber: "SV-020",
    date: "2026-06-24",
    author: "Karim Odeh",
    summary: "Roof waterproofing inspection prior to plant screen installation.",
  },
];

export type RfiStatus = "open" | "answered";

export type Rfi = {
  id: string;
  projectId: string;
  rfiNumber: string;
  question: string;
  status: RfiStatus;
  raisedBy: string;
  dateRaised: string;
  dateAnswered?: string;
};

export const RFIS: Rfi[] = [
  {
    id: "rfi-1",
    projectId: "greenfield-campus",
    rfiNumber: "RFI-042",
    question: "Confirm rebar cover at transfer beam grid C4 per structural note 14.",
    status: "open",
    raisedBy: "Karim Odeh",
    dateRaised: "2026-07-10",
  },
  {
    id: "rfi-2",
    projectId: "greenfield-campus",
    rfiNumber: "RFI-041",
    question: "Clarify library wing acoustic ceiling detail vs. spec section 09 51 00.",
    status: "answered",
    raisedBy: "Omar Nasser",
    dateRaised: "2026-06-28",
    dateAnswered: "2026-07-01",
  },
  {
    id: "rfi-3",
    projectId: "harbor-view-offices",
    rfiNumber: "RFI-018",
    question: "Curtain wall bracket embed conflicts with edge beam reinforcement.",
    status: "open",
    raisedBy: "Yusuf Al Amin",
    dateRaised: "2026-07-06",
  },
  {
    id: "rfi-4",
    projectId: "harbor-view-offices",
    rfiNumber: "RFI-017",
    question: "Confirm fire-rating for lobby ceiling assembly.",
    status: "answered",
    raisedBy: "Yusuf Al Amin",
    dateRaised: "2026-06-20",
    dateAnswered: "2026-06-24",
  },
  {
    id: "rfi-5",
    projectId: "marina-tower",
    rfiNumber: "RFI-007",
    question: "MEP riser routing conflict with structural transfer beam, levels 8–10.",
    status: "open",
    raisedBy: "Nadia Fares",
    dateRaised: "2026-07-03",
  },
  {
    id: "rfi-6",
    projectId: "marina-tower",
    rfiNumber: "RFI-006",
    question: "Facade panel joint detail at podium setback.",
    status: "answered",
    raisedBy: "Sara Haddad",
    dateRaised: "2026-06-22",
    dateAnswered: "2026-06-27",
  },
  {
    id: "rfi-7",
    projectId: "seaside-villas",
    rfiNumber: "RFI-003",
    question: "Pool shell waterproofing membrane spec confirmation.",
    status: "open",
    raisedBy: "Yusuf Al Amin",
    dateRaised: "2026-07-04",
  },
  {
    id: "rfi-8",
    projectId: "seaside-villas",
    rfiNumber: "RFI-002",
    question: "Roof parapet flashing detail at villa type B.",
    status: "answered",
    raisedBy: "Yusuf Al Amin",
    dateRaised: "2026-06-18",
    dateAnswered: "2026-06-21",
  },
];

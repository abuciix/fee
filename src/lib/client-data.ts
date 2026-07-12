// Mock data for the Clients & Business Development section.
// Mirrors the style of src/lib/project-data.ts.

export type ClientStatus = "active" | "prospect" | "past";

export type ClientContact = {
  name: string;
  role: string;
  email: string;
  phone: string;
};

export type ClientNote = {
  date: string;
  author: string;
  note: string;
};

export type Client = {
  id: string;
  company: string;
  industry: string;
  status: ClientStatus;
  location: string;
  primaryContact: ClientContact;
  linkedProjectIds: string[];
  lastInteraction: string;
  notes: ClientNote[];
};

export const CLIENTS: Client[] = [
  {
    id: "al-rayan-group",
    company: "Al Rayan Group",
    industry: "Mixed-Use Development",
    status: "active",
    location: "Doha, QA",
    primaryContact: {
      name: "Khalid Al Suwaidi",
      role: "Development Director",
      email: "khalid.suwaidi@alrayangroup.qa",
      phone: "+974 4012 3388",
    },
    linkedProjectIds: ["marina-tower"],
    lastInteraction: "2026-07-08",
    notes: [
      { date: "2026-07-08", author: "Sara Haddad", note: "Client requested revised facade material board before Friday's review." },
      { date: "2026-06-22", author: "Sara Haddad", note: "Walked through budget variance on curtain wall package; client comfortable with contingency draw." },
    ],
  },
  {
    id: "falcon-education-trust",
    company: "Falcon Education Trust",
    industry: "Education",
    status: "active",
    location: "Riyadh, SA",
    primaryContact: {
      name: "Huda Al Zahrani",
      role: "Facilities & Capital Projects Lead",
      email: "h.zahrani@falconeducationtrust.sa",
      phone: "+966 11 455 2290",
    },
    linkedProjectIds: ["greenfield-campus"],
    lastInteraction: "2026-07-11",
    notes: [
      { date: "2026-07-11", author: "Omar Nasser", note: "Escalated structural RFI response timeline — trust board meets July 20." },
      { date: "2026-06-30", author: "Omar Nasser", note: "Site visit with trust facilities committee, generally positive." },
    ],
  },
  {
    id: "al-noor-development",
    company: "Al Noor Development",
    industry: "Residential Development",
    status: "active",
    location: "Dubai, AE",
    primaryContact: {
      name: "Rania Mansour",
      role: "VP Design & Delivery",
      email: "rania.mansour@alnoordev.ae",
      phone: "+971 4 221 7765",
    },
    linkedProjectIds: ["al-noor-residences"],
    lastInteraction: "2026-07-05",
    notes: [
      { date: "2026-07-05", author: "Layla Kanaan", note: "Confirmed phase 2 BOQ sign-off target of July 22." },
    ],
  },
  {
    id: "harbor-capital",
    company: "Harbor Capital",
    industry: "Commercial Real Estate",
    status: "active",
    location: "Manama, BH",
    primaryContact: {
      name: "Faisal Al Khalifa",
      role: "Asset Manager",
      email: "faisal.khalifa@harborcapital.bh",
      phone: "+973 1758 4420",
    },
    linkedProjectIds: ["harbor-view-offices"],
    lastInteraction: "2026-06-28",
    notes: [
      { date: "2026-06-28", author: "Yusuf Al Amin", note: "Monthly site report shared; client happy with CA pace." },
    ],
  },
  {
    id: "falcon-retail-group",
    company: "Falcon Retail Group",
    industry: "Retail",
    status: "active",
    location: "Jeddah, SA",
    primaryContact: {
      name: "Noura Bakhsh",
      role: "Head of Store Development",
      email: "noura.bakhsh@falconretail.sa",
      phone: "+966 12 660 9911",
    },
    linkedProjectIds: ["falcon-retail-fitout"],
    lastInteraction: "2026-07-09",
    notes: [
      { date: "2026-07-09", author: "Sara Haddad", note: "Concept deck feedback received — leaning toward Option B." },
    ],
  },
  {
    id: "oasis-hospitality",
    company: "Oasis Hospitality",
    industry: "Hospitality",
    status: "active",
    location: "Al Ain, AE",
    primaryContact: {
      name: "Tariq Bin Sultan",
      role: "VP Development",
      email: "tariq.binsultan@oasishospitality.ae",
      phone: "+971 3 767 2200",
    },
    linkedProjectIds: ["desert-oasis-resort"],
    lastInteraction: "2026-07-02",
    notes: [
      { date: "2026-07-02", author: "Omar Nasser", note: "Landscape DD package under review; feedback expected next week." },
    ],
  },
  {
    id: "ministry-of-culture",
    company: "Ministry of Culture",
    industry: "Government / Civic",
    status: "active",
    location: "Amman, JO",
    primaryContact: {
      name: "Dana Qassem",
      role: "Heritage Projects Coordinator",
      email: "dana.qassem@moc.gov.jo",
      phone: "+962 6 460 3310",
    },
    linkedProjectIds: ["central-library"],
    lastInteraction: "2026-06-25",
    notes: [
      { date: "2026-06-25", author: "Layla Kanaan", note: "Heritage consultant review scheduled for August 1." },
    ],
  },
  {
    id: "blue-horizon-properties",
    company: "Blue Horizon Properties",
    industry: "Residential Development",
    status: "active",
    location: "Muscat, OM",
    primaryContact: {
      name: "Salim Al Harthy",
      role: "Managing Partner",
      email: "salim.harthy@bluehorizonprop.om",
      phone: "+968 2 456 1180",
    },
    linkedProjectIds: ["seaside-villas"],
    lastInteraction: "2026-07-10",
    notes: [
      { date: "2026-07-10", author: "Yusuf Al Amin", note: "CD set Rev B issue date confirmed for July 20." },
    ],
  },
  {
    id: "zahra-business-park",
    company: "Zahra Business Park",
    industry: "Commercial Real Estate",
    status: "past",
    location: "Amman, JO",
    primaryContact: {
      name: "Mona Kayyali",
      role: "Facilities Director",
      email: "mona.kayyali@zahrabp.jo",
      phone: "+962 6 592 4471",
    },
    linkedProjectIds: [],
    lastInteraction: "2025-11-14",
    notes: [
      { date: "2025-11-14", author: "Karim Odeh", note: "Project closed out and handed over; client open to future referrals." },
    ],
  },
  {
    id: "crescent-hospitality-partners",
    company: "Crescent Hospitality Partners",
    industry: "Hospitality",
    status: "prospect",
    location: "Ras Al Khaimah, AE",
    primaryContact: {
      name: "Aisha Al Mazrouei",
      role: "Development Manager",
      email: "aisha.almazrouei@crescenthp.ae",
      phone: "+971 7 233 5540",
    },
    linkedProjectIds: [],
    lastInteraction: "2026-07-06",
    notes: [
      { date: "2026-07-06", author: "Nadia Fares", note: "Introductory call went well; awaiting site survey data before scoping proposal." },
    ],
  },
];

export const CLIENT_STATUS_META: Record<ClientStatus, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  active: { label: "Active", pill: "good" },
  prospect: { label: "Prospect", pill: "neutral" },
  past: { label: "Past client", pill: "neutral" },
};

export function getClient(id: string): Client | undefined {
  return CLIENTS.find((c) => c.id === id);
}

// ---------------------------------------------------------------------------
// Leads & Opportunities
// ---------------------------------------------------------------------------

export const LEAD_STAGES = ["new", "contacted", "proposal_sent", "negotiation", "won", "lost"] as const;

export type LeadStage = (typeof LEAD_STAGES)[number];

export type Lead = {
  id: string;
  company: string;
  contactName: string;
  stage: LeadStage;
  estValue: number;
  source: string;
  createdDate: string;
};

export const LEAD_STAGE_META: Record<LeadStage, { label: string }> = {
  new: { label: "New" },
  contacted: { label: "Contacted" },
  proposal_sent: { label: "Proposal Sent" },
  negotiation: { label: "Negotiation" },
  won: { label: "Won" },
  lost: { label: "Lost" },
};

export const LEADS: Lead[] = [
  { id: "l1", company: "Crescent Hospitality Partners", contactName: "Aisha Al Mazrouei", stage: "contacted", estValue: 180000, source: "Referral", createdDate: "2026-06-20" },
  { id: "l2", company: "Sahara Logistics Co.", contactName: "Bilal Fares", stage: "new", estValue: 95000, source: "Inbound Website", createdDate: "2026-07-05" },
  { id: "l3", company: "Meridian Wealth Offices", contactName: "Celine Haddad", stage: "proposal_sent", estValue: 240000, source: "RFP", createdDate: "2026-06-10" },
  { id: "l4", company: "Al Fanar Cultural Foundation", contactName: "Yousef Ibrahim", stage: "negotiation", estValue: 410000, source: "Networking Event", createdDate: "2026-05-28" },
  { id: "l5", company: "Al Noor Development", contactName: "Rania Mansour", stage: "negotiation", estValue: 275000, source: "Repeat Client", createdDate: "2026-06-15" },
  { id: "l6", company: "Palm Coast Resorts", contactName: "Omar Rasheed", stage: "won", estValue: 620000, source: "RFP", createdDate: "2026-04-02" },
  { id: "l7", company: "Ithra Health Group", contactName: "Nadia Saleh", stage: "won", estValue: 355000, source: "Referral", createdDate: "2026-03-18" },
  { id: "l8", company: "Union Steel Holdings", contactName: "Ghassan Barakat", stage: "lost", estValue: 150000, source: "Cold Outreach", createdDate: "2026-04-25" },
  { id: "l9", company: "Bright Horizon Schools", contactName: "Farah Naimi", stage: "new", estValue: 130000, source: "Inbound Website", createdDate: "2026-07-09" },
  { id: "l10", company: "Coral Bay Marina Club", contactName: "Zaid Qureshi", stage: "contacted", estValue: 310000, source: "Networking Event", createdDate: "2026-06-27" },
  { id: "l11", company: "Falcon Retail Group", contactName: "Noura Bakhsh", stage: "proposal_sent", estValue: 88000, source: "Repeat Client", createdDate: "2026-06-30" },
  { id: "l12", company: "Vantage Business Towers", contactName: "Reem Odeh", stage: "lost", estValue: 500000, source: "RFP", createdDate: "2026-02-14" },
];

// ---------------------------------------------------------------------------
// Proposals
// ---------------------------------------------------------------------------

export type ProposalStatus = "draft" | "sent" | "accepted" | "declined";

export type Proposal = {
  id: string;
  clientId: string;
  title: string;
  value: number;
  status: ProposalStatus;
  dateCreated: string;
  dateSent: string | null;
};

export const PROPOSAL_STATUS_META: Record<ProposalStatus, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  draft: { label: "Draft", pill: "neutral" },
  sent: { label: "Sent", pill: "warning" },
  accepted: { label: "Accepted", pill: "good" },
  declined: { label: "Declined", pill: "critical" },
};

export const PROPOSALS: Proposal[] = [
  { id: "p1", clientId: "crescent-hospitality-partners", title: "Boutique Resort — Concept & Feasibility", value: 180000, status: "sent", dateCreated: "2026-06-22", dateSent: "2026-06-24" },
  { id: "p2", clientId: "falcon-retail-group", title: "Falcon Retail — Additional Store Fitout (Riyadh)", value: 88000, status: "sent", dateCreated: "2026-06-29", dateSent: "2026-06-30" },
  { id: "p3", clientId: "al-noor-development", title: "Al Noor Residences — Phase 3 Design Services", value: 275000, status: "sent", dateCreated: "2026-06-12", dateSent: "2026-06-15" },
  { id: "p4", clientId: "oasis-hospitality", title: "Desert Oasis Resort — Spa Wing Expansion", value: 165000, status: "draft", dateCreated: "2026-07-08", dateSent: null },
  { id: "p5", clientId: "al-rayan-group", title: "Marina Tower — Interior Fit-out Design", value: 140000, status: "accepted", dateCreated: "2026-05-02", dateSent: "2026-05-04" },
  { id: "p6", clientId: "harbor-capital", title: "Harbor View Offices — Rooftop Amenity Deck", value: 72000, status: "accepted", dateCreated: "2026-04-18", dateSent: "2026-04-20" },
  { id: "p7", clientId: "ministry-of-culture", title: "Central Library — Phase 2 Restoration", value: 195000, status: "draft", dateCreated: "2026-07-10", dateSent: null },
  { id: "p8", clientId: "zahra-business-park", title: "Zahra Business Park — Lobby Renovation", value: 60000, status: "declined", dateCreated: "2026-02-11", dateSent: "2026-02-13" },
  { id: "p9", clientId: "blue-horizon-properties", title: "Seaside Villas — Clubhouse Addition", value: 210000, status: "sent", dateCreated: "2026-07-01", dateSent: "2026-07-03" },
  { id: "p10", clientId: "falcon-education-trust", title: "Greenfield Campus — Sports Complex Phase", value: 330000, status: "draft", dateCreated: "2026-07-11", dateSent: null },
];

export function getClientProposals(clientId: string): Proposal[] {
  return PROPOSALS.filter((p) => p.clientId === clientId);
}

// ---------------------------------------------------------------------------
// Contracts
// ---------------------------------------------------------------------------

export type ContractStatus = "pending_signature" | "active" | "completed";

export type Contract = {
  id: string;
  clientId: string;
  projectId: string | null;
  title: string;
  value: number;
  status: ContractStatus;
  signedDate: string | null;
  startDate: string;
  endDate: string;
};

export const CONTRACT_STATUS_META: Record<ContractStatus, { label: string; pill: "good" | "warning" | "critical" | "neutral" }> = {
  pending_signature: { label: "Pending Signature", pill: "warning" },
  active: { label: "Active", pill: "good" },
  completed: { label: "Completed", pill: "neutral" },
};

export const CONTRACTS: Contract[] = [
  { id: "c1", clientId: "al-rayan-group", projectId: "marina-tower", title: "Marina Tower — Full Architectural Services", value: 420000, status: "active", signedDate: "2025-02-10", startDate: "2025-02-17", endDate: "2027-01-31" },
  { id: "c2", clientId: "falcon-education-trust", projectId: "greenfield-campus", title: "Greenfield Campus — Design & CA Services", value: 890000, status: "active", signedDate: "2024-09-05", startDate: "2024-09-15", endDate: "2026-12-20" },
  { id: "c3", clientId: "al-noor-development", projectId: "al-noor-residences", title: "Al Noor Residences — Phase 1 & 2 Design", value: 310000, status: "active", signedDate: "2025-06-01", startDate: "2025-06-09", endDate: "2026-10-31" },
  { id: "c4", clientId: "harbor-capital", projectId: "harbor-view-offices", title: "Harbor View Offices — Full Services Agreement", value: 560000, status: "active", signedDate: "2024-11-20", startDate: "2024-12-01", endDate: "2026-09-30" },
  { id: "c5", clientId: "falcon-retail-group", projectId: "falcon-retail-fitout", title: "Falcon Retail Fitout — Concept through CD", value: 95000, status: "active", signedDate: "2026-05-19", startDate: "2026-05-25", endDate: "2026-11-15" },
  { id: "c6", clientId: "oasis-hospitality", projectId: "desert-oasis-resort", title: "Desert Oasis Resort — Full Architectural Services", value: 1250000, status: "active", signedDate: "2025-01-15", startDate: "2025-01-25", endDate: "2027-06-30" },
  { id: "c7", clientId: "ministry-of-culture", projectId: "central-library", title: "Central Library Renovation — Design Services", value: 210000, status: "active", signedDate: "2025-10-03", startDate: "2025-10-10", endDate: "2026-12-15" },
  { id: "c8", clientId: "blue-horizon-properties", projectId: "seaside-villas", title: "Seaside Villas — Full Architectural Services", value: 640000, status: "active", signedDate: "2024-12-08", startDate: "2024-12-16", endDate: "2026-08-31" },
  { id: "c9", clientId: "zahra-business-park", projectId: null, title: "Zahra Business Park — Fit-out Design", value: 145000, status: "completed", signedDate: "2024-03-01", startDate: "2024-03-10", endDate: "2025-11-14" },
  { id: "c10", clientId: "al-rayan-group", projectId: "marina-tower", title: "Marina Tower — Interior Fit-out Design", value: 140000, status: "pending_signature", signedDate: null, startDate: "2026-08-01", endDate: "2027-02-28" },
];

export function getClientContracts(clientId: string): Contract[] {
  return CONTRACTS.filter((c) => c.clientId === clientId);
}

// ---------------------------------------------------------------------------
// Client Portal (preview)
// ---------------------------------------------------------------------------

export type PortalMilestone = {
  label: string;
  date: string;
  complete: boolean;
};

export type PortalDocument = {
  name: string;
  type: string;
  uploadedDate: string;
};

export type PortalMessage = {
  from: string;
  date: string;
  message: string;
};

export const PORTAL_DEMO_CLIENT = {
  clientName: "Al Rayan Group",
  projectName: "Marina Tower",
  stage: "Construction Documents",
  percentComplete: 68,
  nextMilestone: "Client facade review",
  nextMilestoneDate: "2026-07-18",
  milestones: [
    { label: "Concept approval", date: "2025-04-12", complete: true },
    { label: "Design development sign-off", date: "2025-10-30", complete: true },
    { label: "Facade material selection", date: "2026-07-18", complete: false },
    { label: "Construction document issue", date: "2026-09-15", complete: false },
    { label: "Permit submission", date: "2026-10-01", complete: false },
  ] as PortalMilestone[],
  documents: [
    { name: "Marina Tower — CD Set Rev A.pdf", type: "Drawing Set", uploadedDate: "2026-06-20" },
    { name: "Facade Material Board.pdf", type: "Presentation", uploadedDate: "2026-07-05" },
    { name: "Monthly Progress Report — June 2026.pdf", type: "Report", uploadedDate: "2026-07-01" },
  ] as PortalDocument[],
  messages: [
    { from: "Sara Haddad (Andalus Architecture)", date: "2026-07-08", message: "Revised facade material board is uploaded — please review before Friday's meeting." },
    { from: "Khalid Al Suwaidi (Al Rayan Group)", date: "2026-07-09", message: "Thanks, reviewing with the board this week. Will confirm by Thursday." },
  ] as PortalMessage[],
};

// ---------------------------------------------------------------------------
// Marketing & Portfolio
// ---------------------------------------------------------------------------

export type PortfolioItem = {
  id: string;
  projectName: string;
  client: string;
  typology: string;
  year: string;
  location: string;
  tags: string[];
  summary: string;
};

export const PORTFOLIO: PortfolioItem[] = [
  {
    id: "palm-coast-resort",
    projectName: "Palm Coast Resort",
    client: "Palm Coast Resorts",
    typology: "Hospitality",
    year: "2025",
    location: "Ras Al Khaimah, AE",
    tags: ["Award", "Published"],
    summary: "A 120-key beachfront resort blending regional vernacular forms with a low-carbon envelope strategy.",
  },
  {
    id: "ithra-health-campus",
    projectName: "Ithra Health Campus",
    client: "Ithra Health Group",
    typology: "Healthcare",
    year: "2025",
    location: "Jeddah, SA",
    tags: ["Published"],
    summary: "An outpatient campus organized around a shaded central courtyard to reduce reliance on mechanical cooling.",
  },
  {
    id: "zahra-business-park-fitout",
    projectName: "Zahra Business Park — Lobby & Fit-out",
    client: "Zahra Business Park",
    typology: "Commercial",
    year: "2025",
    location: "Amman, JO",
    tags: ["Regional Award Finalist"],
    summary: "A full lobby and common-area renovation modernizing a 1990s office park for a new generation of tenants.",
  },
  {
    id: "seaside-villas-clubhouse",
    projectName: "Seaside Villas",
    client: "Blue Horizon Properties",
    typology: "Residential",
    year: "2026",
    location: "Muscat, OM",
    tags: ["Featured Project"],
    summary: "A gated villa community of 42 units organized around shared landscaped courtyards facing the coastline.",
  },
  {
    id: "harbor-view-offices-portfolio",
    projectName: "Harbor View Offices",
    client: "Harbor Capital",
    typology: "Commercial",
    year: "2026",
    location: "Manama, BH",
    tags: ["Published", "Award"],
    summary: "A LEED Gold-targeting office tower with a responsive shading facade tuned to the Gulf's solar path.",
  },
  {
    id: "desert-oasis-resort-portfolio",
    projectName: "Desert Oasis Resort",
    client: "Oasis Hospitality",
    typology: "Hospitality",
    year: "2027",
    location: "Al Ain, AE",
    tags: ["Featured Project"],
    summary: "A destination resort and spa set within restored oasis landscaping, currently in design development.",
  },
];

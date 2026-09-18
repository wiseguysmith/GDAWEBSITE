import type { Application, LedgerColumn, Pillar, Principle, Stage } from "../types";

/** The three pillars (handoff §6). Reused on the homepage and How It Works. */
export const pillars: Pillar[] = [
  {
    numeral: "I",
    title: "Evaluate",
    body: "Determine whether this infrastructure is appropriate for the project.",
    href: "/how-it-works#evaluate",
  },
  {
    numeral: "II",
    title: "Structure",
    body: "Coordinate the readiness and structuring process with the appropriate professional partners.",
    href: "/how-it-works#structure",
  },
  {
    numeral: "III",
    title: "Activate",
    body: "Move technically ready projects toward implementation through the appropriate provider.",
    href: "/how-it-works#activate",
  },
];

/** The five-stage workflow (handoff §6). */
export const stages: Stage[] = [
  {
    index: 1,
    name: "Fit",
    lead: "Is this type of digital infrastructure appropriate for this project?",
    body: "The Fit Check examines the basic characteristics of the project. Not every asset should be tokenized. When the model does not fit, we say so.",
    responsible: "GDA, with the project owner.",
  },
  {
    index: 2,
    name: "Ready",
    lead: "A readiness assessment across the areas applicable to the project.",
    body: "Depending on the project, these may include ownership and control, documentation, asset diligence, jurisdiction, entity structure, regulatory pathway, compliance requirements, economic feasibility, valuation requirements, environmental considerations, technical requirements, operational readiness and data-room readiness.",
    responsible: "GDA coordinates; the project owner provides.",
  },
  {
    index: 3,
    name: "Validated",
    lead: "Applicable matters are reviewed, advised upon, verified or validated by the appropriate qualified professional or technical partner within their scope.",
    body: "Not every project requires every professional. GDA coordinates the process. The appropriate specialists evaluate matters within their scope — GDA does not validate its own work.",
    responsible: "Independent professional and technical partners.",
  },
  {
    index: 4,
    name: "Structured",
    lead: "GDA coordinates the structuring process with the appropriate professional partners.",
    body: "Depending on the project, this may involve entity architecture, instrument selection, ownership or economic rights, investor rights, distribution restrictions, the compliance pathway, economic structure, documentation, technical requirements, reporting requirements and governance.",
    responsible: "GDA coordinates; professional partners advise and document.",
  },
  {
    index: 5,
    name: "Activated",
    lead: "Once applicable readiness requirements have been satisfied, the project may move to technical implementation.",
    body: "Technical activation is performed through the appropriate technical infrastructure provider. Technology comes last, by design.",
    responsible: "The technical infrastructure provider.",
  },
];

/** The thirteen readiness areas (handoff §6, Stage 2). */
export const readinessAreas: string[] = [
  "Ownership and control",
  "Documentation",
  "Asset and project diligence",
  "Jurisdiction",
  "Entity and legal structure",
  "Regulatory pathway",
  "Compliance requirements",
  "Economic feasibility",
  "Valuation requirements",
  "Environmental considerations",
  "Technical requirements",
  "Operational readiness",
  "Data-room readiness",
];

/** Project categories (handoff §8). Instruments are described separately. */
export const applications: Application[] = [
  { slug: "real-estate", title: "Real Estate", descriptor: "Income-producing and development assets." },
  {
    slug: "environmental",
    title: "Environmental & Natural Assets",
    descriptor: "Conservation, carbon, water, land and resource projects.",
  },
  { slug: "infrastructure", title: "Infrastructure", descriptor: "Transport, utilities, digital and social infrastructure." },
  { slug: "agriculture", title: "Agriculture", descriptor: "Productive land, operations and supply-chain assets." },
  { slug: "energy", title: "Energy", descriptor: "Generation, storage and transition projects." },
  {
    slug: "private-enterprise",
    title: "Operating Companies / Private Enterprise",
    descriptor: "Established businesses and private enterprises.",
  },
];

export const instrumentsNote =
  "The appropriate instrument — equity, debt, revenue-linked rights, an asset-backed structure or another — is determined separately according to the project, its jurisdiction and its legal structure, with professional guidance. Every project begins with the same Fit Check.";

/** Section 5 principles (handoff §11). No absolute claims. */
export const validationPrinciples: Principle[] = [
  { title: "Transparency", body: "You know where your project stands and what is required next." },
  { title: "Governance", body: "Defined stages. Defined responsibilities. Readiness before activation." },
  {
    title: "Professional accountability",
    body: "Professionals remain responsible for matters within their own scope.",
  },
  {
    title: "Jurisdiction awareness",
    body: "Each jurisdiction requires its own legal, compliance and structuring pathway.",
  },
  {
    title: "Information handling",
    body: "Project and investor information is collected only as needed and handled as described on our Security page.",
  },
  {
    title: "Separation of responsibilities",
    body: "Coordination, professional review and technical implementation are distinct roles.",
  },
];

/** The responsibility model (handoff §7). */
export const responsibilityLedger: LedgerColumn[] = [
  {
    title: "GDA",
    items: [
      "Coordinates the readiness workflow from first assessment to activation.",
      "Determines preliminary fit and organises the readiness assessment.",
      "Engages the appropriate partners for the jurisdiction and structure.",
      "Keeps the project owner informed of status and next steps.",
    ],
  },
  {
    title: "Professional partners",
    items: [
      "Review, advise on, validate, verify or approve applicable matters within their professional scope.",
      "Remain responsible for their own advice and determinations.",
      "Perform regulated functions where required, through licensed entities.",
    ],
  },
  {
    title: "Technical providers",
    items: [
      "Determine whether a proposed implementation can responsibly be deployed on their infrastructure.",
      "Perform technical implementation where applicable.",
      "Technical feasibility does not override legal, compliance or economic readiness — and readiness does not oblige a provider to implement architecture it considers inappropriate.",
    ],
  },
];

/** Operating principles (handoff §3). */
export const brandPrinciples: Principle[] = [
  { title: "Transparency", body: "Project owners and investors always know where they stand in the process." },
  {
    title: "Professional validation",
    body: "Applicable matters are reviewed by qualified professionals within their scope, where required.",
  },
  { title: "Clear responsibility", body: "Coordination, review and implementation are separate roles with separate accountability." },
  {
    title: "Jurisdiction awareness",
    body: "Structures vary by jurisdiction, asset, instrument and investor. Each market is approached on its own terms.",
  },
  {
    title: "Security consciousness",
    body: "Information is collected only as needed and handled as described — nothing more is claimed.",
  },
  { title: "Readiness before activation", body: "Technology is the last step, not the first." },
  { title: "No guaranteed outcomes", body: "GDA does not guarantee that a project qualifies, proceeds or attracts capital." },
  {
    title: "Global orientation, local execution",
    body: "A global platform, executed through the professional partners each jurisdiction requires.",
  },
];

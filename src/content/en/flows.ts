/**
 * All copy for the two guided flows. Definitions in src/forms/* consume these
 * strings by key, so translation never touches form logic.
 */
export const flowUi = {
  continue: "Continue",
  back: "Back",
  skip: "Skip",
  begin: "Begin",
  submit: "Submit",
  submitting: "Submitting…",
  edit: "Edit",
  stepOf: (step: number, total: number) => `Step ${step} of ${total}`,
  review: "Review your answers",
  reviewSub: "Check everything before you submit. You can edit any answer.",
  required: "This answer is required.",
  selectPlaceholder: "Select…",
  countrySearch: "Search countries",
  otherSpecify: "Please specify",
  optional: "Optional",
  reference: "Reference",
  resume: {
    title: "Continue where you left off?",
    body: "You have an unfinished submission saved in this browser.",
    continue: "Continue",
    startOver: "Start over",
  },
  clearDraft: "Clear saved answers",
  error: {
    title: "Your submission could not be sent.",
    body: "Nothing has been lost. Please try again in a moment. If the problem continues, contact us.",
    retry: "Try again",
    rateLimited: "Too many submissions from this connection. Please wait a few minutes and try again.",
    invalid: "Some answers need attention. Please review the highlighted fields.",
  },
  privacyNote: "How this information is handled",
  consentRequired: "Please confirm consent to continue.",
};

export const fitCheck = {
  meta: {
    title: "Project Fit Check",
    description: "Seven short questions to determine whether digital-asset infrastructure may be appropriate for your project.",
  },
  intro: {
    eyebrow: "Project Fit Check",
    heading: "Is this the right infrastructure for your project?",
    facts: ["7 short questions", "Approximately 3 minutes", "No commitment"],
    body: "The Fit Check examines the basic characteristics of your project. It provides a preliminary indication only, and every submission is reviewed by a member of the GDA team before any next step is determined.",
    whatNext: "What happens next: you receive a preliminary indication on screen and by email with a reference number. The GDA team reviews the submission and contacts you about appropriate next steps.",
  },
  steps: {
    projectType: {
      title: "What type of project or asset are you developing?",
      options: [
        { value: "real-estate", label: "Real estate" },
        { value: "environmental", label: "Environmental or natural asset" },
        { value: "infrastructure", label: "Infrastructure" },
        { value: "agriculture", label: "Agriculture" },
        { value: "energy", label: "Energy" },
        { value: "private-enterprise", label: "Operating company / private enterprise" },
        { value: "other", label: "Other" },
      ],
      otherLabel: "Describe the project or asset",
    },
    jurisdiction: {
      title: "Where is the primary project or asset located?",
      countryLabel: "Country",
      regionLabel: "Region or state",
      entityQuestion: "Is the owning or project entity organised in a different jurisdiction?",
      entityOptions: [
        { value: "no", label: "No" },
        { value: "yes", label: "Yes" },
        { value: "not-sure", label: "Not sure" },
      ],
      entityCountryLabel: "Country where the entity is organised",
    },
    stage: {
      title: "What stage is the project in?",
      options: [
        { value: "concept", label: "Concept" },
        { value: "planning", label: "Planning / feasibility" },
        { value: "documented", label: "Documented / permitted" },
        { value: "development", label: "Development" },
        { value: "operating", label: "Operating" },
        { value: "operating-financed", label: "Operating with existing investors or financing" },
      ],
    },
    relationship: {
      title: "What is your relationship to the project?",
      options: [
        { value: "owner", label: "Owner" },
        { value: "controlling", label: "Majority owner / controlling party" },
        { value: "developer", label: "Developer / sponsor" },
        { value: "representative", label: "Authorised representative" },
        { value: "government", label: "Government / public entity" },
        { value: "adviser", label: "Adviser" },
        { value: "other", label: "Other" },
      ],
      otherLabel: "Describe your relationship",
    },
    objective: {
      title: "What is your primary objective?",
      help: "Choose the one that matters most. You can note others below.",
      options: [
        { value: "raise-capital", label: "Raise capital" },
        { value: "broaden-access", label: "Broaden investor access" },
        { value: "restructure", label: "Restructure ownership" },
        { value: "investor-rights", label: "Create or formalise investor rights" },
        { value: "transferability", label: "Support future transferability" },
        { value: "governance", label: "Improve governance / reporting" },
        { value: "explore", label: "Explore whether tokenization makes sense" },
        { value: "other", label: "Other" },
      ],
      alsoLabel: "Also relevant",
      otherLabel: "Describe your objective",
    },
    economics: {
      title: "What is the approximate value of the project or asset?",
      help: "Ranges are enough. This informs economics and internal routing; it is not a qualification threshold.",
      valueLabel: "Approximate project or asset value (USD equivalent)",
      capitalLabel: "Capital requirement or amount sought",
      options: [
        { value: "under-1m", label: "Under 1 million" },
        { value: "1m-5m", label: "1 – 5 million" },
        { value: "5m-25m", label: "5 – 25 million" },
        { value: "25m-100m", label: "25 – 100 million" },
        { value: "over-100m", label: "Over 100 million" },
        { value: "undetermined", label: "Not yet determined" },
      ],
    },
    contact: {
      title: "How can GDA reach you?",
      name: "Full name",
      organisation: "Organisation",
      role: "Role",
      email: "Email",
      phone: "Phone",
      language: "Preferred language",
      languages: [
        { value: "en", label: "English" },
        { value: "es", label: "Español" },
        { value: "pt", label: "Português" },
      ],
      comments: "Anything else we should know?",
      commentsHelp: "Please do not include confidential documents or sensitive personal information.",
    },
  },
  results: {
    "potential-fit": {
      eyebrow: "Preliminary indication",
      heading: "Potential Fit — Pending Review",
      paragraphs: [
        "Based on the information provided, your project includes characteristics that may justify further readiness review.",
        "This is a preliminary indication only. It is not an approval, legal determination, regulatory determination, investment assessment or guarantee that the project will proceed. The GDA team will review your submission before determining appropriate next steps.",
      ],
    },
    "submitted-for-review": {
      eyebrow: "Received",
      heading: "Submitted for Review",
      paragraphs: [
        "Your information has been received and requires additional review before GDA can provide a preliminary fit indication.",
        "A member of the GDA team will review the submission and determine appropriate next steps.",
      ],
    },
  },
  afterResult: {
    emailNote: "A confirmation with this reference has been sent to your email address.",
    keepNote: "Please keep this reference for your records.",
    links: [
      { label: "How the process works", href: "/how-it-works" },
      { label: "Return to the homepage", href: "/" },
    ],
  },
};

export const investorAccess = {
  meta: {
    title: "Request Investor Access",
    description: "Request access to GDA's developing investor pathway. No offer, no solicitation, no documents.",
  },
  intro: {
    eyebrow: "Investor access",
    heading: "Request access, in stages.",
    facts: ["6 short questions", "Approximately 2 minutes", "No documents"],
    means: "Requesting access creates a profiled relationship with GDA. As projects satisfy applicable readiness requirements, GDA may contact you about the appropriate next step for your profile and jurisdiction.",
    doesNotMean: "It is not an offer, solicitation or investment recommendation, and it does not guarantee access to any opportunity. Identity, eligibility and related verification, where required, are performed by the appropriate licensed or qualified provider — not through this website.",
    begin: "Request access",
  },
  steps: {
    investorType: {
      title: "Which best describes you?",
      options: [
        { value: "individual", label: "Individual" },
        { value: "family-office", label: "Family office" },
        { value: "institutional", label: "Institutional investor" },
        { value: "fund", label: "Fund / asset manager" },
        { value: "corporate", label: "Corporate" },
        { value: "other", label: "Other" },
      ],
      otherLabel: "Please describe",
    },
    jurisdiction: {
      title: "Where are you resident or incorporated?",
      countryLabel: "Country of residence or incorporation",
    },
    interests: {
      title: "Which areas are you interested in?",
      help: "Choose any that apply.",
      options: [
        { value: "real-estate", label: "Real estate" },
        { value: "environmental", label: "Environmental / natural assets" },
        { value: "infrastructure", label: "Infrastructure" },
        { value: "agriculture", label: "Agriculture" },
        { value: "energy", label: "Energy" },
        { value: "private-enterprise", label: "Private enterprise" },
        { value: "open", label: "Open to multiple categories" },
      ],
    },
    allocation: {
      title: "What is your typical allocation range?",
      help: "Optional. For profile purposes only — this is not an eligibility determination.",
      options: [
        { value: "under-100k", label: "Under 100,000" },
        { value: "100k-500k", label: "100,000 – 500,000" },
        { value: "500k-2m", label: "500,000 – 2 million" },
        { value: "2m-10m", label: "2 – 10 million" },
        { value: "over-10m", label: "Over 10 million" },
        { value: "prefer-not", label: "Prefer not to say" },
      ],
    },
    status: {
      title: "Do you consider yourself an accredited, qualified, professional or otherwise eligible investor under the rules applicable to you?",
      note: "This answer is informational only. Eligibility, where required, will be determined or verified through the appropriate licensed or qualified provider.",
      options: [
        { value: "yes", label: "Yes" },
        { value: "no", label: "No" },
        { value: "not-sure", label: "Not sure" },
      ],
    },
    contact: {
      title: "How can GDA reach you?",
      name: "Full name",
      organisation: "Organisation",
      role: "Role",
      email: "Email",
      phone: "Phone",
      language: "Preferred language",
      languages: [
        { value: "en", label: "English" },
        { value: "es", label: "Español" },
        { value: "pt", label: "Português" },
      ],
    },
  },
  results: {
    received: {
      eyebrow: "Received",
      heading: "Request received.",
      paragraphs: [
        "Investor access is provided in stages. GDA will contact you regarding appropriate next steps.",
        "Nothing in this request constitutes an offer, solicitation, investment recommendation or guarantee of access.",
      ],
    },
  },
  afterResult: {
    emailNote: "A confirmation with this reference has been sent to your email address.",
    keepNote: "Please keep this reference for your records.",
    links: [
      { label: "About the investor pathway", href: "/investors" },
      { label: "Return to the homepage", href: "/" },
    ],
  },
};

import type { Meta } from "../types";

export const contact = {
  meta: {
    title: "Contact",
    description: "General, government, partner and media enquiries for Global Digital Access.",
  } satisfies Meta,

  hero: {
    eyebrow: "Contact",
    heading: "Talk to GDA.",
    sub: "For anything that is not a project Fit Check or an investor access request. Choose the enquiry type so it reaches the right person.",
  },

  aside: {
    project: {
      title: "Have a project?",
      body: "The Fit Check is the fastest route.",
      link: { label: "Evaluate Your Project", href: "/evaluate" },
    },
    investor: {
      title: "An investor?",
      body: "Request access to the investor pathway.",
      link: { label: "Request Investor Access", href: "/investors/access" },
    },
  },

  form: {
    typeLabel: "Enquiry type",
    types: [
      { value: "general", label: "General enquiry" },
      { value: "government", label: "Government or public-sector enquiry" },
      { value: "partner", label: "Partner enquiry" },
      { value: "media", label: "Media enquiry" },
      { value: "other", label: "Other" },
    ],
    name: "Name",
    organisation: "Organisation",
    email: "Email",
    message: "Message",
    messageHelp: "Please do not include confidential documents or sensitive personal information.",
    submit: "Send enquiry",
    sending: "Sending…",
  },

  confirmation: {
    eyebrow: "Received",
    heading: "Thank you.",
    body: "Your enquiry has been received. A member of the GDA team will respond by email.",
    reference: "Reference",
  },
};

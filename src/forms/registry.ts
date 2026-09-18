import { fitCheckFlow } from "./fit-check/definition";
import { investorAccessFlow } from "./investor-access/definition";
import type { FlowDefinition } from "./types";

/**
 * Flow definitions include zod schemas (class instances), which cannot be
 * serialised across the server→client boundary. Pages pass an id; the client
 * FlowShell resolves the definition here.
 */
export const flows = {
  "fit-check": fitCheckFlow,
  "investor-access": investorAccessFlow,
} as const satisfies Record<string, FlowDefinition>;

export type FlowId = keyof typeof flows;

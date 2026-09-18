import type { Locale } from "@/lib/i18n/locales";
import { fitCheckFlow } from "./fit-check/definition";
import { investorAccessFlow } from "./investor-access/definition";
import type { FlowDefinition } from "./types";

/**
 * Flow definitions include zod schemas (class instances), which cannot be
 * serialised across the server→client boundary. Pages pass an id; the client
 * FlowShell resolves the localised definition here.
 */
const factories = {
  "fit-check": fitCheckFlow,
  "investor-access": investorAccessFlow,
} as const satisfies Record<string, (locale: Locale) => FlowDefinition>;

export type FlowId = keyof typeof factories;

const cache = new Map<string, FlowDefinition>();

export function getFlow(id: FlowId, locale: Locale): FlowDefinition {
  const key = `${id}:${locale}`;
  let flow = cache.get(key);
  if (!flow) {
    flow = factories[id](locale);
    cache.set(key, flow);
  }
  return flow;
}

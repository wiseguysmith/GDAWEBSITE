import type { TeamMember } from "../types";

/**
 * Real team members only (handoff §11, section 8).
 * The section renders nothing until at least one member is approved with a
 * portrait and bio. Do not add placeholder people.
 */
export const team: TeamMember[] = [];

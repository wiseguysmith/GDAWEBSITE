import "server-only";
import { createHash, randomBytes } from "node:crypto";

/** Unambiguous alphabet — no 0/O or 1/I — so references survive being read aloud. */
const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";

export type SubmissionKind = "fit-check" | "investor-access" | "contact";

const prefixes: Record<SubmissionKind, string> = {
  "fit-check": "GDA-FC",
  "investor-access": "GDA-IA",
  contact: "GDA-CT",
};

/** e.g. GDA-FC-7KQ2MX */
export function submissionId(kind: SubmissionKind): string {
  const bytes = randomBytes(6);
  let out = "";
  for (const b of bytes) out += alphabet[b % alphabet.length];
  return `${prefixes[kind]}-${out}`;
}

/**
 * One-way hash of an IP address for rate-limit forensics. Salted with a
 * server secret so the hash cannot be reversed by dictionary.
 */
export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT ?? "development-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex").slice(0, 32);
}

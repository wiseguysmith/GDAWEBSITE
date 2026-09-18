import type { SubmissionKind } from "@/lib/security/id";

/** The record every adapter receives. Answers are already validated and sanitised. */
export type Submission = {
  id: string;
  kind: SubmissionKind;
  locale: string;
  /** Validated answers, keyed by field name. Contact fields included. */
  answers: Record<string, unknown>;
  /** Result key for flows with a user-facing result (fit-check). */
  result?: string;
  /** Internal-only tags from business rules. */
  tags: string[];
  meta: {
    userAgent?: string;
    referrer?: string;
    utm?: Record<string, string>;
    ipHash?: string;
  };
  createdAt: string; // ISO
  schemaVersion: number;
};

/**
 * One interface, many destinations (handoff §35). `persist` must succeed for
 * the submission to count; `notify` is best-effort and failures are logged.
 */
export interface SubmissionAdapter {
  readonly name: string;
  persist?(submission: Submission): Promise<void>;
  notify?(submission: Submission): Promise<void>;
}

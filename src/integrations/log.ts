import "server-only";
import type { Submission, SubmissionAdapter } from "./types";

/**
 * Development adapter: writes the submission to the server log.
 * Never the primary adapter in production — a log line is not a record.
 */
export const logAdapter: SubmissionAdapter = {
  name: "log",
  async persist(submission: Submission) {
    console.info(`[submission] ${submission.id} ${submission.kind} result=${submission.result ?? "-"} tags=${submission.tags.join(",")}`);
    if (process.env.NODE_ENV !== "production") {
      console.info(JSON.stringify(submission, null, 2));
    }
  },
};

import "server-only";
import { Resend } from "resend";
import { confirmationEmail, notificationEmail } from "@/lib/email/templates";
import type { Submission, SubmissionAdapter } from "./types";

/**
 * Email adapter (Resend). Notifies the GDA inbox and confirms to the submitter.
 * Requires a verified sending domain with SPF, DKIM and DMARC (gap K-1).
 *
 * Env: RESEND_API_KEY, EMAIL_FROM ("GDA <no-reply@mail.example.com>"), SUBMISSIONS_TO_EMAIL.
 */
export function createEmailAdapter(): SubmissionAdapter | null {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.SUBMISSIONS_TO_EMAIL;
  if (!apiKey || !from || !to) return null;

  const resend = new Resend(apiKey);

  return {
    name: "email",
    async notify(submission: Submission) {
      const internal = notificationEmail(submission);
      const { error: e1 } = await resend.emails.send({
        from,
        to: to.split(",").map((s) => s.trim()),
        subject: internal.subject,
        text: internal.text,
        html: internal.html,
        headers: { "X-GDA-Submission": submission.id },
      });
      if (e1) throw new Error(`Resend notification failed: ${e1.message}`);

      const recipient = submission.answers.email;
      if (typeof recipient === "string" && recipient.includes("@")) {
        const confirm = confirmationEmail(submission);
        const { error: e2 } = await resend.emails.send({
          from,
          to: recipient,
          subject: confirm.subject,
          text: confirm.text,
          html: confirm.html,
          headers: { "X-GDA-Submission": submission.id },
        });
        if (e2) throw new Error(`Resend confirmation failed: ${e2.message}`);
      }
    },
  };
}

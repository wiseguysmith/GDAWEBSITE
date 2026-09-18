import { NextResponse, type NextRequest } from "next/server";
import type { ZodTypeAny } from "zod";
import { reviewTagsForCountry } from "@/config/jurisdictions";
import { submissionMeta } from "@/forms/common";
import { contactSchema } from "@/forms/contact/schema";
import { fitCheckSchema } from "@/forms/fit-check/schema";
import { investorAccessSchema } from "@/forms/investor-access/schema";
import { deliver } from "@/integrations";
import type { Submission } from "@/integrations/types";
import { evaluateFit } from "@/lib/fit/rules";
import { hashIp, submissionId, type SubmissionKind } from "@/lib/security/id";
import { findPrevious, remember } from "@/lib/security/idempotency";
import { getRateLimiter } from "@/lib/security/rate-limit";
import { cleanEmail, cleanLine, cleanText } from "@/lib/security/sanitize";
import { checkSpam, honeypotField } from "@/lib/security/spam";

/**
 * One handler for all three forms (handoff §30):
 * origin check → rate limit → spam → schema → sanitise → rules → id → deliver.
 * Logs carry the reference and result only — never answers.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SCHEMA_VERSION = 1;

const schemas: Record<SubmissionKind, ZodTypeAny> = {
  "fit-check": fitCheckSchema,
  "investor-access": investorAccessSchema,
  contact: contactSchema,
};

const multilineFields = new Set(["comments", "message"]);

function clientIp(request: NextRequest): string {
  const fwd = request.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "0.0.0.0";
}

function sameOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin") ?? request.headers.get("referer");
  if (!origin) return process.env.NODE_ENV !== "production";
  try {
    const host = new URL(origin).host;
    const expected = request.headers.get("x-forwarded-host") ?? request.headers.get("host") ?? "";
    return host === expected;
  } catch {
    return false;
  }
}

function sanitise(answers: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(answers)) {
    if (typeof value === "string") {
      out[key] = key === "email" ? cleanEmail(value) : multilineFields.has(key) ? cleanText(value, 3000) : cleanLine(value, 254);
    } else if (Array.isArray(value)) {
      out[key] = value.filter((v) => typeof v === "string").map((v) => cleanLine(v as string, 64));
    } else if (typeof value === "boolean") {
      out[key] = value;
    }
  }
  return out;
}

function utmFrom(referrer: string | undefined): Record<string, string> | undefined {
  if (!referrer) return undefined;
  try {
    const url = new URL(referrer);
    const utm: Record<string, string> = {};
    for (const [k, v] of url.searchParams) if (k.startsWith("utm_")) utm[k] = v.slice(0, 100);
    return Object.keys(utm).length ? utm : undefined;
  } catch {
    return undefined;
  }
}

export async function POST(request: NextRequest, ctx: RouteContext<"/api/submit/[kind]">) {
  const { kind } = await ctx.params;
  if (!(kind in schemas)) return NextResponse.json({ error: "unknown-kind" }, { status: 404 });
  const submissionKind = kind as SubmissionKind;

  if (!sameOrigin(request)) return NextResponse.json({ error: "forbidden" }, { status: 403 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }
  const { answers, meta } = (body ?? {}) as { answers?: unknown; meta?: unknown };

  const metaParsed = submissionMeta.safeParse(meta);
  if (!metaParsed.success) return NextResponse.json({ error: "invalid-meta" }, { status: 400 });

  // Rate limits: per connection and per email address.
  const ip = clientIp(request);
  const ipHash = hashIp(ip);
  const limiter = getRateLimiter();
  const perIp = await limiter.check(`ip:${ipHash}`, 10, 600);
  if (!perIp.ok) {
    return NextResponse.json({ error: "rate-limited" }, { status: 429, headers: { "Retry-After": String(perIp.retryAfterSeconds) } });
  }
  const emailRaw = (answers as Record<string, unknown> | undefined)?.email;
  if (typeof emailRaw === "string" && emailRaw.includes("@")) {
    const perEmail = await limiter.check(`email:${cleanEmail(emailRaw)}`, 5, 3600);
    if (!perEmail.ok) {
      return NextResponse.json({ error: "rate-limited" }, { status: 429, headers: { "Retry-After": String(perEmail.retryAfterSeconds) } });
    }
  }

  // Idempotent retries return the original reference.
  const previous = await findPrevious(metaParsed.data.attemptKey);
  if (previous) return NextResponse.json({ id: previous.id, result: previous.result, duplicate: true });

  // Spam defences.
  const spam = await checkSpam({
    honeypot: metaParsed.data.honeypot || (answers as Record<string, unknown> | undefined)?.[honeypotField]?.toString(),
    startedAt: metaParsed.data.startedAt,
    turnstileToken: metaParsed.data.turnstileToken,
    ip,
  });
  if (!spam.ok) {
    if (spam.reason === "honeypot") {
      // Look successful to the bot; store nothing.
      return NextResponse.json({ id: submissionId(submissionKind), result: undefined });
    }
    return NextResponse.json({ error: "rejected", reason: spam.reason }, { status: 400 });
  }

  // Schema validation — the same zod schemas the client uses.
  const parsed = schemas[submissionKind].safeParse(answers);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path.join(".") || "_";
      if (!fields[key]) fields[key] = issue.message;
    }
    return NextResponse.json({ error: "invalid", fields }, { status: 400 });
  }

  const clean = sanitise(parsed.data as Record<string, unknown>);

  // Business rules — never exposed beyond the result key.
  let result: string | undefined;
  const tags: string[] = [];
  if (submissionKind === "fit-check") {
    const outcome = evaluateFit({
      projectType: String(clean.projectType),
      country: String(clean.country),
      entityElsewhere: clean.entityElsewhere as string | undefined,
      stage: String(clean.stage),
      relationship: String(clean.relationship),
      objective: clean.objective as string | undefined,
      value: clean.value as string | undefined,
      capital: (clean.capital as string | undefined) || undefined,
    });
    result = outcome.result;
    tags.push(...outcome.tags, ...reviewTagsForCountry(String(clean.country)));
    if (typeof clean.entityCountry === "string" && clean.entityCountry) tags.push(...reviewTagsForCountry(clean.entityCountry));
  } else if (submissionKind === "investor-access") {
    result = "received";
    tags.push(`investor:${clean.investorType}`, `status:${clean.status}`, ...reviewTagsForCountry(String(clean.country)));
    if (clean.allocation) tags.push(`allocation:${clean.allocation}`);
  } else {
    result = "received";
    tags.push(`enquiry:${clean.type}`);
  }

  const referrer = request.headers.get("referer") ?? undefined;
  const submission: Submission = {
    id: submissionId(submissionKind),
    kind: submissionKind,
    locale: metaParsed.data.locale,
    answers: clean,
    result,
    tags,
    meta: {
      userAgent: request.headers.get("user-agent")?.slice(0, 300) ?? undefined,
      referrer,
      utm: utmFrom(referrer),
      ipHash,
    },
    createdAt: new Date().toISOString(),
    schemaVersion: SCHEMA_VERSION,
  };

  try {
    const report = await deliver(submission);
    await remember(metaParsed.data.attemptKey, { id: submission.id, result });
    console.info(`[submission] ${submission.id} ${submission.kind} delivered primary=${report.primary} secondaries=${report.secondaries.map((s) => `${s.name}:${s.ok ? "ok" : "failed"}`).join(",") || "-"}`);
    // Only claim an email was sent when the email adapter actually succeeded.
    const emailed = report.secondaries.some((s) => s.name === "email" && s.ok) || report.primaryNotified === "email";
    return NextResponse.json({ id: submission.id, result, emailed });
  } catch (err) {
    console.error(`[submission] ${submission.id} ${submission.kind} primary failed: ${err instanceof Error ? err.message : String(err)}`);
    return NextResponse.json({ error: "delivery-failed" }, { status: 503 });
  }
}

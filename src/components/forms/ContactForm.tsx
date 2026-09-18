"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { content } from "@/content";
import { contactSchema, enquiryTypes, type ContactAnswers } from "@/forms/contact/schema";
import { analyticsEvents } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import { honeypotField } from "@/lib/security/spam-shared";
import { Button } from "@/components/actions/Button";
import { Disclosure } from "@/components/content/Disclosure";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { Checkbox, Input, Select, Textarea } from "./Controls";
import { Field, describedBy } from "./Field";
import { InfoDrawer } from "./InfoDrawer";
import { Turnstile } from "./Turnstile";

type Phase = "idle" | "submitting" | "done" | "error";

/** Single-screen enquiry form on the same submission pipeline as the flows. */
export function ContactForm() {
  const c = content.contact;
  const ui = content.flowUi;
  const params = useSearchParams();
  const initialType = params.get("type");
  const [phase, setPhase] = useState<Phase>("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [errorKind, setErrorKind] = useState<"generic" | "rate-limited">("generic");
  const startedAt = useRef(0);
  const attemptKey = useRef("");
  const token = useRef<string | undefined>(undefined);
  const honeypot = useRef<HTMLInputElement>(null);

  // Timing and idempotency key are set once the form is on screen (not during render).
  useEffect(() => {
    startedAt.current = Date.now();
    try {
      attemptKey.current = crypto.randomUUID();
    } catch {
      attemptKey.current = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactAnswers>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: enquiryTypes.includes(initialType as (typeof enquiryTypes)[number]) ? (initialType as ContactAnswers["type"]) : undefined,
    },
  });

  const onSubmit = async (values: ContactAnswers) => {
    setPhase("submitting");
    try {
      const res = await fetch("/api/submit/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: values,
          meta: { startedAt: startedAt.current, attemptKey: attemptKey.current, honeypot: honeypot.current?.value ?? "", turnstileToken: token.current, locale: "en" },
        }),
      });
      if (res.status === 429) {
        setErrorKind("rate-limited");
        setPhase("error");
        return;
      }
      if (!res.ok) {
        setErrorKind("generic");
        setPhase("error");
        return;
      }
      const data = (await res.json()) as { id: string };
      setReference(data.id);
      setPhase("done");
      track(values.type === "partner" ? analyticsEvents.partnerEnquirySubmitted : analyticsEvents.contactSubmitted);
    } catch {
      setErrorKind("generic");
      setPhase("error");
    }
  };

  if (phase === "done" && reference) {
    return (
      <div className="flex flex-col gap-6" role="status">
        <Eyebrow>{c.confirmation.eyebrow}</Eyebrow>
        <h2 className="text-display-l text-fg">{c.confirmation.heading}</h2>
        <p className="text-body text-fg-2">{c.confirmation.body}</p>
        <div className="flex flex-col gap-1 border-t border-b border-rule py-5">
          <span className="text-eyebrow text-fg-3">{c.confirmation.reference}</span>
          <span className="font-mono text-h4 tabular text-fg">{reference}</span>
        </div>
      </div>
    );
  }

  const err = (name: keyof ContactAnswers) => (typeof errors[name]?.message === "string" ? (errors[name]?.message as string) : undefined);

  return (
    <form onSubmit={(e) => void handleSubmit(onSubmit)(e)} noValidate className="flex flex-col gap-8">
      <Field id="c-type" label={c.form.typeLabel} error={err("type")} required>
        <Select id="c-type" {...register("type")} options={c.form.types} required invalid={Boolean(err("type"))} placeholder={ui.selectPlaceholder} aria-describedby={describedBy("c-type", undefined, err("type"))} />
      </Field>
      <div className="grid gap-8 sm:grid-cols-2">
        <Field id="c-name" label={c.form.name} error={err("name")} required>
          <Input id="c-name" {...register("name")} autoComplete="name" required invalid={Boolean(err("name"))} aria-describedby={describedBy("c-name", undefined, err("name"))} />
        </Field>
        <Field id="c-org" label={c.form.organisation} error={err("organisation")} optionalLabel={ui.optional}>
          <Input id="c-org" {...register("organisation")} autoComplete="organization" invalid={Boolean(err("organisation"))} />
        </Field>
      </div>
      <Field id="c-email" label={c.form.email} error={err("email")} required>
        <Input id="c-email" {...register("email")} type="email" inputMode="email" autoComplete="email" required invalid={Boolean(err("email"))} aria-describedby={describedBy("c-email", undefined, err("email"))} />
      </Field>
      <Field id="c-message" label={c.form.message} help={c.form.messageHelp} error={err("message")} required>
        <Textarea id="c-message" {...register("message")} maxLength={3000} required invalid={Boolean(err("message"))} aria-describedby={describedBy("c-message", c.form.messageHelp, err("message"))} />
      </Field>
      <InfoDrawer />
      <div className="flex flex-col gap-2 border-t border-rule pt-6">
        <Checkbox id="c-consent" {...register("consent")} label={content.legal.consent} invalid={Boolean(err("consent"))} aria-describedby={err("consent") ? "c-consent-error" : undefined} />
        {err("consent") ? (
          <p id="c-consent-error" role="alert" className="text-small text-attention">
            {err("consent")}
          </p>
        ) : null}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={`hp-c-${honeypotField}`}>Website</label>
        <input ref={honeypot} id={`hp-c-${honeypotField}`} name={honeypotField} type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <Turnstile onToken={(t) => (token.current = t)} />

      {phase === "error" ? (
        <div role="alert" className="flex flex-col gap-2 border-l-2 border-attention pl-5">
          <p className="text-body font-medium text-fg">{ui.error.title}</p>
          <p className="text-small text-fg-2">{errorKind === "rate-limited" ? ui.error.rateLimited : ui.error.body}</p>
        </div>
      ) : null}

      <Disclosure variant="standing" />
      <div>
        <Button type="submit" loading={phase === "submitting"} className="w-full xs:w-auto">
          {phase === "submitting" ? c.form.sending : phase === "error" ? ui.error.retry : c.form.submit}
        </Button>
      </div>
    </form>
  );
}

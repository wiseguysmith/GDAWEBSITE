"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { content } from "@/content";
import { flows, type FlowId } from "@/forms/registry";
import type { FlowAnswers, StepDefinition } from "@/forms/types";
import type { AnalyticsEvent } from "@/lib/analytics/events";
import { track } from "@/lib/analytics/track";
import { honeypotField } from "@/lib/security/spam-shared";
import { Button } from "@/components/actions/Button";
import { Disclosure } from "@/components/content/Disclosure";
import { Eyebrow } from "@/components/typography/Eyebrow";
import { clearDraft, saveDraft, useDraft } from "./draft";
import { FlowProgress } from "./FlowProgress";
import { InfoDrawer } from "./InfoDrawer";
import { ResultState } from "./ResultState";
import { ReviewSummary } from "./ReviewSummary";
import { StepFields } from "./StepFields";
import { Turnstile } from "./Turnstile";

type Phase = "intro" | "step" | "review" | "submitting" | "result" | "error";

type Outcome = { id: string; result?: string; emailed?: boolean };

type FlowShellProps = { flowId: FlowId };

const transition = { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const };

function newAttemptKey(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Runs any FlowDefinition: intro → one question per screen → review → result.
 * Focus moves to the step heading on each change; progress is announced;
 * drafts persist non-contact answers only.
 */
export function FlowShell({ flowId }: FlowShellProps) {
  const flow = flows[flowId];
  const ui = content.flowUi;
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("intro");
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<FlowAnswers>({});
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const [errorKind, setErrorKind] = useState<"generic" | "rate-limited" | "invalid">("generic");
  const [returnToReview, setReturnToReview] = useState(false);
  const startedAt = useRef<number>(0);
  const attemptKey = useRef<string>("");
  const turnstileToken = useRef<string | undefined>(undefined);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);

  const total = flow.steps.length;
  const step: StepDefinition | undefined = flow.steps[stepIndex];
  const draftAvailable = useDraft(flow);

  // Move focus to the heading whenever the screen changes.
  useEffect(() => {
    if (phase === "intro") return;
    const t = window.setTimeout(() => headingRef.current?.focus({ preventScroll: false }), reduced ? 0 : 120);
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    return () => window.clearTimeout(t);
  }, [phase, stepIndex, reduced]);

  const begin = useCallback(
    (resume?: { stepIndex: number; answers: FlowAnswers }) => {
      startedAt.current = Date.now();
      attemptKey.current = newAttemptKey();
      if (resume) {
        setAnswers(resume.answers);
        setStepIndex(Math.min(resume.stepIndex, total - 1));
      } else {
        clearDraft(flow);
        setAnswers({});
        setStepIndex(0);
      }
      setPhase("step");
      track(flow.analytics.started as AnalyticsEvent);
    },
    [flow, total],
  );

  const commitStep = useCallback(
    (values: FlowAnswers) => {
      const merged = { ...answers, ...values };
      setAnswers(merged);
      if (flow.steps[stepIndex].draft) saveDraft(flow, stepIndex + 1, merged);
      track(flow.analytics.step as AnalyticsEvent, { step: stepIndex + 1 });
      if (returnToReview || stepIndex === total - 1) {
        setReturnToReview(false);
        setPhase("review");
      } else {
        setStepIndex(stepIndex + 1);
      }
    },
    [answers, flow, returnToReview, stepIndex, total],
  );

  const back = useCallback(
    (values: FlowAnswers) => {
      setAnswers((a) => ({ ...a, ...values }));
      if (returnToReview) {
        setReturnToReview(false);
        setPhase("review");
      } else if (stepIndex > 0) {
        setStepIndex(stepIndex - 1);
      } else {
        setPhase("intro");
      }
    },
    [returnToReview, stepIndex],
  );

  const edit = useCallback((i: number) => {
    setReturnToReview(true);
    setStepIndex(i);
    setPhase("step");
  }, []);

  const submit = useCallback(async () => {
    setPhase("submitting");
    try {
      const res = await fetch(`/api/submit/${flow.kind}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers,
          meta: {
            startedAt: startedAt.current,
            attemptKey: attemptKey.current,
            honeypot: honeypotRef.current?.value ?? "",
            turnstileToken: turnstileToken.current,
            locale: (answers.language as string) ?? "en",
          },
        }),
      });
      if (res.status === 429) {
        setErrorKind("rate-limited");
        setPhase("error");
        return;
      }
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrorKind(data.error === "invalid" ? "invalid" : "generic");
        setPhase("error");
        return;
      }
      const data = (await res.json()) as Outcome;
      clearDraft(flow);
      setOutcome(data);
      setPhase("result");
      track(flow.analytics.completed as AnalyticsEvent, data.result ? { result: data.result } : undefined);
    } catch {
      setErrorKind("generic");
      setPhase("error");
    }
  }, [answers, flow]);

  const onToken = useCallback((token: string | undefined) => {
    turnstileToken.current = token;
  }, []);

  const variants = useMemo(
    () => ({
      initial: reduced ? { opacity: 1 } : { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      exit: reduced ? { opacity: 1 } : { opacity: 0, y: -12 },
    }),
    [reduced],
  );

  return (
    <div className="mx-auto w-full max-w-(--container-narrow)">
      {phase !== "intro" && phase !== "result" ? (
        <FlowProgress
          current={phase === "step" ? stepIndex + 1 : total + 1}
          total={total}
          text={phase === "step" ? ui.stepOf(stepIndex + 1, total) : ui.review}
        />
      ) : null}

      <AnimatePresence mode="wait" initial={false}>
        {phase === "intro" ? (
          <motion.section key="intro" {...variants} transition={transition} aria-labelledby="flow-heading" className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Eyebrow>{flow.intro.eyebrow}</Eyebrow>
              <h1 id="flow-heading" ref={headingRef} tabIndex={-1} className="text-display-l text-fg outline-none">
                {flow.intro.heading}
              </h1>
            </div>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-eyebrow text-fg-3">
              {flow.intro.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="flex flex-col gap-4">
              {flow.intro.paragraphs.map((p) => (
                <p key={p} className="text-body text-fg-2">
                  {p}
                </p>
              ))}
            </div>
            <Disclosure variant={flow.intro.disclosure} />

            {draftAvailable ? (
              <div className="flex flex-col gap-4 border border-rule bg-bg-elevated p-6">
                <p className="text-body font-medium text-fg">{ui.resume.title}</p>
                <p className="text-small text-fg-2">{ui.resume.body}</p>
                <div className="flex flex-col gap-3 xs:flex-row">
                  <Button onClick={() => begin(draftAvailable)}>{ui.resume.continue}</Button>
                  <Button variant="secondary" onClick={() => begin()}>
                    {ui.resume.startOver}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 xs:flex-row xs:items-center xs:gap-6">
                <Button onClick={() => begin()}>{flow.intro.begin}</Button>
                <Link href="/security" className="link-draw text-small text-fg-2">
                  {ui.privacyNote}
                </Link>
              </div>
            )}
          </motion.section>
        ) : null}

        {phase === "step" && step ? (
          <motion.div key={`step-${step.id}`} {...variants} transition={transition}>
            <StepForm
              step={step}
              index={stepIndex}
              defaults={answers}
              headingRef={headingRef}
              onSubmit={commitStep}
              onBack={back}
              isLast={stepIndex === total - 1 || returnToReview}
              onClearDraft={() => {
                clearDraft(flow);
                setAnswers({});
                setStepIndex(0);
                setPhase("intro");
              }}
            />
          </motion.div>
        ) : null}

        {phase === "review" || phase === "submitting" || phase === "error" ? (
          <motion.section key="review" {...variants} transition={transition} aria-labelledby="flow-heading" className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <h1 id="flow-heading" ref={headingRef} tabIndex={-1} className="text-display-l text-fg outline-none">
                {ui.review}
              </h1>
              <p className="text-body text-fg-2">{ui.reviewSub}</p>
            </div>
            <ReviewSummary flow={flow} answers={answers} onEdit={edit} />

            {phase === "error" ? (
              <div role="alert" className="flex flex-col gap-2 border-l-2 border-attention pl-5">
                <p className="text-body font-medium text-fg">{ui.error.title}</p>
                <p className="text-small text-fg-2">
                  {errorKind === "rate-limited" ? ui.error.rateLimited : errorKind === "invalid" ? ui.error.invalid : ui.error.body}
                </p>
              </div>
            ) : null}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                void submit();
              }}
              className="flex flex-col gap-6"
            >
              {/* Honeypot: hidden from people, attractive to bots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
                <label htmlFor={`hp-${honeypotField}`}>Website</label>
                <input ref={honeypotRef} id={`hp-${honeypotField}`} name={honeypotField} type="text" tabIndex={-1} autoComplete="off" />
              </div>
              <Turnstile onToken={onToken} />
              <Disclosure variant={flow.intro.disclosure} />
              <div className="flex flex-col-reverse gap-3 xs:flex-row xs:justify-between">
                <Button type="button" variant="ghost" onClick={() => edit(total - 1)}>
                  {ui.back}
                </Button>
                <Button type="submit" loading={phase === "submitting"}>
                  {phase === "submitting" ? ui.submitting : phase === "error" ? ui.error.retry : ui.submit}
                </Button>
              </div>
            </form>
          </motion.section>
        ) : null}

        {phase === "result" && outcome ? (
          <motion.div key="result" {...variants} transition={transition}>
            <ResultState flow={flow} outcome={outcome} headingRef={headingRef} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

type StepFormProps = {
  step: StepDefinition;
  index: number;
  defaults: FlowAnswers;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  onSubmit: (values: FlowAnswers) => void;
  onBack: (values: FlowAnswers) => void;
  onClearDraft: () => void;
  isLast: boolean;
};

/** One question per screen, validated with the step's zod schema on Continue. */
function StepForm({ step, index, defaults, headingRef, onSubmit, onBack, onClearDraft, isLast }: StepFormProps) {
  const ui = content.flowUi;
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<FlowAnswers>({
    resolver: zodResolver(step.schema),
    defaultValues: defaults,
    mode: "onSubmit",
    reValidateMode: "onChange",
  });

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit(values))}
      onKeyDown={(e) => {
        // Enter on a radio/checkbox advances, matching text inputs' implicit submission.
        const t = e.target as HTMLElement;
        if (e.key === "Enter" && t instanceof HTMLInputElement && (t.type === "radio" || t.type === "checkbox")) {
          e.preventDefault();
          (e.currentTarget as HTMLFormElement).requestSubmit();
        }
      }}
      noValidate
      aria-labelledby="flow-heading"
      className="flex flex-col gap-10"
    >
      <div className="flex flex-col gap-3">
        <h1 id="flow-heading" ref={headingRef} tabIndex={-1} className="text-h3 text-fg outline-none sm:text-display-l">
          {step.title}
        </h1>
        {step.help ? <p className="text-body text-fg-2">{step.help}</p> : null}
      </div>

      <StepFields stepTitle={step.title} fields={step.fields} register={register} watch={watch} errors={errors} />

      {step.handling ? <InfoDrawer /> : null}
      {step.note ? <p className="border-l-2 border-rule-strong pl-5 text-small text-fg-2">{step.note}</p> : null}

      <div className="sticky bottom-0 -mx-(--margin) mt-2 flex flex-col-reverse gap-3 border-t border-rule bg-bg px-(--margin) py-4 pb-[calc(var(--s-4)+env(safe-area-inset-bottom,0px))] xs:static xs:mx-0 xs:flex-row xs:items-center xs:justify-between xs:border-0 xs:bg-transparent xs:px-0 xs:py-0">
        <div className="flex items-center justify-between gap-4 xs:justify-start">
          <Button type="button" variant="ghost" onClick={() => onBack(getValues())}>
            {ui.back}
          </Button>
          {index > 0 ? (
            <button type="button" onClick={onClearDraft} className="link-draw text-small text-fg-3">
              {ui.clearDraft}
            </button>
          ) : null}
        </div>
        <div className="flex gap-3">
          {step.optional ? (
            <Button type="button" variant="secondary" onClick={() => onSubmit({})}>
              {ui.skip}
            </Button>
          ) : null}
          <Button type="submit" className="w-full xs:w-auto">
            {isLast ? ui.review : ui.continue}
          </Button>
        </div>
      </div>
    </form>
  );
}

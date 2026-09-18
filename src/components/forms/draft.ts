"use client";

import { useMemo, useSyncExternalStore } from "react";
import { retention } from "@/config/retention";
import type { FlowAnswers, FlowDefinition } from "@/forms/types";

/**
 * Browser draft of an unfinished flow. Only steps marked `draft: true` are
 * stored — contact details never are (handoff §30/§31). Every access is
 * wrapped so a blocked or full storage never breaks the flow.
 */

type Draft = { savedAt: number; stepIndex: number; answers: FlowAnswers };

const maxAgeMs = retention.localDraftDays * 24 * 60 * 60 * 1000;

function draftableAnswers(flow: FlowDefinition, answers: FlowAnswers): FlowAnswers {
  const allowed = new Set(flow.steps.filter((s) => s.draft).flatMap((s) => s.fields.map((f) => f.name)));
  const out: FlowAnswers = {};
  for (const [k, v] of Object.entries(answers)) if (allowed.has(k)) out[k] = v;
  return out;
}

const listeners = new Set<() => void>();
function emit() {
  for (const l of listeners) l();
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

/** Reads the raw draft string as an external store — null on the server and when storage is unavailable. */
function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function parseDraft(raw: string | null): Draft | null {
  if (!raw) return null;
  try {
    const draft = JSON.parse(raw) as Draft;
    if (!draft || typeof draft.savedAt !== "number" || Date.now() - draft.savedAt > maxAgeMs) return null;
    if (!draft.answers || Object.keys(draft.answers).length === 0) return null;
    return draft;
  } catch {
    return null;
  }
}

/** Resumable draft for a flow, if one exists in this browser. Stable across renders; never set in an effect. */
export function useDraft(flow: FlowDefinition): Draft | null {
  const raw = useSyncExternalStore(
    subscribe,
    () => readRaw(flow.draftKey),
    () => null,
  );
  return useMemo(() => parseDraft(raw), [raw]);
}

export function loadDraft(flow: FlowDefinition): Draft | null {
  try {
    const raw = window.localStorage.getItem(flow.draftKey);
    if (!raw) return null;
    const draft = JSON.parse(raw) as Draft;
    if (!draft || typeof draft.savedAt !== "number" || Date.now() - draft.savedAt > maxAgeMs) {
      window.localStorage.removeItem(flow.draftKey);
      return null;
    }
    if (!draft.answers || Object.keys(draft.answers).length === 0) return null;
    return draft;
  } catch {
    return null;
  }
}

export function saveDraft(flow: FlowDefinition, stepIndex: number, answers: FlowAnswers): void {
  try {
    const draft: Draft = { savedAt: Date.now(), stepIndex, answers: draftableAnswers(flow, answers) };
    window.localStorage.setItem(flow.draftKey, JSON.stringify(draft));
    emit();
  } catch {
    // Storage unavailable — the flow still works in memory.
  }
}

export function clearDraft(flow: FlowDefinition): void {
  try {
    window.localStorage.removeItem(flow.draftKey);
    emit();
  } catch {
    // ignore
  }
}

"use client";

import { useEffect } from "react";
import { useContent } from "@/content/useContent";
import { Button } from "@/components/actions/Button";
import { Container } from "@/components/layout/Container";
import { Eyebrow } from "@/components/typography/Eyebrow";

/** Route-level error boundary: designed in the system, offers a retry and the way home. */
export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { errors } = useContent();
  useEffect(() => {
    // Logged without user data; an error monitor (K) can hook here.
    console.error(`[error] ${error.digest ?? ""} ${error.message}`);
  }, [error]);

  return (
    <main id="main" data-theme="navy" className="grain flex flex-1 flex-col bg-bg text-fg pt-(--header-h-mobile) lg:pt-(--header-h)">
      <Container className="flex flex-1 flex-col justify-center py-(--s-24)">
        <Eyebrow numeral="500">{errors.error.eyebrow}</Eyebrow>
        <h1 className="mt-6 max-w-[14ch] text-display-xl text-fg">{errors.error.heading}</h1>
        <p className="mt-8 max-w-[46ch] text-body-l text-fg-2">{errors.error.body}</p>
        {error.digest ? (
          <p className="mt-4 font-mono text-small text-fg-3">
            {errors.error.reference} {error.digest}
          </p>
        ) : null}
        <div className="mt-10 flex flex-col gap-3 xs:flex-row xs:flex-wrap">
          <Button onClick={reset}>{errors.error.retry}</Button>
          <Button href="/" variant="secondary">
            {errors.error.home}
          </Button>
        </div>
      </Container>
    </main>
  );
}

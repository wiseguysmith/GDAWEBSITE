"use client";

import { useEffect, useRef } from "react";

export type SystemFact = { value: number; label: string };

type SystemStripProps = { facts: SystemFact[] };

/**
 * Four structural facts about the platform with numerals that settle into
 * place once, when the strip enters view (design direction §01). Values are
 * derived from the real content arrays by the caller — never typed — so they
 * are structural facts, not performance claims. Reduced motion shows the
 * final numbers immediately; the server HTML already contains them.
 */
export function SystemStrip({ facts }: SystemStripProps) {
  const ref = useRef<HTMLDListElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) return;

    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-count]"));
    let done = false;

    const settle = () => {
      if (done) return;
      done = true;
      const start = performance.now();
      const duration = 900;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        for (const node of nodes) {
          const target = Number(node.dataset.count);
          node.textContent = String(Math.round(eased * target)).padStart(2, "0");
        }
        if (p < 1) requestAnimationFrame(tick);
      };
      for (const node of nodes) node.textContent = "00";
      requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          settle();
          io.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <dl ref={ref} className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-rule pt-6 md:grid-cols-4">
      {facts.map((fact) => (
        <div key={fact.label} className="flex flex-col gap-1">
          <dd className="order-1 m-0 font-mono text-[28px] font-medium leading-none tracking-[-0.02em] tabular text-fg" data-count={fact.value}>
            {String(fact.value).padStart(2, "0")}
          </dd>
          <dt className="order-2 text-eyebrow text-fg-3">{fact.label}</dt>
        </div>
      ))}
    </dl>
  );
}

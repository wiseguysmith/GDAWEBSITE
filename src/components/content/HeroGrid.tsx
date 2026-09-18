"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useMemo, useRef } from "react";

/**
 * Restrained architectural line grid for the hero (handoff §11): a receding
 * plane drawn with hairlines. No globe, no nodes, no tokens. On mount the
 * lines draw themselves in once (design direction §01); parallax is capped
 * at --parallax-max and disabled under reduced motion and below lg.
 */
export function HeroGrid() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, 54]);
  const svgRef = useRef<SVGSVGElement>(null);

  const lines = useMemo(() => {
    const out: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    const W = 600;
    const H = 500;
    for (let i = 0; i <= 14; i++) {
      const yy = H - Math.pow(i / 14, 1.8) * H;
      out.push({ x1: 0, y1: yy, x2: W, y2: yy, delay: i * 30 });
    }
    for (let j = 0; j <= 16; j++) {
      const x = (j / 16) * W;
      const xt = W / 2 + (x - W / 2) * 0.35;
      out.push({ x1: xt, y1: 0, x2: x, y2: H, delay: 300 + j * 25 });
    }
    return out;
  }, []);

  // Add the class imperatively after paint so the draw transition runs from the dashed state.
  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => el.classList.add("drawn"));
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      style={reduced ? undefined : { y }}
      className="pointer-events-none absolute -right-[8%] top-[8%] hidden h-[64%] w-[56%] opacity-40 lg:block"
    >
      <svg ref={svgRef} viewBox="0 0 600 500" preserveAspectRatio="none" className="h-full w-full">
        {lines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            pathLength={1}
            stroke="currentColor"
            strokeWidth="0.6"
            vectorEffect="non-scaling-stroke"
            className="grid-line text-silver"
            style={{ transitionDelay: `${l.delay}ms` }}
          />
        ))}
      </svg>
    </motion.div>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";

/**
 * Counts a stat up from 0 once, when it scrolls into view, then settles on the
 * real value (e.g. "7+", "20+", "60+") and stays put. Leading number animates;
 * any non-digit prefix/suffix is preserved.
 */
export function StatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Parse once per value so the effect deps stay stable (a fresh match object
  // every render previously restarted the animation on every frame).
  const parsed = useMemo(() => {
    const m = value.match(/^(\D*)(\d+)(.*)$/);
    return m ? { prefix: m[1], target: Number(m[2]), suffix: m[3] } : null;
  }, [value]);

  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView || !parsed) return;
    const controls = animate(0, parsed.target, {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, parsed]);

  return (
    <span ref={ref} className="tabular-nums">
      {parsed ? `${parsed.prefix}${display}${parsed.suffix}` : value}
    </span>
  );
}

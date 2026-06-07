"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export function AnimatedCounter({
  value,
  decimals = 0,
  suffix = "",
  duration = 1.4,
  className,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(() => (0).toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value.toFixed(decimals));
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    return () => controls.stop();
  }, [inView, value, decimals, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {display.replace(".", ",")}
      {suffix}
    </span>
  );
}

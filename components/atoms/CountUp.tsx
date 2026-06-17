"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { ANIM_COUNT_UP_MS } from "@/lib/constants";

type Props = { value: number; className?: string };

export default function CountUp({ value, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: ANIM_COUNT_UP_MS, bounce: 0 });
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, value, motionValue]);

  useEffect(() => {
    const unsub = spring.on("change", (latest) => {
      if (ref.current) ref.current.textContent = String(Math.round(latest));
    });
    return unsub;
  }, [spring]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

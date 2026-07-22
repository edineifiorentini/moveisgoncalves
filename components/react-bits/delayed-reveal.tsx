"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type DelayedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
};

const revealEase = [0.22, 1, 0.36, 1] as const;

export function DelayedReveal({
  children,
  className = "",
  delay = 0.58,
  distance = 8,
  amount = 0.25,
}: DelayedRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: distance }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ delay, duration: 0.48, ease: revealEase }}
    >
      {children}
    </motion.div>
  );
}

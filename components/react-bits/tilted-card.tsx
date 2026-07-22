"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import styles from "./tilted-card.module.css";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

const spring = { damping: 28, stiffness: 170, mass: 0.8 };

export function TiltedCard({
  children,
  className = "",
  rotateAmplitude = 4,
  scaleOnHover = 1.012,
}: TiltedCardProps) {
  const reducedMotion = useReducedMotion();
  const rotateX = useSpring(useMotionValue(0), spring);
  const rotateY = useSpring(useMotionValue(0), spring);
  const scale = useSpring(1, spring);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reducedMotion || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(y * rotateAmplitude * -2);
    rotateY.set(x * rotateAmplitude * 2);
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <div
      className={`${styles.frame} ${className}`}
      onPointerMove={handlePointerMove}
      onPointerEnter={(event) => {
        if (!reducedMotion && event.pointerType === "mouse") scale.set(scaleOnHover);
      }}
      onPointerLeave={reset}
    >
      <motion.div className={styles.inner} style={{ rotateX, rotateY, scale }}>
        {children}
      </motion.div>
    </div>
  );
}

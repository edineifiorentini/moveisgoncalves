"use client";

import type { PointerEvent, ReactNode } from "react";
import { useEffect, useRef } from "react";
import styles from "./tilted-card.module.css";

type TiltedCardProps = {
  children: ReactNode;
  className?: string;
  rotateAmplitude?: number;
  scaleOnHover?: number;
};

export function TiltedCard({
  children,
  className = "",
  rotateAmplitude = 4,
  scaleOnHover = 1.012,
}: TiltedCardProps) {
  const innerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    },
    [],
  );

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      if (!innerRef.current) return;
      innerRef.current.style.transform = `rotateX(${y * rotateAmplitude * -2}deg) rotateY(${x * rotateAmplitude * 2}deg) scale(${scaleOnHover})`;
    });
  };

  const reset = () => {
    if (innerRef.current) innerRef.current.style.transform = "rotateX(0) rotateY(0) scale(1)";
  };

  return (
    <div className={`${styles.frame} ${className}`} onPointerMove={handlePointerMove} onPointerLeave={reset}>
      <div ref={innerRef} className={styles.inner}>
        {children}
      </div>
    </div>
  );
}

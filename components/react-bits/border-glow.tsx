"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";
import { useRef } from "react";
import styles from "./border-glow.module.css";

type BorderGlowProps = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  colors?: [string, string, string];
};

type BorderGlowStyle = CSSProperties & {
  "--edge-proximity": number;
  "--cursor-angle": string;
  "--edge-sensitivity": number;
  "--glow-one": string;
  "--glow-two": string;
  "--glow-three": string;
};

export function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 38,
  colors = ["#c92a00", "#dca184", "#fffdfa"],
}: BorderGlowProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const style: BorderGlowStyle = {
    "--edge-proximity": 0,
    "--cursor-angle": "45deg",
    "--edge-sensitivity": edgeSensitivity,
    "--glow-one": colors[0],
    "--glow-two": colors[1],
    "--glow-three": colors[2],
  };

  const handlePointerMove = (event: PointerEvent<HTMLSpanElement>) => {
    const element = ref.current;
    if (!element || event.pointerType !== "mouse") return;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const edge = Math.min(Math.max(1 / Math.min(centerX / Math.abs(x - centerX || 1), centerY / Math.abs(y - centerY || 1)), 0), 1);
    const angle = (Math.atan2(y - centerY, x - centerX) * 180) / Math.PI + 90;
    element.style.setProperty("--edge-proximity", (edge * 100).toFixed(2));
    element.style.setProperty("--cursor-angle", `${angle < 0 ? angle + 360 : angle}deg`);
  };

  return (
    <span
      ref={ref}
      className={`${styles.root} ${className}`}
      style={style}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => ref.current?.style.setProperty("--edge-proximity", "0")}
    >
      <span aria-hidden="true" className={styles.edge} />
      <span className={styles.inner}>{children}</span>
    </span>
  );
}

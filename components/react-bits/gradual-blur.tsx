import type { CSSProperties } from "react";
import styles from "./gradual-blur.module.css";

type GradualBlurProps = {
  position?: "top" | "bottom";
  height?: string;
  strength?: number;
  divCount?: number;
  curve?: "linear" | "bezier" | "ease-in";
  exponential?: boolean;
  opacity?: number;
  zIndex?: number;
  className?: string;
};

const curveFunctions = {
  linear: (progress: number) => progress,
  bezier: (progress: number) => progress * progress * (3 - 2 * progress),
  "ease-in": (progress: number) => progress * progress,
};

export function GradualBlur({
  position = "top",
  height = "7rem",
  strength = 2,
  divCount = 6,
  curve = "bezier",
  exponential = true,
  opacity = 0.9,
  zIndex = 2,
  className = "",
}: GradualBlurProps) {
  const increment = 100 / divCount;
  const curveFunction = curveFunctions[curve];
  const direction = position === "top" ? "to top" : "to bottom";

  return (
    <div
      aria-hidden="true"
      className={`${styles.root} ${className}`}
      style={{ position: "absolute", insetInline: 0, [position]: 0, height, zIndex }}
    >
      {Array.from({ length: divCount }, (_, index) => {
        const progress = curveFunction((index + 1) / divCount);
        const blur = exponential ? Math.pow(2, progress * 4) * 0.0625 * strength : progress * strength;
        const start = Math.max(0, increment * index);
        const middle = Math.min(100, increment * (index + 1));
        const end = Math.min(100, increment * (index + 2));
        const mask = `linear-gradient(${direction}, transparent ${start}%, black ${middle}%, transparent ${end}%)`;
        const layerStyle: CSSProperties = {
          backdropFilter: `blur(${blur.toFixed(3)}rem)`,
          WebkitBackdropFilter: `blur(${blur.toFixed(3)}rem)`,
          maskImage: mask,
          WebkitMaskImage: mask,
          opacity,
        };

        return <span key={index} className={styles.layer} style={layerStyle} />;
      })}
    </div>
  );
}

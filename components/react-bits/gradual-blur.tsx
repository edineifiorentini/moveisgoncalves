import type { CSSProperties } from "react";
import styles from "./gradual-blur.module.css";

type GradualBlurProps = {
  target?: "parent" | "page";
  position?: "top" | "bottom" | "left" | "right";
  height?: string;
  width?: string;
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
  target = "parent",
  position = "top",
  height = "7rem",
  width,
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
  const direction = {
    top: "to top",
    bottom: "to bottom",
    left: "to left",
    right: "to right",
  }[position];
  const isVertical = position === "top" || position === "bottom";
  const positionStyle: CSSProperties = isVertical
    ? { [position]: 0, insetInline: 0, width: width ?? "100%", height }
    : { [position]: 0, insetBlock: 0, width: width ?? height, height: "100%" };

  return (
    <div
      aria-hidden="true"
      className={`${styles.root} ${className}`}
      style={{
        position: target === "page" ? "fixed" : "absolute",
        zIndex,
        ...positionStyle,
      }}
    >
      {Array.from({ length: divCount }, (_, index) => {
        const layer = index + 1;
        const progress = curveFunction(layer / divCount);
        const blur = exponential ? Math.pow(2, progress * 4) * 0.0625 * strength : progress * strength;
        const p1 = Math.round((increment * layer - increment) * 10) / 10;
        const p2 = Math.round(increment * layer * 10) / 10;
        const p3 = Math.round((increment * layer + increment) * 10) / 10;
        const p4 = Math.round((increment * layer + increment * 2) * 10) / 10;
        let gradient = `transparent ${p1}%, black ${p2}%`;
        if (p3 <= 100) gradient += `, black ${p3}%`;
        if (p4 <= 100) gradient += `, transparent ${p4}%`;
        const mask = `linear-gradient(${direction}, ${gradient})`;
        const layerStyle: CSSProperties = {
          backdropFilter: `blur(${blur.toFixed(3)}rem)`,
          WebkitBackdropFilter: `blur(${blur.toFixed(3)}rem)`,
          maskImage: mask,
          WebkitMaskImage: mask,
          opacity,
        };

        return <span key={layer} className={styles.layer} style={layerStyle} />;
      })}
    </div>
  );
}

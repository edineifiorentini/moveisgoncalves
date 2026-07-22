import type { CSSProperties, ReactNode } from "react";
import styles from "./star-border.module.css";

type StarBorderProps = {
  children: ReactNode;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
};

type StarBorderStyle = CSSProperties & {
  "--star-color": string;
  "--star-speed": string;
  "--star-thickness": string;
};

export function StarBorder({
  children,
  className = "",
  color = "#ff9a73",
  speed = "6.5s",
  thickness = 1,
}: StarBorderProps) {
  const style: StarBorderStyle = {
    "--star-color": color,
    "--star-speed": speed,
    "--star-thickness": `${thickness}px`,
  };

  return (
    <span className={`${styles.root} ${className}`} style={style}>
      <span aria-hidden="true" className={styles.top} />
      <span aria-hidden="true" className={styles.bottom} />
      <span className={styles.inner}>{children}</span>
    </span>
  );
}

"use client";

import { Children, type CSSProperties, type ReactNode, useEffect, useRef } from "react";
import styles from "./animated-list.module.css";

type AnimatedListProps = {
  children: ReactNode;
  className?: string;
};

type ItemStyle = CSSProperties & { "--list-delay": string };

export function AnimatedList({ children, className = "" }: AnimatedListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const items = Children.toArray(children);

  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    element.dataset.enhanced = "true";
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.dataset.visible = "true";
        observer.disconnect();
      },
      { threshold: 0.08 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${styles.root} ${className}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.item} style={{ "--list-delay": `${index * 70}ms` } as ItemStyle}>
          {item}
        </div>
      ))}
    </div>
  );
}

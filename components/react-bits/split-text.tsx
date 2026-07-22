"use client";

import { Fragment, type ElementType, useEffect, useMemo, useRef } from "react";
import styles from "./split-text.module.css";

type SplitTag = "h1" | "h2" | "h3" | "p";

type SplitTextProps = {
  text: string;
  tag?: SplitTag;
  id?: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  splitType?: "chars" | "words" | "lines" | "words, chars";
  threshold?: number;
  textAlign?: "left" | "center" | "right";
  onAnimationComplete?: () => void;
};

const easingByName: Record<string, string> = {
  "power3.out": "cubic-bezier(0.22, 1, 0.36, 1)",
  "power2.out": "cubic-bezier(0.16, 1, 0.3, 1)",
};

export function SplitText({
  text,
  tag = "p",
  id,
  className = "",
  delay = 42,
  duration = 0.7,
  ease = "power3.out",
  splitType = "words",
  threshold = 0.12,
  textAlign = "left",
  onAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const units = useMemo(
    () => (splitType.includes("chars") ? Array.from(text) : text.split(/\s+/)),
    [splitType, text],
  );

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      onAnimationComplete?.();
      return;
    }

    let animations: Animation[] = [];
    const reveal = () => {
      if (animations.length) return;
      const targets = Array.from(element.querySelectorAll<HTMLElement>("[data-split-unit]"));
      animations = targets.map((target, index) => {
        target.style.willChange = "transform, opacity";
        return target.animate(
          [
            { opacity: 0, transform: "translateY(68%) rotateX(-16deg)" },
            { opacity: 1, transform: "translateY(0) rotateX(0)" },
          ],
          {
            duration: duration * 1000,
            delay: index * delay,
            easing: easingByName[ease] ?? ease,
            fill: "both",
          },
        );
      });
      const last = animations.at(-1);
      if (last) {
        void last.finished
          .then(() => {
            targets.forEach((target) => (target.style.willChange = ""));
            onAnimationComplete?.();
          })
          .catch(() => undefined);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        reveal();
        observer.disconnect();
      },
      { threshold: Math.min(Math.max(threshold, 0.01), 0.5), rootMargin: "0px 0px -6% 0px" },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [delay, duration, ease, onAnimationComplete, threshold, units]);

  const Tag = tag as ElementType;
  const splitByCharacters = splitType.includes("chars");

  return (
    <Tag ref={ref} id={id} className={`${styles.title} ${className}`} style={{ textAlign }} aria-label={text}>
      {units.map((unit, index) => (
        <Fragment key={`${unit}-${index}`}>
          <span data-split-unit aria-hidden="true" className={styles.unit}>
            {unit === " " ? "\u00a0" : unit}
          </span>
          {!splitByCharacters && index < units.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

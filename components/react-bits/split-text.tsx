"use client";

import type { ElementType } from "react";
import { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";
import styles from "./split-text.module.css";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText, useGSAP);

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

export function SplitText({
  text,
  tag = "p",
  id,
  className = "",
  delay = 52,
  duration = 0.82,
  ease = "power3.out",
  splitType = "words",
  threshold = 0.12,
  textAlign = "left",
  onAnimationComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const completeRef = useRef(onAnimationComplete);

  useEffect(() => {
    completeRef.current = onAnimationComplete;
  }, [onAnimationComplete]);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || !text) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        completeRef.current?.();
        return;
      }

      const split = new GSAPSplitText(element, {
        type: splitType,
        smartWrap: true,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
      });
      const targets = splitType.includes("chars") ? split.chars : splitType.includes("lines") ? split.lines : split.words;
      const startPercentage = Math.round((1 - threshold) * 100);

      const animation = gsap.fromTo(
        targets,
        { autoAlpha: 0, yPercent: 72, rotateX: -18, transformOrigin: "50% 100%" },
        {
          autoAlpha: 1,
          yPercent: 0,
          rotateX: 0,
          duration,
          ease,
          stagger: delay / 1000,
          force3D: true,
          scrollTrigger: {
            trigger: element,
            start: `top ${startPercentage}%`,
            once: true,
            fastScrollEnd: true,
          },
          onStart: () => gsap.set(targets, { willChange: "transform, opacity" }),
          onComplete: () => {
            gsap.set(targets, { clearProps: "willChange" });
            completeRef.current?.();
          },
        },
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
        split.revert();
      };
    },
    { dependencies: [text, delay, duration, ease, splitType, threshold], scope: ref },
  );

  const Tag = tag as ElementType;

  return (
    <Tag ref={ref} id={id} className={`${styles.title} ${className}`} style={{ textAlign }}>
      {text}
    </Tag>
  );
}

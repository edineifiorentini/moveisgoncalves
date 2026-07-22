"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type DelayedRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  amount?: number;
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function DelayedReveal({
  children,
  className = "",
  delay = 0.58,
  distance = 8,
  amount = 0.25,
}: DelayedRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const element = ref.current;
      if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const animation = gsap.fromTo(
        element,
        { autoAlpha: 0, y: distance },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.48,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: `top ${Math.round((1 - amount) * 100)}%`,
            once: true,
            fastScrollEnd: true,
          },
        },
      );

      return () => {
        animation.scrollTrigger?.kill();
        animation.kill();
      };
    },
    { dependencies: [delay, distance, amount], scope: ref },
  );

  return (
    <div
      ref={ref}
      className={className}
    >
      {children}
    </div>
  );
}

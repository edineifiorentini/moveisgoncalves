"use client";

import { Children, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type AnimatedListProps = {
  children: ReactNode;
  className?: string;
};

export function AnimatedList({ children, className = "" }: AnimatedListProps) {
  const reducedMotion = useReducedMotion();
  const items = Children.toArray(children);

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.09 } },
      }}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: reducedMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 },
            visible: {
              opacity: 1,
              y: 0,
              scale: 1,
              transition: { duration: reducedMotion ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {item}
        </motion.div>
      ))}
    </motion.div>
  );
}

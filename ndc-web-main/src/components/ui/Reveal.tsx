"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE = [0.23, 1, 0.32, 1] as const;

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
}

export function Reveal({ children, className = "", delay = 0, as = "div" }: RevealProps) {
  const MotionTag = as === "section" ? motion.section : motion.div;
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    const Tag = as === "section" ? "section" : "div";
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, transform: "translateY(26px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, transform: "translateY(22px)" },
  show: { opacity: 1, transform: "translateY(0px)", transition: { duration: 0.45, ease: EASE } },
};

interface RevealGroupProps {
  children: React.ReactNode;
  className?: string;
}

/** Wrap a list of RevealItem children to stagger them in together. */
export function RevealGroup({ children, className = "" }: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className = "" }: RevealGroupProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={itemVariants}>
      {children}
    </motion.div>
  );
}

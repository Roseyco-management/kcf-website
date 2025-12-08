"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  background?: "cream" | "white" | "navy" | "cream-dark";
  id?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function SectionWrapper({
  children,
  className = "",
  background = "cream",
  id,
}: SectionWrapperProps) {
  const bgClasses = {
    cream: "bg-cream",
    white: "bg-white",
    navy: "bg-primary text-white",
    "cream-dark": "bg-cream-dark",
  };

  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={fadeInUp}
      className={`section-padding ${bgClasses[background]} ${className}`}
    >
      <div className="container-main">{children}</div>
    </motion.section>
  );
}

interface SectionHeaderProps {
  badge?: string;
  title: string;
  highlightedWord?: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({
  badge,
  title,
  highlightedWord,
  description,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  let beforeHighlight = title;
  let afterHighlight = "";

  if (highlightedWord && title.includes(highlightedWord)) {
    const parts = title.split(highlightedWord);
    beforeHighlight = parts[0];
    afterHighlight = parts.slice(1).join(highlightedWord);
  }

  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center max-w-3xl mx-auto" : ""}`}>
      {badge && (
        <span
          className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-4 ${
            light ? "bg-white/20 text-white" : "bg-accent/20 text-primary"
          }`}
        >
          {badge}
        </span>
      )}
      <h2 className={light ? "text-white" : ""}>
        {beforeHighlight}
        {highlightedWord && (
          <span className="text-accent">{highlightedWord}</span>
        )}
        {afterHighlight}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg ${
            light ? "text-white/80" : "text-muted-foreground"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

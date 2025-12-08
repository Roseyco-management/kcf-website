"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  badge?: string;
  title: string;
  highlightedWord?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  showStats?: boolean;
  centered?: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export function Hero({
  badge,
  title,
  highlightedWord,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  showStats = false,
  centered = false,
}: HeroProps) {
  // Split title at highlighted word if provided
  let beforeHighlight = title;
  let afterHighlight = "";

  if (highlightedWord && title.includes(highlightedWord)) {
    const parts = title.split(highlightedWord);
    beforeHighlight = parts[0];
    afterHighlight = parts.slice(1).join(highlightedWord);
  }

  return (
    <section className="relative min-h-[85vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background Image with Subtle Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
            quality={90}
          />
          {/* Light gradient - lets the house image shine through */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/50 to-transparent" />
        </div>
      )}

      {/* Decorative Elements for non-image heroes */}
      {!backgroundImage && (
        <div className="absolute inset-0 z-0 bg-cream">
          <div className="absolute top-20 right-0 w-1/2 h-full opacity-10">
            <div className="absolute top-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
            <div className="absolute bottom-20 right-40 w-72 h-72 rounded-full bg-primary blur-3xl" />
          </div>
        </div>
      )}

      <div className="container-main relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}
        >
          {/* Badge */}
          {badge && (
            <motion.div variants={fadeInUp}>
              <span
                className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium mb-6 ${
                  backgroundImage
                    ? "bg-accent/30 text-accent border border-accent/40"
                    : "bg-accent/20 text-primary"
                }`}
              >
                {badge}
              </span>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className={`mb-6 ${backgroundImage ? "text-white" : "text-foreground"}`}
          >
            {beforeHighlight}
            {highlightedWord && (
              <span className="text-accent">{highlightedWord}</span>
            )}
            {afterHighlight}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className={`text-xl md:text-2xl mb-4 ${
                backgroundImage ? "text-white/90" : "text-muted-foreground"
              }`}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Description */}
          {description && (
            <motion.p
              variants={fadeInUp}
              className={`text-lg leading-relaxed mb-10 max-w-2xl ${
                backgroundImage ? "text-white/85" : "text-muted-foreground"
              }`}
            >
              {description}
            </motion.p>
          )}

          {/* CTAs - Stronger, more prominent */}
          {(primaryCTA || secondaryCTA) && (
            <motion.div
              variants={fadeInUp}
              className={`flex flex-col sm:flex-row gap-4 ${
                centered ? "justify-center" : ""
              }`}
            >
              {primaryCTA && (
                <Link
                  href={primaryCTA.href}
                  className={`group inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 shadow-lg hover:shadow-xl ${
                    backgroundImage
                      ? "bg-accent text-primary hover:bg-accent/90"
                      : "bg-accent text-primary hover:bg-accent/90"
                  }`}
                >
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className={`inline-flex items-center justify-center px-8 py-4 rounded-full font-semibold text-base transition-all duration-300 ${
                    backgroundImage
                      ? "bg-white text-primary hover:bg-cream"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {secondaryCTA.text}
                </Link>
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

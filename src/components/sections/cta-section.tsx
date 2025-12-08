"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

interface CTASectionProps {
  badge?: string;
  title: string;
  highlightedWord?: string;
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
  variant?: "default" | "split" | "centered";
}

export function CTASection({
  badge,
  title,
  highlightedWord,
  description,
  primaryCTA,
  secondaryCTA,
  backgroundImage,
  variant = "default",
}: CTASectionProps) {
  // Split title at highlighted word
  let beforeHighlight = title;
  let afterHighlight = "";

  if (highlightedWord && title.includes(highlightedWord)) {
    const parts = title.split(highlightedWord);
    beforeHighlight = parts[0];
    afterHighlight = parts.slice(1).join(highlightedWord);
  }

  if (variant === "split") {
    return (
      <section className="section-padding bg-primary overflow-hidden">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {badge && (
                <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
                  {badge}
                </span>
              )}
              <h2 className="text-white mb-4">
                {beforeHighlight}
                {highlightedWord && <span className="text-accent">{highlightedWord}</span>}
                {afterHighlight}
              </h2>
              {description && (
                <p className="text-white/80 text-lg mb-8">{description}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                {primaryCTA && (
                  <Link
                    href={primaryCTA.href}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg"
                  >
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                )}
                {secondaryCTA && (
                  <Link
                    href={secondaryCTA.href}
                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-cream transition-all duration-300"
                  >
                    {secondaryCTA.text}
                  </Link>
                )}
              </div>
            </motion.div>

            {/* Image */}
            {backgroundImage && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-2xl overflow-hidden"
              >
                <Image
                  src={backgroundImage}
                  alt=""
                  fill
                  className="object-cover"
                />
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative section-padding overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <div className="absolute inset-0">
          <Image
            src={backgroundImage}
            alt=""
            fill
            className="object-cover"
          />
          {/* Light gradient overlay - lets house image shine through */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/50 to-transparent" />
        </div>
      ) : (
        <div className="absolute inset-0 bg-primary" />
      )}

      {/* Content */}
      <div className="container-main relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`max-w-3xl ${variant === "centered" ? "mx-auto text-center" : ""}`}
        >
          {badge && (
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-medium mb-4">
              {badge}
            </span>
          )}
          <h2 className="text-white mb-4">
            {beforeHighlight}
            {highlightedWord && <span className="text-accent">{highlightedWord}</span>}
            {afterHighlight}
          </h2>
          {description && (
            <p className="text-white/80 text-lg mb-8">{description}</p>
          )}
          <div className={`flex flex-col sm:flex-row gap-4 ${variant === "centered" ? "justify-center" : ""}`}>
            {primaryCTA && (
              <Link
                href={primaryCTA.href}
                className="group inline-flex items-center justify-center px-8 py-4 bg-accent text-primary font-semibold rounded-full hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                {primaryCTA.text}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {secondaryCTA && (
              <Link
                href={secondaryCTA.href}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary font-semibold rounded-full hover:bg-cream transition-all duration-300"
              >
                {secondaryCTA.text}
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

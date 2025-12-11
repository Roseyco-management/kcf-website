"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

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
  centered?: boolean;
  floatingLogo?: boolean;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9] as [number, number, number, number],
    },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const rotatingLogo = {
  animate: {
    rotateY: [0, 360],
    transition: {
      duration: 20,
      repeat: Infinity,
      ease: "linear" as const,
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
  centered = false,
  floatingLogo = false,
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
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-20 overflow-hidden">
      {/* Background Image with Dramatic Overlay */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 30%' }}
            priority
            quality={90}
          />
          {/* Darker, more dramatic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/60 to-primary/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />
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

      {/* Floating Rotating Logo */}
      {floatingLogo && (
        <motion.div
          variants={rotatingLogo}
          animate="animate"
          className="absolute inset-0 z-[1] flex items-center justify-center pointer-events-none"
          style={{ perspective: "1000px", marginTop: "10vh" }}
        >
          <Image
            src="/logos/KC Analytics Hub Logo Transparent BG.png"
            alt="KC Family Home Team Logo"
            width={600}
            height={600}
            className="opacity-[0.08]"
            priority
          />
        </motion.div>
      )}

      <div className="container-main relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className={`max-w-6xl ${centered ? "mx-auto text-center" : ""}`}
        >
          {/* Badge */}
          {badge && (
            <motion.div variants={fadeInUp}>
              <p
                className={`text-sm md:text-base font-bold tracking-[0.3em] mb-12 uppercase ${
                  backgroundImage
                    ? "text-white/80 drop-shadow-lg"
                    : "text-muted-foreground"
                }`}
              >
                {badge}
              </p>
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            variants={fadeInUp}
            className={`mb-6 text-4xl md:text-5xl lg:text-7xl font-black leading-[1.2] ${
              backgroundImage
                ? "text-white/90 drop-shadow-2xl [text-shadow:_0_4px_12px_rgb(0_0_0_/_40%)]"
                : "text-foreground"
            }`}
            style={{ letterSpacing: '-0.02em' }}
          >
            {highlightedWord ? (
              <>
                <span className="block text-accent/90 uppercase mb-2 italic [text-shadow:_-1px_-1px_0_#151A4A,_1px_-1px_0_#151A4A,_-1px_1px_0_#151A4A,_1px_1px_0_#151A4A]">
                  {highlightedWord}
                </span>
                <span className="block mb-6">{afterHighlight}</span>
              </>
            ) : (
              <>
                {beforeHighlight}
                {afterHighlight}
              </>
            )}
          </motion.h1>

          {/* Subtitle */}
          {subtitle && (
            <motion.p
              variants={fadeInUp}
              className={`text-2xl md:text-3xl lg:text-4xl mb-14 italic font-light max-w-5xl leading-relaxed ${
                centered ? "mx-auto" : ""
              } ${
                backgroundImage
                  ? "text-white drop-shadow-2xl [text-shadow:_0_4px_16px_rgb(0_0_0_/_50%)]"
                  : "text-muted-foreground"
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
                centered ? "mx-auto" : ""
              } ${
                backgroundImage ? "text-white/75" : "text-muted-foreground"
              }`}
            >
              {description}
            </motion.p>
          )}

          {/* CTAs - Powerful and eye-catching */}
          {(primaryCTA || secondaryCTA) && (
            <motion.div
              variants={fadeInUp}
              className={`flex flex-col sm:flex-row gap-6 ${
                centered ? "justify-center" : ""
              }`}
            >
              {primaryCTA && (
                <Link
                  href={primaryCTA.href}
                  className={`inline-flex items-center justify-center px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-2xl ${
                    backgroundImage
                      ? "bg-primary text-white hover:bg-primary/90 hover:shadow-primary/50"
                      : "bg-primary text-white hover:bg-primary/90"
                  }`}
                >
                  {primaryCTA.text}
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className={`inline-flex items-center justify-center px-10 py-4 rounded-lg font-bold text-lg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl ${
                    backgroundImage
                      ? "bg-white text-primary hover:bg-white/95 backdrop-blur-sm"
                      : "bg-white text-primary border-2 border-primary hover:bg-gray-50"
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

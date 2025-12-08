"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface Stat {
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

interface StatsSectionProps {
  stats: Stat[];
  variant?: "default" | "cards" | "inline" | "band";
  background?: "cream" | "white" | "navy";
}

export function StatsSection({
  stats,
  variant = "default",
  background = "cream",
}: StatsSectionProps) {
  const bgClasses = {
    cream: "bg-cream",
    white: "bg-white",
    navy: "bg-primary text-white",
  };

  const textClasses = {
    cream: "text-primary",
    white: "text-primary",
    navy: "text-white",
  };

  const subtextClasses = {
    cream: "text-muted-foreground",
    white: "text-muted-foreground",
    navy: "text-white/70",
  };

  // Band variant - prominent horizontal strip with dividers
  if (variant === "band") {
    return (
      <section className="bg-primary py-8 md:py-10 border-y-4 border-accent">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`text-center ${
                  index < stats.length - 1 ? "md:border-r md:border-white/20" : ""
                }`}
              >
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-accent mb-1"
                />
                <p className="text-white/80 text-sm md:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "cards") {
    return (
      <section className={`section-padding ${bgClasses[background]}`}>
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`${
                  background === "navy" ? "bg-white/10" : "bg-white"
                } rounded-2xl p-6 md:p-8 text-center card-shadow`}
              >
                <AnimatedNumber
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className={`text-3xl md:text-4xl font-bold mb-2 ${textClasses[background]}`}
                />
                <p className={`text-sm md:text-base ${subtextClasses[background]}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center"
          >
            <AnimatedNumber
              value={stat.value}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className={`text-3xl md:text-4xl font-bold mb-1 ${textClasses[background]}`}
            />
            <p className={`text-sm ${subtextClasses[background]}`}>{stat.label}</p>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <section className={`py-16 ${bgClasses[background]}`}>
      <div className="container-main">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="text-center"
            >
              <AnimatedNumber
                value={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                className={`text-4xl md:text-5xl font-bold mb-2 ${textClasses[background]}`}
              />
              <p className={`${subtextClasses[background]}`}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface AnimatedNumberProps {
  value: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

function AnimatedNumber({ value, prefix = "", suffix = "", className }: AnimatedNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part from value
    const numericMatch = value.match(/[\d.]+/);
    if (!numericMatch) {
      setDisplayValue(value);
      return;
    }

    const targetNumber = parseFloat(numericMatch[0]);
    const duration = 2000; // 2 seconds
    const startTime = Date.now();
    const isDecimal = value.includes(".");

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = targetNumber * easeOut;

      if (isDecimal) {
        setDisplayValue(currentValue.toFixed(1));
      } else {
        setDisplayValue(Math.floor(currentValue).toString());
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure we end with the exact target value
        setDisplayValue(numericMatch[0]);
      }
    };

    animate();
  }, [isInView, value]);

  // Extract any non-numeric suffix from the value (like %, +, K, M)
  const valueSuffix = value.replace(/[\d.]+/, "");

  return (
    <div ref={ref} className={className}>
      {prefix}
      {displayValue}
      {valueSuffix}
      {suffix}
    </div>
  );
}

interface StatHighlightProps {
  value: string;
  label: string;
  description?: string;
}

export function StatHighlight({ value, label, description }: StatHighlightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-accent/10 rounded-2xl p-8 text-center"
    >
      <div className="text-5xl md:text-6xl font-bold text-accent mb-2">{value}</div>
      <div className="text-xl font-semibold mb-2">{label}</div>
      {description && (
        <p className="text-muted-foreground">{description}</p>
      )}
    </motion.div>
  );
}

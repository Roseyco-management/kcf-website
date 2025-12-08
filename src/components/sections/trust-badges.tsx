"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, Award, Clock, ThumbsUp } from "lucide-react";

interface TrustBadgesSectionProps {
  variant?: "simple" | "detailed";
}

export function TrustBadgesSection({ variant = "simple" }: TrustBadgesSectionProps) {
  if (variant === "detailed") {
    return (
      <section className="py-12 bg-cream border-y border-accent/10">
        <div className="container-main">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* United Real Estate Badge */}
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-12">
                <Image
                  src="/transparent/KC-United-Real-Estate.png"
                  alt="United Real Estate"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="text-sm text-muted-foreground">
                Proud member of<br />
                <span className="font-medium text-foreground">United Real Estate</span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden md:block w-px h-12 bg-accent/20" />

            {/* Trust indicators */}
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">Top Producer</span>
              </div>
              <div className="flex items-center gap-2">
                <ThumbsUp className="w-5 h-5 text-accent" />
                <span className="text-sm font-medium">5-Star Rated</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 bg-white border-b border-cream">
      <div className="container-main">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16"
        >
          {/* United Real Estate Logo */}
          <div className="flex items-center gap-3 opacity-80 hover:opacity-100 transition-opacity">
            <div className="relative w-40 h-14">
              <Image
                src="/transparent/KC-United-Real-Estate.png"
                alt="United Real Estate"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-10 bg-primary/10" />

          {/* Trust Badges */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-foreground">Licensed</div>
              <div className="text-muted-foreground">MO & KS</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Clock className="w-5 h-5 text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-foreground">15+ Years</div>
              <div className="text-muted-foreground">Experience</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <ThumbsUp className="w-5 h-5 text-accent" />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-foreground">500+</div>
              <div className="text-muted-foreground">Families Served</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Compact inline trust indicators
export function TrustIndicators() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
      <div className="flex items-center gap-2">
        <Shield className="w-4 h-4 text-accent" />
        <span>Licensed in MO & KS</span>
      </div>
      <div className="flex items-center gap-2">
        <Award className="w-4 h-4 text-accent" />
        <span>Top Producer 2024</span>
      </div>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4 text-accent" />
        <span>5-Star Rated</span>
      </div>
    </div>
  );
}

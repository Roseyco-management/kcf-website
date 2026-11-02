"use client";

// src/components/sections/static-sold-grid.tsx
// Fallback grid of hand-curated sold cards (the pre-MLS homepage content). Rendered only when
// the live listings feed is unavailable or has nothing to show, so the section never goes blank.
// RELEVANT FILES: src/components/sections/recent-sales.tsx, src/data/sold-properties.ts

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { soldProperties } from "@/data/sold-properties";

export function StaticSoldGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {soldProperties
        .filter((property) => property.neighborhoodSlug !== "independence")
        .slice(0, 4)
        .map((property, index) => (
          <motion.div
            key={property.address}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Link href={`/neighborhoods/${property.neighborhoodSlug}`} className="group block relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={property.image}
                  alt={`Sold property at ${property.address}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                  SOLD
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg group-hover:bg-primary/90 transition-colors">
                      View Neighborhood
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                  {property.address}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { soldProperties } from "@/data/sold-properties";
import { ArrowRight } from "lucide-react";

export function RecentSales() {
  return (
    <section className="py-16 bg-cream">
      <div className="container-main">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent font-semibold rounded-full mb-4 text-sm uppercase tracking-wider">
            Recent Success
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recently <span className="text-accent">Sold</span> Homes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See the homes we&apos;ve successfully sold for Kansas City families. Your home could be next!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {soldProperties
            .filter((property) => property.neighborhoodSlug !== 'independence')
            .slice(0, 4)
            .map((property, index) => (
            <motion.div
              key={property.address}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <Link
                href={`/neighborhoods/${property.neighborhoodSlug}`}
                className="group block relative"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src={property.image}
                    alt={`Sold property at ${property.address}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* SOLD Badge */}
                  <div className="absolute top-4 left-4 bg-accent text-white px-4 py-2 rounded-lg font-bold text-lg shadow-lg">
                    SOLD
                  </div>

                  {/* Overlay with Button */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg group-hover:bg-primary/90 transition-colors">
                        View Neighborhood
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address */}
                <div className="mt-3">
                  <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
                    {property.address}
                  </p>
                  {property.soldDate && (
                    <p className="text-sm text-muted-foreground">{property.soldDate}</p>
                  )}
                  {property.daysOnMarket && (
                    <p className="text-sm text-accent font-medium">
                      Sold in {property.daysOnMarket} days
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="https://intake.kcfhomes.com/questionnaire"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Sell Your Home Too
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

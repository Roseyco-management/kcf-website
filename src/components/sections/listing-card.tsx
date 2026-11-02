"use client";

// src/components/sections/listing-card.tsx
// One MLS listing card, shared by the Active Listings and Recently Sold sections so both
// sections look identical and the badge/CTA are the only differences.
// RELEVANT FILES: src/components/sections/active-listings.tsx, src/components/sections/recent-sales.tsx,
//   src/lib/listings.ts

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { formatCloseMonth, formatFacts, formatPrice, neighborhoodSlugForCity, type MlsListing } from "@/lib/listings";

interface ListingCardProps {
  listing: MlsListing;
  index: number;
}

export function ListingCard({ listing, index }: ListingCardProps) {
  const isSold = listing.status === "sold";
  const slug = neighborhoodSlugForCity(listing.city);
  // Sold cards keep the neighborhood link the old static cards had; active cards go to contact
  // because the site has no listing detail page and the point is to start a conversation.
  const href = isSold ? (slug ? `/neighborhoods/${slug}` : "/contact") : "/contact";
  const cta = isSold ? (slug ? "View Neighborhood" : "Talk to an Agent") : "Ask About This Home";
  const price = formatPrice(isSold ? listing.closePrice ?? listing.listPrice : listing.listPrice);
  const facts = formatFacts(listing);
  const soldMonth = isSold ? formatCloseMonth(listing.closeDate) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Link href={href} className="group block relative">
        <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300 bg-cream-dark">
          {listing.photoUrl ? (
            <Image
              src={listing.photoUrl}
              alt={`${isSold ? "Sold" : "Active listing"}: ${listing.address}, ${listing.city}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-primary/40" aria-hidden="true">
              <Home className="w-12 h-12" />
            </div>
          )}

          <div
            className={`absolute top-4 left-4 px-4 py-2 rounded-lg font-bold text-lg shadow-lg text-white ${
              isSold ? "bg-accent" : "bg-primary"
            }`}
          >
            {isSold ? "SOLD" : "FOR SALE"}
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent">
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-semibold rounded-lg shadow-lg group-hover:bg-primary/90 transition-colors">
                {cta}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-3">
          <p className="font-semibold text-foreground group-hover:text-accent transition-colors">
            {listing.address}
          </p>
          <p className="text-sm text-muted-foreground">
            {listing.city}, {listing.state}
            {soldMonth ? ` · Sold ${soldMonth}` : ""}
          </p>
          {(price || facts) && (
            <p className="text-sm text-accent font-medium">
              {[price, facts].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

// src/components/sections/active-listings.tsx
// "Homes For Sale" on the homepage: the team's current MLS listings, synced daily through the
// intake platform. Server component; renders nothing at all when there are no active listings
// so the homepage never shows an empty "for sale" section.
// RELEVANT FILES: src/lib/listings.ts, src/components/sections/listing-card.tsx,
//   src/components/sections/recent-sales.tsx, src/app/page.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchListings } from "@/lib/listings";
import { ListingCard } from "./listing-card";

const ACTIVE_CARDS = 8;

export async function ActiveListings() {
  const payload = await fetchListings();
  const active = payload?.active.slice(0, ACTIVE_CARDS) ?? [];
  if (active.length === 0) return null;

  return (
    <section className="py-16 bg-white" id="for-sale">
      <div className="container-main">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary font-semibold rounded-full mb-4 text-sm uppercase tracking-wider">
            On the Market Now
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Homes <span className="text-accent">For Sale</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our current listings across Kansas City, straight from the MLS and updated daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {active.map((listing, index) => (
            <ListingCard key={listing.listingKey} listing={listing} index={index} />
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Schedule a Showing
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

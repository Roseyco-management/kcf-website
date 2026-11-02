// src/components/sections/recent-sales.tsx
// "Recently Sold Homes" on the homepage. Server component: pulls the team's closed deals from
// the intake platform (synced daily from MLS Grid) and renders the newest four. When the feed
// is unavailable or empty it falls back to the hand-curated static cards so the section never
// disappears. Cards themselves are client components (framer-motion).
// RELEVANT FILES: src/lib/listings.ts, src/components/sections/listing-card.tsx,
//   src/components/sections/static-sold-grid.tsx, src/data/sold-properties.ts, src/app/page.tsx

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { fetchListings, type MlsListing } from "@/lib/listings";
import { ListingCard } from "./listing-card";
import { StaticSoldGrid } from "./static-sold-grid";

const SOLD_CARDS = 4;

export async function RecentSales() {
  const payload = await fetchListings();
  const sold: MlsListing[] = payload?.sold.slice(0, SOLD_CARDS) ?? [];

  return (
    <section className="py-16 bg-cream">
      <div className="container-main">
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

        {sold.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {sold.map((listing, index) => (
              <ListingCard key={listing.listingKey} listing={listing} index={index} />
            ))}
          </div>
        ) : (
          <StaticSoldGrid />
        )}

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

// src/lib/listings.ts
// Fetches the team's live MLS listings from the intake platform's public endpoint. The
// intake app (intake.kcfhomes.com) syncs them daily from MLS Grid; the website only renders.
// Resilience: any failure returns null so the homepage falls back to the static sold cards
// instead of breaking — a stale section beats an empty one.
// RELEVANT FILES: src/components/sections/recent-sales.tsx, src/components/sections/active-listings.tsx,
//   src/data/sold-properties.ts (fallback), intake repo app/api/public/website-listings/route.ts

export interface MlsListing {
  listingKey: string;
  listingId: string;
  status: "active" | "sold";
  address: string;
  city: string;
  state: string;
  postalCode: string;
  listPrice: number | null;
  closePrice: number | null;
  closeDate: string | null;
  beds: number | null;
  bathsFull: number | null;
  bathsHalf: number | null;
  sqft: number | null;
  propertyType: string;
  propertySubType: string | null;
  role: "listing" | "buyer" | "both";
  photoUrl: string | null;
}

export interface MlsListingsPayload {
  updatedAt: string | null;
  backfillComplete: boolean;
  active: MlsListing[];
  sold: MlsListing[];
}

const DEFAULT_ENDPOINT = "https://intake.kcfhomes.com/api/public/website-listings";
// The intake endpoint caches for an hour; revalidating faster than that gains nothing.
export const LISTINGS_REVALIDATE_SECONDS = 3600;

function isListing(value: unknown): value is MlsListing {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.listingKey === "string" &&
    typeof v.address === "string" &&
    typeof v.city === "string" &&
    (v.status === "active" || v.status === "sold") &&
    (v.photoUrl === null || typeof v.photoUrl === "string")
  );
}

export async function fetchListings(): Promise<MlsListingsPayload | null> {
  const endpoint = process.env.LISTINGS_API_URL ?? DEFAULT_ENDPOINT;
  try {
    const response = await fetch(endpoint, { next: { revalidate: LISTINGS_REVALIDATE_SECONDS } });
    if (!response.ok) {
      console.warn(`[listings] ${endpoint} answered HTTP ${response.status}`);
      return null;
    }
    const body: unknown = await response.json();
    if (!body || typeof body !== "object") return null;
    const { active, sold, updatedAt, backfillComplete } = body as Partial<MlsListingsPayload>;
    if (!Array.isArray(active) || !Array.isArray(sold)) return null;
    // Cards without a photo look broken next to ones with; MLS media copies can lag the
    // listing data by a day (media host quota), so photo-less rows are simply held back.
    const withPhoto = (listing: MlsListing) => listing.photoUrl !== null;
    return {
      updatedAt: typeof updatedAt === "string" ? updatedAt : null,
      backfillComplete: backfillComplete === true,
      active: active.filter(isListing).filter(withPhoto),
      sold: sold.filter(isListing).filter(withPhoto),
    };
  } catch (error) {
    console.warn("[listings] fetch failed", error instanceof Error ? error.message : error);
    return null;
  }
}

export function formatPrice(value: number | null): string | null {
  if (value === null) return null;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
}

/** "3 bd · 2.5 ba · 1,500 sqft", skipping whatever the feed left out. */
export function formatFacts(listing: Pick<MlsListing, "beds" | "bathsFull" | "bathsHalf" | "sqft">): string {
  const parts: string[] = [];
  if (listing.beds !== null) parts.push(`${listing.beds} bd`);
  if (listing.bathsFull !== null) {
    const baths = listing.bathsFull + (listing.bathsHalf ?? 0) * 0.5;
    parts.push(`${baths} ba`);
  }
  if (listing.sqft !== null) parts.push(`${listing.sqft.toLocaleString("en-US")} sqft`);
  return parts.join(" · ");
}

export function formatCloseMonth(closeDate: string | null): string | null {
  if (!closeDate) return null;
  const date = new Date(`${closeDate}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });
}

/** Cities that have a neighborhood guide on the site; others link to the contact page. */
const CITY_TO_NEIGHBORHOOD_SLUG: Record<string, string> = {
  "overland park": "overland-park",
  "lee's summit": "lees-summit",
  "lees summit": "lees-summit",
  "blue springs": "blue-springs",
  olathe: "olathe",
  liberty: "liberty",
  leawood: "leawood",
};

export function neighborhoodSlugForCity(city: string): string | null {
  return CITY_TO_NEIGHBORHOOD_SLUG[city.trim().toLowerCase()] ?? null;
}

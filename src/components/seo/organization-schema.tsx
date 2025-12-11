import { googleReviews, reviewStats } from '@/data/reviews';

export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": "https://www.kcfhomes.com/#organization",
    name: "KC Family Home Team",
    alternateName: "Kansas City Family Home Team",
    url: "https://www.kcfhomes.com",
    logo: {
      "@type": "ImageObject",
      url: "https://www.kcfhomes.com/logo.png",
      width: 250,
      height: 60,
    },
    image: {
      "@type": "ImageObject",
      url: "https://www.kcfhomes.com/og-image.jpg",
      width: 1200,
      height: 630,
    },
    description:
      "Expert real estate team specializing in helping families buy and sell homes in Kansas City. Dedicated professionals serving the entire Kansas City metro area with personalized service.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kansas City",
      addressRegion: "MO",
      addressCountry: "US",
    },
    areaServed: [
      {
        "@type": "City",
        name: "Kansas City",
        "@id": "https://en.wikipedia.org/wiki/Kansas_City,_Missouri",
      },
      {
        "@type": "City",
        name: "Overland Park",
        "@id": "https://en.wikipedia.org/wiki/Overland_Park,_Kansas",
      },
      {
        "@type": "City",
        name: "Lee's Summit",
        "@id": "https://en.wikipedia.org/wiki/Lee%27s_Summit,_Missouri",
      },
      {
        "@type": "City",
        name: "Olathe",
        "@id": "https://en.wikipedia.org/wiki/Olathe,_Kansas",
      },
      {
        "@type": "City",
        name: "Leawood",
        "@id": "https://en.wikipedia.org/wiki/Leawood,_Kansas",
      },
    ],
    telephone: "+1-816-575-7763",
    email: "admin@kcfhomes.com",
    sameAs: [
      "https://www.facebook.com/kcfamilyhomes",
      "https://www.instagram.com/kcfamilyhomes",
    ],
    serviceType: "Real Estate Agent",
    priceRange: "$$",
    knowsAbout: [
      "Residential Real Estate",
      "Family Homes",
      "Home Buying",
      "Home Selling",
      "Kansas City Neighborhoods",
      "Property Marketing",
      "Real Estate Investment",
    ],
    slogan: "Your Family's Real Estate Partner in Kansas City",
    founder: {
      "@type": "Person",
      name: "Ernesto Tinoco",
      jobTitle: "Senior Consultant",
    },
    employee: [
      {
        "@type": "Person",
        name: "Ernesto Tinoco",
        jobTitle: "Senior Consultant",
        email: "ernesto@kcfhomes.com",
        telephone: "+1-816-575-7763",
      },
      {
        "@type": "Person",
        name: "Monica Hammer",
        jobTitle: "Homeowner Specialist",
        email: "monica@kcfhomes.com",
        telephone: "+1-816-575-7763",
      },
      {
        "@type": "Person",
        name: "Chris Schinzel",
        jobTitle: "Transaction Coordinator and Property Manager",
        email: "chris@kcfhomes.com",
        telephone: "+1-816-575-7763",
      },
      {
        "@type": "Person",
        name: "Sandy",
        jobTitle: "Real Estate Specialist",
        email: "sandy@kcfhomes.com",
        telephone: "+1-816-575-7763",
      },
    ],
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 4,
    },
    foundingDate: "2010",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Real Estate Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Home Buying Services",
            description:
              "Expert guidance for families buying homes in Kansas City, including pre-approval assistance, home search, negotiation, and closing support.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Home Selling Services",
            description:
              "Comprehensive home selling services including market analysis, professional photography, staging advice, and expert marketing across 100+ platforms.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Neighborhood Consultation",
            description:
              "In-depth knowledge of Kansas City neighborhoods, schools, amenities, and community features to help families find the perfect location.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Real Estate Market Analysis",
            description:
              "Comprehensive market analysis and pricing strategy for buyers and sellers in the Kansas City metro area.",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.totalReviews,
      bestRating: "5",
      worstRating: "1",
    },
    review: googleReviews.filter(r => r.text).map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      datePublished: review.date,
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.text,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

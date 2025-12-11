import { Neighborhood } from '@/types/neighborhood';

interface Props {
  neighborhood: Neighborhood;
}

export function NeighborhoodSchema({ neighborhood }: Props) {
  // LocalBusiness / RealEstateAgent Schema
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'KC Family Home Team',
    description: `Helping families find their perfect home in ${neighborhood.name}, Kansas City. Expert local real estate agents specializing in family-friendly neighborhoods.`,
    url: `https://www.kcfhomes.com/neighborhoods/${neighborhood.slug}`,
    areaServed: {
      '@type': 'City',
      name: neighborhood.city,
      '@id': `https://www.wikidata.org/wiki/${neighborhood.city.replace(' ', '_')}`,
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kansas City',
      addressRegion: 'MO',
      addressCountry: 'US',
    },
    telephone: '+1-816-555-1234',
    priceRange: '$$',
    knowsAbout: [
      `${neighborhood.name} real estate`,
      'family-friendly homes',
      'Kansas City neighborhoods',
      'home buying',
      'home selling',
    ],
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.kcfhomes.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Neighborhoods',
        item: 'https://www.kcfhomes.com/neighborhoods',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: neighborhood.name,
        item: `https://www.kcfhomes.com/neighborhoods/${neighborhood.slug}`,
      },
    ],
  };

  // Place Schema for the neighborhood
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: neighborhood.name,
    description: neighborhood.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: neighborhood.city,
      addressRegion: neighborhood.state,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      // Note: In production, add actual coordinates for each neighborhood
    },
    amenityFeature: [
      ...neighborhood.parks.map((park) => ({
        '@type': 'LocationFeatureSpecification',
        name: park.name,
        value: park.type,
      })),
      ...neighborhood.otherAmenities.map((amenity) => ({
        '@type': 'LocationFeatureSpecification',
        name: amenity.name,
        value: amenity.type,
      })),
    ],
  };

  // Residence Schema
  const residenceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Residence',
    name: `Homes in ${neighborhood.name}`,
    description: `${neighborhood.description} Find your perfect family home in this desirable Kansas City neighborhood.`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: neighborhood.city,
      addressRegion: neighborhood.state,
      addressCountry: 'US',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: Math.round(neighborhood.stats.medianPrice * 0.7),
      highPrice: Math.round(neighborhood.stats.medianPrice * 1.3),
      price: neighborhood.stats.medianPrice,
    },
  };

  // FAQ Schema for common questions
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What is the median home price in ${neighborhood.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `The median home price in ${neighborhood.name} is $${neighborhood.stats.medianPrice.toLocaleString()}.`,
        },
      },
      {
        '@type': 'Question',
        name: `What are the best schools in ${neighborhood.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${neighborhood.name} has excellent schools including ${neighborhood.schools
            .slice(0, 3)
            .map((s) => s.name)
            .join(', ')}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Is ${neighborhood.name} a good place for families?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes! ${neighborhood.description} ${neighborhood.whyFamiliesLoveIt[0]}`,
        },
      },
      {
        '@type': 'Question',
        name: `How walkable is ${neighborhood.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `${neighborhood.name} has a walkability score of ${neighborhood.stats.walkabilityScore}/100.`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(residenceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}

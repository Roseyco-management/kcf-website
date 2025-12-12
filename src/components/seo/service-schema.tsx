import { ServicePage } from '@/types/service';
import { googleReviews, reviewStats } from '@/data/reviews';

interface Props {
  service: ServicePage;
}

export function ServiceSchema({ service }: Props) {
  // Service Schema
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'RealEstateAgent',
      '@id': 'https://www.kcfhomes.com/#organization',
      name: 'KC Family Home Team',
      url: 'https://www.kcfhomes.com',
      telephone: '+1-816-616-3072',
      email: 'admin@kcfhomes.com',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kansas City',
        addressRegion: 'MO',
        addressCountry: 'US',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewStats.averageRating,
        reviewCount: reviewStats.totalReviews,
        bestRating: '5',
        worstRating: '1',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'Kansas City',
      '@id': 'https://www.wikidata.org/wiki/Q41819',
    },
    url: `https://www.kcfhomes.com/services/${service.slug}`,
    serviceType: service.name,
    audience: {
      '@type': 'Audience',
      audienceType: 'Families looking for homes in Kansas City',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
      description: service.benefits[service.benefits.findIndex(b => b.title.includes('No Cost')) || 0]?.description || 'Professional real estate services',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.totalReviews,
      bestRating: '5',
      worstRating: '1',
    },
    review: googleReviews.filter(r => r.text).map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      datePublished: review.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.text,
    })),
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
        name: 'Services',
        item: 'https://www.kcfhomes.com/#services',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: service.name,
        item: `https://www.kcfhomes.com/services/${service.slug}`,
      },
    ],
  };

  // FAQPage Schema (if service has FAQs)
  const faqSchema = service.faqs && service.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } : null;

  // HowTo Schema for process steps
  const howToSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: service.tagline,
    description: service.heroSubtitle,
    step: service.processSteps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
    </>
  );
}

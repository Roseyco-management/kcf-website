import { reviewStats } from '@/data/reviews';

export function AggregateRatingSchema() {
  const ratingSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://www.kcfhomes.com/#organization',
    name: 'KC Family Home Team',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: reviewStats.averageRating,
      reviewCount: reviewStats.totalReviews,
      bestRating: '5',
      worstRating: '1',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ratingSchema) }}
    />
  );
}

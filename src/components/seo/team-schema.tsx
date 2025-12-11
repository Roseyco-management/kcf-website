import { reviewStats } from '@/data/reviews';

export function TeamSchema() {
  const teamMembers = [
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.kcfhomes.com/#ernesto-tinoco',
      name: 'Ernesto Tinoco',
      jobTitle: 'Senior Consultant',
      description:
        'Licensed in Kansas and Missouri since 2010, Ernesto has represented hundreds of buyers and sellers with strong negotiation skills and attention to detail. Expert in Kansas City real estate, market analysis, and personalized service for families.',
      email: 'ernesto@kcfhomes.com',
      telephone: '+1-816-575-7763',
      url: 'https://www.kcfhomes.com/agents',
      image: 'https://www.kcfhomes.com/agents/Ernesto Rooftop Shot.jpg',
      worksFor: {
        '@type': 'RealEstateAgent',
        '@id': 'https://www.kcfhomes.com/#organization',
        name: 'KC Family Home Team',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kansas City',
        addressRegion: 'MO',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Kansas City' },
        { '@type': 'City', name: 'Overland Park' },
        { '@type': 'City', name: "Lee's Summit" },
        { '@type': 'City', name: 'Blue Springs' },
        { '@type': 'City', name: 'Independence' },
        { '@type': 'City', name: 'Olathe' },
        { '@type': 'City', name: 'Leawood' },
        { '@type': 'City', name: 'Liberty' },
      ],
      knowsAbout: [
        'Real Estate',
        'Home Buying',
        'Home Selling',
        'Kansas City Neighborhoods',
        'Real Estate Market Analysis',
        'First-Time Home Buyers',
        'Family Homes',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: reviewStats.averageRating,
        reviewCount: reviewStats.totalReviews,
        bestRating: '5',
        worstRating: '1',
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.kcfhomes.com/#monica-hammer',
      name: 'Monica Hammer',
      jobTitle: 'Homeowner Specialist',
      description:
        'Licensed in Kansas and Missouri, Monica helps buyers, first-time homeowners, and investors navigate real estate with confidence. Expert in down payment assistance programs, investment properties, and making homebuying stress-free for Kansas City families.',
      email: 'monica@kcfhomes.com',
      telephone: '+1-816-575-7763',
      url: 'https://www.kcfhomes.com/agents',
      image: 'https://www.kcfhomes.com/agents/Monica Rooftop Shot.jpg',
      worksFor: {
        '@type': 'RealEstateAgent',
        '@id': 'https://www.kcfhomes.com/#organization',
        name: 'KC Family Home Team',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kansas City',
        addressRegion: 'MO',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Kansas City' },
        { '@type': 'City', name: 'Overland Park' },
        { '@type': 'City', name: "Lee's Summit" },
        { '@type': 'City', name: 'Blue Springs' },
        { '@type': 'City', name: 'Independence' },
      ],
      knowsAbout: [
        'Home Selling',
        'Real Estate Marketing',
        'Home Staging',
        'Pricing Strategy',
        'Kansas City Real Estate',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.kcfhomes.com/#chris-schinzel',
      name: 'Chris Schinzel',
      jobTitle: 'Transaction Coordinator and Property Manager',
      description:
        'Transaction coordinator and property manager with years of experience managing contract documents, deadlines, and communication among all parties. Expert in coordinating smooth closings and providing quality service for Kansas City families.',
      email: 'chris@kcfhomes.com',
      telephone: '+1-816-575-7763',
      url: 'https://www.kcfhomes.com/agents',
      image: 'https://www.kcfhomes.com/agents/Chris Rooftop Shot.jpg',
      worksFor: {
        '@type': 'RealEstateAgent',
        '@id': 'https://www.kcfhomes.com/#organization',
        name: 'KC Family Home Team',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kansas City',
        addressRegion: 'MO',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Kansas City' },
        { '@type': 'City', name: 'Overland Park' },
        { '@type': 'City', name: "Lee's Summit" },
      ],
      knowsAbout: [
        'Real Estate Transactions',
        'Property Management',
        'Closing Coordination',
        'Real Estate Paperwork',
        'Home Inspections',
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      '@id': 'https://www.kcfhomes.com/#sandy',
      name: 'Sandy',
      jobTitle: 'Real Estate Specialist',
      description:
        'Real estate specialist helping Kansas City families achieve their real estate goals with expertise and dedication.',
      email: 'sandy@kcfhomes.com',
      telephone: '+1-816-575-7763',
      url: 'https://www.kcfhomes.com/agents',
      image: 'https://www.kcfhomes.com/agents/Sandy Rooftop Shot.jpg',
      worksFor: {
        '@type': 'RealEstateAgent',
        '@id': 'https://www.kcfhomes.com/#organization',
        name: 'KC Family Home Team',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kansas City',
        addressRegion: 'MO',
        addressCountry: 'US',
      },
      areaServed: [
        { '@type': 'City', name: 'Kansas City' },
        { '@type': 'City', name: 'Overland Park' },
        { '@type': 'City', name: "Lee's Summit" },
      ],
      knowsAbout: [
        'Real Estate',
        'Family Homes',
        'Kansas City Real Estate',
        'Client Relations',
      ],
    },
  ];

  return (
    <>
      {teamMembers.map((member, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(member) }}
        />
      ))}
    </>
  );
}

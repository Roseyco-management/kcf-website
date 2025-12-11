import { jsonLdScriptProps } from 'react-schemaorg';
import { RealEstateAgent, FAQPage, Organization } from 'schema-dts';

export function HomepageSchema() {
  return (
    <>
      <script
        {...jsonLdScriptProps<RealEstateAgent>({
          '@context': 'https://schema.org',
          '@type': 'RealEstateAgent',
          name: 'KC Family Home Team',
          description:
            'Kansas City real estate agents specializing in helping families buy, sell, and upsize their homes. Expert local knowledge of family-friendly neighborhoods and top schools.',
          url: 'https://www.kcfhomes.com',
          telephone: '+1-816-575-7763',
          email: 'info@kcfhomes.com',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Kansas City',
            addressRegion: 'MO',
            addressCountry: 'US',
          },
          areaServed: [
            {
              '@type': 'City',
              name: 'Kansas City',
            },
            {
              '@type': 'City',
              name: 'Overland Park',
            },
            {
              '@type': 'City',
              name: "Lee's Summit",
            },
            {
              '@type': 'City',
              name: 'Blue Springs',
            },
            {
              '@type': 'City',
              name: 'Olathe',
            },
          ],
          priceRange: '$$',
          knowsAbout: [
            'Kansas City real estate',
            'family-friendly homes',
            'school districts',
            'neighborhood guides',
            'home buying',
            'home selling',
            'upsizing homes',
          ],
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Real Estate Services',
            itemListElement: [
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Home Buying Services',
                  description: 'Expert guidance for families buying homes in Kansas City',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Home Selling Services',
                  description: 'Professional home selling services for Kansas City families',
                },
              },
              {
                '@type': 'Offer',
                itemOffered: {
                  '@type': 'Service',
                  name: 'Home Valuation',
                  description: 'Free home valuation for Kansas City properties',
                },
              },
            ],
          },
        })}
      />
      <script
        {...jsonLdScriptProps<FAQPage>({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What areas do you serve in Kansas City?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "We serve the entire Kansas City metro area, specializing in family-friendly neighborhoods including Overland Park, Lee's Summit, Brookside, Waldo, Blue Springs, Olathe, Liberty, and Leawood. We focus on areas with top-rated schools and family amenities.",
              },
            },
            {
              '@type': 'Question',
              name: 'How do I know which Kansas City neighborhood is best for my family?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "We provide comprehensive neighborhood guides that cover school ratings, parks, amenities, walkability, and community feel. Our agents will help you understand which neighborhoods align with your family's needs, budget, and lifestyle preferences.",
              },
            },
            {
              '@type': 'Question',
              name: 'What makes your team different from other Kansas City realtors?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'We specialize exclusively in helping families buy, sell, and upsize their homes. Our deep knowledge of school districts, family amenities, and neighborhood dynamics sets us apart. We understand the unique needs of growing families.',
              },
            },
            {
              '@type': 'Question',
              name: 'How long does it take to buy a home in Kansas City?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: 'The typical home buying process in Kansas City takes 30-45 days from offer acceptance to closing. However, homes in the Kansas City market are currently selling in an average of 25-30 days, so being pre-approved and ready to act quickly is important.',
              },
            },
            {
              '@type': 'Question',
              name: 'Can you help if we need to sell our current home before buying?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "Absolutely! We specialize in helping families who need to coordinate selling their current home with purchasing their next one. We'll create a strategic plan to minimize stress and ensure a smooth transition between homes.",
              },
            },
            {
              '@type': 'Question',
              name: 'What are the best school districts in Kansas City?',
              acceptedAnswer: {
                '@type': 'Answer',
                text: "The top-rated school districts for families in Kansas City include Blue Valley (Overland Park), Lee's Summit R-7, Olathe schools, and several excellent private options. We provide detailed school information for every neighborhood and can help you find homes in your preferred district.",
              },
            },
          ],
        })}
      />
      <script
        {...jsonLdScriptProps<Organization>({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'KC Family Home Team',
          url: 'https://www.kcfhomes.com',
          logo: 'https://www.kcfhomes.com/logo.png',
          sameAs: [
            'https://www.facebook.com/kcfamilyhomes',
            'https://www.instagram.com/kcfamilyhomes',
          ],
          contactPoint: {
            '@type': 'ContactPoint',
            telephone: '+1-816-575-7763',
            contactType: 'customer service',
            areaServed: 'US',
            availableLanguage: ['en'],
          },
        })}
      />
    </>
  );
}

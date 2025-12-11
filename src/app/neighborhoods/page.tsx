import { Metadata } from 'next';
import Link from 'next/link';
import { neighborhoods } from '@/data/neighborhoods';
import { MapPin, TrendingUp, GraduationCap, Home, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kansas City Neighborhoods for Families | KC Family Home Team',
  description:
    'Explore the best family-friendly neighborhoods in Kansas City. Comprehensive guides covering schools, parks, amenities, and homes for sale in Overland Park, Lee\'s Summit, Brookside, and more.',
  keywords: [
    'Kansas City neighborhoods',
    'family friendly neighborhoods Kansas City',
    'best neighborhoods Kansas City families',
    'Overland Park',
    'Lee\'s Summit',
    'Brookside Kansas City',
    'Waldo Kansas City',
  ],
  openGraph: {
    title: 'Kansas City Neighborhoods for Families | KC Family Home Team',
    description:
      'Explore the best family-friendly neighborhoods in Kansas City. Expert guides to help you find the perfect community for your family.',
  },
};

export default function NeighborhoodsPage() {
  // Sort by priority (HIGH first) then by name
  const sortedNeighborhoods = [...neighborhoods].sort((a, b) => {
    if (a.priority !== b.priority) {
      const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Kansas City Neighborhoods for Families
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Discover the perfect community for your family. Our comprehensive neighborhood guides
              cover everything from top-rated schools to parks, amenities, and local insights.
            </p>
            <div className="flex items-center gap-2 text-[#C9A961]">
              <MapPin className="h-5 w-5" />
              <span className="font-medium">{neighborhoods.length} Neighborhoods Featured</span>
            </div>
          </div>
        </div>
      </div>

      {/* Neighborhoods Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedNeighborhoods.map((neighborhood) => (
            <Link
              key={neighborhood.slug}
              href={`/neighborhoods/${neighborhood.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-[#E5E0D8] hover:shadow-xl transition-all duration-300"
            >
              {/* Card Content */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#151A4A] mb-2 group-hover:text-[#C9A961] transition-colors">
                      {neighborhood.name}
                    </h2>
                    <p className="text-sm text-[#C9A961] font-medium">
                      {neighborhood.city}, {neighborhood.state}
                    </p>
                  </div>
                  <div className="p-2 bg-[#151A4A]/5 rounded-lg group-hover:bg-[#C9A961]/10 transition-colors">
                    <Home className="h-6 w-6 text-[#151A4A] group-hover:text-[#C9A961] transition-colors" />
                  </div>
                </div>

                <p className="text-[#4A4A4A] mb-6 line-clamp-3">
                  {neighborhood.tagline}
                </p>

                {/* Quick Stats */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1.5 text-[#151A4A]">
                      <Home className="h-4 w-4 text-[#C9A961]" />
                      <span className="font-semibold">
                        ${(neighborhood.stats.medianPrice / 1000).toFixed(0)}K
                      </span>
                    </div>
                    <span className="text-[#4A4A4A]">median price</span>
                  </div>

                  {neighborhood.schools.length > 0 && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5 text-[#151A4A]">
                        <GraduationCap className="h-4 w-4 text-[#C9A961]" />
                        <span className="font-semibold">
                          {neighborhood.schools[0].rating}/10
                        </span>
                      </div>
                      <span className="text-[#4A4A4A]">school rating</span>
                    </div>
                  )}

                  {neighborhood.stats.walkabilityScore && (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="flex items-center gap-1.5 text-[#151A4A]">
                        <TrendingUp className="h-4 w-4 text-[#C9A961]" />
                        <span className="font-semibold">
                          {neighborhood.stats.walkabilityScore}/100
                        </span>
                      </div>
                      <span className="text-[#4A4A4A]">walkability</span>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="flex items-center gap-2 text-[#C9A961] font-semibold group-hover:gap-3 transition-all">
                  Explore {neighborhood.name}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Can&apos;t Decide? Let Us Help
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our local experts know every neighborhood inside and out. We&apos;ll help you find the
            perfect community for your family&apos;s unique needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A961] text-white font-semibold rounded-lg hover:bg-[#B89A52] transition-colors"
            >
              Schedule a Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Learn How We Work
            </Link>
          </div>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Kansas City Neighborhoods for Families',
            description:
              'Comprehensive guides to family-friendly neighborhoods in Kansas City including school ratings, amenities, and homes for sale.',
            url: 'https://www.kcfhomes.com/neighborhoods',
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: neighborhoods.map((n, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                item: {
                  '@type': 'Place',
                  name: n.name,
                  description: n.description,
                  url: `https://www.kcfhomes.com/neighborhoods/${n.slug}`,
                },
              })),
            },
          }),
        }}
      />
    </div>
  );
}

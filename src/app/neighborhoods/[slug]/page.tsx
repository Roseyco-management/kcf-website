import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNeighborhoodBySlug, getAllNeighborhoodSlugs } from '@/data/neighborhoods';
import { NeighborhoodHero } from '@/components/neighborhoods/neighborhood-hero';
import { NeighborhoodOverview } from '@/components/neighborhoods/neighborhood-overview';
import { NeighborhoodSchools } from '@/components/neighborhoods/neighborhood-schools';
import { NeighborhoodAmenities } from '@/components/neighborhoods/neighborhood-amenities';
import { NeighborhoodStats } from '@/components/neighborhoods/neighborhood-stats';
import { NeighborhoodInsights } from '@/components/neighborhoods/neighborhood-insights';
import { NeighborhoodCTA } from '@/components/neighborhoods/neighborhood-cta';
import { NeighborhoodSchema } from '@/components/neighborhoods/neighborhood-schema';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all neighborhoods
export async function generateStaticParams() {
  const slugs = getAllNeighborhoodSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    return {
      title: 'Neighborhood Not Found',
    };
  }

  return {
    title: neighborhood.metaTitle,
    description: neighborhood.metaDescription,
    openGraph: {
      title: neighborhood.metaTitle,
      description: neighborhood.metaDescription,
      images: [neighborhood.heroImage],
    },
  };
}

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params;
  const neighborhood = getNeighborhoodBySlug(slug);

  if (!neighborhood) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* SEO Schema Markup */}
      <NeighborhoodSchema neighborhood={neighborhood} />

      {/* Hero Section */}
      <NeighborhoodHero neighborhood={neighborhood} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {/* Overview & Why Families Love It */}
        <NeighborhoodOverview
          description={neighborhood.description}
          whyFamiliesLoveIt={neighborhood.whyFamiliesLoveIt}
        />

        {/* Stats */}
        <NeighborhoodStats
          stats={neighborhood.stats}
          name={neighborhood.name}
        />

        {/* Schools */}
        <NeighborhoodSchools
          schools={neighborhood.schools}
          name={neighborhood.name}
        />

        {/* Amenities */}
        <NeighborhoodAmenities
          parks={neighborhood.parks}
          otherAmenities={neighborhood.otherAmenities}
          name={neighborhood.name}
        />

        {/* Local Insights */}
        <NeighborhoodInsights
          insights={neighborhood.insights}
          name={neighborhood.name}
        />

        {/* Call to Action */}
        <NeighborhoodCTA name={neighborhood.name} />
      </div>
    </div>
  );
}

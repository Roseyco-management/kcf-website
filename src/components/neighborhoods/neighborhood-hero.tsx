import { Neighborhood } from '@/types/neighborhood';
import { MapPin } from 'lucide-react';

interface Props {
  neighborhood: Neighborhood;
}

export function NeighborhoodHero({ neighborhood }: Props) {
  return (
    <div className="relative bg-gradient-to-br from-[#151A4A] to-[#0F1238] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <div className="flex items-center gap-2 text-[#C9A961] mb-4">
              <MapPin className="h-5 w-5" />
              <span className="text-sm font-medium">
                {neighborhood.city}, {neighborhood.state}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#C9A961]">
              {neighborhood.name}
            </h1>

            <p className="text-xl text-white/90 mb-6">
              {neighborhood.tagline}
            </p>

            <p className="text-lg text-white/80 mb-8">
              {neighborhood.description}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="px-6 py-3 bg-[#C9A961] text-white font-semibold rounded-lg hover:bg-[#B89A52] transition-colors"
              >
                View Homes in {neighborhood.name}
              </a>
              <a
                href="#schools"
                className="px-6 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
              >
                Explore Schools & Amenities
              </a>
            </div>
          </div>

          {/* Stats Quick View */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
              <p className="text-white/70 text-sm mb-1">Median Home Price</p>
              <p className="text-3xl font-bold text-[#C9A961]">
                ${(neighborhood.stats.medianPrice / 1000).toFixed(0)}K
              </p>
            </div>
            {neighborhood.stats.walkabilityScore && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="text-white/70 text-sm mb-1">Walkability Score</p>
                <p className="text-3xl font-bold text-[#C9A961]">
                  {neighborhood.stats.walkabilityScore}/100
                </p>
              </div>
            )}
            {neighborhood.stats.population && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <p className="text-white/70 text-sm mb-1">Population</p>
                <p className="text-3xl font-bold text-[#C9A961]">
                  {(neighborhood.stats.population / 1000).toFixed(0)}K
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Decorative bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 48H1440V0C1440 0 1140 48 720 48C300 48 0 0 0 0V48Z" fill="#F8F6F2"/>
        </svg>
      </div>
    </div>
  );
}

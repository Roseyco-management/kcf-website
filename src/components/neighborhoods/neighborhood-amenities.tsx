import { Amenity } from '@/types/neighborhood';
import { TreePine, Library, Waves, Users, ShoppingBag, UtensilsCrossed } from 'lucide-react';

interface Props {
  parks: Amenity[];
  otherAmenities: Amenity[];
  name: string;
}

function getAmenityIcon(type: Amenity['type']) {
  switch (type) {
    case 'Park':
    case 'Playground':
      return TreePine;
    case 'Library':
      return Library;
    case 'Pool':
      return Waves;
    case 'Community Center':
      return Users;
    case 'Shopping':
      return ShoppingBag;
    case 'Restaurant':
      return UtensilsCrossed;
    default:
      return TreePine;
  }
}

export function NeighborhoodAmenities({ parks, otherAmenities, name }: Props) {
  const allAmenities = [...parks, ...otherAmenities];

  if (allAmenities.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#151A4A] mb-2">
          Parks & Family Amenities
        </h2>
        <p className="text-[#4A4A4A]">
          From playgrounds to community centers, {name} has everything families need.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allAmenities.map((amenity, index) => {
          const Icon = getAmenityIcon(amenity.type);
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-[#E5E0D8] hover:border-[#C9A961] transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 p-3 bg-[#C9A961]/10 rounded-lg">
                  <Icon className="h-6 w-6 text-[#C9A961]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-[#151A4A]">
                      {amenity.name}
                    </h3>
                    <span className="text-xs font-medium text-[#C9A961] bg-[#C9A961]/10 px-2 py-1 rounded">
                      {amenity.type}
                    </span>
                  </div>
                  {amenity.description && (
                    <p className="text-[#4A4A4A] text-sm leading-relaxed">
                      {amenity.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

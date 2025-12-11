import { School } from '@/types/neighborhood';
import { GraduationCap, Star } from 'lucide-react';

interface Props {
  schools: School[];
  name: string;
}

export function NeighborhoodSchools({ schools, name }: Props) {
  if (schools.length === 0) return null;

  return (
    <section id="schools">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#151A4A] mb-2">
          Top-Rated Schools in {name}
        </h2>
        <p className="text-[#4A4A4A]">
          Excellent education is a cornerstone of family life in {name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schools.map((school, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 border border-[#E5E0D8] hover:shadow-lg transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-[#151A4A]/10 rounded-lg">
                <GraduationCap className="h-6 w-6 text-[#151A4A]" />
              </div>
              <div className="flex items-center gap-1 px-3 py-1 bg-[#C9A961] text-white rounded-full text-sm font-semibold">
                <Star className="h-4 w-4 fill-current" />
                {school.rating.toFixed(1)}
              </div>
            </div>

            <h3 className="text-lg font-bold text-[#151A4A] mb-2">
              {school.name}
            </h3>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#4A4A4A]">Type:</span>
                <span className="font-medium text-[#151A4A]">{school.type}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#4A4A4A]">District:</span>
                <span className="font-medium text-[#151A4A] text-right">{school.district}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

import { NeighborhoodStats as Stats } from '@/types/neighborhood';
import { Home, Users, TrendingUp } from 'lucide-react';

interface Props {
  stats: Stats;
  name: string;
}

export function NeighborhoodStats({ stats, name }: Props) {
  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#151A4A] mb-2">
          {name} Market Statistics
        </h2>
        <p className="text-[#4A4A4A]">
          Current real estate market data for {name}.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] rounded-2xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-white/20 rounded-lg">
              <Home className="h-6 w-6" />
            </div>
            <span className="text-white/80 text-sm font-medium">Median Price</span>
          </div>
          <p className="text-3xl font-bold">
            ${stats.medianPrice.toLocaleString()}
          </p>
        </div>

        {stats.population && (
          <div className="bg-gradient-to-br from-[#C9A961] to-[#B89A52] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <Users className="h-6 w-6" />
              </div>
              <span className="text-white/80 text-sm font-medium">Population</span>
            </div>
            <p className="text-3xl font-bold">
              {stats.population.toLocaleString()}
            </p>
          </div>
        )}

        {stats.walkabilityScore && (
          <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] rounded-2xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg">
                <TrendingUp className="h-6 w-6" />
              </div>
              <span className="text-white/80 text-sm font-medium">Walkability</span>
            </div>
            <p className="text-3xl font-bold">
              {stats.walkabilityScore}/100
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

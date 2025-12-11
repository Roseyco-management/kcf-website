import { LocalInsight } from '@/types/neighborhood';
import { UtensilsCrossed, ShoppingBag, Calendar, Sparkles, Trophy } from 'lucide-react';

interface Props {
  insights: LocalInsight[];
  name: string;
}

function getInsightIcon(category: LocalInsight['category']) {
  switch (category) {
    case 'Restaurant':
      return UtensilsCrossed;
    case 'Shopping':
      return ShoppingBag;
    case 'Event':
      return Calendar;
    case 'Activity':
      return Trophy;
    case 'Hidden Gem':
      return Sparkles;
    default:
      return Sparkles;
  }
}

function getInsightColor(category: LocalInsight['category']) {
  switch (category) {
    case 'Restaurant':
      return 'bg-orange-100 text-orange-700';
    case 'Shopping':
      return 'bg-blue-100 text-blue-700';
    case 'Event':
      return 'bg-purple-100 text-purple-700';
    case 'Activity':
      return 'bg-green-100 text-green-700';
    case 'Hidden Gem':
      return 'bg-[#C9A961]/20 text-[#C9A961]';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function NeighborhoodInsights({ insights, name }: Props) {
  if (insights.length === 0) return null;

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#151A4A] mb-2">
          Local Insights & Hidden Gems
        </h2>
        <p className="text-[#4A4A4A]">
          Insider tips from local families who know {name} best.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insights.map((insight, index) => {
          const Icon = getInsightIcon(insight.category);
          const colorClass = getInsightColor(insight.category);

          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 border border-[#E5E0D8] hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 p-3 rounded-lg ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-[#151A4A]">
                      {insight.title}
                    </h3>
                    <span className={`text-xs font-medium px-2 py-1 rounded ${colorClass}`}>
                      {insight.category}
                    </span>
                  </div>
                  <p className="text-[#4A4A4A] leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

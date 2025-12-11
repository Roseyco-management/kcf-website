import { Check } from 'lucide-react';

interface Props {
  description: string;
  whyFamiliesLoveIt: string[];
}

export function NeighborhoodOverview({ description, whyFamiliesLoveIt }: Props) {
  return (
    <section>
      <h2 className="text-3xl font-bold text-[#151A4A] mb-6">
        Why Families Love Living Here
      </h2>

      <p className="text-lg text-[#4A4A4A] mb-8 leading-relaxed">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {whyFamiliesLoveIt.map((reason, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-4 bg-white rounded-lg border border-[#E5E0D8]"
          >
            <div className="flex-shrink-0 mt-0.5">
              <div className="h-6 w-6 rounded-full bg-[#C9A961] flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            </div>
            <p className="text-[#4A4A4A]">{reason}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

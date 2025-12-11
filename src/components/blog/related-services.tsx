import Link from 'next/link';
import { getServiceBySlug } from '@/data/services';
import { ArrowRight } from 'lucide-react';

interface RelatedServicesProps {
  serviceSlugs: string[];
}

export function RelatedServices({ serviceSlugs }: RelatedServicesProps) {
  const services = serviceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter(Boolean);

  if (services.length === 0) return null;

  return (
    <div className="bg-[#F8F6F2] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#151A4A] mb-8 text-center">
          Explore Our <span className="text-[#C9A961]">Services</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Link
              key={service!.slug}
              href={`/services/${service!.slug}`}
              className="group p-6 bg-white rounded-xl border-2 border-[#E5E0D8] hover:border-[#C9A961] hover:shadow-lg transition-all"
            >
              <h3 className="font-bold text-[#151A4A] mb-2 group-hover:text-[#C9A961] transition-colors text-lg">
                {service!.name}
              </h3>
              <p className="text-[#4A4A4A] mb-4 text-sm line-clamp-2">
                {service!.description}
              </p>
              <div className="flex items-center gap-1 text-[#C9A961] text-sm font-semibold">
                Learn More
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

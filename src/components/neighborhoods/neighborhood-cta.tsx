import { ArrowRight, Home, Phone } from 'lucide-react';

interface Props {
  name: string;
}

export function NeighborhoodCTA({ name }: Props) {
  return (
    <section id="contact" className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] rounded-2xl p-8 md:p-12 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Ready to Find Your Dream Home in {name}?
        </h2>
        <p className="text-xl text-white/90 mb-8">
          Let our local experts help you find the perfect family-friendly home in {name}. We know every street, every school, and every park.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A961] text-white font-semibold rounded-lg hover:bg-[#B89A52] transition-colors"
          >
            <Home className="h-5 w-5" />
            Search {name} Homes
            <ArrowRight className="h-5 w-5" />
          </a>

          <a
            href="tel:+18165551234"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            <Phone className="h-5 w-5" />
            Call Us Today
          </a>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-white/80 mb-4">
            Want to sell your current home in {name}?
          </p>
          <a
            href="/sell"
            className="inline-flex items-center gap-2 text-[#C9A961] font-semibold hover:text-[#B89A52] transition-colors"
          >
            Get Your Free Home Valuation
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

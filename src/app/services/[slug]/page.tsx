import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getServiceBySlug, getAllServiceSlugs } from '@/data/services';
import { getNeighborhoodBySlug } from '@/data/neighborhoods';
import { ServiceSchema } from '@/components/seo/service-schema';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowRight,
  Check,
  Star,
  Home,
  Users,
  Target,
  Shield,
  TrendingUp,
  MapPin,
  Key,
  Search,
  FileCheck,
  FileText,
  Calendar,
  CheckCircle,
  BookOpen,
  Calculator,
  Building,
  Eye,
  ClipboardCheck,
  Clock,
  PiggyBank,
  ShieldCheck,
  AlertTriangle,
  Clipboard,
  Phone,
  MessageCircle,
  DollarSign,
  Briefcase,
  BarChart,
  Lightbulb,
  Hammer,
  Layers,
  Map,
  Sparkles,
  Megaphone,
  Layout,
  HeartIcon,
  Camera,
  TrendingDown,
} from 'lucide-react';

interface Props {
  params: Promise<{ slug: string }>;
}

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
  users: Users,
  'file-check': FileCheck,
  search: Search,
  'file-text': FileText,
  shield: Shield,
  key: Key,
  home: Home,
  hammer: Hammer,
  camera: Camera,
  calendar: Calendar,
  'trending-up': TrendingUp,
  'check-circle': CheckCircle,
  map: Map,
  star: Star,
  'trending-down': TrendingDown,
  heart: HeartIcon,
  'dollar-sign': DollarSign,
  sparkles: Sparkles,
  target: Target,
  megaphone: Megaphone,
  layout: Layout,
  'shield-check': ShieldCheck,
  check: Check,
  clock: Clock,
  'piggy-bank': PiggyBank,
  'alert-triangle': AlertTriangle,
  clipboard: Clipboard,
  phone: Phone,
  'message-circle': MessageCircle,
  briefcase: Briefcase,
  'book-open': BookOpen,
  calculator: Calculator,
  building: Building,
  'map-pin': MapPin,
  eye: Eye,
  'clipboard-check': ClipboardCheck,
  'bar-chart': BarChart,
  lightbulb: Lightbulb,
  layers: Layers,
};

// Generate static params for all services
export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: 'Service Not Found',
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      type: 'website',
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Get related neighborhoods
  const relatedNeighborhoods = service.relatedNeighborhoods
    ?.map((slug) => getNeighborhoodBySlug(slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* SEO Schema Markup */}
      <ServiceSchema service={service} />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Services', href: '/#services' },
          { label: service.name },
        ]}
      />

      {/* Hero Section */}
      <div className="relative bg-white border-b-4 border-[#C9A961]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23151A4A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-6">
              <span className="font-semibold text-[#C9A961]">{service.name}</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#151A4A] mb-6">
              {service.tagline}
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed mb-8 max-w-3xl mx-auto">
              {service.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={service.primaryCTA.href}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A961] text-white font-bold rounded-xl hover:bg-[#B89A52] hover:scale-105 transition-all shadow-xl"
              >
                {service.primaryCTA.text}
                <ArrowRight className="h-5 w-5" />
              </Link>
              {service.secondaryCTA && (
                <Link
                  href={service.secondaryCTA.href}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#C9A961] text-[#C9A961] font-bold rounded-xl hover:bg-[#C9A961]/5 transition-all"
                >
                  {service.secondaryCTA.text}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {service.stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#C9A961] mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Steps Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#151A4A] mb-4">
              How It <span className="text-[#C9A961]">Works</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto">
              Our proven process makes your real estate journey simple and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.processSteps.map((step) => {
              const Icon = iconMap[step.icon] || Target;
              return (
                <div
                  key={step.number}
                  className="relative p-6 bg-[#F8F6F2] rounded-2xl border-2 border-[#E5E0D8] hover:border-[#C9A961] transition-all group"
                >
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-[#C9A961] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 mt-4">
                    <div className="w-14 h-14 rounded-xl bg-[#C9A961]/10 flex items-center justify-center group-hover:bg-[#C9A961]/20 transition-colors">
                      <Icon className="h-7 w-7 text-[#C9A961]" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-[#151A4A] mb-3">{step.title}</h3>
                  <p className="text-[#4A4A4A] leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-[#F8F6F2] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#151A4A] mb-4">
              Why Choose <span className="text-[#C9A961]">Us</span>
            </h2>
            <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto">
              Experience the KC Family Home Team difference
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.benefits.map((benefit) => {
              const Icon = iconMap[benefit.icon] || Check;
              return (
                <div
                  key={benefit.title}
                  className="p-6 bg-white rounded-2xl border-2 border-[#E5E0D8] hover:border-[#C9A961] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A961]/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-[#C9A961]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#151A4A] mb-2">{benefit.title}</h3>
                  <p className="text-[#4A4A4A]">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      {service.testimonials.length > 0 && (
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-[#151A4A] mb-4">
                Client <span className="text-[#C9A961]">Success Stories</span>
              </h2>
              <p className="text-xl text-[#4A4A4A] max-w-2xl mx-auto">
                Hear from families we&apos;ve helped achieve their real estate goals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {service.testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="p-8 bg-[#F8F6F2] rounded-2xl border-2 border-[#E5E0D8]"
                >
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#C9A961] text-[#C9A961]" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-[#4A4A4A] leading-relaxed mb-6 text-lg">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="border-t-2 border-[#E5E0D8] pt-4">
                    <p className="font-bold text-[#151A4A]">{testimonial.name}</p>
                    <p className="text-sm text-[#4A4A4A]">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FAQs Section */}
      <div className="bg-[#F8F6F2] py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#151A4A] mb-4">
              Frequently Asked <span className="text-[#C9A961]">Questions</span>
            </h2>
            <p className="text-xl text-[#4A4A4A]">Get answers to common questions</p>
          </div>

          <div className="space-y-6">
            {service.faqs.map((faq, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-2xl border-2 border-[#E5E0D8] hover:border-[#C9A961] transition-all"
              >
                <h3 className="text-xl font-bold text-[#151A4A] mb-3">{faq.question}</h3>
                <p className="text-[#4A4A4A] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Neighborhoods */}
      {relatedNeighborhoods && relatedNeighborhoods.length > 0 && (
        <div className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#151A4A] mb-4">
                Explore Kansas City <span className="text-[#C9A961]">Neighborhoods</span>
              </h2>
              <p className="text-lg text-[#4A4A4A]">
                Discover the best neighborhoods for your family
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood!.slug}
                  href={`/neighborhoods/${neighborhood!.slug}`}
                  className="group p-6 bg-[#F8F6F2] rounded-2xl border-2 border-[#E5E0D8] hover:border-[#C9A961] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A961]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A961]/20 transition-colors">
                    <MapPin className="h-6 w-6 text-[#C9A961]" />
                  </div>
                  <h3 className="font-bold text-[#151A4A] mb-2 group-hover:text-[#C9A961] transition-colors">
                    {neighborhood!.name}
                  </h3>
                  <p className="text-sm text-[#4A4A4A] mb-3">{neighborhood!.tagline}</p>
                  <div className="flex items-center gap-1 text-[#C9A961] text-sm font-semibold">
                    Learn More
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Final CTA Section */}
      <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/20 rounded-full mb-6">
            <span className="font-semibold text-[#C9A961]">Ready to Get Started?</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Let&apos;s Make Your
            <span className="block text-[#C9A961]">Real Estate Goals Reality</span>
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Schedule a free consultation with our Kansas City experts today
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A961] text-white font-bold rounded-xl hover:bg-[#B89A52] hover:scale-105 transition-all shadow-xl"
            >
              Schedule Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="tel:+18166163072"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#151A4A] font-bold rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
            >
              Call (816) 616-3072
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

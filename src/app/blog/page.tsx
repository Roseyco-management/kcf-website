import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog-posts';
import { Calendar, Clock, ArrowRight, BookOpen, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kansas City Real Estate Blog | Family Home Buying & Selling Tips',
  description:
    'Expert insights on buying and selling family homes in Kansas City. Neighborhood guides, market updates, and tips for growing families. From the KC Family Home Team.',
  keywords: [
    'Kansas City real estate blog',
    'home buying tips Kansas City',
    'Kansas City neighborhoods',
    'family home advice',
    'KC housing market',
  ],
  openGraph: {
    title: 'Kansas City Real Estate Blog | KC Family Home Team',
    description:
      'Expert insights on Kansas City real estate, neighborhoods, and family home buying.',
  },
};

export default function BlogPage() {
  // Sort by published date, newest first
  const sortedPosts = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Get unique categories
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Hero Section - Redesigned with better contrast */}
      <div className="relative bg-white border-b-4 border-[#C9A961]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23151A4A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-6">
              <BookOpen className="h-5 w-5 text-[#C9A961]" />
              <span className="font-semibold text-[#C9A961]">KC Family Home Team Blog</span>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#151A4A] mb-6">
              Kansas City Real Estate
              <span className="block text-[#C9A961]">Insights</span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-[#4A4A4A] leading-relaxed mb-8 max-w-3xl mx-auto">
              Expert advice on buying, selling, and finding the perfect neighborhood for your family in Kansas City
            </p>

            {/* Category Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {categories.map((category) => (
                <div
                  key={category}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-[#E5E0D8] rounded-full text-sm font-medium text-[#4A4A4A] hover:border-[#C9A961] hover:text-[#C9A961] transition-colors"
                >
                  <Tag className="h-4 w-4" />
                  {category}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Blog Posts Grid - Redesigned */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#151A4A] mb-4">
            Latest Articles
          </h2>
          <p className="text-lg text-[#4A4A4A] max-w-2xl mx-auto">
            Stay informed with our expert insights on Kansas City real estate
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md border-2 border-[#E5E0D8] hover:border-[#C9A961] hover:shadow-2xl transition-all duration-300"
            >
              {/* Featured Image with Overlay */}
              <div className="aspect-video bg-gradient-to-br from-[#151A4A] to-[#1A2158] relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                {/* Category Badge on Image */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1.5 bg-[#C9A961] text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>

                {/* Number Badge */}
                <div className="absolute bottom-4 right-4">
                  <div className="w-12 h-12 rounded-full bg-[#C9A961] flex items-center justify-center text-white font-bold text-lg">
                    {index + 1}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-[#151A4A] mb-3 group-hover:text-[#C9A961] transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-[#4A4A4A] mb-4 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-[#4A4A4A] mb-4 pb-4 border-b border-[#E5E0D8]">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#C9A961]" />
                    <span className="font-medium">{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[#C9A961]" />
                    <span className="font-medium">{post.readTime} min read</span>
                  </div>
                </div>

                {/* Read More Link */}
                <div className="flex items-center justify-between">
                  <span className="text-[#C9A961] font-bold text-sm group-hover:text-[#B89A52] transition-colors">
                    Read Full Article
                  </span>
                  <ArrowRight className="h-5 w-5 text-[#C9A961] group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA Section - Redesigned */}
      <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/20 rounded-full mb-6">
            <span className="font-semibold text-[#C9A961]">Ready to Take Action?</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Find Your Family's
            <span className="block text-[#C9A961]">Perfect Home</span>
          </h2>

          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
            Let our local Kansas City experts guide you through every step of your real estate journey
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A961] text-white font-bold rounded-xl hover:bg-[#B89A52] hover:scale-105 transition-all shadow-xl"
            >
              Schedule a Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/neighborhoods"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#151A4A] font-bold rounded-xl hover:bg-white/90 hover:scale-105 transition-all shadow-xl"
            >
              Explore Neighborhoods
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Home, Search, Mail, ArrowRight, MapPin, FileText, Users } from 'lucide-react';
import { blogPosts } from '@/data/blog-posts';

export default function NotFound() {
  // Get 3 most recent blog posts
  const recentPosts = blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  const popularPages = [
    {
      title: 'Browse Neighborhoods',
      description: 'Explore family-friendly Kansas City neighborhoods',
      href: '/neighborhoods',
      icon: MapPin,
    },
    {
      title: 'Our Services',
      description: 'Home buying and selling services for families',
      href: '/#services',
      icon: FileText,
    },
    {
      title: 'Meet Our Team',
      description: 'Get to know your Kansas City real estate experts',
      href: '/agents',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] flex items-center justify-center px-4 py-16">
      <div className="max-w-4xl w-full">
        {/* Error Message */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#C9A961]/10 mb-6">
            <Search className="h-12 w-12 text-[#C9A961]" />
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-[#151A4A] mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-[#151A4A] mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-[#4A4A4A] max-w-xl mx-auto">
            We couldn&apos;t find the page you&apos;re looking for. It might have been moved, deleted, or the
            URL might be incorrect.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-[#C9A961] text-white font-semibold rounded-xl hover:bg-[#B89A52] transition-all shadow-lg"
          >
            <Home className="h-5 w-5" />
            Go to Homepage
          </Link>
          <Link
            href="/contact"
            className="flex items-center justify-center gap-2 px-6 py-4 bg-white border-2 border-[#C9A961] text-[#C9A961] font-semibold rounded-xl hover:bg-[#C9A961]/5 transition-all"
          >
            <Mail className="h-5 w-5" />
            Contact Us
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-[#151A4A] mb-6 text-center">
            Popular Pages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {popularPages.map((page) => {
              const Icon = page.icon;
              return (
                <Link
                  key={page.href}
                  href={page.href}
                  className="group p-6 bg-white rounded-xl border-2 border-[#E5E0D8] hover:border-[#C9A961] hover:shadow-lg transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#C9A961]/10 flex items-center justify-center mb-4 group-hover:bg-[#C9A961]/20 transition-colors">
                    <Icon className="h-6 w-6 text-[#C9A961]" />
                  </div>
                  <h4 className="font-bold text-[#151A4A] mb-2 group-hover:text-[#C9A961] transition-colors">
                    {page.title}
                  </h4>
                  <p className="text-sm text-[#4A4A4A] mb-3">{page.description}</p>
                  <div className="flex items-center gap-1 text-[#C9A961] text-sm font-semibold">
                    Visit Page
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div>
          <h3 className="text-xl font-bold text-[#151A4A] mb-6 text-center">
            Latest Articles
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group p-4 bg-white rounded-xl border-2 border-[#E5E0D8] hover:border-[#C9A961] hover:shadow-lg transition-all"
              >
                <span className="inline-block px-2 py-1 bg-[#C9A961]/10 text-[#C9A961] text-xs font-semibold rounded-full mb-3">
                  {post.category}
                </span>
                <h4 className="font-bold text-[#151A4A] mb-2 group-hover:text-[#C9A961] transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-[#4A4A4A] mb-3 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-[#C9A961] text-sm font-semibold">
                  Read Article
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <div className="mt-12 text-center">
          <p className="text-sm text-[#4A4A4A]">
            Still can&apos;t find what you&apos;re looking for?{' '}
            <Link href="/contact" className="text-[#C9A961] font-semibold hover:underline">
              Contact our team
            </Link>{' '}
            and we&apos;ll be happy to help!
          </p>
        </div>
      </div>
    </div>
  );
}

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug, getAllBlogSlugs, blogPosts } from '@/data/blog-posts';
import { getNeighborhoodBySlug } from '@/data/neighborhoods';
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { RelatedServices } from '@/components/blog/related-services';
import { RelatedPosts } from '@/components/blog/related-posts';
import { Breadcrumbs } from '@/components/ui/breadcrumbs';
import { SocialShare } from '@/components/blog/social-share';

interface Props {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.tags,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  // Get related neighborhoods
  const relatedNeighborhoods = post.relatedNeighborhoods
    ?.map((slug) => getNeighborhoodBySlug(slug))
    .filter(Boolean);

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Article Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            image: post.featuredImage,
            datePublished: post.publishedAt,
            dateModified: post.updatedAt || post.publishedAt,
            author: {
              '@type': 'Organization',
              name: post.author.name,
            },
            publisher: {
              '@type': 'Organization',
              name: 'KC Family Home Team',
              logo: {
                '@type': 'ImageObject',
                url: 'https://www.kcfhomes.com/logo.png',
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `https://www.kcfhomes.com/blog/${post.slug}`,
            },
            keywords: post.tags.join(', '),
          }),
        }}
      />

      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.kcfhomes.com',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Blog',
                item: 'https://www.kcfhomes.com/blog',
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: post.title,
                item: `https://www.kcfhomes.com/blog/${post.slug}`,
              },
            ],
          }),
        }}
      />

      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: 'Blog', href: '/blog' },
          { label: post.title },
        ]}
      />

      {/* Header */}
      <div className="bg-white border-b border-[#E5E0D8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[#4A4A4A] hover:text-[#151A4A] transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>

          {/* Category Badge */}
          <div className="inline-block px-3 py-1 bg-[#C9A961]/10 text-[#C9A961] text-sm font-semibold rounded-full mb-4">
            {post.category}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-[#151A4A] mb-6">{post.title}</h1>

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-[#4A4A4A] mb-6">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Social Share */}
          <SocialShare
            title={post.title}
            url={`https://www.kcfhomes.com/blog/${post.slug}`}
            description={post.excerpt}
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              h2: ({ children }) => (
                <h2 className="text-3xl font-bold text-[#151A4A] mt-12 mb-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-2xl font-bold text-[#151A4A] mt-8 mb-4">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-lg text-[#4A4A4A] leading-relaxed mb-6">{children}</p>
              ),
              a: ({ href, children }) => {
                if (!href) return <span>{children}</span>;
                const isInternal = href.startsWith('/');
                return isInternal ? (
                  <Link
                    href={href}
                    className="text-[#C9A961] font-semibold hover:text-[#B89A52] transition-colors"
                  >
                    {children}
                  </Link>
                ) : (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C9A961] font-semibold hover:text-[#B89A52] transition-colors"
                  >
                    {children}
                  </a>
                );
              },
              ul: ({ children }) => <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>,
              li: ({ children }) => <li className="text-lg text-[#4A4A4A]">{children}</li>,
              strong: ({ children }) => <strong className="font-bold text-[#151A4A]">{children}</strong>,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      {/* Related Services */}
      {post.relatedServices && post.relatedServices.length > 0 && (
        <RelatedServices serviceSlugs={post.relatedServices} />
      )}

      {/* Related Neighborhoods */}
      {relatedNeighborhoods && relatedNeighborhoods.length > 0 && (
        <div className="bg-white border-t border-[#E5E0D8] py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-[#151A4A] mb-6">Explore These Neighborhoods</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedNeighborhoods.map((neighborhood) => (
                <Link
                  key={neighborhood!.slug}
                  href={`/neighborhoods/${neighborhood!.slug}`}
                  className="group p-4 bg-[#F8F6F2] rounded-lg hover:bg-[#C9A961]/10 transition-colors"
                >
                  <h3 className="font-bold text-[#151A4A] mb-1 group-hover:text-[#C9A961] transition-colors">
                    {neighborhood!.name}
                  </h3>
                  <p className="text-sm text-[#4A4A4A] mb-2">{neighborhood!.tagline}</p>
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

      {/* Related Blog Posts */}
      <RelatedPosts currentPost={post} allPosts={blogPosts} />

      {/* CTA Section */}
      <div className="bg-gradient-to-br from-[#151A4A] to-[#0F1238] py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make Your Move?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Our Kansas City real estate experts are here to help you find the perfect home for your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C9A961] text-white font-semibold rounded-lg hover:bg-[#B89A52] transition-colors"
            >
              Schedule a Free Consultation
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/neighborhoods"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
            >
              Browse Neighborhoods
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

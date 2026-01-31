import { MetadataRoute } from 'next';
import { getAllNeighborhoodSlugs } from '@/data/neighborhoods';
import { getAllServiceSlugs } from '@/data/services';
import { createClient } from '@supabase/supabase-js';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.kcfhomes.com';

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/agents`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  // Blog index page
  const blogIndex = {
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  };

  // Dynamic blog posts - fetch from Supabase
  let blogPages: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at, published_at');

    if (!error && posts) {
      blogPages = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.updated_at || post.published_at,
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    }
  } catch (error) {
    // Gracefully handle errors - return empty array for blog posts
    console.error('Error fetching blog posts for sitemap:', error);
  }

  // Neighborhoods index page
  const neighborhoodsIndex = {
    url: `${baseUrl}/neighborhoods`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  };

  // Dynamic neighborhood pages
  const neighborhoodSlugs = getAllNeighborhoodSlugs();
  const neighborhoodPages = neighborhoodSlugs.map((slug) => ({
    url: `${baseUrl}/neighborhoods/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic service pages
  const serviceSlugs = getAllServiceSlugs();
  const servicePages = serviceSlugs.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }));

  return [
    ...staticPages,
    blogIndex,
    ...blogPages,
    neighborhoodsIndex,
    ...neighborhoodPages,
    ...servicePages,
  ];
}

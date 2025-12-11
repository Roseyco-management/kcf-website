export type BlogCategory = 'Neighborhood Guides' | 'Buying Guides' | 'Selling Guides' | 'Market Insights';

export interface BlogAuthor {
  name: string;
  role: string;
  image?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readTime: number; // in minutes
  featuredImage: string;
  featuredImageAlt: string;
  tags: string[];

  // SEO
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;

  // Internal links
  relatedNeighborhoods?: string[]; // slugs
  relatedPosts?: string[]; // slugs
  relatedServices?: string[]; // slugs
}

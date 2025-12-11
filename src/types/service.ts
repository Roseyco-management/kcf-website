export interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}

export interface Benefit {
  title: string;
  description: string;
  icon: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

export interface ServicePage {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  heroSubtitle: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  keywords: string[];

  // Content sections
  processSteps: ProcessStep[];
  benefits: Benefit[];
  faqs: FAQ[];
  testimonials: Testimonial[];

  // Stats
  stats: {
    label: string;
    value: string;
  }[];

  // Related content
  relatedNeighborhoods?: string[];
  relatedBlogPosts?: string[];

  // CTA customization
  primaryCTA: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
}

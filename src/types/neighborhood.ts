export interface School {
  name: string;
  type: 'Elementary' | 'Middle' | 'High';
  rating: number; // out of 10
  district: string;
}

export interface Amenity {
  name: string;
  type: 'Park' | 'Library' | 'Pool' | 'Community Center' | 'Playground' | 'Shopping' | 'Restaurant';
  description?: string;
}

export interface NeighborhoodStats {
  medianPrice: number;
  avgDaysOnMarket: number;
  population?: number;
  walkabilityScore?: number;
}

export interface LocalInsight {
  title: string;
  description: string;
  category: 'Restaurant' | 'Shopping' | 'Event' | 'Activity' | 'Hidden Gem';
}

export interface Neighborhood {
  // Basic Info
  name: string;
  slug: string;
  tagline: string;
  description: string;

  // SEO
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  keywordDifficulty: number;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';

  // Hero
  heroImage: string;
  heroImageAlt: string;

  // Overview
  whyFamiliesLoveIt: string[];

  // Schools
  schools: School[];

  // Amenities
  parks: Amenity[];
  otherAmenities: Amenity[];

  // Stats
  stats: NeighborhoodStats;

  // Local Insights
  insights: LocalInsight[];

  // Location
  city: string;
  state: string;
  county?: string;
}

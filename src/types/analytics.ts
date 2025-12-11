// Analytics TypeScript Types for KC Family Home Team Dashboard

export interface AnalyticsPeriod {
  from: string; // ISO date
  to: string;   // ISO date
}

export interface Metric {
  current: number;
  previous: number;
  change: number; // percentage
}

export interface DailyDataPoint {
  date: string; // YYYY-MM-DD
  visits?: number;
  leads?: number;
  pageViews?: number;
  conversions?: number;
  clicks?: number;
  impressions?: number;
}

export interface AnalyticsOverview {
  totalVisits: Metric;
  totalLeads: Metric;
  conversionRate: Metric;
  avgSessionDuration: Metric; // in seconds
  dailyData: DailyDataPoint[];
}

export interface TopPage {
  path: string;
  title: string;
  views: number;
  change?: number;
}

export interface GoogleAnalytics {
  configured: boolean;
  measurementId: string;
  sessions: Metric;
  users: Metric;
  bounceRate: Metric;
  topPages: TopPage[];
}

export interface MetaPixel {
  configured: boolean;
  pixelId: string;
  pageViews: Metric;
  conversions: Metric;
  conversionRate: Metric;
  events: {
    [key: string]: number;
  };
}

export interface MicrosoftClarity {
  configured: boolean;
  projectId: string;
  sessions: Metric;
  recordings: Metric;
  heatmaps: Metric;
}

export interface GoogleSearchConsole {
  configured: boolean;
  clicks: Metric;
  impressions: Metric;
  ctr: Metric;
  avgPosition: Metric;
  dailyData: {
    date: string;
    clicks: number;
    impressions: number;
  }[];
  topQueries?: {
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }[];
}

export interface GoogleAds {
  configured: boolean;
  cost: Metric;
  clicks: Metric;
  conversions: Metric;
  conversionValue: Metric;
  ctr: Metric;
  cpc: Metric;
  roas: Metric;
  dailyData?: {
    date: string;
    cost: number;
    clicks: number;
    conversions: number;
  }[];
}

export interface RecentLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  type: 'buyer' | 'seller';
  timeAgo: string;
  createdAt: string;
}

export interface AnalyticsDashboard {
  period: AnalyticsPeriod;
  overview: AnalyticsOverview;
  ga4: GoogleAnalytics;
  meta: MetaPixel;
  clarity: MicrosoftClarity;
  gsc: GoogleSearchConsole | null;
  googleAds: GoogleAds | null;
  recentLeads: RecentLead[];
}

// Chart Data Types
export interface ChartDataPoint {
  date: string;
  [key: string]: string | number;
}

export interface ChartLine {
  key: string;
  color: string;
  name: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  change: number;
  changeLabel?: string;
  sparklineData?: number[];
  detailedData?: ChartDataPoint[];
  icon: React.ReactNode;
  tooltip: string;
  color?: 'navy' | 'gold' | 'green' | 'orange' | 'purple';
}

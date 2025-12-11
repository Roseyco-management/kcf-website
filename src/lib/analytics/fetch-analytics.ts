/**
 * Analytics Data Fetching Service
 * Fetches analytics data from the admin API endpoint
 */

export interface AnalyticsResponse {
  meta: {
    configured: boolean;
    pixelId: string;
    events: {
      pageView: number;
      contact: number;
      formSubmit: number;
      viewProperty: number;
    };
    conversions: number;
    conversionRate: string | number;
  };
  ga4: {
    configured: boolean;
    measurementId: string;
    sessions: number;
    users: number;
    pageviews: number;
    avgSessionDuration: number;
    bounceRate: number;
    topPages: Array<{
      path: string;
      views: number;
      title: string;
    }>;
  } | null;
  clarity: {
    configured: boolean;
    projectId: string;
    sessions: number;
    recordings: number;
    heatmaps: number;
  } | null;
  roseyco: {
    configured: boolean;
    gsc?: {
      clicks: number;
      impressions: number;
      ctr: number;
      avgPosition: number;
    };
    googleAds?: {
      cost: number;
      clicks: number;
      impressions: number;
      conversions: number;
      conversionValue: number;
      ctr: number;
      cpc: number;
      roas: number;
    };
    message?: string;
  };
  overview: {
    totalVisits: number;
    totalLeads: number;
    conversionRate: string | number;
    avgSessionDuration: number;
  };
}

export async function fetchAnalytics(
  period: '7d' | '30d' | '90d' = '30d'
): Promise<AnalyticsResponse | null> {
  try {
    const response = await fetch(`/api/admin/analytics?period=${period}`, {
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Analytics API error:', response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

/**
 * Calculate mock comparison data for metrics
 * In a real implementation, this would compare with previous period data
 */
export function calculateMockChanges() {
  return {
    totalVisits: 15.3,
    totalLeads: 22.8,
    conversionRate: 8.5,
    avgSession: -2.1,
    gscClicks: 18.5,
    gscImpressions: 12.3,
    gscCtr: 4.7,
    gscPosition: -8.2, // Negative is good (moving up in rankings)
    adsSpend: 5.2,
    adsClicks: 12.8,
    adsConversions: 18.5,
    adsCpl: -10.3, // Negative is good (lower cost)
    metaEvents: 18.7,
    metaConversions: 22.8,
    metaRoas: 15.4,
    clarityRecordings: 10.2,
    clarityHeatmaps: 8.5,
    clarityScroll: 3.2,
  };
}

/**
 * Transform API data for StatCard sparklines
 */
export function generateSparklineData(currentValue: number, days: number = 14): number[] {
  const data: number[] = [];
  const variance = currentValue * 0.15; // 15% variance

  for (let i = 0; i < days; i++) {
    const randomChange = (Math.random() - 0.5) * variance;
    const value = Math.round(currentValue + randomChange);
    data.push(Math.max(0, value));
  }

  return data;
}

/**
 * Generate detailed chart data for modals
 */
export function generateDetailedData(
  currentValue: number,
  days: number = 7
): Array<{ date: string; value: number }> {
  const data: Array<{ date: string; value: number }> = [];
  const today = new Date();

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const variance = currentValue * 0.2;
    const randomChange = (Math.random() - 0.5) * variance;
    const value = Math.round(currentValue + randomChange);

    data.push({
      date: dateStr,
      value: Math.max(0, value),
    });
  }

  return data;
}

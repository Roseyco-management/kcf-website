/**
 * RoseyCo Analytics API Client
 * Fetches SEO and analytics data from RoseyCo Analytics platform
 */

const ROSEYCO_API_KEY = process.env.ROSEYCO_API_KEY;
const ROSEYCO_CLIENT_SLUG = process.env.ROSEYCO_CLIENT_SLUG || "kcf";
const ROSEYCO_API_BASE_URL = "https://analytics.roseyco.co.uk";

export interface RoseyCoAnalyticsData {
  client: {
    id: string;
    name: string;
    slug: string;
  };
  period: {
    start: string;
    end: string;
  };
  summary: {
    gsc: {
      clicks: number;
      impressions: number;
      ctr: number;
      avgPosition: number;
    } | null;
    ga4: {
      sessions: number;
      users: number;
      newUsers: number;
      pageViews: number;
      organicSessions: number;
      bounceRate: number;
      avgSessionDuration: number;
    } | null;
    googleAds: {
      cost: number;
      clicks: number;
      impressions: number;
      conversions: number;
      conversionValue: number;
      ctr: number;
      cpc: number;
      roas: number;
    } | null;
    clarity: {
      sessionCount: number;
      totalPageViews: number;
    } | null;
  };
}

export async function getRoseyCoAnalytics(
  period: "7d" | "30d" | "90d" = "30d"
): Promise<RoseyCoAnalyticsData | null> {
  if (!ROSEYCO_API_KEY) {
    console.warn("RoseyCo Analytics not configured");
    return null;
  }

  try {
    // Calculate date range
    const endDate = new Date().toISOString().split("T")[0];
    const startDate = new Date();

    switch (period) {
      case "7d":
        startDate.setDate(startDate.getDate() - 7);
        break;
      case "30d":
        startDate.setDate(startDate.getDate() - 30);
        break;
      case "90d":
        startDate.setDate(startDate.getDate() - 90);
        break;
    }

    const start = startDate.toISOString().split("T")[0];

    // Build API URL with query parameters
    const url = `${ROSEYCO_API_BASE_URL}/api/clients/${ROSEYCO_CLIENT_SLUG}/analytics?apiKey=${ROSEYCO_API_KEY}&startDate=${start}&endDate=${endDate}`;

    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("RoseyCo API error:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching RoseyCo analytics:", error);
    return null;
  }
}


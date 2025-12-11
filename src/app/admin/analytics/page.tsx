import { Metadata } from "next";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  BarChart3,
  Activity,
  CheckCircle,
  XCircle,
  Search,
  Link as LinkIcon,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Analytics | Admin Dashboard",
  description: "Website and marketing analytics",
};

// Helper function to safely format numbers
function safeNumber(value: any, defaultValue: number = 0): number {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) ? num : defaultValue;
}

async function getAnalytics() {
  try {
    // Use relative URL for server-side fetch
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/admin/analytics?period=30d`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch analytics:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return null;
  }
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

  if (!analytics) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
        <div className="rounded-xl bg-red-50 border border-red-200 p-6">
          <p className="text-red-800">Failed to load analytics data. Please try again later.</p>
        </div>
      </div>
    );
  }

  const { overview, meta, ga4, clarity, roseyco } = analytics;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive view of your website performance and SEO metrics
          </p>
        </div>
        <select className="rounded-lg border border-gray-200 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="7d">Last 7 Days</option>
          <option value="30d" selected>Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Visits</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {safeNumber(overview.totalVisits).toLocaleString()}
              </p>
            </div>
            <div className="rounded-xl bg-blue-50 p-3">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Leads</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {safeNumber(overview.totalLeads)}
              </p>
            </div>
            <div className="rounded-xl bg-green-50 p-3">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {safeNumber(overview.conversionRate).toFixed(1)}%
              </p>
            </div>
            <div className="rounded-xl bg-purple-50 p-3">
              <Activity className="h-6 w-6 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg. Session</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {Math.floor(safeNumber(overview.avgSessionDuration) / 60)}m {safeNumber(overview.avgSessionDuration) % 60}s
              </p>
            </div>
            <div className="rounded-xl bg-orange-50 p-3">
              <BarChart3 className="h-6 w-6 text-orange-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Google Analytics Top Pages */}
      {ga4.configured && ga4.topPages && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Top Pages</h2>
            <div className="space-y-4">
              {ga4.topPages.map((page: any, index: number) => (
                <div key={page.path} className="flex items-center gap-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{page.title}</p>
                    <p className="text-xs text-gray-500">{page.path}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-gray-900">
                      {safeNumber(page.views).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta CAPI Events */}
          {meta.configured && (
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="mb-6 text-xl font-semibold text-gray-900">Meta CAPI Events</h2>
              <div className="space-y-4">
                {Object.entries(meta.events).map(([event, count]: [string, any]) => (
                  <div key={event} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-900 capitalize">
                      {event.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      {safeNumber(count).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Google Search Console (via RoseyCo) */}
      {roseyco.configured && roseyco.gsc && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Google Search Console
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {safeNumber(roseyco.gsc.clicks).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Impressions</p>
              <p className="text-2xl font-bold text-gray-900">
                {safeNumber(roseyco.gsc.impressions).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Click-Through Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {(safeNumber(roseyco.gsc.ctr) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg. Position</p>
              <p className="text-2xl font-bold text-gray-900">
                {safeNumber(roseyco.gsc.avgPosition).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Google Ads (via RoseyCo) */}
      {roseyco.configured && roseyco.googleAds && (
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Google Ads Performance
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ad Spend</p>
              <p className="text-2xl font-bold text-gray-900">
                ${safeNumber(roseyco.googleAds.cost).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Clicks</p>
              <p className="text-2xl font-bold text-gray-900">
                {safeNumber(roseyco.googleAds.clicks).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Conversions</p>
              <p className="text-2xl font-bold text-gray-900">
                {safeNumber(roseyco.googleAds.conversions).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Est. Value</p>
              <p className="text-2xl font-bold text-gray-900">
                ${safeNumber(roseyco.googleAds.conversionValue).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div>
              <p className="text-sm text-gray-600 mb-1">CTR</p>
              <p className="text-lg font-semibold text-gray-900">
                {(safeNumber(roseyco.googleAds.ctr) * 100).toFixed(1)}%
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Cost per Click</p>
              <p className="text-lg font-semibold text-gray-900">
                ${safeNumber(roseyco.googleAds.cpc).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">ROAS</p>
              <p className="text-lg font-semibold text-gray-900">
                {safeNumber(roseyco.googleAds.roas).toFixed(2)}x
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Configuration Notice */}
      {!roseyco.configured && (
        <div className="rounded-xl border-2 border-orange-200 bg-orange-50 p-6">
          <h3 className="font-semibold text-orange-900 mb-2">
            RoseyCo Analytics Configuration Required
          </h3>
          <p className="text-sm text-orange-800 mb-4">
            To display analytics from RoseyCo Analytics (Google Search Console, Google Ads, GA4, Clarity), add the following to your .env.local file:
          </p>
          <div className="bg-white rounded-lg p-4 font-mono text-xs">
            <p>ROSEYCO_API_KEY=rca_your-api-key-here</p>
            <p>ROSEYCO_CLIENT_SLUG=kcf</p>
          </div>
          <p className="text-sm text-orange-800 mt-4">
            Contact RoseyCo to get your API key for the KCF client.
          </p>
        </div>
      )}
    </div>
  );
}

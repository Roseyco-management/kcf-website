import { Metadata } from "next";
import {
  TrendingUp,
  Users,
  Eye,
  MousePointerClick,
  BarChart3,
  Activity,
  Search,
  ArrowUp,
  ArrowDown,
  Globe,
  Target,
  Zap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Analytics Dashboard | KC Family Home Team",
  description: "Comprehensive analytics for KC Family Home Team",
};

// Helper function to safely format numbers
function safeNumber(value: any, defaultValue: number = 0): number {
  const num = Number(value);
  return !isNaN(num) && isFinite(num) ? num : defaultValue;
}

async function getAnalytics() {
  try {
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

export default async function AnalyticsDashboardPage() {
  const analytics = await getAnalytics();

  if (!analytics) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="rounded-xl bg-red-50 border border-red-200 p-6 max-w-md">
          <p className="text-red-800 text-center">
            Failed to load analytics data. Please check your connection and try again.
          </p>
        </div>
      </div>
    );
  }

  const { overview, meta, ga4, clarity, roseyco } = analytics;

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Comprehensive view of your website performance and marketing metrics
        </p>
      </div>

      {/* Key Performance Metrics - Hero Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Visits */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
                <ArrowUp className="h-4 w-4" />
                +12%
              </div>
            </div>
            <p className="text-white/90 text-sm font-medium mb-1">Total Visits</p>
            <p className="text-4xl font-bold text-white">
              {safeNumber(overview.totalVisits).toLocaleString()}
            </p>
            <p className="text-white/70 text-xs mt-2">Last 30 days</p>
          </div>
        </div>

        {/* Total Leads */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
                <ArrowUp className="h-4 w-4" />
                +23%
              </div>
            </div>
            <p className="text-white/90 text-sm font-medium mb-1">Total Leads</p>
            <p className="text-4xl font-bold text-white">
              {safeNumber(overview.totalLeads)}
            </p>
            <p className="text-white/70 text-xs mt-2">New submissions</p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
                <ArrowUp className="h-4 w-4" />
                +8%
              </div>
            </div>
            <p className="text-white/90 text-sm font-medium mb-1">Conversion Rate</p>
            <p className="text-4xl font-bold text-white">
              {safeNumber(overview.conversionRate).toFixed(1)}%
            </p>
            <p className="text-white/70 text-xs mt-2">Visits to leads</p>
          </div>
        </div>

        {/* Avg Session */}
        <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10"></div>
          <div className="relative">
            <div className="flex items-center justify-between mb-4">
              <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="flex items-center gap-1 text-white/90 text-sm font-medium">
                <ArrowUp className="h-4 w-4" />
                +5%
              </div>
            </div>
            <p className="text-white/90 text-sm font-medium mb-1">Avg. Session</p>
            <p className="text-4xl font-bold text-white">
              {Math.floor(safeNumber(overview.avgSessionDuration) / 60)}m {safeNumber(overview.avgSessionDuration) % 60}s
            </p>
            <p className="text-white/70 text-xs mt-2">Time on site</p>
          </div>
        </div>
      </div>

      {/* Platform Analytics Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Google Analytics */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-blue-50 p-3">
              <Globe className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Google Analytics</h3>
              <p className="text-xs text-gray-500">{ga4?.measurementId || 'Not configured'}</p>
            </div>
          </div>
          {ga4?.configured ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sessions</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(ga4.sessions).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Users</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(ga4.users).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Bounce Rate</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(ga4.bounceRate).toFixed(1)}%
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Analytics not configured</p>
          )}
        </div>

        {/* Meta Pixel */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-indigo-50 p-3">
              <Target className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Meta Pixel</h3>
              <p className="text-xs text-gray-500">{meta?.pixelId || 'Not configured'}</p>
            </div>
          </div>
          {meta?.configured ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Page Views</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(meta.events?.pageView).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Conversions</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(meta.conversions)}
                </span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">CVR</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(meta.conversionRate).toFixed(1)}%
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Meta Pixel not configured</p>
          )}
        </div>

        {/* Microsoft Clarity */}
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-xl bg-purple-50 p-3">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">MS Clarity</h3>
              <p className="text-xs text-gray-500">{clarity?.projectId || 'Not configured'}</p>
            </div>
          </div>
          {clarity?.configured ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Sessions</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(clarity.sessions).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Recordings</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(clarity.recordings).toLocaleString()}
                </span>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Heatmaps</span>
                <span className="text-lg font-bold text-gray-900">
                  {safeNumber(clarity.heatmaps)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-sm text-gray-500">Clarity not configured</p>
          )}
        </div>
      </div>

      {/* Top Pages & Events */}
      {ga4?.configured && ga4.topPages && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Top Pages */}
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <h2 className="mb-6 text-xl font-semibold text-gray-900 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              Top Performing Pages
            </h2>
            <div className="space-y-4">
              {ga4.topPages.map((page: any, index: number) => (
                <div key={page.path} className="flex items-center gap-4 group hover:bg-gray-50 rounded-lg p-3 -mx-3 transition-colors">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-sm font-bold text-white shadow-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{page.title}</p>
                    <p className="text-xs text-gray-500 truncate">{page.path}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {safeNumber(page.views).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">views</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meta CAPI Events */}
          {meta?.configured && (
            <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
              <h2 className="mb-6 text-xl font-semibold text-gray-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-indigo-600" />
                Meta Pixel Events
              </h2>
              <div className="space-y-4">
                {Object.entries(meta.events || {}).map(([event, count]: [string, any]) => (
                  <div key={event} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-indigo-600"></div>
                      <span className="text-sm font-medium text-gray-900 capitalize">
                        {event.replace(/([A-Z])/g, " $1").trim()}
                      </span>
                    </div>
                    <span className="text-lg font-bold text-gray-900">
                      {safeNumber(count).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Google Search Console */}
      {roseyco?.configured && roseyco.gsc && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Search className="h-5 w-5 text-blue-600" />
            Google Search Console
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <p className="text-sm text-blue-700 font-medium mb-2">Total Clicks</p>
              <p className="text-3xl font-bold text-blue-900">
                {safeNumber(roseyco.gsc.clicks).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <p className="text-sm text-purple-700 font-medium mb-2">Impressions</p>
              <p className="text-3xl font-bold text-purple-900">
                {safeNumber(roseyco.gsc.impressions).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <p className="text-sm text-green-700 font-medium mb-2">CTR</p>
              <p className="text-3xl font-bold text-green-900">
                {(safeNumber(roseyco.gsc.ctr) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <p className="text-sm text-orange-700 font-medium mb-2">Avg. Position</p>
              <p className="text-3xl font-bold text-orange-900">
                {safeNumber(roseyco.gsc.avgPosition).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Google Ads Performance */}
      {roseyco?.configured && roseyco.googleAds && (
        <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
          <h2 className="mb-6 text-xl font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Google Ads Performance
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
              <p className="text-sm text-gray-600 font-medium mb-2">Ad Spend</p>
              <p className="text-3xl font-bold text-gray-900">
                ${safeNumber(roseyco.googleAds.cost).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <p className="text-sm text-blue-700 font-medium mb-2">Clicks</p>
              <p className="text-3xl font-bold text-blue-900">
                {safeNumber(roseyco.googleAds.clicks).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <p className="text-sm text-green-700 font-medium mb-2">Conversions</p>
              <p className="text-3xl font-bold text-green-900">
                {safeNumber(roseyco.googleAds.conversions).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <p className="text-sm text-purple-700 font-medium mb-2">Est. Value</p>
              <p className="text-3xl font-bold text-purple-900">
                ${safeNumber(roseyco.googleAds.conversionValue).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">CTR</p>
              <p className="text-2xl font-bold text-gray-900">
                {(safeNumber(roseyco.googleAds.ctr) * 100).toFixed(1)}%
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Cost per Click</p>
              <p className="text-2xl font-bold text-gray-900">
                ${safeNumber(roseyco.googleAds.cpc).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">ROAS</p>
              <p className="text-2xl font-bold text-gray-900">
                {safeNumber(roseyco.googleAds.roas).toFixed(2)}x
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

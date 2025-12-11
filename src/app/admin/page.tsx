import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Users,
  BarChart3,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard | KC Family Home Team",
  description: "KC Family Home Team admin dashboard",
};

// Fetch stats from API
async function getStats() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/admin/stats`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch stats:", response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching stats:", error);
    return null;
  }
}

// Recent Activity
const recentActivity = [
  {
    id: 1,
    type: "deal",
    message: "New buyer questionnaire submitted",
    time: "5 minutes ago",
    icon: <CheckCircle className="h-5 w-5 text-green-500" />,
  },
  {
    id: 2,
    type: "lead",
    message: "John Smith requested property viewing",
    time: "1 hour ago",
    icon: <Users className="h-5 w-5 text-blue-500" />,
  },
  {
    id: 3,
    type: "task",
    message: "Property photos uploaded for 123 Main St",
    time: "2 hours ago",
    icon: <FileText className="h-5 w-5 text-accent" />,
  },
  {
    id: 4,
    type: "alert",
    message: "Contract deadline approaching for Oak Street property",
    time: "3 hours ago",
    icon: <AlertCircle className="h-5 w-5 text-red-500" />,
  },
];

export default async function AdminDashboardPage() {
  const statsData = await getStats();

  // Format numbers with commas
  const formatNumber = (num: number) => num.toLocaleString();
  const formatCurrency = (num: number) => `$${(num / 1000000).toFixed(1)}M`;

  const stats = statsData
    ? [
        {
          title: "Active Deals",
          value: formatNumber(statsData.active),
          change: `+${formatNumber(statsData.thisWeek)} this week`,
          icon: <FileText className="h-8 w-8 text-accent" />,
          trend: "up",
        },
        {
          title: "New Leads",
          value: formatNumber(statsData.newLeads),
          change: `${formatNumber(statsData.thisMonth)} this month`,
          icon: <Users className="h-8 w-8 text-blue-500" />,
          trend: "up",
        },
        {
          title: "Pipeline Value",
          value: formatCurrency(statsData.pipelineValue),
          change: `${formatNumber(statsData.total)} total deals`,
          icon: <BarChart3 className="h-8 w-8 text-green-500" />,
          trend: "up",
        },
        {
          title: "Closed Deals",
          value: formatNumber(statsData.closed),
          change: `${((statsData.closed / statsData.total) * 100).toFixed(1)}% conversion`,
          icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
          trend: "up",
        },
      ]
    : [
        {
          title: "Active Deals",
          value: "—",
          change: "Loading...",
          icon: <FileText className="h-8 w-8 text-accent" />,
          trend: "up",
        },
        {
          title: "New Leads",
          value: "—",
          change: "Loading...",
          icon: <Users className="h-8 w-8 text-blue-500" />,
          trend: "up",
        },
        {
          title: "Pipeline Value",
          value: "—",
          change: "Loading...",
          icon: <BarChart3 className="h-8 w-8 text-green-500" />,
          trend: "up",
        },
        {
          title: "Closed Deals",
          value: "—",
          change: "Loading...",
          icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
          trend: "up",
        },
      ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Welcome back! Here's your overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm text-gray-500">{stat.change}</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-3">{stat.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <Link
              href="/admin/activity"
              className="text-sm font-medium text-primary hover:text-primary/80"
            >
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-4 rounded-lg border border-gray-100 p-4 hover:bg-gray-50 transition-colors"
              >
                <div className="rounded-lg bg-gray-100 p-2">{activity.icon}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.message}
                  </p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-gray-900">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/admin/deals/new"
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <FileText className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-900">New Deal</span>
            </Link>
            <Link
              href="/admin/leads"
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <Users className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-900">View Leads</span>
            </Link>
            <Link
              href="/admin/analytics"
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <BarChart3 className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-900">Analytics</span>
            </Link>
            <Link
              href="/admin/files"
              className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-200 p-6 hover:border-primary hover:bg-primary/5 transition-all"
            >
              <FileText className="h-8 w-8 text-primary mb-2" />
              <span className="text-sm font-medium text-gray-900">Files</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Info Banner */}
      <div className="rounded-2xl bg-primary p-6 text-white shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">Need help getting started?</h3>
            <p className="mt-1 text-white/80">
              Check out our guide to learn how to manage your deals, leads, and analytics.
            </p>
          </div>
          <Link
            href="/admin/help"
            className="rounded-lg bg-white px-6 py-3 font-semibold text-primary hover:bg-gray-100 transition-colors"
          >
            View Guide
          </Link>
        </div>
      </div>
    </div>
  );
}

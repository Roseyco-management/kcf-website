import { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";
import { DealsTable } from "@/components/admin/deals-table";

export const metadata: Metadata = {
  title: "Deals | Admin Dashboard",
  description: "Manage real estate deals and transactions",
};

// Fetch deals from API
async function getDeals() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/admin/deals?page=1&pageSize=50`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch deals:", response.statusText);
      return { deals: [], total: 0 };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching deals:", error);
    return { deals: [], total: 0 };
  }
}

// Fetch stats
async function getStats() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/admin/stats`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    return null;
  }
}

export default async function DealsPage() {
  const { deals } = await getDeals();
  const stats = await getStats();
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Deals</h1>
          <p className="mt-2 text-gray-600">Manage your real estate transactions</p>
        </div>
        <Link
          href="/admin/deals/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Deal
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Active Deals</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.active || 0}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Pending</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.pending || 0}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Closed</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            {stats?.closed || 0}
          </p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Pipeline Value</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">
            ${((stats?.pipelineValue || 0) / 1000000).toFixed(1)}M
          </p>
        </div>
      </div>

      {/* Deals Table with Search & Filters */}
      <DealsTable initialDeals={deals} />
    </div>
  );
}

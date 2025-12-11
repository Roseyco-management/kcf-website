import { Metadata } from "next";
import { LeadsGrid } from "@/components/admin/leads-grid";

export const metadata: Metadata = {
  title: "Leads | Admin Dashboard",
};

// Fetch leads from API
async function getLeads() {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/admin/leads?page=1&pageSize=50`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch leads:", response.statusText);
      return { leads: [], total: 0 };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching leads:", error);
    return { leads: [], total: 0 };
  }
}

export default async function LeadsPage() {
  const { leads, total } = await getLeads();

  // Calculate stats
  const buyerLeads = leads.filter((l: any) => l.formType === "buyer").length;
  const sellerLeads = leads.filter((l: any) => l.formType === "seller").length;
  const thisWeek = leads.filter((l: any) => {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    return new Date(l.createdAt) > weekAgo;
  }).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Leads</h1>
          <p className="mt-2 text-gray-600">Manage and track your real estate leads</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Leads</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{total}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Buyer Leads</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{buyerLeads}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Seller Leads</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{sellerLeads}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">This Week</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{thisWeek}</p>
        </div>
      </div>

      {/* Leads Grid with Search & Filters */}
      <LeadsGrid initialLeads={leads} />
    </div>
  );
}

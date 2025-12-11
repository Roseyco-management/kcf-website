"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Filter, FileText } from "lucide-react";

const statusColors: Record<string, string> = {
  new_lead: "bg-gray-100 text-gray-700",
  pending_intake: "bg-yellow-100 text-yellow-700",
  intake_in_progress: "bg-blue-100 text-blue-700",
  intake_complete: "bg-green-100 text-green-700",
  pricing_in_progress: "bg-purple-100 text-purple-700",
  pricing_complete: "bg-purple-100 text-purple-700",
  awaiting_approval: "bg-orange-100 text-orange-700",
  approved: "bg-green-100 text-green-700",
  contract_phase: "bg-blue-100 text-blue-700",
  closed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
  archived: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, string> = {
  new_lead: "New Lead",
  pending_intake: "Pending Intake",
  intake_in_progress: "In Progress",
  intake_complete: "Intake Complete",
  pricing_in_progress: "Pricing",
  pricing_complete: "Pricing Complete",
  awaiting_approval: "Awaiting Approval",
  approved: "Approved",
  contract_phase: "Under Contract",
  closed: "Closed",
  cancelled: "Cancelled",
  archived: "Archived",
};

function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins} minutes ago`;
  if (diffHours < 24) return `${diffHours} hours ago`;
  return `${diffDays} days ago`;
}

interface DealsTableProps {
  initialDeals: any[];
}

export function DealsTable({ initialDeals }: DealsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredDeals = useMemo(() => {
    return initialDeals.filter((deal) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        deal.fullName?.toLowerCase().includes(searchLower) ||
        deal.email?.toLowerCase().includes(searchLower) ||
        deal.propertyAddress?.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus = statusFilter === "all" || deal.status === statusFilter;

      // Type filter
      const matchesType = typeFilter === "all" || deal.dealType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [initialDeals, searchQuery, statusFilter, typeFilter]);

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-none bg-transparent text-sm focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Types</option>
            <option value="buyer">Buyer</option>
            <option value="seller">Seller</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="all">All Statuses</option>
            <option value="new_lead">New Lead</option>
            <option value="pending_intake">Pending</option>
            <option value="intake_in_progress">In Progress</option>
            <option value="contract_phase">Under Contract</option>
            <option value="closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredDeals.length} of {initialDeals.length} deals
      </div>

      {/* Table */}
      <div className="rounded-xl bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Property
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Client
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Stage
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Value
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Updated
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredDeals.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                    No deals found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredDeals.map((deal: any) => (
                  <tr
                    key={deal.id}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Link href={`/admin/deals/${deal.id}`} className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {deal.propertyAddress || "No address provided"}
                          </p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/deals/${deal.id}`} className="text-sm text-gray-600 hover:text-gray-900">
                        {deal.fullName}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 capitalize">
                        {deal.dealType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {statusLabels[deal.status] || deal.status}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      {deal.askingPrice || deal.priceRangeMax || "—"}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${
                          statusColors[deal.status] || statusColors.new_lead
                        }`}
                      >
                        {statusLabels[deal.status] || deal.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {formatTimeAgo(deal.updatedAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

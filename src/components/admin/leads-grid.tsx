"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Users, Mail, Phone, MapPin, Calendar } from "lucide-react";

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

interface LeadsGridProps {
  initialLeads: any[];
}

export function LeadsGrid({ initialLeads }: LeadsGridProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredLeads = useMemo(() => {
    return initialLeads.filter((lead) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        !searchQuery ||
        lead.fullName?.toLowerCase().includes(searchLower) ||
        lead.email?.toLowerCase().includes(searchLower) ||
        lead.phone?.toLowerCase().includes(searchLower) ||
        lead.propertyAddress?.toLowerCase().includes(searchLower);

      // Type filter
      const matchesType = typeFilter === "all" || lead.formType === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [initialLeads, searchQuery, typeFilter]);

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-white p-4 shadow-sm">
        <div className="flex flex-1 items-center gap-2">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
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
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredLeads.length} of {initialLeads.length} leads
      </div>

      {/* Leads Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {filteredLeads.length === 0 ? (
          <div className="col-span-2 rounded-2xl border-2 border-dashed border-gray-200 p-12 text-center">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No leads found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          filteredLeads.map((lead: any) => (
            <Link
              key={lead.id}
              href={`/admin/leads/${lead.id}`}
              className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{lead.fullName}</h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {lead.formType} Lead
                    </p>
                  </div>
                </div>
                <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 capitalize">
                  {lead.status}
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span className="hover:text-primary transition-colors">
                    {lead.email}
                  </span>
                </div>
                {lead.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span className="hover:text-primary transition-colors">
                      {lead.phone}
                    </span>
                  </div>
                )}
                {lead.propertyAddress && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{lead.propertyAddress}</span>
                  </div>
                )}
                {lead.moveTimeline && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>Move timeline: {lead.moveTimeline}</span>
                  </div>
                )}
              </div>

              {(lead.askingPrice || lead.priceRangeMax) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    {lead.formType === "seller" ? "Asking Price" : "Price Range"}:{" "}
                    <span className="font-semibold text-gray-900">
                      {lead.askingPrice || lead.priceRangeMax}
                    </span>
                  </p>
                </div>
              )}

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>Created {formatTimeAgo(lead.createdAt)}</span>
                <span className="text-primary hover:text-primary/80 font-medium">
                  View Details →
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

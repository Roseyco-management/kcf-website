import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  User,
  FileText,
  MessageSquare,
} from "lucide-react";
import { DealNotes } from "@/components/admin/deal-notes";

export const metadata: Metadata = {
  title: "Deal Details | Admin Dashboard",
};

async function getDeal(id: string) {
  try {
    const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";
    const response = await fetch(`${baseUrl}/api/admin/deals/${id}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.deal;
  } catch (error) {
    console.error("Error fetching deal:", error);
    return null;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function DealDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const deal = await getDeal(params.id);

  if (!deal) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/deals"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Deals
      </Link>

      {/* Header */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {deal.full_name || "Unknown Client"}
            </h1>
            <p className="mt-1 text-lg text-gray-600 capitalize">
              {deal.form_type} Deal
            </p>
          </div>
          <div className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 capitalize">
            {deal.transaction?.status || "New Lead"}
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                  <Mail className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <a
                    href={`mailto:${deal.email}`}
                    className="text-gray-900 hover:text-primary"
                  >
                    {deal.email}
                  </a>
                </div>
              </div>

              {deal.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a
                      href={`tel:${deal.phone}`}
                      className="text-gray-900 hover:text-primary"
                    >
                      {deal.phone}
                    </a>
                  </div>
                </div>
              )}

              {deal.property_address && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Property Address</p>
                    <p className="text-gray-900">{deal.property_address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Deal Details */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Deal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {deal.asking_price && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {deal.form_type === "seller" ? "Asking Price" : "Budget"}
                    </p>
                    <p className="font-semibold text-gray-900">{deal.asking_price}</p>
                  </div>
                </div>
              )}

              {(deal.price_range_min || deal.price_range_max) && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price Range</p>
                    <p className="font-semibold text-gray-900">
                      {deal.price_range_min} - {deal.price_range_max}
                    </p>
                  </div>
                </div>
              )}

              {deal.move_timeline && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Move Timeline</p>
                    <p className="font-semibold text-gray-900">{deal.move_timeline}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Calendar className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Created</p>
                  <p className="font-semibold text-gray-900">
                    {formatDate(deal.created_at)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Notes & Activity
            </h2>
            <DealNotes dealId={params.id} initialNotes={deal.notes || []} />
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Assigned Agents */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Assigned Agents
            </h3>
            {deal.agents && deal.agents.length > 0 ? (
              <div className="space-y-3">
                {deal.agents.map((agent: any) => (
                  <div
                    key={agent.id}
                    className="flex items-center gap-3 p-3 rounded-lg border border-gray-100"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                      <User className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{agent.full_name}</p>
                      {agent.isPrimary && (
                        <span className="text-xs text-primary">Primary Agent</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">No agents assigned</p>
            )}
          </div>

          {/* Quick Actions */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${deal.email}`}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
              {deal.phone && (
                <a
                  href={`tel:${deal.phone}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call Client
                </a>
              )}
              <button className="w-full flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
                <FileText className="h-4 w-4" />
                View Documents
              </button>
            </div>
          </div>

          {/* Integration Status */}
          {deal.dotloop_loop_url && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Integrations
              </h3>
              <a
                href={deal.dotloop_loop_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <span>View in DotLoop</span>
                <span className="text-xs text-green-600">✓ Connected</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

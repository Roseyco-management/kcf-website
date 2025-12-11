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
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Lead Details | Admin Dashboard",
};

async function getLead(id: string) {
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
    console.error("Error fetching lead:", error);
    return null;
  }
}

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function LeadDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const lead = await getLead(params.id);

  if (!lead) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        href="/admin/leads"
        className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Leads
      </Link>

      {/* Header */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {lead.full_name || "Unknown Client"}
            </h1>
            <p className="mt-1 text-lg text-gray-600 capitalize">
              {lead.form_type} Lead
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Submitted {formatDate(lead.created_at)}
            </p>
          </div>
          <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 capitalize">
            New Lead
          </span>
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
                    href={`mailto:${lead.email}`}
                    className="text-gray-900 hover:text-primary font-medium"
                  >
                    {lead.email}
                  </a>
                </div>
              </div>

              {lead.phone && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <Phone className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <a
                      href={`tel:${lead.phone}`}
                      className="text-gray-900 hover:text-primary font-medium"
                    >
                      {lead.phone}
                    </a>
                  </div>
                </div>
              )}

              {lead.property_address && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
                    <MapPin className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {lead.form_type === "seller"
                        ? "Property Address"
                        : "Interested Area"}
                    </p>
                    <p className="text-gray-900">{lead.property_address}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Lead Preferences */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {lead.form_type === "seller" ? "Selling" : "Buying"} Preferences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {lead.asking_price && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      {lead.form_type === "seller" ? "Asking Price" : "Budget"}
                    </p>
                    <p className="font-semibold text-gray-900">{lead.asking_price}</p>
                  </div>
                </div>
              )}

              {(lead.price_range_min || lead.price_range_max) && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                    <DollarSign className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Price Range</p>
                    <p className="font-semibold text-gray-900">
                      {lead.price_range_min} - {lead.price_range_max}
                    </p>
                  </div>
                </div>
              )}

              {lead.move_timeline && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Move Timeline</p>
                    <p className="font-semibold text-gray-900">{lead.move_timeline}</p>
                  </div>
                </div>
              )}

              {lead.how_heard && (
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                    <FileText className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">How They Found Us</p>
                    <p className="font-semibold text-gray-900">{lead.how_heard}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Additional Information */}
          {lead.form_type === "seller" && (
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Property Details
              </h2>
              <div className="space-y-3">
                {lead.property_type && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Property Type:</span>
                    <span className="font-medium text-gray-900">{lead.property_type}</span>
                  </div>
                )}
                {lead.bedrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bedrooms:</span>
                    <span className="font-medium text-gray-900">{lead.bedrooms}</span>
                  </div>
                )}
                {lead.bathrooms && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Bathrooms:</span>
                    <span className="font-medium text-gray-900">{lead.bathrooms}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Right Column - Actions */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Send Email
              </a>
              {lead.phone && (
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  Call Lead
                </a>
              )}
              <button className="w-full flex items-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors">
                <FileText className="h-4 w-4" />
                Convert to Deal
              </button>
            </div>
          </div>

          {/* Lead Source */}
          <div className="rounded-xl bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Lead Source</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Source:</span>
                <span className="font-medium text-gray-900">
                  Website Form ({lead.form_type})
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Submitted:</span>
                <span className="font-medium text-gray-900">
                  {new Date(lead.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

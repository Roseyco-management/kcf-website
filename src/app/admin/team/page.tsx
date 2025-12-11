import { Metadata } from "next";
import { Users, Mail, Phone, User, Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Team | Admin Dashboard",
};

async function getTeam() {
  try {
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

    const response = await fetch(`${baseUrl}/api/admin/team`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return { agents: [] };
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching team:", error);
    return { agents: [] };
  }
}

export default async function TeamPage() {
  const { agents } = await getTeam();

  const activeAgents = agents.filter((a: any) => a.is_active);
  const inactiveAgents = agents.filter((a: any) => !a.is_active);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team</h1>
          <p className="mt-2 text-gray-600">Manage your real estate team members</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90 transition-colors">
          <Plus className="h-5 w-5" />
          Add Team Member
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Total Members</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{agents.length}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Active</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{activeAgents.length}</p>
        </div>
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm font-medium text-gray-600">Inactive</p>
          <p className="mt-2 text-3xl font-bold text-gray-900">{inactiveAgents.length}</p>
        </div>
      </div>

      {/* Active Team Members */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Active Team Members</h2>
        {activeAgents.length === 0 ? (
          <div className="text-center py-12">
            <Users className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <p className="text-gray-600">No active team members</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeAgents.map((agent: any) => (
              <div
                key={agent.id}
                className="rounded-lg border border-gray-200 p-6 hover:border-primary hover:shadow-md transition-all"
              >
                {/* Avatar */}
                <div className="flex items-center gap-4 mb-4">
                  {agent.avatar_url ? (
                    <img
                      src={agent.avatar_url}
                      alt={agent.full_name}
                      className="h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <User className="h-8 w-8 text-primary" />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-900">{agent.full_name}</h3>
                    <p className="text-sm text-gray-600">{agent.role || "Agent"}</p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-2">
                  {agent.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4" />
                      <a
                        href={`mailto:${agent.email}`}
                        className="hover:text-primary transition-colors truncate"
                      >
                        {agent.email}
                      </a>
                    </div>
                  )}
                  {agent.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4" />
                      <a
                        href={`tel:${agent.phone}`}
                        className="hover:text-primary transition-colors"
                      >
                        {agent.phone}
                      </a>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                  <button className="flex-1 text-sm text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors">
                    View Profile
                  </button>
                  <button className="flex-1 text-sm text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg transition-colors">
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Inactive Team Members (if any) */}
      {inactiveAgents.length > 0 && (
        <div className="rounded-xl bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Inactive Team Members</h2>
          <div className="space-y-3">
            {inactiveAgents.map((agent: any) => (
              <div
                key={agent.id}
                className="flex items-center justify-between p-4 rounded-lg border border-gray-200 bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{agent.full_name}</p>
                    <p className="text-sm text-gray-500">{agent.email}</p>
                  </div>
                </div>
                <button className="text-sm text-primary hover:text-primary/80 font-medium">
                  Reactivate
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

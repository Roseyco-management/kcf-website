"use client";

import { AdminHeader } from "@/components/admin/admin-header";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: {
    email: string;
    id: string;
  } | null;
}

export function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <AdminHeader user={user} />

      {/* Page Content - Full Width */}
      <main className="p-6 max-w-[1600px] mx-auto">{children}</main>
    </div>
  );
}

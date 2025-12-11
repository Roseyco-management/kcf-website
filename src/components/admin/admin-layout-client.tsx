"use client";

import { useSidebar } from "@/context/sidebar-context";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { Backdrop } from "@/components/admin/backdrop";

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: {
    email: string;
    id: string;
  } | null;
}

export function AdminLayoutClient({ children, user }: AdminLayoutClientProps) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic margin for main content based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[280px]"
      : "lg:ml-[80px]";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar and Backdrop */}
      <AdminSidebar />
      <Backdrop />

      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AdminHeader user={user} />

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

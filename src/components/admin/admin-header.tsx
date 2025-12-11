"use client";

import React from "react";
import { Menu, Bell } from "lucide-react";
import { useSidebar } from "@/context/sidebar-context";
import { UserMenu } from "./user-menu";

interface AdminHeaderProps {
  user: {
    email: string;
    id: string;
  } | null;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const { toggleSidebar, toggleMobileSidebar } = useSidebar();

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left Side - Menu Toggle */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMobileSidebar}
          className="rounded-lg p-2 hover:bg-gray-100 lg:hidden"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Desktop Sidebar Toggle */}
        <button
          onClick={toggleSidebar}
          className="hidden rounded-lg p-2 hover:bg-gray-100 lg:block"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-6 w-6 text-gray-600" />
        </button>

        {/* Page Title */}
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          className="relative rounded-lg p-2 hover:bg-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-6 w-6 text-gray-600" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User Menu */}
        <UserMenu user={user} />
      </div>
    </header>
  );
}

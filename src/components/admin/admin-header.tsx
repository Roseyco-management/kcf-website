"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bell } from "lucide-react";
import { UserMenu } from "./user-menu";

interface AdminHeaderProps {
  user: {
    email: string;
    id: string;
  } | null;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white px-6">
      {/* Left Side - Logo & Title */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <div className="relative w-36 h-10 bg-white rounded-lg p-1.5">
            <Image
              src="/photopea/Untitled design-6.png"
              alt="KC Family Home Team"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
        <div className="h-6 w-px bg-gray-300 hidden md:block"></div>
        <h1 className="text-xl font-semibold text-gray-900 hidden md:block">Analytics Dashboard</h1>
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

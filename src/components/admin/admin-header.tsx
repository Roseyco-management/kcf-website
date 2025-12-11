"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { UserMenu } from "./user-menu";

interface AdminHeaderProps {
  user: {
    email?: string;
    id: string;
  } | null;
}

export function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-[#E5E0D8] bg-white px-6 shadow-sm">
      {/* Left Side - Logo & Title */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center">
          <div className="relative w-48 h-16">
            <Image
              src="/logos/KC Analytics Hub Logo Transparent BG.png"
              alt="KC Analytics Hub"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>
      </div>

      {/* Right Side - Actions */}
      <div className="flex items-center gap-4">
        {/* User Menu */}
        <UserMenu user={user} />
      </div>
    </header>
  );
}

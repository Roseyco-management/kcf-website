"use client";

import { usePathname } from "next/navigation";
import { AdminLayoutClient } from "@/components/admin/admin-layout-client";

interface ConditionalAdminLayoutProps {
  children: React.ReactNode;
  user: {
    email: string;
    id: string;
  } | null;
}

export function ConditionalAdminLayout({ children, user }: ConditionalAdminLayoutProps) {
  const pathname = usePathname();

  // Don't show sidebar/header on login page
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
}

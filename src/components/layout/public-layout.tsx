"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Don't show public header/footer on admin routes
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <SmoothScrollProvider>
      <Header />
      <main>{children}</main>
      <Footer />
    </SmoothScrollProvider>
  );
}

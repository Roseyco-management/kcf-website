"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { captureAttribution } from "@/lib/attribution";
import { installContactClickTracking } from "@/lib/contact-click";

export function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Capture UTM/click-id attribution once per session, on first page load,
  // so a visitor who lands elsewhere and later submits the contact form
  // still carries their attribution. Feeds the RCA lead mirror.
  useEffect(() => {
    captureAttribution();
  }, []);

  // Fire a GA4 contact_click event on any phone/WhatsApp/email/SMS tap.
  // Guards against double-install via window.__rcContactClick.
  useEffect(() => {
    installContactClickTracking();
  }, []);

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

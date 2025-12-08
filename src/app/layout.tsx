import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "KC Family Home Team | Kansas City Real Estate Experts",
    template: "%s | KC Family Home Team",
  },
  description:
    "Empowering growing families with personalized, stress-free home buying and selling in Kansas City. Trust our expertise and commitment to your family's journey.",
  keywords: [
    "Kansas City real estate",
    "KC homes for sale",
    "Kansas City realtors",
    "buy home Kansas City",
    "sell home Kansas City",
    "KC Family Home Team",
    "Kansas City metro homes",
    "family-friendly realtors",
    "stress-free home buying",
  ],
  authors: [{ name: "KC Family Home Team" }],
  creator: "KC Family Home Team",
  publisher: "KC Family Home Team",
  metadataBase: new URL("https://kcfhomes.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kcfhomes.com",
    siteName: "KC Family Home Team",
    title: "KC Family Home Team | Kansas City Real Estate Experts",
    description:
      "Empowering growing families with personalized, stress-free home buying and selling in Kansas City.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KC Family Home Team - Kansas City Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KC Family Home Team | Kansas City Real Estate Experts",
    description:
      "Empowering growing families with personalized, stress-free home buying in Kansas City.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        <SmoothScrollProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

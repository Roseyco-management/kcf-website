import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { Partytown } from "@qwik.dev/partytown/react";
import "./globals.css";
import { PublicLayout } from "@/components/layout/public-layout";
import { OrganizationSchema } from "@/components/seo/organization-schema";

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
    default: "Kansas City Family Home Team | Buy & Sell Homes for Families",
    template: "%s | KC Family Home Team",
  },
  description:
    "Find your perfect family home in Kansas City. Expert real estate agents specializing in family-friendly neighborhoods, top schools, and growing families. Free home search & consultation.",
  keywords: [
    "Kansas City family homes",
    "homes for sale Kansas City families",
    "Kansas City family real estate",
    "family friendly neighborhoods Kansas City",
    "Kansas City homes near good schools",
    "buy family home Kansas City",
    "sell family home Kansas City",
    "upsizing home Kansas City",
    "Kansas City realtors families",
    "Overland Park homes",
    "Lee's Summit homes",
    "Brookside Kansas City",
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
    title: "Kansas City Family Home Team | Buy & Sell Homes for Families",
    description:
      "Find your perfect family home in Kansas City. Expert agents specializing in family-friendly neighborhoods, top schools, and growing families.",
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
    title: "Kansas City Family Home Team | Buy & Sell Homes for Families",
    description:
      "Find your perfect family home in Kansas City. Expert agents specializing in family-friendly neighborhoods and top schools.",
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
  icons: {
    icon: [
      { url: '/icon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased">
        {/* Organization Schema */}
        <OrganizationSchema />

        <Partytown
          debug={process.env.NODE_ENV === 'development'}
          forward={['dataLayer.push', 'gtag', 'fbq', 'clarity']}
        />

        {/* Meta Pixel Code */}
        <script type="text/partytown" dangerouslySetInnerHTML={{ __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '1520686439196434');
          fbq('track', 'PageView');
        `}} />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1520686439196434&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Analytics */}
        <script type="text/partytown" src="https://www.googletagmanager.com/gtag/js?id=G-RH9LPW46VV" />
        <script type="text/partytown" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-RH9LPW46VV');
        `}} />

        {/* Microsoft Clarity */}
        <script type="text/partytown" dangerouslySetInnerHTML={{ __html: `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "ujsyihkbft");
        `}} />

        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}

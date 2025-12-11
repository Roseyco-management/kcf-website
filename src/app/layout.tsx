import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { PublicLayout } from "@/components/layout/public-layout";

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
        {/* Meta Pixel Code */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
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
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1520686439196434&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {/* End Meta Pixel Code */}

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-RH9LPW46VV"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-RH9LPW46VV');
            `,
          }}
        />
        {/* End Google Analytics */}

        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "ujsyihkbft");
            `,
          }}
        />
        {/* End Microsoft Clarity */}

        <PublicLayout>{children}</PublicLayout>
      </body>
    </html>
  );
}

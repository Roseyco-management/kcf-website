import { Metadata } from "next";
import Link from "next/link";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export const metadata: Metadata = {
  title: "Cookie Policy | KC Family Home Team",
  description: "Which cookies and tracking tools the KC Family Home Team website uses and how to opt out.",
  alternates: { canonical: "/cookie-policy" },
};

export default function CookiePolicyPage() {
  return (
    <main className="pt-32">
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: September 2026</p>

          <div className="prose prose-lg max-w-none">
            <p>
              Cookies are small files stored on your device when you visit a website. We use them to understand how our
              website is used and to measure our advertising.
            </p>

            <h2>Tools we use</h2>
            <ul>
              <li>
                <strong>Google Analytics</strong> (cookies <code>_ga</code>, <code>_ga_*</code>, up to 2 years): counts
                visits and shows which pages are used.
              </li>
              <li>
                <strong>Meta Pixel</strong> (cookie <code>_fbp</code>, 90 days): measures our Facebook and Instagram
                adverts and helps us show relevant ads to people who have visited the site.
              </li>
              <li>
                <strong>Microsoft Clarity</strong> (cookies <code>_clck</code>, <code>_clsk</code>, up to 1 year):
                records how pages are scrolled and clicked so we can improve them.
              </li>
            </ul>
            <p>The staff login area also uses a strictly necessary sign-in cookie, set only when a team member logs in.</p>

            <h2>How to opt out</h2>
            <ul>
              <li>Block or delete cookies in your browser settings; the website still works without them.</li>
              <li>
                Install Google&apos;s{" "}
                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                  Analytics opt-out add-on
                </a>
                .
              </li>
              <li>
                Manage ad preferences in your{" "}
                <a href="https://www.facebook.com/adpreferences" target="_blank" rel="noopener noreferrer">
                  Facebook ad settings
                </a>
                .
              </li>
            </ul>

            <h2>More information</h2>
            <p>
              See our <Link href="/privacy">Privacy Policy</Link>, or email admin@kcfhomes.com.
            </p>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

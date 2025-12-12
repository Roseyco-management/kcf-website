import { Metadata } from "next";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export const metadata: Metadata = {
  title: "Terms of Service | KC Family Home Team",
  description: "Terms of Service for KC Family Home Team website and services.",
};

export default function TermsPage() {
  return (
    <main className="pt-32">
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <p>
              These Terms govern your use of the KC Family Home Team website. By using the site, you agree to these Terms. If you do not agree, do not use the site.
            </p>

            <h2>1. Limitations of Use</h2>
            <p>
              You agree not to use the website for illegal purposes, modify its content, attempt unauthorized access, use automated devices to collect data, or post harassing material.
            </p>

            <h2>2. Intellectual Property</h2>
            <p>
              Materials on this site are owned or licensed by KC Family Home Team and protected by law. A limited license is granted for personal, non-commercial viewing.
            </p>

            <h2>3. Accuracy of Materials</h2>
            <p>
              Website information is for general purposes and may change. We do not guarantee accuracy, and you should verify information independently.
            </p>

            <h2>4. Third-Party Links</h2>
            <p>
              We are not responsible for the content or practices of linked third-party websites. Use linked sites at your own risk.
            </p>

            <h2>5. Disclaimers and Limitation of Liability</h2>
            <p>
              The website is provided &quot;as-is&quot;. We disclaim all warranties and are not liable for damages from using or being unable to use the site.
            </p>

            <h2>6. Governing Law</h2>
            <p>
              These Terms are governed by Kansas law, and disputes will be resolved in Kansas courts.
            </p>

            <h2>7. Termination</h2>
            <p>
              We may terminate your site use for any breach of these Terms.
            </p>

            <h2>8. Changes to the Terms</h2>
            <p>
              These Terms may be amended, with changes posted here. Continued use after changes means you accept the new Terms.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              For questions, contact KC Family Home Team via:
            </p>
            <ul>
              <li>Email: admin@kcfhomes.com</li>
              <li>Phone: (816) 616-3072</li>
              <li>Address: Kansas City, MO</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

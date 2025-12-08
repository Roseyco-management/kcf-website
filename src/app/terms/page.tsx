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
            <h2>Agreement to Terms</h2>
            <p>
              By accessing or using the KC Family Home Team website and services, you agree
              to be bound by these Terms of Service. If you do not agree to these terms,
              please do not use our website or services.
            </p>

            <h2>Services Description</h2>
            <p>
              KC Family Home Team provides real estate brokerage services in the Kansas City
              metropolitan area. Our services include, but are not limited to:
            </p>
            <ul>
              <li>Buyer representation</li>
              <li>Seller representation and listing services</li>
              <li>Market analysis and property valuations</li>
              <li>Transaction coordination</li>
              <li>Real estate consultation</li>
            </ul>

            <h2>Brokerage Relationship</h2>
            <p>
              KC Family Home Team operates under United Real Estate Kansas City. All real
              estate services are provided through licensed real estate agents affiliated
              with our brokerage. Formal representation requires a signed agreement.
            </p>

            <h2>Website Use</h2>
            <h3>Permitted Use</h3>
            <p>You may use our website for:</p>
            <ul>
              <li>Viewing information about our services</li>
              <li>Contacting us about real estate needs</li>
              <li>Submitting questionnaires and inquiry forms</li>
              <li>Accessing resources we provide</li>
            </ul>

            <h3>Prohibited Use</h3>
            <p>You may not:</p>
            <ul>
              <li>Use the website for any unlawful purpose</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the website</li>
              <li>Copy, reproduce, or distribute our content without permission</li>
              <li>Use automated systems to access or scrape our website</li>
            </ul>

            <h2>Property Information</h2>
            <p>
              Property information displayed on our website is believed to be accurate but
              is not guaranteed. We obtain information from various sources including MLS
              databases, public records, and property owners. You should independently
              verify all property information before making decisions.
            </p>

            <h2>No Guarantee of Results</h2>
            <p>
              While we strive to provide excellent service, we cannot guarantee specific
              outcomes in real estate transactions. Market conditions, property conditions,
              and numerous other factors affect the buying and selling process. Past
              performance is not indicative of future results.
            </p>

            <h2>Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos, images, and
              software, is the property of KC Family Home Team or its content suppliers
              and is protected by copyright and trademark laws. You may not use our
              intellectual property without written permission.
            </p>

            <h2>User Submissions</h2>
            <p>
              When you submit information through our website (such as contact forms or
              questionnaires), you grant us the right to use that information to provide
              our services. You represent that any information you submit is accurate
              and complete.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. These links are
              provided for convenience only. We do not endorse or control these websites
              and are not responsible for their content or practices.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, KC Family Home Team and its agents
              shall not be liable for any indirect, incidental, special, consequential,
              or punitive damages arising from your use of our website or services.
            </p>

            <h2>Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless KC Family Home Team, its agents,
              and affiliates from any claims, damages, or expenses arising from your
              violation of these terms or your use of our services.
            </p>

            <h2>Dispute Resolution</h2>
            <p>
              Any disputes arising from these terms or our services shall be resolved
              through good faith negotiation. If negotiation fails, disputes shall be
              subject to mediation or arbitration in Kansas City, Missouri, in accordance
              with applicable real estate regulations.
            </p>

            <h2>Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be
              effective when posted on this page. Your continued use of our website
              after changes constitutes acceptance of the modified terms.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of the State of Missouri and applicable
              federal laws. Any legal action shall be brought in the courts of Jackson
              County, Missouri.
            </p>

            <h2>Severability</h2>
            <p>
              If any provision of these terms is found to be unenforceable, the remaining
              provisions shall continue in full force and effect.
            </p>

            <h2>Contact Information</h2>
            <p>
              For questions about these Terms of Service, please contact us:
            </p>
            <ul>
              <li>Email: admin@kcfhomes.com</li>
              <li>Phone: (816) 575-7763</li>
              <li>Address: Kansas City, MO</li>
            </ul>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

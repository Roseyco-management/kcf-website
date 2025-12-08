import { Metadata } from "next";
import { SectionWrapper } from "@/components/sections/section-wrapper";

export const metadata: Metadata = {
  title: "Privacy Policy | KC Family Home Team",
  description: "Privacy Policy for KC Family Home Team. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <main className="pt-32">
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">
            Last updated: December 2024
          </p>

          <div className="prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              KC Family Home Team (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
              committed to protecting your personal information. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when you visit
              our website or use our services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number, mailing address)</li>
              <li>Property information related to buying or selling</li>
              <li>Financial information necessary for real estate transactions</li>
              <li>Communication preferences</li>
              <li>Information provided through forms, questionnaires, or direct communication</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>
              When you visit our website, we may automatically collect certain information, including:
            </p>
            <ul>
              <li>Device information (browser type, operating system)</li>
              <li>IP address and general location</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide real estate services and facilitate transactions</li>
              <li>Communicate with you about properties, services, and updates</li>
              <li>Respond to your inquiries and requests</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>We may share your information with:</p>
            <ul>
              <li>Service providers who assist in our operations (title companies, lenders, inspectors)</li>
              <li>Other parties involved in your real estate transaction</li>
              <li>United Real Estate Kansas City (our brokerage)</li>
              <li>Legal and regulatory authorities when required by law</li>
            </ul>
            <p>
              We do not sell your personal information to third parties for their marketing purposes.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the Internet is 100%
              secure, and we cannot guarantee absolute security.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information (subject to legal requirements)</li>
              <li>Opt out of marketing communications</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your
              experience. You can control cookies through your browser settings. Disabling
              cookies may affect the functionality of our website.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible
              for the privacy practices of these websites. We encourage you to review their
              privacy policies.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under 18 years of age. We do not
              knowingly collect personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of
              any material changes by posting the new policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our privacy practices,
              please contact us at:
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

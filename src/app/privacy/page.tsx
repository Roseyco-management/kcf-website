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
            <h2>Information We Collect</h2>
            <p>
              We may collect personal information directly from you when you interact with our website. This can include:
            </p>
            <ul>
              <li><strong>Contact Information:</strong> Name, email address, phone number, and mailing address.</li>
              <li><strong>Property Information:</strong> Details about your property search, saved listings, property inquiries, or home value requests.</li>
              <li><strong>Communication Data:</strong> Records of any correspondence with us, such as emails, phone calls, or form submissions.</li>
              <li><strong>Technical Data:</strong> Information collected automatically from your device, such as your IP address, browser type, operating system, and website usage data through cookies and similar technologies.</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use your information for the following purposes:</p>
            <ul>
              <li><strong>To Provide Services:</strong> To respond to your inquiries, schedule property viewings, process your requests for information, and provide real estate services.</li>
              <li><strong>For Communication:</strong> To send you relevant information, including newsletters, market updates, and new listing alerts. You can opt-out of these communications at any time.</li>
              <li><strong>To Improve Our Website:</strong> To analyze website usage and user behavior to improve the functionality and design of our website.</li>
              <li><strong>For Legal Compliance:</strong> To comply with applicable laws and regulations, including industry standards from the Multiple Listing Service (MLS).</li>
            </ul>

            <h2>How We Share Your Information</h2>
            <p>
              Your personal information is not sold, traded, or rented to third parties for marketing purposes.
              We may share your information with service providers assisting our business operations, such as hosting,
              CRM, and analytics providers. Information may also be disclosed to comply with legal requirements or in
              the event of a business transfer like a merger or acquisition.
            </p>

            <h2>Data Security</h2>
            <p>
              We employ security measures to protect your personal information, but no online transmission or
              storage is completely secure.
            </p>

            <h2>Your Choices and Rights</h2>
            <p>
              You have rights regarding your personal data, including requesting access to or correction of your
              information and opting out of marketing communications. You may also request data deletion, subject
              to legal obligations.
            </p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for individuals under 18. We do not knowingly collect data from children.
            </p>

            <h2>Third-Party Links</h2>
            <p>
              Our website may contain links to third-party sites, but this policy does not apply to them.
            </p>

            <h2>Updates to this Policy</h2>
            <p>
              This policy may be updated, with changes posted here and the &quot;Effective Date&quot; revised.
              Continued use means you accept the updates.
            </p>

            <h2>Contact Us</h2>
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

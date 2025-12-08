import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { ContactForm } from "@/components/sections/contact-form";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | KC Family Home Team",
  description: "Get in touch with KC Family Home Team. We're here to answer your questions and help you start your real estate journey in Kansas City.",
};

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    description: "Call us directly",
    value: "+1 (816) 575-7763",
    href: "tel:+18165757763",
  },
  {
    icon: Mail,
    title: "Email",
    description: "Send us a message",
    value: "admin@kcfhomes.com",
    href: "mailto:admin@kcfhomes.com",
  },
  {
    icon: MapPin,
    title: "Service Area",
    description: "Kansas City Metro",
    value: "Kansas City, MO & KS",
    href: null,
  },
  {
    icon: Clock,
    title: "Response Time",
    description: "We respond fast",
    value: "Within 2 Hours",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        badge="Get In Touch"
        title="We'd Love to Hear From You"
        highlightedWord="Hear"
        description="Whether you have questions, need advice, or are ready to start your real estate journey, our team is here to help. Reach out today!"
        centered
      />

      {/* Contact Section */}
      <SectionWrapper background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <div>
            <SectionHeader
              badge="Send a Message"
              title="How Can We Help?"
              highlightedWord="Help"
              centered={false}
            />
            <p className="text-muted-foreground mb-8">
              Fill out the form below and we&apos;ll get back to you within 2 hours
              during business hours. For immediate assistance, give us a call.
            </p>
            <ContactForm variant="default" />
          </div>

          {/* Contact Info */}
          <div>
            <SectionHeader
              badge="Contact Info"
              title="Other Ways to Reach Us"
              highlightedWord="Reach"
              centered={false}
            />
            <div className="space-y-6 mb-8">
              {contactInfo.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-4 bg-cream rounded-xl"
                >
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-foreground mb-1">
                      {item.description}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-primary font-medium hover:text-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-primary font-medium">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="bg-primary rounded-2xl p-8 text-white">
              <h3 className="text-xl font-semibold mb-4 text-gold-light">Not Sure Where to Start?</h3>
              <p className="text-white/80 mb-6">
                Take our quick questionnaire to help us understand your needs.
                It only takes 5 minutes and helps us serve you better.
              </p>
              <div className="space-y-3">
                <a
                  href="https://intake.kcfhomes.com/questionnaire"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-6 py-3 bg-gold-light text-primary font-semibold rounded-full hover:bg-[#E0C88A] transition-colors"
                >
                  Take Our Questionnaire
                </a>
                <a
                  href="/how-it-works"
                  className="block w-full text-center px-6 py-3 border border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
                >
                  Learn How It Works
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Map Section (Placeholder) */}
      <SectionWrapper background="cream">
        <SectionHeader
          badge="Service Area"
          title="Proudly Serving Kansas City"
          highlightedWord="Kansas City"
          description="We help families throughout the entire Kansas City metropolitan area, including Johnson County, KS and Jackson County, MO."
        />
        <div className="bg-white rounded-2xl p-8 card-shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-3 text-primary">Kansas Side</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Overland Park</li>
                <li>Olathe</li>
                <li>Leawood</li>
                <li>Lenexa</li>
                <li>Shawnee</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Missouri Side</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Kansas City</li>
                <li>Lee&apos;s Summit</li>
                <li>Independence</li>
                <li>Blue Springs</li>
                <li>Raytown</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">North KC</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Liberty</li>
                <li>Gladstone</li>
                <li>Parkville</li>
                <li>Smithville</li>
                <li>Kearney</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3 text-primary">Other Areas</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Prairie Village</li>
                <li>Mission</li>
                <li>Merriam</li>
                <li>Grandview</li>
                <li>Belton</li>
              </ul>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </main>
  );
}

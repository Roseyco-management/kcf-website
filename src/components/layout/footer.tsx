import Link from "next/link";
import Image from "next/image";
import { Facebook, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/agents", label: "Our Agents" },
  { href: "/contact", label: "Contact Us" },
  { href: "/faq", label: "FAQ" },
];

const mainPages = [
  { href: "/how-it-works", label: "How It Works" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
];

const socialLinks = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://www.instagram.com/kcfamilyhometeam/", icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      {/* CTA Section */}
      <div className="bg-navy-deep py-16">
        <div className="container-main text-center">
          <p className="text-accent font-medium mb-2">Looking to Upsize?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Questions or Concerns?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-accent text-primary font-semibold rounded-full hover:bg-accent/90 transition-colors"
          >
            Get In Touch
          </Link>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <div className="inline-block mb-4">
                  <Image
                    src="/photopea/Untitled design-6.png"
                    alt="KC Family Home Team"
                    width={140}
                    height={45}
                    className="bg-white/95 rounded-md p-1.5"
                  />
                </div>
                <p className="text-white/80 leading-relaxed">
                  Empowering growing families with personalized, stress-free home buying and selling in Kansas City.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-accent">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Main Pages */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-accent">Main Pages</h3>
              <ul className="space-y-3">
                {mainPages.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/80 hover:text-accent transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href="https://intake.kcfhomes.com/questionnaire"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    Questionnaire
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-accent">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:admin@kcfhomes.com"
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    admin@kcfhomes.com
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <a
                    href="tel:+18165757763"
                    className="text-white/80 hover:text-accent transition-colors"
                  >
                    +1 (816) 575-7763
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-white/80">Kansas City, MO</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10 py-6">
        <div className="container-main flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} KC Family Home Team. All rights reserved.
          </p>
          <p className="text-white/60 text-sm">
            Made with care by{" "}
            <a
              href="https://nexwave.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              Nexwave
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

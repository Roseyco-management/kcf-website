"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/agents", label: "Agents" },
  { href: "/blog", label: "Blog" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoClickCount, setLogoClickCount] = useState(0);
  const [clickTimeout, setClickTimeout] = useState<NodeJS.Timeout | null>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle logo double-click for admin login
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setLogoClickCount(prev => prev + 1);

    if (clickTimeout) {
      clearTimeout(clickTimeout);
    }

    const timeout = setTimeout(() => {
      if (logoClickCount + 1 === 1) {
        // Single click - go to home
        router.push('/');
      }
      setLogoClickCount(0);
    }, 300);

    setClickTimeout(timeout);

    // Double click detected
    if (logoClickCount + 1 === 2) {
      clearTimeout(timeout);
      setLogoClickCount(0);
      router.push('/admin/login');
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md py-2"
          : "bg-cream shadow-sm py-3"
      }`}
    >
      <div className="container-main">
        <nav className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4 md:gap-6">
            {/* KC Family Home Team Logo - Double-click for admin login */}
            <div onClick={handleLogoClick} className="flex-shrink-0 cursor-pointer">
              <div className="relative w-40 h-10 md:w-52 md:h-12">
                <Image
                  src="/photopea/Untitled design-6.png"
                  alt="KC Family Home Team"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            {/* United Real Estate Logo - Desktop only */}
            <div className="hidden md:block">
              <div className="relative w-28 h-12 lg:w-32 lg:h-14">
                <Image
                  src="/icons/KC-United-Real-Estate-3.png"
                  alt="United Real Estate Kansas City"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground font-medium hover:text-primary transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}

            {/* Questionnaire Link */}
            <Link
              href="https://intake.kcfhomes.com/questionnaire"
              target="_blank"
              className="text-foreground font-medium hover:text-primary transition-colors relative group"
            >
              Questionnaire
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>

            {/* Contact CTA */}
            <Button asChild className="bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full px-6">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:w-96 bg-white">
              <nav className="flex flex-col gap-6 mt-12 text-center">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-medium text-foreground hover:text-accent transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="https://intake.kcfhomes.com/questionnaire"
                  target="_blank"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-medium text-foreground hover:text-accent transition-colors py-2"
                >
                  Questionnaire
                </Link>
                <div className="pt-4 px-8">
                  <Button
                    asChild
                    className="w-full bg-accent hover:bg-accent/90 text-primary font-semibold rounded-full py-6"
                  >
                    <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </motion.header>
  );
}

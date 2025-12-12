import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { IconFeatureGrid, IconFeatureListItem } from "@/components/sections/icon-feature-card";
import { ProcessSteps } from "@/components/sections/process-steps";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { StatsSection } from "@/components/sections/stats-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";
import { HomepageSchema } from "@/components/seo/homepage-schema";
import { RecentSales } from "@/components/sections/recent-sales";
import { googleReviews } from "@/data/reviews";

// Stats Data
const stats = [
  { value: "99%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "100%", label: "Money Back Guarantee" },
  { value: "4", label: "Team Members" },
];

// Process Steps Data
const processSteps = [
  {
    number: "1",
    title: "Initial Consultation",
    description: "We start with a personalized consultation to understand your family's unique needs and goals.",
  },
  {
    number: "2",
    title: "Customized Search",
    description: "Our team creates a tailored home search or marketing plan based on your specific requirements.",
  },
  {
    number: "3",
    title: "Expert Guidance",
    description: "We guide you through every step, from showings and negotiations to inspections and paperwork.",
  },
  {
    number: "4",
    title: "Closing & Beyond",
    description: "We ensure a smooth closing and continue supporting you long after the transaction is complete.",
  },
];

// Features Data
const features = [
  {
    iconName: "heart",
    title: "Family-First Approach",
    description: "We understand that buying or selling a home is a family decision. Our approach puts your family's needs at the center of everything we do.",
  },
  {
    iconName: "shield",
    title: "Guaranteed Results",
    description: "Our commitment to your success is backed by our satisfaction guarantee. If we don't deliver, you're not obligated.",
  },
  {
    iconName: "clock",
    title: "Responsive Service",
    description: "Your time is valuable. We respond to all inquiries within 2 hours and keep you informed every step of the way.",
  },
  {
    iconName: "trendingUp",
    title: "Market Expertise",
    description: "With 15+ years in Kansas City real estate, we have the local knowledge and connections to get you the best deal.",
  },
  {
    iconName: "users",
    title: "Dedicated Team",
    description: "You get a full team of specialists working for you - not just one agent trying to do everything alone.",
  },
  {
    iconName: "home",
    title: "Full-Service Support",
    description: "From staging and photography to moving coordination, we handle every detail so you can focus on your family.",
  },
];

// Testimonials Data - Real Google Business Profile Reviews
const testimonials = googleReviews
  .filter(r => r.text) // Only reviews with text
  .slice(0, 6) // Limit to 6 for homepage
  .map(review => ({
    id: parseInt(review.id),
    name: review.author,
    location: "Google Review", // Or "Verified Google Customer"
    rating: review.rating,
    text: review.text,
  }));

// FAQ Data
const faqs = [
  {
    question: "How do I know if I'm ready to buy a home?",
    answer: "We recommend having a stable income, some savings for a down payment (typically 3-20%), and a credit score of at least 620. During our initial consultation, we'll review your specific situation and help you understand exactly what you need to get started.",
  },
  {
    question: "What areas of Kansas City do you serve?",
    answer: "We serve the entire Kansas City metro area including Johnson County, KS (Overland Park, Olathe, Leawood), Jackson County, MO (Kansas City, Lee's Summit, Independence), and surrounding areas. Our team has deep knowledge of every neighborhood.",
  },
  {
    question: "How much does it cost to work with you?",
    answer: "For buyers, our services are typically free - the seller usually pays the commission. For sellers, we offer competitive rates and will explain all costs upfront during our listing consultation. No surprises, ever.",
  },
  {
    question: "How long does it take to buy or sell a home?",
    answer: "On average, buying takes 30-60 days from accepted offer to closing. Selling timelines vary based on market conditions, but most of our listings sell within 14-30 days. We'll give you a realistic timeline based on your specific situation.",
  },
  {
    question: "What makes KC Family Home Team different?",
    answer: "We're a team of specialists, not solo agents. This means you get dedicated experts for each part of the process - buyer specialists, listing specialists, transaction coordinators, and marketing experts - all working together for you.",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* SEO Schema Markup */}
      <HomepageSchema />

      {/* Hero Section */}
      <Hero
        title="Empowering Growing Families with personalized, stress-free home-buying."
        highlightedWord="Empowering Growing Families"
        subtitle="Trust our expertise and commitment to your family's journey"
        primaryCTA={{ text: "What's in it for you?", href: "/level-up" }}
        secondaryCTA={{ text: "Talk to an agent", href: "/contact" }}
        backgroundImage="/properties/KC Home Image 1.jpg"
        centered={true}
      />

      {/* Stats Section - Prominent band */}
      <StatsSection stats={stats} variant="band" />

      {/* Recent Sales Section */}
      <RecentSales />

      {/* About Section */}
      <SectionWrapper background="cream" id="about">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionHeader
              badge="About Us"
              title="Real Estate That Puts Families First"
              highlightedWord="Families"
              description="At KC Family Home Team, we believe buying or selling a home should be an exciting milestone, not a stressful ordeal. That's why we've built a team dedicated to providing white-glove service to families throughout Kansas City."
              centered={false}
            />
            <div className="space-y-6">
              <IconFeatureListItem
                iconName="checkCircle"
                title="Dedicated to Kansas City Families"
                description="We help families find their perfect homes across the Kansas City metro with personalized service."
                index={0}
              />
              <IconFeatureListItem
                iconName="award"
                title="Award-Winning Service"
                description="Recognized for excellence in customer service and client satisfaction."
                index={1}
              />
              <IconFeatureListItem
                iconName="handshake"
                title="Your Partners for Life"
                description="Our relationship doesn't end at closing. We're here whenever you need real estate guidance."
                index={2}
              />
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
              <Image
                src="/houses-sold/19625 E 18th St Ter.jpeg"
                alt="Beautiful Kansas City Home"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-primary/10 rounded-2xl -z-10" />
          </div>
        </div>
      </SectionWrapper>

      {/* Why Choose Us Section */}
      <SectionWrapper background="white" id="services">
        <SectionHeader
          badge="Why Choose Us"
          title="The KC Family Home Team Difference"
          highlightedWord="Difference"
          description="We're not just another real estate team. Here's what sets us apart and why families trust us with their biggest investment."
        />
        <IconFeatureGrid features={features} />
      </SectionWrapper>

      {/* How It Works Section */}
      <SectionWrapper background="cream-dark" id="process">
        <SectionHeader
          badge="Our Process"
          title="How It Works"
          highlightedWord="Works"
          description="Our streamlined process takes the stress out of buying or selling. Here's what to expect when you work with us."
        />
        <ProcessSteps steps={processSteps} variant="horizontal" />
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper background="white" id="team">
        <SectionHeader
          badge="Meet The Team"
          title="Your Real Estate Family"
          highlightedWord="Family"
          description="Get to know the dedicated professionals who will guide you through your real estate journey."
        />

        {/* Team Rooftop Image */}
        <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/agents/KC Rooftop Shot 2.jpg"
            alt="KC Family Home Team"
            fill
            className="object-cover"
            style={{ objectPosition: 'center 30%' }}
            quality={90}
          />
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Meet Our Team
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </SectionWrapper>

      {/* Testimonials Section - Full-width premium layout */}
      <TestimonialsSection testimonials={testimonials} />

      {/* FAQ Section */}
      <SectionWrapper background="white" id="faq">
        <SectionHeader
          badge="FAQ"
          title="Frequently Asked Questions"
          highlightedWord="Questions"
          description="Have questions? We've got answers. Here are some of the most common things families ask us."
        />
        <FAQSection items={faqs} columns={2} />
      </SectionWrapper>

      {/* CTA Section */}
      <CTASection
        badge="Ready to Get Started?"
        title="Let's Find Your Family's Next Chapter"
        highlightedWord="Next Chapter"
        description="Whether you're buying your first home, upgrading for a growing family, or selling to start fresh, we're here to help every step of the way."
        primaryCTA={{ text: "Contact Us Today", href: "/contact" }}
        secondaryCTA={{ text: "Take Our Questionnaire", href: "https://intake.kcfhomes.com/questionnaire" }}
        backgroundImage="/properties/KC Home Image 3.jpg"
        variant="centered"
      />
    </main>
  );
}

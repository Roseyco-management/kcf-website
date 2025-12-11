import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { IconFeatureGrid, IconFeatureListItem } from "@/components/sections/icon-feature-card";
import { ProcessSteps } from "@/components/sections/process-steps";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "How to Buy or Sell a Home in Kansas City | KC Family Home Team",
  description: "Step-by-step guide to buying or selling your family home in Kansas City. Expert guidance through the entire real estate process, from consultation to closing. Stress-free for families.",
  keywords: [
    "how to buy home Kansas City",
    "home buying process Kansas City",
    "selling home Kansas City",
    "Kansas City real estate process",
    "first time home buyer Kansas City",
  ],
  openGraph: {
    title: "How to Buy or Sell a Home in Kansas City",
    description: "Expert guidance through every step of buying or selling your family home in Kansas City. Stress-free process designed for families.",
  },
};

// Buying Process Steps
const buyingSteps = [
  {
    number: "1",
    title: "Initial Consultation",
    description: "We meet to discuss your needs, budget, timeline, and ideal neighborhoods. This helps us understand exactly what you're looking for.",
    iconName: "phone",
  },
  {
    number: "2",
    title: "Pre-Approval",
    description: "We connect you with trusted lenders to get pre-approved. This strengthens your offers and clarifies your budget.",
    iconName: "dollarSign",
  },
  {
    number: "3",
    title: "Home Search",
    description: "We curate listings that match your criteria and schedule showings at your convenience. No endless scrolling - just qualified options.",
    iconName: "search",
  },
  {
    number: "4",
    title: "Make an Offer",
    description: "When you find the one, we craft a competitive offer and negotiate on your behalf to get the best terms possible.",
    iconName: "fileText",
  },
  {
    number: "5",
    title: "Under Contract",
    description: "We guide you through inspections, appraisals, and any negotiations. Our team handles the details so you can focus on planning.",
    iconName: "clipboardCheck",
  },
  {
    number: "6",
    title: "Closing Day",
    description: "We walk you through final paperwork, hand you the keys, and celebrate your new home. Welcome home!",
    iconName: "key",
  },
];

// Selling Process Steps
const sellingSteps = [
  {
    number: "1",
    title: "Home Evaluation",
    description: "We assess your home's value with a comprehensive market analysis, considering recent sales and current market conditions.",
    iconName: "home",
  },
  {
    number: "2",
    title: "Preparation Plan",
    description: "We provide recommendations to maximize your home's appeal - from staging tips to minor repairs that boost value.",
    iconName: "clipboardCheck",
  },
  {
    number: "3",
    title: "Professional Marketing",
    description: "Professional photography, virtual tours, and strategic listing across 100+ platforms to maximize exposure.",
    iconName: "camera",
  },
  {
    number: "4",
    title: "Showings & Open Houses",
    description: "We coordinate and host showings, providing feedback after each visit so you're always informed.",
    iconName: "calendar",
  },
  {
    number: "5",
    title: "Offer Review & Negotiation",
    description: "We present all offers, analyze terms, and negotiate to get you the best price and conditions.",
    iconName: "trendingUp",
  },
  {
    number: "6",
    title: "Smooth Closing",
    description: "We manage all paperwork and coordinate with all parties to ensure a stress-free closing.",
    iconName: "handshake",
  },
];

// Benefits
const benefits = [
  {
    iconName: "users",
    title: "Dedicated Team",
    description: "You get a full team of specialists - not just one agent trying to juggle everything.",
  },
  {
    iconName: "messageSquare",
    title: "24/7 Communication",
    description: "We respond within 2 hours and keep you informed at every stage of the process.",
  },
  {
    iconName: "shieldCheck",
    title: "Satisfaction Guarantee",
    description: "If you're not satisfied with our service, you can cancel your agreement - no questions asked.",
  },
  {
    iconName: "checkCircle",
    title: "No Hidden Fees",
    description: "Complete transparency on all costs. We explain everything upfront so there are no surprises.",
  },
];

export default function HowItWorksPage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        badge="Our Process"
        title="A Better Way to Buy & Sell"
        highlightedWord="Better"
        description="We've refined our process to make buying and selling homes as smooth as possible. No stress, no confusion - just expert guidance at every step."
        primaryCTA={{ text: "Get Started", href: "/contact" }}
        secondaryCTA={{ text: "Take Questionnaire", href: "https://intake.kcfhomes.com/questionnaire" }}
        backgroundImage="/properties/KC Home Image 3.jpg"
      />

      {/* Benefits Overview */}
      <SectionWrapper background="white">
        <SectionHeader
          badge="Why Our Process Works"
          title="Built for Your Success"
          highlightedWord="Success"
          description="Our approach is designed around what families actually need - not industry norms."
        />
        <IconFeatureGrid features={benefits} columns={2} />
      </SectionWrapper>

      {/* Buying Process */}
      <SectionWrapper background="cream" id="buying">
        <SectionHeader
          badge="For Buyers"
          title="Your Path to Home Ownership"
          highlightedWord="Home Ownership"
          description="From dream to keys in hand, here's exactly what to expect when buying with KC Family Home Team."
        />
        <ProcessSteps steps={buyingSteps} variant="cards" />
      </SectionWrapper>

      {/* Selling Process */}
      <SectionWrapper background="white" id="selling">
        <SectionHeader
          badge="For Sellers"
          title="Selling Made Simple"
          highlightedWord="Simple"
          description="We handle the heavy lifting so you can focus on your next chapter. Here's our proven selling process."
        />
        <ProcessSteps steps={sellingSteps} variant="cards" />
      </SectionWrapper>

      {/* What to Expect */}
      <SectionWrapper background="cream-dark">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <SectionHeader
              badge="What to Expect"
              title="Your Journey With Us"
              highlightedWord="Journey"
              centered={false}
            />
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              From the moment you reach out, you&apos;ll experience the KC Family Home Team
              difference. Here&apos;s what working with us looks like:
            </p>
            <div className="space-y-6">
              <IconFeatureListItem
                iconName="phone"
                title="Immediate Response"
                description="We respond to all inquiries within 2 hours. Your time matters, and we respect it."
                index={0}
              />
              <IconFeatureListItem
                iconName="messageSquare"
                title="Regular Updates"
                description="You'll never wonder what's happening. We proactively communicate at every milestone."
                index={1}
              />
              <IconFeatureListItem
                iconName="handshake"
                title="Expert Negotiation"
                description="Our team has negotiated hundreds of deals. We fight for your best interests."
                index={2}
              />
              <IconFeatureListItem
                iconName="checkCircle"
                title="Smooth Closing"
                description="We coordinate everything with lenders, title companies, and inspectors."
                index={3}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 card-shadow">
            <h3 className="text-2xl font-semibold mb-6">Ready to Get Started?</h3>
            <p className="text-muted-foreground mb-8">
              The first step is a simple conversation. We&apos;ll discuss your goals,
              answer your questions, and create a personalized plan for your real
              estate journey.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Fill Out Our Questionnaire</h4>
                  <p className="text-sm text-muted-foreground">
                    Tell us about your needs and timeline (5 minutes)
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Schedule a Consultation</h4>
                  <p className="text-sm text-muted-foreground">
                    We&apos;ll call you to discuss your goals and answer questions
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-cream rounded-xl">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-bold text-primary">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Receive Your Custom Plan</h4>
                  <p className="text-sm text-muted-foreground">
                    Get a personalized roadmap for your real estate journey
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://intake.kcfhomes.com/questionnaire"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 w-full inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Start Your Questionnaire
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <CTASection
        badge="Questions?"
        title="Let's Talk About Your Goals"
        highlightedWord="Goals"
        description="Every family's situation is unique. Let's discuss yours and create a plan that works for you."
        primaryCTA={{ text: "Contact Us", href: "/contact" }}
        secondaryCTA={{ text: "View FAQ", href: "/faq" }}
        variant="centered"
      />
    </main>
  );
}

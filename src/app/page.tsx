import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { IconFeatureGrid, IconFeatureListItem } from "@/components/sections/icon-feature-card";
import { ProcessSteps } from "@/components/sections/process-steps";
import { TeamGrid } from "@/components/sections/team-card";
import { TestimonialsSection } from "@/components/sections/testimonials";
import { StatsSection } from "@/components/sections/stats-section";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

// Team Data
const teamMembers = [
  {
    name: "Ernesto Tinoco",
    role: "Senior Consultant",
    image: "/agents/KC Ernesto.jpg",
    phone: "+1 (816) 575-7763",
    email: "ernesto@kcfhomes.com",
  },
  {
    name: "Monica Hammer",
    role: "Homeowner Specialist",
    image: "/agents/KC Monica.jpg",
    phone: "+1 (816) 575-7763",
    email: "monica@kcfhomes.com",
  },
  {
    name: "Chris Schinzel",
    role: "Transaction Coordinator and Property Manager",
    image: "/agents/KC Chris.jpg",
    phone: "+1 (816) 575-7763",
    email: "chris@kcfhomes.com",
  },
];

// Stats Data
const stats = [
  { value: "500+", label: "Families Served" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "$50M+", label: "In Home Sales" },
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

// Testimonials Data
const testimonials = [
  {
    id: 1,
    name: "Sarah & Michael Johnson",
    location: "Overland Park, KS",
    rating: 5,
    text: "The KC Family Home Team made selling our home and finding a bigger one for our growing family completely stress-free. They handled everything with such care and professionalism. We couldn't have asked for a better experience!",
  },
  {
    id: 2,
    name: "David Thompson",
    location: "Lee's Summit, MO",
    rating: 5,
    text: "As a first-time homebuyer, I was nervous about the whole process. Ernesto and his team walked me through every step, found me the perfect home, and made sure I got a great deal. Highly recommend!",
  },
  {
    id: 3,
    name: "The Martinez Family",
    location: "Kansas City, MO",
    rating: 5,
    text: "We needed to relocate quickly for work, and the team jumped into action. They sold our home in just 10 days and helped us find a new place in our new neighborhood. True professionals!",
  },
  {
    id: 4,
    name: "Jennifer Williams",
    location: "Olathe, KS",
    rating: 5,
    text: "The attention to detail and communication throughout our home buying journey was exceptional. They truly care about their clients and it shows in everything they do.",
  },
];

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
      {/* Hero Section */}
      <Hero
        badge="Kansas City's Family-Focused Realtors"
        title="Find Your Family's Perfect Home"
        highlightedWord="Perfect"
        description="We specialize in helping growing families buy and sell homes in the Kansas City metro area. With personalized service and local expertise, we make your real estate journey stress-free."
        primaryCTA={{ text: "Start Your Search", href: "/contact" }}
        secondaryCTA={{ text: "Sell Your Home", href: "/how-it-works" }}
        backgroundImage="/properties/KC Home Image 1.jpg"
      />

      {/* Stats Section - Prominent band */}
      <StatsSection stats={stats} variant="band" />

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
                title="Over 500 Families Served"
                description="We've helped hundreds of families find their perfect homes across the Kansas City metro."
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
            <div className="aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="/properties/KC Home Image 2.jpg"
                alt="Beautiful Kansas City Home"
                className="w-full h-full object-cover"
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
        <TeamGrid members={teamMembers} />
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

import { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { ValueCard } from "@/components/sections/feature-card";
import { TeamGrid } from "@/components/sections/team-card";
import { StatsSection } from "@/components/sections/stats-section";
import { CTASection } from "@/components/sections/cta-section";
import { AboutFeaturesList } from "@/components/sections/about-features";

export const metadata: Metadata = {
  title: "About Kansas City's Top Family Real Estate Team | KC Family Home Team",
  description: "Meet Kansas City's premier family-focused real estate team. 500+ families served, 15+ years experience, 98% client satisfaction. Learn our story and mission to help your family find the perfect home in Kansas City.",
  keywords: [
    'Kansas City real estate team',
    'family real estate agents Kansas City',
    'best realtors Kansas City',
    'KC Family Home Team',
    'Kansas City home buying team',
  ],
  openGraph: {
    title: 'About Kansas City\'s Top Family Real Estate Team',
    description: 'Meet the team that has helped 500+ Kansas City families find their perfect homes.',
    type: 'website',
  },
};

// Team Data
const teamMembers = [
  {
    name: "Ernesto Tinoco",
    role: "Senior Consultant",
    image: "/agents/Ernesto Rooftop Shot.jpg",
    bio: "Licensed in KS and MO since 2010, Ernesto started as a wholesaler, then property manager until going full time as an agent in 2014. He's represented hundreds of buyers and sellers with great attention to detail and strong negotiation skills.",
    phone: "+1 (816) 575-7763",
    email: "ernesto@kcfhomes.com",
  },
  {
    name: "Monica Hammer",
    role: "Homeowner Specialist",
    image: "/agents/Monica Rooftop Shot.jpg",
    bio: "Licensed in Kansas and Missouri, Monica helps buyers, first-time homeowners, and investors navigate the real estate process with confidence. Her goal is to make homebuying clear, stress-free, and enjoyable.",
    phone: "+1 (816) 575-7763",
    email: "monica@kcfhomes.com",
  },
  {
    name: "Chris Schinzel",
    role: "Transaction Coordinator and Property Manager",
    image: "/agents/Chris Rooftop Shot.jpg",
    bio: "With years of experience managing contract documents, deadlines, and communication among all parties, Chris ensures smooth, successful transactions. A proud father of two with a background in education.",
    phone: "+1 (816) 575-7763",
    email: "chris@kcfhomes.com",
  },
  {
    name: "Sandy",
    role: "Real Estate Specialist",
    image: "/agents/Sandy Rooftop Shot.jpg",
    bio: "Sandy brings expertise and dedication to helping Kansas City families achieve their real estate goals.",
    phone: "+1 (816) 575-7763",
    email: "sandy@kcfhomes.com",
  },
];

// Stats Data
const stats = [
  { value: "500+", label: "Families Served" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Years Experience" },
  { value: "$50M+", label: "In Home Sales" },
];

// Values Data
const values = [
  {
    number: "01",
    title: "Family First",
    description: "Every decision we make centers on what's best for your family. Your needs always come first.",
  },
  {
    number: "02",
    title: "Integrity Always",
    description: "We operate with complete transparency. No hidden agendas, no surprises, just honest guidance.",
  },
  {
    number: "03",
    title: "Excellence Standard",
    description: "We hold ourselves to the highest standards in every aspect of our service.",
  },
  {
    number: "04",
    title: "Community Roots",
    description: "We're not just agents - we're your neighbors, invested in our Kansas City community.",
  },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <Hero
        badge="Our Story"
        title="More Than Agents, We're Family"
        highlightedWord="Family"
        description="Founded on the belief that every family deserves exceptional real estate service, KC Family Home Team has been helping Kansas City families find their perfect homes for over 15 years."
        primaryCTA={{ text: "Meet Our Team", href: "#team" }}
        backgroundImage="/properties/KC Home Image 2.jpg"
      />

      {/* Mission Section */}
      <SectionWrapper background="white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-square overflow-hidden">
              <Image
                src="/properties/KC Home Image 1.jpg"
                alt="KC Family Home Team"
                fill
                className="object-cover rounded-2xl"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-2xl -z-10" />
          </div>

          <div>
            <SectionHeader
              badge="Our Mission"
              title="Empowering Families to Find Home"
              highlightedWord="Home"
              centered={false}
            />
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              At KC Family Home Team, we understand that buying or selling a home is more
              than a transaction - it&apos;s a pivotal moment in your family&apos;s story. That&apos;s
              why we&apos;ve built a team dedicated to providing the personalized, white-glove
              service that every family deserves.
            </p>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Our mission is simple: to make your real estate journey as smooth, stress-free,
              and successful as possible. Whether you&apos;re a first-time buyer, growing your
              family, or ready to sell, we&apos;re here to guide you every step of the way.
            </p>
            <AboutFeaturesList
              features={[
                {
                  iconName: "target",
                  title: "Personalized Approach",
                  description: "We take the time to understand your unique needs and goals.",
                },
                {
                  iconName: "heart",
                  title: "Genuine Care",
                  description: "Your success is our success. We're invested in your journey.",
                },
                {
                  iconName: "shield",
                  title: "Expert Guidance",
                  description: "15+ years of local market expertise at your service.",
                },
              ]}
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Stats Section */}
      <StatsSection stats={stats} variant="cards" background="cream" />

      {/* Values Section */}
      <SectionWrapper background="white">
        <SectionHeader
          badge="Our Values"
          title="What Drives Us Every Day"
          highlightedWord="Drives"
          description="These core principles guide everything we do and shape how we serve our clients."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <ValueCard
              key={value.number}
              number={value.number}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </div>
      </SectionWrapper>

      {/* Why We Started Section */}
      <SectionWrapper background="cream">
        <div className="max-w-4xl mx-auto text-center">
          <SectionHeader
            badge="Our Story"
            title="Why We Started KC Family Home Team"
            highlightedWord="Started"
          />
          <div className="prose prose-lg mx-auto text-muted-foreground">
            <p className="text-lg leading-relaxed mb-6">
              After years working in traditional real estate, our founder Ernesto Piekus
              noticed a troubling pattern: families were being treated as just another
              transaction. The personal touch was missing, and many families felt lost
              in the process.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              In 2009, KC Family Home Team was born with a simple premise - what if we
              treated every client like family? What if we built a team of specialists
              instead of trying to do everything alone? What if we measured success not
              by transactions, but by happy families?
            </p>
            <p className="text-lg leading-relaxed">
              Today, that vision has helped over 500 families find their perfect homes.
              But we&apos;re just getting started. Every day, we wake up with the same passion
              and dedication to serve Kansas City families with the care they deserve.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Team Section */}
      <SectionWrapper background="white" id="team">
        <SectionHeader
          badge="Meet The Team"
          title="The People Behind Your Success"
          highlightedWord="Success"
          description="Get to know the dedicated professionals who will guide you through your real estate journey."
        />
        <TeamGrid members={teamMembers} variant="detailed" />
      </SectionWrapper>

      {/* CTA Section */}
      <CTASection
        badge="Ready to Work With Us?"
        title="Let's Start Your Home Journey Together"
        highlightedWord="Together"
        description="Whether you're buying, selling, or just exploring your options, we're here to help. Reach out today for a no-obligation consultation."
        primaryCTA={{ text: "Contact Us", href: "/contact" }}
        secondaryCTA={{ text: "View Our Process", href: "/how-it-works" }}
        variant="centered"
      />
    </main>
  );
}

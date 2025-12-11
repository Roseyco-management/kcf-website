import { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { TeamSchema } from "@/components/seo/team-schema";
import { Phone, Mail, Home, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Kansas City Real Estate Agents for Families | Meet Our Team",
  description: "Meet Ernesto, Monica, and Chris - your dedicated Kansas City real estate team. 500+ homes sold, 15+ years experience helping families buy and sell homes. Expert local agents ready to help you.",
  keywords: [
    'Kansas City real estate agents',
    'family realtors Kansas City',
    'best real estate agents Kansas City',
    'top realtors Kansas City families',
    'KC Family Home Team agents',
  ],
  openGraph: {
    title: 'Meet Your Kansas City Real Estate Agents',
    description: 'Expert real estate professionals dedicated to helping Kansas City families.',
    type: 'website',
  },
};

// Detailed Team Data
const teamMembers = [
  {
    name: "Ernesto Tinoco",
    role: "Senior Consultant",
    image: "/agents/Ernesto Rooftop Shot.jpg",
    phone: "+1 (816) 575-7763",
    email: "ernesto@kcfhomes.com",
    bio: "Real Estate Jedi Master, turned Top G, now looking to grow my team and my business, sky's the limit. Licensed in KS and MO since 2010. Started as a wholesaler, then property manager until I went full time as an agent in 2014. I've represented hundreds of buyers and sellers with great attention to detail and strong negotiation skills to look out for their best interest. From first time buyers to families buying their 2nd or their forever home I've got you covered. Our strong focus on personalized, stress-free home buying will suit every family's needs. Trust our expertise and commitment to your family's journey. We focus on transparency, clear communication and a genuine understanding of your needs, backed up by a service satisfaction promise.",
    specialties: ["Listing Strategy", "Negotiation", "Market Analysis", "Team Leadership"],
    stats: [
      { label: "Years Experience", value: "15+" },
      { label: "Homes Sold", value: "300+" },
      { label: "Client Satisfaction", value: "99%" },
    ],
  },
  {
    name: "Monica Hammer",
    role: "Homeowner Specialist",
    image: "/agents/Monica Rooftop Shot.jpg",
    phone: "+1 (816) 575-7763",
    email: "monica@kcfhomes.com",
    bio: "Hi, I'm Monica Realtor® with the KC Family Home Team at United Real Estate KC, licensed in Kansas and Missouri. I help buyers, first-time homeowners, and investors navigate the real estate process with confidence and ease. My journey into real estate began when I bought my first home. I loved the idea of owning a home, but the process was confusing and overwhelming — and I wasn't told about programs like first-time homebuyer assistance that could have helped with my down payment. That experience stuck with me and inspired me to become a Realtor® who truly guides clients every step of the way. Today, my goal is simple: to make the homebuying process clear, stress-free, and even enjoyable. I treat every client like family, answer every question, and make sure they know about every option available — from down payment assistance programs to smart investment strategies. Helping people achieve their real estate goals isn't just my job — it's my passion.",
    specialties: ["First-Time Buyers", "Down Payment Assistance", "Investment Properties", "Client Communication"],
    stats: [
      { label: "Families Helped", value: "200+" },
      { label: "Avg. Response Time", value: "< 1hr" },
      { label: "Client Rating", value: "5.0" },
    ],
  },
  {
    name: "Chris Schinzel",
    role: "Transaction Coordinator and Property Manager",
    image: "/agents/Chris Rooftop Shot.jpg",
    phone: "+1 (816) 575-7763",
    email: "chris@kcfhomes.com",
    bio: "Chris has years of experience as a Transaction Coordinator and Property Manager, where he has managed contract documents, deadlines, and communication among title companies, agents, lenders, and clients to ensure smooth, successful transactions. His experience overseeing remodel projects and coordinating with contractors has deepened his understanding of how homes function best and strengthened his commitment to providing quality rental opportunities for others. With a background in education and as a proud father of two, Chris brings strong organizational skills, attention to detail, and a genuine dedication to helping families find and enjoy great homes.",
    specialties: ["Transaction Management", "Property Management", "Document Coordination", "Contract Coordination"],
    stats: [
      { label: "Transactions Managed", value: "500+" },
      { label: "On-Time Closings", value: "98%" },
      { label: "Client Satisfaction", value: "100%" },
    ],
  },
  {
    name: "Sandy",
    role: "Real Estate Specialist",
    image: "/agents/Sandy Rooftop Shot.jpg",
    phone: "+1 (816) 575-7763",
    email: "sandy@kcfhomes.com",
    bio: "Sandy brings expertise and dedication to helping Kansas City families achieve their real estate goals. More details coming soon.",
    specialties: ["Client Relations", "Market Knowledge", "Family Homes", "Customer Service"],
    stats: [
      { label: "Years Experience", value: "10+" },
      { label: "Families Helped", value: "150+" },
      { label: "Client Rating", value: "5.0" },
    ],
  },
];

function AgentCard({ agent, index }: { agent: typeof teamMembers[0]; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center ${!isEven ? "lg:flex-row-reverse" : ""}`}>
      {/* Image */}
      <div className={`relative ${!isEven ? "lg:order-2" : ""}`}>
        <div className="aspect-[4/5] overflow-hidden">
          <Image
            src={agent.image}
            alt={agent.name}
            fill
            className="object-cover rounded-2xl"
            style={
              agent.name === "Sandy"
                ? { objectPosition: '80% center' }
                : agent.name === "Ernesto Tinoco"
                  ? { objectPosition: '60% center' }
                  : undefined
            }
          />
        </div>
        {/* Decorative elements */}
        <div className={`absolute -bottom-4 ${isEven ? "-right-4" : "-left-4"} w-24 h-24 bg-accent/20 rounded-xl -z-10`} />
        <div className={`absolute -top-4 ${isEven ? "-left-4" : "-right-4"} w-16 h-16 bg-primary/10 rounded-xl -z-10`} />
      </div>

      {/* Content */}
      <div className={!isEven ? "lg:order-1" : ""}>
        <span className="inline-block px-3 py-1 rounded-full bg-accent/20 text-primary text-sm font-medium mb-4">
          {agent.role}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">{agent.name}</h2>
        <p className="text-muted-foreground text-lg leading-relaxed mb-6">
          {agent.bio}
        </p>

        {/* Specialties */}
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {agent.specialties.map((specialty) => (
              <span
                key={specialty}
                className="px-3 py-1 bg-cream rounded-full text-sm text-foreground"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {agent.stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-cream rounded-xl">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Contact Buttons */}
        <div className="flex flex-wrap gap-4">
          <a
            href={`tel:${agent.phone}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
          >
            <Phone className="w-4 h-4" />
            Call Now
          </a>
          <a
            href={`mailto:${agent.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-full hover:bg-primary/5 transition-colors"
          >
            <Mail className="w-4 h-4" />
            Send Email
          </a>
        </div>
      </div>
    </div>
  );
}

export default function AgentsPage() {
  return (
    <main>
      {/* Team Member Schema */}
      <TeamSchema />

      {/* Hero Section */}
      <Hero
        badge="Our Team"
        title="Meet Your Real Estate Experts"
        highlightedWord="Experts"
        description="Behind every successful home transaction is a dedicated team of professionals. Get to know the people who will guide you through your real estate journey."
        primaryCTA={{ text: "Contact Our Team", href: "/contact" }}
        backgroundImage="/agents/KC Team Rooftop Shot.jpg"
      />

      {/* Team Intro */}
      <SectionWrapper background="white">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <SectionHeader
            badge="Why a Team?"
            title="Specialists, Not Generalists"
            highlightedWord="Specialists"
            description="Instead of one agent trying to do everything, we've built a team where each member focuses on what they do best. This means you get expert-level service at every stage of your journey."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Home className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Listing Expertise</h3>
            <p className="text-muted-foreground text-sm">
              Dedicated specialists who know how to market and sell your home for top dollar.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Buyer Advocates</h3>
            <p className="text-muted-foreground text-sm">
              Agents focused entirely on finding you the perfect home at the best price.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Transaction Support</h3>
            <p className="text-muted-foreground text-sm">
              Coordinators who handle the details so nothing falls through the cracks.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Individual Agent Sections */}
      {teamMembers.map((agent, index) => (
        <SectionWrapper
          key={agent.name}
          background={index % 2 === 0 ? "cream" : "white"}
          id={agent.name.toLowerCase().split(" ")[0]}
        >
          <AgentCard agent={agent} index={index} />
        </SectionWrapper>
      ))}

      {/* CTA Section */}
      <CTASection
        badge="Ready to Connect?"
        title="Let's Start a Conversation"
        highlightedWord="Conversation"
        description="Whether you're buying, selling, or just have questions, our team is here to help. Reach out today and let's discuss your real estate goals."
        primaryCTA={{ text: "Contact Us", href: "/contact" }}
        secondaryCTA={{ text: "Take Questionnaire", href: "https://intake.kcfhomes.com/questionnaire" }}
        backgroundImage="/properties/KC Home Image 1.jpg"
        variant="centered"
      />
    </main>
  );
}

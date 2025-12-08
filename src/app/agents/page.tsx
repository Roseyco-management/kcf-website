import { Metadata } from "next";
import Image from "next/image";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { CTASection } from "@/components/sections/cta-section";
import { Phone, Mail, Home, Users, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Agents | KC Family Home Team",
  description: "Meet the dedicated real estate professionals of KC Family Home Team. Our experienced agents are committed to helping Kansas City families find their perfect homes.",
};

// Detailed Team Data
const teamMembers = [
  {
    name: "Ernesto Tinoco",
    role: "Senior Consultant",
    image: "/agents/KC Ernesto.jpg",
    phone: "+1 (816) 575-7763",
    email: "ernesto@kcfhomes.com",
    bio: "With over 15 years of experience in Kansas City real estate, Ernesto founded KC Family Home Team with a singular vision: to provide families with the personalized, attentive service they deserve. As Senior Consultant, he oversees all operations while personally guiding clients through their real estate journey, ensuring every transaction reaches its fullest potential.",
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
    image: "/agents/KC Monica.jpg",
    phone: "+1 (816) 575-7763",
    email: "monica@kcfhomes.com",
    bio: "Monica brings a caring, thorough approach to helping homeowners navigate the real estate process. Whether you're selling your family home or looking to find your next dream property, Monica takes the time to understand your needs and ensures every step of the journey is handled with care and attention to detail.",
    specialties: ["Homeowner Relations", "Client Communication", "Property Marketing", "Family Relocations"],
    stats: [
      { label: "Families Helped", value: "200+" },
      { label: "Avg. Response Time", value: "< 1hr" },
      { label: "Client Rating", value: "5.0" },
    ],
  },
  {
    name: "Chris Schinzel",
    role: "Transaction Coordinator and Property Manager",
    image: "/agents/KC Chris.jpg",
    phone: "+1 (816) 575-7763",
    email: "chris@kcfhomes.com",
    bio: "Chris is the organizational backbone of KC Family Home Team. As Transaction Coordinator and Property Manager, he ensures every transaction runs smoothly from contract to close and manages property-related details with precision. His attention to detail and proactive communication keep clients informed and stress-free throughout the process.",
    specialties: ["Transaction Management", "Property Management", "Document Coordination", "Problem Solving"],
    stats: [
      { label: "Transactions Managed", value: "500+" },
      { label: "On-Time Closings", value: "98%" },
      { label: "Client Satisfaction", value: "100%" },
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
      {/* Hero Section */}
      <Hero
        badge="Our Team"
        title="Meet Your Real Estate Experts"
        highlightedWord="Experts"
        description="Behind every successful home transaction is a dedicated team of professionals. Get to know the people who will guide you through your real estate journey."
        primaryCTA={{ text: "Contact Our Team", href: "/contact" }}
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

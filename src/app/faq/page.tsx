import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { SectionWrapper, SectionHeader } from "@/components/sections/section-wrapper";
import { FAQSection } from "@/components/sections/faq-section";
import { CTASection } from "@/components/sections/cta-section";

export const metadata: Metadata = {
  title: "FAQ | KC Family Home Team",
  description: "Find answers to frequently asked questions about buying and selling homes in Kansas City with KC Family Home Team.",
};

// General FAQs
const generalFaqs = [
  {
    question: "What areas of Kansas City do you serve?",
    answer: "We serve the entire Kansas City metropolitan area, including Johnson County, KS (Overland Park, Olathe, Leawood, Lenexa, Shawnee), Jackson County, MO (Kansas City, Lee's Summit, Independence, Blue Springs), and surrounding communities. Our team has deep knowledge of every neighborhood in the metro.",
  },
  {
    question: "How much does it cost to work with KC Family Home Team?",
    answer: "For buyers, our services are typically free - the seller usually pays the buyer's agent commission. For sellers, we charge competitive commission rates that we'll discuss transparently during our listing consultation. We believe in complete transparency with no hidden fees or surprises.",
  },
  {
    question: "What makes KC Family Home Team different from other agents?",
    answer: "Unlike solo agents who try to handle everything themselves, we're a team of specialists. You get dedicated experts for each part of the process - buyer specialists, listing specialists, and transaction coordinators - all working together for you. This means better service, faster responses, and expert attention at every stage.",
  },
  {
    question: "How quickly do you respond to inquiries?",
    answer: "We pride ourselves on responsiveness. We respond to all inquiries within 2 hours during business hours, and often much faster. Your time is valuable, and we respect that. You'll never be left wondering what's happening with your transaction.",
  },
];

// Buyer FAQs
const buyerFaqs = [
  {
    question: "How do I know if I'm ready to buy a home?",
    answer: "Generally, you're ready to buy if you have stable income, some savings for a down payment (typically 3-20% depending on loan type), a credit score of at least 620, and plan to stay in the area for 3+ years. During our initial consultation, we'll review your specific situation and help you understand exactly what you need.",
  },
  {
    question: "How much do I need for a down payment?",
    answer: "Down payment requirements vary by loan type. FHA loans require as little as 3.5%, conventional loans can be 3-20%, VA loans may require $0 down for eligible veterans, and USDA loans also offer $0 down for qualifying rural properties. We'll connect you with lenders who can explain all your options.",
  },
  {
    question: "Should I get pre-approved before looking at homes?",
    answer: "Yes, absolutely! Getting pre-approved is one of the first steps we recommend. It tells you exactly how much you can afford, makes your offers stronger (sellers prefer pre-approved buyers), and speeds up the closing process once you find your home.",
  },
  {
    question: "How long does it take to buy a home?",
    answer: "On average, the home buying process takes 30-60 days from accepted offer to closing. However, the search phase can vary - some buyers find their perfect home in a week, others take a few months. We'll work at your pace and never rush you into a decision.",
  },
  {
    question: "What if I find issues during the home inspection?",
    answer: "Finding issues during inspection is normal and doesn't mean you should walk away. We'll review the inspection report together, help you prioritize concerns, and negotiate with the seller for repairs or credits. Our experience helps us know which issues are deal-breakers and which are minor.",
  },
];

// Seller FAQs
const sellerFaqs = [
  {
    question: "How do you determine my home's value?",
    answer: "We perform a comprehensive Comparative Market Analysis (CMA) that looks at recent sales of similar homes in your area, current market conditions, your home's unique features, and neighborhood trends. We'll present this analysis to you with our recommended listing price and explain our reasoning.",
  },
  {
    question: "What should I do to prepare my home for sale?",
    answer: "We provide a personalized preparation checklist based on your home. Common recommendations include decluttering, deep cleaning, making minor repairs, and potentially staging key rooms. We'll walk through your home together and advise on improvements that will have the best return on investment.",
  },
  {
    question: "How long will it take to sell my home?",
    answer: "In the current Kansas City market, well-priced homes typically sell within 14-30 days. However, timing can vary based on price point, location, condition, and market conditions. We'll give you a realistic timeline based on your specific situation and adjust our strategy as needed.",
  },
  {
    question: "Do you offer professional photography and marketing?",
    answer: "Absolutely! Professional photography is included in all our listings. We also create virtual tours, feature your home on 100+ real estate websites, leverage social media marketing, and may recommend drone photography for larger properties. Great marketing is essential for getting top dollar.",
  },
  {
    question: "Can I sell my home while still living in it?",
    answer: "Yes, most of our sellers live in their homes during the sale. We'll provide tips for keeping your home show-ready, give you advance notice of all showings, and work around your schedule. We understand that life doesn't stop just because you're selling your home.",
  },
];

// Process FAQs
const processFaqs = [
  {
    question: "What happens at closing?",
    answer: "At closing, you'll sign final paperwork, funds are transferred, and ownership officially changes hands. For buyers, you'll receive the keys to your new home! The process typically takes 1-2 hours. We'll be there with you, explain every document, and make sure everything goes smoothly.",
  },
  {
    question: "Do I need a real estate attorney?",
    answer: "In Missouri and Kansas, real estate attorneys are not required but can be helpful for complex situations. The title company handles most legal aspects of the transaction. If you have unique circumstances (estate sales, divorces, etc.), we can recommend trusted attorneys in our network.",
  },
  {
    question: "What is earnest money and how much do I need?",
    answer: "Earnest money is a deposit that shows sellers you're serious about buying their home. In Kansas City, earnest money is typically 1-3% of the purchase price. This money is applied toward your down payment at closing. If the deal falls through due to a contingency, you typically get it back.",
  },
  {
    question: "What contingencies should be in my offer?",
    answer: "Common contingencies include financing (your ability to get a loan), inspection (findings from the home inspection), and appraisal (ensuring the home appraises at the purchase price). We'll advise on which contingencies make sense for your situation while keeping your offer competitive.",
  },
];

export default function FAQPage() {
  // Combine all FAQs for schema
  const allFaqs = [...generalFaqs, ...buyerFaqs, ...sellerFaqs, ...processFaqs];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <main>
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Section */}
      <Hero
        badge="FAQ"
        title="Your Questions, Answered"
        highlightedWord="Answered"
        description="We know the home buying and selling process can be confusing. Here are answers to the most common questions we hear from Kansas City families."
        centered={true}
        backgroundImage="/properties/KC Home Image 2.jpg"
      />

      {/* General FAQs */}
      <SectionWrapper background="white" id="general">
        <SectionHeader
          badge="General"
          title="About Working With Us"
          highlightedWord="Working"
          description="Common questions about KC Family Home Team and our services."
        />
        <FAQSection items={generalFaqs} />
      </SectionWrapper>

      {/* Buyer FAQs */}
      <SectionWrapper background="cream" id="buyers">
        <SectionHeader
          badge="For Buyers"
          title="Home Buying Questions"
          highlightedWord="Buying"
          description="Everything you need to know about purchasing a home in Kansas City."
        />
        <FAQSection items={buyerFaqs} />
      </SectionWrapper>

      {/* Seller FAQs */}
      <SectionWrapper background="white" id="sellers">
        <SectionHeader
          badge="For Sellers"
          title="Home Selling Questions"
          highlightedWord="Selling"
          description="Common questions about listing and selling your Kansas City home."
        />
        <FAQSection items={sellerFaqs} />
      </SectionWrapper>

      {/* Process FAQs */}
      <SectionWrapper background="cream" id="process">
        <SectionHeader
          badge="The Process"
          title="Transaction Questions"
          highlightedWord="Transaction"
          description="Questions about the mechanics of buying and selling real estate."
        />
        <FAQSection items={processFaqs} />
      </SectionWrapper>

      {/* Still Have Questions CTA */}
      <SectionWrapper background="white">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            We&apos;re here to help! Every situation is unique, and we&apos;re happy to
            discuss your specific questions and circumstances.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </a>
            <a
              href="tel:+18165757763"
              className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary font-semibold rounded-full hover:bg-primary/5 transition-colors"
            >
              Call (816) 575-7763
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <CTASection
        badge="Ready to Begin?"
        title="Let's Start Your Journey"
        highlightedWord="Journey"
        description="Now that you know the basics, let's talk about your specific goals. Every family's situation is unique, and we're here to help."
        primaryCTA={{ text: "Get Started", href: "/contact" }}
        secondaryCTA={{ text: "Take Questionnaire", href: "https://intake.kcfhomes.com/questionnaire" }}
        variant="centered"
      />
    </main>
  );
}

import { ServicePage } from '@/types/service';

export const services: ServicePage[] = [
  {
    slug: 'buying-homes-kansas-city',
    name: 'Home Buying Services',
    tagline: 'Find Your Perfect Family Home in Kansas City',
    description:
      'Expert guidance for Kansas City home buyers. From neighborhood selection to closing day, we make buying your dream home simple and stress-free.',
    heroSubtitle:
      'Work with Kansas City\'s top family-focused real estate team to find and secure your perfect home',

    // SEO
    metaTitle: 'Kansas City Home Buying Services | Expert Buyer Agents',
    metaDescription:
      'Looking to buy a home in Kansas City? Our expert buyer agents help families find perfect homes in top neighborhoods. Free consultations, local expertise, 500+ families served.',
    targetKeyword: 'buying a home in Kansas City',
    keywords: [
      'Kansas City home buyers',
      'buy house Kansas City',
      'Kansas City buyer agent',
      'home buying services Kansas City',
      'real estate buyer agent KC',
    ],

    processSteps: [
      {
        number: '01',
        title: 'Free Consultation',
        description:
          'We start by understanding your needs, budget, timeline, and must-haves. This helps us create a personalized home search strategy.',
        icon: 'users',
      },
      {
        number: '02',
        title: 'Get Pre-Approved',
        description:
          'We connect you with trusted local lenders who offer competitive rates. Pre-approval shows sellers you\'re a serious buyer.',
        icon: 'file-check',
      },
      {
        number: '03',
        title: 'Home Search',
        description:
          'We curate listings that match your criteria and schedule tours. Our local expertise helps you find hidden gems before they hit the market.',
        icon: 'search',
      },
      {
        number: '04',
        title: 'Make an Offer',
        description:
          'When you find "the one," we analyze comparable sales and craft a competitive offer that protects your interests.',
        icon: 'file-text',
      },
      {
        number: '05',
        title: 'Inspection & Negotiation',
        description:
          'We coordinate professional inspections and negotiate repairs or credits on your behalf to ensure you\'re getting a great home.',
        icon: 'shield',
      },
      {
        number: '06',
        title: 'Close on Your Home',
        description:
          'We handle all the details leading to closing day. Then we hand you the keys to your new home and celebrate your success!',
        icon: 'key',
      },
    ],

    benefits: [
      {
        title: 'Local Market Expertise',
        description:
          'We know every Kansas City neighborhood intimately - from school ratings to hidden issues other agents miss.',
        icon: 'map',
      },
      {
        title: 'Exclusive Access',
        description:
          'Get early access to listings before they hit the market through our extensive network of local agents.',
        icon: 'star',
      },
      {
        title: 'Skilled Negotiation',
        description:
          'We\'ve negotiated hundreds of deals and know how to get you the best price and terms.',
        icon: 'trending-down',
      },
      {
        title: 'Family-Focused Guidance',
        description:
          'We help families find homes near top schools, parks, and amenities that matter most to growing families.',
        icon: 'heart',
      },
      {
        title: 'No Cost to You',
        description:
          'Buyer agents are paid by the seller - you get expert representation at zero cost.',
        icon: 'dollar-sign',
      },
      {
        title: 'White-Glove Service',
        description:
          'From lender recommendations to moving company referrals, we support you through every step.',
        icon: 'sparkles',
      },
    ],

    stats: [
      { label: 'Avg. Time to Find Home', value: '3-4 wks' },
      { label: 'Buyer Satisfaction', value: '99%' },
      { label: 'Homes Purchased', value: '400+' },
      { label: 'Avg. Savings', value: '$8,500' },
    ],

    faqs: [
      {
        question: 'Do I need to pay a buyer\'s agent?',
        answer:
          'No! In Kansas City, the seller typically pays both the listing agent and buyer\'s agent commissions. You get professional representation at no cost to you.',
      },
      {
        question: 'How long does it take to buy a home in Kansas City?',
        answer:
          'Most buyers find their home within 3-4 weeks of starting their search. From accepted offer to closing typically takes 30-45 days. The entire process averages 2-3 months.',
      },
      {
        question: 'Should I get pre-approved before house hunting?',
        answer:
          'Absolutely! Pre-approval shows sellers you\'re a serious buyer and helps you understand your true budget. In competitive situations, sellers often won\'t consider offers without pre-approval.',
      },
      {
        question: 'What if I need to sell my current home first?',
        answer:
          'We specialize in coordinating simultaneous transactions. We can help you sell your current home while finding your next one, minimizing stress and double-moving.',
      },
      {
        question: 'Can I buy a home with less than 20% down?',
        answer:
          'Yes! Many first-time buyers put down just 3-5%. FHA loans require only 3.5% down, and VA loans offer 0% down for veterans. We\'ll connect you with lenders who offer these programs.',
      },
    ],

    testimonials: [
      {
        name: 'Sarah & Mike Johnson',
        role: 'First-Time Buyers - Overland Park',
        content:
          'Ernesto and his team made buying our first home so easy. They explained everything clearly and helped us find the perfect home in the perfect neighborhood for our family.',
        rating: 5,
      },
      {
        name: 'David Chen',
        role: 'Buyer - Lee\'s Summit',
        content:
          'I was relocating from California and didn\'t know Kansas City at all. The team took me on neighborhood tours, explained the differences, and helped me find a great home near excellent schools.',
        rating: 5,
      },
    ],

    relatedNeighborhoods: ['overland-park', 'lees-summit', 'brookside', 'waldo'],
    relatedBlogPosts: ['first-time-home-buyer-guide-kansas-city-families'],

    primaryCTA: {
      text: 'Start Your Home Search',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'View Neighborhoods',
      href: '/neighborhoods',
    },
  },

  {
    slug: 'selling-homes-kansas-city',
    name: 'Home Selling Services',
    tagline: 'Sell Your Kansas City Home Fast & For Top Dollar',
    description:
      'Expert listing services for Kansas City homeowners. Professional marketing, strategic pricing, and skilled negotiation to get you the best price in the shortest time.',
    heroSubtitle:
      'Proven strategies that help Kansas City families sell their homes quickly while maximizing their profits',

    // SEO
    metaTitle: 'Sell Your Home in Kansas City | Expert Listing Agent Services',
    metaDescription:
      'Sell your Kansas City home for top dollar. Our expert listing agents use professional marketing, strategic pricing, and skilled negotiation. Free home valuation. Call today!',
    targetKeyword: 'selling a home in Kansas City',
    keywords: [
      'sell home Kansas City',
      'Kansas City listing agent',
      'sell house fast Kansas City',
      'home selling services KC',
      'real estate agent Kansas City sellers',
    ],

    processSteps: [
      {
        number: '01',
        title: 'Free Home Valuation',
        description:
          'We analyze recent sales, market trends, and your home\'s unique features to determine the optimal listing price.',
        icon: 'home',
      },
      {
        number: '02',
        title: 'Prepare Your Home',
        description:
          'We provide guidance on repairs, staging, and improvements that will maximize your return on investment.',
        icon: 'hammer',
      },
      {
        number: '03',
        title: 'Professional Marketing',
        description:
          'Professional photography, video tours, and targeted advertising across all major platforms to reach serious buyers.',
        icon: 'camera',
      },
      {
        number: '04',
        title: 'Show Your Home',
        description:
          'We coordinate showings, host open houses, and collect buyer feedback to optimize your sale strategy.',
        icon: 'calendar',
      },
      {
        number: '05',
        title: 'Review & Negotiate Offers',
        description:
          'We evaluate all offers, negotiate the best terms, and guide you through counteroffers to maximize your net proceeds.',
        icon: 'trending-up',
      },
      {
        number: '06',
        title: 'Close the Deal',
        description:
          'We manage inspections, appraisals, and all closing details to ensure a smooth transaction from contract to keys.',
        icon: 'check-circle',
      },
    ],

    benefits: [
      {
        title: 'Strategic Pricing',
        description:
          'Our pricing strategy attracts multiple offers while maximizing your sale price. Homes priced right sell 21% faster.',
        icon: 'target',
      },
      {
        title: 'Professional Marketing',
        description:
          'Professional photos, 3D tours, drone footage, and targeted ads ensure your home stands out from the competition.',
        icon: 'megaphone',
      },
      {
        title: 'Maximum Exposure',
        description:
          'Your home is marketed on all major sites (Zillow, Realtor.com, etc.) plus our network of 300+ local agents.',
        icon: 'users',
      },
      {
        title: 'Expert Staging Advice',
        description:
          'Staged homes sell 73% faster and for 5-10% more. We guide you on how to present your home perfectly.',
        icon: 'layout',
      },
      {
        title: 'Skilled Negotiation',
        description:
          'We\'ve closed hundreds of transactions and know how to negotiate the best price and terms for sellers.',
        icon: 'shield',
      },
      {
        title: 'Smooth Transactions',
        description:
          'Our transaction coordinator handles all details so nothing falls through the cracks from contract to closing.',
        icon: 'check',
      },
    ],

    stats: [
      { label: 'Avg. Days on Market', value: '18 days' },
      { label: 'Sale Price vs List Price', value: '99.2%' },
      { label: 'Homes Sold', value: '500+' },
      { label: 'Seller Satisfaction', value: '98%' },
    ],

    faqs: [
      {
        question: 'How much does it cost to sell a home in Kansas City?',
        answer:
          'Typical costs include agent commission (5-6% of sale price, split between both agents), title insurance, and transfer taxes. On a $400K home, expect total costs of $25,000-$30,000.',
      },
      {
        question: 'How long will it take to sell my home?',
        answer:
          'Homes priced correctly typically sell within 14-21 days in Kansas City. From listing to closing averages 45-60 days total. Our homes sell faster than the KC average.',
      },
      {
        question: 'Should I make repairs before listing?',
        answer:
          'We recommend fixing obvious problems and refreshing paint. Major renovations typically don\'t provide full ROI. We\'ll advise you on which improvements make sense for your situation.',
      },
      {
        question: 'What if my home doesn\'t sell?',
        answer:
          'If priced correctly and marketed well, this rarely happens. If needed, we\'ll re-evaluate pricing, make adjustments to staging/photos, and refresh the marketing strategy.',
      },
      {
        question: 'Can I sell and buy at the same time?',
        answer:
          'Yes! We specialize in coordinating both transactions. Options include contingency offers, rent-back agreements, or bridge loans. We make it seamless.',
      },
    ],

    testimonials: [
      {
        name: 'Jennifer Martinez',
        role: 'Seller - Brookside',
        content:
          'Our home sold in 6 days with 3 offers! The professional photos and marketing were incredible. Ernesto negotiated $15K over asking price. Couldn\'t be happier!',
        rating: 5,
      },
      {
        name: 'Robert & Linda Thompson',
        role: 'Sellers - Lee\'s Summit',
        content:
          'We were nervous about selling, but the team handled everything. The staging advice, professional photos, and constant communication made it stress-free.',
        rating: 5,
      },
    ],

    relatedNeighborhoods: ['overland-park', 'lees-summit', 'blue-springs'],
    relatedBlogPosts: ['how-to-sell-home-fast-kansas-city'],

    primaryCTA: {
      text: 'Get Free Home Valuation',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'See Selling Process',
      href: '/how-it-works',
    },
  },

  {
    slug: 'first-time-home-buyers',
    name: 'First-Time Home Buyer Services',
    tagline: 'Your Guide to Buying Your First Kansas City Home',
    description:
      'Specialized support for first-time home buyers in Kansas City. We simplify the process, answer all your questions, and help you avoid costly mistakes.',
    heroSubtitle:
      'Make your first home purchase confident and stress-free with expert guidance every step of the way',

    // SEO
    metaTitle: 'First-Time Home Buyers Kansas City | Expert Guidance & Support',
    metaDescription:
      'First-time home buyer in Kansas City? We specialize in helping first-timers navigate the process. Low down payment options, buyer education, and personalized support.',
    targetKeyword: 'first time home buyer Kansas City',
    keywords: [
      'first time home buyer Kansas City',
      'first home buyer KC',
      'Kansas City first time buyer programs',
      'first home buyer assistance KC',
      'new home buyer Kansas City',
    ],

    processSteps: [
      {
        number: '01',
        title: 'First-Time Buyer Education',
        description:
          'We explain the entire process in plain English - no confusing jargon. You\'ll understand exactly what to expect at each stage.',
        icon: 'book-open',
      },
      {
        number: '02',
        title: 'Budget Planning',
        description:
          'We help you understand what you can afford, including down payment options as low as 3% and first-time buyer programs.',
        icon: 'calculator',
      },
      {
        number: '03',
        title: 'Lender Connection',
        description:
          'We connect you with lenders who specialize in first-time buyers and offer FHA, conventional, and down payment assistance programs.',
        icon: 'building',
      },
      {
        number: '04',
        title: 'Neighborhood Selection',
        description:
          'We help you identify neighborhoods that match your lifestyle, commute, and budget - from urban walkable to family suburban.',
        icon: 'map-pin',
      },
      {
        number: '05',
        title: 'Home Tours & Education',
        description:
          'During tours, we point out important details - from foundation issues to great features - helping you learn what to look for.',
        icon: 'eye',
      },
      {
        number: '06',
        title: 'Offer to Closing Support',
        description:
          'We guide you through offers, inspections, and closing - answering questions and ensuring you understand each document.',
        icon: 'clipboard-check',
      },
    ],

    benefits: [
      {
        title: 'Patient Guidance',
        description:
          'We understand first-time buyers have lots of questions. We take the time to explain everything clearly without rushing you.',
        icon: 'clock',
      },
      {
        title: 'Down Payment Assistance',
        description:
          'We help you explore FHA loans (3.5% down), conventional loans (3% down), and local down payment assistance programs.',
        icon: 'piggy-bank',
      },
      {
        title: 'Budget Protection',
        description:
          'We help you buy within your means - considering not just mortgage but taxes, insurance, and maintenance costs.',
        icon: 'shield-check',
      },
      {
        title: 'Avoid Costly Mistakes',
        description:
          'Our experience helps you avoid common first-time buyer mistakes that can cost thousands or cause regret later.',
        icon: 'alert-triangle',
      },
      {
        title: 'Inspection Expertise',
        description:
          'We help you understand inspection reports and determine which issues are deal-breakers versus minor fixes.',
        icon: 'clipboard',
      },
      {
        title: 'Long-Term Thinking',
        description:
          'We help you consider resale value and growth potential so your first home is also a smart investment.',
        icon: 'trending-up',
      },
    ],

    stats: [
      { label: 'First-Time Buyers Helped', value: '250+' },
      { label: 'Client Satisfaction', value: '99%' },
      { label: 'Avg. Down Payment', value: '4.5%' },
      { label: 'Questions Answered', value: '1000s' },
    ],

    faqs: [
      {
        question: 'How much do I really need saved to buy my first home?',
        answer:
          'For a $350K home with 3.5% down (FHA loan), you need about $12,250 for down payment, $7,000-$10,000 for closing costs, plus $6,000 in reserves. Total: $25,000-$28,000. Some programs offer even lower down payment options.',
      },
      {
        question: 'What credit score do I need to buy a home?',
        answer:
          'FHA loans require a minimum 580 credit score (500 with 10% down). Conventional loans typically require 620+. Higher scores get better interest rates. We can recommend credit repair services if needed.',
      },
      {
        question: 'Can I buy a home with student loan debt?',
        answer:
          'Yes! Lenders look at your debt-to-income ratio. As long as your total monthly debts (including the new mortgage) are below 43-45% of your gross monthly income, you can qualify.',
      },
      {
        question: 'Should I use a first-time home buyer program?',
        answer:
          'Many first-time buyers benefit from these programs which offer down payment assistance, closing cost help, or better rates. We\'ll connect you with lenders who know which programs you qualify for.',
      },
      {
        question: 'How long does the first-time home buying process take?',
        answer:
          'From starting your search to closing typically takes 2-4 months. Finding the right home averages 3-6 weeks, then 30-45 days from accepted offer to closing. We\'ll keep you on track.',
      },
    ],

    testimonials: [
      {
        name: 'Jessica & Tom Williams',
        role: 'First-Time Buyers - Waldo',
        content:
          'We were so overwhelmed at first, but Ernesto made everything simple. He answered our million questions patiently and helped us find an amazing home in our budget!',
        rating: 5,
      },
      {
        name: 'Amanda Rodriguez',
        role: 'First-Time Buyer - Liberty',
        content:
          'As a single first-time buyer, I was nervous about the process. The team held my hand through everything and I closed on my dream home with just 3.5% down!',
        rating: 5,
      },
    ],

    relatedNeighborhoods: ['waldo', 'blue-springs', 'liberty', 'northland'],
    relatedBlogPosts: ['first-time-home-buyer-guide-kansas-city-families'],

    primaryCTA: {
      text: 'Start Your First-Time Buyer Journey',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'Read First-Time Buyer Guide',
      href: '/blog/first-time-home-buyer-guide-kansas-city-families',
    },
  },

  {
    slug: 'home-valuation',
    name: 'Home Valuation Services',
    tagline: 'What\'s Your Kansas City Home Really Worth?',
    description:
      'Get an accurate, professional home valuation from Kansas City\'s top real estate experts. Free, no-obligation analysis of your home\'s current market value.',
    heroSubtitle:
      'Discover your home\'s true market value with a comprehensive analysis from experienced local agents',

    // SEO
    metaTitle: 'Free Home Valuation Kansas City | What\'s Your Home Worth?',
    metaDescription:
      'Get a free, accurate home valuation in Kansas City. Our expert agents analyze recent sales, market trends, and your home\'s features. Know your home\'s value today!',
    targetKeyword: 'home valuation Kansas City',
    keywords: [
      'home valuation Kansas City',
      'what is my home worth KC',
      'Kansas City home value',
      'home appraisal Kansas City',
      'property value Kansas City',
    ],

    processSteps: [
      {
        number: '01',
        title: 'Request Your Valuation',
        description:
          'Fill out our simple form or call us. We\'ll schedule a time that works for your schedule - evenings and weekends available.',
        icon: 'phone',
      },
      {
        number: '02',
        title: 'Home Analysis',
        description:
          'We research recent comparable sales, analyze current market conditions, and review your home\'s unique features and updates.',
        icon: 'search',
      },
      {
        number: '03',
        title: 'Property Visit',
        description:
          'We visit your home to assess condition, upgrades, and features that online tools can\'t capture. This takes about 20-30 minutes.',
        icon: 'home',
      },
      {
        number: '04',
        title: 'Receive Your Report',
        description:
          'We provide a detailed valuation report with comparable sales, market trends, and estimated value range for your home.',
        icon: 'file-text',
      },
      {
        number: '05',
        title: 'Review & Discussion',
        description:
          'We walk through the valuation together, answer questions, and discuss what factors are impacting your home\'s value.',
        icon: 'message-circle',
      },
      {
        number: '06',
        title: 'No Obligation',
        description:
          'The valuation is completely free with no pressure to list. Use it for refinancing, estate planning, or just curiosity.',
        icon: 'check',
      },
    ],

    benefits: [
      {
        title: 'Accurate Market Analysis',
        description:
          'Unlike online estimates that can be off by 10-20%, our valuations consider your home\'s actual condition and features.',
        icon: 'target',
      },
      {
        title: 'Local Expertise',
        description:
          'We know every Kansas City neighborhood intimately and understand the subtle factors that impact home values.',
        icon: 'map',
      },
      {
        title: 'Current Market Data',
        description:
          'We analyze the most recent sales and current listings to give you an accurate picture of today\'s market.',
        icon: 'trending-up',
      },
      {
        title: 'Completely Free',
        description:
          'There\'s no cost for our professional home valuation service and absolutely no obligation to list with us.',
        icon: 'dollar-sign',
      },
      {
        title: 'Selling Strategy',
        description:
          'If you\'re considering selling, we\'ll discuss improvements that maximize ROI and optimal timing for your sale.',
        icon: 'calendar',
      },
      {
        title: 'Multiple Use Cases',
        description:
          'Use your valuation for selling decisions, refinancing, estate planning, divorce settlements, or curiosity.',
        icon: 'briefcase',
      },
    ],

    stats: [
      { label: 'Valuations Completed', value: '1,000+' },
      { label: 'Accuracy Rate', value: '98%' },
      { label: 'Avg. Turnaround', value: '48 hrs' },
      { label: 'Client Satisfaction', value: '100%' },
    ],

    faqs: [
      {
        question: 'How accurate are online home value estimates?',
        answer:
          'Online estimates (Zillow, Redfin) can be off by 10-20% because they don\'t know your home\'s actual condition, updates, or unique features. Our in-person valuations are 98% accurate.',
      },
      {
        question: 'Is there really no cost or obligation?',
        answer:
          'Absolutely! Our home valuations are completely free with zero obligation. Many homeowners get valuations for refinancing, estate planning, or simply to know their equity.',
      },
      {
        question: 'How long does the valuation process take?',
        answer:
          'The home visit takes 20-30 minutes. We typically deliver your detailed valuation report within 48 hours of visiting your home.',
      },
      {
        question: 'What information do you need from me?',
        answer:
          'Just your address and contact info initially. During the visit, we\'ll ask about any updates or improvements you\'ve made (new roof, HVAC, kitchen remodel, etc.).',
      },
      {
        question: 'Will you try to pressure me to sell?',
        answer:
          'Never. We understand homeowners request valuations for many reasons. If you\'re interested in selling, we\'re happy to discuss it. If not, that\'s perfectly fine.',
      },
    ],

    testimonials: [
      {
        name: 'Michael Stevens',
        role: 'Homeowner - Overland Park',
        content:
          'I needed a valuation for refinancing. Ernesto came out, thoroughly assessed my home, and provided a detailed report in 2 days. Much more accurate than Zillow!',
        rating: 5,
      },
      {
        name: 'Patricia Kim',
        role: 'Homeowner - Brookside',
        content:
          'I was curious what my home was worth after 5 years. The valuation was professional, detailed, and they never pressured me to list. Great service!',
        rating: 5,
      },
    ],

    relatedNeighborhoods: ['overland-park', 'lees-summit', 'brookside'],
    relatedBlogPosts: ['how-to-sell-home-fast-kansas-city'],

    primaryCTA: {
      text: 'Get Free Home Valuation',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'Learn About Selling',
      href: '/services/selling-homes-kansas-city',
    },
  },

  {
    slug: 'investment-properties',
    name: 'Investment Property Services',
    tagline: 'Build Wealth Through Kansas City Real Estate',
    description:
      'Expert guidance for Kansas City real estate investors. From finding cash-flowing rentals to building a property portfolio, we help investors maximize returns.',
    heroSubtitle:
      'Partner with Kansas City\'s investment property specialists to build and grow your real estate portfolio',

    // SEO
    metaTitle: 'Kansas City Investment Property Services | Real Estate Investing',
    metaDescription:
      'Looking for investment properties in Kansas City? Our experts help investors find cash-flowing rentals, fix-and-flip opportunities, and build profitable portfolios.',
    targetKeyword: 'investment property Kansas City',
    keywords: [
      'investment property Kansas City',
      'Kansas City rental property',
      'real estate investing KC',
      'buy rental property Kansas City',
      'Kansas City investment real estate',
    ],

    processSteps: [
      {
        number: '01',
        title: 'Investment Goals Discussion',
        description:
          'We understand your investment strategy - buy and hold, fix and flip, cash flow, or appreciation. Your goals drive our search.',
        icon: 'target',
      },
      {
        number: '02',
        title: 'Market Analysis',
        description:
          'We identify the best Kansas City neighborhoods for your strategy, analyzing cap rates, rental demand, and appreciation trends.',
        icon: 'bar-chart',
      },
      {
        number: '03',
        title: 'Property Sourcing',
        description:
          'We find off-market deals and distressed properties before they hit the MLS, giving you first access to great opportunities.',
        icon: 'search',
      },
      {
        number: '04',
        title: 'Financial Analysis',
        description:
          'We provide detailed cash flow projections, cap rate calculations, and ROI analysis for every property you consider.',
        icon: 'calculator',
      },
      {
        number: '05',
        title: 'Due Diligence',
        description:
          'Thorough inspections, rent comps, tenant screening, and title work to ensure you\'re making a sound investment.',
        icon: 'clipboard-check',
      },
      {
        number: '06',
        title: 'Property Management',
        description:
          'We connect you with trusted property managers or help you manage it yourself - whatever fits your strategy.',
        icon: 'users',
      },
    ],

    benefits: [
      {
        title: 'Investment Expertise',
        description:
          'We\'re investors ourselves and understand cap rates, cash-on-cash returns, and what makes a property profitable.',
        icon: 'lightbulb',
      },
      {
        title: 'Off-Market Access',
        description:
          'Our network gives you access to distressed properties and off-market deals before other investors see them.',
        icon: 'key',
      },
      {
        title: 'Neighborhood Analysis',
        description:
          'We know which KC neighborhoods have strong rental demand, appreciation potential, and investor-friendly environments.',
        icon: 'map',
      },
      {
        title: 'Numbers-Driven Approach',
        description:
          'Every property comes with detailed financial analysis so you can make data-driven investment decisions.',
        icon: 'trending-up',
      },
      {
        title: 'Contractor Network',
        description:
          'We connect you with reliable contractors for rehabs, offering competitive pricing through our established relationships.',
        icon: 'hammer',
      },
      {
        title: 'Portfolio Building',
        description:
          'Whether it\'s your first rental or your 10th, we help you build a diversified Kansas City investment portfolio.',
        icon: 'layers',
      },
    ],

    stats: [
      { label: 'Investment Properties Sold', value: '200+' },
      { label: 'Avg. Cap Rate', value: '8.2%' },
      { label: 'Repeat Investors', value: '85%' },
      { label: 'Off-Market Deals', value: '40%' },
    ],

    faqs: [
      {
        question: 'What makes a good investment property in Kansas City?',
        answer:
          'Look for properties with 1% rule (monthly rent = 1% of purchase price), good neighborhoods with rental demand, low vacancy rates, and properties that cash flow after all expenses. We help you find these.',
      },
      {
        question: 'What\'s the average return on Kansas City rental properties?',
        answer:
          'Kansas City offers some of the best investment returns in the country. Cap rates typically range from 7-10%, with cash-on-cash returns of 8-12% depending on financing and property type.',
      },
      {
        question: 'Should I manage the property myself or hire a property manager?',
        answer:
          'It depends on your time, experience, and number of properties. Property managers charge 8-10% of monthly rent but handle everything. For out-of-state investors, managers are essential.',
      },
      {
        question: 'Can I invest in Kansas City real estate from out of state?',
        answer:
          'Absolutely! Kansas City is a top market for out-of-state investors due to affordable prices and strong returns. We work with many investors from California, New York, and other high-cost markets.',
      },
      {
        question: 'What are the best Kansas City neighborhoods for rental properties?',
        answer:
          'Top neighborhoods for rentals include areas near major employers, universities, and hospitals. Blue Springs, Lee\'s Summit, and Independence offer great cash flow. We\'ll match neighborhoods to your strategy.',
      },
    ],

    testimonials: [
      {
        name: 'James Patterson',
        role: 'Real Estate Investor - 12 Properties',
        content:
          'I\'ve purchased 8 investment properties through Ernesto\'s team. Their market knowledge and off-market deal flow have been invaluable to building my portfolio.',
        rating: 5,
      },
      {
        name: 'Lisa Chen',
        role: 'Out-of-State Investor - California',
        content:
          'I live in San Francisco but wanted to invest where prices made sense. The team helped me buy 3 cash-flowing rentals in KC. Everything is remotely managed perfectly!',
        rating: 5,
      },
    ],

    relatedNeighborhoods: ['blue-springs', 'lees-summit', 'liberty', 'northland'],
    relatedBlogPosts: [],

    primaryCTA: {
      text: 'Start Investing in Kansas City',
      href: '/contact',
    },
    secondaryCTA: {
      text: 'View Investment Areas',
      href: '/neighborhoods',
    },
  },
];

// Helper functions
export function getServiceBySlug(slug: string): ServicePage | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

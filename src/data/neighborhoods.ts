import { Neighborhood } from '@/types/neighborhood';

export const neighborhoods: Neighborhood[] = [
  {
    // Basic Info
    name: 'Overland Park',
    slug: 'overland-park',
    tagline: 'Top-Rated Schools & Family-Friendly Living',
    description: 'Overland Park is one of Kansas City\'s most sought-after suburban communities, known for its excellent schools, beautiful parks, and family-oriented atmosphere.',

    // SEO
    metaTitle: 'Overland Park Homes for Sale | Family-Friendly Kansas City Real Estate',
    metaDescription: 'Find your perfect family home in Overland Park, Kansas City. Top-rated schools, safe neighborhoods, and excellent amenities. Expert local real estate agents.',
    targetKeyword: 'homes for sale Overland Park families',
    keywordDifficulty: 38,
    priority: 'HIGH',

    // Hero
    heroImage: '/images/neighborhoods/overland-park-hero.jpg',
    heroImageAlt: 'Beautiful family homes in Overland Park, Kansas City',

    // Overview
    whyFamiliesLoveIt: [
      'Consistently ranked among the best places to live in America',
      'Blue Valley School District - one of the highest-rated in Kansas',
      'Over 80 parks and 1,800 acres of parkland',
      'Safe, walkable neighborhoods with strong community feel',
      'Easy access to shopping, dining, and entertainment',
      'Family-friendly events and festivals year-round',
    ],

    // Schools
    schools: [
      {
        name: 'Blue Valley Northwest High School',
        type: 'High',
        rating: 9,
        district: 'Blue Valley USD 229',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Overland Park Arboretum & Botanical Gardens',
        type: 'Park',
        description: '300-acre park with walking trails, gardens, and natural areas perfect for families',
      },
      {
        name: 'Deanna Rose Children\'s Farmstead',
        type: 'Park',
        description: 'Interactive farmstead with animals, gardens, and educational programs for kids',
      },
      {
        name: 'South Lake Park',
        type: 'Park',
        description: '14-acre community park with playgrounds, sports fields, fishing lake, and picnic areas',
      },
      {
        name: 'Matt Ross Community Center',
        type: 'Community Center',
        description: 'State-of-the-art facility with pools, fitness center, and family programs',
      },
    ],

    otherAmenities: [
      {
        name: 'Oak Park Mall',
        type: 'Shopping',
        description: 'Premier shopping destination with 180+ stores and dining options',
      },
      {
        name: 'Overland Park Library',
        type: 'Library',
        description: 'Modern library with extensive children\'s programs and resources',
      },
      {
        name: 'Prairiefire',
        type: 'Shopping',
        description: 'Upscale mixed-use development with shopping, dining, and entertainment',
      },
    ],

    // Stats
    stats: {
      medianPrice: 475000,
      population: 203000,
      walkabilityScore: 35,
    },

    // Local Insights
    insights: [
      {
        title: 'Farmer\'s Market Every Saturday',
        description: 'The Overland Park Farmer\'s Market runs April-November with local produce, crafts, and live music - a family favorite!',
        category: 'Event',
      },
      {
        title: 'Best Pizza: Minsky\'s Pizza',
        description: 'Local chain started in Kansas City, family-friendly atmosphere with great pizza that kids love.',
        category: 'Restaurant',
      },
      {
        title: 'Hidden Gem: Tomahawk Creek Trail',
        description: '10+ mile paved trail perfect for family bike rides, connecting multiple parks and neighborhoods.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Overland Park',
    state: 'Kansas',
    county: 'Johnson County',
  },
  {
    // Basic Info
    name: 'Lee\'s Summit',
    slug: 'lees-summit',
    tagline: 'Charming Downtown & Excellent Schools',
    description: 'Lee\'s Summit combines small-town charm with big-city amenities, offering families a vibrant downtown, top-rated schools, and a strong sense of community.',

    // SEO
    metaTitle: 'Lee\'s Summit Homes for Sale | Family Neighborhoods Kansas City',
    metaDescription: 'Discover family-friendly homes in Lee\'s Summit, Kansas City. Award-winning schools, historic downtown, and safe neighborhoods. Start your home search today.',
    targetKeyword: 'family homes Lee\'s Summit Kansas City',
    keywordDifficulty: 32,
    priority: 'HIGH',

    // Hero
    heroImage: '/images/neighborhoods/lees-summit-hero.jpg',
    heroImageAlt: 'Family-friendly neighborhoods in Lee\'s Summit, Kansas City',

    // Overview
    whyFamiliesLoveIt: [
      'Award-winning Lee\'s Summit R-7 School District',
      'Charming historic downtown with local shops and restaurants',
      'More than 30 parks covering 1,200 acres',
      'Low crime rates and safe, walkable neighborhoods',
      'Strong community events and family activities year-round',
      'Affordable housing compared to other Kansas City suburbs',
    ],

    // Schools
    schools: [
      {
        name: 'Summit Pointe Elementary',
        type: 'Elementary',
        rating: 6,
        district: 'Lee\'s Summit R-7',
      },
      {
        name: 'Bernard C. Campbell Middle School',
        type: 'Middle',
        rating: 4,
        district: 'Lee\'s Summit R-7',
      },
      {
        name: 'Lee\'s Summit West High School',
        type: 'High',
        rating: 7,
        district: 'Lee\'s Summit R-7',
      },
      {
        name: 'Lee\'s Summit North High School',
        type: 'High',
        rating: 8,
        district: 'Lee\'s Summit R-7',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Legacy Park',
        type: 'Park',
        description: 'Sprawling park with J. Thomas Lovell Jr. Community Center featuring indoor aquatics and walking trails',
      },
      {
        name: 'Harris Park - Summit Waves',
        type: 'Pool',
        description: 'Outdoor water park with slides, lazy river, lap pool, and family play areas - open seasonally',
      },
    ],

    otherAmenities: [
      {
        name: 'Historic Downtown Lee\'s Summit',
        type: 'Shopping',
        description: 'Walkable downtown with local boutiques, restaurants, and farmers market',
      },
      {
        name: 'Summit Fair Shopping Center',
        type: 'Shopping',
        description: 'Large shopping center with Target, Dillard\'s, and family restaurants',
      },
    ],

    // Stats
    stats: {
      medianPrice: 365000,
      population: 106000,
      walkabilityScore: 20,
    },

    // Local Insights
    insights: [
      {
        title: 'Downtown Farmer\'s Market',
        description: 'Every Saturday and Wednesday, April-October, featuring 50+ local vendors with fresh produce, farm eggs, meat, and handmade goods - a family tradition!',
        category: 'Event',
      },
      {
        title: 'Best BBQ: Jack Stack Barbecue',
        description: 'Award-winning Kansas City BBQ with family-friendly atmosphere and famous burnt ends - consistently rated among the best in the country.',
        category: 'Restaurant',
      },
      {
        title: 'Hidden Gem: James A. Reed Wildlife Area',
        description: 'Over 3,000 acres of wildlife habitat with trails perfect for family hikes, bird watching, and exploring nature - a peaceful escape from the city.',
        category: 'Hidden Gem',
      },
      {
        title: 'Legacy Blast Fourth of July',
        description: 'Annual free celebration at Legacy Park featuring 1,000+ fireworks, food trucks, live music, inflatables, and face painting - feels like a giant family picnic!',
        category: 'Event',
      },
    ],

    // Location
    city: 'Lee\'s Summit',
    state: 'Missouri',
    county: 'Jackson County',
  },
  {
    // Basic Info
    name: 'Brookside',
    slug: 'brookside',
    tagline: 'Walkable Urban Village in the Heart of KC',
    description: 'Brookside is Kansas City\'s premier walkable neighborhood, featuring tree-lined streets, local shops, excellent schools, and a tight-knit community perfect for families.',

    // SEO
    metaTitle: 'Brookside Kansas City Homes | Walkable Family Neighborhoods',
    metaDescription: 'Explore homes in Brookside, Kansas City\'s most walkable family neighborhood. Local shops, top schools, and strong community. Find your perfect home today.',
    targetKeyword: 'Brookside Kansas City walkable neighborhoods',
    keywordDifficulty: 35,
    priority: 'HIGH',

    // Hero
    heroImage: '/images/neighborhoods/brookside-hero.jpg',
    heroImageAlt: 'Charming walkable streets in Brookside, Kansas City',

    // Overview
    whyFamiliesLoveIt: [
      'Highly walkable - walk to shops, restaurants, and schools',
      'Tree-lined streets with historic architecture',
      'Local independent shops and restaurants within blocks',
      'Strong neighborhood association and community events',
      'Proximity to Country Club Plaza and downtown KC',
      'Excellent elementary school within walking distance',
    ],

    // Schools
    schools: [
      {
        name: 'Brookside Charter School',
        type: 'Elementary',
        rating: 5,
        district: 'Kansas City Public Schools',
      },
      {
        name: 'Barstow School',
        type: 'Elementary',
        rating: 9.5,
        district: 'Private',
      },
      {
        name: 'Pembroke Hill School',
        type: 'High',
        rating: 9.7,
        district: 'Private',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Brookside Park',
        type: 'Park',
        description: 'Neighborhood park with playground, walking trails, and open space for family activities',
      },
      {
        name: 'Loose Park',
        type: 'Park',
        description: 'Iconic Kansas City park with rose garden, playground, and wide open spaces - just minutes away',
      },
    ],

    otherAmenities: [
      {
        name: 'Brookside Shopping District',
        type: 'Shopping',
        description: 'Walkable shopping district with local boutiques, cafes, and restaurants',
      },
      {
        name: 'Whole Foods Market',
        type: 'Shopping',
        description: 'Full-service grocery store within walking distance',
      },
      {
        name: 'Brookside Library',
        type: 'Library',
        description: 'Kansas City Public Library branch with children\'s programs',
      },
    ],

    // Stats
    stats: {
      medianPrice: 485000,
      population: 8500,
      walkabilityScore: 88,
    },

    // Local Insights
    insights: [
      {
        title: 'Brookside Art Annual',
        description: 'Annual outdoor art fair featuring 170+ artists - the 38th annual show in 2024.',
        category: 'Event',
      },
      {
        title: 'Year-Round Walkability',
        description: 'Brookside is one of the few KC neighborhoods where families can walk to school, shops, and restaurants daily.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Kansas City',
    state: 'Missouri',
    county: 'Jackson County',
  },
  {
    // Basic Info
    name: 'Waldo',
    slug: 'waldo',
    tagline: 'Affordable Charm for Young Families',
    description: 'Waldo offers Kansas City families an affordable, walkable neighborhood with local character, great restaurants, and a strong community atmosphere.',

    // SEO
    metaTitle: 'Waldo Kansas City Homes | Affordable Family-Friendly Neighborhood',
    metaDescription: 'Find affordable family homes in Waldo, Kansas City. Walkable streets, local restaurants, and strong community. Perfect for young families. Search homes now.',
    targetKeyword: 'affordable Waldo Kansas City young families',
    keywordDifficulty: 28,
    priority: 'HIGH',

    // Hero
    heroImage: '/images/neighborhoods/waldo-hero.jpg',
    heroImageAlt: 'Affordable family homes in Waldo, Kansas City',

    // Overview
    whyFamiliesLoveIt: [
      'More affordable than Brookside with similar walkability',
      'Thriving local restaurant and bar scene on Waldo Boulevard',
      'Strong sense of community with active neighborhood association',
      'Easy access to highways for commuting',
      'Diverse housing stock from bungalows to new construction',
      'Family-friendly parks and walking trails',
    ],

    // Schools
    schools: [
      {
        name: 'James Elementary',
        type: 'Elementary',
        rating: 8.2,
        district: 'Kansas City Public Schools',
      },
      {
        name: 'Christ the King School',
        type: 'Elementary',
        rating: 8.8,
        district: 'Private/Catholic',
      },
      {
        name: 'Rockhurst High School',
        type: 'High',
        rating: 9.4,
        district: 'Private',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Waldo Park',
        type: 'Park',
        description: 'Neighborhood park with playground and open space for family activities',
      },
      {
        name: 'Gregory Park',
        type: 'Park',
        description: 'Nearby park with walking trails and sports fields',
      },
    ],

    otherAmenities: [
      {
        name: 'Waldo Boulevard Shopping',
        type: 'Shopping',
        description: 'Walkable shopping district with local businesses and restaurants',
      },
      {
        name: 'Martin City Brewing Company',
        type: 'Restaurant',
        description: 'Family-friendly brewery with outdoor seating and food trucks',
      },
    ],

    // Stats
    stats: {
      medianPrice: 320000,
      population: 12000,
      walkabilityScore: 75,
    },

    // Local Insights
    insights: [
      {
        title: 'Waldo Pizza - A Kansas City Institution',
        description: 'Local pizza chain started in Waldo in 1980s - family-friendly atmosphere with over 50 toppings and patio seating.',
        category: 'Restaurant',
      },
      {
        title: 'Waldo Farmers Market',
        description: 'Saturday morning farmers market at Three Trails Community Church (7735 Main St) featuring local produce and baked goods, May-October - great family outing.',
        category: 'Event',
      },
      {
        title: 'Hidden Gem: Trolley Track Trail',
        description: 'Crushed limestone trail perfect for family bike rides, connecting to regional trail system.',
        category: 'Hidden Gem',
      },
      {
        title: 'Best Value in KC',
        description: 'Waldo offers Brookside-style walkability at more affordable prices - perfect for first-time family buyers seeking urban living on a budget.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Kansas City',
    state: 'Missouri',
    county: 'Jackson County',
  },
  {
    // Basic Info
    name: 'Blue Springs',
    slug: 'blue-springs',
    tagline: 'Suburban Comfort with Small-Town Feel',
    description: 'Blue Springs offers Kansas City families affordable suburban living with excellent schools, abundant parks, and a welcoming small-town community atmosphere.',

    // SEO
    metaTitle: 'Blue Springs Homes for Sale | Family-Friendly Kansas City Suburb',
    metaDescription: 'Discover family homes in Blue Springs, Kansas City. Great schools, safe neighborhoods, and affordable living. Expert local real estate agents. Start searching now.',
    targetKeyword: 'Blue Springs homes for families',
    keywordDifficulty: 28,
    priority: 'MEDIUM',

    // Hero
    heroImage: '/images/neighborhoods/blue-springs-hero.jpg',
    heroImageAlt: 'Family neighborhoods in Blue Springs, Kansas City',

    // Overview
    whyFamiliesLoveIt: [
      'Highly-rated Blue Springs R-IV School District',
      'Over 20 parks with nearly 600 acres of parkland',
      'Safe, family-oriented community with low crime',
      'Affordable housing with great value',
      'Easy access to Kansas City and Lee\'s Summit',
      'Active community with family events year-round',
    ],

    // Schools
    schools: [
      {
        name: 'Moreland Ridge Middle School',
        type: 'Middle',
        rating: 8,
        district: 'Blue Springs R-IV',
      },
      {
        name: 'Blue Springs High School',
        type: 'High',
        rating: 8,
        district: 'Blue Springs R-IV',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Burr Oak Woods Nature Center',
        type: 'Park',
        description: 'Beautiful nature center with trails, wildlife exhibits, and educational programs for families',
      },
      {
        name: 'Adams Dairy Parkway Trail',
        type: 'Park',
        description: 'Paved trail system connecting parks throughout Blue Springs - perfect for family bike rides',
      },
      {
        name: 'Vesper Hall',
        type: 'Community Center',
        description: 'Community center hosting family events, senior programs, and recreational activities',
      },
    ],

    otherAmenities: [
      {
        name: 'Blue Springs Shopping',
        type: 'Shopping',
        description: 'Convenient shopping centers with major retailers and family restaurants',
      },
      {
        name: 'Blue Springs Library',
        type: 'Library',
        description: 'Modern library with extensive children\'s programs and resources',
      },
    ],

    // Stats
    stats: {
      medianPrice: 295000,
      population: 60000,
      walkabilityScore: 38,
    },

    // Local Insights
    insights: [
      {
        title: 'Blue Springs Fall Fun Festival',
        description: 'Annual September festival featuring 200+ vendor booths, live music, classic car show, parade, and carnival rides - a beloved community tradition.',
        category: 'Event',
      },
      {
        title: 'Hidden Gem: Pink Hill Park',
        description: '46-acre park with walking trails, fishing pond, playgrounds, and natural landscapes - a peaceful escape from the city.',
        category: 'Hidden Gem',
      },
      {
        title: 'Great Value for Families',
        description: 'Blue Springs offers larger homes at lower prices than other KC suburbs without sacrificing school quality.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Blue Springs',
    state: 'Missouri',
    county: 'Jackson County',
  },
  {
    // Basic Info
    name: 'Olathe',
    slug: 'olathe',
    tagline: 'New Construction & Top Schools',
    description: 'Olathe combines excellent schools, abundant new construction, and strong community values, making it one of Kansas City\'s fastest-growing family destinations.',

    // SEO
    metaTitle: 'Olathe Kansas City Homes | New Construction Family Neighborhoods',
    metaDescription: 'Discover new construction and family homes in Olathe, Kansas City. Excellent schools, growing community, and affordable new homes. Explore Olathe neighborhoods today.',
    targetKeyword: 'Olathe Kansas City family neighborhoods',
    keywordDifficulty: 30,
    priority: 'MEDIUM',

    // Hero
    heroImage: '/images/neighborhoods/olathe-hero.jpg',
    heroImageAlt: 'New family homes in Olathe, Kansas City',

    // Overview
    whyFamiliesLoveIt: [
      'Highly-rated Olathe School District',
      'Abundant new construction with modern amenities',
      'Master-planned communities with pools and parks',
      'Growing downtown with local shops and restaurants',
      'Safe neighborhoods with low crime rates',
      'Easy access to Kansas City and Johnson County',
    ],

    // Schools
    schools: [
      {
        name: 'Prairie Trail Middle School',
        type: 'Middle',
        rating: 7,
        district: 'Olathe USD 233',
      },
      {
        name: 'Indian Trail Middle School',
        type: 'Middle',
        rating: 8,
        district: 'Olathe USD 233',
      },
      {
        name: 'Olathe Northwest High School',
        type: 'High',
        rating: 7,
        district: 'Olathe USD 233',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Mahaffie Stagecoach Stop',
        type: 'Park',
        description: 'Historic site with educational programs, animals, and family activities',
      },
      {
        name: 'Cedar Lake Park',
        type: 'Park',
        description: '67-acre lake and 57-acre park with Cedar Creek Trail access, fishing docks, playground, volleyball courts, and boat ramp',
      },
      {
        name: 'Stagecoach Park & Olathe Community Center',
        type: 'Park',
        description: 'Popular park featuring the Olathe Community Center with indoor aquatic facility, water slides, lazy river, and fitness center',
      },
    ],

    otherAmenities: [
      {
        name: 'Downtown Olathe Shopping',
        type: 'Shopping',
        description: 'Growing downtown area with local shops, restaurants, and family-friendly businesses',
      },
    ],

    // Stats
    stats: {
      medianPrice: 410000,
      population: 149000,
      walkabilityScore: 30,
    },

    // Local Insights
    insights: [
      {
        title: 'New Construction Hot Spot',
        description: 'Olathe is one of Kansas City\'s fastest-growing suburbs with abundant new construction - perfect if you want a brand new home with modern features.',
        category: 'Hidden Gem',
      },
      {
        title: 'Best BBQ: Joe\'s Kansas City',
        description: 'World-famous BBQ joint that started in a gas station - a Kansas City institution with family-friendly atmosphere.',
        category: 'Restaurant',
      },
      {
        title: 'Downtown Olathe Transformation',
        description: 'Historic downtown is being revitalized with new restaurants, shops, and events - becoming a great gathering spot for families.',
        category: 'Activity',
      },
      {
        title: 'Master-Planned Communities',
        description: 'Many neighborhoods include pools, parks, and community events built right in - instant community for families.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Olathe',
    state: 'Kansas',
    county: 'Johnson County',
  },
  {
    // Basic Info
    name: 'Liberty',
    slug: 'liberty',
    tagline: 'Historic Charm Meets Family Values',
    description: 'Liberty offers families a unique blend of historic downtown charm, excellent schools, and genuine small-town community feel, all within easy reach of Kansas City.',

    // SEO
    metaTitle: 'Liberty Missouri Homes | Family-Friendly Kansas City Suburb',
    metaDescription: 'Find your perfect family home in Liberty, Missouri. Historic downtown, top-rated schools, and strong community. Affordable Kansas City suburb for families.',
    targetKeyword: 'Liberty Missouri family friendly homes',
    keywordDifficulty: 25,
    priority: 'MEDIUM',

    // Hero
    heroImage: '/images/neighborhoods/liberty-hero.jpg',
    heroImageAlt: 'Historic downtown Liberty, Missouri',

    // Overview
    whyFamiliesLoveIt: [
      'Excellent Liberty School District',
      'Charming historic downtown square',
      'More affordable than Johnson County suburbs',
      'Strong sense of community and small-town feel',
      'Easy commute to downtown Kansas City',
      'Growing dining and entertainment scene',
    ],

    // Schools
    schools: [
      {
        name: 'Liberty High School',
        type: 'High',
        rating: 9,
        district: 'Liberty 53',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Stocksdale Park',
        type: 'Park',
        description: 'Large park with playgrounds, walking trails, and sports facilities',
      },
      {
        name: 'Martha Lafite Thompson Nature Sanctuary',
        type: 'Park',
        description: 'Beautiful nature preserve with trails and educational programs',
      },
    ],

    otherAmenities: [
      {
        name: 'Historic Liberty Square',
        type: 'Shopping',
        description: 'Walkable downtown with local shops, restaurants, and events',
      },
      {
        name: 'Liberty Community Center',
        type: 'Community Center',
        description: '9,300 sq ft wellness center with 4 pools (2 indoor, 2 outdoor), fitness equipment, and family programs',
      },
    ],

    // Stats
    stats: {
      medianPrice: 375000,
      population: 31000,
      walkabilityScore: 23,
    },

    // Local Insights
    insights: [
      {
        title: 'Jesse James Bank Museum',
        description: 'Site of Jesse James\' first bank robbery - fun piece of history that kids love to visit.',
        category: 'Activity',
      },
      {
        title: 'Liberty Fall Festival',
        description: 'Annual festival in historic downtown brings the whole community together with activities for all ages.',
        category: 'Event',
      },
      {
        title: 'Hidden Gem: Belvoir Winery',
        description: 'Historic winery on 170 acres with beautiful outdoor space, gazebo, and scenic views - great for events and wine tasting.',
        category: 'Hidden Gem',
      },
      {
        title: 'Great Value Alternative',
        description: 'Get similar quality of life to pricier Johnson County suburbs at 15-20% lower cost.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Liberty',
    state: 'Missouri',
    county: 'Clay County',
  },
  {
    // Basic Info
    name: 'Leawood',
    slug: 'leawood',
    tagline: 'Luxury Living for Upscale Families',
    description: 'Leawood represents the pinnacle of Kansas City suburban living, offering luxury homes, pristine neighborhoods, and some of the region\'s best schools.',

    // SEO
    metaTitle: 'Leawood Kansas Luxury Homes | Upscale Family Neighborhoods',
    metaDescription: 'Explore luxury family homes in Leawood, Kansas. Top-rated schools, upscale neighborhoods, and premium amenities. Kansas City\'s most prestigious suburb.',
    targetKeyword: 'Leawood Kansas luxury family homes',
    keywordDifficulty: 35,
    priority: 'MEDIUM',

    // Hero
    heroImage: '/images/neighborhoods/leawood-hero.jpg',
    heroImageAlt: 'Luxury homes in Leawood, Kansas',

    // Overview
    whyFamiliesLoveIt: [
      'Elite Blue Valley School District',
      'Upscale shopping at Town Center Plaza',
      'Meticulously maintained neighborhoods',
      'Low crime and exceptional safety',
      'Proximity to Country Club Plaza',
      'Prestigious address and strong property values',
    ],

    // Schools
    schools: [
      {
        name: 'Leawood Elementary',
        type: 'Elementary',
        rating: 7,
        district: 'Blue Valley USD 229',
      },
      {
        name: 'Blue Valley West High School',
        type: 'High',
        rating: 10,
        district: 'Blue Valley USD 229',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Leawood City Park',
        type: 'Park',
        description: '66-acre park with all-inclusive playground, soccer fields, tennis courts, Leawood Aquatic Center, and Tomahawk Greenway Trail access',
      },
      {
        name: 'Ironwoods Park',
        type: 'Park',
        description: '115-acre park with 2 miles of trails, The Lodge at Ironwoods, Prairie Oak Nature Center, amphitheater, and fishing lake',
      },
    ],

    otherAmenities: [
      {
        name: 'Town Center Plaza',
        type: 'Shopping',
        description: 'Upscale outdoor shopping center with premier retailers and dining',
      },
      {
        name: 'Leawood Community Center',
        type: 'Community Center',
        description: 'Community facility at City Hall with meeting rooms and programming for all ages',
      },
    ],

    // Stats
    stats: {
      medianPrice: 780000,
      population: 34000,
      walkabilityScore: 22,
    },

    // Local Insights
    insights: [
      {
        title: 'Town Center Plaza Experience',
        description: 'Upscale outdoor shopping with boutiques, restaurants, and year-round events - feels like a European village.',
        category: 'Shopping',
      },
      {
        title: 'Best Schools in Region',
        description: 'Leawood schools consistently rank among the absolute best in Kansas and Missouri - education is the top priority.',
        category: 'Hidden Gem',
      },
      {
        title: 'Hidden Gem: AMC Town Center',
        description: 'Premium movie theater with recliners and upscale dining options - perfect for family movie nights.',
        category: 'Activity',
      },
      {
        title: 'Investment Value',
        description: 'Leawood homes hold their value better than almost any other KC suburb - premium location with premium appreciation.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Leawood',
    state: 'Kansas',
    county: 'Johnson County',
  },
  {
    // Basic Info
    name: 'River Market',
    slug: 'river-market',
    tagline: 'Urban Living for Active Families',
    description: 'River Market offers urban families walkable city living with a vibrant market, excellent restaurants, and a tight-knit community in downtown Kansas City.',

    // SEO
    metaTitle: 'River Market Kansas City | Urban Family Living Downtown',
    metaDescription: 'Discover urban family living in River Market, Kansas City. Walkable neighborhood, farmer\'s market, local restaurants, and loft living. Downtown KC for families.',
    targetKeyword: 'River Market Kansas City families',
    keywordDifficulty: 28,
    priority: 'MEDIUM',

    // Hero
    heroImage: '/images/neighborhoods/river-market-hero.jpg',
    heroImageAlt: 'River Market farmer\'s market in downtown Kansas City',

    // Overview
    whyFamiliesLoveIt: [
      'Incredibly walkable urban neighborhood',
      'Year-round farmer\'s market every Saturday',
      'Diverse dining and entertainment options',
      'Strong sense of community in the city',
      'Unique loft and condo living',
      'Access to city amenities and culture',
    ],

    // Schools
    schools: [
      {
        name: 'Foreign Language Academy',
        type: 'Elementary',
        rating: 8.5,
        district: 'Kansas City Public Schools',
      },
      {
        name: 'Crossroads Charter School',
        type: 'Elementary',
        rating: 8.8,
        district: 'Charter',
      },
      {
        name: 'Lincoln College Preparatory Academy',
        type: 'High',
        rating: 9.2,
        district: 'Kansas City Public Schools',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'Berkley Riverfront Park',
        type: 'Park',
        description: '17-acre riverfront park with playground, biking paths, sand volleyball courts, and outdoor fitness station',
      },
      {
        name: 'Town of Kansas Bridge',
        type: 'Park',
        description: 'Historic walking bridge with river views',
      },
    ],

    otherAmenities: [
      {
        name: 'City Market',
        type: 'Shopping',
        description: 'Historic public market with vendors, restaurants, and events',
      },
      {
        name: 'Arabia Steamboat Museum',
        type: 'Museum',
        description: 'Historic museum featuring artifacts from 1856 steamboat - great for family outings (closing November 2026)',
      },
    ],

    // Stats
    stats: {
      medianPrice: 395000,
      population: 5000,
      walkabilityScore: 84,
    },

    // Local Insights
    insights: [
      {
        title: 'Saturday Farmer\'s Market',
        description: 'One of the largest and best farmer\'s markets in the region - a weekly tradition for River Market families.',
        category: 'Event',
      },
      {
        title: 'Best Brunch: The Farmhouse',
        description: 'Farm-to-table restaurant at 3rd and Delaware featuring unique brunch entrees with fresh local ingredients - perfect for family brunch.',
        category: 'Restaurant',
      },
      {
        title: 'Streetcar Access',
        description: 'Free KC Streetcar connects River Market to downtown and Crossroads - kids love riding it.',
        category: 'Activity',
      },
      {
        title: 'Urban Village Feel',
        description: 'Despite being in downtown KC, River Market feels like a small neighborhood where everyone knows each other.',
        category: 'Hidden Gem',
      },
    ],

    // Location
    city: 'Kansas City',
    state: 'Missouri',
    county: 'Jackson County',
  },
  {
    // Basic Info
    name: 'Northland',
    slug: 'northland',
    tagline: 'Affordable Space for Growing Families',
    description: 'The Northland offers Kansas City families the most space for their money, with excellent schools, safe neighborhoods, and genuine community feel.',

    // SEO
    metaTitle: 'Kansas City Northland Homes | Affordable Family Neighborhoods',
    metaDescription: 'Find affordable family homes in Kansas City Northland. Great schools, safe neighborhoods, and more space for your money. Explore Northland communities.',
    targetKeyword: 'Kansas City Northland family homes',
    keywordDifficulty: 25,
    priority: 'MEDIUM',

    // Hero
    heroImage: '/images/neighborhoods/northland-hero.jpg',
    heroImageAlt: 'Family neighborhoods in Kansas City Northland',

    // Overview
    whyFamiliesLoveIt: [
      'Most affordable homes in Kansas City metro',
      'Multiple excellent school districts',
      'Newer construction and modern homes',
      'Large lots and spacious homes',
      'Growing retail and entertainment',
      'Strong community bonds and neighborhood feel',
    ],

    // Schools
    schools: [
      {
        name: 'Park Hill South High School',
        type: 'High',
        rating: 7,
        district: 'Park Hill',
      },
      {
        name: 'North Kansas City High School',
        type: 'High',
        rating: 5,
        district: 'North Kansas City 74',
      },
      {
        name: 'Staley High School',
        type: 'High',
        rating: 8,
        district: 'North Kansas City 74',
      },
    ],

    // Amenities
    parks: [
      {
        name: 'English Landing Park',
        type: 'Park',
        description: '68-acre riverfront park with 3 miles of trails, playgrounds, disc golf, and Missouri River views',
      },
      {
        name: 'Penguin Park',
        type: 'Park',
        description: 'Destination park featuring iconic 23-foot penguin and 26-foot kangaroo slide - beloved by generations of KC families',
      },
      {
        name: 'Line Creek Trail',
        type: 'Park',
        description: '8-mile paved trail through wooded areas with scenic waterfall - perfect for family bike rides',
      },
    ],

    otherAmenities: [
      {
        name: 'Zona Rosa',
        type: 'Shopping',
        description: 'Major shopping and entertainment district with theaters and dining',
      },
      {
        name: 'Parkville',
        type: 'Shopping',
        description: 'Historic downtown with local shops and restaurants',
      },
    ],

    // Stats
    stats: {
      medianPrice: 285000,
      population: 150000,
      walkabilityScore: 32,
    },

    // Local Insights
    insights: [
      {
        title: 'Best Value in KC',
        description: 'Get a 4-5 bedroom home with yard for what a 3-bedroom costs in other suburbs - more space for growing families.',
        category: 'Hidden Gem',
      },
      {
        title: 'Worlds of Fun Nearby',
        description: 'Major amusement park right in the Northland - season passes are a summer tradition for Northland families.',
        category: 'Activity',
      },
      {
        title: 'Hidden Gem: Parkville Nature Sanctuary',
        description: 'Beautiful trails and nature center perfect for family hikes and outdoor education.',
        category: 'Hidden Gem',
      },
      {
        title: 'Fastest Growing Area',
        description: 'New restaurants, shops, and amenities opening regularly - the Northland is Kansas City\'s growth corridor.',
        category: 'Activity',
      },
    ],

    // Location
    city: 'Kansas City',
    state: 'Missouri',
    county: 'Clay and Platte Counties',
  },
];

// Helper function to get neighborhood by slug
export function getNeighborhoodBySlug(slug: string): Neighborhood | undefined {
  return neighborhoods.find((n) => n.slug === slug);
}

// Helper function to get all neighborhood slugs for static generation
export function getAllNeighborhoodSlugs(): string[] {
  return neighborhoods.map((n) => n.slug);
}

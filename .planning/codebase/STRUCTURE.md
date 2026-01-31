# Directory Structure

## Overview

Total TypeScript/TSX files: **109**

## Root Structure

```
kcf-website/
├── src/                          # Source code
│   ├── app/                      # Next.js App Router pages & API routes
│   ├── components/               # React components
│   ├── lib/                      # Utilities and services
│   ├── types/                    # TypeScript type definitions
│   ├── data/                     # Static content (blog, neighborhoods, services)
│   ├── middleware.ts             # Next.js middleware (auth protection)
│   └── context/                  # Empty (not used)
│
├── public/                       # Static assets
│   ├── agents/                   # Team photos
│   ├── blog/                     # Blog post images
│   ├── neighborhoods/            # Neighborhood images
│   ├── properties/               # Property images
│   └── ...                       # Other static files
│
├── .planning/                    # GSD project management (in progress)
│   └── codebase/                 # Codebase analysis documents
│
├── docs/                         # Documentation
│   └── LOCAL-SEO-CITATIONS-GUIDE.md
│
├── node_modules/                 # Dependencies
├── .next/                        # Next.js build output
├── .git/                         # Git repository
│
├── package.json                  # Dependencies and scripts
├── tsconfig.json                 # TypeScript configuration
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── postcss.config.mjs            # PostCSS configuration
├── eslint.config.mjs             # ESLint configuration
├── components.json               # shadcn/ui configuration
├── vercel.json                   # Vercel deployment config
├── lighthouse-audit.mjs          # Lighthouse performance testing script
└── README.md                     # Project README
```

## `/src` Directory (Detailed)

### `/src/app` - Next.js App Router

```
src/app/
├── layout.tsx                    # Root layout (fonts, analytics, global metadata)
├── page.tsx                      # Home page
├── globals.css                   # Global styles (Tailwind imports)
├── robots.ts                     # robots.txt generation
├── sitemap.ts                    # sitemap.xml generation
├── not-found.tsx                 # 404 page
│
├── (public pages)
├── about/
│   └── page.tsx                  # About the team
├── contact/
│   └── page.tsx                  # Contact form
├── how-it-works/
│   └── page.tsx                  # Process explanation
├── faq/
│   └── page.tsx                  # FAQ page
├── privacy/
│   └── page.tsx                  # Privacy policy
├── terms/
│   └── page.tsx                  # Terms of service
├── agents/
│   └── page.tsx                  # Team page
├── level-up/
│   └── page.tsx                  # Lead generation questionnaire
│
├── (dynamic routes)
├── blog/
│   ├── page.tsx                  # Blog listing
│   └── [slug]/
│       └── page.tsx              # Individual blog post
├── neighborhoods/
│   ├── page.tsx                  # Neighborhoods listing
│   └── [slug]/
│       └── page.tsx              # Individual neighborhood page
├── services/
│   └── [slug]/
│       └── page.tsx              # Service page (dynamic)
│
├── (admin area)
├── admin/
│   ├── layout.tsx                # Admin layout
│   ├── page.tsx                  # Analytics dashboard (Server Component)
│   ├── error.tsx                 # Error boundary
│   ├── loading.tsx               # Loading state
│   └── login/
│       ├── layout.tsx            # Login layout
│       └── page.tsx              # Login form
│
└── (API routes)
    └── api/
        ├── contact/
        │   └── route.ts          # Contact form endpoint
        ├── level-up/
        │   └── route.ts          # Level-up form endpoint
        ├── meta-capi/
        │   └── route.ts          # Meta Conversions API endpoint
        └── admin/
            ├── stats/
            │   └── route.ts      # Deal status aggregation
            ├── analytics/
            │   └── route.ts      # Analytics data endpoint
            └── create-user/
                └── route.ts      # User management endpoint
```

### `/src/components` - React Components

```
src/components/
├── ui/                           # Primitive UI components (shadcn/ui)
│   ├── button.tsx                # Button variants (default, outline, ghost, etc.)
│   ├── card.tsx                  # Card + CardHeader, CardFooter, CardTitle, etc.
│   ├── input.tsx                 # Input field
│   ├── textarea.tsx              # Textarea field
│   ├── separator.tsx             # Horizontal rule
│   ├── sheet.tsx                 # Side panel/drawer
│   ├── tabs.tsx                  # Tabbed interface
│   ├── accordion.tsx             # Collapsible sections
│   ├── breadcrumbs.tsx           # Breadcrumb navigation
│   └── ...                       # Other primitives
│
├── sections/                     # Page section components
│   ├── hero.tsx                  # Hero section (animated, with background image)
│   ├── section-wrapper.tsx       # Section container (background colors, padding)
│   ├── stats-section.tsx         # Statistics display
│   ├── faq-section.tsx           # FAQ accordion section
│   ├── process-steps.tsx         # Process timeline
│   ├── testimonials.tsx          # Testimonials carousel
│   ├── contact-form.tsx          # Contact form component
│   ├── cta-section.tsx           # Call-to-action sections
│   ├── team-card.tsx             # Team member cards
│   ├── trust-badges.tsx          # Trust indicators
│   └── ...
│
├── layout/                       # Global layout components
│   ├── public-layout.tsx         # Wrapper for public pages (Header + Footer)
│   ├── header.tsx                # Navigation header (with mobile menu)
│   └── footer.tsx                # Site footer
│
├── admin/                        # Admin-specific components
│   ├── admin-header.tsx          # Admin navigation header
│   ├── login-form.tsx            # Login form
│   └── user-menu.tsx             # User profile menu
│
├── analytics/                    # Dashboard visualization components
│   ├── stat-card.tsx             # Metric card with comparison
│   ├── platform-card.tsx         # Platform-specific data card
│   ├── top-pages-list.tsx        # Top pages table
│   ├── metric-box.tsx            # Metric display box
│   ├── period-selector.tsx       # Date range picker
│   ├── comparison-badge.tsx      # Comparison indicator
│   ├── loading-skeleton.tsx      # Loading state skeleton
│   └── error-state.tsx           # Error state display
│
├── charts/                       # Chart components (Recharts)
│   ├── line-chart.tsx            # Line chart
│   ├── bar-chart.tsx             # Bar chart
│   ├── sparkline.tsx             # Sparkline (mini chart)
│   ├── pie-chart.tsx             # Pie chart
│   └── area-chart.tsx            # Area chart
│
├── neighborhoods/                # Neighborhood-specific components
│   ├── neighborhood-card.tsx     # Neighborhood preview card
│   ├── neighborhood-cta.tsx      # Neighborhood CTA section
│   ├── neighborhood-schema.tsx   # SEO schema for neighborhoods
│   └── ...
│
├── blog/                         # Blog-specific components
│   ├── blog-card.tsx             # Blog post card
│   ├── blog-content.tsx          # Blog post content renderer
│   ├── blog-header.tsx           # Blog post header
│   └── related-posts.tsx         # Related posts section
│
├── reviews/                      # Review components
│   ├── google-reviews.tsx        # Google reviews display
│   └── review-card.tsx           # Individual review card
│
├── seo/                          # SEO schema components
│   ├── organization-schema.tsx   # Organization JSON-LD
│   ├── team-schema.tsx           # Team member JSON-LD
│   ├── homepage-schema.tsx       # Homepage JSON-LD
│   ├── service-schema.tsx        # Service JSON-LD
│   └── neighborhood-schema.tsx   # Neighborhood JSON-LD
│
└── providers/                    # Context/providers
    └── smooth-scroll.tsx         # Lenis smooth scroll provider
```

### `/src/lib` - Utilities & Services

```
src/lib/
├── utils.ts                      # Utility functions (cn() classname helper)
│
├── track-event.ts                # Unified event tracking (Meta + GA)
├── meta-events.ts                # Meta Pixel + Conversions API
├── google-analytics.ts           # Google Analytics tracking
├── roseyco-analytics.ts          # RoseyCo Analytics API client
│
├── auth/
│   └── actions.ts                # Server actions (signIn, signOut, getUser)
│
├── supabase/
│   ├── client.ts                 # Browser Supabase client
│   ├── server.ts                 # Server Supabase client
│   └── service-role.ts           # Service role Supabase client (admin)
│
└── analytics/
    ├── fetch-analytics.ts        # Analytics data fetching
    ├── calculations.ts           # Metric calculations
    └── formatters.ts             # Data formatting utilities
```

### `/src/types` - TypeScript Definitions

```
src/types/
├── blog.ts                       # BlogPost, BlogCategory, BlogAuthor
├── service.ts                    # ServicePage, ProcessStep, Benefit
├── neighborhood.ts               # Neighborhood, School, Amenity
├── analytics.ts                  # AnalyticsDashboard, Metric, ChartData
└── ...
```

### `/src/data` - Static Content

```
src/data/
├── blog-posts.ts                 # ~100 blog posts (1,134 lines, 53KB)
├── neighborhoods.ts              # ~20 neighborhoods (1,124 lines, 36KB)
├── services.ts                   # 6 service pages (867 lines, 33KB)
├── reviews.ts                    # Google reviews + stats (114 lines)
└── sold-properties.ts            # Recent sales gallery (45 lines)
```

**Total data files**: 3,284 lines of static content

## Naming Conventions

### Directories
- **Lower-case, kebab-case**: `api`, `components`, `lib`, `data`, `types`
- **Bracket notation for dynamic routes**: `[slug]`, `[id]`
- **Logical grouping**: `admin/`, `sections/`, `layout/`, `analytics/`

### Files
- **Page files**: `page.tsx` (not `index.tsx`)
- **Layout files**: `layout.tsx`
- **Special files**: `robots.ts`, `sitemap.ts`, `not-found.tsx`, `error.tsx`, `loading.tsx`
- **API routes**: `route.ts`
- **Components**: kebab-case (`hero.tsx`, `stat-card.tsx`)
- **Utilities/Services**: kebab-case (`track-event.ts`, `meta-events.ts`)

### Component Exports
- **Default exports**: Page components (`export default function ContactPage()`)
- **Named exports**: Reusable components (`export function Button()`, `export { Card, CardHeader }`)

## Import Path Aliases

Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./src/*"]
  }
}
```

**Usage examples**:
- `@/components/ui/button`
- `@/lib/utils`
- `@/data/blog-posts`
- `@/types/blog`

## File Size Distribution

### Large Files (>500 lines)
- `src/data/blog-posts.ts` - 1,134 lines
- `src/data/neighborhoods.ts` - 1,124 lines
- `src/data/services.ts` - 867 lines
- `src/app/admin/page.tsx` - 336 lines
- `src/app/services/[slug]/page.tsx` - 443 lines

### Medium Files (100-500 lines)
- `src/app/level-up/page.tsx` - 279 lines
- `src/app/api/contact/route.ts` - 147 lines
- `src/app/api/level-up/route.ts` - 162 lines
- `src/components/layout/footer.tsx` - 185 lines
- `src/components/layout/header.tsx` - 157 lines

### Small Files (<100 lines)
- Most UI components (Button, Card, etc.)
- Most utility files (utils.ts, formatters.ts, etc.)
- Most type definition files

## Key Organizational Patterns

### 1. Feature-Based Grouping
Components organized by feature/domain:
- `components/blog/` - Blog feature
- `components/neighborhoods/` - Neighborhood feature
- `components/analytics/` - Analytics dashboard feature
- `components/admin/` - Admin feature

### 2. Layer-Based Grouping
Clear separation of concerns:
- `app/` - Presentation (pages)
- `components/` - UI components
- `lib/` - Business logic & services
- `data/` - Static content
- `types/` - Type definitions

### 3. Atomic Design Influence
- `components/ui/` - Atoms (Button, Input, Card)
- `components/sections/` - Molecules (Hero, FAQ Section)
- `app/page.tsx` - Organisms/Templates (full pages)

### 4. Colocation
- API routes colocated with their feature (`app/admin/`, `app/contact/`)
- Admin components in `components/admin/`
- Analytics components in `components/analytics/`

---

*Last analyzed: 2026-01-31*

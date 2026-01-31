# System Architecture

## Overview

KC Family Home Team website is a **Next.js 16 App Router** application serving as a real estate marketing and lead generation platform with an admin analytics dashboard.

**Architecture Pattern**: Layered architecture with Server and Client Components
**Deployment**: Vercel serverless platform
**App Type**: Full-stack React application (SSR + API Routes)

## Conceptual Layers

```
┌─────────────────────────────────────────────┐
│ PRESENTATION LAYER                          │
│ ├─ src/app/ (Pages & Layouts)              │
│ ├─ src/components/ (Reusable UI)           │
│ └─ src/app/layout.tsx (Root Layout)        │
├─────────────────────────────────────────────┤
│ APPLICATION LAYER                           │
│ ├─ API Routes src/app/api/                 │
│ ├─ Server Actions src/lib/auth/actions.ts  │
│ └─ Event Tracking src/lib/track-event.ts   │
├─────────────────────────────────────────────┤
│ SERVICE LAYER                               │
│ ├─ src/lib/auth/ (Authentication)          │
│ ├─ src/lib/supabase/ (Database Clients)    │
│ ├─ src/lib/analytics/ (Analytics)          │
│ └─ src/lib/meta-events.ts (Meta Tracking)  │
├─────────────────────────────────────────────┤
│ DATA/CONTENT LAYER                          │
│ ├─ src/data/ (Static Content)              │
│ └─ src/types/ (TypeScript Interfaces)      │
├─────────────────────────────────────────────┤
│ CROSS-CUTTING                               │
│ ├─ src/middleware.ts (Auth Middleware)     │
│ └─ next.config.ts (Config & Optimization)  │
└─────────────────────────────────────────────┘
```

## Entry Points

### Root Entry
- **Root Layout**: `src/app/layout.tsx`
  - Global metadata (SEO, Open Graph, Twitter Cards)
  - Fonts (Playfair Display, DM Sans via next/font/google)
  - Analytics scripts (Meta Pixel, GA4, Microsoft Clarity)
  - Organization schema (JSON-LD)
  - PublicLayout wrapper for all public pages

- **Home Page**: `src/app/page.tsx`
  - Landing page with hero section
  - Features, testimonials, process steps
  - FAQ sections
  - CTA sections

### Public Routes

**Static Pages**:
- `/contact` → Contact form
- `/about` → About the team
- `/how-it-works` → Process explanation
- `/faq` → FAQ page
- `/agents` → Team page
- `/level-up` → Lead generation questionnaire
- `/privacy`, `/terms` → Legal pages

**Dynamic Routes**:
- `/blog` → Blog listing
- `/blog/[slug]` → Individual blog post (100+ posts)
- `/neighborhoods` → Neighborhoods listing
- `/neighborhoods/[slug]` → Individual neighborhood page (20+ neighborhoods)
- `/services/[slug]` → Service pages (6 services)

### Admin Area

**Protected Routes** (via middleware):
- `/admin` → Analytics dashboard (Server Component, force-dynamic)
- `/admin/login` → Login page

**Authentication**:
- Middleware: `src/middleware.ts`
- Checks Supabase session on every `/admin/*` request
- Redirects unauthenticated users to `/admin/login`
- Allows `/admin/login` to bypass auth check

## API Routes

### Public APIs

**Contact Form**
- **Route**: `POST /api/contact`
- **Flow**: Form data → Validation → Honeypot check → Resend emails (admin + user) → Meta/GA tracking
- **Output**: `{ success: true }` or `{ error: string }`

**Level-Up Questionnaire**
- **Route**: `POST /api/level-up`
- **Flow**: Same as contact form with 3 questions instead of message
- **Output**: `{ success: true, data: { adminEmail, userEmail } }`

**Meta Conversions API**
- **Route**: `POST /api/meta-capi`
- **Purpose**: Server-side Meta Pixel event tracking
- **Flow**: Client event data → SHA256 PII hashing → Meta Graph API
- **Output**: `{ success: true, result: { ... } }`

### Admin APIs (Protected)

**Analytics Data**
- **Route**: `GET /api/admin/analytics`
- **Purpose**: Fetch aggregated analytics from RoseyCo API
- **Data Sources**: GA4, Meta Pixel, GSC, Google Ads, Clarity
- **Output**: `AnalyticsDashboard` object with metrics and trends

**Stats Aggregation**
- **Route**: `GET /api/admin/stats`
- **Purpose**: Transaction/deal status counts from Supabase
- **Output**: Status breakdown (Pending, Active, Completed, etc.)

**User Management**
- **Route**: `POST /api/admin/create-user`
- **Purpose**: Admin user creation via Supabase service role

## Data Flow

### Request Lifecycle: Contact Form Submission

```
Client Form (src/components/sections/contact-form.tsx)
  ↓
trackEvent() [src/lib/track-event.ts]
  ├─ trackMetaEvent() [src/lib/meta-events.ts]
  │  ├─ Client-side: window.fbq("track", ...)
  │  └─ Server-side: POST /api/meta-capi → Meta API
  │
  └─ trackGAEvent() [src/lib/google-analytics.ts]
     └─ window.gtag("event", ...)

Form Submission
  ↓
POST /api/contact
  ├─ Validate input (honeypot check, required fields)
  ├─ Send emails via Resend
  │  ├─ Admin notification email
  │  └─ User confirmation email
  └─ Response: { success: true }
```

### Admin Dashboard Data Flow

```
User visits /admin
  ↓
src/app/admin/page.tsx (Server Component)
  ↓
GET /api/admin/analytics
  ↓
src/lib/roseyco-analytics.ts → getRoseyCoAnalytics()
  ├─ Fetch from RoseyCo API (external)
  │  ├─ Aggregates GA4 data
  │  ├─ Aggregates Meta Pixel data
  │  ├─ Aggregates GSC data
  │  ├─ Aggregates Google Ads data
  │  └─ Aggregates Clarity data
  │
  └─ Transform data → generateSparklineData()
     └─ Return AnalyticsDashboard object

Server Component renders:
  ├─ StatCard components (key metrics)
  ├─ PlatformCard components (platform breakdowns)
  ├─ LineChart components (trend visualizations)
  └─ TopPagesList component (page performance)
```

## Key Abstractions & Patterns

### Service Layer

**Authentication Service** (`src/lib/auth/actions.ts`)
- Server Actions for auth operations
- `signIn(formData)` - Handles login
- `signOut()` - Handles logout
- `getUser()` - Retrieves current user session

**Analytics Services**
- `getRoseyCoAnalytics()` - Aggregates multi-source analytics
- `generateSparklineData()` - Data transformation for charts
- `formatDuration()`, `safeNumber()` - Formatting utilities

**Event Tracking Services**
- `trackEvent()` - Unified tracking wrapper (Meta + GA)
- `trackMetaEvent()` - Meta Pixel + CAPI dual tracking
- `trackGAEvent()` - Google Analytics events
- Pre-configured events:
  - `Events.contact(method)`
  - `Events.formSubmit(formName, userData)`
  - `Events.viewProperty(propertyId, propertyName)`
  - `Events.phoneClick(phoneNumber)`

### Data Models

**Content Types** (Static data in `src/data/`)
- `BlogPost` - Blog content with SEO metadata
- `Neighborhood` - Neighborhood data (schools, amenities, stats)
- `ServicePage` - Service page structure (process steps, benefits, FAQs)
- `Review` - Google reviews
- `SoldProperty` - Recent sales with images

**Analytics Types** (`src/types/analytics.ts`)
- `AnalyticsDashboard` - Dashboard metrics
- `Metric` - Individual metric with comparison
- `ChartData` - Chart visualization data
- `RecentLead` - Lead tracking data

### UI Component Patterns

**1. Shadcn-style Components** (`src/components/ui/`)
- Built on Radix UI primitives
- Class Variance Authority (CVA) for variants
- Examples: Button, Card, Input, Textarea, Accordion, Tabs
- Variant pattern: `variant="default" | "outline" | "ghost"` + sizes

**2. Section Components** (`src/components/sections/`)
- Composable page sections
- Props for flexibility (backgroundImage, badge, title, etc.)
- Examples: Hero, SectionWrapper, StatsSection, FAQSection
- Animations via Framer Motion

**3. Layout Components** (`src/components/layout/`)
- `PublicLayout` - Wraps public pages (Header + Footer + SmoothScroll)
- `Header` - Navigation with mobile menu
- `Footer` - Links, social, CTA

**4. Feature Components**
- `admin/` - Admin dashboard components
- `analytics/` - Dashboard charts and metrics
- `blog/` - Blog-specific components
- `neighborhoods/` - Neighborhood features
- `reviews/` - Review components
- `seo/` - SEO schema components

### Static Content Management

All marketing content stored as TypeScript arrays in `src/data/`:
- `blog-posts.ts` - 100+ blog posts (1,134 lines, 53KB)
- `neighborhoods.ts` - 20+ neighborhoods (1,124 lines, 36KB)
- `services.ts` - 6 service pages (867 lines, 33KB)
- `reviews.ts` - Google reviews + stats
- `sold-properties.ts` - Recent sales gallery

**Data Structure Pattern**:
```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: 'post-slug',
    title: 'Post Title',
    excerpt: 'Brief description',
    category: 'Category',
    author: { name: 'Author', role: 'Role' },
    publishedAt: '2025-01-01',
    readTime: 9,
    featuredImage: '/path/to/image.jpg',
    tags: ['tag1', 'tag2'],
    metaTitle: 'SEO Title',
    metaDescription: 'SEO Description',
    targetKeyword: 'keyword',
    relatedNeighborhoods: ['slug1', 'slug2'],
    relatedServices: ['service-slug'],
    content: `Full markdown content...`
  },
  // ... more posts
]
```

## Module Boundaries

### Public Pages Module
- **Purpose**: Marketing content
- **Exports**: Page components
- **Dependencies**: Components, data, utilities
- **Entry Points**: Each page in `src/app/`

### Admin Module
- **Purpose**: Analytics dashboard + user management
- **Protection**: `middleware.ts` (Supabase auth check)
- **Exports**: Admin pages, login form
- **Dependencies**: Supabase, RoseyCo API, analytics components

### Analytics Module
- **Purpose**: Data aggregation and visualization
- **Services**: `getRoseyCoAnalytics()`, formatters, calculations
- **Components**: Dashboard cards, charts, metric displays
- **Data Sources**: GA4, Meta Pixel, GSC, Google Ads, Clarity

### Content Modules
- **Blog**: 100+ posts with SEO metadata
- **Neighborhoods**: Neighborhood guides with schools, amenities
- **Services**: Service pages with process steps, FAQs
- **All static**: No database queries; data in TypeScript arrays

### Tracking Module
- **Purpose**: Event tracking across platforms
- **Services**: `trackEvent()`, `trackMetaEvent()`, `trackGAEvent()`
- **Integration**: Client components + API routes
- **Platforms**: Meta Pixel (client + CAPI), Google Analytics

## Performance Optimizations

### Image Optimization
- AVIF + WebP formats
- 1-year cache TTL
- Device-specific sizing
- Lazy loading (Next.js default)

### Code Splitting
- Framework bundle (React, Next.js)
- Lucide icons chunk
- React Markdown chunk
- Vendor chunks with intelligent splitting

### Compiler Optimizations
- Remove console logs in production (except errors/warnings)
- Turbopack dev server (faster than Webpack)
- Tree shaking unused code

### Security Headers
- HSTS (Strict-Transport-Security)
- CSP (Content-Security-Policy)
- X-Frame-Options
- X-Content-Type-Options
- Referrer-Policy: strict-origin-when-cross-origin
- Permissions-Policy: disable camera, microphone, geolocation

## State Management

**No Global State Management**
- No Redux, Zustand, Jotai, or Context API
- Local component state via `useState`
- Server state via Server Components (fetch on server)
- Form state via `useState` in Client Components

**Server/Client Split**
- Server Components by default (pages, layouts)
- Client Components marked with `"use client"` (interactive components)
- Form components are Client Components
- Admin dashboard is Server Component (fetches data on server)

## Authentication Flow

```
User visits /admin
  ↓
middleware.ts intercepts request
  ↓
Check Supabase session (cookie-based)
  ├─ Session exists → Allow access
  └─ No session → Redirect to /admin/login

Login page:
  ├─ User enters credentials
  ├─ POST to signIn() server action
  ├─ Supabase authenticates
  ├─ Session cookie set
  └─ Redirect to /admin

Logout:
  ├─ User clicks logout
  ├─ POST to signOut() server action
  ├─ Supabase clears session
  └─ Redirect to /admin/login
```

## SEO Architecture

**Metadata Generation**
- Every page exports `metadata` object
- Dynamic metadata for blog, neighborhoods, services
- Organization schema (JSON-LD) on every page
- Team member schemas on agents page
- Service schemas on service pages
- Neighborhood schemas on neighborhood pages

**Sitemap Generation**
- `src/app/sitemap.ts` - Dynamic sitemap generation
- Includes all static pages, blog posts, neighborhoods, services
- Updates automatically when content added

**Robots.txt**
- `src/app/robots.ts` - Dynamic robots.txt
- Allows all user agents
- References sitemap

---

*Last analyzed: 2026-01-31*

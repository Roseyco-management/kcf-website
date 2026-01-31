# Technology Stack

## Core Framework

**Next.js 16.0.7**
- App Router (full adoption)
- React Server Components
- Server Actions
- Turbopack dev server
- File-based routing
- API Routes

**React 19.2.0**
- Functional components
- Hooks (useState, useEffect, etc.)
- Server Components by default
- Client Components (`"use client"` directive)

**TypeScript 5.x**
- Strict mode enabled
- Path aliases (`@/*` → `./src/*`)
- Full type coverage across codebase

## Frontend

### UI & Styling

**Tailwind CSS 4.0.0**
- Utility-first CSS
- Custom design tokens
- Responsive design utilities
- Dark mode support (configured but not active)

**shadcn/ui Components**
- Radix UI primitives (@radix-ui/react-*)
- Class Variance Authority (CVA) for variant styling
- Customizable component library
- "New York" style preset

**Icons & Graphics**
- lucide-react (icon library)
- next/image (optimized image loading)

### Animation & Interactions

**Framer Motion 12.x**
- Page transitions
- Component animations
- Scroll-based effects
- Stagger animations

**Lenis 1.2.x** (via @darkroom.engineering/react-lenis)
- Smooth scrolling
- Native-like scroll behavior

## Backend

### Database & Authentication

**Supabase 2.81.1**
- PostgreSQL database
- Authentication (email/password)
- Row Level Security (RLS)
- SSR support (@supabase/ssr)
- Three client modes:
  - Browser client (public operations)
  - Server client (SSR)
  - Service role client (admin operations)

### Email

**Resend SDK**
- Transactional emails
- Contact form notifications
- User confirmation emails
- HTML email templates

## Analytics & Tracking

**Multi-Platform Analytics**
- Google Analytics 4 (GA4)
- Meta Pixel (Facebook)
- Microsoft Clarity
- Google Search Console
- Google Ads tracking
- RoseyCo Analytics (aggregation service)

**Tracking Implementation**
- Client-side tracking (Pixel, GA4)
- Server-side tracking (Meta CAPI)
- Event tracking abstraction layer
- SHA256 PII hashing for CAPI

## Development Tools

**Code Quality**
- ESLint (eslint-config-next)
- TypeScript compiler
- Next.js Core Web Vitals checking

**Performance Testing**
- Lighthouse CLI integration
- Automated performance audits
- Custom audit script (`lighthouse-audit.mjs`)

## Dependencies Summary

### Production Dependencies (Key Packages)

```json
{
  "next": "16.0.7",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "@supabase/ssr": "0.7.0",
  "@supabase/supabase-js": "2.81.1",
  "resend": "^4.0.4",
  "framer-motion": "^12.10.4",
  "@radix-ui/*": "Multiple packages for UI primitives",
  "tailwindcss": "4.0.0",
  "class-variance-authority": "^0.8.0",
  "lucide-react": "^0.488.0",
  "recharts": "^2.15.1",
  "react-markdown": "^9.0.1",
  "lenis": "^1.2.9",
  "clsx": "^2.1.1",
  "tailwind-merge": "^2.6.0"
}
```

### Dev Dependencies

```json
{
  "typescript": "5.x",
  "@types/node": "^20.x",
  "@types/react": "^19.x",
  "@types/react-dom": "^19.x",
  "eslint": "^9.x",
  "eslint-config-next": "^16.x",
  "@tailwindcss/postcss": "^4.x",
  "lighthouse": "^12.x"
}
```

## Build & Deployment

**Vercel**
- Production deployment platform
- Automatic CI/CD
- Edge functions
- Image optimization
- Analytics

**Build Configuration**
- Turbopack (default in Next.js 16)
- Code splitting (framework, lucide, markdown chunks)
- Image optimization (AVIF + WebP, aggressive caching)
- Production console.log removal
- Security headers (HSTS, CSP, X-Frame-Options)

## Environment Variables Required

```
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Email
RESEND_API_KEY=

# Analytics
META_PIXEL_ID=
META_ACCESS_TOKEN=
ROSEYCO_API_KEY=
ROSEYCO_CLIENT_SLUG=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=

# Other
SITE_URL=
```

## Notable Absences

- **No testing framework** (Jest/Vitest/Playwright not installed)
- **No state management library** (Redux, Zustand, etc.)
- **No component testing** (@testing-library/react not installed)
- **No GraphQL** (using Supabase REST/SDK)
- **No monorepo tooling** (Turborepo, Nx, etc.)

---

*Last analyzed: 2026-01-31*

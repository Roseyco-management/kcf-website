# External Integrations

## Overview

The application integrates with multiple third-party services for database, authentication, email, and analytics.

## Database & Authentication

### Supabase

**Purpose**: PostgreSQL database + authentication backend

**SDK Version**: `@supabase/supabase-js@2.81.1`, `@supabase/ssr@0.7.0`

**Client Configurations**:

1. **Browser Client** (`src/lib/supabase/client.ts`)
   - Used for client-side operations
   - Public anon key
   - Cookie-based session storage

2. **Server Client** (`src/lib/supabase/server.ts`)
   - Used for Server Components and API Routes
   - SSR-compatible
   - Cookie-based session (via Next.js cookies)

3. **Service Role Client** (`src/lib/supabase/service-role.ts`)
   - Used for admin operations
   - Bypasses Row Level Security (RLS)
   - Full database access

**Environment Variables**:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://[project-id].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJI... # Server-only
```

**Usage Examples**:
```typescript
// Browser client
import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

// Server client
import { createClient } from '@/lib/supabase/server'
const supabase = await createClient()

// Service role (admin)
import { createClient } from '@/lib/supabase/service-role'
const supabase = createClient()
```

**Features Used**:
- Authentication (email/password)
- Database queries (deals, transactions, user management)
- Session management (cookie-based SSR)

**Database Schema** (inferred from code):
- `deals` table - Transaction/deal tracking
  - Fields: `asking_price`, `status`, `createdAt`, etc.
  - Used in: `src/app/api/admin/stats/route.ts`

## Email

### Resend

**Purpose**: Transactional email sending

**SDK Version**: `resend@^4.0.4`

**Configuration**:
```typescript
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
```

**Environment Variables**:
```bash
RESEND_API_KEY=re_...
```

**Usage Patterns**:

**Contact Form Emails** (`src/app/api/contact/route.ts`):
```typescript
// Admin notification
await resend.emails.send({
  from: "KC Family Home Team <noreply@kcfhomes.com>",
  to: ["admin@kcfhomes.com"],
  replyTo: email,
  subject: `New Contact Form Submission from ${name}`,
  html: `...HTML template...`
})

// User confirmation
await resend.emails.send({
  from: "KC Family Home Team <noreply@kcfhomes.com>",
  to: [email],
  subject: "Thank You for Contacting Us - KC Family Home Team",
  html: `...HTML template...`
})
```

**Level-Up Questionnaire Emails** (`src/app/api/level-up/route.ts`):
- Same pattern as contact form
- Admin notification with 3 questions answered
- User confirmation email

**Email Templates**:
- Inline HTML with brand colors (#151A4A, #C9A961)
- Responsive design
- Plain text fallback not implemented

## Analytics

### Google Analytics 4 (GA4)

**Purpose**: Web analytics, user behavior tracking

**SDK**: Client-side JavaScript (gtag.js)

**Configuration** (`src/app/layout.tsx`):
```tsx
<Script
  strategy="afterInteractive"
  src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}`}
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID}');
  `}
</Script>
```

**Environment Variables**:
```bash
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-...
```

**Event Tracking** (`src/lib/google-analytics.ts`):
```typescript
export const GAEvents = {
  pageView: (url: string) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("config", process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID!, {
        page_path: url,
      });
    }
  },

  event: (action: string, params?: Record<string, unknown>) => {
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", action, params);
    }
  },
}
```

**Tracked Events**:
- Page views
- Contact form submissions
- Phone clicks
- Property views
- Custom user interactions

### Meta Pixel (Facebook)

**Purpose**: Conversion tracking, ad optimization

**SDK**: Client-side JavaScript (fbq.js) + Server-side Conversions API

**Configuration** (`src/app/layout.tsx`):
```tsx
<Script id="facebook-pixel" strategy="afterInteractive">
  {`
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '${process.env.NEXT_PUBLIC_META_PIXEL_ID}');
    fbq('track', 'PageView');
  `}
</Script>
```

**Environment Variables**:
```bash
NEXT_PUBLIC_META_PIXEL_ID=...
META_ACCESS_TOKEN=... # Server-side CAPI
```

**Dual Tracking (Client + Server)**:

**Client-side** (`src/lib/meta-events.ts`):
```typescript
export const MetaEvents = {
  pageView: () => {
    if (typeof window.fbq !== "undefined") {
      window.fbq("track", "PageView");
    }
  },

  viewContent: (customData?: Record<string, unknown>) => {
    if (typeof window.fbq !== "undefined") {
      window.fbq("track", "ViewContent", customData);
    }
  },

  contact: (customData?: Record<string, unknown>) => {
    if (typeof window.fbq !== "undefined") {
      window.fbq("track", "Contact", customData);
    }
  },
}
```

**Server-side Conversions API** (`src/app/api/meta-capi/route.ts`):
```typescript
// Hash PII before sending to Meta
function hashData(data: string): string {
  return crypto.createHash('sha256').update(data.toLowerCase()).digest('hex');
}

// Send to Meta Graph API
const response = await fetch(
  `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [{
        event_name: eventName,
        event_time: Math.floor(Date.now() / 1000),
        user_data: {
          em: email ? hashData(email) : undefined,
          ph: phone ? hashData(phone) : undefined,
          // ... other PII fields
        },
        custom_data: customData,
      }],
      access_token: META_ACCESS_TOKEN,
    }),
  }
);
```

**Tracked Events**:
- PageView
- ViewContent
- Contact
- Lead
- Purchase (if implemented)

**Security**: PII is SHA256 hashed before server-side transmission

### Microsoft Clarity

**Purpose**: Session recording, heatmaps, user behavior

**SDK**: Client-side JavaScript

**Configuration** (`src/app/layout.tsx`):
```tsx
<Script id="microsoft-clarity" strategy="afterInteractive">
  {`
    (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "ujsyihkbft");
  `}
</Script>
```

**Project ID**: `ujsyihkbft` (hardcoded in layout)

**Features**:
- Session recordings
- Heatmaps
- User behavior analytics
- No custom event tracking implemented

### Google Search Console

**Purpose**: Search performance, indexing status

**SDK**: None (accessed via RoseyCo Analytics API)

**Configuration**: No client-side integration

**Data Access**: Via RoseyCo Analytics aggregation service

### Google Ads

**Purpose**: Conversion tracking for paid ads

**SDK**: None (accessed via RoseyCo Analytics API)

**Measurement ID**: `G-RH9LPW46VV` (hardcoded in admin analytics)

**Data Access**: Via RoseyCo Analytics aggregation service

### RoseyCo Analytics

**Purpose**: Aggregated analytics dashboard (custom service)

**API**: REST API (HTTPS)

**Configuration** (`src/lib/roseyco-analytics.ts`):
```typescript
const ROSEYCO_API_KEY = process.env.ROSEYCO_API_KEY;
const ROSEYCO_CLIENT_SLUG = process.env.ROSEYCO_CLIENT_SLUG || "kcf";
const ROSEYCO_API_BASE_URL = "https://analytics.roseyco.co.uk";
```

**Environment Variables**:
```bash
ROSEYCO_API_KEY=...
ROSEYCO_CLIENT_SLUG=kcf
```

**API Endpoint**:
```
GET /api/clients/{slug}/analytics?apiKey={key}&startDate={date}&endDate={date}
```

**Data Returned**:
- GA4 metrics (users, sessions, pageviews, bounce rate, etc.)
- Meta Pixel metrics (impressions, clicks, conversions)
- Google Search Console metrics (impressions, clicks, CTR, position)
- Google Ads metrics (ad spend, conversions)
- Microsoft Clarity metrics (sessions, recordings)

**Usage** (`src/app/api/admin/analytics/route.ts`):
```typescript
import { getRoseyCoAnalytics } from "@/lib/roseyco-analytics";

export async function GET() {
  const data = await getRoseyCoAnalytics();
  return NextResponse.json(data);
}
```

**Security Concern**: API key passed as URL query parameter (should use headers)

## Fonts

### Google Fonts

**Purpose**: Typography

**Fonts Used**:
- **Playfair Display** (serif, headings)
- **DM Sans** (sans-serif, body text)

**Implementation** (`src/app/layout.tsx`):
```typescript
import { Playfair_Display, DM_Sans } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});
```

**Performance**: Fonts optimized by Next.js (self-hosted, no external requests)

## Icons

### Lucide React

**Purpose**: Icon library

**Version**: `lucide-react@^0.488.0`

**Usage**:
```typescript
import { Phone, Mail, ArrowRight, Home } from "lucide-react";

<Phone className="h-5 w-5" />
```

**Icons Used**: 50+ icons throughout application

## Charts

### Recharts

**Purpose**: Data visualization

**Version**: `recharts@^2.15.1`

**Components Used**:
- LineChart
- BarChart
- AreaChart
- PieChart
- Sparkline (custom wrapper)

**Usage** (`src/components/charts/`):
```typescript
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

<ResponsiveContainer width="100%" height={300}>
  <LineChart data={data}>
    <XAxis dataKey="date" />
    <YAxis />
    <Tooltip />
    <Line type="monotone" dataKey="value" stroke="#C9A961" />
  </LineChart>
</ResponsiveContainer>
```

## Deployment

### Vercel

**Purpose**: Hosting, CI/CD, edge functions

**Configuration**: `vercel.json`

**Features Used**:
- Automatic deployments (git push → deploy)
- Preview deployments (PR previews)
- Production deployments (main branch)
- Edge functions (API routes)
- Image optimization
- Analytics (Web Vitals)

**Build Command**: `npm run build`
**Output Directory**: `.next`

## Security Headers

### Next.js Security Configuration

**Configured in** `next.config.ts`:

```typescript
headers: async () => [
  {
    source: "/:path*",
    headers: [
      { key: "X-DNS-Prefetch-Control", value: "on" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "X-Frame-Options", value: "SAMEORIGIN" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-XSS-Protection", value: "1; mode=block" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
    ],
  },
],
```

## Missing Integrations

**Not Currently Used**:
- ❌ Email newsletter service (Mailchimp, ConvertKit)
- ❌ CRM (HubSpot, Salesforce)
- ❌ Payment processing (Stripe, PayPal)
- ❌ Live chat (Intercom, Drift)
- ❌ Error tracking (Sentry, Rollbar)
- ❌ Logging service (LogRocket, Datadog)
- ❌ CDN for static assets (Cloudflare, Cloudinary)
- ❌ A/B testing platform (Optimizely, VWO)

---

*Last analyzed: 2026-01-31*

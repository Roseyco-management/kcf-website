# KC Family Home Team - Analytics Dashboard Rebuild Plan

## Executive Summary

Complete rebuild of the analytics dashboard using **Navy & Gold** color scheme, modern charts with **Recharts**, and comprehensive tooltips. The dashboard will be inspired by the professional structure from the seo-results-dashboard while maintaining the KC Family Home Team premium brand identity.

---

## Color Palette (Navy & Gold Theme)

### Primary Colors
```css
Navy (Primary):       #151A4A
Navy Deep:            #0F1238
Gold (Accent):        #C9A961
Gold Light:           #D4B978
Gold Dark:            #B89A52
Cream (Background):   #F8F6F2
Cream Dark:           #EDE9E0
Charcoal:             #2D2D2D
Charcoal Light:       #4A4A4A
```

### Chart Colors
```css
Primary Line:         #151A4A  (Navy - for primary metrics)
Secondary Line:       #C9A961  (Gold - for secondary metrics)
Success:              #16a34a  (Green - for positive trends)
Warning:              #f59e0b  (Amber - for attention items)
Danger:               #ef4444  (Red - for declining metrics)
Info:                 #3b82f6  (Blue - for informational)
```

### Usage Guidelines
- **Hero Cards:** Navy gradients with gold accents
- **Charts:** Navy primary line, gold secondary, green/red for trends
- **Backgrounds:** Cream (#F8F6F2) main background, white (#FFFFFF) for cards
- **Text:** Charcoal (#2D2D2D) primary, Charcoal Light (#4A4A4A) secondary
- **Borders:** Warm grey (#E5E0D8)
- **Interactive Elements:** Gold hover states, navy active states

---

## Technical Stack

### Dependencies to Install
```json
{
  "recharts": "^3.5.1",           // Charts library
  "date-fns": "^3.0.0",           // Date formatting
  "lucide-react": "^0.263.1",     // Icons (already installed)
  "@radix-ui/react-tooltip": "^1.0.7",  // Tooltips (already installed)
  "@radix-ui/react-tabs": "^1.0.4",     // Tabs for chart switching
  "react-number-format": "^5.3.1" // Number formatting
}
```

### File Structure
```
src/
├── app/
│   └── admin/
│       ├── layout.tsx              (Updated layout - header only)
│       ├── page.tsx                (Main analytics dashboard)
│       └── login/
│           └── page.tsx
├── components/
│   ├── admin/
│   │   ├── admin-header.tsx        (Keep - updated with logo)
│   │   ├── user-menu.tsx           (Keep)
│   │   └── login-form.tsx          (Keep)
│   ├── analytics/
│   │   ├── stat-card.tsx           (NEW - Interactive metric card)
│   │   ├── stats-grid.tsx          (NEW - Responsive grid of stats)
│   │   ├── metrics-section.tsx     (NEW - Section with charts)
│   │   ├── platform-card.tsx       (NEW - GA4/Meta/Clarity cards)
│   │   ├── top-pages-list.tsx      (NEW - Top performing pages)
│   │   └── comparison-badge.tsx    (NEW - Period comparison badge)
│   └── charts/
│       ├── line-chart.tsx          (NEW - Time series charts)
│       ├── bar-chart.tsx           (NEW - Bar charts)
│       ├── sparkline.tsx           (NEW - Mini trend lines)
│       ├── area-chart.tsx          (NEW - Area/gradient charts)
│       └── chart-tooltip.tsx       (NEW - Custom tooltip component)
├── lib/
│   ├── analytics/
│   │   ├── data-transformers.ts   (NEW - Format data for charts)
│   │   ├── calculations.ts        (NEW - Metrics calculations)
│   │   └── formatters.ts          (NEW - Number/date formatters)
│   └── (existing libs remain)
└── types/
    └── analytics.ts                (NEW - TypeScript types)
```

---

## Dashboard Layout & Sections

### 1. Header (Keep Current)
- Logo on left (KC Family Home Team)
- "Analytics Dashboard" title
- User menu with notifications on right

### 2. Page Title & Period Selector
```tsx
<div className="mb-8">
  <h1 className="text-4xl font-bold text-navy mb-2">
    Analytics Overview
  </h1>
  <p className="text-charcoal-light mb-4">
    Comprehensive view of your website performance
  </p>
  <div className="flex items-center gap-4">
    <select className="px-4 py-2 rounded-lg border-warm-grey">
      <option>Last 7 Days</option>
      <option>Last 30 Days</option>
      <option>Last 90 Days</option>
      <option>Custom Range</option>
    </select>
    <div className="text-sm text-charcoal-light">
      vs Previous Period
    </div>
  </div>
</div>
```

### 3. Hero KPI Cards (4 Columns)
**Design:** Navy gradient backgrounds with white text, gold accent borders on hover

**Cards:**
1. **Total Visits**
   - Icon: Users (Lucide)
   - Big Number: Sessions count
   - Comparison: +12% vs previous
   - Sparkline: Last 7 days trend
   - Tooltip: "Total website sessions in selected period"

2. **Total Leads**
   - Icon: Target (Lucide)
   - Big Number: Form submissions
   - Comparison: +23% vs previous
   - Sparkline: Leads trend
   - Tooltip: "Form submissions (buyer + seller questionnaires)"

3. **Conversion Rate**
   - Icon: TrendingUp (Lucide)
   - Big Number: Percentage
   - Comparison: +8% vs previous
   - Sparkline: CVR trend
   - Tooltip: "Percentage of visits that result in a form submission"

4. **Avg. Session Duration**
   - Icon: Clock (Lucide)
   - Big Number: 4m 23s
   - Comparison: +5% vs previous
   - Sparkline: Duration trend
   - Tooltip: "Average time users spend on the website per session"

**Interactive Features:**
- Hover: Gold border glow, slight scale up
- Click: Expand into modal with detailed chart and insights

### 4. Traffic Sources Overview (Full Width)
**Design:** White card with navy header, gold accent line

```tsx
<Card>
  <CardHeader>
    <h2>Traffic Sources</h2>
    <p>Where your visitors are coming from</p>
  </CardHeader>
  <CardContent>
    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="channels">Channels</TabsTrigger>
        <TabsTrigger value="sources">Sources</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <LineChart
          data={trafficData}
          lines={[
            { key: 'organic', color: '#16a34a', name: 'Organic' },
            { key: 'direct', color: '#151A4A', name: 'Direct' },
            { key: 'referral', color: '#C9A961', name: 'Referral' },
            { key: 'social', color: '#3b82f6', name: 'Social' }
          ]}
          height={350}
        />
      </TabsContent>
    </Tabs>
  </CardContent>
</Card>
```

**Tooltip on hover:**
- Date
- Channel breakdown
- Total for that day
- Percentage of total traffic

### 5. Platform Analytics Grid (3 Columns)
**Design:** White cards with platform-specific accent colors

**Card Structure:**
```tsx
<PlatformCard
  name="Google Analytics"
  icon={<Globe />}
  accentColor="navy"
  id="G-RH9LPW46VV"
  metrics={[
    { label: 'Sessions', value: '1,234', change: +12 },
    { label: 'Users', value: '987', change: +15 },
    { label: 'Bounce Rate', value: '45.2%', change: -5 }
  ]}
  tooltip="Google Analytics 4 tracks user behavior and engagement"
/>
```

**Cards:**
1. **Google Analytics (Navy accent)**
   - Sessions, Users, Bounce Rate
   - Hover tooltip: Explains each metric

2. **Meta Pixel (Gold accent)**
   - Page Views, Conversions, CVR
   - Hover tooltip: Explains Facebook tracking

3. **MS Clarity (Purple accent)**
   - Sessions, Recordings, Heatmaps
   - Hover tooltip: Explains session recording

**Interactive:**
- Hover: Card lifts with shadow
- Click: Opens detailed modal with full metrics

### 6. Conversion Funnel (Full Width)
**Design:** Horizontal funnel visualization with navy/gold gradient

```
Visits → Page Views → Form Views → Submissions
100%      85%           42%          12%
```

**Features:**
- Each stage clickable for details
- Hover shows exact numbers
- Comparison bars show previous period

### 7. Top Performing Pages (2 Columns)
**Left Column:** Top Pages by Traffic
```tsx
<Card>
  <CardHeader>
    <h3>Top Pages by Traffic</h3>
  </CardHeader>
  <CardContent>
    {topPages.map((page, index) => (
      <div className="flex items-center gap-4 p-3 rounded-lg hover:bg-cream">
        <div className="w-8 h-8 rounded-full bg-navy text-white flex items-center justify-center font-bold">
          {index + 1}
        </div>
        <div className="flex-1">
          <p className="font-semibold">{page.title}</p>
          <p className="text-sm text-charcoal-light">{page.path}</p>
        </div>
        <div className="text-right">
          <p className="font-bold">{page.views.toLocaleString()}</p>
          <p className="text-sm text-green">+{page.change}%</p>
        </div>
      </div>
    ))}
  </CardContent>
</Card>
```

**Right Column:** Top Landing Pages
- Same structure as left
- Shows where users enter site
- Bounce rate for each page

**Tooltips:**
- Hover on page: "Page views, bounce rate, avg time"
- Hover on rank badge: "Ranking change vs previous period"

### 8. Google Search Console (Full Width)
**Design:** 4 metric boxes in navy/gold/green/orange gradient boxes

```tsx
<Card>
  <CardHeader>
    <h2>Google Search Console Performance</h2>
  </CardHeader>
  <CardContent>
    <div className="grid grid-cols-4 gap-6">
      <MetricBox
        title="Total Clicks"
        value="2,345"
        change={+15}
        color="navy"
        icon={<MousePointer />}
        tooltip="Clicks from Google Search results"
      />
      <MetricBox
        title="Impressions"
        value="45,678"
        change={+8}
        color="gold"
        icon={<Eye />}
        tooltip="Times your site appeared in search results"
      />
      <MetricBox
        title="Click-Through Rate"
        value="5.1%"
        change={+0.3}
        color="green"
        icon={<Target />}
        tooltip="Percentage of impressions that resulted in clicks"
      />
      <MetricBox
        title="Avg. Position"
        value="12.3"
        change={-2.1}
        color="orange"
        icon={<TrendingDown />}
        tooltip="Average ranking position in search results (lower is better)"
      />
    </div>
    <div className="mt-6">
      <LineChart
        data={gscData}
        lines={[
          { key: 'clicks', color: '#151A4A', name: 'Clicks' },
          { key: 'impressions', color: '#C9A961', name: 'Impressions' }
        ]}
        height={300}
      />
    </div>
  </CardContent>
</Card>
```

### 9. Google Ads Performance (Full Width)
**Design:** Multi-metric dashboard with spend/ROI focus

**Top Row:** 4 primary metrics
- Ad Spend (gray box)
- Clicks (navy box)
- Conversions (gold box)
- Conversion Value (green box)

**Bottom Row:** 3 calculated metrics
- CTR
- Cost per Click
- ROAS (Return on Ad Spend)

**Chart:** Line chart showing spend vs conversions over time

**Tooltips:**
- Each metric has detailed explanation
- ROAS shows calculation formula on hover
- Click to see detailed breakdown

### 10. Form Submissions Breakdown (2 Columns)
**Left:** Pie/Donut chart - Buyer vs Seller split
**Right:** Recent submissions list

```tsx
<Card>
  <CardHeader>
    <h3>Recent Lead Activity</h3>
  </CardHeader>
  <CardContent>
    {submissions.map(sub => (
      <div className="flex items-center gap-4 p-3 border-b">
        <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
          {sub.type === 'buyer' ? <Home /> : <DollarSign />}
        </div>
        <div className="flex-1">
          <p className="font-semibold">{sub.name}</p>
          <p className="text-sm text-charcoal-light">{sub.email}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">{sub.timeAgo}</p>
          <Badge variant={sub.type === 'buyer' ? 'navy' : 'gold'}>
            {sub.type}
          </Badge>
        </div>
      </div>
    ))}
  </CardContent>
</Card>
```

---

## Component Specifications

### 1. StatCard Component
**Props:**
```typescript
interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel?: string;
  icon: React.ReactNode;
  sparklineData?: number[];
  color?: 'navy' | 'gold' | 'green' | 'orange' | 'purple';
  tooltip: string;
  onExpand?: () => void;
}
```

**Features:**
- Gradient background based on color prop
- White text with gold accent on hover
- Percentage badge (green up, red down)
- Optional sparkline at bottom
- Click to expand into modal
- Radix UI Tooltip on hover

**Styling:**
```tsx
<div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-deep p-6 shadow-lg hover:shadow-xl hover:border-gold transition-all duration-300 cursor-pointer group">
  {/* Decorative circle */}
  <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10" />

  {/* Content */}
  <div className="relative">
    <div className="flex items-center justify-between mb-4">
      <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm">
        {icon}
      </div>
      <ComparisonBadge value={change} />
    </div>
    <p className="text-white/90 text-sm font-medium mb-1">{title}</p>
    <p className="text-4xl font-bold text-white">{value}</p>
    {sparklineData && (
      <div className="mt-4">
        <Sparkline data={sparklineData} color="#C9A961" />
      </div>
    )}
  </div>
</div>
```

### 2. LineChart Component
**Props:**
```typescript
interface LineChartProps {
  data: DataPoint[];
  lines: {
    key: string;
    color: string;
    name: string;
  }[];
  height?: number;
  showGrid?: boolean;
  showLegend?: boolean;
  tooltipFormatter?: (value: any) => string;
}
```

**Implementation:**
```tsx
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export function CustomLineChart({ data, lines, height = 300 }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#E5E0D8" />
        <XAxis
          dataKey="date"
          stroke="#4A4A4A"
          tick={{ fill: '#4A4A4A' }}
        />
        <YAxis
          stroke="#4A4A4A"
          tick={{ fill: '#4A4A4A' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#FFFFFF',
            border: '1px solid #E5E0D8',
            borderRadius: '8px',
            padding: '12px'
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
        />
        {lines.map(line => (
          <Line
            key={line.key}
            type="monotone"
            dataKey={line.key}
            stroke={line.color}
            strokeWidth={2}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
            name={line.name}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### 3. Sparkline Component
**Minimal inline chart for trend indication**

```tsx
interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
}

export function Sparkline({ data, color = '#C9A961', height = 40 }: SparklineProps) {
  const chartData = data.map((value, index) => ({ index, value }));

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={chartData}>
        <Line
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={2}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### 4. ComparisonBadge Component
**Shows percentage change with color coding**

```tsx
interface ComparisonBadgeProps {
  value: number;
  label?: string;
}

export function ComparisonBadge({ value, label }: ComparisonBadgeProps) {
  const isPositive = value > 0;
  const isNegative = value < 0;

  return (
    <div className={`flex items-center gap-1 text-sm font-medium ${
      isPositive ? 'text-green-600' : isNegative ? 'text-red-600' : 'text-gray-600'
    }`}>
      {isPositive ? <ArrowUp className="h-4 w-4" /> : isNegative ? <ArrowDown className="h-4 w-4" /> : null}
      {Math.abs(value)}%
      {label && <span className="text-xs text-gray-500 ml-1">{label}</span>}
    </div>
  );
}
```

### 5. ChartTooltip Component
**Custom tooltip for all charts**

```tsx
interface ChartTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

export function ChartTooltip({ active, payload, label }: ChartTooltipProps) {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border border-warm-grey">
      <p className="text-sm font-semibold text-navy mb-2">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-4 mb-1">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-charcoal">{entry.name}:</span>
          </div>
          <span className="text-sm font-semibold text-navy">
            {typeof entry.value === 'number'
              ? entry.value.toLocaleString()
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
}
```

---

## Data Structure & API Integration

### Analytics Data Interface
```typescript
// types/analytics.ts

export interface AnalyticsPeriod {
  from: string; // ISO date
  to: string;   // ISO date
}

export interface Metric {
  current: number;
  previous: number;
  change: number; // percentage
}

export interface DailyDataPoint {
  date: string; // YYYY-MM-DD
  visits?: number;
  leads?: number;
  pageViews?: number;
  conversions?: number;
}

export interface AnalyticsOverview {
  totalVisits: Metric;
  totalLeads: Metric;
  conversionRate: Metric;
  avgSessionDuration: Metric; // in seconds
  dailyData: DailyDataPoint[];
}

export interface GoogleAnalytics {
  configured: boolean;
  measurementId: string;
  sessions: Metric;
  users: Metric;
  bounceRate: Metric;
  topPages: {
    path: string;
    title: string;
    views: number;
    change: number;
  }[];
}

export interface MetaPixel {
  configured: boolean;
  pixelId: string;
  pageViews: Metric;
  conversions: Metric;
  conversionRate: Metric;
  events: {
    [key: string]: number;
  };
}

export interface GoogleSearchConsole {
  configured: boolean;
  clicks: Metric;
  impressions: Metric;
  ctr: Metric;
  avgPosition: Metric;
  dailyData: {
    date: string;
    clicks: number;
    impressions: number;
  }[];
  topQueries: {
    query: string;
    clicks: number;
    impressions: number;
    ctr: number;
    position: number;
  }[];
}

export interface AnalyticsDashboard {
  period: AnalyticsPeriod;
  overview: AnalyticsOverview;
  ga4: GoogleAnalytics;
  meta: MetaPixel;
  clarity: MicrosoftClarity;
  gsc: GoogleSearchConsole | null;
  googleAds: GoogleAds | null;
  recentLeads: RecentLead[];
}
```

### API Response Format
```json
{
  "period": {
    "from": "2024-11-11",
    "to": "2024-12-11"
  },
  "overview": {
    "totalVisits": {
      "current": 1234,
      "previous": 1100,
      "change": 12.2
    },
    "totalLeads": {
      "current": 28,
      "previous": 23,
      "change": 21.7
    },
    "conversionRate": {
      "current": 2.27,
      "previous": 2.09,
      "change": 8.6
    },
    "avgSessionDuration": {
      "current": 263,
      "previous": 245,
      "change": 7.3
    },
    "dailyData": [
      { "date": "2024-11-11", "visits": 45, "leads": 1 },
      // ... more days
    ]
  },
  "ga4": {
    "configured": true,
    "measurementId": "G-RH9LPW46VV",
    "sessions": { "current": 1234, "previous": 1100, "change": 12.2 },
    "users": { "current": 987, "previous": 856, "change": 15.3 },
    "bounceRate": { "current": 45.2, "previous": 47.8, "change": -5.4 },
    "topPages": [
      { "path": "/", "title": "Home", "views": 567, "change": 15 },
      // ... more pages
    ]
  }
  // ... other sections
}
```

---

## Tooltip Content Guide

### Hero KPI Cards

**Total Visits:**
```
Total website sessions in the selected period.
A session is a group of interactions one user takes within a given time frame.
```

**Total Leads:**
```
Form submissions from buyer and seller questionnaires.
Includes all completed contact forms during the period.
```

**Conversion Rate:**
```
Percentage of visits that result in a form submission.
Formula: (Total Leads / Total Visits) × 100
Higher is better - indicates effective user engagement.
```

**Avg. Session Duration:**
```
Average time users spend on the website per session.
Longer durations typically indicate higher engagement.
Measured in minutes and seconds.
```

### Platform Cards

**Google Analytics:**
```
Sessions: Total number of sessions in the period
Users: Unique visitors to your site
Bounce Rate: % of single-page sessions
Lower bounce rate = better engagement
```

**Meta Pixel:**
```
Page Views: Total pages viewed by all users
Conversions: Tracked conversion events (form submits)
CVR: Conversion Rate = (Conversions / Page Views) × 100
```

**Microsoft Clarity:**
```
Sessions: Total recorded user sessions
Recordings: Available session replay recordings
Heatmaps: Interactive heatmap visualizations available
Click to view recordings in Clarity dashboard
```

### Google Search Console

**Clicks:**
```
Number of times users clicked your site in Google Search.
Directly indicates search visibility and relevance.
```

**Impressions:**
```
Times your site appeared in search results.
Shows potential reach - not all impressions result in clicks.
```

**Click-Through Rate (CTR):**
```
Percentage of impressions that resulted in clicks.
Formula: (Clicks / Impressions) × 100
Higher CTR = more compelling search listings
```

**Average Position:**
```
Average ranking position in Google Search results.
Lower numbers are better (1 = top result).
Target: Positions 1-10 (first page).
```

### Google Ads

**Ad Spend:**
```
Total amount spent on Google Ads in this period.
Measured in USD.
```

**Cost per Click (CPC):**
```
Average amount paid per ad click.
Formula: Total Spend / Total Clicks
Lower CPC = more efficient ad spend
```

**ROAS (Return on Ad Spend):**
```
Revenue generated per dollar spent on ads.
Formula: Conversion Value / Ad Spend
Example: 3.5x means $3.50 earned per $1 spent
Target: >2x for profitability
```

---

## Responsive Design Specifications

### Breakpoints
```css
sm: 640px   /* Small phones */
md: 768px   /* Tablets */
lg: 1024px  /* Small laptops */
xl: 1280px  /* Desktops */
2xl: 1536px /* Large screens */
```

### Grid Layouts

**Hero KPI Cards:**
```
Mobile (< 640px):   1 column (stacked)
Tablet (640-1024px): 2 columns
Desktop (> 1024px):  4 columns
```

**Platform Cards:**
```
Mobile:   1 column
Tablet:   2 columns
Desktop:  3 columns
```

**Charts:**
```
Mobile:   Full width, height: 250px
Tablet:   Full width, height: 300px
Desktop:  Half width (2 col grid), height: 350px
```

**Top Pages Lists:**
```
Mobile:   1 column (stack left/right lists)
Tablet:   1 column (stack)
Desktop:  2 columns (side by side)
```

---

## Implementation Phases

### Phase 1: Foundation (Delete & Setup)
- [ ] Delete current `/src/app/admin/` folder
- [ ] Delete unused components in `/src/components/admin/` (keep login-form, user-menu)
- [ ] Install dependencies (recharts, date-fns, etc.)
- [ ] Create new file structure
- [ ] Set up TypeScript types

### Phase 2: Core Components (Charts & Cards)
- [ ] Build Sparkline component
- [ ] Build LineChart component
- [ ] Build BarChart component
- [ ] Build AreaChart component
- [ ] Build ChartTooltip component
- [ ] Build ComparisonBadge component
- [ ] Build StatCard component
- [ ] Test all chart components with sample data

### Phase 3: Analytics Components
- [ ] Build StatsGrid component
- [ ] Build PlatformCard component
- [ ] Build TopPagesList component
- [ ] Build MetricsSection component
- [ ] Build RecentLeadsActivity component

### Phase 4: Main Dashboard Page
- [ ] Create new `/src/app/admin/layout.tsx`
- [ ] Create new `/src/app/admin/page.tsx`
- [ ] Implement hero KPI section
- [ ] Implement traffic sources section
- [ ] Implement platform cards grid
- [ ] Implement top pages section
- [ ] Implement GSC section
- [ ] Implement Google Ads section
- [ ] Implement recent leads section

### Phase 5: Data Integration
- [ ] Update `/src/app/api/admin/analytics/route.ts`
- [ ] Add data transformation utilities
- [ ] Add calculation utilities
- [ ] Add number/date formatters
- [ ] Connect all components to real data
- [ ] Test with live API data

### Phase 6: Polish & UX
- [ ] Add all tooltips with @radix-ui/react-tooltip
- [ ] Add hover effects and transitions
- [ ] Add loading states
- [ ] Add empty states
- [ ] Add error handling
- [ ] Test responsive design on all breakpoints
- [ ] Performance optimization (lazy loading charts)

### Phase 7: Testing & Refinement
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Accessibility audit (keyboard navigation, screen readers)
- [ ] Performance audit (Lighthouse)
- [ ] Final color/spacing adjustments
- [ ] User acceptance testing

---

## Success Criteria

### Visual Design
✅ Navy and gold color scheme throughout
✅ Consistent spacing and alignment
✅ Smooth animations and transitions
✅ Professional, modern aesthetic
✅ Responsive on all device sizes

### Functionality
✅ All charts display correct data
✅ Tooltips provide helpful context
✅ Period selector changes data
✅ All comparisons calculate correctly
✅ Real-time data updates

### User Experience
✅ Page loads in < 2 seconds
✅ Charts are interactive and informative
✅ Tooltips are clear and helpful
✅ Navigation is intuitive
✅ No JavaScript errors

### Accessibility
✅ Keyboard navigable
✅ Screen reader compatible
✅ Color contrast ratios meet WCAG AA
✅ Focus indicators visible
✅ Alt text on all images/icons

---

## Sample Component Implementations

### Hero KPI Card with Modal
```tsx
"use client";

import { useState } from 'react';
import { ArrowUp, ArrowDown, Users, TrendingUp } from 'lucide-react';
import { Sparkline } from '@/components/charts/sparkline';
import { LineChart } from '@/components/charts/line-chart';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface StatCardProps {
  title: string;
  value: string | number;
  change: number;
  sparklineData?: number[];
  detailedData?: any[];
  icon: React.ReactNode;
  tooltip: string;
}

export function StatCard({
  title,
  value,
  change,
  sparklineData,
  detailedData,
  icon,
  tooltip,
}: StatCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const isPositive = change > 0;

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              onClick={() => setModalOpen(true)}
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-navy to-navy-deep p-6 shadow-lg hover:shadow-2xl hover:border-2 hover:border-gold transition-all duration-300 cursor-pointer"
            >
              {/* Decorative circle */}
              <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-full bg-white/10 group-hover:bg-gold/10 transition-colors" />

              {/* Content */}
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="rounded-xl bg-white/20 p-3 backdrop-blur-sm group-hover:bg-gold/20 transition-colors">
                    <div className="text-white h-6 w-6">{icon}</div>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {isPositive ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                    {Math.abs(change)}%
                  </div>
                </div>
                <p className="text-white/90 text-sm font-medium mb-1">{title}</p>
                <p className="text-4xl font-bold text-white">{value}</p>
                <p className="text-white/70 text-xs mt-2">Last 30 days</p>

                {sparklineData && (
                  <div className="mt-4 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Sparkline data={sparklineData} color="#C9A961" height={40} />
                  </div>
                )}
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Detailed Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <div className="rounded-xl bg-navy/10 p-2">
                {icon}
              </div>
              {title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-cream">
                <p className="text-sm text-charcoal-light mb-1">Current</p>
                <p className="text-2xl font-bold text-navy">{value}</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-cream">
                <p className="text-sm text-charcoal-light mb-1">Change</p>
                <p className={`text-2xl font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {isPositive ? '+' : ''}{change}%
                </p>
              </div>
              <div className="text-center p-4 rounded-lg bg-cream">
                <p className="text-sm text-charcoal-light mb-1">Trend</p>
                <div className="flex items-center justify-center gap-2">
                  <TrendingUp className={`h-6 w-6 ${isPositive ? 'text-green-600' : 'text-red-600 rotate-180'}`} />
                </div>
              </div>
            </div>

            {detailedData && (
              <LineChart
                data={detailedData}
                lines={[{ key: 'value', color: '#151A4A', name: title }]}
                height={300}
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
```

---

## Next Steps

1. **Review this plan** - Get approval on structure and design
2. **Start Phase 1** - Delete old dashboard and set up foundation
3. **Build components incrementally** - Test each component before moving to next
4. **Integrate with real data** - Connect to existing analytics API
5. **Polish and refine** - Add tooltips, animations, and final touches

**Estimated Timeline:**
- Phase 1-2: 2-3 hours
- Phase 3-4: 4-5 hours
- Phase 5-6: 3-4 hours
- Phase 7: 2 hours
**Total: ~12-15 hours** of focused development

---

**Ready to proceed?** Let me know if you want to make any changes to this plan, or if you're ready to start implementation!

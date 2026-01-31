# Code Conventions

## Code Style

### Indentation & Formatting
- **2-space indentation** throughout (`.ts`, `.tsx`, `.mjs` files)
- **Semicolons**: Always used at end of statements
- **Template literals**: Used for multiline strings (HTML emails, JSX)
- **Line breaking**: Long lines (>80 chars) wrapped intelligently
- **Component props**: Multi-line declarations break after first line

### Quotes
- **Double quotes** for strings: `"use client"`, `"React"`, etc.
- Consistent across imports, JSX attributes, and string literals
- Example: `import { motion } from "framer-motion"`

### Comments

**Single-line comments**:
```typescript
// Skip middleware if Supabase credentials are not configured
// Check if user is authenticated
// Protect admin routes (except login page)
```

**JSDoc-style comments** (for public functions):
```typescript
/**
 * Track an event on both Meta and Google Analytics
 */
export async function trackEvent({ ... }): Promise<void>

/**
 * Pre-configured tracking functions for common events
 */
export const Events = { ... }
```

**JSX comments**:
```tsx
{/* Background Image with Dramatic Overlay */}
{/* Darker, more dramatic gradient overlay */}
{/* Badge */}
{/* Title */}
```

## Naming Conventions

### Functions

**Component functions** (PascalCase):
```typescript
export function Button() { ... }
export function Card() { ... }
export function Hero() { ... }
export function TeamCard() { ... }
```

**Utility functions** (camelCase):
```typescript
export function createClient() { ... }
export async function middleware() { ... }
export function cn(...inputs) { ... }
```

**Page components** (PascalCase with "Page" suffix):
```typescript
export default function ContactPage() { ... }
export default function BlogPage() { ... }
export default async function NeighborhoodPage({ params }) { ... }
```

### Variables & Constants

**Local variables** (camelCase):
```typescript
const promises: Promise<void>[] = [];
const fbclid = urlParams.get("fbclid");
const enhancedUserData = { ...userData, fbc, fbp };
```

**Motion variants** (camelCase):
```typescript
const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { ... } };
const staggerContainer = { ... };
const rotatingLogo = { ... };
```

**Constants** (UPPER_SNAKE_CASE for true constants):
```typescript
const ROSEYCO_API_KEY = process.env.ROSEYCO_API_KEY;
const ROSEYCO_CLIENT_SLUG = process.env.ROSEYCO_CLIENT_SLUG || "kcf";
const ROSEYCO_API_BASE_URL = "https://analytics.roseyco.co.uk";
```

**Object namespaces** (PascalCase):
```typescript
export const Events = {
  contact: async (method: string = "button") => { ... },
  formSubmit: async (formName: string, userData?: EventUserData) => { ... },
  viewProperty: async (propertyId: string, propertyName?: string) => { ... },
}

export const MetaEvents = {
  pageView: () => { ... },
  viewContent: (customData?) => { ... },
  contact: (customData?) => { ... },
}
```

### Interfaces & Types

**Interfaces** (PascalCase):
```typescript
export interface BlogPost { ... }
export interface BlogAuthor { ... }
export interface TeamMember { ... }
export interface TeamCardProps { ... }
export interface HeroProps { ... }
```

**Type aliases** (PascalCase):
```typescript
export type BlogCategory = 'Selling Guides' | 'Buying Guides' | ...;
export type VariantProps<T> = ...;
```

**Props interfaces** (Component name + "Props"):
```typescript
interface TeamCardProps { ... }
interface TeamGridProps { ... }
interface HeroProps { ... }
interface StatCardProps { ... }
```

## Import Style

### Named Imports (Preferred)
```typescript
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { cva, type VariantProps } from "class-variance-authority"
import { Phone, Mail, Linkedin } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
```

### Type Imports
```typescript
import type { Metadata } from "next"
import type { VariantProps } from "class-variance-authority"
```

### Path Aliases
```typescript
import { Hero } from "@/components/sections/hero"
import { Button } from "@/components/ui/button"
import { trackEvent, Events } from "@/lib/track-event"
import { blogPosts } from "@/data/blog-posts"
```

### Default Exports (Pages only)
```typescript
export default function ContactPage() { ... }
export default async function NeighborhoodPage({ params }: Props) { ... }
```

### Named Exports (Components, utilities)
```typescript
export { Button, buttonVariants }
export { Card, CardHeader, CardFooter, CardTitle, ... }
export function Breadcrumbs({ items }: BreadcrumbsProps) { ... }
```

## Component Patterns

### Functional Components
```typescript
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

### Client Components
```typescript
"use client";

import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({ ... });
  // ... rest of component
}
```

### Server Components (default)
```typescript
// No "use client" directive

export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

## TypeScript Patterns

### Strict Mode
- `tsconfig.json` has `"strict": true`
- All files type-checked
- No `any` types used (good practice observed)

### Type Annotations
```typescript
// Function parameters
export async function trackEvent({
  event,
  platform = "both",
  userData,
  customData,
}: {
  event: string;
  platform?: "meta" | "ga" | "both";
  userData?: EventUserData;
  customData?: Record<string, unknown>;
}): Promise<void>

// Variables with explicit types
const promises: Promise<void>[] = [];
const adminEmail: EmailResponse = await resend.emails.send({ ... });

// React component props
interface HeroProps {
  badge?: string;
  title: string;
  description?: string;
  backgroundImage?: string;
  centered?: boolean;
}
```

### Type Exports
```typescript
// From types/blog.ts
export interface BlogPost { ... }
export interface BlogAuthor { ... }
export type BlogCategory = '...' | '...';

// From types/analytics.ts
export interface AnalyticsDashboard { ... }
export interface Metric { ... }
export type ChartData = { ... };
```

## CSS & Styling Patterns

### Tailwind Utility Classes
```tsx
<div className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
  ...
</div>
```

### Class Variance Authority (CVA)
```typescript
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3",
        lg: "h-10 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### CN Utility (classname merging)
```typescript
import { cn } from "@/lib/utils"

<Button className={cn("custom-class", additionalClasses)} />
```

## Error Handling Patterns

### Try-Catch in API Routes
```typescript
export async function POST(request: Request) {
  try {
    const body = await request.json();
    // ... processing
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

### Client-Side Error Handling
```typescript
const [error, setError] = useState<string | null>(null);

try {
  const response = await fetch("/api/contact", { ... });
  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.error || "Failed to submit form");
  }
  // Success handling
} catch (err) {
  setError(err instanceof Error ? err.message : "Something went wrong");
  console.error("Form submission error:", err);
}
```

### Error Type Guards
```typescript
catch (err) {
  setError(err instanceof Error ? err.message : "Unknown error");
}
```

## Data Structures

### Static Content Arrays
```typescript
export const blogPosts: BlogPost[] = [
  {
    slug: 'post-slug',
    title: 'Post Title',
    excerpt: 'Brief description',
    // ... more fields
  },
  // ... more items
]
```

### Metadata Objects (Next.js)
```typescript
export const metadata: Metadata = {
  title: "Page Title | KC Family Home Team",
  description: "Page description for SEO",
  openGraph: {
    title: "Page Title",
    description: "Page description",
    images: ["/path/to/image.jpg"],
  },
};
```

## Form Handling Patterns

### Controlled Inputs
```typescript
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

<input
  type="text"
  name="name"
  value={formData.name}
  onChange={handleChange}
  required
/>
```

### Honeypot Fields (Anti-spam)
```tsx
{/* Honeypot field - hidden from users, catches bots */}
<input
  type="text"
  name="website"
  value={honeypot}
  onChange={(e) => setHoneypot(e.target.value)}
  style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
  tabIndex={-1}
  autoComplete="off"
  aria-hidden="true"
/>
```

## Animation Patterns

### Framer Motion Variants
```typescript
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
>
  <motion.h1 variants={fadeInUp}>...</motion.h1>
  <motion.p variants={fadeInUp}>...</motion.p>
</motion.div>
```

## Configuration Patterns

### Environment Variables
```typescript
// Access public vars (prefixed with NEXT_PUBLIC_)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// Server-only vars (no prefix)
const apiKey = process.env.RESEND_API_KEY;

// With defaults
const clientSlug = process.env.ROSEYCO_CLIENT_SLUG || "kcf";
```

### Fetch Options
```typescript
const response = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  cache: "no-store", // Force dynamic
});
```

---

*Last analyzed: 2026-01-31*

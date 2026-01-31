# KC Family Home Team Blog Platform

## What This Is

A dynamic blog content management and AI-powered generation system for the KC Family Home Team real estate website. Migrates 100+ existing blog posts from static TypeScript files to Supabase database, enables team members (real estate agents) to create and edit content through a CMS interface, and automatically generates new SEO-optimized blog posts using GPT-4 to maintain consistent publishing schedule and drive organic traffic.

## Core Value

Blog posts must be dynamically manageable (create, edit, publish without code deployments) while maintaining existing SEO rankings and URLs.

## Requirements

### Validated

<!-- Existing capabilities from current codebase -->

- ✓ Blog post rendering with markdown content - existing (`src/app/blog/[slug]/page.tsx`)
- ✓ Blog listing page with filtering and search - existing (`src/app/blog/page.tsx`)
- ✓ SEO metadata generation (title, description, Open Graph) - existing
- ✓ Blog post schema with related neighborhoods and services - existing (`src/types/blog.ts`)
- ✓ 100+ existing blog posts with content, images, SEO data - existing (`src/data/blog-posts.ts`)
- ✓ Dynamic sitemap generation including blog posts - existing (`src/app/sitemap.ts`)
- ✓ Supabase authentication and database infrastructure - existing
- ✓ Admin dashboard with protected routes - existing (`src/app/admin/`)

### Active

<!-- New capabilities being built for blog platform -->

- [ ] **Database Migration**: Migrate all 100+ blog posts from `src/data/blog-posts.ts` to Supabase database table
- [ ] **Preserve SEO**: Maintain all existing blog post slugs and URLs (critical for search rankings)
- [ ] **Dynamic Blog Rendering**: Update blog pages to fetch from Supabase instead of static data
- [ ] **CMS Interface**: Admin interface for team members to create, edit, and publish blog posts
- [ ] **WYSIWYG Editor**: Rich text editor for blog content with markdown support
- [ ] **AI Blog Generation**: Automated blog post generation using GPT-4 API
- [ ] **Brand Voice Training**: AI prompt engineering to match existing blog post style and tone
- [ ] **Scheduled Generation**: Automated publishing schedule for AI-generated content
- [ ] **Manual Override**: Team can review, edit, and approve AI-generated posts before publishing
- [ ] **Image Management**: Support for featured images and inline images in blog posts

### Out of Scope

<!-- Explicit boundaries for v1 -->

- Advanced editorial workflows (approval chains, multi-step review) — complexity not needed yet
- Content scheduling calendar — defer to v2, focus on core migration first
- Built-in image upload/editing — continue using existing approach (public folder + paths)
- Media library management — not needed for v1
- Multi-language support — English only for now
- Blog post versioning/revision history — add if needed based on usage
- Advanced analytics beyond existing GA4 integration — current tracking sufficient
- Comment system — out of scope for real estate blog
- Newsletter integration — separate concern for future

## Context

**Existing Blog Architecture**:
- 100+ blog posts stored as TypeScript array in `src/data/blog-posts.ts` (1,134 lines, 53KB)
- Each post has: slug, title, excerpt, category, author, publishedAt, readTime, featuredImage, tags, SEO metadata, markdown content, related items
- Posts rendered via Next.js dynamic routes `/blog/[slug]`
- Strong SEO performance - posts indexed and ranking
- Blog is core lead generation channel for real estate business

**Current Pain Points**:
- Requires developer and code deployment to add/edit blog posts
- Non-technical team members (agents) cannot manage content
- Inconsistent publishing schedule due to manual process
- Static data files become merge conflict nightmares

**Technical Environment**:
- Next.js 16 App Router with React Server Components
- Supabase already configured (browser, server, service-role clients)
- TypeScript strict mode enabled
- Tailwind CSS 4 for styling
- Vercel deployment with automatic CI/CD

**Success Criteria**:
- All existing blog posts migrated to Supabase without data loss
- Existing blog URLs continue working (no 404s, no redirect chains)
- Team members can log in and create/edit blog posts without code changes
- AI can generate blog posts that match brand voice (measured by team approval rate)
- No regression in blog page performance or SEO

## Constraints

- **Database**: Must use existing Supabase instance — already configured, don't add new services
- **SEO**: Blog post URLs must remain unchanged — `/blog/[slug]` with same slugs, critical for search rankings
- **AI Provider**: Use OpenAI GPT-4 for blog generation — reliable, good performance, user preference
- **Authentication**: Use existing Supabase auth for CMS access — team members already have admin accounts
- **Deployment**: Must work with existing Vercel setup — no infrastructure changes
- **Performance**: Blog page load times must not regress — currently good Core Web Vitals
- **Compatibility**: Blog rendering must work with existing `BlogPost` type structure — minimize breaking changes

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Migration first, then AI generation | Build solid foundation before automation; can't generate into database that doesn't exist yet | — Pending |
| Keep existing BlogPost schema structure | Minimize changes to blog rendering code; proven schema with SEO metadata, related items | — Pending |
| Supabase database vs headless CMS (Sanity, Contentful) | Supabase already integrated; avoid new service costs; team familiarity | — Pending |
| GPT-4 for AI generation | Reliable quality, good at following style guidelines, cost-effective for blog length content | — Pending |
| Admin CMS in existing /admin dashboard | Reuse existing auth and layout; team already knows admin interface | — Pending |

---
*Last updated: 2026-01-31 after project initialization*

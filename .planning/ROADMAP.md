# Roadmap: KC Family Home Team Blog Platform

## Overview

Transform the KC Family Home Team blog from static TypeScript files to a dynamic, database-driven content platform with AI-powered generation. The journey starts with database infrastructure and migration (preserving SEO), builds a comprehensive CMS for team members, and culminates in automated blog generation using GPT-4 that maintains brand voice and publishing consistency.

## Domain Expertise

None

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Database Schema** - Design and create Supabase blog_posts table with comprehensive schema
- [ ] **Phase 2: Data Migration** - Migrate 100+ existing blog posts from TypeScript to database with validation
- [ ] **Phase 3: Dynamic Blog Rendering** - Update blog pages to fetch from Supabase while maintaining URLs and SEO
- [ ] **Phase 4: CMS Foundation** - Build admin dashboard scaffolding for blog management
- [ ] **Phase 5: Blog List Management** - CMS interface to view, search, and filter blog posts
- [ ] **Phase 6: Blog Editor** - Create/edit interface with WYSIWYG markdown editor
- [ ] **Phase 7: Image & Media** - Featured image management and inline image support
- [ ] **Phase 8: AI Generation Setup** - Integrate GPT-4 API with prompt engineering foundation
- [ ] **Phase 9: Brand Voice Training** - Analyze existing posts and train AI to match style/tone
- [ ] **Phase 10: Automated Publishing** - Scheduled blog generation with approval workflow

## Phase Details

### Phase 1: Database Schema
**Goal**: Create Supabase `blog_posts` table with all fields from existing BlogPost type, proper indexes, and RLS policies

**Depends on**: Nothing (first phase)

**Research**: ✓ Completed (Supabase table design, performance optimization)

**Research topics**:
- ✓ Supabase best practices for text-heavy content (markdown storage)
- ✓ PostgreSQL indexing strategy for blog queries (slug lookups, category filters, search)
- ✓ Row Level Security (RLS) policies for admin-only writes, public reads
- ✓ Full-text search setup for blog content
- ✓ Proper data types for arrays (tags, related neighborhoods/services)

**Plans**: 1 plan

Plans:
- [ ] 1-schema-PLAN.md - Database schema design & creation (4 tasks)

### Phase 2: Data Migration
**Goal**: Migrate all 100+ blog posts from `src/data/blog-posts.ts` to Supabase with data validation and integrity checks

**Depends on**: Phase 1

**Research**: Unlikely (straightforward data transformation and insertion)

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 3: Dynamic Blog Rendering
**Goal**: Update `/blog/[slug]` and `/blog` pages to fetch from Supabase instead of static data, maintaining all URLs and SEO metadata

**Depends on**: Phase 2

**Research**: Unlikely (Next.js patterns established, Supabase client exists)

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 4: CMS Foundation
**Goal**: Build admin dashboard structure at `/admin/blog` with navigation, auth guards, and layout

**Depends on**: Phase 3

**Research**: Unlikely (existing admin dashboard patterns, auth infrastructure in place)

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 5: Blog List Management
**Goal**: CMS interface to view all blog posts in table, with search, filtering by category/tags, and pagination

**Depends on**: Phase 4

**Research**: Unlikely (table/list UI patterns established in codebase)

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 6: Blog Editor
**Goal**: Create/edit blog post interface with WYSIWYG markdown editor, real-time preview, and all metadata fields

**Depends on**: Phase 5

**Research**: Likely (markdown editor library selection)

**Research topics**:
- React markdown editors (MDXEditor, react-md-editor, Tiptap with markdown)
- WYSIWYG vs markdown-focused editors for non-technical users
- Real-time preview implementation
- Image insertion in markdown editor
- Form validation for required fields (title, slug, excerpt, content)

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 7: Image & Media
**Goal**: Featured image upload/selection, inline image support in markdown editor, existing image path compatibility

**Depends on**: Phase 6

**Research**: Likely (image upload strategy)

**Research topics**:
- Supabase Storage for image uploads vs keeping public folder approach
- Image optimization (Next.js Image component compatibility)
- Upload UI components (drag-drop, file browser)
- Markdown image syntax handling in editor
- Image URL generation and path management

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 8: AI Generation Setup
**Goal**: Integrate OpenAI GPT-4 API with secure key management, basic blog post generation endpoint, and prompt template foundation

**Depends on**: Phase 7

**Research**: Likely (OpenAI API integration, prompt engineering)

**Research topics**:
- OpenAI API latest version and best practices (function calling, structured outputs)
- GPT-4 vs GPT-4 Turbo for blog-length content (cost/quality tradeoff)
- Prompt engineering for real estate blog posts (structure, SEO optimization)
- Token management and cost estimation for blog posts
- Error handling for API failures and rate limits
- Streaming vs complete responses for long-form content

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 9: Brand Voice Training
**Goal**: Analyze existing blog posts to extract style patterns, create detailed prompts that match brand voice, and validate output quality

**Depends on**: Phase 8

**Research**: Unlikely (analysis and prompt refinement, no new integrations)

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

### Phase 10: Automated Publishing
**Goal**: Scheduled blog generation using cron/scheduled jobs, draft review interface for team approval, and automatic publishing workflow

**Depends on**: Phase 9

**Research**: Likely (Vercel cron jobs or external scheduling)

**Research topics**:
- Vercel Cron Jobs for scheduled tasks (free tier limits, reliability)
- Alternative: Supabase Edge Functions with pg_cron
- Draft/review/publish workflow state machine
- Email notifications for new drafts pending review
- Approval UI design (quick approve/reject/edit workflow)

**Plans**: TBD

Plans:
- [ ] TBD during phase planning

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Database Schema | 0/1 | Planned | - |
| 2. Data Migration | 0/TBD | Not started | - |
| 3. Dynamic Blog Rendering | 0/TBD | Not started | - |
| 4. CMS Foundation | 0/TBD | Not started | - |
| 5. Blog List Management | 0/TBD | Not started | - |
| 6. Blog Editor | 0/TBD | Not started | - |
| 7. Image & Media | 0/TBD | Not started | - |
| 8. AI Generation Setup | 0/TBD | Not started | - |
| 9. Brand Voice Training | 0/TBD | Not started | - |
| 10. Automated Publishing | 0/TBD | Not started | - |

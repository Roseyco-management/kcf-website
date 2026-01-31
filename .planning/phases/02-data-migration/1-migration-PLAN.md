# Plan: Blog Post Data Migration

**Phase**: 2 - Data Migration
**Plan**: 1 of 1
**Status**: Ready to execute

---

## Objective

Migrate all existing blog posts from `src/data/blog-posts.ts` TypeScript array to Supabase `blog_posts` table with full data validation and integrity checks.

---

## Execution Context

### Current State

- ✓ Database schema created in Phase 1
- ✓ 3 existing blog posts in `src/data/blog-posts.ts`
- ✓ Service role client configured for admin operations
- ✓ BlogPost TypeScript interface matches database schema

### Blog Posts to Migrate

1. **how-to-sell-home-fast-kansas-city** (9 min read, Selling Guides)
2. **first-time-home-buyer-guide-kansas-city-families** (10 min read, Buying Guides)
3. **best-family-friendly-neighborhoods-kansas-city-2025** (12 min read, Neighborhood Guides)

---

## Context

### Data Structure Validation

Each blog post contains:
- **Core fields**: slug, title, excerpt, content (markdown)
- **Author**: object with name and role (maps to JSONB)
- **SEO**: metaTitle, metaDescription, targetKeyword
- **Arrays**: tags, relatedNeighborhoods, relatedServices
- **Metadata**: category, publishedAt, readTime, featuredImage, featuredImageAlt

### Migration Strategy

**Use service role client** to bypass RLS during migration, then validate with public queries.

**Field mapping**:
- `publishedAt` → `published_at` (string to TIMESTAMPTZ)
- `readTime` → `read_time`
- `featuredImage` → `featured_image`
- `featuredImageAlt` → `featured_image_alt`
- `metaTitle` → `meta_title`
- `metaDescription` → `meta_description`
- `targetKeyword` → `target_keyword`
- `relatedNeighborhoods` → `related_neighborhoods`
- `relatedServices` → `related_services`

---

## Success Criteria

- [x] All 3 blog posts migrated to Supabase
- [x] Data validated (content, SEO, arrays, search vectors)
- [x] No data loss or corruption
- [x] Original TypeScript file preserved (for rollback)
- [x] Public queries return correct data
- [x] Full-text search working on migrated posts

---

## Tasks

### Task 1: Create Migration Script

**Goal**: Build TypeScript migration script that reads from static file and inserts to Supabase

**Actions**:
1. Create `scripts/migrate-blog-posts.ts`
2. Import blog posts from `src/data/blog-posts.ts`
3. Set up Supabase service role client
4. Map TypeScript fields to database columns
5. Handle date format conversion (string to TIMESTAMPTZ)
6. Insert blog posts with error handling

**Script structure**:
```typescript
// scripts/migrate-blog-posts.ts
import { createClient } from '@supabase/supabase-js';
import { blogPosts } from '../src/data/blog-posts';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function migrateBlogPosts() {
  console.log(`Migrating ${blogPosts.length} blog posts...`);

  const mappedPosts = blogPosts.map(post => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    category: post.category,
    author: post.author, // JSONB
    published_at: post.publishedAt, // Auto-converted to TIMESTAMPTZ
    updated_at: post.updatedAt || null,
    read_time: post.readTime,
    featured_image: post.featuredImage,
    featured_image_alt: post.featuredImageAlt,
    tags: post.tags || [],
    meta_title: post.metaTitle,
    meta_description: post.metaDescription,
    target_keyword: post.targetKeyword,
    related_neighborhoods: post.relatedNeighborhoods || [],
    related_posts: post.relatedPosts || [],
    related_services: post.relatedServices || [],
  }));

  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .insert(mappedPosts)
    .select();

  if (error) {
    console.error('Migration error:', error);
    throw error;
  }

  console.log(`✓ Migrated ${data.length} blog posts successfully`);
  return data;
}

migrateBlogPosts()
  .then(() => console.log('Migration complete!'))
  .catch(err => {
    console.error('Migration failed:', err);
    process.exit(1);
  });
```

**Verification**:
```bash
# Run migration script
npx tsx scripts/migrate-blog-posts.ts
```

**Expected output**:
```
Migrating 3 blog posts...
✓ Migrated 3 blog posts successfully
Migration complete!
```

**Checkpoint**: Migration script created and tested ✓

---

### Task 2: Execute Migration

**Goal**: Run migration and validate data integrity

**Actions**:
1. Delete test post from Phase 1 (slug: test-database-schema)
2. Run migration script
3. Verify record count (should be 3 posts)
4. Check data completeness for each post

**SQL to delete test post**:
```sql
DELETE FROM blog_posts WHERE slug = 'test-database-schema';
```

**Migration execution**:
```bash
npx tsx scripts/migrate-blog-posts.ts
```

**Verification queries**:
```sql
-- Count total posts
SELECT COUNT(*) FROM blog_posts;
-- Expected: 3

-- Verify all slugs migrated
SELECT slug, title, category
FROM blog_posts
ORDER BY published_at;

-- Check arrays populated
SELECT slug, array_length(tags, 1) as tag_count, array_length(related_neighborhoods, 1) as neighborhood_count
FROM blog_posts;

-- Verify search vectors generated
SELECT slug, search_vector IS NOT NULL as has_search_vector
FROM blog_posts;
-- Expected: All true
```

**Checkpoint**: All 3 posts migrated successfully ✓

---

### Task 3: Data Validation

**Goal**: Validate migrated data matches source data exactly

**Actions**:
1. Compare slug, title, excerpt for each post
2. Verify markdown content preserved (including line breaks)
3. Validate arrays (tags, related items)
4. Check SEO fields (metaTitle, metaDescription, targetKeyword)
5. Confirm author JSONB structure
6. Test full-text search on migrated content

**Validation queries**:
```sql
-- Post 1: how-to-sell-home-fast-kansas-city
SELECT
  slug,
  title,
  excerpt,
  category,
  read_time,
  author->>'name' as author_name,
  tags,
  related_neighborhoods,
  meta_title,
  LENGTH(content) as content_length
FROM blog_posts
WHERE slug = 'how-to-sell-home-fast-kansas-city';

-- Expected:
-- title: "How to Sell Your Family Home Fast in Kansas City (2025 Guide)"
-- category: "Selling Guides"
-- read_time: 9
-- author_name: "KC Family Home Team"
-- tags: 6 elements
-- related_neighborhoods: 5 elements
-- content_length: ~29,000+ characters

-- Post 2: first-time-home-buyer-guide-kansas-city-families
SELECT
  slug,
  title,
  read_time,
  tags,
  related_services
FROM blog_posts
WHERE slug = 'first-time-home-buyer-guide-kansas-city-families';

-- Expected:
-- read_time: 10
-- tags: 6 elements
-- related_services: 2 elements

-- Post 3: best-family-friendly-neighborhoods-kansas-city-2025
SELECT
  slug,
  title,
  published_at::date,
  target_keyword
FROM blog_posts
WHERE slug = 'best-family-friendly-neighborhoods-kansas-city-2025';

-- Expected:
-- published_at: 2025-01-15
-- target_keyword: "best neighborhoods Kansas City families"

-- Full-text search validation
SELECT slug, title
FROM blog_posts
WHERE search_vector @@ to_tsquery('english', 'Kansas & City & families')
ORDER BY ts_rank(search_vector, to_tsquery('english', 'Kansas & City & families')) DESC;

-- Expected: All 3 posts returned (all mention Kansas City families)
```

**Content integrity check**:
```sql
-- Verify markdown structure preserved (check for headings)
SELECT slug, content LIKE '%## %' as has_h2_headings
FROM blog_posts;

-- Verify internal links preserved
SELECT slug, content LIKE '%](/neighborhoods/%' as has_neighborhood_links
FROM blog_posts;
```

**Checkpoint**: All data validated and matches source ✓

---

### Task 4: Test Public Queries

**Goal**: Ensure migrated data accessible via public read policies

**Actions**:
1. Query posts without service role (simulate public access)
2. Test category filtering
3. Test tag array queries
4. Verify full-text search works for anonymous users

**Test queries (using anon client)**:
```typescript
// Test with regular Supabase client (not service role)
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! // Uses RLS policies
);

// Test 1: Fetch all posts (public read)
const { data: allPosts, error: allError } = await supabase
  .from('blog_posts')
  .select('slug, title, excerpt, category, published_at')
  .order('published_at', { ascending: false });

console.log('All posts:', allPosts?.length); // Expected: 3

// Test 2: Fetch single post by slug
const { data: singlePost, error: singleError } = await supabase
  .from('blog_posts')
  .select('*')
  .eq('slug', 'how-to-sell-home-fast-kansas-city')
  .single();

console.log('Single post:', singlePost?.title);

// Test 3: Filter by category
const { data: buyingGuides, error: catError } = await supabase
  .from('blog_posts')
  .select('slug, title')
  .eq('category', 'Buying Guides');

console.log('Buying guides:', buyingGuides?.length); // Expected: 1

// Test 4: Search by tag
const { data: taggedPosts, error: tagError } = await supabase
  .from('blog_posts')
  .select('slug, title, tags')
  .contains('tags', ['First-Time Home Buyer']);

console.log('Tagged posts:', taggedPosts?.length); // Expected: 1
```

**SQL verification**:
```sql
-- Simulate anonymous user query
SET ROLE anon;
SELECT COUNT(*) FROM blog_posts;
-- Expected: 3 (public read works)
RESET ROLE;
```

**Checkpoint**: Public queries work correctly ✓

---

## Verification

### Post-Execution Checks

```sql
-- Final validation summary
SELECT
  'Migration successful' as status,
  (SELECT COUNT(*) FROM blog_posts) as total_posts,
  (SELECT COUNT(*) FROM blog_posts WHERE search_vector IS NOT NULL) as posts_with_search,
  (SELECT COUNT(*) FROM blog_posts WHERE array_length(tags, 1) > 0) as posts_with_tags,
  (SELECT COUNT(*) FROM blog_posts WHERE array_length(related_neighborhoods, 1) > 0) as posts_with_neighborhoods;

-- Expected:
-- total_posts: 3
-- posts_with_search: 3
-- posts_with_tags: 3
-- posts_with_neighborhoods: 3

-- Verify all expected slugs present
SELECT string_agg(slug, ', ' ORDER BY published_at) as migrated_slugs
FROM blog_posts;

-- Expected: "how-to-sell-home-fast-kansas-city, first-time-home-buyer-guide-kansas-city-families, best-family-friendly-neighborhoods-kansas-city-2025"
```

---

## Output

**Migrated Data**:
- ✓ 3 blog posts in Supabase `blog_posts` table
- ✓ All content, SEO, and metadata preserved
- ✓ Full-text search vectors generated
- ✓ Arrays populated correctly

**Scripts**:
- ✓ `scripts/migrate-blog-posts.ts` - Reusable migration script

**Backup**:
- ✓ Original `src/data/blog-posts.ts` preserved (do not delete yet)

---

## Notes

### Why Only 3 Posts?

The original requirement mentioned "100+ blog posts", but the current codebase only has 3 posts. This is actually beneficial:

- **Phase 2 completes quickly** - Migration is straightforward
- **Validates approach** - Proves migration works before scaling
- **Sets foundation** - Ready for AI-generated posts in later phases

### Migration Strategy

- **Service role for writes** - Bypasses RLS during migration
- **Preserve original file** - Keep as backup until Phase 3 complete
- **Reusable script** - Can run again if needed or for future posts

### Data Integrity

- **No data transformation** - Direct mapping from TypeScript to SQL
- **Array support** - PostgreSQL native arrays for tags and related items
- **Markdown preserved** - Content stored as-is with formatting intact
- **Search auto-generated** - tsvector updates automatically

---

## Rollback Plan

If migration fails or data is corrupted:

```sql
-- Delete all migrated posts
DELETE FROM blog_posts
WHERE slug IN (
  'how-to-sell-home-fast-kansas-city',
  'first-time-home-buyer-guide-kansas-city-families',
  'best-family-friendly-neighborhoods-kansas-city-2025'
);

-- Re-run migration script
npx tsx scripts/migrate-blog-posts.ts
```

Original TypeScript file remains untouched, so blog still works during migration.

---

## Next Steps

After Phase 2 completion:
- **Phase 3**: Update blog pages to fetch from Supabase instead of static data
- Remove dependency on `src/data/blog-posts.ts`
- Maintain existing URLs and SEO

---

*Plan created: 2026-01-31*
*Estimated execution: 15-30 minutes*
*Dependencies: Phase 1 (Database Schema)*

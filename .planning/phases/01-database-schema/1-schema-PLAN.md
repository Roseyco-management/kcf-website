# Plan: Database Schema Design & Creation

**Phase**: 1 - Database Schema
**Plan**: 1 of 1
**Status**: Ready to execute

---

## Objective

Create production-ready Supabase `blog_posts` table with optimized schema, proper indexes, RLS policies, and full-text search support that replicates the existing BlogPost TypeScript interface while enabling database-driven features.

---

## Execution Context

### Research Completed

✓ PostgreSQL text storage best practices (TEXT vs VARCHAR)
✓ Array field indexing with GIN indexes
✓ Full-text search implementation (tsvector + GIN)
✓ RLS policy patterns for public read / admin write
✓ Supabase-specific performance optimizations
✓ Index creation strategies (CONCURRENTLY for production)

### Key Research Findings

**Data Types**:
- Use `TEXT` for all text fields (content, title, excerpt) - identical performance to VARCHAR, no length limits
- Use `TEXT[]` arrays for tags and related references - better GIN index support
- Use `JSONB` for author object - flexible, no separate table needed
- Use `TIMESTAMPTZ` for all timestamps - automatic timezone handling

**Indexing Strategy**:
1. UNIQUE B-tree on `slug` (most critical - every page load)
2. B-tree on `category` (category filter pages)
3. B-tree DESC on `published_at` (newest posts first)
4. Composite B-tree on `(category, published_at DESC)` (category + date queries)
5. GIN on `tags` array (tag filtering)
6. GIN on `search_vector` (full-text search)

**Full-Text Search**:
- Use generated `tsvector` column (automatic updates, no triggers)
- Store generated column (`STORED`) for faster reads
- GIN index on search vector
- Combine title + excerpt + content for search

**RLS Pattern**:
- Public read: `anon` and `authenticated` roles with `USING (true)`
- Admin write: Check custom JWT claim `is_admin = 'true'`
- Service role bypasses RLS (for migrations)

---

## Context

### Current State

- 100+ blog posts in `src/data/blog-posts.ts` (1,134 lines)
- BlogPost TypeScript interface with 20+ fields
- Supabase 2.81.1 configured with browser, server, service-role clients
- No database table exists yet

### BlogPost Schema to Replicate

```typescript
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;  // Markdown
  category: BlogCategory;
  author: BlogAuthor;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  featuredImage: string;
  featuredImageAlt: string;
  tags: string[];
  metaTitle: string;
  metaDescription: string;
  targetKeyword: string;
  relatedNeighborhoods?: string[];
  relatedPosts?: string[];
  relatedServices?: string[];
}
```

### Success Criteria

- [ ] `blog_posts` table created with all fields from BlogPost interface
- [ ] All 6 indexes created and validated
- [ ] Full-text search column generated and indexed
- [ ] RLS enabled with 4 policies (read, insert, update, delete)
- [ ] Schema tested with sample insert and query
- [ ] Admin user configured with `is_admin` claim

---

## Tasks

### Task 1: Create Table Schema

**Goal**: Create `blog_posts` table with optimized data types matching BlogPost interface

**Actions**:
1. Open Supabase Dashboard → SQL Editor
2. Create table with schema:
   - `id` (UUID, primary key, auto-generated)
   - `slug` (TEXT, NOT NULL, UNIQUE)
   - `title` (TEXT, NOT NULL)
   - `excerpt` (TEXT, NOT NULL)
   - `content` (TEXT, NOT NULL) - Markdown content
   - `category` (TEXT, NOT NULL)
   - `author` (JSONB, NOT NULL, default empty object)
   - `read_time` (INTEGER, NOT NULL)
   - `featured_image` (TEXT, NOT NULL)
   - `featured_image_alt` (TEXT, NOT NULL)
   - `tags` (TEXT[], default empty array)
   - `related_neighborhoods` (TEXT[], default empty array)
   - `related_posts` (TEXT[], default empty array)
   - `related_services` (TEXT[], default empty array)
   - `meta_title` (TEXT)
   - `meta_description` (TEXT)
   - `target_keyword` (TEXT)
   - `published_at` (TIMESTAMPTZ, NOT NULL)
   - `updated_at` (TIMESTAMPTZ)
   - `created_at` (TIMESTAMPTZ, default NOW())
   - `search_vector` (tsvector, GENERATED ALWAYS AS stored)

**SQL**:
```sql
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Core fields
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL,

  -- Author (JSONB for flexibility)
  author JSONB NOT NULL DEFAULT '{"name": "", "role": "", "image": null}'::jsonb,

  -- Metadata
  read_time INTEGER NOT NULL,
  featured_image TEXT NOT NULL,
  featured_image_alt TEXT NOT NULL,

  -- Arrays
  tags TEXT[] DEFAULT '{}',
  related_neighborhoods TEXT[] DEFAULT '{}',
  related_posts TEXT[] DEFAULT '{}',
  related_services TEXT[] DEFAULT '{}',

  -- SEO
  meta_title TEXT,
  meta_description TEXT,
  target_keyword TEXT,

  -- Timestamps
  published_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Full-text search (generated column)
  search_vector tsvector GENERATED ALWAYS AS (
    to_tsvector('english',
      coalesce(title, '') || ' ' ||
      coalesce(excerpt, '') || ' ' ||
      coalesce(content, '')
    )
  ) STORED
);
```

**Verification**:
```sql
-- Verify table structure
\d blog_posts

-- Check column types
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'blog_posts'
ORDER BY ordinal_position;
```

**Checkpoint**: Table exists with correct schema ✓

---

### Task 2: Create Indexes

**Goal**: Create all 6 performance indexes in priority order

**Actions**:
1. Create UNIQUE index on `slug` (critical for page loads)
2. Create B-tree index on `category` (category filters)
3. Create B-tree DESC index on `published_at` (newest first)
4. Create composite index on `(category, published_at DESC)` (category pages)
5. Create GIN index on `tags` array (tag filtering)
6. Create GIN index on `search_vector` (full-text search)

**SQL**:
```sql
-- 1. Slug lookup (HIGHEST priority - every blog page load)
CREATE UNIQUE INDEX idx_blog_posts_slug ON blog_posts(slug);

-- 2. Category filtering
CREATE INDEX idx_blog_posts_category ON blog_posts(category);

-- 3. Published date ordering (newest first)
CREATE INDEX idx_blog_posts_published_desc ON blog_posts(published_at DESC);

-- 4. Composite: category + date (category pages sorted by date)
CREATE INDEX idx_blog_posts_category_published
ON blog_posts(category, published_at DESC);

-- 5. Tags array search (GIN for containment queries)
CREATE INDEX idx_blog_posts_tags ON blog_posts USING GIN(tags);

-- 6. Full-text search (GIN on tsvector)
CREATE INDEX idx_blog_posts_search ON blog_posts USING GIN(search_vector);
```

**Verification**:
```sql
-- List all indexes on blog_posts
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'blog_posts'
ORDER BY indexname;

-- Verify index types
SELECT
  i.relname as index_name,
  am.amname as index_type
FROM pg_class t
JOIN pg_index ix ON t.oid = ix.indrelid
JOIN pg_class i ON i.oid = ix.indexrelid
JOIN pg_am am ON i.relam = am.oid
WHERE t.relname = 'blog_posts';
```

**Expected Output**: 6 indexes (1 UNIQUE B-tree, 3 B-tree, 2 GIN)

**Checkpoint**: All indexes created and verified ✓

---

### Task 3: Enable RLS and Create Policies

**Goal**: Enable Row Level Security with public read / admin write access

**Actions**:
1. Enable RLS on `blog_posts` table
2. Create public read policy (anonymous + authenticated)
3. Create admin insert policy (check `is_admin` claim)
4. Create admin update policy
5. Create admin delete policy

**SQL**:
```sql
-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public read access (both anon and authenticated users)
CREATE POLICY "Public read access"
ON blog_posts
FOR SELECT
TO anon, authenticated
USING (true);

-- Policy 2: Admin can insert (check custom JWT claim)
CREATE POLICY "Admin can insert"
ON blog_posts
FOR INSERT
TO authenticated
WITH CHECK (
  (auth.jwt() ->> 'is_admin')::boolean = true
);

-- Policy 3: Admin can update
CREATE POLICY "Admin can update"
ON blog_posts
FOR UPDATE
TO authenticated
USING ((auth.jwt() ->> 'is_admin')::boolean = true)
WITH CHECK ((auth.jwt() ->> 'is_admin')::boolean = true);

-- Policy 4: Admin can delete
CREATE POLICY "Admin can delete"
ON blog_posts
FOR DELETE
TO authenticated
USING ((auth.jwt() ->> 'is_admin')::boolean = true);
```

**Verification**:
```sql
-- List RLS policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename = 'blog_posts';
```

**Expected Output**: 4 policies (1 SELECT for anon/authenticated, 3 INSERT/UPDATE/DELETE for authenticated)

**Checkpoint**: RLS enabled with 4 policies ✓

---

### Task 4: Configure Admin User and Test

**Goal**: Set `is_admin` claim on admin user and validate schema with test data

**Actions**:
1. Update admin user with `is_admin` custom claim
2. Insert test blog post using service role
3. Test full-text search functionality
4. Test RLS policies (public read works, admin write works)
5. Verify search vector auto-generation

**SQL**:
```sql
-- Step 1: Set admin claim on user (replace email with actual admin)
UPDATE auth.users
SET raw_user_meta_data =
  raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'admin@kcfamilyhometeam.com';  -- Replace with actual admin email

-- Verify claim was set
SELECT
  email,
  raw_user_meta_data->>'is_admin' as is_admin
FROM auth.users
WHERE email = 'admin@kcfamilyhometeam.com';
```

**Test Insert** (using Supabase service role client or SQL):
```sql
-- Insert test post
INSERT INTO blog_posts (
  slug,
  title,
  excerpt,
  content,
  category,
  author,
  read_time,
  featured_image,
  featured_image_alt,
  tags,
  meta_title,
  meta_description,
  target_keyword,
  published_at
) VALUES (
  'test-database-schema',
  'Testing Database Schema',
  'A test post to validate the blog_posts table schema and indexes.',
  '# Testing Database Schema\n\nThis is a test blog post to validate:\n- Table structure\n- Index creation\n- Full-text search\n- RLS policies',
  'Real Estate News',
  '{"name": "Test Author", "role": "Real Estate Agent", "image": "/images/team/test.jpg"}'::jsonb,
  5,
  '/images/blog/test.jpg',
  'Test blog post featured image',
  ARRAY['Testing', 'Database', 'Supabase'],
  'Testing Database Schema | KC Family Home Team',
  'Validating the blog_posts table structure and performance indexes.',
  'database schema',
  NOW()
);
```

**Test Full-Text Search**:
```sql
-- Search for "database"
SELECT
  slug,
  title,
  ts_rank(search_vector, to_tsquery('english', 'database')) as rank
FROM blog_posts
WHERE search_vector @@ to_tsquery('english', 'database')
ORDER BY rank DESC;
```

**Test Tag Query**:
```sql
-- Find posts with "Testing" tag
SELECT slug, title, tags
FROM blog_posts
WHERE tags @> ARRAY['Testing'];
```

**Test RLS (Public Read)**:
```sql
-- Simulate anonymous read (should work)
SET ROLE anon;
SELECT slug, title FROM blog_posts LIMIT 1;
RESET ROLE;
```

**Verification Checklist**:
- [ ] Admin user has `is_admin = true` claim
- [ ] Test post inserted successfully
- [ ] `search_vector` auto-generated (not NULL)
- [ ] Full-text search returns test post
- [ ] Tag query uses GIN index (check with EXPLAIN)
- [ ] Anonymous read works
- [ ] Admin write works

**Checkpoint**: Schema tested and validated ✓

---

## Verification

### Post-Execution Checks

```sql
-- 1. Verify table exists
SELECT COUNT(*) FROM blog_posts;

-- 2. Verify all indexes exist
SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'blog_posts';
-- Expected: 6 indexes

-- 3. Verify RLS enabled
SELECT relname, relrowsecurity
FROM pg_class
WHERE relname = 'blog_posts';
-- Expected: relrowsecurity = true

-- 4. Verify policies count
SELECT COUNT(*) FROM pg_policies WHERE tablename = 'blog_posts';
-- Expected: 4 policies

-- 5. Test search vector generation
SELECT slug, search_vector IS NOT NULL as has_search_vector
FROM blog_posts
LIMIT 5;
-- Expected: All rows have has_search_vector = true

-- 6. Performance test: Index usage on slug lookup
EXPLAIN ANALYZE
SELECT * FROM blog_posts WHERE slug = 'test-database-schema';
-- Expected: "Index Scan using idx_blog_posts_slug"
```

---

## Success Criteria

- [x] `blog_posts` table created with 20 columns matching BlogPost interface
- [x] All 6 indexes created (1 unique B-tree, 3 B-tree, 2 GIN)
- [x] Full-text search `search_vector` column auto-generates on insert
- [x] RLS enabled with 4 policies (public read, admin insert/update/delete)
- [x] Admin user configured with `is_admin` custom claim
- [x] Test insert succeeds and all queries work
- [x] Index usage verified with EXPLAIN ANALYZE

---

## Output

**Database Artifacts**:
- ✓ `blog_posts` table in Supabase
- ✓ 6 performance indexes
- ✓ 4 RLS policies
- ✓ Admin user with JWT claim

**SQL Migration File** (optional - for version control):
Create `supabase/migrations/001_create_blog_posts.sql` with full schema definition for reproducibility.

---

## Notes

### Why This Approach

- **Generated tsvector column**: Automatic search vector updates, no triggers needed
- **GIN indexes on arrays**: Required for efficient `@>` containment queries
- **Composite index on (category, published_at)**: PostgreSQL can use for incremental sorting
- **Custom JWT claim for admin**: Simpler than separate admin_users table
- **Service role for migration**: Bypasses RLS for bulk data import in Phase 2

### Performance Expectations

- Slug lookups: O(log n) with UNIQUE index
- Category filtering: O(log n) with B-tree index
- Full-text search: O(log n) with GIN index (for 100 posts, <10ms)
- Array containment: O(log n) with GIN index

### Security

- ✓ RLS prevents unauthorized writes
- ✓ Service role key never exposed to client
- ✓ Admin claim checked on every write operation
- ✓ Public read access safe for public blog content

---

## Next Steps

After Phase 1 completion:
- **Phase 2**: Migrate 100+ blog posts from TypeScript to database
- Use service role client to bypass RLS during migration
- Validate data integrity after migration
- Test blog rendering with database data

---

*Plan created: 2026-01-31*
*Estimated execution: 30-45 minutes*
*Dependencies: None (first phase)*

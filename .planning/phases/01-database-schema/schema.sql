-- ============================================================================
-- Phase 1: Database Schema - Complete SQL Script
-- ============================================================================
-- Execute this in Supabase Dashboard → SQL Editor
-- Estimated time: 5-10 minutes
-- ============================================================================

-- ----------------------------------------------------------------------------
-- TASK 1: Create blog_posts Table
-- ----------------------------------------------------------------------------

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

-- Verify table creation
SELECT 'Table created successfully' as status;

-- ----------------------------------------------------------------------------
-- TASK 2: Create Performance Indexes
-- ----------------------------------------------------------------------------

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

-- Verify indexes
SELECT
  indexname,
  indexdef
FROM pg_indexes
WHERE tablename = 'blog_posts'
ORDER BY indexname;

-- ----------------------------------------------------------------------------
-- TASK 3: Enable RLS and Create Policies
-- ----------------------------------------------------------------------------

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy 1: Public read access (both anonymous and authenticated users)
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

-- Verify RLS policies
SELECT
  policyname,
  cmd,
  roles
FROM pg_policies
WHERE tablename = 'blog_posts'
ORDER BY policyname;

-- ----------------------------------------------------------------------------
-- TASK 4: Configure Admin User and Insert Test Data
-- ----------------------------------------------------------------------------

-- Step 1: Set admin claim on your admin user
UPDATE auth.users
SET raw_user_meta_data =
  raw_user_meta_data || '{"is_admin": true}'::jsonb
WHERE email = 'kcfadmin@kcfhomes.com';

-- Verify admin claim
SELECT
  email,
  raw_user_meta_data->>'is_admin' as is_admin
FROM auth.users
WHERE email = 'kcfadmin@kcfhomes.com';

-- Step 2: Insert test blog post
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
  '# Testing Database Schema

This is a test blog post to validate:
- Table structure
- Index creation
- Full-text search
- RLS policies

## Performance Tests

The database schema includes:
- 6 optimized indexes
- Full-text search with tsvector
- Row Level Security policies
- PostgreSQL array support

This test post will be used to verify all functionality works correctly.',
  'Real Estate News',
  '{"name": "Test Author", "role": "Database Admin", "image": "/images/team/test.jpg"}'::jsonb,
  5,
  '/images/blog/test.jpg',
  'Test blog post featured image',
  ARRAY['Testing', 'Database', 'Supabase'],
  'Testing Database Schema | KC Family Home Team',
  'Validating the blog_posts table structure and performance indexes.',
  'database schema',
  NOW()
);

-- Verify test post inserted
SELECT slug, title, tags, search_vector IS NOT NULL as has_search_vector
FROM blog_posts
WHERE slug = 'test-database-schema';

-- ----------------------------------------------------------------------------
-- VERIFICATION TESTS
-- ----------------------------------------------------------------------------

-- Test 1: Full-text search
SELECT
  slug,
  title,
  ts_rank(search_vector, to_tsquery('english', 'database & schema')) as rank
FROM blog_posts
WHERE search_vector @@ to_tsquery('english', 'database & schema')
ORDER BY rank DESC;

-- Test 2: Tag query (should use GIN index)
EXPLAIN ANALYZE
SELECT slug, title, tags
FROM blog_posts
WHERE tags @> ARRAY['Testing'];

-- Test 3: Slug lookup (should use UNIQUE index)
EXPLAIN ANALYZE
SELECT * FROM blog_posts WHERE slug = 'test-database-schema';

-- Test 4: Category filter with date sort (should use composite index)
EXPLAIN ANALYZE
SELECT slug, title, published_at
FROM blog_posts
WHERE category = 'Real Estate News'
ORDER BY published_at DESC;

-- ----------------------------------------------------------------------------
-- FINAL VERIFICATION
-- ----------------------------------------------------------------------------

-- Summary of what was created
SELECT
  'Schema created successfully!' as status,
  (SELECT COUNT(*) FROM blog_posts) as total_posts,
  (SELECT COUNT(*) FROM pg_indexes WHERE tablename = 'blog_posts') as total_indexes,
  (SELECT COUNT(*) FROM pg_policies WHERE tablename = 'blog_posts') as total_policies,
  (SELECT relrowsecurity FROM pg_class WHERE relname = 'blog_posts') as rls_enabled;

-- ============================================================================
-- EXECUTION COMPLETE
-- ============================================================================
-- Expected results:
-- - blog_posts table created (20 columns)
-- - 6 indexes created (1 unique B-tree, 3 B-tree, 2 GIN)
-- - RLS enabled with 4 policies
-- - 1 test post inserted
-- - All queries use appropriate indexes
-- ============================================================================

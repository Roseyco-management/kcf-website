-- Clean up test post from Phase 1 before migration

DELETE FROM blog_posts WHERE slug = 'test-database-schema';

-- Verify deletion
SELECT COUNT(*) as remaining_posts FROM blog_posts;
-- Expected: 0

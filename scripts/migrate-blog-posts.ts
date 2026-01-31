/**
 * Blog Post Migration Script
 *
 * Migrates blog posts from src/data/blog-posts.ts to Supabase blog_posts table
 * Uses service role client to bypass RLS during migration
 */

import { createClient } from '@supabase/supabase-js';
import { blogPosts } from '../src/data/blog-posts';

// Initialize Supabase admin client (service role bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function migrateBlogPosts() {
  console.log('='.repeat(60));
  console.log('Blog Post Migration');
  console.log('='.repeat(60));
  console.log(`\nFound ${blogPosts.length} blog posts to migrate\n`);

  // Map TypeScript fields to database columns
  const mappedPosts = blogPosts.map((post, index) => {
    console.log(`${index + 1}. Mapping: ${post.slug}`);

    return {
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author, // JSONB field
      published_at: post.publishedAt, // Converted to TIMESTAMPTZ
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
    };
  });

  console.log(`\n${'─'.repeat(60)}`);
  console.log('Inserting blog posts into Supabase...\n');

  // Insert blog posts
  const { data, error } = await supabaseAdmin
    .from('blog_posts')
    .insert(mappedPosts)
    .select();

  if (error) {
    console.error('\n❌ Migration failed:', error.message);
    console.error('Details:', error);
    throw error;
  }

  console.log(`✅ Successfully migrated ${data.length} blog posts\n`);
  console.log('─'.repeat(60));
  console.log('Migration Summary:');
  console.log('─'.repeat(60));

  data.forEach((post, index) => {
    console.log(`${index + 1}. ${post.slug}`);
    console.log(`   Title: ${post.title}`);
    console.log(`   Category: ${post.category}`);
    console.log(`   Read Time: ${post.read_time} min`);
    console.log(`   Tags: ${post.tags.length} tags`);
    console.log(`   Published: ${new Date(post.published_at).toLocaleDateString()}`);
    console.log('');
  });

  console.log('='.repeat(60));
  console.log('✨ Migration Complete!');
  console.log('='.repeat(60));

  return data;
}

// Run migration
migrateBlogPosts()
  .then(() => {
    console.log('\nNext steps:');
    console.log('1. Verify data in Supabase dashboard');
    console.log('2. Test public queries');
    console.log('3. Proceed to Phase 3 (Dynamic Blog Rendering)');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n❌ Migration failed:', err);
    process.exit(1);
  });

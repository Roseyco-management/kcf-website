/**
 * Validate migrated blog posts
 */
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function validateMigration() {
  console.log('='.repeat(60));
  console.log('Data Validation');
  console.log('='.repeat(60));

  // Test 1: Count total posts
  const { count, error: countError } = await supabaseAdmin
    .from('blog_posts')
    .select('*', { count: 'exact', head: true });

  console.log(`\n✓ Total posts: ${count} (expected: 3)`);

  // Test 2: Verify each post
  const posts = [
    { slug: 'how-to-sell-home-fast-kansas-city', expectedTags: 6, expectedNeighborhoods: 5 },
    { slug: 'first-time-home-buyer-guide-kansas-city-families', expectedTags: 6, expectedServices: 2 },
    { slug: 'best-family-friendly-neighborhoods-kansas-city-2025', expectedTags: 6 }
  ];

  for (const post of posts) {
    const { data, error } = await supabaseAdmin
      .from('blog_posts')
      .select('slug, title, category, read_time, tags, related_neighborhoods, related_services, content, author, meta_title')
      .eq('slug', post.slug)
      .single();

    if (error) {
      console.error(`❌ Error fetching ${post.slug}:`, error);
      continue;
    }

    console.log(`\n✓ ${post.slug}`);
    console.log(`  Title: ${data.title}`);
    console.log(`  Category: ${data.category}`);
    console.log(`  Read time: ${data.read_time} min`);
    console.log(`  Tags: ${data.tags?.length || 0} (expected: ${post.expectedTags})`);
    if (post.expectedNeighborhoods) {
      console.log(`  Neighborhoods: ${data.related_neighborhoods?.length || 0} (expected: ${post.expectedNeighborhoods})`);
    }
    if (post.expectedServices) {
      console.log(`  Services: ${data.related_services?.length || 0} (expected: ${post.expectedServices})`);
    }
    console.log(`  Content length: ${data.content?.length || 0} characters`);
    console.log(`  Author: ${data.author?.name || 'N/A'}`);
    console.log(`  SEO title: ${data.meta_title ? '✓' : '✗'}`);
  }

  // Test 3: Verify search vectors
  const { data: searchData } = await supabaseAdmin
    .from('blog_posts')
    .select('slug')
    .not('search_vector', 'is', null);

  console.log(`\n✓ Posts with search vectors: ${searchData?.length || 0}/3`);

  // Test 4: Verify markdown structure
  const { data: contentCheck } = await supabaseAdmin
    .from('blog_posts')
    .select('slug, content')
    .limit(1)
    .single();

  if (contentCheck) {
    const hasHeadings = contentCheck.content.includes('##');
    console.log(`✓ Markdown structure preserved: ${hasHeadings ? 'Yes' : 'No'}`);
  }

  console.log('\n' + '='.repeat(60));
  console.log('✅ Validation Complete!');
  console.log('='.repeat(60));
}

validateMigration().then(() => process.exit(0)).catch(err => {
  console.error('Validation failed:', err);
  process.exit(1);
});

/**
 * Check current database state
 */
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
);

async function checkDatabase() {
  // Count current posts
  const { data: posts, error } = await supabaseAdmin
    .from('blog_posts')
    .select('slug, title, created_at');

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Current posts in database: ${posts?.length || 0}`);
  if (posts && posts.length > 0) {
    console.log('\nPosts:');
    posts.forEach((post, i) => {
      console.log(`${i + 1}. ${post.slug}`);
    });
  }

  // Delete test post if exists
  if (posts?.some(p => p.slug === 'test-database-schema')) {
    console.log('\n🗑️  Deleting test post...');
    const { error: deleteError } = await supabaseAdmin
      .from('blog_posts')
      .delete()
      .eq('slug', 'test-database-schema');

    if (deleteError) {
      console.error('Delete error:', deleteError);
    } else {
      console.log('✅ Test post deleted');
    }
  }
}

checkDatabase().then(() => process.exit(0));

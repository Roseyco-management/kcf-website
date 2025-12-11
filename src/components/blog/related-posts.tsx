import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface RelatedPostsProps {
  currentPost: BlogPost;
  allPosts: BlogPost[];
}

export function RelatedPosts({ currentPost, allPosts }: RelatedPostsProps) {
  // Find related posts based on:
  // 1. Same category
  // 2. Overlapping tags
  // 3. Exclude current post
  const relatedPosts = allPosts
    .filter((post) => post.slug !== currentPost.slug)
    .map((post) => {
      let score = 0;

      // Same category = 10 points
      if (post.category === currentPost.category) {
        score += 10;
      }

      // Overlapping tags = 2 points each
      const overlappingTags = post.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      );
      score += overlappingTags.length * 2;

      return { post, score };
    })
    .filter((item) => item.score > 0) // Only posts with some relation
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .slice(0, 3) // Top 3 most relevant
    .map((item) => item.post);

  if (relatedPosts.length === 0) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="bg-white py-16 border-t border-[#E5E0D8]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-[#151A4A] mb-8">
          You Might Also <span className="text-[#C9A961]">Like</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-[#F8F6F2] rounded-xl overflow-hidden border-2 border-[#E5E0D8] hover:border-[#C9A961] hover:shadow-lg transition-all"
            >
              {/* Category Badge */}
              <div className="p-4 pb-0">
                <span className="inline-block px-3 py-1 bg-[#C9A961]/10 text-[#C9A961] text-xs font-semibold rounded-full">
                  {post.category}
                </span>
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-bold text-[#151A4A] mb-2 group-hover:text-[#C9A961] transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-sm text-[#4A4A4A] mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-[#4A4A4A] mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{post.readTime} min</span>
                  </div>
                </div>

                {/* Read More */}
                <div className="flex items-center gap-1 text-[#C9A961] text-sm font-semibold">
                  Read Article
                  <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

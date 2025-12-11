import { Star } from 'lucide-react';
import { googleReviews, reviewStats } from '@/data/reviews';

export function ReviewsSection() {
  // Get reviews with text, limit to 6 for display
  const displayReviews = googleReviews.filter(r => r.text).slice(0, 6);

  return (
    <div className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#C9A961]/10 rounded-full mb-4">
            <span className="font-semibold text-[#C9A961]">Client Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#151A4A] mb-4">
            What Our <span className="text-[#C9A961]">Clients Say</span>
          </h2>

          {/* Rating Summary */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#C9A961] text-[#C9A961]" />
              ))}
            </div>
            <div className="text-2xl font-bold text-[#151A4A]">
              {reviewStats.averageRating.toFixed(1)}
            </div>
          </div>
          <p className="text-[#4A4A4A]">
            Based on {reviewStats.totalReviews} reviews from Google Business Profile
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayReviews.map((review) => (
            <div
              key={review.id}
              className="p-6 bg-[#F8F6F2] rounded-2xl border-2 border-[#E5E0D8] hover:border-[#C9A961] transition-all"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#C9A961] text-[#C9A961]" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-[#4A4A4A] leading-relaxed mb-6 line-clamp-6">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="border-t-2 border-[#E5E0D8] pt-4">
                <p className="font-bold text-[#151A4A]">{review.author}</p>
                <p className="text-sm text-[#4A4A4A]">
                  {new Date(review.date).toLocaleDateString('en-US', {
                    month: 'long',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Google Badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-[#4A4A4A] flex items-center justify-center gap-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Verified Google Reviews
          </p>
        </div>
      </div>
    </div>
  );
}

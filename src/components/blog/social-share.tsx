'use client';

import { Facebook, Twitter, Linkedin, Mail, Link2, Check } from 'lucide-react';
import { useState } from 'react';

interface SocialShareProps {
  title: string;
  url: string;
  description?: string;
}

export function SocialShare({ title, url, description }: SocialShareProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || '');

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDescription}%0A%0A${encodedUrl}`,
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'email') {
      window.location.href = shareLinks[platform];
    } else {
      window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    }
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm font-medium text-[#4A4A4A]">Share:</span>

      <div className="flex items-center gap-2">
        {/* Facebook */}
        <button
          onClick={() => handleShare('facebook')}
          className="p-2 rounded-full bg-[#F8F6F2] text-[#4A4A4A] hover:bg-[#1877F2] hover:text-white transition-all"
          aria-label="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </button>

        {/* Twitter */}
        <button
          onClick={() => handleShare('twitter')}
          className="p-2 rounded-full bg-[#F8F6F2] text-[#4A4A4A] hover:bg-[#1DA1F2] hover:text-white transition-all"
          aria-label="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </button>

        {/* LinkedIn */}
        <button
          onClick={() => handleShare('linkedin')}
          className="p-2 rounded-full bg-[#F8F6F2] text-[#4A4A4A] hover:bg-[#0A66C2] hover:text-white transition-all"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </button>

        {/* Email */}
        <button
          onClick={() => handleShare('email')}
          className="p-2 rounded-full bg-[#F8F6F2] text-[#4A4A4A] hover:bg-[#C9A961] hover:text-white transition-all"
          aria-label="Share via Email"
        >
          <Mail className="h-4 w-4" />
        </button>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className={`p-2 rounded-full transition-all ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-[#F8F6F2] text-[#4A4A4A] hover:bg-[#151A4A] hover:text-white'
          }`}
          aria-label="Copy link"
        >
          {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}

"use client";

import { ComparisonBadge } from './comparison-badge';
import { TopPage } from '@/types/analytics';

interface TopPagesListProps {
  title: string;
  pages: TopPage[];
  emptyMessage?: string;
}

export function TopPagesList({ title, pages, emptyMessage = 'No pages found' }: TopPagesListProps) {
  if (!pages || pages.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8]">
        <h3 className="text-xl font-semibold text-[#151A4A] mb-4">{title}</h3>
        <p className="text-sm text-[#4A4A4A] text-center py-8">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm border border-[#E5E0D8]">
      <h3 className="text-xl font-semibold text-[#151A4A] mb-6">{title}</h3>
      <div className="space-y-3">
        {pages.map((page, index) => (
          <div
            key={page.path}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#F8F6F2] transition-colors group"
          >
            {/* Rank Badge */}
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#151A4A] to-[#0F1238] text-sm font-bold text-white shadow-sm group-hover:shadow-md transition-shadow">
              {index + 1}
            </div>

            {/* Page Info */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-[#151A4A] truncate">
                {page.title}
              </p>
              <p className="text-xs text-[#4A4A4A] truncate">{page.path}</p>
            </div>

            {/* Metrics */}
            <div className="text-right">
              <p className="text-lg font-bold text-[#151A4A]">
                {page.views.toLocaleString()}
              </p>
              <ComparisonBadge value={page.change} size="sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

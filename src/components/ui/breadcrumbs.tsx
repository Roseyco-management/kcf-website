import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string; // No href means current page
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-[#F8F6F2] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex items-center gap-2 text-sm">
          {/* Home Link */}
          <li>
            <Link
              href="/"
              className="flex items-center gap-1 text-[#4A4A4A] hover:text-[#C9A961] transition-colors"
            >
              <Home className="h-4 w-4" />
              <span className="sr-only">Home</span>
            </Link>
          </li>

          {/* Breadcrumb Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={index} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-[#4A4A4A]" />
                {isLast || !item.href ? (
                  <span className="text-[#151A4A] font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[#4A4A4A] hover:text-[#C9A961] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}

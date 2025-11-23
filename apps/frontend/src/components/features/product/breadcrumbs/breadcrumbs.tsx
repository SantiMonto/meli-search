import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbsProps {
  categories: string[];
}

export function Breadcrumbs({ categories }: BreadcrumbsProps) {
  if (!categories || categories.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        {categories.map((category, index) => {
          const isLast = index === categories.length - 1;

          return (
            <li key={category} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-4 w-4" />}
              {isLast ? (
                <span className="font-medium text-gray-900" aria-current="page">
                  {category}
                </span>
              ) : (
                <Link
                  href={`/items?search=${encodeURIComponent(category)}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {category}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

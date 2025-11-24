'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Product } from '@/core/entities/product.entity';
import { formatCurrency } from '@/lib/utils';

interface SearchSuggestionsProps {
  suggestions: Product[];
  isLoading: boolean;
  onSelect: () => void;
  query: string;
}

/**
 * SearchSuggestions Component
 * Displays autocomplete suggestions for search
 */
export function SearchSuggestions({
  suggestions,
  isLoading,
  onSelect,
  query,
}: SearchSuggestionsProps) {
  const router = useRouter();

  const handleSuggestionClick = (productId: string) => {
    onSelect();
    router.push(`/items/${productId}?q=${encodeURIComponent(query)}`);
  };

  // Don't show if no query or loading without suggestions
  if (!query || query.length < 2) {
    return null;
  }

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-96 overflow-y-auto z-50">
      {isLoading && suggestions.length === 0 ? (
        <div className="p-4 text-center text-gray-500">
          <div className="animate-pulse">Buscando...</div>
        </div>
      ) : suggestions.length > 0 ? (
        <ul className="py-2">
          {suggestions.map((product) => (
            <li key={product.id}>
              <button
                onClick={() => handleSuggestionClick(product.id)}
                className="w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="relative w-12 h-12 flex-shrink-0">
                  {product.thumbnail && (
                    <Image
                      src={product.thumbnail}
                      alt={product.title}
                      fill
                      className="object-contain rounded"
                      sizes="48px"
                    />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 truncate">
                    {product.title}
                  </p>
                  <p className="text-sm font-semibold text-gray-700">
                    {formatCurrency(product.price)}
                  </p>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="p-4 text-center text-gray-500">
          No se encontraron sugerencias
        </div>
      )}
    </div>
  );
}

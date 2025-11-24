'use client';

import { useState, FormEvent, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '../../../ui/input/input';
import { SearchSuggestions } from '../search-suggestions/search-suggestions';
import { useSearchSuggestions } from '@/hooks/use-search-suggestions';

/**
 * SearchBox Component
 * Search input with submit functionality and autocomplete suggestions
 */
export function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Get suggestions
  const { suggestions, isLoading } = useSearchSuggestions(query, 6, 300);

  /**
   * Handle click outside to close suggestions
   */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  /**
   * Handle form submit
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Close suggestions and navigate
    setShowSuggestions(false);

    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', query.trim());

    router.push(`/?${params.toString()}`);
  };

  /**
   * Handle input change
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(value.length >= 2);
  };

  /**
   * Handle suggestion selection
   */
  const handleSuggestionSelect = () => {
    setShowSuggestions(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <Input
          type="text"
          placeholder="Buscar productos, marcas y más..."
          value={query}
          onChange={handleInputChange}
          onFocus={() => query.length >= 2 && setShowSuggestions(true)}
          rightIcon={
            <div className="flex items-center">
              <div className="h-6 w-px bg-gray-200 mx-2" />
              <button
                type="submit"
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label="Buscar"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          }
          fullWidth
          className="border-none shadow-sm truncate"
        />
      </form>

      {showSuggestions && (
        <SearchSuggestions
          suggestions={suggestions}
          isLoading={isLoading}
          onSelect={handleSuggestionSelect}
          query={query}
        />
      )}
    </div>
  );
}

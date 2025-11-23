'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { Input } from '../../../ui/input/input';

/**
 * SearchBox Component
 * Search input with submit functionality
 */
export function SearchBox() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);

  /**
   * Handle form submit
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!query.trim()) return;

    // Update URL with search query
    const params = new URLSearchParams();
    params.set('q', query.trim());

    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <Input
        type="text"
        placeholder="Buscar productos, marcas y más..."
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(e.target.value)
        }
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
        className="border-none shadow-sm"
      />
    </form>
  );
}

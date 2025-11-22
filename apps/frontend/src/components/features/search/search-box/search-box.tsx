'use client';

import { useState, FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Input } from '../../../ui/input/input';
import { Button } from '../../../ui/button/button';

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

  /**
   * Handle clear button
   */
  const handleClear = () => {
    setQuery('');
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            type="text"
            placeholder="Buscar productos, marcas y más..."
            value={query}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(e.target.value)
            }
            leftIcon={<Search className="h-5 w-5" />}
            rightIcon={
              query && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-5 w-5" />
                </button>
              )
            }
            fullWidth
          />
        </div>
        <Button type="submit" disabled={!query.trim()}>
          Buscar
        </Button>
      </div>
    </form>
  );
}

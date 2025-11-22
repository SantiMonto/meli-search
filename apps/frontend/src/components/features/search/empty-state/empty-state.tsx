import { SearchX } from 'lucide-react';

export interface EmptyStateProps {
  query: string;
}

/**
 * EmptyState Component
 * Displayed when no search results are found
 */
export function EmptyState({ query }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <SearchX className="h-16 w-16 text-gray-400" />

      <h2 className="mt-4 text-xl font-semibold text-gray-900">
        No hay publicaciones que coincidan con tu búsqueda
      </h2>

      <p className="mt-2 text-gray-600">
        No se encontraron resultados para &quot;{query}&quot;
      </p>

      <div className="mt-6 space-y-2 text-sm text-gray-600">
        <p className="font-medium">Sugerencias:</p>
        <ul className="list-inside list-disc space-y-1 text-left">
          <li>Revisá la ortografía de la palabra</li>
          <li>Utilizá palabras más genéricas o menos palabras</li>
          <li>Navegá por las categorías para encontrar un producto similar</li>
        </ul>
      </div>
    </div>
  );
}

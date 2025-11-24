import { useRouter, useSearchParams } from 'next/navigation';

export function Breadcrumbs({ categories }: { categories: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (query) {
      router.push(`/?q=${encodeURIComponent(query)}`);
    } else {
      router.back();
    }
  };

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <li className="flex items-center gap-2">
          <a
            href={query ? `/?q=${encodeURIComponent(query)}` : '#'}
            onClick={handleBack}
            className="hover:text-blue-600 transition-colors font-medium"
          >
            Volver al listado
          </a>
        </li>
        <li className="flex items-center gap-2">
          <span className="text-gray-300">|</span>
          <span className="font-medium text-gray-900" aria-current="page">
            {categories}
          </span>
        </li>
      </ol>
    </nav>
  );
}

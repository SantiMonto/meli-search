import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-primary-500 py-3">
      <div className="container mx-auto px-4">
        <Link href="/" className="inline-block">
          <div className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-gray-900"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
            </svg>
            <span className="text-2xl font-bold text-gray-900">
              Mercado Libre
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

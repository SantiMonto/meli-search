import Link from 'next/link';
import { Button } from '@/components/ui/button/button';
import { SearchX } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
        <SearchX className="h-12 w-12 text-red-600" />
      </div>

      <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>

      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Página no encontrada
      </h2>

      <p className="mb-8 max-w-md text-gray-600">
        Lo sentimos, la página que estás buscando no existe o fue movida a otra
        ubicación.
      </p>

      <div className="flex gap-4">
        <Link href="/">
          <Button>Volver al inicio</Button>
        </Link>
      </div>
    </div>
  );
}

import Link from 'next/link';
import { Button } from '@/components/ui/button/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h2 className="mb-4 text-2xl font-bold text-gray-900">
        Producto no encontrado
      </h2>
      <p className="mb-8 text-gray-600">
        El producto que estás buscando no existe o fue eliminado.
      </p>
      <Link href="/">
        <Button>Volver al inicio</Button>
      </Link>
    </div>
  );
}

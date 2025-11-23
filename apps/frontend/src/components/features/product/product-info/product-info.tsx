import { Product } from '@/core/entities/product.entity';
import { Button } from '@/components/ui/button/button';
import { ProductCondition } from '@meli/shared-types';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currencyId,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="flex flex-col gap-4 border-l border-gray-100 pl-0 md:pl-8">
      <div className="text-sm text-gray-500 mb-2">
        {product.condition === ProductCondition.NEW ? 'Nuevo' : 'Usado'}
        {product.soldQuantity && ` | ${product.soldQuantity} vendidos`}
      </div>

      <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
        {product.title}
      </h1>

      {product.hasGoodRating() && (
        <div className="flex items-center gap-1 text-sm text-blue-600">
          {/* Simple star representation */}
          {'★'.repeat(product.getRatingStars())}
          {'☆'.repeat(5 - product.getRatingStars())}
          <span className="ml-1 text-gray-500">
            ({product.reviews?.total} opiniones)
          </span>
        </div>
      )}

      <div className="mt-4">
        {product.hasDiscount() && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">
              {formatPrice(product.originalPrice!)}
            </span>
            <span className="text-sm font-medium text-green-500">
              {product.getDiscountPercentage()}% OFF
            </span>
          </div>
        )}

        <div className="text-4xl font-light text-gray-900">
          {formatPrice(product.price)}
        </div>
      </div>

      {product.installments && (
        <div className="text-sm text-gray-900">
          en{' '}
          <span className="text-green-500 font-medium">
            {product.getInstallmentText()}
          </span>
        </div>
      )}

      {product.hasFreeShipping() && (
        <div className="mt-2 flex items-center gap-2 text-green-500 font-medium text-sm">
          <span>Envío gratis</span>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3">
        <Button size="lg" fullWidth>
          Comprar ahora
        </Button>
        <Button variant="secondary" size="lg" fullWidth>
          Agregar al carrito
        </Button>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
          {product.description || 'Sin descripción disponible.'}
        </p>
      </div>
    </div>
  );
}

'use client';

import { Product } from '@/core/entities/product.entity';
import { Button } from '@/components/ui/button/button';
import { formatCurrency, ProductCondition } from '@meli/shared-types';
import { useAuth } from '@/core/contexts/auth.context';
import { useCart } from '@/core/contexts/cart.context';
import { useRouter, usePathname } from 'next/navigation';
import { Toast } from '@/components/ui';
import { useState, useCallback } from 'react';
import { useProductAutoCart } from '@/hooks/useProductAutoCart';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);

  useProductAutoCart({
    product,
    isAuthenticated,
    addToCart,
    router,
    pathname,
    setShowToast,
  });

  // Handler para agregar al carrito
  const handleAddToCart = useCallback(() => {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(`${pathname}?add_to_cart=true`);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      currency_id: product.currencyId,
      thumbnail: product.thumbnail || '',
      free_shipping: product.shipping?.freeShipping || false,
    });
    setShowToast(true);
  }, [isAuthenticated, pathname, router, addToCart, product]);

  // Handler para comprar ahora
  const handleBuyNow = useCallback(() => {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(`${pathname}?buy_now=true`);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      currency_id: product.currencyId,
      thumbnail: product.thumbnail || '',
      free_shipping: product.shipping?.freeShipping || false,
    });
    setShowToast(true);
    router.push('/cart');
  }, [isAuthenticated, pathname, router, addToCart, product]);

  return (
    <div className="flex flex-col gap-4 border-l border-gray-100 pl-0 md:pl-8">
      {/* Condición y vendidos */}
      <div className="text-sm text-gray-500 mb-2">
        {product.condition === ProductCondition.NEW ? 'Nuevo' : 'Usado'}
        {product.soldQuantity && ` | ${product.soldQuantity} vendidos`}
      </div>

      {/* Título */}
      <h1 className="text-2xl font-semibold text-gray-900 leading-tight">
        {product.title}
      </h1>

      {/* Rating */}
      {product.hasGoodRating() && (
        <div className="flex items-center gap-1 text-sm text-blue-600">
          {'★'.repeat(product.getRatingStars())}
          {'☆'.repeat(5 - product.getRatingStars())}
          <span className="ml-1 text-gray-500">
            ({product.reviews?.total} opiniones)
          </span>
        </div>
      )}

      {/* Precio y descuento */}
      <div className="mt-4">
        {product.hasDiscount() && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">
              {formatCurrency(product.originalPrice!)}
            </span>
            <span className="text-sm font-medium text-green-500">
              {product.getDiscountPercentage()}% OFF
            </span>
          </div>
        )}
        <div className="text-4xl font-light text-gray-900">
          {formatCurrency(product.price)}
        </div>
      </div>

      {/* Cuotas */}
      {product.installments && (
        <div className="text-sm text-gray-900">
          en{' '}
          <span className="text-green-500 font-medium">
            {product.getInstallmentText()}
          </span>
        </div>
      )}

      {/* Envío gratis */}
      {product.hasFreeShipping() && (
        <div className="mt-2 flex items-center gap-2 text-green-500 font-medium text-sm">
          <span>Envío gratis</span>
        </div>
      )}

      {/* Botones de acción */}
      <div className="mt-8 flex flex-col gap-3">
        <Button size="lg" fullWidth onClick={handleBuyNow}>
          Comprar ahora
        </Button>
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          onClick={handleAddToCart}
        >
          Agregar al carrito
        </Button>
      </div>

      {/* Descripción */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
          {product.description || 'Sin descripción disponible.'}
        </p>
      </div>

      {/* Toast de feedback */}
      <Toast
        message="Producto agregado al carrito"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

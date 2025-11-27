'use client';

import { Product } from '@/core/entities/product.entity';
import { Button } from '@/components/ui/button/button';
import { ProductCondition } from '@meli/shared-types';
import { useAuth } from '@/core/contexts/auth.context';
import { useCart } from '@/core/contexts/cart.context';
import { useRouter, usePathname } from 'next/navigation';
import { Toast } from '@/components/ui';
import { useState, useEffect, useRef, useCallback } from 'react';

interface ProductInfoProps {
  product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const { isAuthenticated } = useAuth();
  const { addToCart } = useCart();
  const router = useRouter();
  const pathname = usePathname();
  const [showToast, setShowToast] = useState(false);
  const autoAddProcessed = useRef(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: product.currencyId,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const addProductToCart = useCallback(() => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      currency_id: product.currencyId,
      thumbnail: product.thumbnail || '',
      free_shipping: product.shipping?.freeShipping || false,
    });
    setShowToast(true);
  }, [addToCart, product]);

  useEffect(() => {
    // Use window.location to bypass potential React state staleness/Strict Mode double-invocation issues
    const params = new URLSearchParams(window.location.search);
    const shouldAddToCart = params.get('add_to_cart') === 'true';
    const shouldBuyNow = params.get('buy_now') === 'true';

    if (
      isAuthenticated &&
      (shouldAddToCart || shouldBuyNow) &&
      !autoAddProcessed.current
    ) {
      autoAddProcessed.current = true;

      // Add product to cart directly here to avoid setState in effect
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        currency_id: product.currencyId,
        thumbnail: product.thumbnail || '',
        free_shipping: product.shipping?.freeShipping || false,
      });

      // Defer toast to avoid synchronous setState in effect
      setTimeout(() => setShowToast(true), 0);

      // Remove the param immediately from the browser URL to prevent double-execution
      params.delete('add_to_cart');
      params.delete('buy_now');
      const newSearch = params.toString();
      const newPath = newSearch ? `${pathname}?${newSearch}` : pathname;

      window.history.replaceState(null, '', newPath);

      // If buy_now, redirect to cart after adding
      if (shouldBuyNow) {
        router.push('/cart');
      } else {
        // Sync Next.js router
        router.replace(newPath);
      }
    }
  }, [isAuthenticated, pathname, router, addToCart, product]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(`${pathname}?add_to_cart=true`);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }

    addProductToCart();
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      const returnUrl = encodeURIComponent(`${pathname}?buy_now=true`);
      router.push(`/login?returnUrl=${returnUrl}`);
      return;
    }

    addProductToCart();
    router.push('/cart');
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

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
        <p className="text-gray-600 text-base leading-relaxed whitespace-pre-line">
          {product.description || 'Sin descripción disponible.'}
        </p>
      </div>

      <Toast
        message="Producto agregado al carrito"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}

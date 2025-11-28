import { useEffect, useRef } from 'react';
import { Product } from '@/core/entities/product.entity';
import { useRouter } from 'next/navigation';

interface UseProductAutoCartProps {
  product: Product;
  isAuthenticated: boolean;
  addToCart: (item: {
    id: string;
    title: string;
    price: number;
    currency_id: string;
    thumbnail: string;
    free_shipping: boolean;
  }) => void;
  router: ReturnType<typeof useRouter>;
  pathname: string;
  setShowToast: (show: boolean) => void;
}

export function useProductAutoCart({
  product,
  isAuthenticated,
  addToCart,
  router,
  pathname,
  setShowToast,
}: UseProductAutoCartProps) {
  const autoAddProcessed = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const shouldAddToCart = params.get('add_to_cart') === 'true';
    const shouldBuyNow = params.get('buy_now') === 'true';

    if (
      isAuthenticated &&
      (shouldAddToCart || shouldBuyNow) &&
      !autoAddProcessed.current
    ) {
      autoAddProcessed.current = true;
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        currency_id: product.currencyId,
        thumbnail: product.thumbnail || '',
        free_shipping: product.shipping?.freeShipping || false,
      });
      setTimeout(() => setShowToast(true), 0);
      params.delete('add_to_cart');
      params.delete('buy_now');
      const newSearch = params.toString();
      const newPath = newSearch ? `${pathname}?${newSearch}` : pathname;
      window.history.replaceState(null, '', newPath);
      if (shouldBuyNow) {
        router.push('/cart');
      } else {
        router.replace(newPath);
      }
    }
  }, [isAuthenticated, pathname, router, addToCart, product, setShowToast]);
}

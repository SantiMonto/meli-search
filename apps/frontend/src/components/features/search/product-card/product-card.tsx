import Link from 'next/link';
import Image from 'next/image';
import { Product } from '../../../../core/entities/product.entity';
import { Card } from '../../../ui/card/card';
import { Badge } from '../../../ui/badge/badge';
import { Rating } from '../../../ui/rating/rating';
import { formatCurrency } from '@/lib/utils';
import { Truck } from 'lucide-react';

export interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard Component
 * Displays product information in a card format
 */
export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.getMainImageUrl();
  const installmentText = product.getInstallmentText();
  const rating = product.getAverageRating();

  return (
    <Link href={`/items/${product.id}`}>
      <Card hoverable padding="md">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-ml bg-gray-100">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={product.title}
                fill
                className="object-contain"
                sizes="128px"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                Sin imagen
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-1 flex-col justify-between">
            {/* Title */}
            <div>
              <h3 className="line-clamp-2 text-base font-normal text-gray-900">
                {product.title}
              </h3>
            </div>

            {/* Price */}
            <div className="mt-2">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-light text-gray-900">
                  {formatCurrency(product.price)}
                </span>
                {product.hasDiscount() && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatCurrency(product.originalPrice!)}
                  </span>
                )}
              </div>

              {/* Installments */}
              {installmentText && (
                <p className="mt-1 text-sm text-success-500">
                  {installmentText} sin interés
                </p>
              )}
            </div>

            {/* Badges */}
            <div className="mt-2 flex flex-wrap gap-2">
              {product.hasFreeShipping() && (
                <Badge variant="success" size="sm">
                  <Truck className="mr-1 h-3 w-3" />
                  Envío gratis
                </Badge>
              )}

              {product.isNew() && (
                <Badge variant="info" size="sm">
                  Nuevo
                </Badge>
              )}

              {product.hasDiscount() && (
                <Badge variant="warning" size="sm">
                  {product.getDiscountPercentage()}% OFF
                </Badge>
              )}
            </div>

            {/* Rating */}
            {rating && (
              <div className="mt-2">
                <Rating value={rating} size="sm" showValue />
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

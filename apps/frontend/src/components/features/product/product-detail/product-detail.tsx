import { Product } from '@/core/entities/product.entity';
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs';
import { ImageGallery } from '../image-gallery/image-gallery';
import { ProductInfo } from '../product-info/product-info';
import { ProductAttributes } from '../product-attributes/product-attributes';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumbs categories={product.title} />
      <div className="bg-white rounded-lg shadow-sm p-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-8">
          {/* Left Column: Images & Description */}
          <div className="flex flex-col gap-8">
            <ImageGallery
              images={product.getImageUrls()}
              title={product.title}
            />

            {/* Attributes for mobile/desktop layout flexibility */}
            <div className="block md:hidden">
              <ProductInfo product={product} />
            </div>

            {product.attributes && product.attributes.length > 0 && (
              <ProductAttributes attributes={product.attributes} />
            )}
          </div>

          {/* Right Column: Info & Buy Actions */}
          <div className="hidden md:block">
            <ProductInfo product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images || images.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="relative aspect-square w-full max-w-[680px] overflow-hidden rounded-lg bg-white">
        <Image
          src={selectedImage}
          alt={title}
          fill
          className="object-contain p-4"
          priority
          sizes="(max-width: 768px) 100vw, 680px"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              onClick={() => setSelectedImage(image)}
              className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border-2 bg-white transition-all ${
                selectedImage === image
                  ? 'border-blue-600 ring-2 ring-blue-600 ring-offset-1'
                  : 'border-transparent hover:border-gray-300'
              }`}
              aria-label={`View image ${index + 1}`}
              aria-current={selectedImage === image}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                className="object-contain p-1"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

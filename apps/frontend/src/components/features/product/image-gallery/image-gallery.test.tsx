import { render, screen, fireEvent } from '@testing-library/react';
import { ImageGallery } from './image-gallery';

// Mock Next/Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    fill: _fill,
    priority: _priority,
    alt,
    ...props
  }: {
    fill?: boolean;
    priority?: boolean;
    alt: string;
    [key: string]: unknown;
  }) => {
    return <img alt={alt} {...props} />;
  },
}));

describe('ImageGallery', () => {
  const images = [
    'https://example.com/image1.jpg',
    'https://example.com/image2.jpg',
  ];
  const title = 'Test Product';

  it('renders main image', () => {
    render(<ImageGallery images={images} title={title} />);
    const mainImage = screen.getByRole('img', { name: title });
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });

  it('renders thumbnails', () => {
    render(<ImageGallery images={images} title={title} />);
    const thumbnails = screen.getAllByRole('button');
    expect(thumbnails).toHaveLength(2);
  });

  it('changes main image on thumbnail click', () => {
    render(<ImageGallery images={images} title={title} />);
    const thumbnails = screen.getAllByRole('button');

    fireEvent.click(thumbnails[1]);

    const mainImage = screen.getByRole('img', { name: title });
    expect(mainImage).toHaveAttribute('src', 'https://example.com/image2.jpg');
  });
});

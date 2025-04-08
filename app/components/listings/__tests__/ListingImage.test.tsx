import { render, screen } from '@testing-library/react';
import { ListingImage } from '@/app/components/listings/ListingImage';
import { mockListing, mockListingWithoutImages } from '@/__mocks__/test-utils/listingMocks';

// Properly typed mock for Next.js Image component
jest.mock('next/image', () => {
  const MockImage: React.FC<{
    src: string;
    alt: string;
    fill?: boolean;
    style?: React.CSSProperties;
    priority?: boolean;
  }> = (props) => <img src={props.src} alt={props.alt} />;
  
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe('ListingImage', () => {
  it('renders property image when available', () => {
    render(<ListingImage listing={mockListing} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain(mockListing.propertyImages[0].url);
    expect(img.alt).toBe(mockListing.propertyName);
  });

  it('falls back to placeholder when no images available', () => {
    render(<ListingImage listing={mockListingWithoutImages} />);
    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain('/placeholder-image.svg');
  });
});
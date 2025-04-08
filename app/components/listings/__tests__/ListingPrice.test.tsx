import { render, screen } from '@testing-library/react';
import { ListingPrice } from '@/app/components/listings/ListingPrice';
import { mockListing, mockListingWithoutDiscount } from '@/__mocks__/test-utils/listingMocks';

describe('ListingPrice', () => {
  it('displays price and formatted date correctly', () => {
    render(<ListingPrice listing={mockListing} />);
    
    expect(screen.getByText(/From/)).toBeInTheDocument();
    expect(screen.getByText(/€1,100/)).toBeInTheDocument();
    expect(screen.getByText(/month/)).toBeInTheDocument();
    expect(screen.getByText(/Jun 1/)).toBeInTheDocument();
  });

  it('shows discount when available', () => {
    render(<ListingPrice listing={mockListing} />);
    expect(screen.getByText(/€1,200/)).toBeInTheDocument();
    expect(screen.getByText(/€1,100/)).toHaveClass('text-green-400');
  });

  it('hides discount section when no discount', () => {
    render(<ListingPrice listing={mockListingWithoutDiscount} />);
    expect(screen.queryByText(/from €/)).not.toBeInTheDocument();
    expect(screen.getByText(/€1,100/)).not.toHaveClass('text-green-400');
  });
});
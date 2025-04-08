import { render, screen } from '@testing-library/react';
import { ListingCard } from '../ListingCard';
import { mockListing } from '@/__mocks__/test-utils/listingMocks';

describe('ListingCard', () => {
  it('renders listing information', () => {
    render(<ListingCard listing={mockListing} />);
    
    expect(screen.getByText(mockListing.propertyName)).toBeInTheDocument();
    expect(screen.getByText(mockListing.propertyAddress)).toBeInTheDocument();
    expect(screen.getByText('Private Apartment')).toBeInTheDocument();
  });

  it('shows amenities', () => {
    render(<ListingCard listing={mockListing} />);
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
  });
});
import { render, screen } from '@testing-library/react';
import { ListingDetails } from '@/app/components/listings/ListingDetails';
import { mockListing, mockListingWithoutStay } from '@/__mocks__/test-utils/listingMocks';

describe('ListingDetails', () => {
  it('renders listing details correctly', () => {
    render(<ListingDetails listing={mockListing} />);
    
    expect(screen.getByText(/Area:/)).toBeInTheDocument();
    expect(screen.getByText(`${mockListing.roomArea} ${mockListing.roomAreaUnit}`)).toBeInTheDocument();
    expect(screen.getByText(/Bedrooms:/)).toBeInTheDocument();
    expect(screen.getByText(mockListing.apartmentBedroomCount.toString())).toBeInTheDocument();
    expect(screen.getByText(/Bathrooms:/)).toBeInTheDocument();
    expect(screen.getByText(mockListing.apartmentBathroomCount.toString())).toBeInTheDocument();
    expect(screen.getByText(/Min stay:/)).toBeInTheDocument();
  });

  it('handles missing minimum stay', () => {
    render(<ListingDetails listing={mockListingWithoutStay} />);
    
    expect(screen.getByText('Not specified')).toBeInTheDocument();
  });
});
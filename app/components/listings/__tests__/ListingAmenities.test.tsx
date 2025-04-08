import { render, screen } from '@testing-library/react';
import { ListingAmenities } from '../ListingAmenities';
import { mockListing } from '@/__mocks__/test-utils/listingMocks';

describe('ListingAmenities', () => {
  it('renders amenities correctly', () => {
    render(<ListingAmenities amenities={mockListing.roomAmenities} />);
    expect(screen.getByText('Amenities')).toBeInTheDocument();
    expect(screen.getByText('WiFi')).toBeInTheDocument();
    expect(screen.getByText('Desk')).toBeInTheDocument();
    expect(screen.getByText('TV')).toBeInTheDocument();
  });

  it('shows "+n more" when more than 3 amenities', () => {
    const manyAmenities = [...mockListing.roomAmenities, 'Kitchen', 'Washer', 'AC'];
    render(<ListingAmenities amenities={manyAmenities} />);
    expect(screen.getByText('+3 more')).toBeInTheDocument();
  });

  it('returns null when no amenities', () => {
    const { container } = render(<ListingAmenities amenities={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
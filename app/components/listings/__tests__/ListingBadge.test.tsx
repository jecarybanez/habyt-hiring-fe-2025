import { render, screen } from '@testing-library/react';
import { ListingBadge } from '../ListingBadge';

describe('ListingBadge', () => {
  it('formats PrivateApartment correctly', () => {
    render(<ListingBadge shareType="PrivateApartment" />);
    expect(screen.getByText('Private Apartment')).toBeInTheDocument();
  });

  it('formats Studio correctly', () => {
    render(<ListingBadge shareType="Studio" />);
    expect(screen.getByText('Studio')).toBeInTheDocument();
  });

  it('formats PrivateRoom correctly', () => {
    render(<ListingBadge shareType="PrivateRoom" />);
    expect(screen.getByText('Private Room')).toBeInTheDocument();
  });

  it('formats SharedRoom correctly', () => {
    render(<ListingBadge shareType="SharedRoom" />);
    expect(screen.getByText('Shared Room')).toBeInTheDocument();
  });

  it('shows unknown types as-is', () => {
    render(<ListingBadge shareType="UnknownType" />);
    expect(screen.getByText('UnknownType')).toBeInTheDocument();
  });
});
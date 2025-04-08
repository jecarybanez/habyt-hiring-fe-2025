import { render, screen } from '@testing-library/react';
import { ListingsSkeleton } from '@/app/components/listings/ListingsSkeleton';

describe('ListingsSkeleton', () => {
  it('renders 12 skeleton items with pulse animation', () => {
    render(<ListingsSkeleton />);
    const skeletons = screen.getAllByTestId('skeleton');
    
    expect(skeletons).toHaveLength(12);
    skeletons.forEach(skeleton => {
      expect(skeleton).toHaveClass('animate-pulse');
    });
  });
});
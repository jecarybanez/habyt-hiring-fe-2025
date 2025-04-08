import { render, screen, fireEvent } from '@testing-library/react';
import { ListingsContent } from '@/app/components/listings/ListingsContent';
import { mockListing } from '@/__mocks__/test-utils/listingMocks';
import { ListingsContentProps } from '@/app/components/listings/ListingsContent';

const mockRetry = jest.fn();

const renderListingsContent = (props: Partial<ListingsContentProps> = {}) => {
  const defaultProps: ListingsContentProps = {
    listings: [],
    loading: false,
    error: null,
    onRetry: mockRetry,
    hasMore: false
  };
  
  return render(<ListingsContent {...defaultProps} {...props} />);
};

describe('ListingsContent', () => {
  it('shows loading skeleton when loading with no listings', () => {
    renderListingsContent({ loading: true });
    expect(screen.getAllByTestId('skeleton')).toHaveLength(12);
  });

  it('shows error message with retry button', () => {
    const errorMessage = 'Failed to load';
    renderListingsContent({ error: errorMessage });
    
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Retry'));
    expect(mockRetry).toHaveBeenCalled();
  });

  it('shows empty state when no listings', () => {
    renderListingsContent();
    expect(screen.getByText('No listings found')).toBeInTheDocument();
  });

  it('renders listings when data exists', () => {
    renderListingsContent({ listings: [mockListing] });
    expect(screen.getByText(mockListing.propertyName)).toBeInTheDocument();
  });

  it('shows loading more indicator', () => {
    renderListingsContent({ 
      listings: [mockListing], 
      loading: true, 
      hasMore: true 
    });
    expect(screen.getAllByTestId('loading-more')).toHaveLength(4);
  });
});
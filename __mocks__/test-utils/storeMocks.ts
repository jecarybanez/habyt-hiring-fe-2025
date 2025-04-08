import type { RootState } from '@/app/types/listing';
import { mockListing } from './listingMocks';

// Mock FiltersState
export const mockFiltersState: RootState['filters'] = {
  cities: ['Berlin'],
  rentFrom: '800',
  rentTo: '1500',
  shareType: ['PrivateApartment', 'Studio'],
  bookableOn: '2023-07-01',
  pageSize: 10,
  sortOption: 'price-asc'
};

// Mock ListingsState
export const mockListingsState: RootState['listings'] = {
  data: [mockListing],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  }
};

// Mock RootState
export const mockRootState: RootState = {
  filters: mockFiltersState,
  listings: mockListingsState
};

// State factory functions for different test scenarios
export const createTestState = (overrides?: Partial<RootState>): RootState => ({
  ...mockRootState,
  ...overrides
});

// Specific state scenarios
export const loadingState = createTestState({
  listings: {
    ...mockListingsState,
    loading: true
  }
});

export const errorState = createTestState({
  listings: {
    ...mockListingsState,
    error: 'Failed to load listings'
  }
});

export const emptyState = createTestState({
  listings: {
    data: [],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    }
  }
});

export const multipleListingsState = createTestState({
  listings: {
    data: [mockListing],
    loading: false,
    error: null,
    pagination: {
      currentPage: 1,
      totalPages: 0,
      hasNextPage: false,
      hasPrevPage: false
    }
  }
});
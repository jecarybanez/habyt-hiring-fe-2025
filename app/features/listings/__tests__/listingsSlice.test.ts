import listingsReducer, {
  fetchListings,
  setPage,
  initialState
} from '@/app/features/listings/listingsSlice';
import { createMockAPIResponse } from '@/__mocks__/test-utils/apiTestUtils';

describe('listings slice', () => {
  it('should handle initial state', () => {
    expect(listingsReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle setPage', () => {
    const actual = listingsReducer(initialState, setPage(2));
    expect(actual.pagination.currentPage).toEqual(2);
  });

  describe('fetchListings', () => {
    it('should handle pending', () => {
      const action = { type: fetchListings.pending.type };
      const state = listingsReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: true,
        error: null
      });
    });

    it('should handle fulfilled', () => {
      const mockResponse = createMockAPIResponse([], 0, 10, 50);
      const action = {
        type: fetchListings.fulfilled.type,
        payload: mockResponse
      };
      const state = listingsReducer(initialState, action);
      
      expect(state).toEqual({
        data: mockResponse.data,
        loading: false,
        error: null,
        pagination: {
          currentPage: mockResponse.metadata.pagination.currentPage + 1, // +1 for 1-based
          totalPages: mockResponse.metadata.pagination.totalPages,
          hasNextPage: mockResponse.metadata.pagination.hasNextPage,
          hasPrevPage: mockResponse.metadata.pagination.hasPrevPage
        }
      });
    });

    it('should handle rejected', () => {
      const error = 'Failed to fetch';
      const action = {
        type: fetchListings.rejected.type,
        error: { message: error }
      };
      const state = listingsReducer(initialState, action);
      expect(state).toEqual({
        ...initialState,
        loading: false,
        error
      });
    });
  });
});
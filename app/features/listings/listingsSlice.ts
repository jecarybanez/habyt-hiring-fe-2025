import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Listing } from '@/app/types/listing';
import { RootState } from '@/app/store';

interface ListingsState {
  data: Listing[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;  // This will now be 1-based to match API response
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

const initialState: ListingsState = {
  data: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,  // Changed from 0 to 1 to match API's 1-based pagination
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  }
};

export const fetchListings = createAsyncThunk(
  'listings/fetchListings',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { filters } = state;
    const { currentPage } = state.listings.pagination;
    
    const params = new URLSearchParams();
    if (filters.cities && filters.cities.length) {
      filters.cities.forEach(city => {
        params.append('city', city);
      });
    }
    if (filters.rentFrom) params.append('rentFrom', filters.rentFrom);
    if (filters.rentTo) params.append('rentTo', filters.rentTo);
    if (filters.bookableOn) params.append('bookableOn', filters.bookableOn);
    if (filters.shareType.length) {
      filters.shareType.forEach(type => {
        params.append('shareType', type);
      });
    }
    params.append('pageSize', filters.pageSize.toString());
    
    // Convert 1-based frontend page to 0-based API page
    params.append('page', (currentPage - 1).toString());
    
    switch (filters.sortOption) {
      case 'price-asc':
        params.append('sort', 'rentNet');
        params.append('order', 'asc');
        break;
      case 'price-desc':
        params.append('sort', 'rentNet');
        params.append('order', 'desc');
        break;
      case 'date-asc':
        params.append('sort', 'bookableFrom');
        params.append('order', 'asc');
        break;
      case 'date-desc':
        params.append('sort', 'bookableFrom');
        params.append('order', 'desc');
        break;
      case 'area-asc':
        params.append('sort', 'roomArea');
        params.append('order', 'asc');
        break;
      case 'area-desc':
        params.append('sort', 'roomArea');
        params.append('order', 'desc');
        break;
    }
    
    const response = await fetch(`/api/listings?${params.toString()}`);
    return response.json();
  }
);

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchListings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchListings.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data;
        state.pagination = {
          currentPage: action.payload.metadata.pagination.currentPage, // Already 1-based from API
          totalPages: action.payload.metadata.pagination.totalPages,
          hasNextPage: action.payload.metadata.pagination.hasNextPage,
          hasPrevPage: action.payload.metadata.pagination.hasPrevPage
        };
      })
      .addCase(fetchListings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch listings';
      });
  }
});

export const { setPage } = listingsSlice.actions;
export default listingsSlice.reducer;
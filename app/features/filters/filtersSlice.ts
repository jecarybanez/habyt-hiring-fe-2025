import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FiltersState {
  cities: string[];
  rentFrom: string;
  rentTo: string;
  shareType: string[];
  bookableOn: string;
  pageSize: number;
  sortOption: string;
  // Add more filter fields as needed
}

const initialState: FiltersState = {
  cities: [],
  rentFrom: '',
  rentTo: '',
  shareType: [],
  bookableOn: '',
  pageSize: 100,
  sortOption: 'price-asc',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCities: (state, action: PayloadAction<string[]>) => {
      state.cities = action.payload;
    },
    setRentRange: (state, action: PayloadAction<{from: string, to: string}>) => {
      state.rentFrom = action.payload.from;
      state.rentTo = action.payload.to;
    },
    setShareType: (state, action: PayloadAction<string[]>) => {
      state.shareType = action.payload;
    },
    setBookableOn: (state, action: PayloadAction<string>) => {
      state.bookableOn = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
    },
    setSortOption: (state, action: PayloadAction<string>) => {
      state.sortOption = action.payload;
    },
    resetFilters: () => initialState
  }
});

export const { setCities, setRentRange, setShareType, setBookableOn, setPageSize, setSortOption, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
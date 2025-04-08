import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import filtersReducer from './features/filters/filtersSlice';
import listingsReducer from './features/listings/listingsSlice';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    listings: listingsReducer
  },
});

// Infer the RootState and AppDispatch types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
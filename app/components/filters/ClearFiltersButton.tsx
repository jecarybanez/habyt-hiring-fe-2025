'use client';

import { useAppDispatch } from '@/app/hooks/store';
import { resetFilters } from '@/app/features/filters/filtersSlice';
import { useAppSelector } from '@/app/hooks/store';
import { INPUT_CLASSES } from '@/app/constants/filters';

export const ClearFiltersButton = ({ isCompact }: { isCompact: boolean }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.listings.loading);

  return (
    <button
      onClick={() => dispatch(resetFilters())}
      className={`${INPUT_CLASSES} cursor-pointer col-span-1 hover:bg-gray-50 ${isCompact && 'text-sm'}`}
      disabled={loading}
    >
      Clear all filters
    </button>
  );
};
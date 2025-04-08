'use client';

import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { setRentRange } from '@/app/features/filters/filtersSlice';
import DebouncedNumberInput from '@/app/components/ui/DebouncedNumberInput';
import { INPUT_CLASSES } from '@/app/constants/filters';

export const PriceRangeFilter = ({ isCompact }: { isCompact: boolean }) => {
  const dispatch = useAppDispatch();
  const { rentFrom, rentTo } = useAppSelector((state) => state.filters);
  const loading = useAppSelector((state) => state.listings.loading);

  return (
    <div className='relative'>
      {!isCompact && (
        <label className="absolute bg-white left-2 -top-3 px-2 text-sm font-medium text-gray-700 z-10">
          Monthly Rent (€)
        </label>
      )}
      <div className="flex gap-2">
        <DebouncedNumberInput
          value={rentFrom || ''}
          onChange={(value) => dispatch(setRentRange({ from: value, to: rentTo }))}
          placeholder="Min"
          disabled={loading}
          className={INPUT_CLASSES + (isCompact && ' text-sm')}
        />
        <DebouncedNumberInput
          value={rentTo || ''}
          onChange={(value) => dispatch(setRentRange({ from: rentFrom, to: value }))}
          placeholder="Max"
          disabled={loading}
          className={INPUT_CLASSES + (isCompact && ' text-sm')}
        />
      </div>
    </div>
  );
};
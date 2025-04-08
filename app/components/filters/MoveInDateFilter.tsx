'use client';

import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { setBookableOn } from '@/app/features/filters/filtersSlice';
import { INPUT_CLASSES } from '@/app/constants/filters';

export const MoveInDateFilter = ({ isCompact }: { isCompact: boolean }) => {
  const dispatch = useAppDispatch();
  const bookableOn = useAppSelector((state) => state.filters.bookableOn);
  const loading = useAppSelector((state) => state.listings.loading);

  return (
    <div className='relative'>
      {!isCompact && (
        <label htmlFor="moveInDate" className="absolute bg-white left-2 -top-3 px-2 text-sm font-medium text-gray-700 z-10">
          Move-in Date
        </label>
      )}
      <input
        id="moveInDate"
        type="date"
        value={bookableOn}
        onChange={(e) => dispatch(setBookableOn(e.target.value))}
        className={`${INPUT_CLASSES} cursor-text ${isCompact && 'text-sm'}`}
        disabled={loading}
      />
    </div>
  );
};
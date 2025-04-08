'use client';

import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { setSortOption } from '@/app/features/filters/filtersSlice';
import { INPUT_CLASSES } from '@/app/constants/filters';

export const SortingOptions = ({ isCompact }: { isCompact: boolean }) => {
  const dispatch = useAppDispatch();
  const sortOption = useAppSelector((state) => state.filters.sortOption);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortOption(e.target.value));
  };

  return (
    <div className="relative">
      <select
        value={sortOption}
        onChange={handleSortChange}
        className={`appearance-none cursor-pointer ${INPUT_CLASSES} pr-8 ${isCompact && 'text-sm'}`}
      >
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="date-asc">Available: Earliest</option>
        <option value="date-desc">Available: Latest</option>
        <option value="area-asc">Area: Smallest</option>
        <option value="area-desc">Area: Largest</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
};
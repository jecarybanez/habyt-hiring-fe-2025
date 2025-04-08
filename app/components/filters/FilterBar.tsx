'use client';

import { useScrollHandler } from '../../hooks/useScrollHandler';
import { CityFilter } from './CityFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { MoveInDateFilter } from './MoveInDateFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter';
// import { PageSizeFilter } from './PageSizeFilter';
import { ClearFiltersButton } from './ClearFiltersButton';
import { useAppSelector } from '@/app/hooks/store';
import { SortingOptions } from './SortingOptions';

export const FilterBar = () => {
  const { isCompact } = useScrollHandler();
  const loading = useAppSelector((state) => state.listings.loading);

  return (
    <div className={`
      bg-white sticky top-0 z-50 transition-all duration-300
      ${isCompact ? 'shadow-md p-4' : 'shadow-sm p-6 mb-8'}
      will-change-transform
    `}>
      {!isCompact && (
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Find your perfect home
        </h2>
      )}
      
      <div className={`grid gap-4 mb-4 ${isCompact ? 'grid-cols-4' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'}`}>
        <CityFilter isCompact={isCompact} />
        <PriceRangeFilter isCompact={isCompact} />
        <MoveInDateFilter isCompact={isCompact} />
        <PropertyTypeFilter isCompact={isCompact} />
        {/* <PageSizeFilter isCompact={isCompact} /> */}
        <SortingOptions isCompact={isCompact} />
        <div className="flex items-center col-span-2">
          {loading && (
            <div className="text-sm text-gray-500 text-center w-full">
              Searching...
            </div>
          )}
        </div>
        <ClearFiltersButton isCompact={isCompact} />
      </div>
    </div>
  );
};
'use client';

import { useState } from 'react';
import { useScrollHandler } from '@/app/hooks/useScrollHandler';
import { CityFilter } from './CityFilter';
import { PriceRangeFilter } from './PriceRangeFilter';
import { MoveInDateFilter } from './MoveInDateFilter';
import { PropertyTypeFilter } from './PropertyTypeFilter';
import { ClearFiltersButton } from './ClearFiltersButton';
import { useAppSelector } from '@/app/hooks/store';
import { SortingOptions } from './SortingOptions';
import { FiFilter, FiChevronDown, FiChevronUp } from 'react-icons/fi';

export const FilterBar = () => {
  const { isCompact } = useScrollHandler();
  const loading = useAppSelector((state) => state.listings.loading);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const toggleMobileFilters = () => {
    setIsMobileFiltersOpen(!isMobileFiltersOpen);
  };

  return (
    <div className={`
      bg-white sticky top-0 z-50 transition-all duration-300
      ${isCompact ? 'shadow-md px-2 py-3' : 'shadow-sm px-4 py-6 mb-4 md:mb-8'}
      will-change-transform
    `}>
      {/* Mobile filter toggle button - always visible on mobile */}
      <div className="md:hidden flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold text-gray-800">
          Find your perfect home
        </h2>
        <button
          onClick={toggleMobileFilters}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <FiFilter />
          Filters
          {isMobileFiltersOpen ? <FiChevronUp /> : <FiChevronDown />}
        </button>
      </div>

      {/* Desktop title - hidden on mobile */}
      {!isCompact && (
        <h2 className="hidden md:block text-lg md:text-xl font-semibold text-gray-800 mb-4 md:mb-6">
          Find your perfect home
        </h2>
      )}

      {/* Filters container - collapsible on mobile */}
      <div className={`grid gap-3 mb-3 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4
        ${isMobileFiltersOpen ? 'grid gap-6' : 'hidden md:grid'}`}>
          <CityFilter isCompact={isCompact} />
          <PriceRangeFilter isCompact={isCompact} />
          <MoveInDateFilter isCompact={isCompact} />
          <PropertyTypeFilter isCompact={isCompact} />
          <SortingOptions isCompact={isCompact} />
          <div className='col-span-2 hidden lg:block'>
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
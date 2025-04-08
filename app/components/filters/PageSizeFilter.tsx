'use client';

import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { setPageSize } from '@/app/features/filters/filtersSlice';
import { PAGE_SIZE_OPTIONS, INPUT_CLASSES } from '@/app/constants/filters';

export const PageSizeFilter = ({ isCompact }: { isCompact: boolean }) => {
  const dispatch = useAppDispatch();
  const pageSize = useAppSelector((state) => state.filters.pageSize);

  return (
    <div className='relative'>
      {!isCompact && (
        <label className="absolute bg-white left-2 -top-3 px-2 text-sm font-medium text-gray-700 z-10">
          Items per page
        </label>
      )}
      <div className="relative">
        <select
          value={pageSize}
          onChange={(e) => dispatch(setPageSize(Number(e.target.value)))}
          className={`${INPUT_CLASSES} appearance-none cursor-pointer ${isCompact && 'text-sm'}`}
        >
          {PAGE_SIZE_OPTIONS.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
          <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};
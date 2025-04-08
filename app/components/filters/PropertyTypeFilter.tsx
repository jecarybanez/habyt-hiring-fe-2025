'use client';

import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { setShareType } from '@/app/features/filters/filtersSlice';
import OptionSelectFilter from './OptionSelectFilter';
import { SHARE_TYPES } from '@/app/constants/filters';

export const PropertyTypeFilter = ({ isCompact }: { isCompact: boolean }) => {
  const dispatch = useAppDispatch();
  const shareType = useAppSelector((state) => state.filters.shareType);

  return (
    <div className='relative col-span-1'>
      {!isCompact && (
        <label className="absolute bg-white left-2 -top-3 px-2 text-sm font-medium text-gray-700 z-10">
          Property Type
        </label>
      )}
      <OptionSelectFilter
        label={isCompact ? "Type" : "Property Type"}
        options={[...SHARE_TYPES]}
        selectedValues={shareType}
        onChange={(values) => dispatch(setShareType(values))}
      />
    </div>
  );
};
import { useCities } from '@/app/hooks/useCities';
import OptionSelectFilter from './OptionSelectFilter';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { setCities } from '@/app/features/filters/filtersSlice';

export const CityFilter = ({ isCompact }: { isCompact: boolean }) => {
  const { availableCities, loading } = useCities();
  const cities = useAppSelector((state) => state.filters.cities);
  const dispatch = useAppDispatch();

  return (
    <div className='relative'>
      {!isCompact && (
        <label className="absolute bg-white left-2 -top-3 px-2 text-sm font-medium text-gray-700 z-10">
          City
        </label>
      )}
      <OptionSelectFilter
        label={isCompact ? "City" : "Select City"}
        options={availableCities.map(city => ({ label: city, value: city }))}
        selectedValues={cities || []}
        onChange={(selectedCities) => dispatch(setCities(selectedCities))}
        loading={loading}
        isCompact={isCompact}
      />
      {loading && (
        <p className="text-xs text-gray-500 mt-1">
          Loading cities... ({availableCities.length} found)
        </p>
      )}
    </div>
  );
};
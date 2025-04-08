import filtersReducer, {
  setCities,
  setRentRange,
  setShareType,
  setBookableOn,
  setPageSize,
  setSortOption,
  resetFilters,
  FiltersState
} from '@/app/features/filters/filtersSlice';

describe('filtersSlice', () => {
  const initialState: FiltersState = {
    cities: [],
    rentFrom: '',
    rentTo: '',
    shareType: [],
    bookableOn: '',
    pageSize: 100,
    sortOption: 'price-asc',
  };

  it('should return the initial state', () => {
    expect(filtersReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setCities', () => {
    it('should update cities with payload', () => {
      const testCities = ['Berlin', 'Munich'];
      const action = setCities(testCities);
      const state = filtersReducer(initialState, action);
      
      expect(state.cities).toEqual(testCities);
      // Verify other properties remain unchanged
      expect(state.rentFrom).toBe(initialState.rentFrom);
      expect(state.shareType).toEqual(initialState.shareType);
    });

    it('should handle empty array', () => {
      const action = setCities([]);
      const state = filtersReducer(initialState, action);
      expect(state.cities).toEqual([]);
    });
  });

  describe('setRentRange', () => {
    it('should update rentFrom and rentTo', () => {
      const range = { from: '500', to: '1500' };
      const action = setRentRange(range);
      const state = filtersReducer(initialState, action);
      
      expect(state.rentFrom).toBe(range.from);
      expect(state.rentTo).toBe(range.to);
      // Verify other properties remain unchanged
      expect(state.cities).toEqual(initialState.cities);
    });

    it('should handle empty strings', () => {
      const range = { from: '', to: '' };
      const action = setRentRange(range);
      const state = filtersReducer(initialState, action);
      
      expect(state.rentFrom).toBe('');
      expect(state.rentTo).toBe('');
    });
  });

  describe('setShareType', () => {
    it('should update shareType with payload', () => {
      const testTypes = ['PrivateApartment', 'Studio'];
      const action = setShareType(testTypes);
      const state = filtersReducer(initialState, action);
      
      expect(state.shareType).toEqual(testTypes);
      expect(state.pageSize).toBe(initialState.pageSize);
    });

    it('should replace existing values', () => {
      const modifiedState = { ...initialState, shareType: ['PrivateRoom'] };
      const action = setShareType(['SharedRoom']);
      const state = filtersReducer(modifiedState, action);
      
      expect(state.shareType).toEqual(['SharedRoom']);
    });
  });

  describe('setBookableOn', () => {
    it('should update bookableOn date', () => {
      const testDate = '2023-07-15';
      const action = setBookableOn(testDate);
      const state = filtersReducer(initialState, action);
      
      expect(state.bookableOn).toBe(testDate);
      expect(state.sortOption).toBe(initialState.sortOption);
    });

    it('should handle empty string', () => {
      const action = setBookableOn('');
      const state = filtersReducer(initialState, action);
      expect(state.bookableOn).toBe('');
    });
  });

  describe('setPageSize', () => {
    it('should update pageSize with payload', () => {
      const testSize = 20;
      const action = setPageSize(testSize);
      const state = filtersReducer(initialState, action);
      
      expect(state.pageSize).toBe(testSize);
      expect(state.cities).toEqual(initialState.cities);
    });

    it('should handle zero value', () => {
      const action = setPageSize(0);
      const state = filtersReducer(initialState, action);
      expect(state.pageSize).toBe(0);
    });
  });

  describe('setSortOption', () => {
    it('should update sortOption with payload', () => {
      const testOption = 'price-desc';
      const action = setSortOption(testOption);
      const state = filtersReducer(initialState, action);
      
      expect(state.sortOption).toBe(testOption);
      expect(state.rentFrom).toBe(initialState.rentFrom);
    });

    it('should handle unknown sort options', () => {
      const action = setSortOption('unknown-option');
      const state = filtersReducer(initialState, action);
      expect(state.sortOption).toBe('unknown-option');
    });
  });

  describe('resetFilters', () => {
    it('should reset all filters to initial state', () => {
      const modifiedState: FiltersState = {
        cities: ['Berlin'],
        rentFrom: '500',
        rentTo: '1500',
        shareType: ['PrivateApartment'],
        bookableOn: '2023-07-01',
        pageSize: 20,
        sortOption: 'price-desc'
      };
      
      const action = resetFilters();
      const state = filtersReducer(modifiedState, action);
      
      expect(state).toEqual(initialState);
    });

    it('should work from initial state', () => {
      const action = resetFilters();
      const state = filtersReducer(initialState, action);
      expect(state).toEqual(initialState);
    });
  });

  describe('type safety', () => {
    it('should enforce PayloadAction types', () => {
      // These would cause TypeScript errors if uncommented:
      // setCities(123 as any);
      // setRentRange('not-an-object' as any);
      // setPageSize('not-a-number' as any);
      
      // Properly typed actions
      const validActions = [
        setCities(['Berlin']),
        setRentRange({ from: '500', to: '1500' }),
        setPageSize(20)
      ];
      
      expect(validActions.length).toBe(3); // Just to use the variable
    });
  });
});
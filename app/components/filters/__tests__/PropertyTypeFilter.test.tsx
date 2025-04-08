import { render, screen, fireEvent } from '@testing-library/react';
import { PropertyTypeFilter } from '../PropertyTypeFilter';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { mockFiltersState, createTestState } from '@/__mocks__/test-utils/storeMocks';

jest.mock('@/app/hooks/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('PropertyTypeFilter', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders with default state', () => {
    render(<PropertyTypeFilter isCompact={false} />);
    expect(screen.getByText('Property Type: 2 selected')).toBeInTheDocument();
  });

  it('dispatches setShareType action', () => {
    render(<PropertyTypeFilter isCompact={false} />);
    fireEvent.click(screen.getByText('Property Type: 2 selected'));
    fireEvent.click(screen.getByLabelText('Private Apartment'));
    
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/setShareType',
      payload: ['Studio'] // Removes PrivateApartment
    });
  });

  it('shows "Any" when no types selected', () => {
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState({
        filters: { ...mockFiltersState, shareType: [] }
      }))
    );
    render(<PropertyTypeFilter isCompact={false} />);
    expect(screen.getByText('Property Type: Any')).toBeInTheDocument();
  });
});
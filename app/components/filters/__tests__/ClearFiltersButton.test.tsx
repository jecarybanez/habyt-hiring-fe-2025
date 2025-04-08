import { render, screen, fireEvent } from '@testing-library/react';
import { ClearFiltersButton } from '../ClearFiltersButton';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { createTestState, loadingState } from '@/__mocks__/test-utils/storeMocks';

jest.mock('@/app/hooks/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('ClearFiltersButton', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders correctly', () => {
    render(<ClearFiltersButton isCompact={false} />);
    expect(screen.getByText('Clear all filters')).toBeInTheDocument();
  });

  it('dispatches resetFilters action when clicked', () => {
    render(<ClearFiltersButton isCompact={false} />);
    fireEvent.click(screen.getByText('Clear all filters'));
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/resetFilters'
    });
  });

  it('is disabled when loading', () => {
    mockUseAppSelector.mockImplementation((selector) => 
      selector(loadingState)
    );
    render(<ClearFiltersButton isCompact={false} />);
    expect(screen.getByText('Clear all filters')).toBeDisabled();
  });
});
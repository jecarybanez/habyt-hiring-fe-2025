import { render, screen, fireEvent } from '@testing-library/react';
import { SortingOptions } from '../SortingOptions';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { createTestState } from '@/__mocks__/test-utils/storeMocks';
import { useDispatch, useSelector } from 'react-redux';

jest.mock('@/app/hooks/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useSelector>;

describe('SortingOptions', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders with current sort option', () => {
    render(<SortingOptions isCompact={false} />);
    expect(screen.getByDisplayValue('Price: Low to High')).toBeInTheDocument();
  });

  it('dispatches setSortOption action when changed', () => {
    render(<SortingOptions isCompact={false} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'price-desc' } });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/setSortOption',
      payload: 'price-desc'
    });
  });

  it('renders compact version correctly', () => {
    render(<SortingOptions isCompact={true} />);
    expect(screen.getByRole('combobox')).toHaveClass('text-sm');
  });
});
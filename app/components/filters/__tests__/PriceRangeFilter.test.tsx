import { render, screen, fireEvent } from '@testing-library/react';
import { PriceRangeFilter } from '../PriceRangeFilter';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { createTestState } from '@/__mocks__/test-utils/storeMocks';

jest.mock('@/app/hooks/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/app/components/ui/DebouncedNumberInput', () => ({
  DebouncedNumberInput: jest.fn(({ value, onChange, placeholder }) => (
    <input
      data-testid={`input-${placeholder}`}
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  ))
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('PriceRangeFilter', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders with current price range', () => {
    render(<PriceRangeFilter isCompact={false} />);
    expect(screen.getByTestId('input-Min')).toHaveValue(800);
    expect(screen.getByTestId('input-Max')).toHaveValue(1500);
  });

  it('dispatches setRentRange action when min changes', () => {
    render(<PriceRangeFilter isCompact={false} />);
    fireEvent.change(screen.getByTestId('input-Min'), { target: { value: '900' } });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/setRentRange',
      payload: { from: '900', to: '1500' }
    });
  });

  it('dispatches setRentRange action when max changes', () => {
    render(<PriceRangeFilter isCompact={false} />);
    fireEvent.change(screen.getByTestId('input-Max'), { target: { value: '1400' } });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/setRentRange',
      payload: { from: '800', to: '1400' }
    });
  });
});
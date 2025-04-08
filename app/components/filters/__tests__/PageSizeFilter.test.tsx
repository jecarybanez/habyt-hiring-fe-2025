import { render, screen, fireEvent } from '@testing-library/react';
import { PageSizeFilter } from '../PageSizeFilter';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { createTestState } from '@/__mocks__/test-utils/storeMocks';

jest.mock('@/app/hooks/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('PageSizeFilter', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders with current page size', () => {
    render(<PageSizeFilter isCompact={false} />);
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('dispatches setPageSize action', () => {
    render(<PageSizeFilter isCompact={false} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '20' } });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/setPageSize',
      payload: 20
    });
  });
});
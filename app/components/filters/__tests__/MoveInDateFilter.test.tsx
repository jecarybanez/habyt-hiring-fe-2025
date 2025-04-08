import { render, screen, fireEvent } from '@testing-library/react';
import { MoveInDateFilter } from '../MoveInDateFilter';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { createTestState } from '@/__mocks__/test-utils/storeMocks';

jest.mock('@/app/hooks/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('MoveInDateFilter', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders with current date', () => {
    render(<MoveInDateFilter isCompact={false} />);
    expect(screen.getByDisplayValue('2023-07-01')).toBeInTheDocument();
  });

  it('dispatches setBookableOn action', () => {
    render(<MoveInDateFilter isCompact={false} />);
    fireEvent.change(screen.getByLabelText('Move-in Date'), { 
      target: { value: '2023-08-01' } 
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'filters/setBookableOn',
      payload: '2023-08-01'
    });
  });
});
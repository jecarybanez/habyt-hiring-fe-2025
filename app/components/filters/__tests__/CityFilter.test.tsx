import { render, screen } from '@testing-library/react';
import { CityFilter } from '../CityFilter';
import { useAppDispatch, useAppSelector } from '@/app/hooks/store';
import { createTestState } from '@/__mocks__/test-utils/storeMocks';
import { useCities } from '@/app/hooks/useCities';

jest.mock('@/app/hooks/store', () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock('@/app/hooks/useCities', () => ({
  useCities: jest.fn(() => ({
    availableCities: ['Berlin', 'Munich', 'Hamburg'],
    loading: false
  })),
}));

const mockUseAppDispatch = useAppDispatch as jest.MockedFunction<typeof useAppDispatch>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('CityFilter', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAppDispatch.mockReturnValue(mockDispatch);
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders with selected city', () => {
    render(<CityFilter isCompact={false} />);
    expect(screen.getByText('City: 1 selected')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useCities as jest.Mock).mockReturnValue({ availableCities: [], loading: true });
    render(<CityFilter isCompact={false} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
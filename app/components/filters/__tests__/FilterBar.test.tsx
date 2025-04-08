import { render, screen, fireEvent } from '@testing-library/react';
import { FilterBar } from '../FilterBar';
import { useScrollHandler } from '@/app/hooks/useScrollHandler';
import { createTestState } from '@/__mocks__/test-utils/storeMocks';
import { useAppSelector } from '@/app/hooks/store';

jest.mock('@/app/hooks/useScrollHandler');
jest.mock('@/app/hooks/store', () => ({
  useAppSelector: jest.fn(),
}));

const mockUseScrollHandler = useScrollHandler as jest.MockedFunction<typeof useScrollHandler>;
const mockUseAppSelector = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

describe('FilterBar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseScrollHandler.mockReturnValue({ isCompact: false });
    mockUseAppSelector.mockImplementation((selector) => 
      selector(createTestState())
    );
  });

  it('renders all filters', () => {
    render(<FilterBar />);
    expect(screen.getByText('Find your perfect home')).toBeInTheDocument();
    expect(screen.getByText('City: 1 selected')).toBeInTheDocument();
    expect(screen.getByDisplayValue('800')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1500')).toBeInTheDocument();
  });

  it('toggles mobile filters', () => {
    render(<FilterBar />);
    fireEvent.click(screen.getByText('Filters'));
    expect(screen.getByTestId('mobile-filters')).toBeInTheDocument();
  });

  it('shows compact version when scrolled', () => {
    mockUseScrollHandler.mockReturnValue({ isCompact: true });
    render(<FilterBar />);
    expect(screen.queryByText('Find your perfect home')).not.toBeInTheDocument();
  });
});
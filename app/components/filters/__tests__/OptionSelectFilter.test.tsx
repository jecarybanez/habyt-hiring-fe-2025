import { render, screen, fireEvent } from '@testing-library/react';
import OptionSelectFilter from '../OptionSelectFilter';
import { SHARE_TYPES } from '@/app/constants/filters';

describe('OptionSelectFilter', () => {
  const mockOnChange = jest.fn();

  it('renders with options', () => {
    render(
      <OptionSelectFilter
        label="Test"
        options={[...SHARE_TYPES]}
        selectedValues={['PrivateApartment']}
        onChange={mockOnChange}
      />
    );
    
    fireEvent.click(screen.getByText('Test: 1 selected'));
    expect(screen.getByLabelText('Private Apartment')).toBeChecked();
  });

  it('calls onChange when toggling options', () => {
    render(
      <OptionSelectFilter
        label="Test"
        options={[...SHARE_TYPES]}
        selectedValues={[]}
        onChange={mockOnChange}
      />
    );
    
    fireEvent.click(screen.getByText('Test: Any'));
    fireEvent.click(screen.getByLabelText('Private Apartment'));
    expect(mockOnChange).toHaveBeenCalledWith(['PrivateApartment']);
  });
});
import { render, screen, fireEvent } from '@testing-library/react';
import { ListingsError } from '@/app/components/listings/ListingsError';

describe('ListingsError', () => {
  it('displays error message and retry button', () => {
    const errorMessage = 'Test error';
    const mockRetry = jest.fn();
    
    render(<ListingsError error={errorMessage} onRetry={mockRetry} />);
    
    expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /retry/i }));
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});
export interface APIError {
  error: string;
  statusCode: number;
  details?: Record<string, unknown>;
}

export const isAPIError = (error: unknown): error is APIError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'error' in error &&
    typeof (error as APIError).error === 'string' &&
    'statusCode' in error &&
    typeof (error as APIError).statusCode === 'number'
  );
};
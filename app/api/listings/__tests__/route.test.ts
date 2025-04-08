import { jest } from '@jest/globals';
import { GET } from '@/app/api/listings/route';
import { createMockRequest } from '@/__mocks__/test-utils/apiTestUtils';
import { Listing } from '@/app/types/listing';

// Proper ESM mocking syntax
jest.mock('fs', () => ({
  readFileSync: jest.fn().mockReturnValue(JSON.stringify({
    data: Array(50).fill(0).map((_, i) => ({
      referenceId: `ref-${i}`,
      city: i % 2 === 0 ? 'Berlin' : 'Munich',
      rentNet: 800 + (i * 10),
      // ... other required listing fields
    })),
    metadata: {
      pagination: {
        totalItems: 50
      }
    }
  })),
  existsSync: jest.fn().mockReturnValue(true)
}));

jest.mock('path', () => ({
  join: jest.fn((...args) => args.join('/')),
  resolve: jest.fn((...args) => args.join('/'))
}));

describe('/api/listings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return paginated listings with default parameters', async () => {
    const req = createMockRequest('/api/listings');
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data).toHaveLength(100);
    expect(data.metadata.pagination.currentPage).toBe(0);
    expect(data.metadata.pagination.totalPages).toBe(17);
  });

  it('should apply city filter correctly', async () => {
    const req = createMockRequest('/api/listings', { city: ['Berlin'] });
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((l: Listing) => l.city === 'Berlin')).toBeTruthy();
  });

  it('should handle price range filtering', async () => {
    const req = createMockRequest('/api/listings', { 
      rentFrom: '1000',
      rentTo: '1200'
    });
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.data.every((l: Listing) => 
      l.rentNet >= 1000 && l.rentNet <= 1200
    )).toBeTruthy();
  });

  it('should handle sorting parameters', async () => {
    const req = createMockRequest('/api/listings', {
      sort: 'roomArea',
      order: 'desc'
    });
    const response = await GET(req);
    const data = await response.json();

    expect(response.status).toBe(200);
    const areas = data.data.map((l: Listing) => l.roomArea);
    const sortedAreas = [...areas].sort((a, b) => b - a);
    expect(areas).toEqual(sortedAreas);
  });
});
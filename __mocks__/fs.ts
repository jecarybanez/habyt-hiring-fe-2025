export const readFileSync = jest.fn((path: string) => {
  if (path.includes('data.json')) {
    return JSON.stringify({
      data: [],
      metadata: {
        pagination: {
          currentPage: 0,
          currentPageSize: 0,
          totalPages: 0,
          hasNextPage: false,
          hasPrevPage: false,
          totalItems: 0
        }
      }
    });
  }
  throw new Error('File not found');
});

export const existsSync = jest.fn((path: string) => path.includes('data.json'));
export const writeFileSync = jest.fn();
export const promises = {
  readFile: jest.fn()
};
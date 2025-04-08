export const join = jest.fn((...args: string[]) => args.join('/'));
export const resolve = jest.fn((...args: string[]) => args.join('/'));
export const dirname = jest.fn((path: string) => path.split('/').slice(0, -1).join('/'));
export const basename = jest.fn((path: string) => path.split('/').pop() || '');
export const extname = jest.fn((path: string) => {
  const match = path.match(/\.([^./]+)$/);
  return match ? `.${match[1]}` : '';
});
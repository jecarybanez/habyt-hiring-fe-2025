import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  // Use different environments based on test location
  testEnvironment: 'node',
  testEnvironmentOptions: {
    customExportConditions: [''],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transform: {
    '^.+\\.(t|j)sx?$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
  // Add this to handle Next.js internals
  modulePathIgnorePatterns: ['<rootDir>/.next/'],
};

export default createJestConfig(config);
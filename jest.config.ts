// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'jsdom', // Use jsdom for DOM APIs in tests
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], // Setup file to include jest-dom matchers
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/pages/(.*)$': '<rootDir>/pages/$1',
  },
  testPathIgnorePatterns: ['/node_modules/', '/.next/'], // Ignore node_modules and .next directories
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for TypeScript files
  },
};

export default config;

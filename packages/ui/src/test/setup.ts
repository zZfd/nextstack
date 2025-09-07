import '@testing-library/jest-dom';
import { beforeAll, afterAll, beforeEach } from '@jest/globals';

// Mock Tamagui config
jest.mock('@tamagui/config', () => ({
  config: {
    themes: {},
    tokens: {},
    media: {},
  },
}));

// Setup test environment
beforeAll(() => {
  // Global setup for UI tests
});

afterAll(() => {
  // Global cleanup for UI tests
});

beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();
});

// Global test utilities for UI components
global.testUtils = {
  // Add common UI test utilities here
};
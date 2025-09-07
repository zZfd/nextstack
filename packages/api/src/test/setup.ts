// Global test setup
import { beforeAll, afterAll, beforeEach, afterEach } from '@jest/globals';

// Mock environment variables
process.env.NODE_ENV = 'test';

// Global test setup
beforeAll(async () => {
  // Setup test database or other global resources
});

afterAll(async () => {
  // Cleanup test database or other global resources
});

beforeEach(() => {
  // Reset mocks before each test
  jest.clearAllMocks();
});

afterEach(() => {
  // Additional cleanup after each test
});

// Global test utilities
global.testUtils = {
  // Add common test utilities here
};
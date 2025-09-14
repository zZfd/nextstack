/**
 * Environment configuration loader
 * Loads environment variables from local .env file
 */
import path from 'path';

import dotenv from 'dotenv';

// Load environment variables from local .env file
const result = dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

if (result.error && process.env.NODE_ENV !== 'test') {
  console.warn('Warning: Could not load .env file:', result.error.message);
}

export {};

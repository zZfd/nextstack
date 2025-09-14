/**
 * Environment configuration loader
 * Loads environment variables from the monorepo root
 */
import path from 'path';

import dotenv from 'dotenv';

// Load environment variables from monorepo root
dotenv.config({
  path: path.resolve(__dirname, '../../../.env'),
});

// Also load from local .env if it exists
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

export {};

import path from 'path';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@nextstack/trpc-router': path.resolve(
        __dirname,
        '../../packages/trpc-router'
      ),
      '@nextstack/database': path.resolve(__dirname, '../../packages/database'),
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup/setup.ts'],
    globalSetup: './tests/setup/globalSetup.ts',
    globalTeardown: './tests/setup/globalTeardown.ts',
    pool: 'forks', // 使用进程隔离，确保数据库连接独立
    poolOptions: {
      forks: {
        singleFork: false, // 允许并发测试
      },
    },
    testTimeout: 30000, // 数据库操作需要更长时间
    include: ['tests/**/*.test.ts'],
    exclude: ['node_modules', 'dist'],
  },
});

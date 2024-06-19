import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    globals: true,
    singleThread: true,
    globalSetup: ['vitest-global-setup.ts'],
    setupFiles: ['vitest-setup.ts'],
    testNamePattern: /^((?!#costly).)*$/,
    typecheck: {
      // @TODO: Check that this works
      include: ['**/*.type.test.ts'],
      ignoreSourceErrors: true,
    },
    coverage: {
      provider: 'v8',
    },
    chaiConfig: {
      truncateThreshold: 10_000,
    },
  },
});

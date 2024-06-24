import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    // typecheck: {
    //   // @TODO: Check that this works
    //   include: ['**/*.type.test.ts'],
    //   ignoreSourceErrors: true,
    // },
    coverage: {
      provider: 'v8',
    },
  },
});

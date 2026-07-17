import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

const resolvePath = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  test: {
    environment: 'happy-dom', // provides window/localStorage for service tests
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    // Match aliases with Nuxt so '~/...' imports work in tests.
    alias: {
      '~': resolvePath('./'),
      '@': resolvePath('./'),
      '~~': resolvePath('./'),
      '@@': resolvePath('./'),
    },
  },
})

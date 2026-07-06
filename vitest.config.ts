import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

const resolvePath = (p: string) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  test: {
    environment: 'happy-dom', // menyediakan window/localStorage untuk tes service
    include: ['tests/**/*.test.ts'],
  },
  resolve: {
    // Samakan alias dengan Nuxt agar impor '~/...' berfungsi di tes.
    alias: {
      '~': resolvePath('./'),
      '@': resolvePath('./'),
      '~~': resolvePath('./'),
      '@@': resolvePath('./'),
    },
  },
})

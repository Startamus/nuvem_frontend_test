import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { configDefaults } from 'vitest/config'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),  tailwindcss()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: './src/__tests__/setup.ts',
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [...(configDefaults.coverage?.exclude || []), 'src/__tests__/setup.ts']
    }
  },

})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { fileURLToPath } from 'url'

const currentDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined
          }

          if (id.includes('framer-motion')) {
            return 'motion-vendor'
          }

          if (
            id.includes('react-hook-form') ||
            id.includes('zod') ||
            id.includes('@hookform/resolvers') ||
            id.includes('sonner')
          ) {
            return 'forms-vendor'
          }

          if (
            id.includes('react-dom') ||
            id.includes('react-router-dom') ||
            id.includes('/react/')
          ) {
            return 'react-vendor'
          }

          return 'vendor'
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(currentDir, './src'),
    },
  },
})

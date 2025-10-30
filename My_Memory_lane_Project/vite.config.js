import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    // Copy _redirects file to dist
    rollupOptions: {
      external: [],
    },
  },
  // This ensures all routes work in production
  base: '/',
});
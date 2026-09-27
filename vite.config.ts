import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// User site (salmaalkhalily.github.io) is served from the root, so base = '/'
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});

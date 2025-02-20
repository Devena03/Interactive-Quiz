import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Try './' instead of '/'
  build: {
    outDir: 'dist', // Ensure output is in 'dist'
  },
});

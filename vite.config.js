import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/', // Make sure this is set correctly
  build: {
    outDir: 'dist', // Ensure it's set to 'dist'
  },
});

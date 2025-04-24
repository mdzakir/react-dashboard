// import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    include: ['**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    reporters:  ['default', 'html'],
    coverage: {
      include: ['src/**/*.{ts,tsx}'], // specify files to include
      exclude: ['src/generated/**/*.ts'], // specify files to exclude
      reporter: ['text', 'html', 'lcov', 'cobertura'], // Add 'cobertura' for XML report
      reportsDirectory: './coverage',
      reportOnFailure: true,
    },
  },
});

// vitest.config.ts
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'; // Or @rollup/plugin-alias

export default defineConfig({
  plugins: [tsconfigPaths()],
});
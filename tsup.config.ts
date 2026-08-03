import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
  // esbuild already tree-shakes bundled ESM. Disabling tsup's additional
  // Rollup pass avoids mixed default/named-export warnings for the CJS build.
  treeshake: false,
})

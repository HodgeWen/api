import { resolve } from 'path'
import { defineConfig } from 'rollup'


export default defineConfig({
  input: resolve(__dirname, './src/main.ts'),

  output: {
    dir: resolve(__dirname, 'building'),
    format: 'commonjs'
  },

  watch: {
    exclude: 'node_modules/**',
    include: "src/**"
  }
})
import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  base: '/urbek/',
  plugins: [svelte()],

  build: {
    outDir: './docs',
    emptyOutDir: true
  }
})

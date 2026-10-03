import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = nombre del repo para que GitHub Pages resuelva los assets
export default defineConfig({
  plugins: [react()],
  base: '/golden_hour/',
  // Tegaki trae sus fuentes como archivos aparte; sin esto no anima en dev.
  optimizeDeps: { exclude: ['tegaki'] },
  build: {
    rollupOptions: {
      // Cada página es un .html propio: /golden_hour/ y /golden_hour/glow/
      input: {
        main: resolve(__dirname, 'index.html'),
        glow: resolve(__dirname, 'glow/index.html'),
      },
    },
  },
})

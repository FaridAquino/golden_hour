import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base = nombre del repo para que GitHub Pages resuelva los assets
export default defineConfig({
  plugins: [react()],
  base: '/golden_hour/',
})

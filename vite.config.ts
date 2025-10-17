import yaml from '@modyfi/vite-plugin-yaml'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), yaml()],
  base: '/portfolio/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~data': path.resolve(__dirname, 'data'),
    },
  },
})

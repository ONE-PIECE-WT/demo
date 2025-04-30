import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@capacitor-mlkit/barcode-scanning'],
  },
  plugins: [vue()],
})

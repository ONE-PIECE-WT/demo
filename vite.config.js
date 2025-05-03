import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ['@capacitor-mlkit/barcode-scanning'],
  },
  build: {
    rollupOptions: {
      external: [
        '@capacitor/toast',
        '@capacitor/camera',
        '@exxili/capacitor-nfc',
        '@capacitor/core'
      ]
    }
  },
  plugins: [vue()],
})

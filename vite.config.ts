import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: 'globalThis',
    'process.env': {}
  },
  optimizeDeps: {
    include: ['@saros-finance/dlmm-sdk']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          solana: ['@solana/wallet-adapter-react', '@solana/wallet-adapter-react-ui', '@solana/web3.js'],
          ui: ['lucide-react', 'clsx']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})

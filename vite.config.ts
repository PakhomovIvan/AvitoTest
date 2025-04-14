import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['v324131.hosted-by-vdsina.com'],
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 8181,
  },
})

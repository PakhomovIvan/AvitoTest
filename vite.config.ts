import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['v2732210.hosted-by-vdsina.ru'],
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 8181,
  },
})

import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve('src/'),
      src: path.resolve('src/'),
    },
  },
  server: {
    host: true,
    port: 3000,
    open: true,
  },
  build: {
    target: 'es2022',
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('ag-charts-community') || id.includes('ag-charts-react')) {
              return 'vendor-charts'
            }
            if (id.includes('@ant-design') || id.includes('antd') || id.includes('rc-')) {
              return 'vendor-antd'
            }
            if (id.includes('react-router') || id.includes('@remix-run')) {
              return 'vendor-router'
            }
            if (id.includes('react-dom')) {
              return 'vendor-react-dom'
            }
            if (id.includes('react')) {
              return 'vendor-react'
            }
            if (id.includes('dayjs')) {
              return 'vendor-dayjs'
            }
            if (id.includes('axios')) {
              return 'vendor-axios'
            }
            if (id.includes('swr')) {
              return 'vendor-swr'
            }
            return 'vendor-lib'
          }
        },
      },
    },
  },
})

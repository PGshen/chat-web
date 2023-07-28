/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: peng pgs1108pgs@126.com
 * @LastEditTime: 2023-07-28 09:50:31
 * @FilePath: /ai-tool-web/vite.config.ts
 */
/**
 * Vite configuaration file
 * https://vitejs.dev/config/
 */

import { defineConfig, Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import mockApp from './mock'

const mock = (): Plugin => ({
  name: 'mock',
  configureServer: async server => {
    // mount mock server, `/api` is the base url
    server.middlewares.use('/api', mockApp)
  }
})

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "@/styles/index.scss" as *;'
      }
    }
  },
  plugins: [vue(), mock()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'naive-ui': ['naive-ui']
        }
      }
    }
  }
})

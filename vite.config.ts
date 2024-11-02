/*
 * @Date: 2023-07-27 22:35:12
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-08-11 19:06:45
 * @FilePath: /ai-tool-web/vite.config.ts
 */

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from 'path'

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
  plugins: [vue()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'naive-ui': ['naive-ui']
        }
      }
    }
  },
  server: {
    port: 3000,
    hmr: {
      host: 'localhost',
      port: 3000
    },
    // 设置代理
    proxy: {
      '/ai': {
        target: 'http://0.0.0.0:8000',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/ai/, '')
      },
      '/api': {
        // target: 'http://gpt-meeting-service:8000',
        target: 'http://0.0.0.0:8000',
        changeOrigin: true
        // rewrite: (path: string) => path.replace(/^\/api/, '')
      },
      '/image': {
        // target: 'http://gpt-meeting-service:8000',
        target: 'http://0.0.0.0:8000',
        changeOrigin: true
        // rewrite: (path: string) => path.replace(/^\/api/, '')
      },
      '/yml': {
        // target: 'http://gpt-meeting-service:8000',
        target: 'http://0.0.0.0:8000',
        changeOrigin: true
        // rewrite: (path: string) => path.replace(/^\/api/, '')
      },
      '/openai': {
        target: 'https://api.openai.com',
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/openai/, '')
      }
    }
  }
})

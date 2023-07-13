import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@': path.resolve(__dirname, 'src/renderer/src'),
        'components': path.resolve(__dirname, 'src/renderer/src/components'),
        'views': path.resolve(__dirname, 'src/renderer/src/views')
      }
    },
    plugins: [vue()]
  }
})

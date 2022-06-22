import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
export default defineConfig({
  plugins: [vue(), vueJsx()],
  define: {
    'process.env': {
      'VUE_APP_API_URL': "http://localhost:8021/api",
      'VUE_PIC_DOWN': "http://localhost:8021/api/pic/down"
    }
  },
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment'
  },
})

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
  // css: {
  //   // css预处理器
  //   preprocessorOptions: {
  //     less: {
  //       javascriptEnabled: true,
  //       charset: false,
  //       modifyVars: {
  //         // "@primary-color": "red",
  //         'primary-color': '#1DA57A',
  //         'link-color': '#1DA57A',
  //         'border-radius-base': '2px',
  //       },
  //     },
  //   },
  // },
})

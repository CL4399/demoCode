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
  server: {
    proxy: { // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      '^/api': {
        target: 'https://hn.algolia.com/', // 后端服务实际地址
        changeOrigin: true, //开启代理
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
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

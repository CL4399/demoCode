import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import "./assets/css/styles.css"
import 'element-plus/dist/index.css'
import 'ant-design-vue/dist/antd.variable.min.css';
import { message, } from 'ant-design-vue';
import * as Icons from '@ant-design/icons-vue'

const pinia = createPinia()
const app = createApp(App)
// 引入弹窗组件v3layer
// import V3Layer from './view/demo5/layerCom.vue'
// app.directive('focus', {
//     // 当被绑定的元素挂载到 DOM 中时……
//     mounted(el: HTMLElement) {
//         // 聚焦元素
//         el.focus()
//         el.innerText = "123"

//     }
// })
const icons: any = Icons
for (const i in icons) {
  app.component(i, icons[i])
}
import { layer } from "@layui/layer-vue"
import '@layui/layer-vue/lib/index.css';
app.use(router).use(pinia)
  // .use(tracing, {
  //     requestUrl: 'false',
  //     appName: 'chengxh',
  //     event: true,
  //     performance: true,
  //     pv: true,
  //     error: true,
  // })
  .mount('#app')
// import layer from "vue-layer-shadow";
// import "vue-layer-shadow/lib/vue-layer.css";
// import layer from "vue-layer";
// import "vue-layer/lib/vue-layer.css";
// app.config.globalProperties.$layer = layer(app);
app.config.globalProperties.$message = message;
app.config.globalProperties.$layer = layer;





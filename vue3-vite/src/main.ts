import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import "./assets/css/styles.css"
// import { useCounterStore } from './store/index'
import 'element-plus/dist/index.css'
// import tracing from 'web-tracing'

// import 'ant-design-vue/dist/antd.css';
import 'ant-design-vue/dist/antd.variable.min.css';
// import '@arco-design/web-vue/dist/arco.css';
// import 'ant-design-vue/es/message/style/css';
import { message } from 'ant-design-vue';
// import "./assets/css/antLess.less"
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
app.config.globalProperties.$message = message;





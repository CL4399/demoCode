import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import "./assets/css/styles.css"
import { useCounterStore } from './store/index'
import 'ant-design-vue/dist/antd.css';
import '@arco-design/web-vue/dist/arco.css';
import 'element-plus/dist/index.css'

import { message } from 'ant-design-vue';
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

app.use(router).use(pinia).mount('#app')
app.config.globalProperties.$message = message;





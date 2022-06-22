import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router/index"
import "./assets/css/styles.css"
import { useCounterStore } from './store/index'
import 'ant-design-vue/dist/antd.css';
import { message } from 'ant-design-vue';
const pinia = createPinia()
const app = createApp(App)
app.use(router).use(pinia).mount('#app')
app.config.globalProperties.$message = message;




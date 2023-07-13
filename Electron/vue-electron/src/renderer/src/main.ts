import { createApp } from 'vue'
import App from './App.vue'
import { Button, message } from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import router from "./router/index"
const app = createApp(App); 
app.use(Button).use(router).mount('#app')
app.config.globalProperties.$message = message;


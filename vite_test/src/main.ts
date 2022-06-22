import { createApp } from 'vue'
import App from './App.vue'
import {router} from './router'
import * as THREE from "three";
	
import 'virtual:svg-icons-register'

import SvgIcon from './components/SvgIcon.vue'
import Menus from 'vue3-menus';
import { directive, menusEvent, Vue3Menus } from 'vue3-menus';
let  app = createApp(App)
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
app.component('vue3-menus', Vue3Menus); // 只注册组件
app.component('icon', SvgIcon); // 只注册组件

app.directive('menus', directive); // 只注册指令
app.config.globalProperties.$menusEvent = menusEvent; // 只绑定方法
app.use(router)
app.use(ElementPlus).mount('#app')


import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';
// import 'assets/css/base.less';
import './icons'

Vue.config.productionTip = false
Vue.use(Antd);

import {
  Modal,
  message,
  Icon
} from 'ant-design-vue'
Vue.prototype.$Message = message
Vue.prototype.$confirm = Modal.confirm

import layer from "vue-layer-shadow";
import "vue-layer-shadow/lib/vue-layer.css";
// import layer from "vue-layer";
// import "vue-layer/lib/vue-layer.css";
Vue.prototype.$layer = layer(Vue);

import * as echarts from 'echarts/core';
Vue.prototype.$echarts = echarts
import {
  BarChart,
  TreeChart,
  GaugeChart,
  GraphChart,
  LinesChart,
  CustomChart,
  LineChart,
  RadarChart,
  ScatterChart,
  PictorialBarChart,
  PieChart
} from 'echarts/charts';

import {
  TitleComponent,
  GraphicComponent,
  PolarComponent,
  VisualMapComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent
} from 'echarts/components';

import {
  CanvasRenderer
} from 'echarts/renderers';

echarts.use([TitleComponent, GraphicComponent, GaugeChart, GraphChart, LinesChart, TreeChart, CustomChart, RadarChart, LineChart, PieChart, ScatterChart, VisualMapComponent, PolarComponent, LegendComponent, TooltipComponent, GridComponent, PictorialBarChart, BarChart, CanvasRenderer, DataZoomComponent]);

Vue.filter("allFilter", (val) => {
  // 自定义过滤方法
  return val
})

Vue.directive("allDirective", {
  bind: (el, binding, vnode) => {
    // el：你写v-xxx的dom
    // binding：一个对象，里面有传值
    // vnode：Vue 编译生成的虚拟节点。
    // oldVnode：上一个虚拟节点，仅在update和componentUpdated中可用
    console.log(el, binding, vnode, 'bind');
  },
  // 被绑定元素插入父节点时调用
  inserted: (el, binding, vnode) => {
    console.log(el, binding, vnode, 'inserted');
  },
  // 所在组件的 VNode 更新时调用
  update: (el, binding, vnode, oldVnode) => {
    console.log(el, binding, vnode, oldVnode, 'update');
  },
  // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
  componentUpdated: (el, binding, vnode, oldVnode) => {
    console.log(el, binding, vnode, oldVnode, 'componentUpdated');
  },
  // 只调用一次，指令与元素解绑时调用。
  unbind: (el, binding, vnode, ) => {
    console.log(el, binding, vnode, 'unbind');
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import { createRouter,createWebHashHistory} from "vue-router";
import { RouteRecordRaw } from 'vue-router'
const demo = () => import('@/pages/index/index.vue')
const demo2 = () => import('@/pages/demo2/index.vue')

const routes:RouteRecordRaw[] = [
  { path: "/", redirect: "/demo2" },
  {
    path: "/home",
    name: "home",
    component: demo
  },

  {
    path: "/demo2",
    name: "demo2",
    component: demo2
  }
]
export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
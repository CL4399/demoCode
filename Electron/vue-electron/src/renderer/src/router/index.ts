// src\router\index.ts
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  //  hash 模式。
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/page/index.vue')
    },
    {
      path: '/page',
      component: () => import('../views/page/index.vue')
    },
    {
      path: '/home',
      component: () => import('../views/home/index.vue')
    }
  ]
})

export default router

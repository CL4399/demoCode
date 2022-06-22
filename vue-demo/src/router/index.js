import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/AboutView.vue')
  }, {
    path: '/demo1',
    name: 'demo1',
    component: () => import( /* webpackChunkName: "about" */ '../views/DemoFIle/Demo.vue')
  }, {
    path: '/AntvX6',
    name: 'AntvX6',
    component: () => import( /* webpackChunkName: "about" */ '../views/DemoFIle/AntvX6.vue')
  }, , {
    path: '/long-list',
    name: 'long-list',
    component: () => import( /* webpackChunkName: "about" */ '../views/DemoFIle/LongList.vue')
  }, {
    path: '/three-js',
    name: 'three-js',
    component: () => import( /* webpackChunkName: "about" */ '../views/DemoFIle/ThreeJs.vue')
  },
  {
    path: '/ant-demo',
    name: 'ant-demo',
    component: () => import( /* webpackChunkName: "about" */ '../views/DemoFileT/AntDemo.vue')
  },
  {
    path: '/canvas',
    name: 'canvas',
    component: () => import( /* webpackChunkName: "about" */ '../views/DemoFIle/CanvasCom.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

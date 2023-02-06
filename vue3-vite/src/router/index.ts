import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
const routes = [
  { path: "/", redirect: "/login" },
  { path: "/404", name: "404", component: () => import("../view/Status/Error404.vue"), },
  {
    path: "/home",
    name: "home",
    component: () => import("../layout/index.vue"),
    children: [
      {
        path: "/demo1",
        name: "demo1",
        component: () => import("../view/demo1/Demo.vue"),
      },
      {
        path: "/demo4",
        name: "demo4",
        component: () => import("../view/demo4/index.vue"),
      },
      {
        path: "/demo5",
        name: "demo5",
        component: () => import("../view/demo5/demo.vue"),
      },
      {
        path: "/demo6",
        name: "demo6",
        component: () => import("../view/demo6/index.vue"),
      }, {
        path: "/demo7",
        name: "demo7",
        component: () => import("../view/demo7/index.vue"),
      }, {
        path: "/demo9",
        name: "demo9",
        component: () => import("../view/demo9/index.vue"),
      }, {
        path: "/demo10",
        name: "demo10",
        component: () => import("../view/demo10/index.vue"),
      }, {
        path: "/demo11",
        name: "demo11",
        component: () => import("../view/demo11/index.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../view/login/Login.vue"),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(to, from, "router.beforeEach", !sessionStorage.getItem('authorize'));
  if (to.path === '/login') next()
  if (!sessionStorage.getItem('authorize')) {
    next({ path: '/login' })
  } else {
    next()
  }
})

export default router;

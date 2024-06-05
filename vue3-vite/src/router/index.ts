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
        path: "/other",
        name: "other",
        component: () => import("../view/other/Demo.vue"),
      },
      {
        path: "/CustomButton",
        name: "CustomButton",
        component: () => import("../view/customButton/index.vue"),
      },
      {
        path: "/SearchInput",
        name: "SearchInput",
        component: () => import("../view/searchInput/demo.vue"),
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
        path: "/SecondaryEncapsulationForm",
        name: "SecondaryEncapsulationForm",
        component: () => import("../view/secondaryEncapsulationForm/index.vue"),
      }, {
        path: "/shoppingScreening",
        name: "shoppingScreening",
        component: () => import("../view/shoppingScreening/index.vue"),
      }, {
        path: "/Animation",
        name: "Animation",
        component: () => import("../view/animation/index.vue"),
      },{
        path: "/webgl",
        name: "WebGL",
        component: () => import("../view/webgl/index.vue"),
      },
      {
        path: "/tree",
        name: "Tree",
        component: () => import("../view/tree/index.vue"),
      },
      {
        path: "/read",
        name: "Read",
        component: () => import("../view/read/index.vue"),
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

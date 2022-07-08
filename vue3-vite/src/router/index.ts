import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
const routes = [
  { path: "/", redirect: "/home" },
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
        path: "/demo2",
        name: "demo2",
        component: () => import("../view/demo2/Demo.vue"),
      },
      {
        path: "/demo3",
        name: "demo3",
        component: () => import("../view/demo3/Demo.vue"),
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
        path: "/demo8",
        name: "demo8",
        component: () => import("../view/demo8/index.vue"),
      }, {
        path: "/demo9",
        name: "demo9",
        component: () => import("../view/demo9/index.vue"),
      },
      {
        path: "/demo7",
        name: "demo7",
        component: () => import("../view/demo7/TreeSearchDemo.vue"),
      },
      {
        path: "/canvas-demo1",
        name: "canvas-demo1",
        component: () => import("../view/canvas/demo1.vue"),
      },
      {
        path: "/canvas-demo2",
        name: "canvas-demo2",
        component: () => import("../view/canvas/demo2.vue"),
      },
      {
        path: "/canvas-demo3",
        name: "canvas-demo3",
        component: () => import("../view/canvas/demo3.vue"),
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../view/login/Login.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
// router.beforeEach((to, from, next) => {
//     document.title = `${to.meta.title} | vue-manage-system`;
//     const role = localStorage.getItem('ms_username');
//     if (!role && to.path !== '/login') {
//         next('/login');
//     } else if (to.meta.permission) {
//         // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
//         role === 'admin'
//             ? next()
//             : next('/403');
//     } else {
//         next();
//     }
// });
export default router;

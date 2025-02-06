import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/404', name: '404', component: () => import('../view/Status/Error404.vue') },
  {
    path: '/home',
    name: 'home',
    component: () => import('../view/home/index.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../view/login/Login.vue'),
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(to, from, 'router.beforeEach', !sessionStorage.getItem('authorize'));
  if (to.path === '/login') next();
  if (!sessionStorage.getItem('authorize')) {
    next({ path: '/login' });
  } else {
    next();
  }
});

export default router;

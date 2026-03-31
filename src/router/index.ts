import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('../pages/LoginPage.vue'),
    },
    {
      path: '/users',
      component: () => import('../pages/UsersPage.vue'),
    },
    {
      path: '/users/:id',
      component: () => import('../pages/UserCardPage.vue'),
    },
    {
      path: '/users/favorites',
      component: () => import('../pages/FavoritesPage.vue'),
    },
  ],
})
router.beforeEach((to) => {
  const token = localStorage.getItem('token')
  if (!token && to.path !== '/login') {
    return '/login'
  }
  if (token && to.path === '/login') {
    return '/users'
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/home.vue')
    },
    {
      path: '/result/:country',
      name: 'detailCountry',
      component: () => import('../views/detailCountry.vue')
    }
  ]
})

export default router

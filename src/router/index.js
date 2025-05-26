import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Destination from '@/views/Destination.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/destination',
      name: 'destination',
      component: Destination,
    },
    // {
    //   path: '/destination/:id',
    //   name: 'destination-detail',
    //   component: () => import('@/views/destinationDetail.vue'),
    // },
    {
      path: '/admin',
      name: 'admin',
      component: AdminDashboardView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
<<<<<<< HEAD
    {
      // path: '/admin',
      // name: 'admin',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AdminDashboardView.vue'),
=======

    {
      path:'/login',
      name:'login',
      component: () => import('@/views/LoginView.vue')
    },
    {
      path:'/signup',
      name:'signup',
      component: () => import('@/views/SignupView.vue')
>>>>>>> main
    },
  ],
})

export default router

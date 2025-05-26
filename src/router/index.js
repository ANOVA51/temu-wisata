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
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
    {
      path: '/form-input',
      name: 'form-input',
      component: () => import('@/views/FormInputWisata.vue'),
    },
    {
      path: '/tesa',
      name: 'tesa',
      component: () => import('@/views/ChatTesa.vue'),
    },
    {
      path: '/coba2',
      name: 'coba2',
      component: () => import('@/views/Coba2.vue'),
    },
    {
      // path: '/admin',
      // name: 'admin',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AdminDashboardView.vue'),
    },
  ],
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Destination from '@/views/Destination.vue'
import AdminDashboardView from '@/views/AdminDashboardView.vue'
import about from '@/views/AboutView.vue'
import profile from '@/views/Userprofile.vue'

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
      component: about,
    },
    {
      path: '/profile',
      name: 'profile',
      component: profile,
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
      path: '/forminput',
      name: 'forminput',
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
      path: '/testimonials',
      name: 'testimonials',
      component: () => import('@/views/Testimonials.vue'),
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

// router.beforeEach((to, from, next) => {
//   const publicPages = ['home', 'login', 'signup']
//   const authRequired = !publicPages.includes(to.name)
//   const isLoggedIn =
//     !!localStorage.getItem('access') || !!sessionStorage.getItem('access')

//   if (authRequired && !isLoggedIn) {
//     return next({ name: 'login' })
//   }
//   next()
// })

export default router

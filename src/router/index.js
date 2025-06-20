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
      meta: { requiresAuth: true, requiresAdmin: true } ,
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
      // path: '/admin',
      // name: 'admin',
      // // route level code-splitting
      // // this generates a separate chunk (About.[hash].js) for this route
      // // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AdminDashboardView.vue'),
    },
  ],
})

// Fungsi helper untuk auth
const isAuthenticated = () => {
  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  return !!token
}

const isAdmin = () => {
  const userRole = localStorage.getItem('userRole') || sessionStorage.getItem('userRole')
  return userRole === 'admin'
}

// Route Guard
router.beforeEach((to, from, next) => {
  // Halaman yang boleh diakses tanpa login
  const publicPages = ['home', 'login', 'signup', 'about']

  // Cek jika route membutuhkan autentikasi
  const authRequired = !publicPages.includes(to.name)

  // Jika route membutuhkan auth tapi user belum login
  if (authRequired && !isAuthenticated()) {
    return next({
      name: 'login',
      query: { redirect: to.fullPath } // Simpan URL tujuan untuk redirect setelah login
    })
  }

  // Jika user sudah login tapi mencoba akses halaman login/signup
  if ((to.name === 'login' || to.name === 'signup') && isAuthenticated()) {
    return next({ name: isAdmin() ? 'admin' : 'home' })
  }

  // Cek akses admin
  if (to.meta.requiresAdmin && !isAdmin()) {
    return next({ name: 'home' })
  }

  next()
})

export default router

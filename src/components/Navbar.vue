<script setup lang="ts">
import '@/assets/main.css'
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import AskTesa from './AskTesa.vue'

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const route = useRoute()
const hideNavbar = computed(() => ['login', 'signup'].includes(String(route.name)))

const isWhiteBackgroundPage = computed(() => ['destination'].includes(route.name as string))

const router = useRouter()
const isLoggedIn = computed(
  () => !!localStorage.getItem('access') || !!sessionStorage.getItem('access'),
)

const handleLogout = () => {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  sessionStorage.removeItem('access')
  sessionStorage.removeItem('refresh')
  router.push({ name: 'login' })
}

const profilepicture = computed(() => {
  // Ambil data user dari sessionStorage atau localStorage
  const userData = JSON.parse(sessionStorage.getItem('userData'))
  let foto = userData.foto_profile
  // Jika tidak ada, fallback ke gambar default
  if (!foto) return require('@/assets/images/penari.jpg')
  // Jika path relatif, tambahkan domain backend
  return foto.startsWith('http') ? foto : `http://127.0.0.1:8000${foto}`
})
</script>

<template>
  <div v-if="!hideNavbar">
    <!-- Navbar -->
    <nav
      :class="[
        'py-4 absolute w-full z-50 transition-all duration-300',
        isWhiteBackgroundPage ? 'bg-white' : 'bg-transparent',
      ]"
    >
      <div class="container mx-auto flex items-center justify-between px-4 md:px-20">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img
            src="@/assets/images/logotesa.png"
            alt="Logo Tesa"
            class="w-8 h-8 rounded-full border object-cover"
          />
          <span :class="['font-bold', isWhiteBackgroundPage ? 'text-black' : 'text-white']">
            TEMU WISATA
          </span>
        </div>

        <!-- Desktop Nav -->
        <ul
          :class="[
            'hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-20 font-bold',
            isWhiteBackgroundPage ? 'text-black' : 'text-white',
          ]"
        >
          <li class="nav-item relative group py-1 px-6">
            <RouterLink
              :to="{ name: 'home' }"
              :class="[isWhiteBackgroundPage ? 'text-black' : 'text-white']"
            >
              HOME
            </RouterLink>
          </li>
          <li class="nav-item relative group py-1 px-6">
            <RouterLink
              :to="{ name: 'destination' }"
              :class="[isWhiteBackgroundPage ? 'text-black' : 'text-white']"
            >
              DESTINATION
            </RouterLink>
          </li>
          <li class="nav-item relative group py-1 px-6">
            <RouterLink
              :to="{ name: 'about' }"
              :class="[isWhiteBackgroundPage ? 'text-black' : 'text-white']"
            >
              ABOUT
            </RouterLink>
          </li>
        </ul>

        <!-- Auth Buttons (Desktop) -->
        <div class="hidden md:flex space-x-4">
          <template v-if="isLoggedIn">
            <RouterLink :to="{ name: 'profile' }">
              <img
                :src="profilepicture"
                alt="User Profile"
                class="w-12 h-12 rounded-full border border-white object-cover"
              />
            </RouterLink>
          </template>
          <template v-else>
            <RouterLink
              :to="{ name: 'login' }"
              class="px-4 py-2 rounded-lg font-semibold"
              :class="
                isWhiteBackgroundPage
                  ? 'text-black border border-black hover:bg-black hover:text-white'
                  : 'text-white border border-white hover:bg-white hover:text-black'
              "
            >
              Login
            </RouterLink>
            <RouterLink
              :to="{ name: 'signup' }"
              class="px-4 py-2 rounded-lg font-semibold"
              :class="
                isWhiteBackgroundPage
                  ? 'text-black border border-black hover:bg-black hover:text-white'
                  : 'text-white border border-white hover:bg-white hover:text-black'
              "
            >
              Signup
            </RouterLink>
          </template>
        </div>

        <!-- Hamburger (Mobile) -->
        <button @click="toggleSidebar" class="md:hidden relative w-8 h-8 z-50">
          <span
            :class="[
              'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
              isSidebarOpen
                ? 'rotate-45 top-3.5 bg-black'
                : ['top-2', isWhiteBackgroundPage ? 'bg-black' : 'bg-white'],
            ]"
          ></span>
          <span
            :class="[
              'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
              isSidebarOpen
                ? 'opacity-0 -translate-x-6'
                : ['top-4', isWhiteBackgroundPage ? 'bg-black' : 'bg-white'],
            ]"
          ></span>
          <span
            :class="[
              'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
              isSidebarOpen
                ? '-rotate-45 top-3.5 bg-black'
                : ['top-6', isWhiteBackgroundPage ? 'bg-black' : 'bg-white'],
            ]"
          ></span>
        </button>
      </div>
    </nav>

    <!-- Overlay -->
    <div
      v-if="isSidebarOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40"
      @click="toggleSidebar"
    ></div>

    <!-- Sidebar -->
    <aside
      class="fixed top-0 right-0 h-full w-64 bg-white text-black p-6 z-50 transform transition-transform duration-300 shadow-lg"
      :class="{ 'translate-x-0': isSidebarOpen, 'translate-x-full': !isSidebarOpen }"
    >
      <!-- Auth Buttons (Mobile) -->
      <div class="mt-6 flex flex-col space-y-4 items-center">
        <template v-if="isLoggedIn">
          <RouterLink :to="{ name: 'profile' }">
            <img
              :src="profilepicture"
              alt="User Profile"
              class="w-15 h-15 rounded-full border border-white object-cover"
            />
          </RouterLink>
        </template>
        <template v-else>
          <RouterLink
            :to="{ name: 'login' }"
            class="w-full text-center px-4 py-2 rounded-lg font-semibold transition bg-black text-white hover:bg-gray-800"
            @click="toggleSidebar"
          >
            Login
          </RouterLink>
          <RouterLink
            :to="{ name: 'signup' }"
            class="w-full text-center px-4 py-2 rounded-lg font-semibold transition bg-gray-200 text-black hover:bg-gray-300"
            @click="toggleSidebar"
          >
            Signup
          </RouterLink>
        </template>
      </div>

      <ul class="space-y-4 font-semibold mt-6">
        <li>
          <RouterLink
            @click="toggleSidebar"
            :to="{ name: 'home' }"
            class="w-full flex justify-center py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
          >
            HOME
          </RouterLink>
        </li>
        <li>
          <RouterLink
            @click="toggleSidebar"
            :to="{ name: 'destination' }"
            class="w-full flex justify-center py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
          >
            DESTINATION
          </RouterLink>
        </li>
        <li>
          <RouterLink
            @click="toggleSidebar"
            :to="{ name: 'about' }"
            class="w-full flex justify-center py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
          >
            ABOUT
          </RouterLink>
        </li>
      </ul>
    </aside>
  </div>
</template>

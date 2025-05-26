<script setup lang="ts">
import '@/assets/main.css'
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed } from 'vue'

const isSidebarOpen = ref(false)
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Ambil route aktif
const route = useRoute()

// Tentukan apakah halaman berlatar putih (misal: destination)
const isWhiteBackgroundPage = computed(() => {
  return route.name === 'destination' || route.name === 'about' || route.name === 'login' || route.name === 'signup'
})
</script>

<template>
  <!-- Navbar -->
  <nav
    :class="[
      'py-4 absolute w-full z-50 transition-all duration-300',
      isWhiteBackgroundPage ? 'bg-white' : 'bg-transparent'
    ]"
  >
    <div class="container mx-auto flex items-center justify-between px-4 md:px-20">
      <!-- Logo -->
      <div class="flex items-center space-x-2">
        <div class="w-8 h-8 rounded-full border" :class="isWhiteBackgroundPage ? 'bg-black' : 'bg-white'"></div>
        <li class="nav-item relative group py-1 px-6">
          <RouterLink
            :to="{ name: 'home' }"
            :class="[
              isWhiteBackgroundPage ? 'text-black hover:text-green-600' : 'text-white hover:text-green-500',
              'font-semibold group-hover:underline'
            ]"
          >
            TEMU WISATA
          </RouterLink>
        </li>
      </div>

      <!-- Desktop Nav -->
      <ul
        :class="[
          'hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-20 font-bold',
          isWhiteBackgroundPage ? 'text-black' : 'text-white'
        ]"
      >
        <li class="nav-item relative group py-1 px-6">
          <RouterLink
            :to="{ name: 'home' }"
            :class="[
              isWhiteBackgroundPage ? 'text-black hover:text-green-600' : 'text-white hover:text-green-500',
              'font-semibold group-hover:underline'
            ]"
          >
            HOME
          </RouterLink>
        </li>
        <li class="nav-item relative group py-1 px-6">
          <RouterLink
            :to="{ name: 'destination' }"
            :class="[
              isWhiteBackgroundPage ? 'text-black hover:text-green-600' : 'text-white hover:text-green-500',
              'group-hover:underline'
            ]"
          >
            DESTINATION
          </RouterLink>
        </li>
        <li class="nav-item relative group py-1 px-6">
          <RouterLink
            :to="{ name: 'about' }"
            :class="[
              isWhiteBackgroundPage ? 'text-black hover:text-green-600' : 'text-white hover:text-green-500',
              'group-hover:underline'
            ]"
          >
            ABOUT
          </RouterLink>
        </li>
      </ul>

      <!-- Auth Buttons (Desktop) -->
      <div class="hidden md:flex space-x-4">
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
              ? 'bg-black text-white hover:bg-gray-800'
              : 'bg-white text-black hover:bg-gray-200'
          "
        >
          Signup
        </RouterLink>
      </div>

      <!-- Hamburger Button (Mobile) -->
      <button @click="toggleSidebar" class="md:hidden relative w-8 h-8 z-50">
        <!-- Top Line -->
        <span
          :class="[
            'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
            isSidebarOpen ? 'rotate-45 top-3.5 bg-black' : ['top-2', isWhiteBackgroundPage ? 'bg-black' : 'bg-white']
          ]"
        ></span>

        <!-- Middle Line -->
        <span
          :class="[
            'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
            isSidebarOpen ? 'opacity-0 -translate-x-6' : ['top-4', isWhiteBackgroundPage ? 'bg-black' : 'bg-white']
          ]"
        ></span>

        <!-- Bottom Line -->
        <span
          :class="[
            'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
            isSidebarOpen ? '-rotate-45 top-3.5 bg-black' : ['top-6', isWhiteBackgroundPage ? 'bg-black' : 'bg-white']
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
    class="fixed top-0 right-0 h-full w-64 bg-white text-black p-6 z-40 transform transition-transform duration-300"
    :class="{ 'translate-x-0': isSidebarOpen, 'translate-x-full': !isSidebarOpen }"
  >
    <ul class="space-y-4 font-semibold mt-12">
      <li class="hover:bg-black hover:rounded-full hover:text-white text-center hover:underline py-1">
        <RouterLink @click="toggleSidebar" :to="{ name: 'home' }">HOME</RouterLink>
      </li>
      <li class="hover:bg-black hover:rounded-full hover:text-white text-center hover:underline py-1">
        <RouterLink @click="toggleSidebar" :to="{ name: 'destination' }">DESTINATION</RouterLink>
      </li>
      <li class="hover:bg-black hover:rounded-full hover:text-white text-center hover:underline py-1">
        <RouterLink @click="toggleSidebar" :to="{ name: 'about' }">ABOUT</RouterLink>
      </li>
    </ul>
  </aside>
</template>

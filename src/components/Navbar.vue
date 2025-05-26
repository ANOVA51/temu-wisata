<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<template>
  <!-- Navbar -->
  <nav class="flex items-center justify-between px-6 md:px-20 py-4 bg-transparent absolute w-full z-50">
    <!-- Logo -->
    <div class="flex items-center space-x-2">
      <div class="w-8 h-8 rounded-full bg-white border"></div>
      <span class="font-bold text-white">TEMU WISATA</span>
    </div>

    <!-- Desktop Nav -->
    <ul class="hidden md:flex space-x-10 font-bold text-white">
      <li class="hover:bg-white hover:rounded-full hover:text-green-500 hover:underline py-1 px-6">
        <RouterLink :to="{ name: 'home' }">HOME</RouterLink>
      </li>
      <li class="hover:bg-white hover:rounded-full hover:text-green-500 hover:underline py-1 px-6">
        <RouterLink :to="{ name: 'destination' }">DESTINATION</RouterLink>
      </li>
      <li class="hover:bg-white hover:rounded-full hover:text-green-500 hover:underline py-1 px-6">
        <RouterLink :to="{ name: 'about' }">ABOUT</RouterLink>
      </li>
    </ul>

    <!-- Hamburger / X Button (Mobile) -->
    <button @click="toggleSidebar" class="md:hidden relative w-8 h-8 z-50">
      <!-- Top Line -->
      <span
        :class="[
          'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'rotate-45 top-3.5 bg-black' : 'top-2 bg-white'
        ]"
      ></span>

      <!-- Middle Line -->
      <span
        :class="[
          'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'opacity-0 -translate-x-6' : 'top-4 bg-white'
        ]"
      ></span>

      <!-- Bottom Line -->
      <span
        :class="[
          'absolute left-0 w-8 h-0.5 transition-all duration-300 ease-in-out',
          isSidebarOpen ? '-rotate-45 top-3.5 bg-black' : 'top-6 bg-white'
        ]"
      ></span>
    </button>
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
      <li class="hover:bg-black hover:rounded-full hover:text-white text-center hover:underline py-1"><RouterLink @click="toggleSidebar" :to="{ name: 'home' }">HOME</RouterLink></li>
      <li class="hover:bg-black hover:rounded-full hover:text-white text-center hover:underline py-1"><RouterLink @click="toggleSidebar" :to="{ name: 'destination' }">DESTINATION</RouterLink></li>
      <li class="hover:bg-black hover:rounded-full hover:text-white text-center hover:underline py-1"><RouterLink @click="toggleSidebar" :to="{ name: 'about' }">ABOUT</RouterLink></li>
    </ul>
  </aside>
</template>

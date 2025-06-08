<script setup>
import { ref } from 'vue'
import penari from '@/assets/images/penari.jpg'

const menuItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Favorite Destination', key: 'Favorite' },
  { label: 'Settings', key: 'settings' },
  { label: 'Logout', key: 'logout' }
]

const currentView = ref('dashboard')

function selectMenu(key) {
  if (key === 'logout') {
    alert('Logout clicked!'); 
    // lakukan proses logout di sini (misal clear token, redirect)
    return
  }
  currentView.value = key
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-green-400 to-white shadow-lg p-6 space-y-8 hidden md:block">
      <!-- User Profile -->
      <div class="text-center">
        <img 
          :src="penari" 
          alt="User Avatar" 
          class="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring ring-indigo-300"
        />
        <h2 class="text-lg font-semibold">Edit Profile</h2>
      </div>

      <!-- Navigation Menu -->
      <nav class="space-y-2 pt-4">
        <button
          v-for="item in menuItems"
          :key="item.key"
          @click="selectMenu(item.key)"
          class="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
        >
          {{ item.label }}
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!-- <h1 class="text-2xl font-semibold mb-4 capitalize">{{ currentView }}</h1> -->

      <section v-if="currentView === 'dashboard'">
        <div class="item-center">
            <img
            :src="penari"
            alt="User Avatar"
            class="w-25 h-25 rounded-full mx-auto object-cover"
            />
            <h2 class="text-lg font-semibold text-center mt-4">Selamat Datang di Dashboard</h2>
        </div>
      </section>

      <section v-if="currentView === 'Favorite'">
        <p>Ini adalah halaman Favorite.</p>
      </section>


      <section v-if="currentView === 'settings'">
        <p>Ini adalah halaman Settings.</p>
      </section>

      <section v-if="currentView === 'logout'">
        <!-- Logout biasanya tidak render konten, tapi kita sudah handle di method -->
      </section>
    </main>
  </div>
</template>

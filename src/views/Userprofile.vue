<script setup>
import penari from '@/assets/images/penari.jpg'
import HousePoint from '@/components/icons/house-point.vue'
import Review from '@/components/icons/review.vue'
import Star from '@/components/icons/star.vue'
import Wishlist from '@/components/icons/wishlist.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  if (!localStorage.getItem('profilepicture')) {
    localStorage.setItem('profilepicture', penari)
  }
})

const menuItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Favorite Destination', key: 'Favorite' },
  { label: 'wishlist', key: 'wishlist' },
  { label: 'Settings', key: 'settings' },
  { label: 'Logout', key: 'logout' },
  { label: 'back', key: 'back' },
]

const currentView = ref('dashboard')
const router = useRouter()

function handleLogout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  sessionStorage.removeItem('access')
  sessionStorage.removeItem('refresh')
  router.push({ name: 'home' })
}
function goBack() {
  router.back({name: 'home'})
}

function selectMenu(key) {
  if (key === 'logout') {
    handleLogout()
    return
  } else if (key === 'back') {
    goBack()
    return
  }
  currentView.value = key
}



</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-gradient-to-b from-green-400 to-white shadow-lg p-6 space-y-8 hidden md:block"
    >
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
          <h2 class="text-2xl font-bold text-center mt-4">Hello, username</h2>
          <p class="text-gray-600 text-sm font-semibold mt-1 text-center">
            Ready to plan your next adventure in Bali?
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 ">
          <div class="bg-white shadow rounded-xl p-4 text-center hover:shadow-lg transform transition duration-300 hover:scale-105">
            <div class="flex items-center justify-center mb-2">
              <HousePoint class="h-10 text-blue-500"/>
            </div>
            <p class="text-lg text-gray-500 font-bold">
              <span class="font-bold text-blue-500">15</span> Destination Explored
            </p>
            <p class="text-sm text-gray-500 font-semibold">
              You've seen the world - let's keep going!
            </p>
          </div>

          <div class="bg-white shadow rounded-xl p-4 hover:shadow-lg transform transition duration-300 hover:scale-105"
          @click="selectMenu('Favorite')">
            <div class="flex justify-center mb-2">
              <Star class="text-yellow-500 h-10"/>
            </div>
            <p class="text-gray-500 text-lg font-bold">
              <span class="text-pink-500 text-lg font-bold">8</span> Favorites destination saved
            </p>
            <p class="text-sm text-gray-500 mt-1">Places that stole your heart.</p>
          </div>

          <div class="bg-white shadow rounded-xl p-4 hover:shadow-lg transform transition duration-300 hover:scale-105">
            <div class="flex justify-center mb-2">
              <Review class="h-10 text-indigo-500"/>
            </div>
            <p class="text-gray-500 text-lg font-bold"><span class="text-indigo-500">3</span> Reviews Written</p>
            <p class="text-sm text-gray-500 mt-1">Your stories guide fellow travelers.</p>
          </div>

          <div class="bg-white shadow rounded-xl p-4 hover:shadow-lg transform transition duration-300 hover:scale-105"
          @click="selectMenu('wishlist')">
            <div class="h-10">
              <Wishlist class="h-8 text-purple-500"/>
            </div>
            <p class="text-gray-500 text-lg font-bold"><span class="text-purple-500">5</span> Wishlist added</p>
            <p class="text-sm text-gray-500 mt-1">Destinations you dream to visit one day.</p>
          </div>
        </div>
      </section>

      <section v-if="currentView === 'Favorite'">
        <p>Ini adalah halaman Favorite.</p>
      </section>

      <section v-if="currentView === 'wishlist'">
        <p>Ini adalah halaman Wishlist.</p>

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

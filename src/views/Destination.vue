<script setup>
import Search from '@/assets/icon/Search.vue'
import Navbar from '@/components/Navbar.vue'
import { computed, ref } from 'vue'
const allDestinations = [
  'Ubud',
  'Kuta Selatan',
  'Dalung',
  'Tegallalang',
  'Kuta',
  'Mengwi',
  'Denpasar',
  'Payangan',
  'Sukawati',
  'Sanur',
  'Jimbaran',
  'Nusa Dua',
  'Canggu',
  'Seminyak',
  'Bangli',
  'Gianyar',
]
const showAll = ref(false)
const visibleDestinations = computed(() =>
  showAll.value ? allDestinations : allDestinations.slice(0, 9),
)
</script>

<template>
  <div>
    <Navbar />

    <!-- Hero Section -->
    <section class="relative h-screen w-full">
      <!-- Background Hero Image -->
      <img
        src="@/assets/images/herobanner1.png"
        alt="Hero Banner"
        class="absolute inset-0 w-full h-full object-cover brightness-75 z-0"
      />

      <!-- Overlay Content -->
      <div class="relative z-10 text-center flex flex-col items-center text-white px-4 pt-40">
        <h1 class="text-3xl md:text-5xl font-bold max-w-1/2">
          destination
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-white">
            Hidden Gem
          </span>
          in Bali’s tourist destinations
        </h1>
        <div class="mt-6 flex justify-center"></div>
      </div>
    </section>

    <section class="py-10">
      <!--Favorite Hidden Gem-->
      <h2 class="text-5xl md:text-3xl font-black mb-10 text-center">
        Favorite
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">
          Hidden Gem
        </span>
      </h2>
      <div class="flex justify-center mb-6">
        <div class="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            class="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
          />
          <Search
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
          />
        </div>
      </div>

      <!-- Grid Card -->

      <div
        class="grid grid-cols sm:grid-cols-2 md:grid-cols-4 gap-4 px-30"
        style="min-width: max-content"
      >
        <div
          v-for="i in 8"
          :key="i"
          class="bg-gray-300 rounded-xl w-40 sm:w-64 h-40 sm:h-72 flex-shrink-0"
        ></div>
      </div>
    </section>
  </div>
</template>

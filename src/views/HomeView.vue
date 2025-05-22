<script setup>
import Search from '@/assets/icon/Search.vue'

import FooterSection from '@/components/FooterSection.vue'
import { ref, computed } from 'vue'

import Favhiddengem from '@/components/favhiddengem.vue'
import Navbar from '@/components/Navbar.vue'

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
          Explore
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-white">
            Hidden Gem
          </span>
          in Bali’s tourist destinations
        </h1>
        <div class="mt-6 flex justify-center">
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
      </div>
    </section>

   <favhiddengem />

    <section>
      <!--Testimoni-->
      <div class="bg-[#67AE6E] pt-12 pb-12 mb-10">
        <h2 class="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Testimoni Hidden Gem
        </h2>

        <!-- Card Grid Testimoni -->
        <div class="overflow-x-auto">
          <div class="grid grid-cols-[repeat(4,auto)] gap-4 px-30" style="min-width: max-content">
            <div
              v-for="i in 4"
              :key="i"
              class="bg-gray-300 rounded-xl w-40 sm:w-64 h-40 sm:h-72 flex-shrink-0"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <!--Something TO-do-->
      <div>
        <h2 class="text-5xl md:text-3xl font-bold text-[#328E6E] px-10 pb-10">Something To-Do</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 justify-center px-8 ">
          <div v-for="i in 5" :key="i" class="h-[170px] w-[300px] bg-gray-300 rounded-2xl"></div>
        </div>

      </div>
    </section>

    <section class="px-6 py-6">
      <h3 class="font-medium text-sm mb-2">Destinasi di sekitar</h3>
      <div class="border-b border-gray-200 mb-4">
        <div class="w-16 border-b-2 border-gray-500"></div>
      </div>

      <!-- Grid destinasi -->
      <div
        class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-y-2 gap-x-4 text-sm font-medium"
      >
        <div v-for="(item, index) in visibleDestinations" :key="index">
          {{ item }}
        </div>
        <div class="text-gray-600 cursor-pointer" @click="showAll = !showAll">
          {{ showAll ? 'Show Less ▲' : 'View More ▼' }}
        </div>
      </div>
    </section>
      <FooterSection />
  </div>
</template>

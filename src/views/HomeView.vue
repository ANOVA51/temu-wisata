<script setup>
import Search from '@/components/Search.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '@/components/Navbar.vue'
import Favhiddengem from '@/components/favhiddengem.vue'
import Testimoni from '@/components/testimoni.vue'
import FooterSection from '@/components/FooterSection.vue'
import AskTesa from '@/components/AskTesa.vue'

const router = useRouter()

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

const searchResults = ref([])

const destinationsToShow = computed(() => {
  return searchResults.value.length > 0 ? searchResults.value.map(d => d.name) : visibleDestinations.value
})

import nature from '@/assets/icon/landscape.png'
import FnB from '@/assets/icon/FnB.png'
import relax from '@/assets/icon/yoga.png'
import nightlife from '@/assets/icon/nightlife.png'
import beach from '@/assets/icon/sunset.png'


const toDo = [
  {
    image : nature,
  },
  {
    image : FnB,
  },
  {
    image : relax,
  },
  {
    image : nightlife,
  },
  {
    image : beach,
  },

]

function handleSpotSelected(spot) {
  // Simpan spot_id ke query params, atau bisa juga ke state management/sessionStorage
  router.push({ name: 'destination', query: { spot_id: spot.spot_id } })
}
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
            <Search
              @update:results="searchResults = $event"
              @spot-selected="handleSpotSelected"
            />
          </div>
        </div>
      </div>
    </section>

   <favhiddengem />

   <Testimoni />

    <section>
      <!--Something TO-do-->
      <div>
        <h2 class="text-3xl md:text-5xl font-bold text-[#328E6E] mt-10 px-10 pb-10 text-center">Something To-Do</h2>
        <div class="flex justify-center flex-wrap gap-6 md:gap-30 px-8 ">
          <div v-for="(icon , index) in toDo"
          :key="index"
          class="h-[100px] w-[200px] bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300"
          >
          <div class=" pt-5 pb-5 flex justify-center">
            <img
            :src="icon.image"
            class="size-16  object-cover"
            />

          </div>

        </div>
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
        <div v-for="(item, index) in destinationsToShow" :key="index">
          {{ item }}
        </div>
        <div v-if="searchResults.length === 0" class="text-gray-600 cursor-pointer" @click="showAll = !showAll">
          {{ showAll ? 'Show Less ▲' : 'View More ▼' }}
        </div>
      </div>
    </section>
    <AskTesa/>
      <FooterSection />
  </div>
</template>

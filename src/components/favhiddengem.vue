<script setup>
import bluelagoon from '@/assets/images/hiddengem/bluelagoon.png'

import { ref, computed } from 'vue'

const showAll = ref(false)

const toggleShow = () => {
  showAll.value = !showAll.value
}


const hiddengem = [
  {
    image: bluelagoon,
    name: 'Bluelagoon waterfall',
    deskripsi: 'Air terjun tersembunyi yang indah...',
    rating: 4.5,
  },
  {
    image: bluelagoon,
    name: 'Bluelagoon waterfall',
    deskripsi: 'Air terjun tersembunyi yang indah...',
    rating: 4.5,
  },
  {
    image: bluelagoon,
    name: 'Bluelagoon waterfall',
    deskripsi: 'Air terjun tersembunyi yang indah...',
    rating: 4.5,
  },
  {
    image: bluelagoon,
    name: 'Bluelagoon waterfall',
    deskripsi: 'Air terjun tersembunyi yang indah...',
    rating: 4.5,
  },
  {
    image: bluelagoon,
    name: 'Bluelagoon waterfall',
    deskripsi: 'Air terjun tersembunyi yang indah...',
    rating: 4.5,
  },
  {
    image: bluelagoon,
    name: 'Bluelagoon waterfall',
    deskripsi: 'Air terjun tersembunyi yang indah...',
    rating: 4.5,
  },
  {
    image: bluelagoon,
    name: 'Bluelagoon waterfall',
    deskripsi: 'Air terjun tersembunyi yang indah...',
    rating: 4.5,
  },
]
const displayedItems = computed(() => {
  return showAll.value ? hiddengem : hiddengem.slice(0, 4)
})
</script>

<template>
  <section class="py-10">
    <!--Favorite Hidden Gem-->
    <h2 class="text-5xl md:text-3xl font-black mb-10 text-center">
      Favorite
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">
        Hidden Gem
      </span>
    </h2>

    <!-- Grid Card -->
    <div class="overflow-x-auto py-10">
      <div class="grid grid-cols-[repeat(4,auto)] gap-4 px-30" style="min-width: max-content">
        <div
          v-for="(item, index) in displayedItems"
          :key="index"
          class="bg-white rounded-xl w-40 sm:w-64 h-40 sm:h-72 flex-shrink-0 overflow-hidden drop-shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <div class="h-1/2 w-full">
            <img :src="item.image" :alt="item.name" class="w-full h-full object-cover" />
          </div>

          <!--info-->
          <div class="h-1/2 p-3 flex flex-col justify-between">
            <p class="font-bold text-sm">{{ item.name }}</p>
            <p class="text-xs text-gray-600 truncate">{{ item.deskripsi }}</p>

            <div class="flex items-center gap-1 mt-2">
              <span v-for="i in 5" :key="i" class="text-yellow-400 text-2xl leading-none">
                {{ i <= Math.floor(item.rating) ? '★' : i - item.rating < 1 ? '⯪' : '☆' }}
              </span>
              <span class="text-xs text-gray-500 ml-1">({{ item.rating }})</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tombol View More -->
    <div v-if="hiddengem.length > 4" class="mt-10 flex justify-center mb-10">
      <button 
      @click="toggleShow"
      class="bg-[#328E6E] text-white py-3 px-8 rounded-lg hover:bg-[#276d57] transition">
        {{ showAll ? 'View Less' : 'View More' }}
      </button>
    </div>
  </section>
</template>

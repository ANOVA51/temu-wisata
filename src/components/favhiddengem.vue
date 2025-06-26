<template>
  <section class="py-10">
    <h2 class="text-2xl font-bold text-green-700 mb-6 text-center">Favourite Hidden Gem</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 mb-10">
      <div
        v-for="spot in spots"
        :key="spot.spot_id"
        class="relative bg-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition cursor-pointer"
      >
        <div class="w-full h-48 overflow-hidden">
          <img
            :src="spot.image || 'https://placehold.co/400x300?text=No+Image'"
            :alt="spot.name"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="p-4">
          <div class="flex items-center justify-between mb-2">
            <h3 class="font-bold text-lg text-gray-800">{{ spot.name }}</h3>
            <div class="flex items-center text-yellow-500">
              <svg class="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 18.343l-6.828-6.829a4 4 0 010-5.656z"/>
              </svg>
              <span class="font-semibold">{{ spot.favorite_count || 0 }}</span>
            </div>
          </div>
          <p class="text-gray-600 text-sm mb-1">
            {{ spot.address }}, {{ spot.kota }}, {{ spot.kecamatan }}, {{ spot.desa }}
          </p>
        </div>
      </div>
    </div>
    <div v-if="!spots.length" class="text-gray-400 text-center">
      Tidak ada data hidden gem favorit.
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const spots = ref([])

const fetchHiddenGems = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/most-favorited-spots/')
    spots.value = response.data.most_favorited.map(spot => ({
      ...spot,
      image: spot.image || ''
    }))
  } catch (error) {
    console.error('Gagal mengambil data hidden gem favorit:', error)
    spots.value = []
  }
}

onMounted(fetchHiddenGems)
</script>

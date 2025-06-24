<template>
  <div>
    <div class="relative">
      <input
        v-model="query"
        @input="searchSpots"
        type="text"
        placeholder="Search"
        class="w-full rounded-full border border-gray-300 bg-white/60 backdrop-blur-md px-5 py-3 pl-12 shadow focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-700 placeholder-gray-400 transition"
      />
      <span class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
        </svg>
      </span>
    </div>
    <ul v-if="spots.length" class="bg-white/80 backdrop-blur-md border rounded-lg mt-2 shadow max-h-60 overflow-y-auto">
      <li
        v-for="spot in spots"
        :key="spot.spot_id"
        class="px-4 py-2 hover:bg-green-50 cursor-pointer border-b last:border-b-0"
        @click="selectSpot(spot)"
      >
        <strong class="text-gray-700">{{ spot.name }}</strong><br />
        <span class="text-xs text-gray-500">{{ spot.address }}, {{ spot.kota }}, {{ spot.kecamatan }}, {{ spot.desa }}</span>
      </li>
    </ul>
    <div v-else-if="query" class="text-gray-400 text-sm mt-2 px-2">Tidak ditemukan hasil.</div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const query = ref('')
const spots = ref([])

const emit = defineEmits(['update:results', 'spot-selected'])
const router = useRouter()

const searchSpots = async () => {
  if (!query.value.trim()) {
    spots.value = []
    emit('update:results', [])
    return
  }
  try {
    const response = await axios.get('http://localhost:8000/api/search/', {
      params: { q: query.value }
    })
    spots.value = response.data
    emit('update:results', spots.value)
  } catch (error) {
    console.error('Gagal mengambil data:', error)
    spots.value = []
    emit('update:results', [])
  }
}

watch(query, searchSpots)

function selectSpot(spot) {
  emit('spot-selected', spot)
}
</script>

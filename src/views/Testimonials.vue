<template>
  <div class="min-h-screen bg-gray-50 py-16 px-6">
    <div class="max-w-5xl mx-auto">
      <h1 class="text-4xl font-bold text-center text-green-700 mb-10">Testimoni Wisatawan</h1>

      <div v-if="testimonies.length === 0" class="text-center text-gray-500">
        Belum ada testimoni yang tersedia.
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="(item, index) in testimonies"
          :key="index"
          class="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition group"
        >
          <div class="flex items-center space-x-4 mb-4">
            <div class="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
              {{ item.name.charAt(0).toUpperCase() }}
            </div>
            <div>
              <p class="font-semibold text-gray-700">{{ item.name }}</p>
              <p class="text-xs text-gray-400">Wisatawan</p>
            </div>
          </div>

          <div class="text-gray-600 whitespace-pre-line mb-3">
            {{ item.message }}
          </div>

          <div v-if="item.image" class="rounded-lg overflow-hidden mt-2">
            <img
              :src="item.image"
              alt="Foto Testimoni"
              class="w-full h-48 object-cover rounded-md border border-gray-200 group-hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </div>

      <div class="text-center mt-12">
        <RouterLink to="/destination" class="text-green-600 hover:text-green-800 font-semibold underline">
          ← Kembali ke Destinasi
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const testimonies = ref([])
const route = useRoute()

onMounted(async () => {
  // Ambil spot_id dari sessionStorage, fallback ke query jika ada
  const spotId = sessionStorage.getItem('spot_id') || route.query.spot_id
  if (spotId) {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/testimoni/spot/${spotId}/`)
      testimonies.value = (res.data.testimonies || []).map(item => ({
        name: item.username || 'Wisatawan',
        profile: item.foto_profile
          ? (item.foto_profile.startsWith('http')
              ? item.foto_profile
              : `http://127.0.0.1:8000${item.foto_profile}`)
          : null,
        message: item.testi_text,
        image: item.images && item.images.length
          ? (item.images[0].file_name.startsWith('http')
              ? item.images[0].file_name
              : `http://127.0.0.1:8000${item.images[0].file_name}`)
          : null
      }))
    } catch (e) {
      testimonies.value = []
    }
  } else {
    testimonies.value = []
  }
})
</script>

<style scoped>
body {
  background-color: #f9fafb;
}
</style>

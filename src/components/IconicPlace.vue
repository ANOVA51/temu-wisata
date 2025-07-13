<script setup>
import { ref,onMounted,computed } from 'vue'
import axios from 'axios';

const spots = ref([])
const selectedLocation = ref('')
const showAll = ref(true)
const activeModal = ref(null)
const modalImages = ref([])
const modalCurrentIndex = ref(0)

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/touristspots/iconic/')
    spots.value = res.data.data
  } catch (e) {
    alert('Gagal mengambil data destinasi')
  }
})
const filteredSpots = computed(() => {
  let result = spots.value.filter(d => d.is_verified === true && d.is_iconic === true) // hanya yang terverifikasi
  if (selectedLocation.value) {
    result = result.filter((d) =>
      d.name.toLowerCase().includes(selectedLocation.value.toLowerCase()),
    )
  }
  return showAll.value ? result : result.slice(0, 8)
})
function getPrimaryImage(spot) {
  const img = spot.images.find((img) => img.is_primary)
  return img ? `http://127.0.0.1:8000${img.file_name}` : ''
}

// // Example images, you can replace these with your own assets
// import rome from '@/assets/images/destinasi/savana.png'
// import paris from '@/assets/images/destinasi/savana.png'
// import vegas from '@/assets/images/destinasi/savana.png'
// import reykjavik from '@/assets/images/destinasi/savana.png'

// const places = [
//   { name: 'Rome', country: 'Italy', image: rome },
//   { name: 'Paris', country: 'France', image: paris },
//   { name: 'Las Vegas', country: 'NV', image: vegas },
//   { name: 'Reykjavik', country: 'Iceland', image: reykjavik },
//   { name: 'Reykjavik', country: 'Iceland', image: reykjavik },
//   { name: 'Reykjavik', country: 'Iceland', image: reykjavik },
//   { name: 'Reykjavik', country: 'Iceland', image: reykjavik },
// ]

function openModal(spot) {
  activeModal.value = spot
  modalImages.value = spot.images.map((img) => `http://127.0.0.1:8000${img.file_name}`)
  modalCurrentIndex.value = 0
}

function nextImage() {
  if (modalImages.value.length === 0) return
  modalCurrentIndex.value = (modalCurrentIndex.value + 1) % modalImages.value.length
}
</script>

<template>
  <section class="bg-white">
    <div class="py-12 px-4 md:px-10">
      <h2 class="text-3xl md:text-5xl font-bold text-[#328E6E] mt-10 px-10 pb-10 text-center">
        Iconic Places You Need to See
      </h2>

      <!-- Horizontal Scroll -->
      <div class="overflow-x-auto">
        <div class="flex gap-6 px-2 sm:px-4">
          <div
            v-for="(spot, index) in filteredSpots"
            :key="spot.spot_id"
            class="relative h-96 w-64 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 transition-transform duration-300 hover:scale-105 group"
            @click="openModal(spot)"
          >
            <!-- Image with overlay -->
            <img
              :src="getPrimaryImage(spot)"
              :alt="spot.name"
              class="object-cover w-full h-full"
            />

            <!-- Gradient overlay -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            <!-- Title -->
            <div
              class="absolute bottom-0 left-0 w-full p-4 backdrop-blur-md bg-white/30 text-white font-semibold text-lg"
            >
              {{ spot.name }}, {{ spot.country }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <div
      v-if="activeModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="activeModal = null"
      data-aos="zoom-in"
    >
      <div
        class="bg-white rounded-xl p-8 w-full max-w-5xl shadow-lg flex flex-col md:flex-row gap-10 items-center relative overflow-y-auto"
      >
        <!-- Gambar carousel style klik untuk next, tampilkan semua gambar -->
        <div class="flex flex-col items-center w-full md:w-1/2">
          <div
            class="relative w-full max-w-[360px] mx-auto h-[250px] cursor-pointer"
            @click="nextImage"
          >
            <div class="relative w-full h-full">
              <div
                v-for="(img, index) in modalImages"
                :key="img"
                class="absolute top-0 transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-lg"
                :class="[
                  index === modalCurrentIndex
                    ? 'z-30 scale-100 left-0'
                    : index === (modalCurrentIndex + 1) % modalImages.length
                      ? 'z-20 scale-95 left-[25%]'
                      : 'z-10 scale-90 left-[25%]',
                ]"
                style="width: 100%; height: 100%"
              >
                <img
                  :src="img"
                  class="w-full h-full object-cover rounded-xl"
                  :alt="`Image ${index + 1}`"
                />
              </div>
            </div>
          </div>
          <div class="text-xs text-gray-500 mt-2">
            Klik gambar untuk melihat selanjutnya ({{ modalCurrentIndex + 1 }}/{{
              modalImages.length
            }})
          </div>
        </div>
        <!-- Right: Details -->
        <div class="flex-1 flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div class="text-2xl font-bold text-gray-700 mb-2">{{ activeModal.name }}</div>
            <div class="text-base text-gray-800 mb-4 whitespace-pre-line break-words ">
              {{ activeModal.description }}
            </div>
            <div class="mb-2">
              <span class="font-semibold">Kategori:</span>
              <span>{{ activeModal.category }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Fasilitas:</span>
              <span>{{ activeModal.fasilitas }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Harga:</span>
              <span>
                Rp{{ Number(activeModal.price_min).toLocaleString() }} - Rp{{
                  Number(activeModal.price_max).toLocaleString()
                }}
              </span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Alamat:</span>
              <span>
                {{ activeModal.address }}, {{ activeModal.desa }}, {{ activeModal.kecamatan }},
                {{ activeModal.kota }}
              </span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Google Maps:</span>
              <a
                :href="activeModal.google_maps_url"
                target="_blank"
                class="text-green-600 underline break-all"
                >{{ activeModal.google_maps_url }}</a
              >
            </div>
          </div>


          <button
            @click="activeModal = null"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
</template>


<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>


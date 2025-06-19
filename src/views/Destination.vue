<script setup>
import { ref, onMounted, computed } from 'vue'
import axios from 'axios'
import Search from '@/assets/icon/Search.vue'
import FooterSection from '@/components/FooterSection.vue'
import Navbar from '@/components/Navbar.vue'
import loveoutline from '@/components/icons/loveoutline.vue'
import filledLove from '@/components/icons/filledLove.vue'
import FilledLove from '@/components/icons/filledLove.vue'
import Loveoutline from '@/components/icons/loveoutline.vue'
import AskTesa from '@/components/AskTesa.vue'
import AOS from 'aos'
import 'aos/dist/aos.css'

const spots = ref([])
const loading = ref(true)
const showAll = ref(false)
const selectedLocation = ref('')
const favorites = ref([])
const activeModal = ref(null)
const modalImages = ref([])
const modalCurrentIndex = ref(0)

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/touristspots/all/')
    spots.value = res.data.data
  } catch (e) {
    alert('Gagal mengambil data destinasi')
  }
  setTimeout(() => (loading.value = false), 1000)
  AOS.init()
})

function getPrimaryImage(spot) {
  const img = spot.images.find(img => img.is_primary)
  return img ? `http://127.0.0.1:8000${img.file_name}` : ''
}

const filteredSpots = computed(() => {
  let result = spots.value
  if (selectedLocation.value) {
    result = result.filter((d) =>
      d.name.toLowerCase().includes(selectedLocation.value.toLowerCase())
    )
  }
  return showAll.value ? result : result.slice(0, 8)
})

const toggleFavorite = (index) => {
  if (favorites.value.includes(index)) {
    favorites.value = favorites.value.filter((i) => i !== index)
  } else {
    favorites.value.push(index)
  }
}

const isFavorite = (index) => favorites.value.includes(index)

// Modal: tampilkan semua gambar (tanpa memperhitungkan is_primary)
function openModal(spot) {
  activeModal.value = spot
  modalImages.value = spot.images.map(img => `http://127.0.0.1:8000${img.file_name}`)
  modalCurrentIndex.value = 0
}
function nextImage() {
  if (!modalImages.value.length) return
  modalCurrentIndex.value = (modalCurrentIndex.value + 1) % modalImages.value.length
}
</script>

<template>
  <div>
    <Navbar />
    <div class="relative z-10 text-center flex flex-col items-center text-black px-4 pt-40">
      <h1 class="text-3xl md:text-5xl font-bold max-w-1/2">
        destination
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">
          Hidden Gem
        </span>
        in Bali's tourist destinations
      </h1>
    </div>
    <!-- Hero Section -->
    <section class="py-10 flex justify-center">
      <img
        src="@/assets/images/herobanner1.png"
        alt="Hero Banner"
        class="rounded-3xl w-300 h-150  shadow-LG"
      />
    </section>

    <section class="py-10">
      <h2 class="text-5xl md:text-3xl font-black mb-10 text-center">
        Discover Hidden Gem
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">
          Destination in Bali
        </span>
      </h2>

      <!-- Filter Dropdown -->
      <div class="flex justify-center mb-6">
        <select v-model="selectedLocation" class="border rounded px-4 py-2 shadow">
          <option value="">All Locations</option>
          <option v-for="spot in spots" :key="spot.spot_id" :value="spot.kota">
            {{ spot.kota }}
          </option>
        </select>
      </div>

      <!-- Search -->
      <div class="flex justify-center mb-6">
        <div class="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search..."
            class="w-full py-3 pl-5 pr-12 rounded-full border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-lime-400"
            v-model="selectedLocation"
          />
          <Search
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
          />
        </div>
      </div>

      <!-- Grid Card -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-10 overflow-x-hidden"
      
      >
        <template v-if="loading">
          <div v-for="i in 8" :key="i" class="animate-pulse bg-gray-200 rounded-xl h-72"></div>
        </template>
        <template v-else>
          <div
            v-for="(spot, index) in filteredSpots"
            :key="spot.spot_id"
            class="group relative bg-white rounded-xl overflow-hidden h-96 flex-shrink-0 shadow-md transform transition duration-300 hover:scale-105 animate-fade-in"
            @click="openModal(spot)"
          >
            <button
              @click.stop="toggleFavorite(index)"
              class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition z-20"
            >
              <component :is="isFavorite(index) ? filledLove : loveoutline" class="w-7 h-7"/>
            </button>
            <div class="w-full h-full overflow-hidden">
              <img
                :src="getPrimaryImage(spot)"
                :alt="spot.name"
                class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div
              class="absolute z-10 inset-x-0 bottom-0 h-full bg-gradient-to-t from-black/80 to-transparent text-white px-4 py-6 flex flex-col justify-end"
            >
              <p class="font-bold text-xl mb-1">{{ spot.name }}</p>
              <p class="text-sm leading-snug">
                {{ spot.description.slice(0, 60) }}{{ spot.description.length > 60 ? '...' : '' }}
              </p>
            </div>
          </div>
        </template>
      </div>

      <div class="text-center mt-6">
        <button @click="showAll = !showAll" class="text-green-600 underline font-semibold">
          {{ showAll ? 'Show Less' : 'Show More' }}
        </button>
      </div>
    </section>

    <!--add button-->
    <div class="fixed bottom-40 right-2 z-20 flex flex-col items-center">
      <!-- Balon chat -->
      <div
        class="relative mb-2 px-2 py-2 bg-white text-gray-700 text-sm font-medium rounded-full shadow-md"
      >
        Add a Travel Spot
        <!-- Segitiga bawah -->
        <div
          class="absolute bottom-[-6px] left-1/2 transform -translate-x-1/2 w-3 h-3 bg-white rotate-45 shadow-md"
        ></div>
      </div>

      <!-- Tombol plus -->
      <RouterLink to="/forminput">
        <button
          class="w-14 h-14 bg-white text-green-600 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center border border-gray-200"
          aria-label="Add Destination"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </RouterLink>
    </div>

    <!-- Modal (Detail Spot Wisata) -->
    <div
      v-if="activeModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="activeModal = null"
      data-aos="zoom-in"
    >
      <div
        class="bg-white rounded-xl p-8 w-full max-w-5xl shadow-lg flex flex-col md:flex-row gap-10 items-center relative"
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
            Klik gambar untuk melihat selanjutnya ({{ modalCurrentIndex + 1 }}/{{ modalImages.length }})
          </div>
        </div>
        <!-- Right: Details -->
        <div class="flex-1 flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div class="text-2xl font-bold text-gray-700 mb-2">{{ activeModal.name }}</div>
            <div class="text-base text-gray-800 mb-4">{{ activeModal.description }}</div>
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
                Rp{{ Number(activeModal.price_min).toLocaleString() }} - Rp{{ Number(activeModal.price_max).toLocaleString() }}
              </span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Alamat:</span>
              <span>
                {{ activeModal.address }},
                {{ activeModal.desa }},
                {{ activeModal.kecamatan }},
                {{ activeModal.kota }}
              </span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Google Maps:</span>
              <a
                :href="activeModal.google_maps_url"
                target="_blank"
                class="text-green-600 underline break-all"
              >{{ activeModal.google_maps_url }}</a>
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

    <!-- Fakta Menarik Section -->
    <section class="bg-gray-50 py-12 mt-20 px-6">
      <h3 class="text-3xl font-bold text-center mb-6">Why Choose These Hidden Gems?</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
        <div class="p-4 bg-white rounded-xl shadow">
          <h4 class="text-xl font-semibold mb-2">Cultural Richness</h4>
          <p>Each location offers deep cultural experiences and untouched traditions.</p>
        </div>
        <div class="p-4 bg-white rounded-xl shadow">
          <h4 class="text-xl font-semibold mb-2">Peaceful Vibes</h4>
          <p>Far from the crowd, ideal for those who seek nature and peace.</p>
        </div>
        <div class="p-4 bg-white rounded-xl shadow">
          <h4 class="text-xl font-semibold mb-2">Instagrammable Views</h4>
          <p>Perfect for stunning photography and lifetime memories.</p>
        </div>
      </div>
    </section>
    <AskTesa/>
    <FooterSection />
  </div>
</template>

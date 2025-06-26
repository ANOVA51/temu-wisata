<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'
import Search from '@/components/Search.vue'
import FooterSection from '@/components/FooterSection.vue'
import Navbar from '@/components/Navbar.vue'
import loveoutline from '@/components/icons/loveoutline.vue'
import filledLove from '@/components/icons/filledLove.vue'
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
const router = useRouter()
const route = useRoute()

const user = ref(null)
const testimoniForm = ref({ message: '' })
const testimoniImage = ref(null)
const favoriteSpotIds = ref([])
const searchResults = ref([])

// Static list kota di Bali
const baliCities = [
  'Denpasar', 'Badung', 'Bangli', 'Buleleng', 'Gianyar', 'Jembrana',
  'Karangasem', 'Klungkung', 'Tabanan'
]

onMounted(async () => {
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/touristspots/all/')
    spots.value = res.data.data
  } catch (e) {
    alert('Gagal mengambil data destinasi')
  }
  const userData = JSON.parse(
    localStorage.getItem('userData') || sessionStorage.getItem('userData'),
  )
  if (userData) {
    user.value = userData
    try {
      const token = localStorage.getItem('access') || sessionStorage.getItem('access')
      const res = await axios.get('http://localhost:8000/api/favorites/', {
        headers: { Authorization: `Bearer ${token}` }
      })
      favoriteSpotIds.value = res.data.favorites.map(fav => fav.spot_id)
    } catch (e) {
      favoriteSpotIds.value = []
    }
  }
  setTimeout(() => (loading.value = false), 1000)
  AOS.init()

  // Scroll ke grid jika ada spot_id di query
  if (route.query.spot_id) {
    setTimeout(() => {
      const grid = document.getElementById('destination-grid')
      if (grid) {
        grid.scrollIntoView({ behavior: 'smooth' })
      }
    }, 300)
  }
})

function onImageChange(e) {
  const file = e.target.files[0]
  if (file && file.type.startsWith('image/')) {
    testimoniImage.value = file
  } else {
    testimoniImage.value = null
    alert('File harus berupa gambar!')
  }
}

async function submitTestimoni() {
  if (!user.value) {
    alert('Silahkan login terlebih dahulu untuk memberi testimoni.')
    router.push('/login')
    return
  }
  if (!testimoniForm.value.message) {
    alert('pesan testimoni tidak boleh kosong.')
    return
  }
  if (!activeModal.value) {
    alert('Tidak ada destinasi yang dipilih.')
    return
  }

  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  const formData = new FormData()
  formData.append('testi_text', testimoniForm.value.message)
  if (testimoniImage.value) {
    formData.append('images', testimoniImage.value)
  }

  try {
    await axios.post(
      `http://127.0.0.1:8000/api/testimoni/${activeModal.value.spot_id}/add/`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    alert('Testimoni berhasil dikirim!')
    testimoniForm.value.message = ''
    testimoniImage.value = null
    router.push({ name: 'testimonials', query: { spot_id: activeModal.value.spot_id } })
    return
  } catch (e) {
    alert('Gagal mengirim testimoni')
  }
}

function getPrimaryImage(spot) {
  const img = spot.images.find((img) => img.is_primary)
  return img ? `http://127.0.0.1:8000${img.file_name}` : ''
}

const filteredSpots = computed(() => {
  // Jika ada hasil search, tetap filter berdasarkan kota jika dipilih
  let base = searchResults.value.length > 0 ? searchResults.value : spots.value.filter(d => d.is_verified === true)
  if (route.query.spot_id) {
    base = base.filter(s => String(s.spot_id) === String(route.query.spot_id))
  }
  if (selectedLocation.value) {
    base = base.filter(d => d.kota && d.kota.toLowerCase() === selectedLocation.value.toLowerCase())
  }
  return showAll.value ? base : base.slice(0, 8)
})

async function toggleFavorite(spot) {
  if (!user.value) {
    alert('Silakan login untuk menambah destinasi favorit.')
    router.push('/login')
    return
  }
  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  if (isFavorite(spot)) {
    try {
      await axios.delete(`http://localhost:8000/api/favorites/remove/${spot.spot_id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      favoriteSpotIds.value = favoriteSpotIds.value.filter((id) => id !== spot.spot_id)
    } catch (e) {
      alert('Gagal menghapus dari favorit')
    }
  } else {
    try {
      await axios.post(
        `http://localhost:8000/api/favorites/add/${spot.spot_id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      )
      favoriteSpotIds.value.push(spot.spot_id)
    } catch (e) {
      alert('Gagal menambah ke favorit')
    }
  }
}

function isFavorite(spot) {
  return favoriteSpotIds.value.includes(spot.spot_id)
}

function openModal(spot) {
  activeModal.value = spot
  modalImages.value = spot.images.map((img) => `http://127.0.0.1:8000${img.file_name}`)
  modalCurrentIndex.value = 0
}
function nextImage() {
  if (!modalImages.value.length) return
  modalCurrentIndex.value = (modalCurrentIndex.value + 1) % modalImages.value.length
}
function goToTestimonials() {
  if (!activeModal.value) return
  sessionStorage.setItem('spot_id', activeModal.value.spot_id)
  router.push({ name: 'testimonials' })
}

function handleSearchResults(results) {
  if (route.query.spot_id) {
    router.replace({
      name: route.name,
      query: { ...route.query, spot_id: undefined }
    })
  }
  searchResults.value = results
}

watch(selectedLocation, (val) => {
  searchResults.value = []
  // Update query di URL agar sinkron
  if (val) {
    router.replace({ name: route.name, query: { ...route.query, location: val } })
  } else {
    // Hapus location dari query jika pilih All Locations
    const q = { ...route.query }
    delete q.location
    router.replace({ name: route.name, query: q })
  }
})

watch(
  () => route.query.location,
  (val) => {
    selectedLocation.value = val || ''
  },
  { immediate: true }
)
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
        class="rounded-3xl w-300 h-150 shadow-LG"
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
          <option v-for="city in baliCities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
      </div>

      <!-- Search -->
      <div class="flex justify-center mb-6">
        <div class="relative w-full max-w-md">
          <Search @update:results="handleSearchResults" />
        </div>
      </div>

      <!-- Grid Card -->
      <div
        id="destination-grid"
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
              @click.stop="toggleFavorite(spot)"
              class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition z-20"
            >
              <component :is="isFavorite(spot) ? filledLove : loveoutline" class="w-7 h-7" />
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

    <!-- Model (Detail Spot Wisata) -->
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
            Klik gambar untuk melihat selanjutnya ({{ modalCurrentIndex + 1 }}/{{
              modalImages.length
            }})
          </div>
        </div>
        <!-- Right: Details -->
        <div class="flex-1 flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div class="text-2xl font-bold text-gray-700 mb-2">{{ activeModal.name }}</div>
            <div class="text-base text-gray-800 mb-4 whitespace-pre-line break-words">
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

          <!-- FORM TESTIMONI -->
          <div class="mt-6">
            <h3 class="text-lg font-semibold text-gray-700 mb-2">Beri Testimoni</h3>
            <form @submit.prevent="submitTestimoni" class="space-y-3">
              <textarea
                v-model="testimoniForm.message"
                placeholder="Tulis pengalaman Anda..."
                rows="3"
                class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              ></textarea>

              <input
                type="file"
                accept="image/*"
                @change="onImageChange"
                class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />

              <button
                type="submit"
                class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
              >
                Kirim Testimoni
              </button>

              <button
                type="button"
            @click="goToTestimonials"
                class="block text-sm text-green-600 underline hover:text-green-800 mt-1"
              >
                Lihat semua testimoni →
              </button>
            </form>
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

    <AskTesa />
    <FooterSection />
  </div>
</template>

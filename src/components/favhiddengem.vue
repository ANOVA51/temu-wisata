<template>
  <section class="py-10">
    <h2 class="text-3xl md:text-4xl font-bold text-green-700 mb-6 text-center">Favourite Hidden Gem</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-10 mb-10">
      <div
        v-for="spot in spots"
        :key="spot.spot_id"
        class="relative bg-white rounded-xl overflow-hidden shadow-md hover:scale-105 transition cursor-pointer"
        @click="openModal(spot)"
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

    <!-- Modal -->
    <div
      v-if="activeSpot"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div
        class="bg-white rounded-xl p-8 w-full max-w-5xl shadow-lg flex flex-col md:flex-row gap-10 items-center relative"
      >
        <!-- Carousel Gambar -->
        <div class="flex flex-col items-center w-full md:w-1/2">
          <div
            class="relative w-full max-w-[340px] mx-auto h-[250px] cursor-pointer"
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
        <!-- Detail & Testimoni -->
        <div class="flex-1 flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div class="text-2xl font-bold text-gray-700 mb-2">{{ activeSpot.name }}</div>
            <div class="text-base text-gray-800 mb-4 whitespace-pre-line break-words">
              {{ activeSpot.description }}
            </div>
            <div class="mb-2">
              <span class="font-semibold">Kategori:</span>
              <span>{{ activeSpot.category }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Fasilitas:</span>
              <span>{{ activeSpot.fasilitas }}</span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Harga:</span>
              <span>
                Rp{{ Number(activeSpot.price_min).toLocaleString() }} - Rp{{ Number(activeSpot.price_max).toLocaleString() }}
              </span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Alamat:</span>
              <span>
                {{ activeSpot.address }}, {{ activeSpot.desa }}, {{ activeSpot.kecamatan }}, {{ activeSpot.kota }}
              </span>
            </div>
            <div class="mb-2">
              <span class="font-semibold">Google Maps:</span>
              <a
                :href="activeSpot.google_maps_url"
                target="_blank"
                class="text-green-600 underline break-all"
              >{{ activeSpot.google_maps_url }}</a>
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
            @click="closeModal"
            class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const spots = ref([])
const activeSpot = ref(null)
const modalImages = ref([])
const modalCurrentIndex = ref(0)
const testimoniForm = ref({ message: '' })
const testimoniImage = ref(null)

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

function openModal(spot) {
  activeSpot.value = spot
  // Ambil semua gambar spot (array of url)
  modalImages.value = (spot.images || [])
    .map(img => img.file_name.startsWith('http') ? img.file_name : `${img.file_name}`)
  if (modalImages.value.length === 0 && spot.image) {
    modalImages.value = [spot.image]
  }
  modalCurrentIndex.value = 0
}
function closeModal() {
  activeSpot.value = null
  modalImages.value = []
  modalCurrentIndex.value = 0
  testimoniForm.value.message = ''
  testimoniImage.value = null
}
function nextImage() {
  if (!modalImages.value.length) return
  modalCurrentIndex.value = (modalCurrentIndex.value + 1) % modalImages.value.length
}

// Testimoni
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
  if (!activeSpot.value) {
    alert('Tidak ada destinasi yang dipilih.')
    return
  }
  if (!testimoniForm.value.message) {
    alert('Pesan testimoni tidak boleh kosong.')
    return
  }
  // Cek login user jika perlu, tambahkan validasi sesuai kebutuhan Anda

  const formData = new FormData()
  formData.append('testi_text', testimoniForm.value.message)
  if (testimoniImage.value) {
    formData.append('images', testimoniImage.value)
  }

  try {
    await axios.post(
      `http://127.0.0.1:8000/api/testimoni/${activeSpot.value.spot_id}/add/`,
      formData
    )
    alert('Testimoni berhasil dikirim!')
    testimoniForm.value.message = ''
    testimoniImage.value = null
    // Optionally, refresh testimonials or close modal
  } catch (e) {
    alert('Gagal mengirim testimoni')
  }
}

function goToTestimonials() {
  if (!activeSpot.value) return
  // Ganti dengan routing ke halaman testimoni jika ada
  window.open(`/testimonials?spot_id=${activeSpot.value.spot_id}`, '_blank')
}

onMounted(fetchHiddenGems)
</script>

<style scoped>
/* Tambahkan style khusus jika diperlukan */
</style>

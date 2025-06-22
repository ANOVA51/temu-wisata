<template>
  <div
    class="min-h-screen relative "
    :style="{
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }"
  >
    <!-- Overlay semi-transparent -->
    <div class="absolute inset-0  bg-opacity-50 backdrop-blur-sm backgroundImage"></div>

    <div class="relative z-10 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-white mb-8">Update Destination</h1>
        <!-- Button Back -->
        <RouterLink to="/admin">
          <button
            class="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
          >
            ← Back
          </button>
        </RouterLink>
        <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl p-6 space-y-6">
          <!-- Name Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Name Of Destination"
            />
          </div>

          <!-- Category Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              v-model="form.category"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
          </div>

          <!-- Description Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Description"
            ></textarea>
          </div>

          <!-- Facilities Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
            <input
              v-model="form.fasilitas"
              type="text"
              class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Contoh: Toilet, Parkir, Wifi"
            />
          </div>

          <!-- Price Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Entrance Ticket</label>
            <div class="flex gap-4">
              <input
                v-model="form.minPrice"
                type="number"
                placeholder="Rp 10.000"
                class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                v-model="form.maxPrice"
                type="number"
                placeholder="Rp 250.000"
                class="flex-1 p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Photo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Photo</label>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              @click="$refs.fileInput.click()"
              @dragover.prevent
              @drop.prevent="handleDrop"
            >
              <div class="text-gray-500">
                <p>Click to add photos or drag & drop</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  @change="handleFileUpload"
                  class="hidden"
                  ref="fileInput"
                />
              </div>
              <div class="flex flex-wrap gap-4 justify-center mt-4">
                <div
                  v-for="(img, idx) in imagePreviews"
                  :key="idx"
                  class="relative w-24 h-24 rounded overflow-hidden border border-gray-200 bg-white flex items-center justify-center"
                >
                  <img :src="img" alt="preview" class="object-cover w-full h-full" />
                  <!-- Tombol silang -->
                  <button
                    type="button"
                    @click.stop="removeImage(idx)"
                    class="absolute top-1 right-1 bg-white bg-opacity-80 rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
                    style="z-index:2"
                    aria-label="Hapus gambar"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Map Location -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
              <input
                v-model="form.street"
                type="text"
                placeholder="e.g. Jln Wistu Marga"
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Village</label>
                <input
                  v-model="form.desa"
                  type="text"
                  placeholder="e.g. Ubud"
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sub-district</label>
                <input
                  v-model="form.subDistrict"
                  type="text"
                  placeholder="e.g. Ubud"
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Regency</label>
                <input
                  v-model="form.regency"
                  type="text"
                  placeholder="e.g. Gianyar"
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Maps Link</label>
              <input
                v-model="form.mapsLink"
                type="url"
                placeholder="https://maps.app.goo.gl/Cyj8K3kxVFT2iq9DA"
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-4 pt-6">
            <button
              @click="submitForm"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Update
            </button>

            <RouterLink to="/destination">
            <button
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            </RouterLink>
          </div>
        </div>

        <footer class="mt-8 text-center text-gray-300 text-sm">
          Copyright © 2025 ALL rights reserved by DEVOUS
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import router from '@/router'

const backgroundImage = ref(new URL('../assets/images/forminput.jpg', import.meta.url).href)

const spotId = sessionStorage.getItem('update_spot_id')

const form = ref({
  name: '',
  category: '',
  description: '',
  fasilitas: '',
  minPrice: '',
  maxPrice: '',
  street: '',
  subDistrict: '',
  regency: '',
  desa: '',
  mapsLink: '',
  photos: []
})

const imagePreviews = ref([])
const categories = ref(['Nature', 'Adventure', 'Cultural', 'Beach', 'Mountain'])

onMounted(async () => {
  if (!spotId) {
    alert('ID wisata tidak ditemukan!')
    return
  }
  try {
    const res = await axios.get(`http://localhost:8000/api/touristspots/${spotId}/`)
    const data = res.data.data
    form.value.name = data.name
    form.value.category = data.category
    form.value.description = data.description
    form.value.fasilitas = data.fasilitas
    form.value.minPrice = data.price_min
    form.value.maxPrice = data.price_max
    form.value.street = data.address
    form.value.subDistrict = data.kecamatan
    form.value.regency = data.kota
    form.value.desa = data.desa
    form.value.mapsLink = data.google_maps_url
    imagePreviews.value = (data.images || []).map(img => `http://localhost:8000${img.file_name}`)
    form.value.photos = []
  } catch (e) {
    alert('Gagal mengambil data wisata')
  }
})

// Fungsi update
async function submitForm() {
  if (!spotId) {
    alert('ID wisata tidak ditemukan!')
    return
  }
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('category', form.value.category)
  formData.append('description', form.value.description)
  formData.append('fasilitas', form.value.fasilitas)
  formData.append('price_min', form.value.minPrice)
  formData.append('price_max', form.value.maxPrice)
  formData.append('address', form.value.street)
  formData.append('kecamatan', form.value.subDistrict)
  formData.append('kota', form.value.regency)
  formData.append('desa', form.value.desa)
  formData.append('google_maps_url', form.value.mapsLink)
  // Tambahkan foto baru jika ada
  for (const file of form.value.photos) {
    formData.append('images', file)
  }
  try {
    await axios.patch(
      `http://localhost:8000/api/touristspots/${spotId}/update/`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`, // jika perlu
        }
      }
    )
    alert('Data wisata berhasil diupdate!')
    router.push('/admin')
  } catch (err) {
    alert('Gagal update data wisata!')
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .bg-attachment-fixed {
    background-attachment: fixed;
  }
}
</style>

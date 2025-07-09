<template>
  <div
    class="min-h-screen relative"
    :style="{
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }"
  >
    <!-- Overlay semi-transparent -->
    <div class="absolute inset-0 bg-opacity-50 backdrop-blur-sm backgroundImage"></div>

    <div class="relative z-10 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-white mb-8">Create Destination</h1>

        <!-- Button Back -->
        <RouterLink to="/destination">
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
              :class="[
                'w-full p-2 border rounded-md focus:ring-2',
                errors.name
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500',
              ]"
              placeholder="Name Of Destination"
            />
            <p v-if="errors.name" class="text-red-500 text-xs mt-1">{{ errors.name }}</p>
          </div>

          <!-- Category Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              v-model="form.category"
              :class="[
                'w-full p-2 border rounded-md focus:ring-2',
                errors.category
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500',
              ]"
            >
              <option value="" disabled>Pilih kategori</option>
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </select>
            <p v-if="errors.category" class="text-red-500 text-xs mt-1">{{ errors.category }}</p>
          </div>

          <!-- Description Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              v-model="form.description"
              rows="3"
              :class="[
                'w-full p-2 border rounded-md focus:ring-2',
                errors.description
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500',
              ]"
              placeholder="Description"
            ></textarea>
            <p v-if="errors.description" class="text-red-500 text-xs mt-1">
              {{ errors.description }}
            </p>
          </div>

          <!-- Facilities Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Facilities</label>
            <input
              v-model="form.fasilitas"
              type="text"
              :class="[
                'w-full p-2 border rounded-md focus:ring-2',
                errors.fasilitas
                  ? 'border-red-500 focus:ring-red-500'
                  : 'focus:ring-blue-500 focus:border-blue-500',
              ]"
              placeholder="Contoh: Toilet, Parkir, Wifi"
            />
            <p v-if="errors.fasilitas" class="text-red-500 text-xs mt-1">{{ errors.fasilitas }}</p>
          </div>

          <!-- Price Section -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Entrance Ticket</label>
            <div class="flex gap-4">
              <div class="flex-1">
                <input
                  v-model="form.minPrice"
                  type="number"
                  placeholder="Rp 10.000"
                  :class="[
                    'w-full p-2 border rounded-md focus:ring-2',
                    errors.minPrice
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-blue-500 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.minPrice" class="text-red-500 text-xs mt-1">
                  {{ errors.minPrice }}
                </p>
              </div>
              <div class="flex-1">
                <input
                  v-model="form.maxPrice"
                  type="number"
                  placeholder="Rp 250.000"
                  :class="[
                    'w-full p-2 border rounded-md focus:ring-2',
                    errors.maxPrice
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-blue-500 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.maxPrice" class="text-red-500 text-xs mt-1">
                  {{ errors.maxPrice }}
                </p>
              </div>
            </div>
          </div>

          <!-- Photo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Photo</label>
            <div
              :class="[
                'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors',
                errors.photos ? 'border-red-500' : 'border-gray-300',
              ]"
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
                  class="w-24 h-24 rounded overflow-hidden border border-gray-200 bg-white flex items-center justify-center"
                >
                  <img :src="img" alt="preview" class="object-cover w-full h-full" />
                </div>
              </div>
            </div>
            <p v-if="errors.photos" class="text-red-500 text-xs mt-1">{{ errors.photos }}</p>
          </div>

          <!-- Map Location -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
              <input
                v-model="form.street"
                type="text"
                placeholder="e.g. Jln Wistu Marga"
                :class="[
                  'w-full p-2 border rounded-md focus:ring-2',
                  errors.street
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500',
                ]"
              />
              <p v-if="errors.street" class="text-red-500 text-xs mt-1">{{ errors.street }}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Village</label>
                <input
                  v-model="form.desa"
                  type="text"
                  placeholder="e.g. Ubud"
                  :class="[
                    'w-full p-2 border rounded-md focus:ring-2',
                    errors.desa
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-blue-500 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.desa" class="text-red-500 text-xs mt-1">{{ errors.desa }}</p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sub-district</label>
                <input
                  v-model="form.subDistrict"
                  type="text"
                  placeholder="e.g. Ubud"
                  :class="[
                    'w-full p-2 border rounded-md focus:ring-2',
                    errors.subDistrict
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-blue-500 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.subDistrict" class="text-red-500 text-xs mt-1">
                  {{ errors.subDistrict }}
                </p>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Regency</label>
                <input
                  v-model="form.regency"
                  type="text"
                  placeholder="e.g. Gianyar"
                  :class="[
                    'w-full p-2 border rounded-md focus:ring-2',
                    errors.regency
                      ? 'border-red-500 focus:ring-red-500'
                      : 'focus:ring-blue-500 focus:border-blue-500',
                  ]"
                />
                <p v-if="errors.regency" class="text-red-500 text-xs mt-1">{{ errors.regency }}</p>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Maps Link</label>
              <input
                v-model="form.mapsLink"
                type="url"
                placeholder="https://maps.app.goo.gl/Cyj8K3kxVFT2iq9DA"
                :class="[
                  'w-full p-2 border rounded-md focus:ring-2',
                  errors.mapsLink
                    ? 'border-red-500 focus:ring-red-500'
                    : 'focus:ring-blue-500 focus:border-blue-500',
                ]"
              />
              <p v-if="errors.mapsLink" class="text-red-500 text-xs mt-1">{{ errors.mapsLink }}</p>
            </div>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-4 pt-6">
            <button
              @click="submitForm"
              :disabled="isLoading"
              :class="[
                'px-6 py-2 rounded-md transition-colors flex items-center gap-2',
                isLoading
                  ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
            >
              <svg
                v-if="isLoading"
                class="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? 'Creating...' : 'Create' }}
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

        <footer class="mt-8 text-center text-white text-sm">
          Copyright © 2025 ALL rights reserved by DEVOUS
        </footer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const backgroundImage = ref(new URL('../assets/images/forminput.jpg', import.meta.url).href)

const form = ref({
  name: '',
  category: '',
  description: '',
  fasilitas: '', // string, bukan array
  minPrice: null,
  maxPrice: null,
  street: '',
  subDistrict: '',
  regency: '',
  mapsLink: '',
  desa: '',
})

const imagePreviews = ref([])
form.value.photos = []

const categories = ref(['Nature', 'Adventure', 'Cultural', 'Beach', 'Mountain'])
const isLoading = ref(false)

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  addImages(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  addImages(files)
}

function addImages(files) {
  const imageFiles = files.filter((file) => file.type.startsWith('image/'))
  form.value.photos = [...(form.value.photos || []), ...imageFiles]
  imageFiles.forEach((file) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreviews.value.push(e.target.result)
    }
    reader.readAsDataURL(file)
  })
}

async function uploadImages(files, token) {
  // Upload semua file satu per satu, dapatkan array nama file
  const uploadedNames = []
  for (const file of files) {
    const formData = new FormData()
    formData.append('image', file)
    const res = await axios.post('http://localhost:8000/api/upload-image/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    uploadedNames.push(res.data.filename) // sesuaikan dengan response backend
  }
  return uploadedNames
}

const errors = ref({})

function validateForm() {
  errors.value = {}
  if (!form.value.name) errors.value.name = 'Harus diisi, tidak boleh kosong'
  if (!form.value.category) errors.value.category = 'Harus diisi, tidak boleh kosong'
  if (!form.value.description) errors.value.description = 'Harus diisi, tidak boleh kosong'
  if (!form.value.fasilitas) errors.value.fasilitas = 'Harus diisi, tidak boleh kosong'
  if (!form.value.minPrice) errors.value.minPrice = 'Harus diisi, tidak boleh kosong'
  if (!form.value.maxPrice) errors.value.maxPrice = 'Harus diisi, tidak boleh kosong'
  if (!form.value.street) errors.value.street = 'Harus diisi, tidak boleh kosong'
  if (!form.value.desa) errors.value.desa = 'Harus diisi, tidak boleh kosong'
  if (!form.value.subDistrict) errors.value.subDistrict = 'Harus diisi, tidak boleh kosong'
  if (!form.value.regency) errors.value.regency = 'Harus diisi, tidak boleh kosong'
  if (!form.value.mapsLink) errors.value.mapsLink = 'Harus diisi, tidak boleh kosong'
  if (!form.value.photos || form.value.photos.length === 0)
    errors.value.photos = 'Harus diisi, tidak boleh kosong'
  return Object.keys(errors.value).length === 0
}

const submitForm = async () => {
  if (!validateForm()) {
    await Swal.fire({
      icon: 'error',
      title: 'Gagal!',
      text: 'Mohon lengkapi semua field yang wajib diisi.',
      showConfirmButton: true,
    })
    return
  }

  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  if (!token) {
    alert('Anda harus login terlebih dahulu!')
    return
  }

  // Set loading to true
  isLoading.value = true

  // Buat FormData
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('description', form.value.description)
  formData.append('address', form.value.street)
  formData.append('kota', form.value.regency)
  formData.append('kecamatan', form.value.subDistrict)
  formData.append('desa', form.value.desa || '')
  formData.append('fasilitas', form.value.fasilitas || '')
  formData.append('google_maps_url', form.value.mapsLink || '')
  formData.append('category', form.value.category)
  formData.append('price_min', Number(form.value.minPrice) || 0)
  formData.append('price_max', Number(form.value.maxPrice) || 0)
  if (form.value.photos && form.value.photos.length > 0) {
    form.value.photos.forEach((file) => {
      formData.append('images', file)
    })
  }

  try {
    const res = await axios.post('http://localhost:8000/api/touristspots/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })

    // CEK: Jika backend mengirim kode 4002 (duplikat mirip)
    if (res.data && res.data.code === 4002) {
      let msg = 'Ada wisata yang mirip di database!\n'
      if (res.data.similar_name) msg += `Nama mirip: ${res.data.similar_name}\n`
      if (res.data.similar_desc) msg += `Deskripsi mirip pada: ${res.data.similar_desc}\n`
      await Swal.fire({
        icon: 'warning',
        title: 'Peringatan!',
        text: msg,
        showConfirmButton: true,
      })
      return // Jangan lanjut reset form
    }

    // Jika sukses
    await Swal.fire({
      icon: 'success',
      title: 'Berhasil!',
      text: 'Data wisata berhasil dikirim!',
      showConfirmButton: false,
      timer: 1800,
      timerProgressBar: true,
    })
    // Reset form & preview
    form.value = {
      name: '',
      category: '',
      description: '',
      fasilitas: '',
      minPrice: null,
      maxPrice: null,
      street: '',
      subDistrict: '',
      regency: '',
      mapsLink: '',
      desa: '',
      images: [],
    }
    imagePreviews.value = []
  } catch (err) {
    if (err.response && err.response.data) {
      let msg = ''
      const data = err.response.data
      if (Array.isArray(data)) {
        msg = data.join('\n')
      } else if (typeof data === 'string') {
        msg = data
      } else if (typeof data === 'object') {
        for (const key in data) {
          msg += `${key}: ${JSON.stringify(data[key])}\n`
        }
      }
      await Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: msg || 'Gagal mengirim data wisata!',
        showConfirmButton: true,
      })
    } else {
      await Swal.fire({
        icon: 'error',
        title: 'Gagal!',
        text: 'Gagal mengirim data wisata!',
        showConfirmButton: true,
      })
    }
  } finally {
    // Set loading to false regardless of success or error
    isLoading.value = false
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

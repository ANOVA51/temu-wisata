<template>
  <div
    class="min-h-screen relative bg-gray-900"
    :style="{
      backgroundImage: `url('${backgroundImage}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed',
    }"
  >
    <!-- Overlay semi-transparent -->
    <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>

    <div class="relative z-10 py-8">
      <div class="max-w-4xl mx-auto px-4">
        <h1 class="text-3xl font-bold text-white mb-8">Create Destination</h1>

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
                  class="w-24 h-24 rounded overflow-hidden border border-gray-200 bg-white flex items-center justify-center"
                >
                  <img :src="img" alt="preview" class="object-cover w-full h-full" />
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
              Create
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
import { ref } from 'vue'
import axios from 'axios'

const backgroundImage = ref(new URL('../assets/forminput.jpg', import.meta.url).href)

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

const handleFileUpload = (event) => {
  const files = Array.from(event.target.files)
  addImages(files)
}

const handleDrop = (event) => {
  const files = Array.from(event.dataTransfer.files)
  addImages(files)
}

function addImages(files) {
  const imageFiles = files.filter(file => file.type.startsWith('image/'))
  form.value.photos = [...(form.value.photos || []), ...imageFiles]
  imageFiles.forEach(file => {
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

const submitForm = async () => {
  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  if (!token) {
    alert('Anda harus login terlebih dahulu!')
    return
  }

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
    form.value.photos.forEach(file => {
      formData.append('images', file)
    })
  }

  try {
    await axios.post('http://localhost:8000/api/touristspots/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    alert('Data wisata berhasil dikirim!')
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
      alert(msg || 'Gagal mengirim data wisata!')
    } else {
      alert('Gagal mengirim data wisata!')
    }
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

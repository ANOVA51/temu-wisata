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
            <div class="flex flex-wrap gap-2">
              <button
                v-for="facility in facilities"
                :key="facility"
                @click="toggleFacility(facility)"
                :class="[
                  'px-4 py-2 rounded-full text-sm transition-colors',
                  form.selectedFacilities.includes(facility)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ facility }}
              </button>
            </div>
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

          <!-- Contact Section -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="+62 812 3456 7890"
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                v-model="form.email"
                type="email"
                placeholder="example@temuwisata.my.id"
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <!-- Photo Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Photo</label>
            <div
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-500 transition-colors"
              @click="$refs.fileInput.click()"
            >
              <div class="text-gray-500">
                <p>Click to add photos or drag & drop</p>
                <input
                  type="file"
                  multiple
                  @change="handleFileUpload"
                  class="hidden"
                  ref="fileInput"
                />
              </div>
            </div>
          </div>

          <!-- Map Location -->
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Street</label>
              <input
                v-model="form.street"
                type="text"
                placeholder="Jalan Gautama Ubud"
                class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Sub-district</label>
                <input
                  v-model="form.subDistrict"
                  type="text"
                  placeholder="Ubud"
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Regency</label>
                <input
                  v-model="form.regency"
                  type="text"
                  placeholder="Glanyar"
                  class="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
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
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-4 pt-6">
            <button
              @click="submitForm"
              class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Create
            </button>
            <button
              class="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
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

// Path ke gambar lokal di folder assets
const backgroundImage = ref(new URL('../assets/forminput.jpg', import.meta.url).href)

const form = ref({
  name: '',
  category: '',
  description: '',
  selectedFacilities: [],
  minPrice: null,
  maxPrice: null,
  phone: '',
  email: '',
  photos: [],
  street: '',
  subDistrict: '',
  regency: '',
  mapsLink: '',
})

const categories = ref(['Nature', 'Adventure', 'Cultural', 'Beach', 'Mountain'])
const facilities = ref(['Restroom', 'Parking Area', 'Wifi', 'Cafe', 'First Aid'])

const toggleFacility = (facility) => {
  const index = form.value.selectedFacilities.indexOf(facility)
  if (index > -1) {
    form.value.selectedFacilities.splice(index, 1)
  } else {
    form.value.selectedFacilities.push(facility)
  }
}

const handleFileUpload = (event) => {
  form.value.photos = Array.from(event.target.files)
}

const submitForm = () => {
  console.log('Form submitted:', form.value)
}
</script>

<style>
@media (min-width: 1024px) {
  .bg-attachment-fixed {
    background-attachment: fixed;
  }
}
</style>

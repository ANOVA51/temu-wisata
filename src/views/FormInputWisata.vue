<script setup>
import mapImage from '@/assets/images/balimap.jpg'
</script>
<template>
  <div
    class="min-h-screen bg-cover bg-center flex justify-center items-center"
    style="background-image: url('/path/to/your-background-image.jpg')"
  >
    <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-4xl">
      <h1 class="text-2xl font-bold mb-4">Create Destination</h1>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Form Kiri -->
        <div>
          <label class="block text-gray-700">Name</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Name Of Destination"
          />

          <label class="block text-gray-700 mt-4">Category</label>
          <select class="w-full border border-gray-300 rounded-lg p-2 mt-1">
            <option>Select Category</option>
          </select>

          <label class="block text-gray-700 mt-4">Description</label>
          <textarea
            class="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="Description"
          ></textarea>

          <label class="block text-gray-700 mt-4">Facilities</label>
          <div class="flex flex-wrap gap-2 mt-1">
            <span class="bg-green-200 text-green-800 px-3 py-1 rounded">Restroom</span>
            <span class="bg-green-200 text-green-800 px-3 py-1 rounded">Parking Area</span>
          </div>

          <label class="block text-gray-700 mt-4">Entrance Ticket</label>
          <div class="flex items-center space-x-2">
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Rp 10.000"
            />
            <span>-</span>
            <input
              type="text"
              class="w-full border border-gray-300 rounded-lg p-2 mt-1"
              placeholder="Rp 250.000"
            />
          </div>

          <label class="block text-gray-700 mt-4">Contact Phone Number</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="e.g., +62 812 3456 7890"
          />

          <label class="block text-gray-700 mt-4">Photo</label>
          <div
            class="border border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
          >
            <p>Click to add photos or drag & drop</p>
          </div>
        </div>

        <!-- Form Kanan -->
        <div>
          <label class="block text-gray-700">Map Location</label>
          <div class="border border-gray-300 rounded-lg p-6">
            <img :src="mapImage" alt="Map" class="w-full rounded-lg" />
          </div>

          <label class="block text-gray-700 mt-4">Street</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="e.g., Jalan Gautama Ubud"
          />

          <label class="block text-gray-700 mt-4">Sub-district</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="e.g., Ubud"
          />

          <label class="block text-gray-700 mt-4">Regency</label>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="e.g., Gianyar"
          />

          <label class="block text-gray-700 mt-4">Maps Link</label>
          <input
            type="url"
            class="w-full border border-gray-300 rounded-lg p-2 mt-1"
            placeholder="e.g., https://maps.google.com/"
          />
        </div>
      </div>

      <!-- Tombol -->
      <div class="flex justify-between mt-6">
        <button class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600">
          Create Destination
        </button>
        <button class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Cancel</button>
      </div>
    </div>
  </div>
</template>

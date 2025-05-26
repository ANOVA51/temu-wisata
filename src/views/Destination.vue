<script setup>
import Search from '@/assets/icon/Search.vue'
import FooterSection from '@/components/FooterSection.vue'
import Navbar from '@/components/Navbar.vue'

import { computed, onMounted, ref } from 'vue'

const allDestinations = [
  'Ubud',
  'Kuta Selatan',
  'Dalung',
  'Tegallalang',
  'Kuta',
  'Mengwi',
  'Denpasar',
  'Payangan',
  'Sukawati',
  'Sanur',
  'Jimbaran',
  'Nusa Dua',
  'Canggu',
  'Seminyak',
  'Bangli',
  'Gianyar',
]

import savana from '@/assets/images/destinasi/savana.png'

const destinasi = [
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
  {
    image: savana,
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
  },
]

const showAll = ref(false)
const selectedLocation = ref('')
const favorites = ref([])
const loading = ref(true)
const activeModal = ref(null)

onMounted(() => {
  setTimeout(() => (loading.value = false), 1000)
})

const toggleFavorite = (index) => {
  if (favorites.value.includes(index)) {
    favorites.value = favorites.value.filter((i) => i !== index)
  } else {
    favorites.value.push(index)
  }
}

const isFavorite = (index) => favorites.value.includes(index)

const filteredDestinasi = computed(() => {
  let result = destinasi
  if (selectedLocation.value) {
    result = result.filter((d) =>
      d.name.toLowerCase().includes(selectedLocation.value.toLowerCase()),
    )
  }
  return showAll.value ? result : result.slice(0, 8)
})
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
          in Bali’s tourist destinations
        </h1>
      </div>
    <!-- Hero Section -->
    <section class="py-16 flex justify-center">
      <img
        src="@/assets/images/herobanner1.png"
        alt="Hero Banner"
        class="rounded-3xl max-w-7xl w-full max-h-3xl h-full shadow-lg"
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
          <option v-for="loc in allDestinations" :key="loc" :value="loc">
            {{ loc }}
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
          />
          <Search
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
          />
        </div>
      </div>

      <!-- Grid Card -->
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-10"
        style="min-width: max-content"
      >
        <template v-if="loading">
          <div v-for="i in 8" :key="i" class="animate-pulse bg-gray-200 rounded-xl h-72"></div>
        </template>
        <template v-else>
          <div
            v-for="(img, index) in filteredDestinasi"
            :key="index"
            class="group relative bg-white rounded-xl overflow-hidden h-96 flex-shrink-0 shadow-md transform transition duration-300 hover:scale-105 animate-fade-in"
            @click="activeModal = img"
          >

            <div class="w-full h-full overflow-hidden">
              <img
                :src="img.image"
                :alt="img.name"
                class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div
              class="absolute z-10 bg-gradient-to-t from-black/80 to-transparent text-white bottom-0 h-1/2 px-4 py-3 "
            >
              <p class="font-semibold text-lg text-center pb-1">{{ img.name }}</p>
              <p class="text-sm">{{ img.deskripsi }}</p>
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

    <!-- Modal -->
    <div
      v-if="activeModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="activeModal = null"
    >
      <div class="bg-white rounded-xl p-6 w-full max-w-4xl shadow-lg flex flex-col gap-6">
        <h3 class="text-2xl font-bold mb-2">{{ activeModal.name }}</h3>

        <!-- Bagian atas: gambar dan iframe sejajar -->
        <div class="flex flex-row gap-10" style="height: 300px">
          <img
            :src="activeModal.image"
            alt="destinasi"
            class="rounded-lg object-cover"
            style="width: 60%; height: 100%"
          />

          <iframe
            v-if="activeModal.mapUrl"
            :src="activeModal.mapUrl"
            width="40%"
            height="100%"
            class="rounded-lg"
            style="border: 0"
            allow="fullscreen"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <!-- Bagian bawah: deskripsi -->
        <p class="text-gray-700">{{ activeModal.deskripsi }}</p>

        <!-- Tombol Close -->
        <div class="text-right mt-4">
          <button @click="activeModal = null" class="px-4 py-2 bg-lime-500 text-white rounded">
            Close
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

    <FooterSection />
  </div>
</template>

<script setup>
import Search from '@/assets/icon/Search.vue'
import FooterSection from '@/components/FooterSection.vue'
import Navbar from '@/components/Navbar.vue'
import loveoutline from '@/components/icons/loveoutline.vue'
import filledLove from '@/components/icons/filledLove.vue'

import kecak from '@/assets/images/kecak.jpg'
import penari from '@/assets/images/penari.jpg'
import statue from '@/assets/images/statue1.jpg'
import waterfall from '@/assets/images/waterfall1.jpg'

import AOS from 'aos'
import 'aos/dist/aos.css'
import { computed, onMounted, ref, watch } from 'vue'

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
import FilledLove from '@/components/icons/filledLove.vue'
import Loveoutline from '@/components/icons/loveoutline.vue'

const destinasi = [
  {
    images: [savana, kecak, penari, statue, waterfall],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
  {
    images: [savana, kecak, penari, statue, waterfall],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
  {
    images: [savana, kecak, penari, statue, waterfall],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
  {
    images: [savana, kecak, penari, statue, waterfall],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
  {
    images: [savana, kecak, penari, statue, waterfall],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
  {
    images: [savana, kecak, penari, statue, waterfall],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
  {
    images: [savana, kecak, penari, statue, waterfall],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
  {
    images: [savana],
    name: 'savana tianyar',
    deskripsi:
      'Savana Tianyar adalah salah satu hidden gem di Bali yang memiliki suasana eksotik ala Afrika.',
    mapUrl:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.785349860783!2d115.50615607456099!3d-8.224328682550388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd1fa262ae6d15f%3A0x21d7bc44437e774c!2sSavana%20Tianyar!5e0!3m2!1sid!2sid!4v1748139614578!5m2!1sid!2sid',
    tabel: {
      Category: 'Nature',
      Facilities: 'Restroom, Parking Area',
      'Entrance Ticket': 'Rp 10.000 - Rp 250.000',
      Contact: '+62 812 3456 7890',
      Email: 'example@temuwisata.my.id',
      Street: 'Jalan Gautama Ubud',
      'Sub-district': 'Ubud',
      Regency: 'Gianyar',
      'Maps Link': 'https://maps.app.goo.gl/CjYk3kxVF1ziqkDAA',
    },
  },
]

const showAll = ref(false)
const selectedLocation = ref('')
const favorites = ref([])
const loading = ref(true)
const activeModal = ref(null)
const currentIndex = ref(0)

onMounted(() => {
  setTimeout(() => (loading.value = false), 1000)
  AOS.init()
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

const nextImage = () => {
  if (activeModal.value && activeModal.value.images && activeModal.value.images.length > 0) {
    currentIndex.value = (currentIndex.value + 1) % activeModal.value.images.length
  }
}

watch(activeModal, (val) => {
  if (val && val.images && val.images.length > 0) {
    currentIndex.value = 0
  }
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
        in Bali's tourist destinations
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
            <button
              @click.stop="toggleFavorite(index)"
              class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition z-20"
            >
              <component :is="isFavorite(index) ? filledLove :loveoutline" class="w-7 h-7"/>
            </button>
            <div class="w-full h-full overflow-hidden">
              <img
                :src="img.images ? img.images[0] : ''"
                :alt="img.name"
                class="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div
              class="absolute z-10 bg-gradient-to-t from-black/80 to-transparent text-white bottom-0 h-1/2 px-4 py-3"
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
      <!--button tambah postingan-->
    </section>

    <!-- Floating Add Button -->

    <div class="fixed bottom-20 right-6 z-50 flex flex-col items-center">
      <!-- Balon chat -->
      <div
        class="relative mb-2 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full shadow-md"
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

    <!-- Modal -->
    <div
      v-if="activeModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="activeModal = null"
      data-aos="zoom-in"
    >
      <div
        class="bg-white rounded-xl p-8 w-full max-w-5xl shadow-lg flex flex-col md:flex-row gap-10 items-center relative"
      >
        <!-- Left: Image/Carousel -->
        <div class="flex flex-col items-center w-full md:w-1/2">
          <div
            v-if="activeModal.images && activeModal.images.length > 0"
            class="relative w-full max-w-[360px] mx-auto h-[250px] cursor-pointer"
            @click="nextImage"
          >
            <div class="relative w-full h-full">
              <div
                v-for="(img, index) in activeModal.images"
                :key="img"
                class="absolute top-0 transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-lg"
                :class="[
                  index === currentIndex
                    ? 'z-30 scale-100 left-0'
                    : index === (currentIndex + 1) % activeModal.images.length
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
          <img
            v-else-if="activeModal.image"
            :src="activeModal.image"
            :alt="activeModal.name"
            class="rounded-lg object-cover mb-6"
            style="width: 320px; height: 320px; max-width: 100%; max-height: 320px"
          />
        </div>
        <!-- Right: Details -->
        <div class="flex-1 flex flex-col justify-between w-full md:w-1/2">
          <div>
            <div class="text-2xl font-bold text-gray-700 mb-2">{{ activeModal.name }}</div>
            <div class="text-base text-gray-800 mb-4">{{ activeModal.deskripsi }}</div>
            <div v-if="activeModal.tabel" class="mb-4">
              <table class="w-full text-sm">
                <tbody>
                  <tr v-for="(val, key) in activeModal.tabel" :key="key">
                    <td class="font-semibold py-1 pr-2 text-gray-600">{{ key }}</td>
                    <td class="py-1 text-gray-800">
                      <template v-if="key === 'Maps Link'">
                        <a :href="val" target="_blank" class="text-green-600 underline"
                          >Lihat di Maps</a
                        >
                      </template>
                      <template v-else>
                        {{ val }}
                      </template>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="activeModal.mapUrl" class="mb-4">
              <iframe
                :src="activeModal.mapUrl"
                width="100%"
                height="200"
                style="border: 0; border-radius: 12px"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
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

    <FooterSection />
  </div>
</template>

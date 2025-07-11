<script setup>
import { ref } from 'vue'
import panglipuran from '@/assets/images/testimoni/testimoni1.png'
import tirtaempul from '@/assets/images/testimoni/testimoni2.png'

const testimoni = [
  {
    user : 'Sana',
    name : 'panglipuran',
    image: panglipuran,
    comment: 'Saya benar-benar terpesona dengan keindahan Desa Panglipuran!',
  },
  {
    user : 'Sukanto',
    name : 'tirtaempul',
    image: tirtaempul,
    comment:'Saya mengikuti prosesi melukat di kolam suci dan rasanya sangat menenangkan.',
  },
  {
    user : 'Sukanto',
    name : 'tirtaempul',
    image: tirtaempul,
    comment:'Pengalaman spiritual yang luar biasa di Tirta Empul! Saya mengikuti prosesi melukat di kolam suci dan rasanya sangat menenangkan. Tempat ini sungguh membawa kedamaian dan kesejukan dalam hati saya.',
  },
]

const selectedComment = ref(null)
const showModal = ref(false)

function openModal(comment) {
  selectedComment.value = comment
  showModal.value = true
}

function closeModal() {
  showModal.value = false
}
</script>

<template>
  <section>
    <!--Testimoni Section-->
    <div class="bg-[#67AE6E] py-12 px-4 md:px-10">
      <h2 class="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
        Testimoni Hidden Gem
      </h2>

      <!-- Card Grid -->
      <div class="overflow-x-auto">
        <div class="flex gap-6 px-2 sm:px-8">
          <div
            v-for="(img, index) in testimoni"
            :key="index"
            class="bg-white rounded-2xl w-64 flex-shrink-0 shadow-lg hover:shadow-2xl transition duration-300"
          >
            <!-- Header -->
            <div class="flex items-center justify-between p-4">
              <h2 class="text-lg font-semibold text-gray-800 truncate w-28">
                {{ img.user }}
              </h2>
              <img :src="img.image" :alt="img.name" class="w-14 h-14 rounded-full border-2 border-green-500 object-cover" />
            </div>

            <!-- Comment -->
            <div class="px-4 pb-4">
              <p
                class="text-sm text-gray-700 line-clamp-3"
                :class="{ 'mb-2': img.comment.length > 100 }"
              >
                {{ img.comment }}
              </p>

              <!-- View More Button -->
              <button
                v-if="img.comment.length > 100"
                @click="openModal(img.comment)"
                class="text-green-700 text-sm font-semibold hover:underline"
              >
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <div class="bg-white rounded-xl p-6 max-w-md w-[90%] shadow-xl relative">
          <button
            @click="closeModal"
            class="absolute top-2 right-2 text-gray-500 hover:text-black"
          >
            ✖
          </button>
          <h3 class="text-xl font-bold text-green-700 mb-4">Komentar Lengkap</h3>
          <p class="text-gray-800 text-sm">{{ selectedComment }}</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<style scoped>
/* Optional: transition for modal */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

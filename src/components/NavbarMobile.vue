<template>
  <nav class="fixed top-0 left-0 right-0 z-50 bg-green-600 text-white shadow md:hidden">
    <div class="flex items-center justify-between px-4 py-3">
      <span class="font-bold text-xl tracking-widest">TESA</span>
      <button @click="open = !open" class="focus:outline-none">
        <svg
          v-if="!open"
          class="w-7 h-7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg
          v-else
          class="w-7 h-7"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div v-if="open" class="px-4 pb-4 space-y-2">
      <button
        class="block w-full text-left py-2 px-2 rounded hover:bg-green-700 transition"
        @click="
          () => {
            $emit('menu', 'dashboard')
            open = false
          }
        "
      >
        Dashboard
      </button>
      <button
        class="block w-full text-left py-2 px-2 rounded hover:bg-green-700 transition"
        @click="
          $emit('menu', 'wisata-manage')
          open = false
        "
      >
        Wisata Manage
      </button>
      <button
        class="block w-full text-left py-2 px-2 rounded hover:bg-green-700 transition"
        @click="
          $emit('menu', 'confirm-wisata')
          open = false
        "
      >
        Confirm Wisata
      </button>
      <button
        class="block w-full text-left py-2 px-2 rounded hover:bg-green-700 transition"
        @click="
          $emit('menu', 'user-manage')
          open = false
        "
      >
        User Manage
      </button>
      <!-- Tambahkan menu lain jika perlu -->
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
const open = ref(false)
</script>

# temu-wisata

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

<!-- Admin DashboardView.vue -->
<script setup>
import { ref, watch } from 'vue'
import NavItem from '@/components/NavItem.vue'
import InfoCard from '@/components/InfoCard.vue'

const active = ref('dashboard')
const direction = ref('right') // kontrol arah transisi

// Deteksi arah perpindahan
const lastIndex = ref(0)
const menuList = ['dashboard', 'massage', 'management', 'management-user']

watch(active, (newVal, oldVal) => {
  const newIndex = menuList.indexOf(newVal)
  const oldIndex = menuList.indexOf(oldVal)
  direction.value = newIndex > oldIndex ? 'right' : 'left'
  lastIndex.value = newIndex
})
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-green-600 text-white flex flex-col">
      <div class="p-6 text-center border-b border-white/20">
        <h1 class="text-3xl font-bold tracking-widest">TESA</h1>
        <p class="text-xs mt-1">Temu Wisata Admin Dashboard</p>
      </div>
      <nav class="flex-1 px-4 py-4 space-y-4">
        <NavItem
          icon="mdi-view-dashboard"
          label="Dashboard"
          :active="active === 'dashboard'"
          @click="active = 'dashboard'"
        />
        <NavItem
          icon="mdi-email"
          label="Massage"
          :active="active === 'massage'"
          @click="active = 'massage'"
        />
        <NavItem
          icon="mdi-cog"
          label="Management"
          :active="active === 'management'"
          @click="active = 'management'"
        />
        <NavItem
          icon="mdi-account-group"
          label="Management User"
          :active="active === 'management-user'"
          @click="active = 'management-user'"
        />
      </nav>
    </aside>

    <!-- Main Content with Slide Transition -->
    <main class="flex-1 p-10 relative overflow-hidden">
      <transition :name="`slide-${direction}`" mode="out-in">
        <div :key="active">
          <div v-if="active === 'dashboard'">
            <h2 class="text-3xl font-bold text-green-700 mb-6">Dashboard</h2>
            <div class="grid grid-cols-2 gap-6">
              <InfoCard icon="mdi-account" title="User" :value="999" />
              <InfoCard icon="mdi-map-marker" title="Location" :value="999" />
            </div>
          </div>

          <div v-else-if="active === 'massage'">
            <h2 class="text-3xl font-bold text-green-700">Massage</h2>
            <p class="text-sm text-green-800 mt-1">28 Massage Found</p>
            <div class="flex space-x-4 mt-4">
              <span class="text-green-700 text-sm font-semibold">All Massage</span>
              <span class="text-green-700 text-sm font-semibold">All Massage</span>
            </div>
          </div>

          <div v-else-if="active === 'management'">
            <h2 class="text-3xl font-bold text-green-700">Management</h2>
            <p class="text-sm text-green-800 mt-1">Coming Soon</p>
          </div>

          <div v-else-if="active === 'management-user'">
            <h2 class="text-3xl font-bold text-green-700">Management User</h2>
            <p class="text-sm text-green-800 mt-1">Coming Soon</p>
          </div>
        </div>
      </transition>
    </main>

  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css';

/* Fade fallback */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Slide Left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}
.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Slide Right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

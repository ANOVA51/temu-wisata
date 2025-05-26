<template>
  <div class="border rounded-lg p-6 text-center">
    <i :class="['mdi', icon, 'text-2xl text-green-700']"></i>
    <h3 class="text-green-700 font-bold mt-2">{{ title }}</h3>
    <p class="font-semibold text-gray-700 mt-1">{{ value }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  title: String,
  value: Number,
})
</script>

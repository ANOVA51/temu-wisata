<template>
  <div
    class="flex items-center space-x-2 cursor-pointer py-2 px-3 rounded hover:bg-white/10"
    :class="{ 'bg-white text-green-700 font-bold': active }"
    @click="$emit('click')"
  >
    <i :class="['mdi', icon, 'text-xl']"></i>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
const props = defineProps({
  icon: String,
  label: String,
  active: Boolean,
})
</script>

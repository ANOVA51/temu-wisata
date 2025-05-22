<template>
  <footer class="bg-gray-200 text-black text-xs sm:text-sm">
    <div
      class="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-center"
    >
      <!-- Logo & Tagline -->
      <div class="flex flex-col items-center sm:items-start">
        <div class="flex items-center gap-2">
          <div class="w-12 h-12 sm:w-16 sm:h-16 border-4 border-black rounded-full"></div>
          <h1 class="text-2xl sm:text-4xl font-bold text-green-700 tracking-widest">TESA</h1>
        </div>
        <p
          class="mt-2 text-green-700 font-semibold text-center sm:text-left text-[10px] sm:text-sm"
        >
          "Explore, Engage, Evolve Together."
        </p>
      </div>

      <!-- Contact Info -->
      <div class="text-center sm:text-left">
        <div class="flex items-center justify-center sm:justify-start gap-2 mb-2">
          <span class="material-icons text-base sm:text-lg">email</span>
          <span class="text-[10px] sm:text-sm">temuwisata@gdpartstudio.my.id</span>
        </div>
        <div class="flex items-center justify-center sm:justify-start gap-2">
          <span class="material-icons text-base sm:text-lg">call</span>
          <span class="text-[10px] sm:text-sm">+62 8133 9172 556</span>
        </div>
      </div>

      <!-- Navigation & Socials -->
      <div
        class="flex flex-col items-center sm:items-end gap-4 col-span-1 sm:col-span-2 md:col-span-1"
      >
        <nav class="flex flex-col space-y-1 text-center sm:text-right">
          <a href="#" class="hover:underline text-[10px] sm:text-sm">Home</a>
          <a href="#" class="hover:underline text-[10px] sm:text-sm">Destination</a>
          <a href="#" class="hover:underline text-[10px] sm:text-sm">About</a>
          <a href="#" class="hover:underline text-[10px] sm:text-sm">Register / Login</a>
        </nav>
        <div class="text-center sm:text-right">
          <p class="font-bold text-[10px] sm:text-sm">Follow Us On !</p>
          <div class="flex gap-4 mt-2 justify-center sm:justify-end">
            <i class="fab fa-instagram text-lg sm:text-2xl"></i>
            <i class="fab fa-facebook text-lg sm:text-2xl"></i>
            <i class="fab fa-twitter text-lg sm:text-2xl"></i>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center text-[10px] sm:text-xs py-4 border-t border-gray-300">
      Copyright © 2025 All rights reserved by <span class="font-semibold">DEVOUS</span>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterSection',
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>

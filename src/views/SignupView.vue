<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <!-- Left side: Gambar -->
    <div class="hidden md:flex w-1/2 items-center justify-center">
      <img src="@/assets/images/lognsign/background.png" class="object-cover w-full h-full" />

      <div class="absolute z-10">
        <h2 class="relative z-20 text-black text-6xl font-bold text-start px-6">Signup <br> 
            <span class="text-black text-5xl font-semibold">For Free</span></h2>
      </div>
    </div>

    <!-- Jika ingin menambahkan teks atau logo, bisa ditaruh di sini -->

    <!-- Right side: Form Login -->
    <div class="flex items-center justify-center bg-white p-8">
      <div class="h-full">
        <h2 class="text-5xl font-bold mb-2 text-gray-800">Signup</h2>
        <p class="text-md text-gray-500 mb-6">Welcome back! Signup your account for free</p>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="pb-10">
            <label class="block text-lg font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              class="w-140 h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div class="pb-10">
            <label class="block text-lg font-medium text-gray-700 mb-1">User Name</label>
            <input
              v-model="name"
              type="name"
              required
              class="w-140 h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          <div class="pb-10">
            <label class="block text-lg font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              class="w-140 h-12 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
          
          <div class="flex items-center justify-between text-sm text-gray-600">

          </div>
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800 transition "
          >
            Login
          </button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">
          have an account?
          <RouterLink to="/login" class="text-green-500 hover:underline">login</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const handleSignup = () => {
  // Implementasi signup, contoh redirect
  console.log('Signup with:', name.value, email.value, password.value)
  router.push({ name: 'home' })
}
</script>

<template>
  <div class="w-screen h-screen flex overflow-hidden ">
    <!-- Left side: Gambar -->
    <div class="hidden md:flex w-1/2 items-center justify-center">
      <img src="@/assets/images/lognsign/background.png" class="object-cover w-full h-full" />

      <div class="absolute z-10">
        <h2 class="relative z-20 text-black text-6xl font-bold text-start px-6">Welcome <br> Back!</h2>
      </div>
    </div>

    <!-- Jika ingin menambahkan teks atau logo, bisa ditaruh di sini -->

    <!-- Right side: Form Login -->
    <div class="flex items-center justify-center bg-white p-8">
      <div class="h-full">
        <h2 class="text-5xl font-bold mb-2 text-gray-800">Login</h2>
        <p class="text-md text-gray-500 mb-6">Welcome back! Please login to your account</p>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div class="pb-10">
            <label class="block text-lg font-medium text-gray-700 mb-1">User Name</label>
            <input
              v-model="username"
              type="username"
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
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" />
              Remember me
            </label>
            <a href="#" class="hover:underline">Forgot Password?</a>
          </div>
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-800 transition "
          >
            Login
          </button>
        </form>
        <p class="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <RouterLink to="/signup" class="text-green-500 hover:underline">Sign up</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')

const handleLogin = () => {
  console.log('Login with:', email.value, password.value)
  // Simulasi redirect ke halaman home setelah login
  router.push({ name: 'home' })
}
</script>

<template>
<<<<<<< HEAD
  <div class="min-h-screen flex bg-gray-900">
    <!-- Left Side - Signup Section with Background Image -->
    <div class="flex-1 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <img :src="SignupBG" alt="Signup Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0"></div>
      </div>
      <div class="relative z-10 flex items-center justify-center h-full p-12">
        <div class="text-left">
          <h1 class="text-6xl font-bold text-black mb-4 leading-tight">
            Signup<br>
            <span class="text-4xl font-normal">Join us!</span>
          </h1>
        </div>
      </div>
    </div>

    <!-- Right Side - Signup Form -->
    <div class="w-96 bg-white flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Signup</h2>
          <p class="text-sm text-gray-600">Welcome! Register your account for free.</p>
        </div>

        <form @submit.prevent="handleSignup" class="space-y-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              v-model="email"
              type="email"
              placeholder="anilaymilhai@example.com"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">User Name</label>
            <input
              v-model="username"
              type="text"
              placeholder="User Name"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              v-model="password"
              type="password"
              placeholder="Password"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mt-6"
          >
            Register Now
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-6">
          New User?
          <RouterLink to="/login" class="text-green-600 hover:text-green-700 font-medium">Signup</RouterLink>
=======
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
>>>>>>> f69ae3a6fb26a9821f66d3d43182db9f76ac0cf0
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import SignupBG from '@/assets/images/signupBG.jpg'

const router = useRouter()
const email = ref('')
const username = ref('')
const password = ref('')

const handleSignup = () => {
  // Implementasi signup
  console.log('Signup with:', email.value, username.value, password.value)
  router.push({ name: 'home' })
}
</script>

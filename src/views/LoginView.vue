<template>
<<<<<<< HEAD
  <div class="min-h-screen flex bg-gray-900">
    <!-- Left Side - Welcome Section with Background Image -->
    <div class="flex-1 relative overflow-hidden">
      <div
        class="absolute inset-0 bg-cover bg-center bg-no-repeat"
      >
        <img :src="loginBG" alt="Login Background" class="w-full h-full object-cover" />
        <div class="absolute inset-0"></div>
      </div>
      <div class="relative z-10 flex items-center justify-center h-full p-12">
        <div class="text-left">
          <h1 class="text-6xl font-bold text-white mb-4 leading-tight">
            Welcome<br>
            Back!
          </h1>
        </div>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-96 bg-white flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Login</h2>
          <p class="text-sm text-gray-600">Welcome back! Please login to your account.</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-4">
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

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center">
              <input
                v-model="rememberMe"
                type="checkbox"
                class="mr-2 h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span class="text-gray-600">Remember Me</span>
            </label>
            <a href="#" class="text-green-600 hover:text-green-700">Forgot Password?</a>
          </div>

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
=======
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
>>>>>>> f69ae3a6fb26a9821f66d3d43182db9f76ac0cf0
          >
            Login
          </button>
        </form>
<<<<<<< HEAD

        <p class="text-center text-sm text-gray-600 mt-6">
          New User?
          <RouterLink to="/signup" class="text-green-600 hover:text-green-700 font-medium">Signup</RouterLink>
=======
        <p class="text-center text-sm text-gray-600 mt-4">
          Don't have an account?
          <RouterLink to="/signup" class="text-green-500 hover:underline">Sign up</RouterLink>
>>>>>>> f69ae3a6fb26a9821f66d3d43182db9f76ac0cf0
        </p>
      </div>
    </div>
  </div>
</template>

<<<<<<< HEAD
<script setup >
=======
<script setup>
>>>>>>> f69ae3a6fb26a9821f66d3d43182db9f76ac0cf0
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import loginBG from '@/assets/images/loginBG.jpg'

const router = useRouter()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = () => {
<<<<<<< HEAD
  // Implementasi login
  console.log('Login with:', username.value, password.value, 'Remember:', rememberMe.value)
=======
  console.log('Login with:', email.value, password.value)
  // Simulasi redirect ke halaman home setelah login
>>>>>>> f69ae3a6fb26a9821f66d3d43182db9f76ac0cf0
  router.push({ name: 'home' })
}
</script>

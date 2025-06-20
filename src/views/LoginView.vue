<template>
  <div class="min-h-screen flex overflow-hidden bg-gray-900">
    <!-- Left Side - Welcome Section with Background Image -->
    <div class="hidden md:flex flex-1 relative items-center justify-center">
      <img
        :src="loginBG"
        alt="Login Background"
        class="absolute inset-0 w-full h-full object-cover z-0"
      />
      <div class="relative z-10 text-left px-12">
        <h1 class="text-6xl font-bold text-white leading-tight">Welcome<br />Back!</h1>
      </div>
    </div>

    <!-- Right Side - Login Form -->
    <div class="w-full md:w-96 bg-white flex items-center justify-center p-8">
      <div class="w-full max-w-sm">
        <div class="mb-8 flex flex-col items-center">
          <img
            src="@/assets/images/logotesa.png"
            alt="Logo Tesa"
            class="w-50 h-50 mb-4 rounded-full object-cover"
          />
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

          <!-- Error Message (ditambahkan tanpa mengubah desain) -->
          <div v-if="errorMessage" class="text-red-500 text-sm text-center pt-2">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span v-if="!isLoading">Login</span>
            <span v-else>Processing...</span>
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
import loginBG from '@/assets/images/loginBG.jpg'
import axios from 'axios'

const router = useRouter()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    isLoading.value = true
    errorMessage.value = ''

    const response = await axios.post('http://localhost:8000/api/login/', {
      username: username.value,
      password: password.value,
    })

    const { access, refresh, role, ...userData } = response.data

    if (!access || !refresh || !role) {
      throw new Error('Invalid response from server')
    }

    // Pilih storage berdasarkan rememberMe
    const storage = rememberMe.value ? localStorage : sessionStorage
    storage.setItem('access', access)
    storage.setItem('refresh', refresh)
    storage.setItem('userRole', role)
    storage.setItem('userData', JSON.stringify(userData))

    // Redirect berdasarkan role
    router.push({ name: role === 'admin' ? 'admin' : 'home' })

  } catch (error) {
    console.error('Login error:', error)

    if (error.response) {
      // Error dari server
      if (error.response.status === 401) {
        errorMessage.value = 'Invalid username or password'
      } else {
        errorMessage.value = `Server error: ${error.response.status}`
      }
    } else if (error.request) {
      // Tidak dapat terhubung ke server
      errorMessage.value = 'Cannot connect to server'
    } else {
      // Error lainnya
      errorMessage.value = error.message || 'Login failed'
    }

  } finally {
    isLoading.value = false
  }
}
</script>

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

          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
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
import loginBG from '@/assets/images/loginBG.jpg'
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const username = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/login/', {
      username: username.value,
      password: password.value,
    })
    const data = response.data

    // Ambil data user dari endpoint misalnya /api/me/
    const profileRes = await axios.get('http://localhost:8000/api/me/', {
      headers: {
        Authorization: `Bearer ${data.access}`,
      },
    })
    const user = profileRes.data

    // Hapus user sebelumnya dulu
    localStorage.removeItem('user')
    sessionStorage.removeItem('user')

    // Simpan token JWT ke localStorage atau sessionStorage
    if (rememberMe.value) {
      localStorage.setItem('access', data.access)
      localStorage.setItem('refresh', data.refresh)
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      sessionStorage.setItem('access', data.access)
      sessionStorage.setItem('refresh', data.refresh)
      sessionStorage.setItem('user', JSON.stringify(user))
    }
    router.push({ name: 'home' })
  } catch {
    alert('Login gagal! Username atau password salah.')
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-left text-gray-800">Login!</h2>
      <h1 class="text-sm text-gray-500">Welcome back! please login to your account</h1>
      <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">Login</button>
      </form>
      <p class="text-center text-sm text-gray-600 mt-4">
        Don't have an account?
        <RouterLink to="/signup" class="text-green-500 hover:underline">Sign up</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('')
const password = ref('')

const handleLogin = () => {
  // Implementasi login, contoh redirect
  console.log('Login with:', email.value, password.value)
  router.push({ name: 'home' })
}
</script>

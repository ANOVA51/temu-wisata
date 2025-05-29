<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">Create Account</h2>
      <form @submit.prevent="handleSignup" class="space-y-4">
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
          <input v-model="name" type="text" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input v-model="email" type="email" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <div>
          <label class="block text-sm font-semibold text-gray-700 mb-1">Password</label>
          <input v-model="password" type="password" required class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400" />
        </div>
        <button type="submit" class="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition">Sign Up</button>
      </form>
      <p class="text-center text-sm text-gray-600 mt-4">
        Already have an account?
        <RouterLink to="/login" class="text-green-500 hover:underline">Login</RouterLink>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { createUser } from '@/services/api'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')

const handleSignup = async () => {
    const userData = { username: name.value, email: email.value, password_hash: password.value };

    try {
        const response = await createUser(userData);

        if (response && response.data) {
            router.push({ name: "home" });  // Pindah ke halaman Home jika berhasil
        } else {
            alert("Terjadi kesalahan saat signup. Silakan coba lagi!");
        }
    } catch (error) {
        alert("Gagal signup. Silakan cek kembali data yang dimasukkan!");
    }
};
</script>

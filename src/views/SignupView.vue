<template>
  <div class="w-screen h-screen flex overflow-hidden">
    <!-- Left side: Gambar dan Teks -->
    <div class="hidden md:flex w-1/2 items-center justify-center relative">
      <img :src="SignupBG" class="object-cover w-full h-full" alt="Signup Background" />
      <div class="absolute z-10 px-10">
        <h2 class="text-black text-6xl font-bold text-start">
          Signup <br>
          <span class="text-black text-5xl font-semibold">Join Us!</span>
        </h2>
      </div>
    </div>

    <!-- Right side: Form Signup -->
    <div class="flex w-full md:w-1/2 items-center justify-center bg-white p-8">
      <div class="w-full max-w-sm">
        <h2 class="text-3xl font-bold mb-2 text-gray-800">Signup</h2>
        <p class="text-sm text-gray-600 mb-6">Welcome! Register your account for free.</p>
        <form @submit.prevent="handleSignup" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              v-model="email"
              type="email"
              required
              placeholder="you@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              v-model="username"
              type="text"
              required
              placeholder="yourusername"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              v-model="password"
              type="password"
              required
              placeholder="••••••••"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            class="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Register Now
          </button>
        </form>

        <p class="text-center text-sm text-gray-600 mt-6">
          Already have an account?
          <RouterLink to="/login" class="text-green-600 hover:underline font-medium">Login</RouterLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import SignupBG from '@/assets/images/signupBG.jpg'
import { createUser } from '@/services/api'

const router = useRouter()
const email = ref('')
const username = ref('')
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
    } catch  {
        alert("Gagal signup. Silakan cek kembali data yang dimasukkan!");
    }
};
</script>

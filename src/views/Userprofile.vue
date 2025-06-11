<script setup>
import { ref, reactive, onMounted } from 'vue'
import penari from '@/assets/images/penari.jpg'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const currentView = ref('dashboard')
const menuItems = [
  { label: 'Dashboard', key: 'dashboard' },
  { label: 'Favorite Destination', key: 'Favorite' },
  { label: 'Settings', key: 'settings' },
  { label: 'Logout', key: 'logout' }
]

// State user
const user = reactive({
  username: '',
  email: '',
  no_hp: '',
  alamat: '',
  foto_profile: '',
})

const profilePreview = ref('')
const editMode = ref(false)
const password1 = ref('')
const password2 = ref('')
const passwordError = ref('')

onMounted(async () => {
  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  if (!token) {
    router.push({ name: 'login' })
    return
  }
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    Object.assign(user, res.data.data)
    profilePreview.value = user.foto_profile
      ? (user.foto_profile.startsWith('http') ? user.foto_profile : `http://127.0.0.1:8000${user.foto_profile}`)
      : penari
  } catch (e) {
    alert('Gagal mengambil data user')
    profilePreview.value = penari
  }
})

function handleLogout() {
  localStorage.removeItem('access')
  localStorage.removeItem('refresh')
  sessionStorage.removeItem('access')
  sessionStorage.removeItem('refresh')
  router.push({ name: 'home' })
}

function selectMenu(key) {
  if (key === 'logout') {
    handleLogout()
    return
  }
  currentView.value = key
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    user.foto_profile = file
    const reader = new FileReader()
    reader.onload = ev => {
      profilePreview.value = ev.target.result
    }
    reader.readAsDataURL(file)
  }
}

async function updateProfile() {
  passwordError.value = ''
  if (password1.value !== password2.value) {
    passwordError.value = 'Password baru dan konfirmasi tidak sama!'
    return
  }

  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  const formData = new FormData()
  formData.append('username', user.username)
  formData.append('no_hp', user.no_hp)
  formData.append('alamat', user.alamat)
  if (user.foto_profile instanceof File) formData.append('foto_profile', user.foto_profile)
  if (password1.value) formData.append('password', password1.value)

  try {
    await axios.put('http://127.0.0.1:8000/api/users/me/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      }
    })
    alert('Profile updated!')
    editMode.value = false
    password1.value = ''
    password2.value = ''
    passwordError.value = ''
  } catch (e) {
    alert('Gagal update profile')
  }
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside class="w-64 bg-gradient-to-b from-green-400 to-white shadow-lg p-6 space-y-8 hidden md:block">
      <!-- User Profile -->
      <div class="text-center">
        <img
          :src="profilePreview"
          alt="User Avatar"
          class="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring ring-indigo-300"
        />
        <h2 class="text-lg font-semibold">Edit Profile</h2>
      </div>

      <!-- Navigation Menu -->
      <nav class="space-y-2 pt-4">
        <button
          v-for="item in menuItems"
          :key="item.key"
          @click="selectMenu(item.key)"
          class="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all"
        >
          {{ item.label }}
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <section v-if="currentView === 'dashboard'">
        <div class="max-w-md mx-auto bg-white p-6 rounded-lg shadow">
          <h2 class="text-xl font-semibold mb-4 text-center">User Profile</h2>
          <form class="space-y-4" @submit.prevent="updateProfile">
            <div class="flex justify-center">
              <img
                :src="profilePreview"
                alt="User Avatar"
                class="w-24 h-24 rounded-full object-cover ring ring-indigo-300"
              />
            </div>
            <div v-if="editMode">
              <label class="block mb-1 font-medium">Profile Photo</label>
              <input type="file" accept="image/*" @change="handleFileChange" class="w-full" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Username</label>
              <input v-model="user.username" :readonly="!editMode" type="text" class="w-full border p-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Email</label>
              <input v-model="user.email" type="email" class="w-full border p-2 rounded bg-gray-100" readonly />
            </div>
            <div>
              <label class="block mb-1 font-medium">Phone Number</label>
              <input v-model="user.no_hp" :readonly="!editMode" type="text" class="w-full border p-2 rounded" />
            </div>
            <div>
              <label class="block mb-1 font-medium">Address</label>
              <input v-model="user.alamat" :readonly="!editMode" type="text" class="w-full border p-2 rounded" />
            </div>
            <div v-if="editMode">
              <label class="block mb-1 font-medium">New Password</label>
              <input v-model="password1" type="password" class="w-full border p-2 rounded" placeholder="New password" />
              <input v-model="password2" type="password" class="w-full border p-2 rounded mt-2" placeholder="Confirm new password" />
              <div v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</div>
            </div>
            <div class="flex justify-end gap-2 mt-4">
              <button
                v-if="!editMode"
                type="button"
                @click="editMode = true"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >Edit</button>
              <button
                v-if="editMode"
                type="submit"
                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >Update</button>
              <button
                v-if="editMode"
                type="button"
                @click="() => { editMode = false; password1 = ''; password2 = ''; passwordError = '' }"
                class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >Cancel</button>
            </div>
          </form>
        </div>
      </section>

      <section v-if="currentView === 'Favorite'">
        <p>Ini adalah halaman Favorite.</p>
      </section>

      <section v-if="currentView === 'settings'">
        <p>Ini adalah halaman Settings.</p>
      </section>
    </main>
  </div>
</template>

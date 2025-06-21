<script setup>
import penari from '@/assets/images/penari.jpg'
import love from '@/components/icons/filledLove.vue'
import logout from '@/components/icons/logout.vue'
import profile from '@/components/icons/profile.vue'
import loveoutline from '@/components/icons/loveoutline.vue'
import axios from 'axios'
import { onMounted, reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentView = ref('dashboard')
const menuItems = [
  { label: 'Profile', key: 'Edit', icon:profile },
  { label: 'Favorite Destination', key: 'Favorite', icon:love},
  { label: 'Logout', key: 'logout', icon:logout},
  { label: 'back', key: 'back', },
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

const favoriteSpots = ref([])
const favoriteSpotIds = ref([])
const loadingFavorite = ref(true)
const showFavoriteModal = ref(false)
const selectedFavoriteSpot = ref(null)

onMounted(async () => {
  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  if (!token) {
    router.push({ name: 'login' })
    return
  }
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` },
    })
    Object.assign(user, res.data.data)
    profilePreview.value = user.foto_profile
      ? user.foto_profile.startsWith('http')
        ? user.foto_profile
        : `http://127.0.0.1:8000${user.foto_profile}`
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
function goBack() {
  router.back({ name: 'home' })
}

function selectMenu(key) {
  if (key === 'logout') {
    handleLogout()
    return
  } else if (key === 'back') {
    goBack()
    return
  }
  currentView.value = key
}

function handleFileChange(e) {
  const file = e.target.files[0]
  if (file) {
    user.foto_profile = file // Simpan File, bukan string
    const reader = new FileReader()
    reader.onload = (ev) => {
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
  // Kirim file jika user memilih gambar baru
  if (user.foto_profile instanceof File) {
    formData.append('foto_profile', user.foto_profile)
  } else if (user.foto_profile) {
    // Kirim nama file lama jika tidak ada perubahan gambar
    formData.append('default_profile.jpg', user.foto_profile)
  }
  if (password1.value) formData.append('password', password1.value)

  try {
    await axios.put('http://127.0.0.1:8000/api/users/me/update/', formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    // Fetch ulang data user terbaru
    const res = await axios.get('http://127.0.0.1:8000/api/users/me/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    // Simpan ke sessionStorage (atau localStorage jika pakai rememberMe)
    sessionStorage.setItem('userData', JSON.stringify(res.data.data))
    // Jika pakai localStorage:
    // localStorage.setItem('userData', JSON.stringify(res.data.data))

    alert('Profile updated!')
    editMode.value = false
    password1.value = ''
    password2.value = ''
    passwordError.value = ''
    // Update preview foto jika berubah
    profilePreview.value = res.data.data.foto_profile
      ? res.data.data.foto_profile.startsWith('http')
        ? res.data.data.foto_profile
        : `http://127.0.0.1:8000${res.data.data.foto_profile}`
      : penari
  } catch (e) {
    alert('Gagal update profile')
  }
}

async function fetchFavorites() {
  loadingFavorite.value = true
  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  try {
    const res = await axios.get('http://127.0.0.1:8000/api/favorites/', {
      headers: { Authorization: `Bearer ${token}` }
    })
    favoriteSpots.value = res.data.favorites
    favoriteSpotIds.value = res.data.favorites.map(fav => fav.spot_id)
  } catch (e) {
    favoriteSpots.value = []
    favoriteSpotIds.value = []
  }
  loadingFavorite.value = false
}

// Panggil saat menu Favorite dibuka
watch(currentView, (val) => {
  if (val === 'Favorite') fetchFavorites()
})

async function toggleFavorite(spot) {
  const token = localStorage.getItem('access') || sessionStorage.getItem('access')
  if (!token) {
    alert('Silakan login untuk menambah destinasi favorit.')
    router.push('/login')
    return
  }
  if (isFavorite(spot)) {
    // Unlike
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/favorites/remove/${spot.spot_id}/`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      favoriteSpotIds.value = favoriteSpotIds.value.filter(id => id !== spot.spot_id)
      // Jangan hapus dari favoriteSpots.value, biarkan tetap tampil
    } catch (e) {
      alert('Gagal menghapus dari favorit')
    }
  } else {
    // Like
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/favorites/add/${spot.spot_id}/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      favoriteSpotIds.value.push(spot.spot_id)
      // Ambil ulang data favorit agar sinkron
      fetchFavorites()
    } catch (e) {
      alert('Gagal menambah ke favorit')
    }
  }
}

function isFavorite(spot) {
  return favoriteSpotIds.value.includes(spot.spot_id)
}
const favoriteModalImages = ref([])
const favoriteModalCurrentIndex = ref(0)

function openFavoriteModal(spot) {
  selectedFavoriteSpot.value = spot
  showFavoriteModal.value = true
  favoriteModalImages.value = spot.images
    ? spot.images.map(img => `http://127.0.0.1:8000${img.file_name}`)
    : []
  favoriteModalCurrentIndex.value = 0
}
function closeFavoriteModal() {
  showFavoriteModal.value = false
  selectedFavoriteSpot.value = null
}
function nextFavoriteImage() {
  if (!favoriteModalImages.value.length) return
  favoriteModalCurrentIndex.value = (favoriteModalCurrentIndex.value + 1) % favoriteModalImages.value.length
}
</script>

<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <aside
      class="w-64 bg-gradient-to-b from-green-400 to-white shadow-lg p-6 space-y-8 hidden md:block"
    >
      <!-- User Profile -->
      <div class="text-center">
        <img
          :src="profilePreview"
          alt="User Avatar"
          class="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring ring-indigo-300"
        />
      </div>

      <!-- Navigation Menu -->
      <nav class="space-y-2 pt-4">
        <button
          v-for="item in menuItems"
          :key="item.key"
          @click="selectMenu(item.key)"
          class="w-full text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all flex justify-between items-center"
        >
          <span>{{ item.label }}</span>
          <component v-if="item.icon" :is="item.icon" class="w-6 h-6"/>
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6">
      <!--edit profile-->
      <section v-if="currentView === 'Edit'">
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
              <input
                v-model="user.username"
                :readonly="!editMode"
                type="text"
                class="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label class="block mb-1 font-medium">Email</label>
              <input
                v-model="user.email"
                type="email"
                class="w-full border p-2 rounded bg-gray-100"
                readonly
              />
            </div>
            <div>
              <label class="block mb-1 font-medium">Phone Number</label>
              <input
                v-model="user.no_hp"
                :readonly="!editMode"
                type="text"
                class="w-full border p-2 rounded"
              />
            </div>
            <div>
              <label class="block mb-1 font-medium">Address</label>
              <input
                v-model="user.alamat"
                :readonly="!editMode"
                type="text"
                class="w-full border p-2 rounded"
              />
            </div>
            <div v-if="editMode">
              <label class="block mb-1 font-medium">New Password</label>
              <input
                v-model="password1"
                type="password"
                class="w-full border p-2 rounded"
                placeholder="New password"
              />
              <input
                v-model="password2"
                type="password"
                class="w-full border p-2 rounded mt-2"
                placeholder="Confirm new password"
              />
              <div v-if="passwordError" class="text-red-500 text-sm mt-1">{{ passwordError }}</div>
            </div>
            <div class="flex justify-end gap-2 mt-4">
              <button
                v-if="!editMode"
                type="button"
                @click="editMode = true"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Edit
              </button>
              <button
                v-if="editMode"
                type="submit"
                class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Update
              </button>
              <button
                v-if="editMode"
                type="button"
                @click="
                  () => {
                    editMode = false
                    password1 = ''
                    password2 = ''
                    passwordError = ''
                  }
                "
                class="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </section>


      <section v-if="currentView === 'Favorite'">
        <h2 class="text-2xl font-bold mb-4">Favorite Destinations</h2>
        <div v-if="loadingFavorite" class="text-center py-10">Loading...</div>
        <div v-else>
          <div v-if="favoriteSpots.length === 0" class="text-center text-gray-500 py-10">
            Belum ada destinasi favorit.
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="spot in favoriteSpots"
              :key="spot.spot_id"
              class="relative bg-white rounded-xl overflow-hidden h-96 shadow-md hover:scale-105 transition cursor-pointer"
              @click="openFavoriteModal(spot)"
            >
              <button
                @click.stop="toggleFavorite(spot)"
                class="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:scale-110 transition z-20"
              >
                <component :is="isFavorite(spot) ? love : loveoutline" class="w-7 h-7"/>
              </button>
              <img
                :src="spot.images && spot.images.length ? `http://127.0.0.1:8000${spot.images[0].file_name}` : ''"
                :alt="spot.name"
                class="w-full h-full object-cover"
              />
              <div class="absolute z-10 inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent text-white px-4 py-6 flex flex-col justify-end">
                <div class="font-bold text-lg">{{ spot.name }}</div>
                <div class="text-sm">{{ spot.kota }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal Detail -->
        <div
          v-if="showFavoriteModal"
          class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          @click.self="closeFavoriteModal"
          data-aos="zoom-in"
        >
          <div
            class="bg-white rounded-xl p-8 w-full max-w-5xl shadow-lg flex flex-col md:flex-row gap-10 items-center relative"
          >
            <!-- Gambar carousel style klik untuk next, tampilkan semua gambar -->
            <div class="flex flex-col items-center w-full md:w-1/2">
              <div
                class="relative w-full max-w-[360px] mx-auto h-[250px] cursor-pointer"
                @click="nextFavoriteImage"
              >
                <div class="relative w-full h-full">
                  <div
                    v-for="(img, index) in favoriteModalImages"
                    :key="img"
                    class="absolute top-0 transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-lg"
                    :class="[
                      index === favoriteModalCurrentIndex
                        ? 'z-30 scale-100 left-0'
                        : index === (favoriteModalCurrentIndex + 1) % favoriteModalImages.length
                          ? 'z-20 scale-95 left-[25%]'
                          : 'z-10 scale-90 left-[25%]',
                    ]"
                    style="width: 100%; height: 100%"
                  >
                    <img
                      :src="img"
                      class="w-full h-full object-cover rounded-xl"
                      :alt="`Image ${index + 1}`"
                    />
                  </div>
                </div>
              </div>
              <div class="text-xs text-gray-500 mt-2">
                Klik gambar untuk melihat selanjutnya ({{ favoriteModalCurrentIndex + 1 }}/{{ favoriteModalImages.length }})
              </div>
            </div>
            <!-- Right: Details -->
            <div class="flex-1 flex flex-col justify-between w-full md:w-1/2">
              <div>
                <div class="text-2xl font-bold text-gray-700 mb-2">{{ selectedFavoriteSpot.name }}</div>
                <div class="text-base text-gray-800 mb-4  whitespace-pre-line break-words">{{ selectedFavoriteSpot.description }}</div>
                <div class="mb-2">
                  <span class="font-semibold">Kategori:</span>
                  <span>{{ selectedFavoriteSpot.category }}</span>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Fasilitas:</span>
                  <span>{{ selectedFavoriteSpot.fasilitas }}</span>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Harga:</span>
                  <span>
                    Rp{{ Number(selectedFavoriteSpot.price_min).toLocaleString() }} - Rp{{ Number(selectedFavoriteSpot.price_max).toLocaleString() }}
                  </span>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Alamat:</span>
                  <span>
                    {{ selectedFavoriteSpot.address }},
                    {{ selectedFavoriteSpot.desa }},
                    {{ selectedFavoriteSpot.kecamatan }},
                    {{ selectedFavoriteSpot.kota }}
                  </span>
                </div>
                <div class="mb-2">
                  <span class="font-semibold">Google Maps:</span>
                  <a
                    :href="selectedFavoriteSpot.google_maps_url"
                    target="_blank"
                    class="text-green-600 underline break-all"
                  >{{ selectedFavoriteSpot.google_maps_url }}</a>
                </div>
              </div>
              <button
                @click="closeFavoriteModal"
                class="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

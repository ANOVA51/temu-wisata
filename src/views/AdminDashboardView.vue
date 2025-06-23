<script setup>
import { ref, watch, onMounted } from 'vue'
import Swal from 'sweetalert2'
import router from '@/router'

const active = ref('dashboard')
const direction = ref('right')
// State baru untuk hamburger menu
const isMobileMenuOpen = ref(false)

// Deteksi arah perpindahan
const lastIndex = ref(0)
// Diperhatikan: 'report-wisata' masih dikomentari di template HTML
const menuList = ['dashboard', 'wisata-manage', 'confirm-wisata', 'report-wisata', 'user-manage']

watch(active, (newVal, oldVal) => {
  const newIndex = menuList.indexOf(newVal)
  const oldIndex = menuList.indexOf(oldVal)
  direction.value = newIndex > oldIndex ? 'right' : 'left'
  lastIndex.value = newIndex
  // Tutup menu mobile/tablet setelah navigasi
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false
  }
})

// Data
const selectedWisata = ref({})
const selectedReport = ref(null)
const showReportModal = ref(false)
const showWisataModal = ref(false)

const wisataList = ref([])

// Tambahan: untuk gambar detail
const selectedWisataImages = ref([])
const selectedImageIndex = ref(0)

const pendingWisata = ref([
  {
    id: 7,
    name: 'Ulun Danu Beratan',
    category: 'Temple',
    location: 'Bali',
    image: '/api/placeholder/300/200',
  },
  {
    id: 8,
    name: 'Goa Gong',
    category: 'Cave',
    location: 'Ponorogo',
    image: '/api/placeholder/300/200',
  },
  {
    id: 9,
    name: 'Air Terjun Sekumpul',
    category: 'Waterfall',
    location: 'Buleleng',
    image: '/api/placeholder/300/200',
  },
  {
    id: 10,
    name: 'Ulun Danu Beratan',
    category: 'Temple',
    location: 'Bali',
    image: '/api/placeholder/300/200',
  },
  {
    id: 11,
    name: 'Goa Gong',
    category: 'Cave',
    location: 'Ponorogo',
    image: '/api/placeholder/300/200',
  },
  {
    id: 12,
    name: 'Air Terjun Sekumpul',
    category: 'Waterfall',
    location: 'Buleleng',
    image: '/api/placeholder/300/200',
  },
])

const reportData = ref([
  {
    id: 1,
    location: 'Jawa Timur',
    name: 'Goa Gong',
    status: 'pending',
    reporter: 'user_name',
    date: 'Dec 01 2021',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    location: 'Bali',
    name: 'Ulun Danu',
    status: 'approved',
    reporter: 'admin_user',
    date: 'Nov 28 2021',
    description: 'Location verified and approved for listing. All information has been validated.',
  },
  {
    id: 3,
    location: 'Bali',
    name: 'Air Terjun Sekumpul',
    status: 'rejected',
    reporter: 'test_user',
    date: 'Nov 25 2021',
    description: 'Report rejected due to insufficient information provided.',
  },
])

const userData = ref([])

onMounted(async () => {
  try {
    const res = await fetch('http://127.0.0.1:8000/api/users/all/')
    const json = await res.json()
    userData.value = json.data.map((u) => ({
      id: u.user_id,
      username: u.username,
      email: u.email,
      role: u.role,
    }))
  } catch (e) {
    userData.value = []
  }
})

const userCount = ref(0)
const verifiedSpotCount = ref(0)

onMounted(async () => {
  try {
    // Ambil data wisata terverifikasi dari API
    const res = await fetch('http://localhost:8000/api/touristspots/all/')
    const data = await res.json()
    // Filter hanya yang verified
    wisataList.value = data.data
      .filter((w) => w.is_verified)
      .map((w) => ({
        id: w.spot_id,
        name: w.name,
        category: w.category,
        price:
          w.price_min === w.price_max
            ? `Rp${Number(w.price_min).toLocaleString()}`
            : `Rp${Number(w.price_min).toLocaleString()} - Rp${Number(w.price_max).toLocaleString()}`,
        rating: w.rating ?? '-',
        address: `${w.address}, ${w.desa}, ${w.kecamatan}, ${w.kota}`,
        description: w.description,
        mapsLink: w.google_maps_url,
        uploader: w.user_id?.username ?? '-',
        images: w.images, // <-- simpan array gambar asli
      }))

    // Pending wisata: hanya yang is_verified === false
    const pendingRes = await fetch('http://localhost:8000/api/touristspots/all/')
    const pendingData = await pendingRes.json()
    // Filter hanya yang belum diverifikasi
    pendingWisata.value = pendingData.data
      .filter((w) => !w.is_verified)
      .map((w) => ({
        id: w.spot_id,
        name: w.name,
        category: w.category,
        address: `${w.address}, ${w.desa}, ${w.kecamatan}, ${w.kota}`,
        description: w.description,
        price:
          w.price_min === w.price_max
            ? `Rp${Number(w.price_min).toLocaleString()}`
            : `Rp${Number(w.price_min).toLocaleString()} - Rp${Number(w.price_max).toLocaleString()}`,
        rating: w.rating ?? '-',
        mapsLink: w.Maps_url,
        uploader: w.user_id?.username ?? '-',
        images: w.images,
      }))

    // ...userCount & verifiedSpotCount tetap...
    const userRes = await fetch('http://localhost:8000/api/users/count/')
    const spotRes = await fetch('http://localhost:8000/api/touristspots/count-verified/')
    const userData = await userRes.json()
    const spotData = await spotRes.json()
    userCount.value = userData.total_users
    verifiedSpotCount.value = spotData.total_verified_tourist_spots
  } catch (e) {
    wisataList.value = []
    userCount.value = 0
    verifiedSpotCount.value = 0
  }
})

// Methods
const viewWisataDetail = (wisata) => {
  showReportModal.value = false
  showAdminReply.value = false
  selectedWisata.value = wisata
  if (wisata.images && wisata.images.length > 0) {
    selectedWisataImages.value = wisata.images.map((img) => `http://localhost:8000${img.file_name}`)
    selectedImageIndex.value = 0
  } else {
    selectedWisataImages.value = []
    selectedImageIndex.value = 0
  }
  showWisataModal.value = true
}

const closeWisataModal = () => {
  showWisataModal.value = false
}

const approveWisata = async (wisata) => {
  try {
    const response = await fetch(`http://localhost:8000/api/touristspots/${wisata.id}/update/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        // Tambahkan Authorization jika perlu
      },
      body: JSON.stringify({ is_verified: true }),
    })
    if (!response.ok) throw new Error('Gagal approve di backend')
    // Hapus dari list frontend setelah sukses
    pendingWisata.value = pendingWisata.value.filter((w) => w.id !== wisata.id)
  } catch (e) {
    alert('Gagal approve wisata ke backend')
  }
}

const rejectWisata = async (wisata) => {
  try {
    const response = await fetch(`http://localhost:8000/api/touristspots/${wisata.id}/delete/`, {
      method: 'DELETE',
    })
    if (!response.ok) throw new Error('Gagal delete di backend')
    pendingWisata.value = pendingWisata.value.filter((w) => w.id !== wisata.id)
  } catch (e) {
    alert('Gagal menghapus wisata di backend')
  }
}

const viewReportDetail = (report) => {
  selectedReport.value = report
  showReportModal.value = true
}

const showAdminReply = ref(false)
const adminReply = ref('')

const approveReport = () => {
  showAdminReply.value = true
}

const submitAdminReply = () => {
  if (selectedReport.value) {
    selectedReport.value.status = 'approved'
    // Simpan pesan admin jika perlu
    showReportModal.value = false
    showAdminReply.value = false
    adminReply.value = ''
  }
}

const rejectReport = () => {
  if (selectedReport.value) {
    selectedReport.value.status = 'rejected'
    showReportModal.value = false
  }
}

// User Manage Actions
const approveUser = (user) => {
  Swal.fire({
    icon: 'success',
    html: `
      <div style="font-size:2rem;font-weight:600;margin:1rem 0;">User Approved!</div>
      <div style="font-size:1.2rem;color:#666;">User berhasil diaktifkan</div>
    `,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    customClass: {
      popup: 'swal2-popup-custom',
      confirmButton: 'swal2-confirm-custom',
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: (popup) => {
      if (Swal.isVisible() && typeof popup.draggable !== 'undefined') {
        popup.draggable = true
      }
    },
  })
  user.status = 'active'
}

const setUserPending = (user) => {
  Swal.fire({
    icon: 'warning',
    html: `
      <div style="font-size:2rem;font-weight:600;margin:1rem 0;">User Pending!</div>
      <div style="font-size:1.2rem;color:#666;">Status user diubah menjadi pending</div>
    `,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    customClass: {
      popup: 'swal2-popup-custom',
      confirmButton: 'swal2-confirm-custom',
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: (popup) => {
      if (Swal.isVisible() && typeof popup.draggable !== 'undefined') {
        popup.draggable = true
      }
    },
  })
  user.status = 'pending'
}

const rejectUser = (user) => {
  Swal.fire({
    icon: 'error',
    html: `
      <div style="font-size:2rem;font-weight:600;margin:1rem 0;">User Rejected!</div>
      <div style="font-size:1.2rem;color:#666;">User berhasil dinonaktifkan</div>
    `,
    showConfirmButton: true,
    confirmButtonText: 'OK',
    customClass: {
      popup: 'swal2-popup-custom',
      confirmButton: 'swal2-confirm-custom',
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: (popup) => {
      if (Swal.isVisible() && typeof popup.draggable !== 'undefined') {
        popup.draggable = true
      }
    },
  })
  user.status = 'inactive'
}

function goToUpdateWisata(id) {
  sessionStorage.setItem('update_spot_id', id)
  // Pastikan route ke form update TIDAK pakai param id
  // Contoh: /form-update-wisata
  router.push({ name: 'formupdate' })
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <div
      v-if="isMobileMenuOpen"
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
      @click="isMobileMenuOpen = false"
    ></div>

    <aside
      :class="[
        'fixed inset-y-0 left-0 w-72 bg-green-600 text-white flex flex-col z-50 transform transition-transform duration-300',
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
        'lg:relative lg:translate-x-0 lg:block', // Sidebar visible on large screens (desktop/large tablets)
      ]"
    >
      <div class="p-8 text-center border-b border-white/20">
        <h1 class="text-5xl font-extrabold tracking-widest">TESA</h1>
        <p class="text-sm mt-2 font-light">"Temu Wisata Admin Dashboard"</p>
      </div>
      <nav class="flex-1 px-6 py-6 space-y-4">
        <div
          @click="active = 'dashboard'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'dashboard'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-view-dashboard mr-3 text-2xl"></i>
          <span class="font-semibold text-lg">Dashboard</span>
        </div>
        <div
          @click="active = 'wisata-manage'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'wisata-manage'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-map-marker-multiple mr-3 text-2xl"></i>
          <span class="font-semibold text-lg">Wisata Manage</span>
          <span
            class="ml-auto bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full"
            >{{ wisataList.length }}</span
          >
        </div>
        <div
          @click="active = 'confirm-wisata'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'confirm-wisata'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-check-circle mr-3 text-2xl"></i>
          <span class="font-semibold text-lg">Confirm Wisata</span>
          <span
            class="ml-auto bg-yellow-100 text-yellow-700 text-xs font-bold px-2 py-1 rounded-full"
            >{{ pendingWisata.length }}</span
          >
        </div>
        <div
          @click="active = 'user-manage'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'user-manage'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-account-group mr-3 text-2xl"></i>
          <span class="font-semibold text-lg">User Manage</span>
        </div>
      </nav>
    </aside>

    <main
      class="flex-1 p-4 sm:p-6 md:p-10 relative overflow-hidden bg-white rounded-tr-3xl rounded-br-3xl pt-16 lg:pt-10"
    >
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="fixed top-4 left-4 z-50 p-2 rounded-md bg-green-600 text-white lg:hidden"
      >
        <i :class="isMobileMenuOpen ? 'mdi mdi-close text-2xl' : 'mdi mdi-menu text-2xl'"></i>
      </button>

      <div v-if="active === 'user-manage'">
        <h2 class="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-green-700 mb-2">
          User Manage
        </h2>
        <div class="text-base sm:text-lg font-semibold text-green-700 mb-6">
          {{ userData.length }} User Found
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full rounded-lg">
            <thead>
              <tr class="bg-green-100">
                <th
                  class="py-3 px-3 sm:px-6 text-left font-semibold text-sm sm:text-base whitespace-nowrap"
                >
                  <i class="mdi mdi-account-circle mr-2"></i>User Name
                </th>
                <th
                  class="py-3 px-3 sm:px-6 text-left font-semibold text-sm sm:text-base whitespace-nowrap"
                >
                  Email
                </th>
                <th
                  class="py-3 px-3 sm:px-6 text-left font-semibold text-sm sm:text-base whitespace-nowrap"
                >
                  Role
                </th>
                <th
                  class="py-3 px-3 sm:px-6 text-left font-semibold text-sm sm:text-base whitespace-nowrap"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in userData" :key="user.id" class="border-b hover:bg-green-50">
                <td
                  class="py-3 px-3 sm:px-6 flex items-center text-sm sm:text-base whitespace-nowrap"
                >
                  <i class="mdi mdi-account-circle mr-2 text-xl"></i>
                  {{ user.username }}
                </td>
                <td class="py-3 px-3 sm:px-6 text-sm sm:text-base whitespace-nowrap">
                  {{ user.email }}
                </td>
                <td class="py-3 px-3 sm:px-6 text-sm sm:text-base whitespace-nowrap">
                  {{ user.role }}
                </td>
                <td
                  class="py-3 px-3 sm:px-6 flex items-center space-x-1 sm:space-x-2 whitespace-nowrap"
                >
                  <button
                    class="text-green-600 hover:text-green-800 p-1"
                    @click="approveUser(user)"
                  >
                    <i class="mdi mdi-check-circle-outline text-xl"></i>
                  </button>
                  <button
                    class="text-yellow-600 hover:text-yellow-800 p-1"
                    @click="setUserPending(user)"
                  ></button>
                  <button class="text-red-600 hover:text-red-800 p-1" @click="rejectUser(user)">
                    <i class="mdi mdi-close-circle-outline text-xl"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div v-else-if="active === 'dashboard'">
        <h2 class="text-3xl font-bold text-green-700 mb-6">Dashboard</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">User</p>
                <p class="text-3xl font-bold text-green-700">{{ userCount }}</p>
              </div>
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <i class="mdi mdi-account text-2xl text-blue-600"></i>
              </div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-lg shadow-md">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-gray-600 mb-1">Location</p>
                <p class="text-3xl font-bold text-green-700">{{ verifiedSpotCount }}</p>
              </div>
              <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <i class="mdi mdi-map-marker text-2xl text-green-600"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="active === 'wisata-manage'">
        <h2 class="text-3xl font-bold text-green-700 mb-6">Wisata Manage</h2>
        <div class="text-lg font-semibold text-green-700 mb-6">{{ wisataList.length }} Wisata</div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="wisata in wisataList"
            :key="wisata.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div
              class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
            >
              <img
                v-if="wisata.images && wisata.images.length > 0"
                :src="`http://localhost:8000${wisata.images[0].file_name}`"
                class="object-cover h-full w-full"
                alt="wisata"
              />
              <i v-else class="mdi mdi-image text-4xl text-white opacity-50"></i>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-800 mb-2">{{ wisata.name }}</h3>
              <p class="text-sm text-gray-600 mb-3">{{ wisata.category }}</p>
              <div class="flex space-x-2">
                <button
                  @click="viewWisataDetail(wisata)"
                  class="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                >
                  View Detail
                </button>
                <button
                  class="px-3 py-1 bg-gray-500 text-white text-xs rounded hover:bg-gray-600 transition-colors"
                  @click="goToUpdateWisata(wisata.id)"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="active === 'confirm-wisata'">
        <h2 class="text-3xl font-bold text-green-700 mb-6">Confirm Wisata</h2>
        <div class="text-lg font-semibold text-green-700 mb-6">
          {{ pendingWisata.length }} Pending Wisata
        </div>
        <div
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-screen overflow-y-auto pr-2"
        >
          <div
            v-for="wisata in pendingWisata"
            :key="wisata.id"
            class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            @click="viewWisataDetail(wisata)"
          >
            <div
              class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
            >
              <img
                v-if="wisata.images && wisata.images.length > 0"
                :src="`http://localhost:8000${wisata.images[0].file_name}`"
                class="object-cover h-full w-full"
                alt="wisata"
              />
              <i v-else class="mdi mdi-image text-4xl text-white opacity-50"></i>
            </div>
            <div class="p-4">
              <h3 class="font-semibold text-gray-800 mb-2">{{ wisata.name }}</h3>
              <p class="text-sm text-gray-600 mb-1">{{ wisata.category }}</p>
              <p class="text-xs text-gray-500 mb-3">{{ wisata.address }}</p>
              <div class="flex space-x-2">
                <button
                  @click.stop="approveWisata(wisata)"
                  class="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                >
                  Approve
                </button>
                <button
                  @click.stop="rejectWisata(wisata)"
                  class="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-else-if="active === 'report-wisata'">
        <h2 class="text-3xl font-bold text-green-700 mb-6">Wisata Report</h2>
        <div class="text-lg font-semibold text-green-700 mb-6">{{ reportData.length }} Report</div>

        <div class="bg-white rounded-lg shadow-md overflow-hidden">
          <div class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr class="bg-gray-50 border-b border-gray-200">
                  <th
                    class="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap"
                  >
                    Location
                  </th>
                  <th
                    class="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap"
                  >
                    Name
                  </th>
                  <th
                    class="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap"
                  >
                    Status
                  </th>
                  <th
                    class="text-left py-4 px-3 sm:px-6 font-semibold text-gray-700 text-sm sm:text-base whitespace-nowrap"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="report in reportData"
                  :key="report.id"
                  class="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td class="py-4 px-3 sm:px-6 text-sm text-gray-800 whitespace-nowrap">
                    {{ report.location }}
                  </td>
                  <td class="py-4 px-3 sm:px-6 text-sm text-gray-800 whitespace-nowrap">
                    {{ report.name }}
                  </td>
                  <td class="py-4 px-3 sm:px-6">
                    <span
                      :class="[
                        'px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                        report.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : report.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800',
                      ]"
                    >
                      {{ report.status }}
                    </span>
                  </td>
                  <td class="py-4 px-3 sm:px-6">
                    <button
                      @click="viewReportDetail(report)"
                      class="text-blue-500 hover:text-blue-600 text-sm font-medium whitespace-nowrap"
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>

    <div
      v-if="showReportModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm sm:max-w-md w-full mx-4 shadow-xl">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-bold text-gray-800">Detail Report Wisata</h3>
          <button @click="showReportModal = false" class="text-gray-400 hover:text-gray-600 p-1">
            <i class="mdi mdi-close text-xl"></i>
          </button>
        </div>

        <div v-if="selectedReport" class="space-y-4">
          <div class="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <i class="mdi mdi-account text-xl text-green-600"></i>
            </div>
            <div>
              <p class="font-semibold text-gray-800">{{ selectedReport.reporter }}</p>
              <p class="text-sm text-gray-600">{{ selectedReport.date }}</p>
            </div>
          </div>

          <div>
            <h4 class="font-semibold text-gray-800 mb-2">Description:</h4>
            <p class="text-sm text-gray-600 leading-relaxed">{{ selectedReport.description }}</p>
          </div>

          <div v-if="!showAdminReply" class="flex space-x-3 pt-4">
            <button
              @click="approveReport"
              class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
            >
              Approve
            </button>
            <button
              @click="rejectReport"
              class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Reject
            </button>
          </div>

          <div v-if="showAdminReply" class="bg-gray-900 p-4 rounded-lg mt-4">
            <div class="text-white font-semibold mb-2">
              ini akan muncul saat tombol confirm di klik
            </div>
            <div class="bg-white p-4 rounded-lg">
              <div class="font-bold mb-2">Admin Reply</div>
              <textarea
                v-model="adminReply"
                placeholder="text"
                rows="5"
                class="w-full p-2 border rounded-lg mb-4"
              ></textarea>
              <div class="flex justify-end">
                <button
                  @click="submitAdminReply"
                  class="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700"
                >
                  submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="showAdminReply && !showReportModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-sm sm:max-w-md w-full mx-4 shadow-xl">
        <div class="mb-4">
          <h3 class="text-lg font-bold text-gray-800">Approve Report</h3>
          <p class="text-sm text-gray-600">Add a message to the user (optional):</p>
        </div>
        <textarea
          v-model="adminReply"
          class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none h-24"
          placeholder="Type your message here..."
        ></textarea>
        <div class="flex justify-end space-x-2 mt-4">
          <button
            @click="submitAdminReply"
            class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
          >
            Send & Approve
          </button>
          <button
            @click="showAdminReply = false"
            class="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>

    <transition name="popup-fade">
      <div v-if="showWisataModal" class="fixed inset-0 flex items-center justify-center z-50">
        <div
          class="absolute inset-0"
          style="background: rgba(30, 41, 59, 0.35); transition: background 0.3s"
          @click="closeWisataModal"
        ></div>
        <div
          class="relative bg-white rounded-xl p-6 sm:p-8 max-w-xl md:max-w-3xl lg:max-w-5xl w-full mx-4 shadow-2xl animate-popup"
          @click.stop
        >
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl sm:text-2xl font-bold text-green-700">Detail Wisata</h2>
            <button @click="closeWisataModal" class="text-gray-400 hover:text-gray-600 p-1">
              <i class="mdi mdi-close text-xl"></i>
            </button>
          </div>
          <div class="bg-white rounded-lg p-0">
            <div class="flex flex-col lg:flex-row gap-6 lg:gap-12">
              <div class="flex-shrink-0 flex justify-center w-full lg:w-auto">
                <div
                  v-if="selectedWisataImages.length"
                  class="relative w-full h-[250px] sm:h-[300px] md:h-[320px] max-w-[320px] cursor-pointer mb-4"
                  @click="
                    selectedImageIndex = (selectedImageIndex + 1) % selectedWisataImages.length
                  "
                >
                  <div class="relative w-full h-full">
                    <div
                      v-for="(img, index) in selectedWisataImages"
                      :key="img"
                      class="absolute top-0 transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-lg"
                      :class="[
                        index === selectedImageIndex
                          ? 'z-30 scale-100 left-0'
                          : index === (selectedImageIndex + 1) % selectedWisataImages.length
                            ? 'z-20 scale-95 left-[15%] sm:left-[20%] md:left-[25%]'
                            : 'z-10 scale-90 left-[15%] sm:left-[20%] md:left-[25%]',
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
                  <div class="text-xs text-gray-500 mt-2 text-center">
                    Klik gambar untuk melihat selanjutnya ({{ selectedImageIndex + 1 }}/{{
                      selectedWisataImages.length
                    }})
                  </div>
                </div>
                <div
                  v-else
                  class="h-[250px] sm:h-[300px] md:h-[320px] w-full max-w-[320px] bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4"
                >
                  <i class="mdi mdi-image text-4xl text-white opacity-50"></i>
                </div>
              </div>
              <div class="flex-1 space-y-4 pl-11">
                <h3 class="text-lg sm:text-xl font-bold text-gray-800 mb-2">
                  {{ selectedWisata.name }}
                </h3>
                <div class="space-y-1 text-sm text-gray-600">
                  <p>
                    <span class="font-medium">Estimated entry:</span> {{ selectedWisata.price }}
                  </p>
                  <p><span class="font-medium">Rating:</span> ⭐ {{ selectedWisata.rating }}/5</p>
                  <p><span class="font-medium">Address:</span> {{ selectedWisata.address }}</p>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Description:</h4>
                  <p class="text-sm text-gray-600 leading-relaxed">
                    {{ selectedWisata.description }}
                  </p>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Link Google Maps:</h4>
                  <a
                    :href="selectedWisata.mapsLink"
                    target="_blank"
                    class="text-blue-500 hover:text-blue-600 text-sm break-all"
                  >
                    {{ selectedWisata.mapsLink }}
                  </a>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-2">Uploaded by:</h4>
                  <p class="text-sm text-gray-600">{{ selectedWisata.uploader }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css';

/* Popup fade animation */
.popup-fade-enter-active,
.popup-fade-leave-active {
  transition: opacity 0.3s;
}
.popup-fade-enter-from,
.popup-fade-leave-to {
  opacity: 0;
}

/* Popup scale animation */
@keyframes popupIn {
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(30px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-popup {
  animation: popupIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>

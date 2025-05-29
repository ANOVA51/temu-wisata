<script setup>
import { ref, watch } from 'vue'

const active = ref('dashboard')
const direction = ref('right')

// Deteksi arah perpindahan
const lastIndex = ref(0)
const menuList = ['dashboard', 'wisata-manage', 'confirm-wisata', 'report-wisata', 'user-manage']

watch(active, (newVal, oldVal) => {
  const newIndex = menuList.indexOf(newVal)
  const oldIndex = menuList.indexOf(oldVal)
  direction.value = newIndex > oldIndex ? 'right' : 'left'
  lastIndex.value = newIndex
})

// Data
const selectedWisata = ref({})
const selectedReport = ref(null)
const showReportModal = ref(false)
const showWisataModal = ref(false)

const wisataList = ref([
  {
    id: 1,
    name: 'Ulun Danu Beratan',
    category: 'Lake',
    image: '/api/placeholder/300/200',
    price: 'Rp 50,000',
    rating: 4.5,
    address: 'Candikuning, Baturiti, Tabanan Regency, Bali 82191',
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    mapsLink: 'https://maps.google.com/placeholder',
    uploader: 'user_name',
  },
  {
    id: 2,
    name: 'Goa Gong',
    category: 'Cave',
    image: '/api/placeholder/300/200',
    price: 'Rp 25,000',
    rating: 4.3,
    address: 'Bungkal, Ponorogo',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mapsLink: 'https://maps.google.com/placeholder',
    uploader: 'user_name',
  },
  {
    id: 3,
    name: 'Air Terjun Sekumpul',
    category: 'Waterfall',
    image: '/api/placeholder/300/200',
    price: 'Rp 20,000',
    rating: 4.7,
    address: 'Sekumpul, Sawan, Buleleng',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mapsLink: 'https://maps.google.com/placeholder',
    uploader: 'user_name',
  },
  {
    id: 4,
    name: 'Ulun Danu Beratan',
    category: 'Temple',
    image: '/api/placeholder/300/200',
    price: 'Rp 15,000',
    rating: 4.2,
    address: 'Bali',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mapsLink: 'https://maps.google.com/placeholder',
    uploader: 'user_name',
  },
  {
    id: 5,
    name: 'Goa Gong',
    category: 'Cave',
    image: '/api/placeholder/300/200',
    price: 'Rp 30,000',
    rating: 4.1,
    address: 'Ponorogo',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mapsLink: 'https://maps.google.com/placeholder',
    uploader: 'user_name',
  },
  {
    id: 6,
    name: 'Air Terjun Sekumpul',
    category: 'Waterfall',
    image: '/api/placeholder/300/200',
    price: 'Rp 35,000',
    rating: 4.8,
    address: 'Buleleng',
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mapsLink: 'https://maps.google.com/placeholder',
    uploader: 'user_name',
  },
])

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

const userData = ref([
  {
    id: 1,
    username: 'user_name',
    email: 'ratnapoetriann@example.com',
    status: 'active',
  },
  {
    id: 2,
    username: 'admin_user',
    email: 'admin@example.com',
    status: 'active',
  },
  {
    id: 3,
    username: 'test_user',
    email: 'test@example.com',
    status: 'inactive',
  },
])

// Methods
const viewWisataDetail = (wisata) => {
  selectedWisata.value = wisata
  showWisataModal.value = true
}

const closeWisataModal = () => {
  showWisataModal.value = false
}

const approveWisata = (wisata) => {
  pendingWisata.value = pendingWisata.value.filter((w) => w.id !== wisata.id)
  wisataList.value.push({
    ...wisata,
    price: 'Rp 30,000',
    rating: 4.0,
    address: wisata.location,
    description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    mapsLink: 'https://maps.google.com/placeholder',
    uploader: 'user_name',
  })
}

const rejectWisata = (wisata) => {
  pendingWisata.value = pendingWisata.value.filter((w) => w.id !== wisata.id)
}

const viewReportDetail = (report) => {
  selectedReport.value = report
  showReportModal.value = true
}

const approveReport = () => {
  if (selectedReport.value) {
    selectedReport.value.status = 'approved'
    showReportModal.value = false
  }
}

const rejectReport = () => {
  if (selectedReport.value) {
    selectedReport.value.status = 'rejected'
    showReportModal.value = false
  }
}
</script>

<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-green-600 text-white flex flex-col">
      <div class="p-6 text-center border-b border-white/20">
        <h1 class="text-3xl font-bold tracking-widest">TESA</h1>
        <p class="text-xs mt-1">Temu Wisata Admin Dashboard</p>
      </div>
      <nav class="flex-1 px-4 py-4 space-y-2">
        <!-- Dashboard -->
        <div
          @click="active = 'dashboard'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'dashboard'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-view-dashboard mr-3 text-lg"></i>
          <span class="font-medium">Dashboard</span>
        </div>

        <!-- Wisata Manage -->
        <div
          @click="active = 'wisata-manage'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'wisata-manage'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-map-marker-multiple mr-3 text-lg"></i>
          <span class="font-medium">Wisata Manage</span>
        </div>

        <!-- Confirm Wisata -->
        <div
          @click="active = 'confirm-wisata'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'confirm-wisata'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-check-circle mr-3 text-lg"></i>
          <span class="font-medium">Confirm Wisata</span>
        </div>

        <!-- Report Wisata -->
        <div
          @click="active = 'report-wisata'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'report-wisata'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-file-document mr-3 text-lg"></i>
          <span class="font-medium">Report Wisata</span>
        </div>

        <!-- User Manage -->
        <div
          @click="active = 'user-manage'"
          :class="[
            'flex items-center px-4 py-3 rounded-lg cursor-pointer transition-all duration-200',
            active === 'user-manage'
              ? 'bg-white text-green-600 shadow-md'
              : 'hover:bg-green-700 text-white',
          ]"
        >
          <i class="mdi mdi-account-group mr-3 text-lg"></i>
          <span class="font-medium">User Manage</span>
        </div>
      </nav>
    </aside>

    <!-- Main Content with Slide Transition -->
    <main class="flex-1 p-10 relative overflow-hidden">
      <transition :name="`slide-${direction}`" mode="out-in">
        <div :key="active">
          <!-- Dashboard -->
          <div v-if="active === 'dashboard'">
            <h2 class="text-3xl font-bold text-green-700 mb-6">Dashboard</h2>
            <div class="grid grid-cols-2 gap-6">
              <!-- User Card -->
              <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">User</p>
                    <p class="text-3xl font-bold text-green-700">1006</p>
                  </div>
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <i class="mdi mdi-account text-2xl text-blue-600"></i>
                  </div>
                </div>
              </div>

              <!-- Location Card -->
              <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="text-sm text-gray-600 mb-1">Location</p>
                    <p class="text-3xl font-bold text-green-700">1006</p>
                  </div>
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <i class="mdi mdi-map-marker text-2xl text-green-600"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Wisata Manage -->
          <div v-else-if="active === 'wisata-manage'">
            <h2 class="text-3xl font-bold text-green-700 mb-6">Wisata Manage</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="wisata in wisataList"
                :key="wisata.id"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
                >
                  <i class="mdi mdi-image text-4xl text-white opacity-50"></i>
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
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Detail Wisata (pop up modal) -->
          <div
            v-if="showWisataModal"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div class="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 shadow-xl">
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-green-700">Detail Wisata</h2>
                <button @click="closeWisataModal" class="text-gray-400 hover:text-gray-600 p-1">
                  <i class="mdi mdi-close text-xl"></i>
                </button>
              </div>
              <div class="bg-white rounded-lg p-0">
                <div class="flex flex-col lg:flex-row gap-6">
                  <div>
                    <div
                      class="h-64 w-full bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center mb-4"
                    >
                      <i class="mdi mdi-image text-4xl text-white opacity-50"></i>
                    </div>
                  </div>
                  <div class="flex-1 space-y-4">
                    <h3 class="text-xl font-bold text-gray-800 mb-2">{{ selectedWisata.name }}</h3>
                    <div class="space-y-1 text-sm text-gray-600">
                      <p>
                        <span class="font-medium">Estimated entry:</span> {{ selectedWisata.price }}
                      </p>
                      <p>
                        <span class="font-medium">Rating:</span> ⭐ {{ selectedWisata.rating }}/5
                      </p>
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
          <!-- End Detail Wisata Modal -->

          <!-- Confirm Wisata -->
          <div v-else-if="active === 'confirm-wisata'">
            <h2 class="text-3xl font-bold text-green-700 mb-6">Confirm Wisata</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                v-for="wisata in pendingWisata"
                :key="wisata.id"
                class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div
                  class="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center"
                >
                  <i class="mdi mdi-image text-4xl text-white opacity-50"></i>
                </div>
                <div class="p-4">
                  <h3 class="font-semibold text-gray-800 mb-2">{{ wisata.name }}</h3>
                  <p class="text-sm text-gray-600 mb-1">{{ wisata.category }}</p>
                  <p class="text-xs text-gray-500 mb-3">{{ wisata.location }}</p>
                  <div class="flex space-x-2">
                    <button
                      @click="approveWisata(wisata)"
                      class="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors"
                    >
                      Approve
                    </button>
                    <button
                      @click="rejectWisata(wisata)"
                      class="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600 transition-colors"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Report Wisata -->
          <div v-else-if="active === 'report-wisata'">
            <h2 class="text-3xl font-bold text-green-700 mb-6">Wisata Report</h2>

            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr class="bg-gray-50 border-b border-gray-200">
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Location</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Name</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="report in reportData"
                      :key="report.id"
                      class="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td class="py-4 px-6 text-sm text-gray-800">{{ report.location }}</td>
                      <td class="py-4 px-6 text-sm text-gray-800">{{ report.name }}</td>
                      <td class="py-4 px-6">
                        <span
                          :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
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
                      <td class="py-4 px-6">
                        <button
                          @click="viewReportDetail(report)"
                          class="text-blue-500 hover:text-blue-600 text-sm font-medium"
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

          <!-- User Manage -->
          <div v-else-if="active === 'user-manage'">
            <h2 class="text-3xl font-bold text-green-700 mb-6">User Manage</h2>

            <div class="bg-white rounded-lg shadow-md overflow-hidden">
              <div class="overflow-x-auto">
                <table class="min-w-full">
                  <thead>
                    <tr class="bg-gray-50 border-b border-gray-200">
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">No</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Username</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Email</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                      <th class="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(user, index) in userData"
                      :key="user.id"
                      class="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td class="py-4 px-6 text-sm text-gray-800">{{ index + 1 }}</td>
                      <td class="py-4 px-6 text-sm text-gray-800">{{ user.username }}</td>
                      <td class="py-4 px-6 text-sm text-gray-800">{{ user.email }}</td>
                      <td class="py-4 px-6">
                        <span
                          :class="[
                            'px-3 py-1 rounded-full text-xs font-medium',
                            user.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800',
                          ]"
                        >
                          {{ user.status }}
                        </span>
                      </td>
                      <td class="py-4 px-6">
                        <div class="flex space-x-3">
                          <button class="text-blue-500 hover:text-blue-600 text-sm font-medium">
                            Edit
                          </button>
                          <button class="text-red-500 hover:text-red-600 text-sm font-medium">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </main>

    <!-- Modal for Report Detail -->
    <div
      v-if="showReportModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
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

          <div class="flex space-x-3 pt-4">
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
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css';

/* Slide Left */
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease;
}
.slide-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}
.slide-left-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

/* Slide Right */
.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease;
}
.slide-right-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-right-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>

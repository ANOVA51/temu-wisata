<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <!-- Bagian Header dengan Foto Profil -->
      <div class="bg-purple-500 p-4 flex items-center justify-center">
        <img
          src="/src/assets/images/profile-tesa.png"
          alt="Profile Picture"
          class="w-16 h-16 rounded-full"
        />
      </div>

      <!-- Area Chat -->
      <div class="p-4 h-64 overflow-y-auto">
        <!-- Pesan Chat akan ditampilkan di sini -->
      </div>

      <!-- Input Chat -->
      <div class="p-4 bg-gray-200">
        <input
          type="text"
          placeholder="do you need any help?"
          class="w-full p-2 rounded-lg border border-gray-300"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatTesa', // Perbaiki nama komponen agar sesuai dengan nama file
}
</script>

<style scoped>
/* Tambahkan gaya tambahan jika diperlukan */
</style>

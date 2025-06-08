<template>
  <div class="flex items-center justify-center h-screen bg-black">
    <div class="bg-purple-500 rounded-lg p-4 flex flex-col items-center shadow-lg">
      <img
        src="/src/assets/images/profile-tesa.png"
        alt="Profile"
        class="rounded-full mb-2 w-20 h-20 object-cover border-4 border-white"
      />
      <button
        class="bg-purple-700 text-white py-2 px-6 rounded-full font-bold mt-2 hover:bg-purple-800 transition"
      >
        Ask Tesa
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AskTesaComponent',
}
</script>

<style scoped></style>

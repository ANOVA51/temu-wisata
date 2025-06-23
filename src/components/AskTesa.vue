<template>
  <div class="fixed bottom-10 right-6 z-50 flex flex-col items-end space-y-2">
    <!-- Chat Card -->
    <transition name="fade">
      <div v-if="showChatCard" class="w-80 bg-white border shadow-xl rounded-xl p-4">
        <div class="flex justify-between items-center mb-2">
          <h2 class="text-purple-600 font-semibold">Tesa Assistant</h2>
          <button @click="toggleChatCard" class="text-gray-500 hover:text-red-500 text-lg font-bold">×</button>
        </div>

        <!-- Chat History -->
        <div ref="chatContainer" class="h-60 overflow-y-auto space-y-2 text-sm pr-1 mb-3 scroll-smooth">
          <div
            v-for="(chat, i) in chatHistory"
            :key="i"
            :class="chat.sender === 'user' ? 'text-right' : 'text-left'"
          >
            <div
              :class="[
                'inline-block px-3 py-2 rounded-xl',
                chat.sender === 'user'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              ]"
            >
              {{ chat.message }}
            </div>
          </div>
        </div>

        <!-- Input Form -->
        <form @submit.prevent="handleUserInput" class="flex gap-2 items-center">
          <input
            v-model="userInput"
            type="text"
            placeholder="Ask something..."
            class="flex-1 border px-3 py-2 rounded-md text-sm focus:ring-2 focus:ring-purple-400"
          />
          <button
            type="submit"
            class="bg-purple-600 text-white px-3 rounded hover:bg-purple-700"
          >
            Send
          </button>
        </form>
      </div>
    </transition>

    <!-- Floating Avatar Button -->
    <div
      @click="toggleChatCard"
      class="cursor-pointer flex items-center space-x-3 bg-purple-600 py-2 px-2 rounded-full shadow-lg hover:bg-purple-700 transition"
    >
      <img :src="tesa" alt="Tesa" class="w-12 h-12 rounded-full object-cover" />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, watch } from 'vue'
import tesa from '@/assets/images/profile-tesa.png'

const showChatCard = ref(false)
const userInput = ref('')
const chatHistory = ref(
  JSON.parse(sessionStorage.getItem('tesa_chat_history')) ||
  [{ sender: 'bot', message: "Hi there! I'm Tesa. Ask me anything!" }]
)
const chatContainer = ref(null)

watch(chatHistory, (val) => {
  sessionStorage.setItem('tesa_chat_history', JSON.stringify(val))
}, { deep: true })

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

async function handleUserInput() {
  const input = userInput.value.trim()
  if (!input) return

  chatHistory.value.push({ sender: 'user', message: input })
  scrollToBottom()

  userInput.value = ''

  // Kirim ke API chatbot backend
  try {
    const res = await fetch('http://127.0.0.1:8000/api/chat/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    })
    const data = await res.json()
    const reply = data.response || "Maaf, Tesa tidak bisa menjawab saat ini."
    chatHistory.value.push({ sender: 'bot', message: reply })
    scrollToBottom()
  } catch (e) {
    chatHistory.value.push({ sender: 'bot', message: "Maaf, terjadi kesalahan pada server." })
    scrollToBottom()
  }
}

// Toggle chat card
function toggleChatCard() {

  showChatCard.value = !showChatCard.value
  nextTick(() => scrollToBottom())
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.scroll-smooth {
  scroll-behavior: smooth;
}
</style>

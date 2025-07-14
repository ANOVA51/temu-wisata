<script setup>
import IconLocation from '@/components/icons/IconLocation.vue'
import IconMail from '@/components/icons/IconMail.vue'
import IconWA from '@/components/icons/IconWA.vue'
import FooterSection from '@/components/FooterSection.vue'

import kecak from '@/assets/images/kecak.jpg'
import penari from '@/assets/images/penari.jpg'
import statue from '@/assets/images/statue1.jpg'
import waterfall from '@/assets/images/waterfall1.jpg'
import { ref } from 'vue'

const images = [kecak, statue, penari, waterfall]
const currentIndex = ref(0)

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length
}

// Form data
const formData = ref({
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  message: '',
})

// WhatsApp configuration
const whatsappNumber = '6281339172556' // Nomor WhatsApp tujuan (tanpa +)

const sendToWhatsApp = () => {
  // Validasi form
  if (
    !formData.value.firstname ||
    !formData.value.lastname ||
    !formData.value.email ||
    !formData.value.message
  ) {
    alert('Please fill in all required fields')
    return
  }

  // Template pesan WhatsApp
  const message = `*TESA - Contact Form Submission*

*Name:* ${formData.value.firstname} ${formData.value.lastname}
*Email:* ${formData.value.email}
*Phone:* ${formData.value.phone || 'Not provided'}

*Message:*
${formData.value.message}

---
This message was sent from TESA Contact Form.`

  // Encode pesan untuk URL
  const encodedMessage = encodeURIComponent(message)

  // Buat URL WhatsApp
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

  // Buka WhatsApp di tab baru
  window.open(whatsappUrl, '_blank')

  // Reset form setelah mengirim
  formData.value = {
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    message: '',
  }
}

import dimas from '@/assets/images/profile/dimas.jpg'
import emo from '@/assets/images/profile/emo.jpg'
import nova from '@/assets/images/profile/nova.jpg'
import pius from '@/assets/images/profile/pius.jpg'
import daniel from '@/assets/images/profile/daniel.png'
import Navbar from '@/components/Navbar.vue'

const teamMembers = [
  {
    name: 'Komang Emo',
    role: 'Backend of TESA',
    image: emo,
    instagram: '#',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Pius',
    role: 'Backend of TESA',
    image: pius,
    instagram: '#',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Novanka',
    role: 'Frontend of TESA',
    image: nova,
    instagram: '#',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Gung Dimas',
    role: 'Backend of TESA',
    image: dimas,
    instagram: '#',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Daniel Widhi',
    role: 'Backend of TESA',
    image: daniel,
    instagram: 'instagram.com/danielwidhi_198',
    github: '#',
    linkedin: '#',
  },
]
</script>

<template>
  <div>
    <Navbar />

    <!-- Hero Section -->
    <section class="relative h-screen w-full">
      <img
        src="@/assets/images/waterfall1.jpg"
        alt="Hero Banner"
        class="absolute inset-0 w-full h-full object-cover object-bottom brightness-75 z-0"
      />
    </section>

    <!-- Mission Section -->
    <section class="relative px-6 md:px-30 py-10 overflow-hidden">
      <!-- Gambar latar Pulau Bali -->
      <img
        src="@/assets/images/pulaubali.png"
        alt="Bali Background"
        class="absolute inset-0 w-full h-full object-contain opacity-20 z-0 pointer-events-none py-5"
      />

      <div class="flex flex-col md:flex-row gap-10 md:gap-75 items-center">
        <!-- Text -->
        <div class="md:w-3/4 text-lg text-gray-700">
          <h2 class="text-4xl md:text-5xl font-black mb-10 whitespace-nowrap">
            Why
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">
              Choose Us
            </span>
          </h2>
          <p>
            We collaborate closely with local communities to promote a more inclusive and
            sustainable tourism experience. By working hand-in-hand with residents, we ensure that
            tourism development respects local traditions, preserves cultural heritage, and
            contributes directly to the well-being of the people. Our platform is dedicated to
            showcasing the hidden gems of the region—untouched natural wonders, authentic cultural
            experiences, traditional arts, and local cuisines that are often overlooked by
            mainstream tourism.
          </p>
        </div>

        <!-- Carousel Bertumpuk -->
        <div
          class="relative w-full max-w-[360px] mx-auto h-[250px] cursor-pointer"
          @click="nextImage"
        >
          <div class="relative w-full h-full">
            <div
              v-for="(img, index) in images"
              :key="img"
              class="absolute top-0 transition-all duration-500 ease-in-out rounded-xl overflow-hidden shadow-lg"
              :class="[
                index === currentIndex
                  ? 'z-30 scale-100 left-0'
                  : index === (currentIndex + 1) % images.length
                    ? 'z-20 scale-95 left-[25%]' // Gambar kedua muncul sebagian
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
      </div>
    </section>

    <!--The Creator Of TESA-->
    <section class="px-6 md:px-30 py-10">
      <h2 class="text-3xl md:text-4xl font-bold text-center mb-10">
        The Creator
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">
          TESA
        </span>
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 place-items-center">
        <div
          v-for="(member, index) in teamMembers"
          :key="index"
          class="bg-gray-200 p-4 rounded-xl text-center shadow-md w-60 h-70"
        >
          <div class="absolute-top-12 flex justify-center">
            <img
              :src="member.image"
              :alt="member.name"
              class="w-24 h-24 rounded-full border-4 border-white object-cover shadow-md"
            />
          </div>

          <h3 class="text-lg font-bold mt-3">{{ member.name }}</h3>
          <p class="text-sm text-gray-600">{{ member.role }}</p>
          <div class="flex justify-center mt-3 space-x-3 text-gray-700 text-xl">
            <i class="fab fa-instagram"></i>
            <i class="fab fa-github"></i>
            <i class="fab fa-linkedin"></i>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="px-6 md:px-30 mt-24 sm:mt-30">
      <div class="flex flex-col md:flex-row gap-10 md:gap-8">
        <!-- Info -->
        <div class="flex flex-col">
          <h1 class="text-4xl sm:text-[42px] font-semibold leading-12 sm:leading-[62px] font-se">
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-black">
              Information Contact
            </span>
          </h1>
          <p class="text-neu-600 text-sm sm:text-base mb-6">
            We are available to answer your inquiries or suggestions. Get in touch with us, and our
            team will respond as soon as possible.
          </p>
          <ul class="flex flex-col gap-6">
            <li class="flex items-center gap-2 text-sm sm:text-base font-medium">
              <IconWA class="size-5 sm:size-5" />+62 812-3456-7890
            </li>
            <li class="flex items-center gap-2 text-sm sm:text-base font-medium">
              <IconMail class="size-5 sm:size-6" />Swastyastu@TESA.id
            </li>
            <li class="flex items-center gap-2 text-sm sm:text-base font-medium">
              <IconLocation class="size-5 sm:size-6" />Jl. Raya Nara No.123, Denpasar, Bali 80232,
              Indonesia
            </li>
          </ul>
        </div>

        <!-- Contact Form -->
        <div
          class="p-4 mb-6 sm:p-6 rounded-3xl min-w-full md:min-w-100 xl:min-w-[480px] border border-neu-200"
        >
          <h4 class="font-semibold text-2xl sm:text-[32px]">Contact Us</h4>
          <p class="text-neu-600 text-sm sm:text-base mb-6">
            Feel free to contact us at your convenience.
          </p>
          <form class="flex flex-col gap-4" @submit.prevent="sendToWhatsApp">
            <div class="flex gap-4">
              <input
                type="text"
                placeholder="Firstname"
                v-model="formData.firstname"
                required
                class="px-3 w-1/2 py-3 text-sm border placeholder:text-neu-500 border-neu-200 rounded-full"
              />
              <input
                type="text"
                placeholder="Lastname"
                v-model="formData.lastname"
                required
                class="px-3 w-1/2 py-3 text-sm border placeholder:text-neu-500 border-neu-200 rounded-full"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              v-model="formData.email"
              required
              class="px-3 py-3 text-sm border placeholder:text-neu-500 border-neu-200 rounded-full"
            />
            <input
              type="text"
              placeholder="Phone"
              v-model="formData.phone"
              class="px-3 py-3 text-sm border placeholder:text-neu-500 border-neu-200 rounded-full"
            />
            <textarea
              rows="7"
              placeholder="Message"
              v-model="formData.message"
              required
              class="px-3 py-3 text-sm placeholder:text-neu-500 border border-neu-200 rounded-3xl"
            ></textarea>
            <button
              type="submit"
              class="bg-pr-500 text-neu-50 px-6 py-3 font-medium rounded-full hover:bg-pr-600 transition-colors"
            >
              Send to WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
    <FooterSection />
  </div>
</template>

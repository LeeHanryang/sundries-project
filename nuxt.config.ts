// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui', // Nuxt UI (Tailwind + Reka)
    '@pinia/nuxt', // Pinia
    '@nuxt/icon', // Iconify
    '@nuxt/image', // Image optimizer
    '@nuxt/eslint', // ESLint preset
  ],

  // 글로벌 CSS (Tailwind 지시문 포함)
  css: ['~/assets/css/tailwind.css'],
  ui: {
    // 가상 폰트 CSS 생성 비활성화 → MIME 오류 방지
    fonts: false,

    // Tailwind 색상 alias
    theme: {
      colors: ['primary', 'neutral', 'tertiary'],
    },
  },

  colorMode: {
    preference: 'system', // 'light' | 'dark' | 'system'
    fallback: 'light',
    classSuffix: '',
  },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  typescript: {
    shim: false, // <script setup>에서 ref.value 없이 쓰려면
  },
})

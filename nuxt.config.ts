// nuxt.config.ts
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@pinia/nuxt',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint',
    '@sidebase/nuxt-auth',
  ],

  css: ['~/assets/css/tailwind.css'],

  ui: { fonts: false, theme: { colors: ['primary', 'neutral', 'tertiary'] } },

  colorMode: { preference: 'system', fallback: 'light', classSuffix: '' },

  /**
   * nuxt-auth 설정
   * baseURL === '/api/auth' (경로만) · originEnvKey === 'AUTH_ORIGIN'
   * → 실제 풀 URL은  http(s)://<AUTH_ORIGIN>/api/auth 로 자동 조합
   */
  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs',
      defaultProvider: 'google', // signIn() 호출 시 기본
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      // 창 포커스·주기적 재검사
      enableOnWindowFocus: true,
      enablePeriodically: true,
    },
  },

  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET, // private
    public: {
      authOrigin: process.env.AUTH_ORIGIN, // <http|https>://domain
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  typescript: { shim: false },
})

// nuxt.config.ts (최소 예시)
export default defineNuxtConfig({
  modules: [
    "@nuxt/ui",
    "@pinia/nuxt",
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxt/eslint",
  ],
  typescript: {
    // strict: true ← 기본값이라 생략 가능
    shim: false, // <script setup>에서 ref.value 없이 사용하려면 권장
  },
  ui: {
    theme: {
      // ✅ 존재하는 필드
      colors: ["primary", "neutral", "tertiary"], // 별칭을 늘릴 때만
    },
  },
  runtimeConfig: {
    // SSR·Nitro에서만 노출 (비공개)
    apiSecret: "top-secret",

    public: {
      // 환경변수 없으면 /api 로 폴백 → 모크 라우트
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "/api",
    },
  },
});

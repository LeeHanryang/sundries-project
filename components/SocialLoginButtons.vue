<template>
  <div class="space-y-6">
    <!-- divider -->
    <div class="flex items-center">
      <div class="flex-1 border-t border-gray-300"></div>
      <span class="px-4 text-sm text-gray-500">소셜 계정으로 시작하기</span>
      <div class="flex-1 border-t border-gray-300"></div>
    </div>

    <!-- buttons -->
    <div class="grid grid-cols-3 gap-4">
      <a
        :href="`${apiBase}/oauth2/authorization/google`"
        class="flex items-center justify-center gap-2 rounded border border-gray-300 bg-white py-2 text-black transition hover:bg-gray-100"
      >
        <Icon name="logos-google-icon" class="h-5 w-5" />
        Google
      </a>
      <a
        :href="`${apiBase}/oauth2/authorization/naver`"
        class="flex items-center justify-center gap-2 rounded bg-green-600 py-2 text-white transition hover:bg-green-700"
      >
        <img src="https://www.naver.com/favicon.ico" alt="Naver" class="h-5 w-5" />
        Naver
      </a>
      <a
        :href="`${apiBase}/oauth2/authorization/kakao`"
        class="flex items-center justify-center gap-2 rounded bg-yellow-300 py-2 text-black transition hover:bg-yellow-400"
      >
        <img
          src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
          alt="Kakao"
          class="h-5 w-5"
        />
        Kakao
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig()
const apiBase = config.public.apiBase
</script>

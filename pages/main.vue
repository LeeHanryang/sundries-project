<!-- pages/main.vue -->
<template>
  <div class="mx-auto mt-20 max-w-2xl rounded-lg bg-white p-6 shadow">
    <h1 class="mb-4 text-2xl font-bold">마이 페이지</h1>

    <div v-if="loadingUser" class="text-center text-gray-500">사용자 정보를 불러오는 중...</div>

    <div v-else-if="user">
      <p class="mb-2">
        <strong>ID:</strong>
        {{ user.id }}
      </p>
      <p class="mb-2">
        <strong>이메일:</strong>
        {{ user.email }}
      </p>
      <p class="mb-2">
        <strong>이름:</strong>
        {{ user.name }}
      </p>
      <!-- 기타 user object 안의 필드들도 이와 같이 표시 -->
    </div>

    <div v-else class="text-center">
      <p class="mb-4 text-red-500">로그인이 필요합니다.</p>
      <NuxtLink to="/auth/login" class="text-indigo-600 hover:underline">
        로그인 페이지로 이동
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { storeToRefs } from 'pinia'
import { navigateTo } from '#app'

const authStore = useAuthStore()
const { user, loading } = storeToRefs(authStore)

// loadingUser는 fetchUser 호출 중 상태
const loadingUser = computed(() => loading.value)

// 페이지 진입 시 이미 user가 없으면 서버에서 가져오고,
// 그래도 없으면 로그인 페이지로 리다이렉트
onMounted(async () => {
  if (!authStore.token) {
    // 토큰 자체가 없으면 바로 로그인으로
    return navigateTo('/auth/login')
  }
  if (!user.value) {
    await authStore.fetchUser()
  }
  if (!user.value) {
    // fetchUser 실패 시
    return navigateTo('/auth/login')
  }
})
</script>

<style scoped>
/* 필요하면 여기에 스타일 추가 */
</style>

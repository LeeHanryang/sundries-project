<!-- pages/auth/login.vue -->
<template>
  <div class="mx-auto mt-20 max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
    <h2 class="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">로그인</h2>

    <!-- 익명 로그인 -->
    <button
      @click="toAnonymous"
      :disabled="authStore.loading"
      class="mb-8 w-full rounded-md bg-gray-100 py-2 font-semibold text-gray-700 transition hover:bg-gray-200 disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
    >
      {{ authStore.loading ? '로딩 중…' : '익명으로 시작하기' }}
    </button>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
        <input
          v-model="email"
          type="email"
          id="email"
          autocomplete="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
      </div>
      <div>
        <label for="password" class="block text-sm font-medium text-gray-700">비밀번호</label>
        <input
          v-model="password"
          type="password"
          id="password"
          autocomplete="current-password"
          required
          class="mt-1 block w-full rounded-md border-gray-300 bg-white text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400"
        />
      </div>
      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        {{ authStore.loading ? '로그인 중...' : '로그인' }}
      </button>
    </form>

    <!-- 소셜 로그인 버튼 그룹 -->
    <div class="mt-8">
      <SocialLoginButtons />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from '#app'
import { useAuthStore } from '@/stores/auth'
import SocialLoginButtons from '@/components/SocialLoginButtons.vue'

const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { vAlert } = useAlert()

const handleSubmit = async () => {
  try {
    await authStore.loginUser(email.value, password.value)
    router.push('/main')
  } catch (err: any) {
    vAlert(err.response?.data?.message || '로그인에 실패했습니다.')
  }
}

const handleAnonymous = () => {
  router.push('/main')
}

onMounted(async () => {
  const { provider, code, error } = route.query
  if (error) {
    vAlert('소셜 로그인이 취소되었습니다.')
    return
  }
  if (provider && code) {
    try {
      await authStore.handleSocialLogin(String(provider), String(code))
      router.push('/main')
    } catch (err: any) {
      vAlert(err.response?.data?.message || '소셜 로그인에 실패했습니다.')
    }
  }
})

function toAnonymous() {
  // process 페이지로 provider=anonymous
  router.push('/auth/process?provider=anonymous')
}
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>

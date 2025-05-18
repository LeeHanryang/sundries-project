<template>
  <div class="mx-auto mt-20 max-w-md rounded-lg bg-white p-6 shadow">
    <h2 class="mb-6 text-center text-2xl font-semibold">로그인</h2>
    <!-- 익명으로 시작하기 버튼 -->
    <div class="mb-4 text-right">
      <button type="button" @click="handleAnonymous" class="text-indigo-600 hover:underline">
        익명으로 시작하기
      </button>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">이메일</label>
        <input
          v-model="email"
          type="email"
          id="email"
          autocomplete="email"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
      >
        {{ authStore.loading ? '로그인 중...' : '로그인' }}
      </button>
    </form>

    <SocialLoginButtons class="mt-6" />
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { vAlert } = useAlert()

const handleSubmit = async () => {
  try {
    await authStore.loginUser(email.value, password.value)
    router.push('/todos')
  } catch (err: any) {
    vAlert(err.response?.data?.message || '로그인에 실패했습니다.')
  }
}

const handleAnonymous = () => {
  router.push('/todos')
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
      router.push('/todos')
    } catch (err: any) {
      vAlert(err.response?.data?.message || '소셜 로그인에 실패했습니다.')
    }
  }
})
</script>

<style scoped>
/* 추가 스타일 필요 시 여기에 */
</style>

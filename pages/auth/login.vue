<!-- pages/auth/login.vue -->
<template>
  <div class="mx-auto mt-20 max-w-md rounded-lg bg-white p-6 shadow dark:bg-gray-800">
    <h2 class="mb-6 text-center text-2xl font-semibold text-gray-900 dark:text-white">로그인</h2>

    <!-- 익명 로그인 -->
    <button
      @click="toAnonymous"
      :disabled="authStore.loading"
      class="mb-8 w-full cursor-pointer rounded-md border border-indigo-600 py-2 text-center font-semibold text-indigo-600 transition-colors duration-200 hover:bg-indigo-50 disabled:opacity-50 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900/20"
    >
      {{ authStore.loading ? '로딩 중…' : '익명으로 시작하기' }}
    </button>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div class="group">
        <label for="email" class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          이메일
        </label>
        <div class="relative">
          <input
            v-model="email"
            type="email"
            id="email"
            autocomplete="email"
            required
            class="peer w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
            placeholder="이메일을 입력하세요"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              class="h-5 w-5 text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              />
            </svg>
          </div>
        </div>
      </div>
      <div class="group">
        <label
          for="password"
          class="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          비밀번호
        </label>
        <div class="relative">
          <input
            v-model="password"
            type="password"
            id="password"
            autocomplete="current-password"
            required
            class="peer w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-400/20"
            placeholder="비밀번호를 입력하세요"
          />
          <div class="absolute inset-y-0 right-0 flex items-center pr-3">
            <svg
              class="h-5 w-5 text-gray-400 transition-colors duration-200 group-focus-within:text-indigo-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>
      </div>

      <!-- 로그인 옵션 -->
      <div class="flex items-center space-x-6">
        <UCheckbox v-model="saveEmail" name="saveEmail" label="아이디 저장" color="primary" />
        <UCheckbox v-model="autoLogin" name="autoLogin" label="자동 로그인" color="primary" />
      </div>

      <button
        type="submit"
        :disabled="authStore.loading"
        class="w-full cursor-pointer rounded-md bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50 dark:bg-indigo-500 dark:hover:bg-indigo-600"
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
const saveEmail = ref(false)
const autoLogin = ref(false)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()
const { vAlert } = useAlert()

// 저장된 이메일 불러오기
onMounted(() => {
  const savedEmail = localStorage.getItem('savedEmail')
  const savedAutoLogin = localStorage.getItem('autoLogin')

  if (savedEmail) {
    email.value = savedEmail
    saveEmail.value = true
  }

  if (savedAutoLogin === 'true') {
    autoLogin.value = true
    // 자동 로그인 시도
    handleAutoLogin()
  }
})

// 자동 로그인 처리
const handleAutoLogin = async () => {
  try {
    const savedPassword = localStorage.getItem('savedPassword')
    if (savedPassword) {
      await authStore.loginUser(email.value, savedPassword)
      router.push('/main')
    }
  } catch (err) {
    console.error('자동 로그인 실패:', err)
  }
}

const handleSubmit = async () => {
  try {
    await authStore.loginUser(email.value, password.value)

    // 아이디 저장 처리
    if (saveEmail.value) {
      localStorage.setItem('savedEmail', email.value)
    } else {
      localStorage.removeItem('savedEmail')
    }

    // 자동 로그인 처리
    if (autoLogin.value) {
      localStorage.setItem('autoLogin', 'true')
      localStorage.setItem('savedPassword', password.value)
    } else {
      localStorage.removeItem('autoLogin')
      localStorage.removeItem('savedPassword')
    }

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
  router.push('/auth/process?provider=anonymous')
}
</script>

<style scoped>
/* 필요시 추가 스타일 */
</style>

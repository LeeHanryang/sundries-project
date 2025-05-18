<template>
  <div class="flex h-screen items-center justify-center">
    <div class="text-center">
      <div class="spinner mb-4"></div>
      <p class="text-gray-700">{{ message }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useAlert } from '@/composables/alert'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { vAlert } = useAlert()

const message = ref('로그인 처리 중…')

onMounted(async () => {
  const mode = route.query.mode as string

  try {
    if (mode === 'anonymous') {
      // 익명 로그인
      message.value = '익명 로그인 중…'
      await authStore.anonymousLogin()
    } else if (mode === 'social') {
      // social?provider=google&code=xxx
      const provider = route.query.provider as string
      const code = route.query.code as string
      message.value = `${provider} 로그인 중…`
      await authStore.handleSocialLogin(provider, code)
    } else {
      throw new Error('잘못된 로그인 모드입니다.')
    }
    // 로그인 성공 → 메인으로
    router.replace('/main')
  } catch (err: any) {
    vAlert(err.response?.data?.message || '로그인에 실패했습니다.')
    router.replace('/login')
  }
})
</script>

<style scoped>
/* .spinner 예시 */
.spinner {
  width: 48px;
  height: 48px;
  border: 4px solid #ddd;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

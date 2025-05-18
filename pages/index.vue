<!-- pages/index.vue -->
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { navigateTo } from '#app'

const authStore = useAuthStore()
if (authStore.token) {
  // 로그인된 상태면 /main 으로
  navigateTo('/main')
} else {
  // 아니면 /login
  navigateTo('/auth/login')
}
</script>

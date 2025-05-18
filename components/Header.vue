<template>
  <header class="bg-white shadow">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- 로고 / 홈 -->
      <NuxtLink to="/" class="text-xl font-bold text-indigo-600 hover:text-indigo-700">
        MyApp
      </NuxtLink>

      <!-- 네비게이션 -->
      <nav class="flex space-x-6">
        <NuxtLink to="/" class="text-gray-700 hover:text-gray-900">Home</NuxtLink>
        <NuxtLink to="/todos" class="text-gray-700 hover:text-gray-900">Todos</NuxtLink>
        <!-- 로그인 상태에 따라 -->
        <NuxtLink v-if="!authStore.user" to="/login" class="text-gray-700 hover:text-gray-900">
          Login
        </NuxtLink>
        <button v-else @click="logout" class="text-gray-700 hover:text-gray-900">Logout</button>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push('/login')
}
</script>

<style scoped>
/* 필요하다면 여기에 추가 스타일 */
</style>

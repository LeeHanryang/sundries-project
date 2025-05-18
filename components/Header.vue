<template>
  <header class="bg-white shadow transition-colors duration-500 ease-in-out dark:bg-gray-800">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- 로고 -->
      <NuxtLink
        :to="homeLink"
        class="text-2xl font-bold text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        MyApp
      </NuxtLink>

      <!-- 메뉴 -->
      <nav v-if="authStore.token" class="flex space-x-6">
        <NuxtLink
          v-for="item in menu"
          :key="item.path"
          :to="item.path"
          class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- 테마 토글 + 로그인/로그아웃 -->
      <div class="flex items-center space-x-4">
        <!-- 1) ClientOnly 로 감싸야 SSR mismatch 없음 -->
        <ClientOnly placeholder="">
          <UButton
            :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            color="neutral"
            variant="ghost"
            aria-label="Toggle theme"
            @click="isDark = !isDark"
          >
            <!-- fallback 슬롯은 공백으로 두거나 스피너 넣어도 좋음 -->
            <template #fallback>
              <div class="h-6 w-6"></div>
            </template>
          </UButton>
        </ClientOnly>

        <NuxtLink
          v-if="!authStore.token"
          to="/auth/login"
          class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          Login
        </NuxtLink>
        <button
          v-else
          @click="logout"
          class="text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useAxios } from '@/composables/useAxios'
import { useColorMode } from '#imports'

const emit = defineEmits<{
  (e: 'toggle', ev: MouseEvent): void
}>()

const authStore = useAuthStore()
const { data: menu } = useAxios('/menu', { method: 'get' })

// 로고 경로
const homeLink = computed(() => (authStore.token ? '/main' : '/'))

// 다크 모드 composable
const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: v => (colorMode.preference = v ? 'dark' : 'light'),
})

function logout() {
  authStore.logout()
  navigateTo('/')
}
</script>

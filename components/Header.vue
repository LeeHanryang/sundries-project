<template>
  <header
    class="bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] transition-colors duration-500 ease-in-out dark:bg-gray-800 dark:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.2),0_2px_4px_-1px_rgba(0,0,0,0.1)]"
  >
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <!-- 로고 -->
      <NuxtLink
        :to="homeLink"
        class="text-xl font-bold text-indigo-600 hover:text-indigo-700 sm:text-2xl dark:text-indigo-400 dark:hover:text-indigo-300"
      >
        MyApp
      </NuxtLink>

      <!-- 메뉴 -->
      <nav v-if="authStore.token" class="hidden space-x-4 sm:flex lg:space-x-6">
        <NuxtLink
          v-for="item in menu"
          :key="item.path"
          :to="item.path"
          class="text-sm text-gray-700 hover:text-gray-900 sm:text-base dark:text-gray-300 dark:hover:text-white"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <!-- 테마 토글 + 로그인/로그아웃 -->
      <div class="flex items-center space-x-2 sm:space-x-4">
        <ClientOnly placeholder="">
          <UButton
            :icon="isDark ? 'i-heroicons-moon' : 'i-heroicons-sun'"
            color="neutral"
            variant="ghost"
            size="sm"
            aria-label="Toggle theme"
            @click="isDark = !isDark"
          >
            <template #fallback>
              <div class="h-5 w-5 sm:h-6 sm:w-6"></div>
            </template>
          </UButton>
        </ClientOnly>

        <NuxtLink
          v-if="!authStore.token"
          to="/auth/login"
          class="text-sm text-gray-700 hover:text-gray-900 sm:text-base dark:text-gray-300 dark:hover:text-white"
        >
          로그인
        </NuxtLink>
        <button
          v-else
          @click="logout"
          class="text-sm text-gray-700 hover:text-gray-900 sm:text-base dark:text-gray-300 dark:hover:text-white"
        >
          로그아웃
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { useAxios } from '@/composables/useAxios'
import { useColorMode } from '#imports'

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

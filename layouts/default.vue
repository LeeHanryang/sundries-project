<template>
  <UApp class="relative min-h-screen overflow-hidden bg-gray-50 dark:bg-gray-900">
    <AppAlert />
    <Header @toggle="startRipple" />
    <NuxtPage />

    <!-- 범위를 덮는 오버레이: 이전 테마 색 + clip-path 애니메이션 -->
    <div
      v-if="show"
      class="ripple-mask"
      :style="{
        '--cx': x + 'px',
        '--cy': y + 'px',
        backgroundColor: oldBg,
      }"
    />
  </UApp>
</template>

<script setup lang="ts">
import { useColorMode } from '#imports'

// state
const show = ref(false)
const x = ref(0)
const y = ref(0)
const nextColor = ref('')

// duration must match the CSS animation (600ms)
const DURATION = 600

const colorMode = useColorMode()

function startRipple(ev: MouseEvent) {
  // 1) capture click
  x.value = ev.clientX
  y.value = ev.clientY

  // 2) compute the **new** theme’s background color
  nextColor.value =
    colorMode.value === 'dark'
      ? '#F9FAFB' // light theme bg
      : '#111827' // dark theme bg

  // 3) show the circle
  show.value = true

  // 4) flip theme _after_ the circle has fully expanded
  setTimeout(() => {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }, DURATION)

  // 5) remove the overlay just after it finishes
  setTimeout(() => {
    show.value = false
  }, DURATION + 50)
}
</script>

<style scoped>
.ripple {
  position: fixed; /* won't trigger scrollbars */
  width: 200vmax; /* big enough to cover screen */
  height: 200vmax;
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(0);
  pointer-events: none;
  z-index: 50;
  animation: rippleGrow 0.6s ease-out forwards; /* matches DURATION */
}

@keyframes rippleGrow {
  from {
    opacity: 0.4;
    transform: translate(-50%, -50%) scale(0);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>

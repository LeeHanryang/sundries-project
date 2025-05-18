<template>
  <div class="app-alert fixed left-1/2 top-5 z-50 -translate-x-1/2 transform">
    <TransitionGroup name="slide" tag="div">
      <div
        v-for="(a, idx) in alerts"
        :key="idx"
        class="mb-2 rounded px-4 py-2 shadow"
        :class="a.type === 'error' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
      >
        {{ a.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { useAlert } from '@/composables/alert'
const { alerts } = useAlert()
</script>

<style scoped>
.app-alert .alert + .alert {
  margin-top: 0.5rem;
}
.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}
.slide-enter-to,
.slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>

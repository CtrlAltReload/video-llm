<script setup lang="ts">
import UiBackgroundOverlay from '../UI/UiBackgroundOverlay.vue'
</script>

<template>
  <div class="relative h-full w-full bg-light-background overflow-hidden">
    <div class="relative z-30 h-full w-full flex flex-col overflow-hidden">
      <slot />
    </div>
    <div
      class="absolute inset-0 z-0 top-0 blur-2xl h-full w-full overflow-hidden flex flex-col items-center justify-center cursor pointer-events-none"
    >
      <UiBackgroundOverlay />
    </div>
  </div>
</template>

<style scoped></style>

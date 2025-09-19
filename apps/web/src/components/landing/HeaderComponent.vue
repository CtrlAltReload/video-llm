<script setup lang="ts">
import UiButton from '../UI/UiButton.vue'
</script>

<template>
  <header
    class="w-[98%] mx-auto flex flex-wrap border-t-2 border-b-2 mt-3 items-center justify-between px-6 py-4 md:px-12"
  >
    <div class="flex items-center">
      <img
        src="@/assets/pathwiz_logo.png
      "
        alt="PathWiz Logo"
        class="h-4 md:h-8"
      />
    </div>
    <nav class="hidden md:flex">
      <ul class="flex items-center">
        <li class="mr-6">
          <RouterLink to="/" class="text-gray-600 font-epilogue hover:text-gray-900"
            >HOME</RouterLink
          >
        </li>
        <li class="mr-6">
          <RouterLink to="/about" class="text-gray-600 hover:text-gray-900 font-epilogue font-bold"
            >ABOUT</RouterLink
          >
        </li>
      </ul>
    </nav>
    <div class="hidden md:flex md:flex-row md:gap-2">
      <UiButton variant="secondary" size="sm">
        <p class="font-epilogue font-black px-4 py-2">Log In</p>
      </UiButton>
      <UiButton variant="primary" size="sm">
        <p class="font-epilogue font-black">Get Started</p>
      </UiButton>
    </div>
  </header>
</template>

<style scoped>
@media (min-width: 768px) {
  header {
    flex-wrap: nowrap;
  }
}
</style>

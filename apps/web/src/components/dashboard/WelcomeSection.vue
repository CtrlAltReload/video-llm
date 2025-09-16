<script setup lang="ts">
const props = defineProps<{
  user: {
    name: string
  }
}>()

defineEmits(['start-new-course'])
</script>

<template>
  <div class="mb-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-2">Welcome back, {{ props.user.name }}! 👋</h2>
    <p class="text-gray-600 mb-6">
      Ready to continue your coding journey? Start a new course or pick up where you left off.
    </p>

    <button
      @click="$emit('start-new-course')"
      class="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors inline-flex items-center"
    >
      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 4v16m8-8H4"
        ></path>
      </svg>
      Start New Course
    </button>
  </div>
</template>

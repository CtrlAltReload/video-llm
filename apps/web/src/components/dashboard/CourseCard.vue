<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
  >
    <div class="flex items-start justify-between mb-4">
      <div>
        <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ course.title }}</h4>
        <p class="text-sm text-gray-600">
          {{ course.modulesCompleted }}/{{ course.totalModules }} modules completed
        </p>
      </div>
      <span class="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
        >{{ course.progress }}%</span
      >
    </div>

    <!-- Progress Bar -->
    <div class="mb-4">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          class="bg-blue-600 h-2 rounded-full transition-all duration-300"
          :style="{ width: course.progress + '%' }"
        ></div>
      </div>
    </div>

    <button
      class="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors"
    >
      Continue Learning
    </button>
  </div>
</template>

<script setup lang="ts">
interface Course {
  title: string
  modulesCompleted: number
  totalModules: number
  progress: number
}

defineProps<{
  course: Course
}>()
</script>

<style scoped></style>

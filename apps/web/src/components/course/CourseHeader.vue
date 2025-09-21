<template>
  <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-lg mb-6">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-3xl font-bold mb-2">{{ course.course_title }}</h1>
        <p class="text-blue-100 mb-4">{{ course.course_description }}</p>
        <div class="flex items-center space-x-4 text-sm">
          <span class="flex items-center">
            <ClockIcon class="w-4 h-4 mr-1" />
            {{ course.estimated_duration }}
          </span>
          <span class="flex items-center">
            <BookOpenIcon class="w-4 h-4 mr-1" />
            {{ totalSections }} sections
          </span>
        </div>
      </div>
      <div class="text-right">
        <div class="text-2xl font-bold">{{ Math.round(overallProgress) }}%</div>
        <div class="text-sm text-blue-200">Complete</div>
      </div>
    </div>

    <div class="w-full bg-blue-400 rounded-full h-2">
      <div
        class="bg-white h-2 rounded-full transition-all duration-300"
        :style="{ width: `${overallProgress}%` }"
      ></div>
    </div>

    <div class="mt-4">
      <h3 class="text-sm font-semibold mb-2">Prerequisites:</h3>
      <ul class="text-sm text-blue-100 space-y-1">
        <li
          v-for="prerequisite in course.prerequisites"
          :key="prerequisite"
          class="flex items-center"
        >
          <CheckCircleIcon class="w-4 h-4 mr-2" />
          {{ prerequisite }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Course } from '@/utils/types'
import { ClockIcon, BookOpenIcon, CheckCircleIcon } from 'lucide-vue-next'

defineProps<{
  course: Course
  totalSections: number
  overallProgress: number
}>()
</script>

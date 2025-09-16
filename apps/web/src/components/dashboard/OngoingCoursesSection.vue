<script setup lang="ts">
import { ref } from 'vue'
import CourseCard from './CourseCard.vue'

export interface OngoingCoursesSectionProps {
  courses: Array<{
    id: number
    title: string
    progress: number
    modulesCompleted: number
    totalModules: number
  }>
}

const props = defineProps<OngoingCoursesSectionProps>()

const emits = defineEmits<{
  'start-new-course': () => void
}>()

const showNoCourses = ref(false)
</script>

<template>
  <div>
    <h3 class="text-xl font-bold text-gray-900 mb-4">Ongoing Courses</h3>
    <div v-if="props.courses.length > 0" class="space-y-4">
      <CourseCard v-for="course in props.courses" :key="course.id" :course="course"></CourseCard>
    </div>
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <svg
        class="w-12 h-12 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
        ></path>
      </svg>
      <h4 class="text-lg font-medium text-gray-900 mb-2">No courses yet!</h4>
      <p class="text-gray-600 mb-4">Start your first course now and begin your coding journey.</p>
      <button
        @click="emits('start-new-course')"
        class="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
      >
        Create Course
      </button>
    </div>
  </div>
</template>

<style scoped></style>

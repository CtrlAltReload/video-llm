// components/SectionContent.vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">{{ section.title }}</h2>
        <p class="text-gray-600">{{ section.start_time }} - {{ section.end_time }}</p>
      </div>
      <div class="text-right">
        <div class="text-sm text-gray-500">Progress</div>
        <div class="text-lg font-semibold">{{ progressText }}</div>
      </div>
    </div>

    <div class="mb-6">
      <h3 class="text-lg font-semibold mb-3">Overview</h3>
      <p class="text-gray-700 leading-relaxed">{{ section.content_summary }}</p>
    </div>

    <div class="space-y-8">
      <!-- Quizzes -->
      <div v-if="section.interactivity.quizzes.length > 0">
        <h3 class="text-lg font-semibold mb-4">Knowledge Check</h3>
        <div v-for="(quiz, index) in section.interactivity.quizzes" :key="`quiz-${index}`">
          <QuizComponent
            :quiz="quiz"
            :section-index="sectionIndex"
            :quiz-index="index"
            :is-completed="sectionProgress.quizzes.has(index)"
            @completed="markQuizCompleted"
            @next="scrollToNext"
          />
        </div>
      </div>

      <!-- Exercises -->
      <div v-if="section.interactivity.exercises.length > 0">
        <h3 class="text-lg font-semibold mb-4">Hands-on Practice</h3>
        <div
          v-for="(exercise, index) in section.interactivity.exercises"
          :key="`exercise-${index}`"
        >
          <ExerciseComponent
            :exercise="exercise"
            :section-index="sectionIndex"
            :exercise-index="index"
            :is-completed="sectionProgress.exercises.has(index)"
            @completed="markExerciseCompleted"
          />
        </div>
      </div>
    </div>

    <!-- Section Navigation -->
    <div class="flex justify-between mt-8 pt-6 border-t">
      <button
        v-if="sectionIndex > 0"
        @click="$emit('previousSection')"
        class="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
      >
        <ChevronLeftIcon class="w-4 h-4 mr-1" />
        Previous Section
      </button>
      <div v-else></div>

      <button
        v-if="sectionIndex < totalSections - 1"
        @click="$emit('nextSection')"
        class="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Next Section
        <ChevronRightIcon class="w-4 h-4 ml-1" />
      </button>
      <button
        v-else-if="allSectionsCompleted"
        @click="$emit('startAssessment')"
        class="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
      >
        Start Final Assessment
        <CheckCircleIcon class="w-4 h-4 ml-1" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon, CheckCircleIcon } from 'lucide-vue-next'
import type { Section } from '@/utils/types'
import QuizComponent from './QuizComponent.vue'
import ExerciseComponent from './ExerciseComponent.vue'

const props = defineProps<{
  section: Section
  sectionIndex: number
  totalSections: number
  sectionProgress: { quizzes: Set<number>; exercises: Set<number> }
  allSectionsCompleted: boolean
}>()

const emit = defineEmits<{
  markQuizCompleted: [sectionIndex: number, quizIndex: number]
  markExerciseCompleted: [sectionIndex: number, exerciseIndex: number]
  previousSection: []
  nextSection: []
  startAssessment: []
}>()

const progressText = computed(() => {
  const totalItems =
    props.section.interactivity.quizzes.length + props.section.interactivity.exercises.length
  const completedItems = props.sectionProgress.quizzes.size + props.sectionProgress.exercises.size
  return `${completedItems}/${totalItems}`
})

const markQuizCompleted = (sectionIndex: number, quizIndex: number) => {
  emit('markQuizCompleted', sectionIndex, quizIndex)
}

const markExerciseCompleted = (sectionIndex: number, exerciseIndex: number) => {
  emit('markExerciseCompleted', sectionIndex, exerciseIndex)
}

const scrollToNext = () => {
  // Scroll to next element or section
  window.scrollBy({ top: 200, behavior: 'smooth' })
}
</script>

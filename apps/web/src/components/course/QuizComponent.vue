// components/QuizComponent.vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Quiz {{ quizIndex + 1 }}</h3>
      <span
        v-if="isCompleted"
        class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
      >
        Completed
      </span>
    </div>

    <div class="mb-6">
      <p class="text-gray-800 mb-4">{{ quiz.question }}</p>

      <div class="space-y-2">
        <label
          v-for="option in quiz.options"
          :key="option"
          class="flex items-center p-3 border rounded-lg cursor-pointer transition-all duration-200"
          :class="{
            'border-blue-500 bg-blue-50': selectedAnswer === option && !showExplanation,
            'border-green-500 bg-green-50': showExplanation && option === quiz.correct_answer,
            'border-red-500 bg-red-50':
              showExplanation && selectedAnswer === option && option !== quiz.correct_answer,
            'hover:bg-gray-50': !showExplanation && selectedAnswer !== option,
          }"
        >
          <input
            type="radio"
            :name="`quiz-${sectionIndex}-${quizIndex}`"
            :value="option"
            v-model="selectedAnswer"
            :disabled="showExplanation"
            class="mr-3"
          />
          <span>{{ option }}</span>
          <CheckCircleIcon
            v-if="showExplanation && option === quiz.correct_answer"
            class="w-5 h-5 text-green-500 ml-auto"
          />
          <XCircleIcon
            v-if="showExplanation && selectedAnswer === option && option !== quiz.correct_answer"
            class="w-5 h-5 text-red-500 ml-auto"
          />
        </label>
      </div>
    </div>

    <div v-if="showExplanation" class="mb-4 p-4 bg-blue-50 rounded-lg">
      <h4 class="font-semibold mb-2">Explanation:</h4>
      <p class="text-gray-700">{{ quiz.explanation }}</p>
    </div>

    <button
      v-if="!showExplanation"
      @click="submitAnswer"
      :disabled="!selectedAnswer"
      class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
    >
      Submit Answer
    </button>

    <button
      v-else
      @click="nextItem"
      class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
    >
      Continue
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next'
import type { Quiz } from '@/utils/types'

const props = defineProps<{
  quiz: Quiz
  sectionIndex: number
  quizIndex: number
  isCompleted: boolean
}>()

const emit = defineEmits<{
  completed: [sectionIndex: number, quizIndex: number]
  next: []
}>()

const selectedAnswer = ref('')
const showExplanation = ref(props.isCompleted)

const isCorrect = computed(() => selectedAnswer.value === props.quiz.correct_answer)

const submitAnswer = () => {
  if (!selectedAnswer.value) return

  showExplanation.value = true
  if (isCorrect.value) {
    emit('completed', props.sectionIndex, props.quizIndex)
  }
}

const nextItem = () => {
  emit('next')
}

watch(
  () => props.isCompleted,
  (newVal) => {
    if (newVal) {
      showExplanation.value = true
    }
  },
)
</script>

import { courseData } from '@/utils/data'
import type { Course } from '@/utils/types'
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCourseStore = defineStore('course', () => {
  const selectedCourse = ref<Course>(courseData)
  const currentSectionIndex = ref(0)
  const completedSections = ref<Set<number>>(new Set())
  const sectionProgress = ref<Map<number, { quizzes: Set<number>; exercises: Set<number> }>>(
    new Map(),
  )
  const userAnswers = ref<Map<string, string>>(new Map())
  const exerciseCode = ref<Map<string, string>>(new Map())

  const currentSection = computed(() => selectedCourse.value.sections[currentSectionIndex.value])
  const totalSections = computed(() => selectedCourse.value.sections.length)
  const overallProgress = computed(() => (completedSections.value.size / totalSections.value) * 100)

  const getSectionProgress = (sectionIndex: number) => {
    const progress = sectionProgress.value.get(sectionIndex)
    if (!progress) return { quizzes: new Set(), exercises: new Set() }
    return progress
  }

  const initializeSectionProgress = (sectionIndex: number) => {
    if (!sectionProgress.value.has(sectionIndex)) {
      sectionProgress.value.set(sectionIndex, {
        quizzes: new Set(),
        exercises: new Set(),
      })
    }
  }

  const markQuizCompleted = (sectionIndex: number, quizIndex: number) => {
    initializeSectionProgress(sectionIndex)
    const progress = sectionProgress.value.get(sectionIndex)!
    progress.quizzes.add(quizIndex)
    checkSectionCompletion(sectionIndex)
  }

  const markExerciseCompleted = (sectionIndex: number, exerciseIndex: number) => {
    initializeSectionProgress(sectionIndex)
    const progress = sectionProgress.value.get(sectionIndex)!
    progress.exercises.add(exerciseIndex)
    checkSectionCompletion(sectionIndex)
  }

  const checkSectionCompletion = (sectionIndex: number) => {
    const section = selectedCourse.value.sections[sectionIndex]
    const progress = getSectionProgress(sectionIndex)

    const allQuizzesCompleted = progress.quizzes.size === section.interactivity.quizzes.length
    const allExercisesCompleted = progress.exercises.size === section.interactivity.exercises.length

    if (allQuizzesCompleted && allExercisesCompleted) {
      completedSections.value.add(sectionIndex)
    }
  }

  const navigateToSection = (index: number) => {
    if (index >= 0 && index < totalSections.value) {
      currentSectionIndex.value = index
    }
  }

  const nextSection = () => {
    if (currentSectionIndex.value < totalSections.value - 1) {
      currentSectionIndex.value++
    }
  }

  const previousSection = () => {
    if (currentSectionIndex.value > 0) {
      currentSectionIndex.value--
    }
  }

  const saveUserAnswer = (key: string, answer: string) => {
    userAnswers.value.set(key, answer)
  }

  const saveExerciseCode = (key: string, code: string) => {
    exerciseCode.value.set(key, code)
  }

  return {
    selectedCourse,
    currentSection,
    currentSectionIndex,
    totalSections,
    completedSections,
    overallProgress,
    getSectionProgress,
    markQuizCompleted,
    markExerciseCompleted,
    navigateToSection,
    nextSection,
    previousSection,
    saveUserAnswer,
    saveExerciseCode,
    userAnswers,
    exerciseCode,
  }
})

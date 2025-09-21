<template>
  <div
    class="bg-light-background rounded-3xl shadow-lg border border-black/10 hover:bg-green-500/5 hover:border-green-500 overflow-hidden transition-all duration-300 hover:shadow-xl"
  >
    <!-- Section Header - Clickable to toggle dropdown -->
    <div
      @click="toggleDropdown"
      class="flex flex-col items-center justify-between p-3 cursor-pointer transition-colors duration-200"
    >
      <div class="flex items-center space-x-4">
        <!-- Section Status Icon -->
        <div
          class="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300"
          :class="getSectionStatusClasses()"
        >
          <CheckLineIcon v-if="isSectionCompleted" class="w-3 h-3 text-white" />
          <PlayIcon v-else-if="isSectionCurrent" class="w-3 h-3 text-white" />
          <span v-else class="text-sm font-semibold text-gray-600">{{ sectionIndex + 1 }}</span>
        </div>

        <!-- Section Info -->
        <div>
          <h3 class="text-base font-semibold text-gray-900 mb-1">{{ section.title }}</h3>
          <p class="text-xs font-epilogue font-bold text-gray-500">
            {{ getTotalItems() }} items • {{ getCompletionText() }}
          </p>
        </div>
      </div>

      <!-- Dropdown Toggle & Progress -->
      <div class="flex flex-row w-full items-center space-x-3">
        <!-- Progress Indicator -->
        <div class="hidden flex-row flex-1 sm:flex items-center space-x-2">
          <div class="w-full bg-gray-200 rounded-full h-2">
            <div
              class="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-500"
              :style="{ width: getProgressPercentage() + '%' }"
            />
          </div>
          <span class="text-xs font-medium text-gray-600">{{ getProgressPercentage() }}%</span>
        </div>

        <!-- Chevron Icon -->
        <ChevronDownIcon
          stroke-width="3"
          class="text-green-500 transition-transform duration-300"
          :class="{ 'rotate-[180deg] ': isExpanded }"
        />
      </div>
    </div>

    <!-- Section Items - Collapsible -->
    <div v-show="isExpanded" class="border-t border-gray-100">
      <div class="p-3 pt-4 space-y-3">
        <!-- Video Item (Always present) -->
        <div
          @click="handleItemClick('video', 0)"
          class="flex items-center space-x-3 p-2 rounded-2xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
        >
          <div
            class="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center"
          >
            <PlayIcon class="w-4 h-4 text-white" />
          </div>
          <div class="flex-1">
            <span
              class="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors"
            >
              Watch Video
            </span>
            <p class="text-xs font-epilogue text-gray-500">Main content</p>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon v-if="isItemCompleted('video', 0)" class="w-5 h-5 text-green-500" />
            <CircleIcon v-else class="w-5 h-5 text-gray-300" />
          </div>
        </div>

        <!-- Quiz Items -->
        <div
          v-for="(quiz, index) in section.interactivity.quizzes"
          :key="`quiz-${index}`"
          @click="handleItemClick('quiz', index)"
          class="flex items-center space-x-3 p-2 rounded-3xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
        >
          <div
            class="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center"
          >
            <HelpCircleIcon class="w-4 h-4 text-white" />
          </div>
          <div class="flex-1">
            <span
              class="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors"
            >
              Quiz {{ index + 1 }}
            </span>
            <p class="text-xs font-epilogue text-gray-500">
              {{ quiz.question?.substring(0, 50) }}...
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon v-if="isItemCompleted('quiz', index)" class="w-5 h-5 text-green-500" />
            <CircleIcon v-else class="w-5 h-5 text-gray-300" />
          </div>
        </div>

        <!-- Exercise Items -->
        <div
          v-for="(exercise, index) in section.interactivity.exercises"
          :key="`exercise-${index}`"
          @click="handleItemClick('exercise', index)"
          class="flex items-center space-x-3 p-2 rounded-3xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
        >
          <div
            class="flex-shrink-0 w-8 h-8 rounded-lg bg-purple-500 flex items-center justify-center"
          >
            <PencilIcon class="w-4 h-4 text-white" />
          </div>
          <div class="flex-1">
            <span
              class="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors"
            >
              Exercise {{ index + 1 }}
            </span>
            <p class="text-xs font-epilogue text-gray-500">
              {{ exercise.title || 'Practice exercise' }}
            </p>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon
              v-if="isItemCompleted('exercise', index)"
              class="w-5 h-5 text-green-500"
            />
            <CircleIcon v-else class="w-5 h-5 text-gray-300" />
          </div>
        </div>

        <!-- Reading Materials (if any) -->
        <!-- <div 
          v-if="section.readingMaterials && section.readingMaterials.length > 0"
          v-for="(material, index) in section.readingMaterials"
          :key="`reading-${index}`"
          @click="handleItemClick('reading', index)"
          class="flex items-center space-x-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-all duration-200 group"
        >
          <div class="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center">
            <BookOpenIcon class="w-4 h-4 text-white" />
          </div>
          <div class="flex-1">
            <span class="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors">
              Reading {{ index + 1 }}
            </span>
            <p class="text-xs text-gray-500">{{ material.title || 'Additional reading' }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <CheckCircleIcon 
              v-if="isItemCompleted('reading', index)"
              class="w-5 h-5 text-green-500" 
            />
            <CircleIcon 
              v-else
              class="w-5 h-5 text-gray-300" 
            />
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  PlayIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  CircleIcon,
  HelpCircleIcon,
  PencilIcon,
  CheckLineIcon,
} from 'lucide-vue-next'

interface Section {
  title: string
  interactivity: {
    quizzes: Array<{ question?: string; [key: string]: unknown }>
    exercises: Array<{ title?: string; [key: string]: unknown }>
  }
  readingMaterials?: Array<{ title?: string; [key: string]: unknown }>
}

interface Props {
  section: Section
  sectionIndex: number
  completedSections: Set<number>
  completedItems?: Record<string, boolean> // Format: "sectionIndex-itemType-itemIndex"
  currentSection?: number
}

const props = withDefaults(defineProps<Props>(), {
  completedItems: () => ({}),
  currentSection: -1,
})

const emit = defineEmits<{
  navigateToSection: [index: number]
  navigateToItem: [sectionIndex: number, itemType: string, itemIndex: number]
}>()

const isExpanded = ref(false)

const isSectionCompleted = computed(() => {
  return props.completedSections.has(props.sectionIndex)
})

const isSectionCurrent = computed(() => {
  return props.currentSection === props.sectionIndex
})

const getTotalItems = () => {
  let total = 1 // Video
  total += props.section.interactivity.quizzes.length
  total += props.section.interactivity.exercises.length
  if (props.section.readingMaterials) {
    total += props.section.readingMaterials.length
  }
  return total
}

const getCompletedItemsCount = () => {
  let completed = 0
  const total = getTotalItems()

  for (let i = 0; i < total; i++) {
    if (isItemCompleted('video', 0)) completed++

    for (let j = 0; j < props.section.interactivity.quizzes.length; j++) {
      if (isItemCompleted('quiz', j)) completed++
    }

    for (let j = 0; j < props.section.interactivity.exercises.length; j++) {
      if (isItemCompleted('exercise', j)) completed++
    }

    if (props.section.readingMaterials) {
      for (let j = 0; j < props.section.readingMaterials.length; j++) {
        if (isItemCompleted('reading', j)) completed++
      }
    }
    break
  }

  return completed
}

const getProgressPercentage = () => {
  if (isSectionCompleted.value) return 100
  const total = getTotalItems()
  const completed = getCompletedItemsCount()
  return Math.round((completed / total) * 100)
}

const getCompletionText = () => {
  if (isSectionCompleted.value) {
    return 'Completed'
  }
  const completed = getCompletedItemsCount()
  const total = getTotalItems()
  return `${completed}/${total} completed`
}

const getSectionStatusClasses = () => {
  if (isSectionCompleted.value) {
    return 'bg-green-500 scale-110'
  } else if (isSectionCurrent.value) {
    return 'bg-blue-500'
  } else {
    return 'bg-gray-200'
  }
}

const isItemCompleted = (itemType: string, itemIndex: number): boolean => {
  const key = `${props.sectionIndex}-${itemType}-${itemIndex}`
  return props.completedItems[key] || false
}

const toggleDropdown = () => {
  isExpanded.value = !isExpanded.value
}

const handleItemClick = (itemType: string, itemIndex: number) => {
  emit('navigateToItem', props.sectionIndex, itemType, itemIndex)
}
</script>

<style scoped>
.rotate-180 {
  transform: rotate(180deg);
}
</style>

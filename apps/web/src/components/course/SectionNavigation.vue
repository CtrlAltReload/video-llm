<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-6">
    <h2 class="text-lg font-semibold mb-4">Course Sections</h2>
    <div class="space-y-2">
      <div
        v-for="(section, index) in sections"
        :key="index"
        class="flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200"
        :class="{
          'bg-blue-50 border-l-4 border-blue-500': index === currentSectionIndex,
          'hover:bg-gray-50': index !== currentSectionIndex,
          'bg-green-50': completedSections.has(index),
        }"
        @click="$emit('navigateToSection', index)"
      >
        <div class="flex items-center flex-1">
          <div class="flex-shrink-0 mr-3">
            <CheckCircleIcon v-if="completedSections.has(index)" class="w-6 h-6 text-green-500" />
            <PlayCircleIcon
              v-else-if="index === currentSectionIndex"
              class="w-6 h-6 text-blue-500"
            />
            <CircleIcon v-else class="w-6 h-6 text-gray-300" />
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="font-medium text-gray-900 truncate">{{ section.title }}</h3>
            <p class="text-sm text-gray-500">{{ section.start_time }} - {{ section.end_time }}</p>
          </div>
        </div>
        <div class="text-sm text-gray-400">
          {{ getSectionItemsCompleted(index) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Section } from '@/utils/types'
import { CheckCircleIcon, PlayCircleIcon, CircleIcon } from 'lucide-vue-next'

const props = defineProps<{
  sections: Section[]
  currentSectionIndex: number
  completedSections: Set<number>
  getSectionProgress: (index: number) => { quizzes: Set<number>; exercises: Set<number> }
}>()

defineEmits<{
  navigateToSection: [index: number]
}>()

const getSectionItemsCompleted = (sectionIndex: number) => {
  const section = props.sections[sectionIndex]
  const progress = props.getSectionProgress(sectionIndex)
  const totalItems = section.interactivity.quizzes.length + section.interactivity.exercises.length
  const completedItems = progress.quizzes.size + progress.exercises.size
  return `${completedItems}/${totalItems}`
}
</script>

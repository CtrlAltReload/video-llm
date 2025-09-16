<script setup lang="ts">
import { ref, defineEmits, defineProps } from 'vue'

export interface NewCourseModalProps {
  show: boolean
  isCreating: boolean
  newCourse: {
    title: string
    videoUrl: string
  }
}

const props = defineProps<NewCourseModalProps>()

const emits = defineEmits<{
  close: () => void
  create: () => void
}>()

const newCourse = ref(props.newCourse)

const isCreating = ref(props.isCreating)

const show = ref(props.show)
</script>

<template>
  <div
    v-show="show"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
  >
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full">
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Create New Course</h3>
          <button @click="emits('close')" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Course Title</label>
            <input
              v-model="newCourse.title"
              type="text"
              placeholder="Enter course title..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Video Source</label>
            <div class="space-y-3">
              <div>
                <label class="block text-xs text-gray-600 mb-1">Upload Video File</label>
                <input
                  type="file"
                  accept="video/*"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div class="text-center text-gray-500 text-sm">OR</div>
              <div>
                <label class="block text-xs text-gray-600 mb-1">Video URL</label>
                <input
                  v-model="newCourse.videoUrl"
                  type="url"
                  placeholder="https://youtube.com/watch?v=..."
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button
            @click="emits('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            @click="emits('create')"
            :disabled="isCreating"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors disabled:opacity-50 flex items-center"
          >
            <svg
              v-show="isCreating"
              class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            {{ isCreating ? 'Creating...' : 'Create Course' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<template>
  <div class="flex-1 flex flex-col items-center justify-center gap-4 pb-40">
    <div class="size-30 flex items-center justify-center rounded-full bg-black">
      <Telescope :size="50" class="text-green-500" />
    </div>

    <h2 class="text-3xl md:text-4xl font-gloock text-gray-900 mb-4">{{ title }}</h2>

    <UiTypography
      variant="paragraph"
      size="md"
      class="font-epilogue max-w-2xl text-center text-gray-600"
    >
      {{ description }}
    </UiTypography>

    <input
      type="text"
      placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      class="input ring-1 ring-black/30 my-4 px-2 md:px-5 py-3 rounded-full font-epilogue w-full max-w-2xl focus:ring-2 focus:ring-primary/30 focus:bg-primary/10 focus:outline-none"
    />

    <!-- create button -->
    <div class="flex flex-col sm:flex-row gap-4 max-w-md">
      <UiButton
        variant="primary"
        size="lg"
        :icon="true"
        icon-position="after"
        class="flex-1"
        :onclick="handleCreateCourse"
      >
        <template #icon>
          <PlusCircle class="w-5 h-5" />
        </template>
        Create Your First Course
      </UiButton>
    </div>

    <!-- Feature Highlights -->
    <!-- <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-4xl">
      <div class="text-center">
        <div class="w-16 h-16 bg-black rounded-3xl flex items-center justify-center mx-auto mb-4">
          <Zap class="w-8 h-8 text-blue-600" />
        </div>
        <h3 class="font-epilogue font-black text-lg text-gray-900 mb-2">AI-Powered</h3>
        <UiTypography variant="paragraph" size="sm" class="text-gray-600 font-epilogue">
          Advanced AI analyzes videos and creates structured learning paths
        </UiTypography>
      </div>

      <div class="text-center">
        <div
          class="w-16 h-16 bg-green-200 rounded-3xl flex items-center justify-center mx-auto mb-4"
        >
          <Target class="w-8 h-8 text-green-600" />
        </div>
        <h3 class="font-epilogue font-black text-lg text-gray-900 mb-2">Progress Tracking</h3>
        <UiTypography variant="paragraph" size="sm" class="text-gray-600 font-epilogue">
          Monitor your learning journey with detailed progress insights
        </UiTypography>
      </div>

      <div class="text-center">
        <div
          class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4"
        >
          <Code class="w-8 h-8 text-purple-600" />
        </div>
        <h3 class="font-epilogue font-black text-lg text-gray-900 mb-2">Hands-On Projects</h3>
        <UiTypography variant="paragraph" size="sm" class="text-gray-600 font-epilogue">
          Practice with interactive coding exercises and real-time feedback
        </UiTypography>
      </div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { PlusCircle, Telescope } from 'lucide-vue-next'
import UiButton from '../UI/UiButton.vue'
import UiTypography from '../UI/UiTypography.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  handleCreateCourse: {
    type: Function,
    required: true,
  },
})
</script>

<template>
  <div
    class="min-h-screen w-full bg-light-background flex items-center justify-center p-6 overflow-y-scroll"
  >
    <div class="w-full max-w-2xl">
      <!-- Header -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mb-6 shadow-lg"
        >
          <CheckIcon v-if="isAllComplete" class="w-10 h-10 text-white" />
          <SparklesIcon v-else class="w-10 h-10 text-white animate-pulse" />
        </div>
        <h1 class="text-3xl font-bold text-gray-900 mb-3">
          {{ isAllComplete ? 'Course Created Successfully!' : 'Creating Your Course...' }}
        </h1>
        <p class="text-gray-600 font-epilogue">
          {{
            isAllComplete
              ? 'Your personalized learning experience is ready to begin'
              : 'Please wait while we build your personalized learning experience'
          }}
        </p>
      </div>

      <!-- Loading Steps -->
      <div class="bg-light-background rounded-[44px] border border-black/10 p-8 shadow-2xl mb-8">
        <div class="space-y-6">
          <div
            v-for="(step, index) in loadingSteps"
            :key="step.id"
            class="flex items-start space-x-4"
          >
            <!-- Step Icon -->
            <div
              class="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500"
              :class="getStepIconClasses(index)"
            >
              <CheckIcon v-if="isStepCompleted(index)" class="w-5 h-5 text-white" />
              <LoaderIcon
                v-else-if="isStepCurrent(index)"
                class="w-5 h-5 text-green-500 animate-spin"
              />
              <div
                v-else
                class="w-2 h-2 rounded-full"
                :class="isStepPending(index) ? 'bg-gray-300' : 'bg-green-500'"
              />
            </div>

            <!-- Step Content -->
            <div class="flex-1 min-w-0">
              <div
                class="font-semibold transition-colors duration-300"
                :class="getStepTitleClasses(index)"
              >
                {{ step.title }}
              </div>
              <div
                class="text-sm mt-1 font-epilogue transition-colors duration-300"
                :class="getStepDescriptionClasses(index)"
              >
                {{ step.description }}
              </div>

              <!-- Progress bar for current step -->
              <div v-if="isStepCurrent(index)" class="mt-3">
                <div class="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    class="bg-green-500 h-1.5 rounded-full animate-pulse transition-all duration-300"
                    :style="{ width: stepProgress + '%' }"
                  />
                </div>
              </div>
            </div>

            <!-- Completion indicator -->
            <div
              v-if="isStepCompleted(index)"
              class="text-green-500 font-epilogue text-sm font-bold"
            >
              Complete
            </div>
          </div>
        </div>
      </div>

      <!-- Success Actions -->
      <div v-if="isAllComplete" class="animate-fade-in">
        <!-- Course Preview Card -->
        <div class="bg-light-background rounded-[44px] border border-gray-200 p-6 shadow-2xl mb-8">
          <div class="flex items-start space-x-4">
            <div
              class="w-20 h-20 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center"
            >
              <PlayIcon class="w-8 h-8 text-green-500" />
            </div>
            <div class="flex-1">
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                {{ courseTitle }}
              </h3>
              <p class="text-gray-600 font-epilogue text-sm mb-3">
                Interactive course • 5 modules • {{ skillLevel }} level
              </p>
              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <div class="flex items-center space-x-1">
                  <BookOpenIcon class="w-4 h-4" />
                  <span>{{ duration }} hours</span>
                </div>
                <div class="flex items-center space-x-1">
                  <CheckIcon class="w-4 h-4" />
                  <span>Interactive exercises</span>
                </div>
                <div class="flex items-center space-x-1">
                  <SparklesIcon class="w-4 h-4" />
                  <span>AI assistance</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="handleViewCourse"
            class="flex items-center justify-center space-x-2 bg-black hover:bg-green-500 text-white hover:text-black font-semibold py-4 px-8 rounded-full transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-green-200"
          >
            <PlayIcon class="w-5 h-5" />
            <span>Start Learning</span>
          </button>
        </div>

        <!-- Success Message -->
        <div class="text-center mt-8 p-6 bg-green-50 rounded-2xl border border-green-200">
          <p class="text-green-700 font-epilogue font-medium">
            🎉 Your course has been optimized for your learning style and includes interactive
            elements to help you master the concepts effectively!
          </p>
        </div>
      </div>

      <!-- Loading indicator when not complete -->
      <div v-if="!isAllComplete" class="text-center">
        <div class="inline-flex items-center space-x-2 text-gray-500">
          <LoaderIcon class="w-4 h-4 animate-spin" />
          <span class="text-sm">This usually takes 1-2 minutes</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  CheckIcon,
  SparklesIcon,
  PlayIcon,
  BookOpenIcon,
  Loader2 as LoaderIcon,
} from 'lucide-vue-next'
import { useRouter } from 'vue-router'

interface LoadingStep {
  id: number
  title: string
  description: string
  duration: number
}

interface Props {
  courseTitle?: string
  skillLevel?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  courseTitle: 'Learning with Pathwiz AI',
  skillLevel: 'Beginner',
  duration: 3,
})

const emit = defineEmits<{
  viewCourse: []
  createAnother: []
}>()

const currentLoadingStep = ref<number>(0)
const completedSteps = ref<number[]>([])
const isAllComplete = ref<boolean>(false)
const stepProgress = ref<number>(0)

const loadingSteps: LoadingStep[] = [
  {
    id: 1,
    title: 'Analyzing Video Content',
    description: 'Processing video transcript and identifying key concepts',
    duration: 2000,
  },
  {
    id: 2,
    title: 'Generating Course Structure',
    description: 'Creating modules and organizing learning objectives',
    duration: 1800,
  },
  {
    id: 3,
    title: 'Building Interactive Elements',
    description: 'Adding quizzes, exercises, and practice materials',
    duration: 2200,
  },
  {
    id: 4,
    title: 'Optimizing for Your Level',
    description: 'Customizing content based on your skill level',
    duration: 1500,
  },
  {
    id: 5,
    title: 'Finalizing Course Materials',
    description: 'Preparing resources and setting up progress tracking',
    duration: 1200,
  },
]

const isStepCompleted = (index: number): boolean => {
  return completedSteps.value.includes(index)
}

const isStepCurrent = (index: number): boolean => {
  return currentLoadingStep.value === index && !isStepCompleted(index)
}

const isStepPending = (index: number): boolean => {
  return currentLoadingStep.value < index
}

const getStepIconClasses = (index: number): string => {
  if (isStepCompleted(index)) {
    return 'bg-green-500 scale-110'
  } else if (isStepCurrent(index)) {
    return 'bg-green-100 border-2 border-green-500'
  } else {
    return 'bg-gray-100 border-2 border-gray-200'
  }
}

const getStepTitleClasses = (index: number): string => {
  if (isStepCompleted(index)) {
    return 'text-green-700'
  } else if (isStepCurrent(index)) {
    return 'text-gray-900'
  } else {
    return 'text-gray-500'
  }
}

const getStepDescriptionClasses = (index: number): string => {
  if (isStepCompleted(index)) {
    return 'text-green-600'
  } else if (isStepCurrent(index)) {
    return 'text-gray-600'
  } else {
    return 'text-gray-400'
  }
}

const processSteps = async (): Promise<void> => {
  for (let i = 0; i < loadingSteps.length; i++) {
    currentLoadingStep.value = i

    const progressInterval = setInterval(() => {
      if (stepProgress.value < 100) {
        stepProgress.value += Math.random() * 10
      }
    }, 200)

    await new Promise((resolve) => setTimeout(resolve, loadingSteps[i].duration))

    clearInterval(progressInterval)
    stepProgress.value = 100
    completedSteps.value = [...completedSteps.value, i]
    stepProgress.value = 0
  }

  setTimeout(() => {
    isAllComplete.value = true
  }, 500)
}

const router = useRouter()
const handleViewCourse = (): void => {
  router.push('/home')
}

onMounted(() => {
  processSteps()
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

<template>
  <div class="">
    <div class="max-w-md mx-auto">
      <div class="">
        <!-- Progress Bar -->
        <div class="relative mb-16">
          <!-- Background Line -->
          <div class="absolute top-4 left-0 w-full h-1 bg-gray-200 rounded-full"></div>

          <!-- Active Progress Line -->
          <div
            class="absolute top-4 left-0 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full transition-all duration-700 ease-out"
            :style="{ width: `${(currentStep / steps.length) * 100}%` }"
          ></div>

          <!-- Steps -->
          <div class="flex justify-between relative">
            <div v-for="(step, index) in steps" :key="step.id">
              <div class="flex flex-col items-center group">
                <!-- Step Circle -->
                <button
                  @click="goToStep(step.id)"
                  :disabled="!isAccessible(step.id)"
                  class="relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-500 transform hover:scale-110 z-10"
                  :class="{
                    'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl':
                      isCompleted(step.id),
                    'bg-gradient-to-r from-indigo-500 to-cyan-500 text-white shadow-lg hover:shadow-xl animate-pulse':
                      isActive(step.id),
                    'bg-white border-2 border-gray-300 text-gray-600 hover:border-indigo-400 hover:text-indigo-600':
                      isAccessible(step.id),
                    'bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed':
                      !isAccessible(step.id),
                  }"
                >
                  <Check v-if="isCompleted(step.id)" class="w-5 h-5" />
                  <Circle v-else-if="isActive(step.id)" class="w-5 h-5 fill-current" />
                  <span v-else>{{ step.id }}</span>

                  <!-- Active Step Glow -->
                  <div
                    v-if="isActive(step.id)"
                    class="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 animate-ping opacity-30"
                  ></div>
                </button>

                <!-- Step Info -->
                <div class="mt-4 text-center">
                  <h3
                    class="text-sm font-semibold transition-colors duration-300"
                    :class="{
                      'text-indigo-600': isActive(step.id),
                      'text-green-600': isCompleted(step.id),
                      'text-gray-600': !isActive(step.id) && !isCompleted(step.id),
                    }"
                  >
                    {{ step.title }}
                  </h3>
                  <p class="text-xs text-gray-500 mt-1">
                    {{ step.description }}
                  </p>
                </div>

                <!-- Status Indicator -->
                <div
                  class="mt-2 w-2 h-2 rounded-full transition-all duration-300"
                  :class="{
                    'bg-indigo-500 animate-pulse': isActive(step.id),
                    'bg-green-500': isCompleted(step.id),
                    'bg-gray-300': !isActive(step.id) && !isCompleted(step.id),
                  }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ref } from 'vue'

const steps = [
  { id: 1, title: 'Account Info', description: 'Personal details' },
  { id: 2, title: 'Verification', description: 'Email & phone' },
  { id: 3, title: 'Preferences', description: 'Choose settings' },
  { id: 4, title: 'Complete', description: 'All done!' },
]

const currentStep = ref<number>(3)

const isAccessible = computed<(stepId: number) => boolean>(
  () => (stepId) => currentStep.value >= stepId,
)

const isActive = computed<(stepId: number) => boolean>(
  () => (stepId) => currentStep.value === stepId,
)

const isCompleted = computed<(stepId: number) => boolean>(
  () => (stepId) => currentStep.value > stepId,
)

const nextStep = () => {
  if (currentStep.value < steps.length) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const goToStep = (stepId: number) => {
  if (stepId <= currentStep.value) {
    currentStep.value = stepId
  }
}
</script>

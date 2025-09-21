// components/ExerciseComponent.vue
<template>
  <div class="bg-white rounded-lg shadow-md p-6 mb-6">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold">Exercise {{ exerciseIndex + 1 }}</h3>
      <span
        v-if="isCompleted"
        class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
      >
        Completed
      </span>
    </div>

    <div class="mb-4">
      <p class="text-gray-800 mb-4">{{ exercise.prompt }}</p>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      <div>
        <h4 class="font-semibold mb-2">Your Code:</h4>
        <textarea
          v-model="userCode"
          class="w-full h-40 p-3 border rounded-lg font-mono text-sm bg-gray-50"
          :placeholder="exercise.code_stub"
          :disabled="isCompleted && !showCode"
        ></textarea>

        <div class="mt-4 flex space-x-2">
          <button
            @click="runCode"
            :disabled="!userCode.trim()"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Run Code
          </button>
          <button
            v-if="isCompleted"
            @click="showCode = !showCode"
            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            {{ showCode ? 'Hide' : 'Show' }} Solution
          </button>
        </div>
      </div>

      <div>
        <h4 class="font-semibold mb-2">Output:</h4>
        <div class="bg-black text-green-400 p-3 rounded-lg font-mono text-sm h-40 overflow-y-auto">
          <div v-if="output">{{ output }}</div>
          <div v-else class="text-gray-500">Run your code to see output...</div>
        </div>

        <div v-if="expectedOutput" class="mt-2">
          <h5 class="text-sm font-semibold text-gray-600">Expected Output:</h5>
          <div class="bg-gray-100 p-2 rounded text-sm font-mono">{{ expectedOutput }}</div>
        </div>
      </div>
    </div>

    <div v-if="showCode && isCompleted" class="mt-4 p-4 bg-green-50 rounded-lg">
      <h4 class="font-semibold mb-2">Solution:</h4>
      <pre
        class="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto"
      ><code>{{ solutionCode }}</code></pre>
    </div>

    <div v-if="testResults.length > 0" class="mt-4">
      <h4 class="font-semibold mb-2">Test Results:</h4>
      <div class="space-y-2">
        <div
          v-for="(result, index) in testResults"
          :key="index"
          class="flex items-center p-2 rounded"
          :class="result.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'"
        >
          <CheckCircleIcon v-if="result.passed" class="w-4 h-4 mr-2" />
          <XCircleIcon v-else class="w-4 h-4 mr-2" />
          <span class="text-sm">{{ result.test }}</span>
        </div>
      </div>
    </div>

    <button
      v-if="allTestsPassed && !isCompleted"
      @click="completeExercise"
      class="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
    >
      Mark as Complete
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CheckCircleIcon, XCircleIcon } from 'lucide-vue-next'
import type { Exercise } from '@/utils/types'

const props = defineProps<{
  exercise: Exercise
  sectionIndex: number
  exerciseIndex: number
  isCompleted: boolean
}>()

const emit = defineEmits<{
  completed: [sectionIndex: number, exerciseIndex: number]
}>()

const userCode = ref('')
const output = ref('')
const testResults = ref<Array<{ test: string; passed: boolean }>>([])
const showCode = ref(false)

const expectedOutput = computed(() => props.exercise.expected_output)
const solutionCode = computed(() => {
  // This would contain the actual solution code
  return `# Solution for: ${props.exercise.prompt}\n${props.exercise.code_stub.replace(/\n\n/g, '\nmy_list = [1, 2, 3, 4, 5]\nprint(len(my_list))')}`
})

const allTestsPassed = computed(() => {
  return testResults.value.length > 0 && testResults.value.every((result) => result.passed)
})

const runCode = () => {
  if (!userCode.value.trim()) return

  try {
    // Simulate code execution (in a real app, this would use a Python interpreter)
    output.value = simulateCodeExecution(userCode.value)
    runTests()
  } catch (error) {
    output.value = `Error: ${error}`
    testResults.value = []
  }
}

const simulateCodeExecution = (code: string): string => {
  // This is a simplified simulation - in a real app, you'd use a Python interpreter
  if (code.includes('my_list = [1, 2, 3, 4, 5]') && code.includes('print(len(my_list))')) {
    return '5'
  }
  return 'Code executed successfully'
}

const runTests = () => {
  // Simulate test execution
  testResults.value = props.exercise.tests.map((test) => ({
    test,
    passed: Math.random() > 0.3, // Simulate some tests passing
  }))
}

const completeExercise = () => {
  emit('completed', props.sectionIndex, props.exerciseIndex)
}

watch(
  () => props.exercise,
  () => {
    userCode.value = ''
    output.value = ''
    testResults.value = []
    showCode.value = false
  },
)
</script>

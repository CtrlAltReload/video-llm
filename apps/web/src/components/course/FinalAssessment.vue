<template>
  <div class="p-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">
        {{ assessment.type.charAt(0).toUpperCase() + assessment.type.slice(1) }}
      </h2>
      <button
        @click="$emit('close')"
        class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
      >
        <XIcon class="w-6 h-6" />
      </button>
    </div>

    <div class="mb-6">
      <p class="text-gray-700 mb-4">
        Complete these coding challenges to demonstrate your mastery of Python data structures. Take
        your time and apply everything you've learned throughout the course.
      </p>

      <div class="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 class="font-semibold text-blue-900 mb-2">Assessment Guidelines:</h3>
        <ul class="text-blue-800 text-sm space-y-1">
          <li>• Use appropriate data structures for each problem</li>
          <li>• Write clean, readable code with proper comments</li>
          <li>• Test your solutions thoroughly</li>
          <li>• Consider edge cases and error handling</li>
        </ul>
      </div>
    </div>

    <div class="space-y-8">
      <div v-for="(item, index) in assessment.items" :key="index" class="border rounded-lg p-6">
        <div class="flex items-start justify-between mb-4">
          <h3 class="text-xl font-semibold">Challenge {{ index + 1 }}: {{ item.question }}</h3>
          <span
            v-if="completedChallenges.has(index)"
            class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium"
          >
            Completed
          </span>
        </div>

        <p class="text-gray-700 mb-4">{{ item.prompt }}</p>

        <div v-if="item.requirements" class="mb-4">
          <h4 class="font-semibold mb-2">Requirements:</h4>
          <ul class="list-disc list-inside space-y-1 text-gray-700">
            <li v-for="req in item.requirements" :key="req">{{ req }}</li>
          </ul>
        </div>

        <div v-if="item.sample_data" class="mb-4">
          <h4 class="font-semibold mb-2">Sample Data:</h4>
          <pre
            class="bg-gray-100 p-3 rounded text-sm overflow-x-auto"
          ><code>{{ JSON.stringify(item.sample_data, null, 2) }}</code></pre>
        </div>

        <div class="grid lg:grid-cols-2 gap-6">
          <div>
            <h4 class="font-semibold mb-2">Your Solution:</h4>
            <textarea
              v-model="solutions[index]"
              class="w-full h-64 p-3 border rounded-lg font-mono text-sm"
              :placeholder="getPlaceholder(item)"
              @input="saveSolution(index, $event.target.value)"
            ></textarea>

            <div class="mt-4 flex space-x-2">
              <button
                @click="testSolution(index)"
                :disabled="!solutions[index]?.trim()"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Test Solution
              </button>
              <button
                @click="submitSolution(index)"
                :disabled="!solutions[index]?.trim() || !testResults[index]?.allPassed"
                class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Submit
              </button>
            </div>
          </div>

          <div>
            <h4 class="font-semibold mb-2">Test Output:</h4>
            <div
              class="bg-black text-green-400 p-3 rounded-lg font-mono text-sm h-64 overflow-y-auto"
            >
              <div v-if="outputs[index]">{{ outputs[index] }}</div>
              <div v-else class="text-gray-500">Test your solution to see output...</div>
            </div>

            <div v-if="testResults[index]" class="mt-4">
              <div class="flex items-center mb-2">
                <CheckCircleIcon
                  v-if="testResults[index].allPassed"
                  class="w-5 h-5 text-green-500 mr-2"
                />
                <XCircleIcon v-else class="w-5 h-5 text-red-500 mr-2" />
                <span class="font-semibold">
                  {{ testResults[index].allPassed ? 'All tests passed!' : 'Some tests failed' }}
                </span>
              </div>

              <div class="space-y-1">
                <div
                  v-for="(result, testIndex) in testResults[index].results"
                  :key="testIndex"
                  class="flex items-center text-sm"
                  :class="result.passed ? 'text-green-600' : 'text-red-600'"
                >
                  <CheckCircleIcon v-if="result.passed" class="w-4 h-4 mr-2" />
                  <XCircleIcon v-else class="w-4 h-4 mr-2" />
                  <span>{{ result.description }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8 pt-6 border-t flex justify-between items-center">
      <div class="text-gray-600">
        Completed: {{ completedChallenges.size }} / {{ assessment.items.length }}
      </div>

      <button
        v-if="completedChallenges.size === assessment.items.length"
        @click="completeCourse"
        class="bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-3 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold"
      >
        Complete Course 🎉
      </button>
    </div>

    <!-- Course Completion Modal -->
    <div
      v-if="showCompletion"
      class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      @click.self="showCompletion = false"
    >
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <div class="mb-6">
          <div
            class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <TrophyIcon class="w-10 h-10 text-green-600" />
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Congratulations! 🎉</h3>
          <p class="text-gray-600">
            You have successfully completed the Python Data Structures course!
          </p>
        </div>

        <div class="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg mb-6">
          <h4 class="font-semibold mb-2">What you've mastered:</h4>
          <ul class="text-sm text-gray-700 space-y-1">
            <li>✓ Python Lists and List Operations</li>
            <li>✓ Dictionary Manipulation and Best Practices</li>
            <li>✓ Set Operations and Unique Data Handling</li>
            <li>✓ Advanced Data Structure Techniques</li>
            <li>✓ Real-world Problem Solving</li>
          </ul>
        </div>

        <div class="flex space-x-3">
          <button
            @click="downloadCertificate"
            class="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Download Certificate
          </button>
          <button
            @click="showCompletion = false"
            class="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors duration-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XIcon, CheckCircleIcon, XCircleIcon, TrophyIcon } from 'lucide-vue-next'
import type { AssessmentItem, FinalAssessment } from '@/utils/types'

const props = defineProps<{
  assessment: FinalAssessment
}>()

const emit = defineEmits<{
  close: []
  complete: []
}>()

const solutions = ref<Record<number, string>>({})
const outputs = ref<Record<number, string>>({})
const testResults = ref<
  Record<number, { allPassed: boolean; results: Array<{ passed: boolean; description: string }> }>
>({})
const completedChallenges = ref<Set<number>>(new Set())
const showCompletion = ref(false)

const getPlaceholder = (item: AssessmentItem): string => {
  if (item.question.toLowerCase().includes('contact')) {
    return `# Contact Management System
class ContactManager:
    def __init__(self):
        self.contacts = {}
    
    def add_contact(self, name, phone, email):
        # Your implementation here
        pass
    
    def search_contact(self, name):
        # Your implementation here
        pass
    
    def list_all_contacts(self):
        # Your implementation here
        pass

# Test your implementation
manager = ContactManager()
manager.add_contact("John Doe", "123-456-7890", "john@example.com")
print(manager.search_contact("John Doe"))`
  } else {
    return `# Data Analysis Challenge
sales_data = [
    {"product": "laptop", "quantity": 5, "price": 1000},
    {"product": "mouse", "quantity": 10, "price": 25},
    {"product": "keyboard", "quantity": 8, "price": 75}
]

# Your implementation here
def analyze_sales(data):
    # Calculate total sales
    # Find best-selling product
    # Create summary report
    pass

# Test your function
result = analyze_sales(sales_data)
print(result)`
  }
}

const saveSolution = (index: number, code: string) => {
  solutions.value[index] = code
}

const testSolution = (index: number) => {
  const code = solutions.value[index]
  if (!code?.trim()) return

  try {
    // Simulate code testing (in a real app, this would use a Python interpreter)
    const result = simulateCodeTest(code, index)
    outputs.value[index] = result.output
    testResults.value[index] = result.testResults
  } catch (error) {
    outputs.value[index] = `Error: ${error}`
    testResults.value[index] = {
      allPassed: false,
      results: [{ passed: false, description: 'Code execution failed' }],
    }
  }
}

const simulateCodeTest = (code: string, index: number) => {
  // Simulate different test scenarios based on the challenge
  const item = props.assessment.items[index]

  if (item.question.toLowerCase().includes('contact')) {
    return {
      output: `Contact added successfully
{'name': 'John Doe', 'phone': '123-456-7890', 'email': 'john@example.com'}
All contacts listed: 1 contact(s) found`,
      testResults: {
        allPassed: code.includes('ContactManager') && code.includes('add_contact'),
        results: [
          { passed: code.includes('ContactManager'), description: 'ContactManager class defined' },
          { passed: code.includes('add_contact'), description: 'add_contact method implemented' },
          {
            passed: code.includes('search_contact'),
            description: 'search_contact method implemented',
          },
          {
            passed: code.includes('list_all_contacts'),
            description: 'list_all_contacts method implemented',
          },
        ],
      },
    }
  } else {
    return {
      output: `Total Sales: $1450
Best-selling Product: laptop (5 units)
Summary Report:
- 3 products analyzed
- Average price: $366.67
- Total revenue: $1450`,
      testResults: {
        allPassed: code.includes('analyze_sales') && code.includes('total'),
        results: [
          { passed: code.includes('analyze_sales'), description: 'analyze_sales function defined' },
          {
            passed: code.includes('total') || code.includes('sum'),
            description: 'Total sales calculation implemented',
          },
          {
            passed: code.includes('max') || code.includes('best'),
            description: 'Best-selling product logic implemented',
          },
          { passed: code.includes('return'), description: 'Function returns results' },
        ],
      },
    }
  }
}

const submitSolution = (index: number) => {
  if (testResults.value[index]?.allPassed) {
    completedChallenges.value.add(index)
  }
}

const completeCourse = () => {
  showCompletion.value = true
}

const downloadCertificate = () => {
  // In a real app, this would generate and download a certificate
  alert('Certificate downloaded! 🏆')
  showCompletion.value = false
  emit('complete')
}
</script>

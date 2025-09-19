<template>
  <MainLayout>
    <section class="w-full h-full flex flex-col">
      <HeaderComponent />

      <!-- Course Header -->
      <div class="w-[98%] mx-auto px-6 py-6 md:px-12">
        <div class="flex items-center gap-4 mb-6">
          <UiButton
            variant="secondary"
            size="sm"
            :icon="true"
            icon-position="before"
            @click="handleGoBack"
          >
            <template #icon>
              <ArrowLeft class="w-4 h-4" />
            </template>
            Back to Dashboard
          </UiButton>

          <div class="flex items-center gap-2">
            <span
              :class="{
                'bg-green-100 text-green-800': course.status === 'completed',
                'bg-orange-100 text-orange-800': course.status === 'in-progress',
                'bg-gray-100 text-gray-800': course.status === 'not-started',
              }"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{
                course.status === 'in-progress'
                  ? 'In Progress'
                  : course.status === 'completed'
                    ? 'Completed'
                    : 'Not Started'
              }}
            </span>
            <span
              :class="{
                'bg-green-100 text-green-800': course.difficulty === 'beginner',
                'bg-orange-100 text-orange-800': course.difficulty === 'intermediate',
                'bg-red-100 text-red-800': course.difficulty === 'advanced',
              }"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ course.difficulty }}
            </span>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Main Content -->
          <div class="lg:col-span-2">
            <!-- Course Title and Info -->
            <div class="mb-6">
              <h1 class="text-3xl md:text-4xl font-gloock text-gray-900 mb-4">
                {{ course.title }}
              </h1>
              <UiTypography variant="paragraph" size="lg" class="text-gray-600 mb-4">
                {{ course.description }}
              </UiTypography>

              <!-- Course Meta -->
              <div class="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-6">
                <div class="flex items-center gap-2">
                  <User class="w-4 h-4" />
                  <span>{{ course.channel }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Clock class="w-4 h-4" />
                  <span>{{ course.duration }} total</span>
                </div>
                <div class="flex items-center gap-2">
                  <BookOpen class="w-4 h-4" />
                  <span>{{ course.totalLessons }} lessons</span>
                </div>
                <div class="flex items-center gap-2">
                  <Calendar class="w-4 h-4" />
                  <span>Created {{ formatDate(course.createdAt) }}</span>
                </div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in course.tags"
                  :key="tag"
                  class="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Video Player -->
            <div class="bg-black rounded-lg overflow-hidden mb-8">
              <div class="relative aspect-video">
                <img
                  :src="currentLesson.thumbnail"
                  :alt="currentLesson.title"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 flex items-center justify-center">
                  <UiButton
                    variant="primary"
                    size="lg"
                    :icon="true"
                    icon-position="before"
                    @click="handlePlayVideo"
                    class="bg-white bg-opacity-90 text-gray-900 hover:bg-opacity-100"
                  >
                    <template #icon>
                      <Play class="w-6 h-6" />
                    </template>
                    {{ isPlaying ? 'Pause' : 'Play' }} Video
                  </UiButton>
                </div>

                <!-- Video Controls Overlay -->
                <div
                  class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4"
                >
                  <div class="flex items-center justify-between text-white text-sm mb-2">
                    <span>{{ currentLesson.title }}</span>
                    <span>{{ currentLesson.duration }}</span>
                  </div>

                  <!-- Progress Bar -->
                  <div class="w-full bg-gray-600 rounded-full h-1 mb-2">
                    <div
                      class="bg-blue-500 h-1 rounded-full transition-all duration-300"
                      :style="{ width: `${currentLesson.progress}%` }"
                    ></div>
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <UiButton
                        variant="secondary"
                        size="sm"
                        :icon="true"
                        @click="handlePreviousLesson"
                        :disabled="currentLessonIndex === 0"
                        class="bg-black bg-opacity-50 text-white border-gray-600 hover:bg-opacity-70"
                      >
                        <template #icon>
                          <SkipBack class="w-4 h-4" />
                        </template>
                      </UiButton>
                      <UiButton
                        variant="secondary"
                        size="sm"
                        :icon="true"
                        @click="handleNextLesson"
                        :disabled="currentLessonIndex === lessons.length - 1"
                        class="bg-black bg-opacity-50 text-white border-gray-600 hover:bg-opacity-70"
                      >
                        <template #icon>
                          <SkipForward class="w-4 h-4" />
                        </template>
                      </UiButton>
                    </div>

                    <div class="flex items-center gap-2">
                      <UiButton
                        variant="secondary"
                        size="sm"
                        :icon="true"
                        @click="handleToggleSpeed"
                        class="bg-black bg-opacity-50 text-white border-gray-600 hover:bg-opacity-70"
                      >
                        <template #icon>
                          <Gauge class="w-4 h-4" />
                        </template>
                      </UiButton>
                      <span class="text-xs">{{ playbackSpeed }}x</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Lesson Notes and Resources -->
            <div class="bg-white border border-gray-200 rounded-lg p-6">
              <div class="flex items-center gap-4 mb-4">
                <h3 class="text-xl font-gloock text-gray-900">Lesson Notes</h3>
                <UiButton
                  variant="secondary"
                  size="sm"
                  :icon="true"
                  icon-position="before"
                  @click="handleTakeNotes"
                >
                  <template #icon>
                    <Edit class="w-4 h-4" />
                  </template>
                  Take Notes
                </UiButton>
              </div>

              <div class="prose max-w-none">
                <UiTypography variant="paragraph" size="md" class="text-gray-700">
                  {{
                    currentLesson.notes ||
                    'No notes available for this lesson. Click "Take Notes" to add your own observations and key learnings.'
                  }}
                </UiTypography>
              </div>

              <!-- Resources -->
              <div class="mt-6 pt-6 border-t border-gray-200">
                <h4 class="font-epilogue font-black text-lg text-gray-900 mb-4">Resources</h4>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    v-for="resource in currentLesson.resources"
                    :key="resource.id"
                    class="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div class="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                      <component
                        :is="getResourceIcon(resource.type)"
                        class="w-4 h-4 text-blue-600"
                      />
                    </div>
                    <div class="flex-1">
                      <p class="font-medium text-gray-900 text-sm">{{ resource.title }}</p>
                      <p class="text-xs text-gray-600">{{ resource.type }}</p>
                    </div>
                    <UiButton variant="secondary" size="sm" @click="handleOpenResource(resource)">
                      <ExternalLink class="w-4 h-4" />
                    </UiButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-1">
            <!-- Progress Overview -->
            <div class="bg-white border border-gray-200 rounded-lg p-6 mb-6">
              <h3 class="font-epilogue font-black text-lg text-gray-900 mb-4">Your Progress</h3>

              <!-- Overall Progress -->
              <div class="mb-6">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm text-gray-600">Course Progress</span>
                  <span class="text-sm font-medium text-gray-900">{{ course.progress }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-3">
                  <div
                    :class="{
                      'bg-green-600': course.status === 'completed',
                      'bg-blue-600': course.status === 'in-progress',
                      'bg-gray-400': course.status === 'not-started',
                    }"
                    class="h-3 rounded-full transition-all duration-300"
                    :style="{ width: `${course.progress}%` }"
                  ></div>
                </div>
                <div class="flex items-center justify-between mt-2 text-sm text-gray-600">
                  <span>{{ course.completedLessons }} completed</span>
                  <span>{{ course.totalLessons - course.completedLessons }} remaining</span>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="grid grid-cols-2 gap-4">
                <div class="text-center p-3 bg-blue-50 rounded-lg">
                  <div class="text-2xl font-gloock text-blue-600 mb-1">
                    {{ Math.round(totalWatchTime) }}h
                  </div>
                  <div class="text-xs text-gray-600">Time Invested</div>
                </div>
                <div class="text-center p-3 bg-green-50 rounded-lg">
                  <div class="text-2xl font-gloock text-green-600 mb-1">{{ completionStreak }}</div>
                  <div class="text-xs text-gray-600">Day Streak</div>
                </div>
              </div>
            </div>

            <!-- Course Lessons -->
            <div class="bg-white border border-gray-200 rounded-lg">
              <div class="p-6 border-b border-gray-200">
                <h3 class="font-epilogue font-black text-lg text-gray-900">Course Content</h3>
              </div>

              <div class="max-h-96 overflow-y-auto">
                <div
                  v-for="(lesson, index) in lessons"
                  :key="lesson.id"
                  :class="{
                    'bg-blue-50 border-l-4 border-l-blue-500': index === currentLessonIndex,
                    'hover:bg-gray-50': index !== currentLessonIndex,
                  }"
                  class="p-4 border-b border-gray-100 cursor-pointer transition-colors"
                  @click="handleSelectLesson(index)"
                >
                  <div class="flex items-start gap-3">
                    <div class="flex-shrink-0 mt-1">
                      <div
                        :class="{
                          'bg-green-500 text-white': lesson.completed,
                          'bg-blue-500 text-white': index === currentLessonIndex,
                          'bg-gray-200 text-gray-600':
                            !lesson.completed && index !== currentLessonIndex,
                        }"
                        class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                      >
                        <CheckCircle v-if="lesson.completed" class="w-4 h-4" />
                        <Play v-else-if="index === currentLessonIndex" class="w-4 h-4" />
                        <span v-else>{{ index + 1 }}</span>
                      </div>
                    </div>

                    <div class="flex-1 min-w-0">
                      <h4 class="font-medium text-gray-900 text-sm mb-1 truncate">
                        {{ lesson.title }}
                      </h4>
                      <div class="flex items-center justify-between text-xs text-gray-500">
                        <span>{{ lesson.duration }}</span>
                        <span v-if="lesson.progress > 0">{{ lesson.progress }}%</span>
                      </div>

                      <!-- Lesson Progress Bar -->
                      <div
                        v-if="lesson.progress > 0"
                        class="w-full bg-gray-200 rounded-full h-1 mt-2"
                      >
                        <div
                          class="bg-blue-500 h-1 rounded-full transition-all duration-300"
                          :style="{ width: `${lesson.progress}%` }"
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import HeaderComponent from '@/components/landing/HeaderComponent.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import UiButton from '@/components/UI/UiButton.vue'
import UiTypography from '@/components/UI/UiTypography.vue'
import router from '@/router'
import {
  ArrowLeft,
  User,
  Clock,
  BookOpen,
  Calendar,
  Play,
  Edit,
  ExternalLink,
  CheckCircle,
  SkipBack,
  SkipForward,
  Gauge,
  FileText,
  Link,
  Download,
  Code,
} from 'lucide-vue-next'

const route = useRoute()
const courseId = ref(parseInt(route.params.id as string))

// Sample course data (same as dashboard but with lessons)
const course = ref({
  id: 1,
  title: 'Build a Full Stack React App',
  description:
    'Learn to create a complete React application with Node.js backend, authentication, and database integration. This comprehensive course covers everything from setting up your development environment to deploying your application to production.',
  thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
  originalVideoUrl: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
  videoTitle: 'React Full Stack Tutorial - 3 Hours Complete Course',
  channel: 'Code with John',
  duration: '3h 24m',
  totalLessons: 24,
  completedLessons: 18,
  status: 'in-progress',
  progress: 75,
  tags: ['React', 'Node.js', 'Full Stack', 'JavaScript'],
  createdAt: new Date('2024-01-15'),
  lastAccessed: new Date('2024-01-20'),
  difficulty: 'intermediate',
})

const lessons = ref([
  {
    id: 1,
    title: 'Introduction and Project Overview',
    duration: '8:32',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    completed: true,
    progress: 100,
    notes:
      "Overview of what we'll build in this course. A full-stack React application with user authentication, real-time features, and a Node.js backend.",
    resources: [
      { id: 1, title: 'Project Repository', type: 'GitHub', url: 'https://github.com' },
      { id: 2, title: 'Course Slides', type: 'PDF', url: '#' },
    ],
  },
  {
    id: 2,
    title: 'Setting Up Development Environment',
    duration: '12:15',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    completed: true,
    progress: 100,
    notes:
      'Installing Node.js, npm, VS Code extensions, and setting up our project structure with Create React App.',
    resources: [
      { id: 3, title: 'VS Code Extensions List', type: 'Document', url: '#' },
      { id: 4, title: 'Node.js Download', type: 'Link', url: '#' },
    ],
  },
  {
    id: 3,
    title: 'React Components and JSX Fundamentals',
    duration: '15:42',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    completed: true,
    progress: 100,
    notes:
      'Deep dive into React components, JSX syntax, props, and component composition patterns.',
    resources: [{ id: 5, title: 'Component Examples', type: 'Code', url: '#' }],
  },
  {
    id: 4,
    title: 'State Management with Hooks',
    duration: '18:26',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    completed: false,
    progress: 65,
    notes:
      'Currently learning about useState, useEffect, and custom hooks for managing application state.',
    resources: [
      { id: 6, title: 'Hooks Documentation', type: 'Link', url: '#' },
      { id: 7, title: 'Custom Hooks Examples', type: 'Code', url: '#' },
    ],
  },
  {
    id: 5,
    title: 'Building the User Interface',
    duration: '22:18',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    completed: false,
    progress: 0,
    notes: '',
    resources: [],
  },
  // More lessons would continue...
])

const currentLessonIndex = ref(3) // Currently on lesson 4 (0-indexed)
const isPlaying = ref(false)
const playbackSpeed = ref(1.0)

const currentLesson = computed(() => lessons.value[currentLessonIndex.value])
const totalWatchTime = computed(() => course.value.completedLessons * 0.25) // Approximate hours
const completionStreak = computed(() => 7) // Days in a row

const handleGoBack = () => {
  router.push('/dashboard')
}

const handlePlayVideo = () => {
  isPlaying.value = !isPlaying.value
  // In a real app, this would control video playback
}

const handlePreviousLesson = () => {
  if (currentLessonIndex.value > 0) {
    currentLessonIndex.value--
  }
}

const handleNextLesson = () => {
  if (currentLessonIndex.value < lessons.value.length - 1) {
    currentLessonIndex.value++
    // Mark current lesson as completed and update progress
    if (!lessons.value[currentLessonIndex.value - 1].completed) {
      lessons.value[currentLessonIndex.value - 1].completed = true
      lessons.value[currentLessonIndex.value - 1].progress = 100
      course.value.completedLessons++
      course.value.progress = Math.round(
        (course.value.completedLessons / course.value.totalLessons) * 100,
      )
    }
  }
}

const handleSelectLesson = (index: number) => {
  currentLessonIndex.value = index
}

const handleToggleSpeed = () => {
  const speeds = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0]
  const currentIndex = speeds.indexOf(playbackSpeed.value)
  playbackSpeed.value = speeds[(currentIndex + 1) % speeds.length]
}

const handleTakeNotes = () => {
  // In a real app, this would open a notes modal or editor
  console.log('Open notes editor for lesson:', currentLesson.value.title)
}

const handleOpenResource = (resource: any) => {
  // In a real app, this would open the resource
  console.log('Open resource:', resource.title)
}

const getResourceIcon = (type: string) => {
  const iconMap = {
    GitHub: Code,
    PDF: FileText,
    Link: Link,
    Document: FileText,
    Code: Code,
    Download: Download,
  }
  return iconMap[type] || FileText
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

onMounted(() => {
  // In a real app, fetch course data based on courseId
  console.log('Loading course with ID:', courseId.value)
})
</script>

<style scoped>
.prose {
  line-height: 1.6;
}

.prose p {
  margin-bottom: 1rem;
}
</style>

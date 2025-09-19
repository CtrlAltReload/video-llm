<template>
  <MainLayout
    ><section class="w-full h-full flex flex-row">
      <SideBar />
      <!-- main window -->
      <div class="flex-1 flex flex-col overflow-y-scroll">
        <!-- header -->
        <div class="flex flex-row items-center justify-between px-10 py-6">
          <div class="flex items-center">
            <img src="@/assets/pathwiz_logo.png" alt="PathWiz Logo" class="h-4 md:h-8" />
          </div>
          <!-- avatar, name and email -->
          <div class="flex flex-row p-2 rounded-4xl border border-black/10 shadow-xl">
            <div class="flex flex-col mx-4">
              <UiTypography variant="paragraph" size="sm" class="text-black font-bold"
                >Clive</UiTypography
              ><UiTypography variant="paragraph" size="xs" class="text-black/60 font-normal"
                >clivelimo84@gmail.com</UiTypography
              >
            </div>
            <div class="size-10 bg-black rounded-3xl"></div>
          </div>
        </div>
        <!-- empty state -->
        <EmptyState
          v-if="isEmpty"
          title="Ready to Start Learning?"
          description="Transform any YouTube coding tutorial into an interactive, structured course. Get started by
      pasting a video URL and let our AI create your personalized learning experience."
          :handle-create-course="handleCreateCourse"
        />
        <section v-else class="py-4 px-10 w-full h-full flex flex-col lg:flex-row gap-8">
          <!-- Main Content Area -->
          <div class="flex-1 flex flex-col space-y-8">
            <!-- Hero Card -->
            <div
              class="relative flex-1 min-h-[350px] overflow-hidden rounded-[44px] bg-gradient-to-br from-black via-gray-900 to-black p-8 shadow-2xl border border-gray-800"
            >
              <!-- Animated Stars Background -->
              <div class="absolute inset-0">
                <!-- Large Stars -->
                <Sparkle
                  class="absolute top-8 left-12 w-3 h-3 bg-green-500 rounded-full animate-pulse opacity-80"
                  fill="#fff"
                />
                <div
                  class="absolute top-16 right-20 w-2 h-2 rounded-full animate-pulse opacity-60"
                  style="animation-delay: 0.5s"
                >
                  <Sparkle
                    class="rounded-full animate-pulse opacity-50"
                    fill="#ffffff90"
                    :size="44"
                    stroke-width="0"
                  />
                </div>
                <div
                  class="absolute bottom-20 left-16 rounded-full animate-pulse opacity-40"
                  style="animation-delay: 1s"
                >
                  <Sparkle
                    class="rounded-full animate-pulse opacity-50"
                    fill="#00c951"
                    :size="20"
                    stroke-width="0"
                  />
                </div>
                <div
                  class="absolute bottom-12 right-12 rounded-full animate-pulse opacity-70"
                  style="animation-delay: 1.5s"
                >
                  <Sparkle
                    class="rounded-full animate-pulse opacity-50"
                    fill="#ffffff"
                    :size="14"
                    stroke-width="0"
                  />
                </div>
                <!-- Small Accent Stars -->
                <div
                  class="absolute top-24 left-1/3 rounded-full animate-pulse opacity-50"
                  style="animation-delay: 0.8s"
                >
                  <Sparkle
                    class="rounded-full opacity-50"
                    fill="#00c951"
                    :size="8"
                    stroke-width="0"
                  />
                </div>
                <div
                  class="absolute top-32 right-1/3 rounded-full animate-pulse opacity-60"
                  style="animation-delay: 2s"
                >
                  <Sparkle
                    class="rounded-full opacity-50"
                    fill="#fff"
                    :size="10"
                    stroke-width="0"
                  />
                </div>
              </div>

              <!-- Gradient Overlay -->
              <div class="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>

              <!-- Content -->
              <div class="relative z-10 h-full flex flex-col justify-between">
                <div>
                  <h2 class="text-4xl md:text-5xl font-gloock text-white mb-3 drop-shadow-lg">
                    Welcome Back
                  </h2>
                  <p class="text-lg text-gray-300 font-epilogue">
                    Ready to continue your learning journey?
                  </p>
                </div>

                <!-- Date with improved styling -->
                <div class="flex items-center space-x-2">
                  <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <p class="text-sm text-gray-400 font-epilogue font-medium">
                    {{
                      new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    }}
                  </p>
                </div>
              </div>
            </div>

            <!-- My Courses Section -->
            <div class="w-full flex flex-col">
              <!-- Section Header -->
              <div class="mb-6">
                <div class="flex items-center space-x-3 mb-1">
                  <div
                    class="w-1 h-8 bg-gradient-to-b from-green-500 to-gray-700 rounded-full"
                  ></div>
                  <UiTypography variant="title" size="xl" class="text-gray-900 font-bold">
                    My Courses
                  </UiTypography>
                </div>
                <UiTypography variant="paragraph" size="sm" class="text-gray-600 ml-4">
                  Continue your learning journey with these courses
                </UiTypography>
              </div>

              <!-- Course Grid -->
              <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                <div
                  v-for="course in courses.slice(0, 6)"
                  :key="course.id"
                  class="group relative overflow-hidden bg-light-background border border-black/10 rounded-[44px] p-4 shadow-lg hover:shadow-xl hover:shadow-gray-200/50 hover:border-green-500/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <!-- Course Thumbnail -->
                  <div class="relative overflow-hidden rounded-4xl mb-4">
                    <img
                      :src="course.thumbnail"
                      alt="course thumbnail"
                      class="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105 grayscale group-hover:grayscale-0"
                    />
                    <div
                      class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>

                    <!-- Green accent overlay on hover -->
                    <div
                      class="absolute inset-0 bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    ></div>
                  </div>

                  <!-- Course Tags -->
                  <div class="flex flex-wrap gap-2 mb-3" v-if="course.tags && course.tags.length">
                    <span
                      v-for="tag in course.tags.slice(0, 2)"
                      :key="tag"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 font-epilogue uppercase text-gray-700 border border-gray-200 group-hover:bg-green-50 group-hover:text-green-700 group-hover:border-green-200 transition-colors duration-200"
                    >
                      #{{ tag }}
                    </span>
                    <span
                      v-if="course.tags.length > 2"
                      class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-500 border border-gray-200"
                    >
                      +{{ course.tags.length - 2 }}
                    </span>
                  </div>

                  <!-- Course Title -->
                  <h3
                    class="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-black transition-colors duration-200"
                  >
                    {{ course.title }}
                  </h3>

                  <!-- Course Description -->
                  <p
                    class="text-sm text-gray-600 font-epilogue line-clamp-2 leading-relaxed group-hover:text-gray-700 transition-colors duration-200"
                  >
                    {{ course.description }}
                  </p>

                  <!-- Progress Bar -->
                  <div class="flex flex-row gap-x-3">
                    <div
                      class="flex-1 mt-4 mb-3 pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-200 relative"
                    >
                      <div class="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span
                          class="group-hover:text-gray-600 font-epilogue font-bold transition-colors duration-200"
                          >Progress</span
                        >
                        <span
                          class="group-hover:text-green-600 font-medium transition-colors duration-200"
                          >{{ Math.floor(Math.random() * 100) }}%</span
                        >
                      </div>
                      <div
                        class="w-full bg-gray-200 rounded-full h-1.5 group-hover:bg-gray-300 transition-colors duration-200"
                      >
                        <div
                          class="bg-gradient-to-r from-gray-600 to-black group-hover:from-green-500 group-hover:to-green-600 h-1.5 rounded-full transition-all duration-300"
                          :style="{ width: Math.floor(Math.random() * 100) + '%' }"
                        ></div>
                      </div>
                    </div>
                    <button
                      class="mt-auto transform translate-x-1/2 opacity-0 flex items-center justify-center bg-green-500 rounded-full p-3 group-hover:shadow group-hover:shadow-green-200/30 group-hover:translate-x-0 group-hover:opacity-100 group-hover:block transition-all duration-400"
                      @click.prevent
                    >
                      <ChevronRight
                        class="text-gray-500 group-hover:text-black transition-colors duration-200"
                      />
                    </button>
                  </div>

                  <!-- Subtle green accent line on hover -->
                  <div
                    class="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-transparent via-green-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Activity Sidebar -->
          <aside class="w-full lg:w-80 xl:w-96 flex flex-col space-y-6">
            <!-- Activity Header -->
            <div class="flex items-center space-x-3">
              <div class="w-1 h-8 bg-gradient-to-b from-green-500 to-gray-700 rounded-full"></div>
              <h3 class="text-xl font-bold text-gray-900">Recent Activity</h3>
            </div>

            <!-- Activity Feed -->
            <div class="bg-light-background rounded-[44px] border border-black/20 p-6 shadow-xl">
              <div class="space-y-6">
                <!-- Activity Item 1 -->
                <div class="flex items-start space-x-4 group">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center"
                  >
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-md text-gray-900 group-hover:text-green-600 transition-colors duration-200"
                    >
                      Course Completed
                    </p>
                    <p class="text-xs font-epilogue text-gray-500 line-clamp-2">
                      You've successfully completed "Advanced React Patterns"
                    </p>
                    <p class="text-xs font-epilogue font-bold text-green-500 mt-1">2 hours ago</p>
                  </div>
                </div>

                <!-- Activity Item 2 -->
                <div class="flex items-start space-x-4 group">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center"
                  >
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200"
                    >
                      New Assignment
                    </p>
                    <p class="text-xs font-epilogue text-gray-500 line-clamp-2">
                      "Database Design Fundamentals" assignment is due tomorrow
                    </p>
                    <p class="text-xs font-epilogue font-bold text-green-500 mt-1">5 hours ago</p>
                  </div>
                </div>

                <!-- Activity Item 3 -->
                <div class="flex items-start space-x-4 group">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center"
                  >
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200"
                    >
                      Study Streak
                    </p>
                    <p class="text-xs font-epilogue text-gray-500 line-clamp-2">
                      You're on a 7-day learning streak! Keep it up
                    </p>
                    <p class="text-xs font-epilogue font-bold text-green-500 mt-1">1 day ago</p>
                  </div>
                </div>

                <!-- Activity Item 4 -->
                <div class="flex items-start space-x-4 group">
                  <div
                    class="flex-shrink-0 w-10 h-10 bg-black rounded-full flex items-center justify-center"
                  >
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p
                      class="text-sm font-medium text-gray-900 group-hover:text-green-600 transition-colors duration-200"
                    >
                      Certificate Earned
                    </p>
                    <p class="text-xs font-epilogue text-gray-500 line-clamp-2">
                      Earned certificate for "JavaScript Essentials"
                    </p>
                    <p class="text-xs font-epilogue font-bold text-green-500 mt-1">3 days ago</p>
                  </div>
                </div>
              </div>

              <!-- View All Activity -->
              <div class="mt-6 pt-4 border-t border-black/10">
                <button
                  class="w-full text-md text-gray-600 hover:text-green-600 font-medium transition-colors duration-200 py-2"
                >
                  View All Activity →
                </button>
              </div>
            </div>

            <!-- Quick Stats -->
            <div class="bg-light-background rounded-[44px] border border-black/20 p-6 shadow-2xl">
              <h4 class="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h4>

              <div class="space-y-4">
                <!-- Stat 1 -->
                <div class="flex items-center justify-between">
                  <span class="text-sm font-epilogue font-bold text-gray-600"
                    >Courses in Progress</span
                  >
                  <span class="text-lg font-bold text-gray-900">{{ courses?.length || 8 }}</span>
                </div>

                <!-- Stat 2 -->
                <div class="flex items-center justify-between">
                  <span class="text-sm font-epilogue font-bold text-gray-600">Hours This Week</span>
                  <span class="text-lg font-bold text-green-600">24.5</span>
                </div>

                <!-- Stat 3 -->
                <div class="flex items-center justify-between">
                  <span class="text-sm font-epilogue font-bold text-gray-600">Completion Rate</span>
                  <span class="text-lg font-bold text-gray-900">92%</span>
                </div>

                <!-- divider -->
                <div class="border-t border-black/10 mt-4" />

                <!-- Progress Ring -->
                <div class="pt-1">
                  <div class="flex items-center space-x-3">
                    <div class="relative w-12 h-12">
                      <svg class="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none"
                          stroke="#e5e7eb"
                          stroke-width="3"
                        />
                        <path
                          d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                          fill="none"
                          stroke="#10b981"
                          stroke-width="3"
                          stroke-dasharray="92, 100"
                        />
                      </svg>
                      <div class="absolute inset-0 flex items-center justify-center">
                        <span class="text-xs font-epilogue font-bold text-green-600">92%</span>
                      </div>
                    </div>
                    <div>
                      <p class="text-md text-gray-900">Weekly Goal</p>
                      <p class="text-xs font-epilogue text-gray-500">23/25 hours completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import EmptyState from '@/components/dashboard/EmptyState.vue'
import SideBar from '@/components/dashboard/SideBar.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import UiTypography from '@/components/UI/UiTypography.vue'
import { courses } from '@/utils/data'
import { ChevronRight, Sparkle } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  name: {
    type: String,
    default: 'DashboardPageRed',
  },
})

const router = useRouter()

const handleCreateCourse = () => {
  router.push('/create')
}

const isEmpty = ref(false)
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.grayscale {
  filter: grayscale(100%);
}

.grayscale-0 {
  filter: grayscale(0%);
}

/* Responsive adjustments */
@media (max-width: 1023px) {
  .lg\:flex-row {
    flex-direction: column;
  }
}
</style>

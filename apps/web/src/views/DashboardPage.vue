<script setup lang="ts">
import { ref, onMounted } from 'vue'

// Components
import Sidebar from '@/components/dashboard/SidebarComponent.vue'
import WelcomeSection from '@/components/dashboard/WelcomeSection.vue'
import OngoingCoursesSection from '@/components/dashboard/OngoingCoursesSection.vue'
import RecentActivity from '@/components/dashboard/RecentActivity.vue'
import NewCourseModal from '@/components/dashboard/NewCourseModal.vue'

// State
const sidebarCollapsed = ref(false)
const showProfileMenu = ref(false)
const showNewCourseModal = ref(false)
const isCreatingCourse = ref(false)

const newCourse = ref({
  title: '',
  videoUrl: '',
})

const user = ref({
  name: 'Alex',
  avatar:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
})

const ongoingCourses = ref([
  { id: 1, title: 'Python Basics', progress: 60, modulesCompleted: 3, totalModules: 5 },
  { id: 2, title: 'Vue.js Advanced', progress: 20, modulesCompleted: 1, totalModules: 8 },
])

const recommendedCourses = ref([
  { id: 3, title: 'JavaScript Mastery', description: 'Deep dive into ES6 and beyond.' },
  { id: 4, title: 'Django for Beginners', description: 'Build web apps with Python.' },
])

const recentActivity = ref([
  { id: 1, action: 'Submitted Project: To-Do App', date: '2025-09-15' },
  { id: 2, action: 'Received Feedback: 85/100', date: '2025-09-14' },
])

const navigation = ref([
  { name: 'Dashboard', icon: 'M3 7v10...', active: true },
  { name: 'My Courses', icon: 'M12 6.253...', active: false },
  { name: 'Projects', icon: 'M19 11H5...', active: false },
  { name: 'Profile', icon: 'M16 7a4 4...', active: false },
  { name: 'Settings', icon: 'M10.325 4.317...', active: false },
])

// Methods
const setActiveNav = (itemName: string) => {
  navigation.value.forEach((item) => (item.active = item.name === itemName))
}

const createCourse = async () => {
  if (!newCourse.value.title.trim()) {
    alert('Please enter a course title')
    return
  }

  isCreatingCourse.value = true
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const newCourseData = {
    id: Date.now(),
    title: newCourse.value.title,
    progress: 0,
    modulesCompleted: 0,
    totalModules: 6,
  }

  ongoingCourses.value.unshift(newCourseData)

  recentActivity.value.unshift({
    id: Date.now(),
    action: `Started new course: ${newCourse.value.title}`,
    date: new Date().toISOString().split('T')[0],
  })

  newCourse.value = { title: '', videoUrl: '' }
  isCreatingCourse.value = false
  showNewCourseModal.value = false
}

// Close dropdown when clicking outside
onMounted(() => {
  document.addEventListener('click', (e) => {
    if (!(e.target as HTMLElement).closest('.relative')) {
      showProfileMenu.value = false
    }
  })
})
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-light-background">
    <!-- Sidebar -->
    <Sidebar
      :collapsed="sidebarCollapsed"
      :navigation="navigation"
      @toggle-sidebar="sidebarCollapsed = !sidebarCollapsed"
      @nav-click="setActiveNav"
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Header -->
      <Header
        :user="user"
        :show-profile-menu="showProfileMenu"
        @toggle-profile="showProfileMenu = !showProfileMenu"
      />

      <!-- Main -->
      <main class="flex-1 overflow-y-auto scrollbar-thin">
        <div class="max-w-7xl mx-auto px-6 py-8">
          <WelcomeSection :user="user" @start-new-course="showNewCourseModal = true" />

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <OngoingCoursesSection
              :courses="ongoingCourses"
              @start-new-course="showNewCourseModal = true"
              class="lg:col-span-2"
            />

            <div class="space-y-6">
              <RecentActivity :activities="recentActivity" />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>

  <!-- Modal -->
  <NewCourseModal
    :show="showNewCourseModal"
    :is-creating="isCreatingCourse"
    :new-course="newCourse"
    @close="showNewCourseModal = false"
    @create="createCourse"
  />
</template>

<style scoped>
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}
.scrollbar-thin::-webkit-scrollbar-track {
  background: #f1f5f9;
}
.scrollbar-thin::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>

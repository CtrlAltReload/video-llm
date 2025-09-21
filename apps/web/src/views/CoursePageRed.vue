// Main Course Component
<template>
  <MainLayout>
    <section class="h-full flex flex-row">
      <CloseSideBar :close="handleGoBack" />
      <!-- course sections -->
      <section class="h-full w-[350px] flex flex-col border-r border-black/10 overflow-hidden">
        <!-- header section -->
        <div class="bg-black/88 h-48 m-2 flex flex-col rounded-4xl px-4 py-6">
          <!-- course details -->
          <div class="flex-1 flex flex-col">
            <p class="text-md text-white group-hover:text-green-600 transition-colors duration-200">
              {{ courseStore.selectedCourse.course_title }}
            </p>
            <p class="text-xs font-epilogue text-gray-300 line-clamp-2 mt-2">
              {{ courseStore.selectedCourse.course_description }}
            </p>
            <p class="text-xs font-epilogue font-bold text-green-500 mt-auto">23 hours</p>
          </div>
          <!-- progress bar -->
          <div class="h-2 w-full bg-gray-200 rounded-full mt-3">
            <div
              class="bg-green-600 h-2 rounded-full transition-all duration-300"
              :style="{ width: 48 + `%` }"
            ></div>
          </div>
        </div>
        <!-- course section title -->
        <div class="flex items-center space-x-3 px-3 py-4">
          <div class="w-1 h-8 bg-gradient-to-b from-green-500 to-gray-700 rounded-full"></div>
          <h3 class="text-xl font-bold text-gray-900">Course Sections</h3>
        </div>
        <!-- sections list -->
        <div class="flex-1 flex flex-col px-3 pb-5 gap-2 overflow-y-scroll h-[calc(100vh-12rem)]">
          <div v-for="(section, index) in courseStore.selectedCourse.sections" :key="section.title">
            <SectionCard
              :section="section"
              :section-index="index"
              :completed-sections="courseStore.completedSections"
            />
          </div>
        </div>
      </section>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import SectionCard from '@/components/course/SectionCard.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import CloseSideBar from '@/components/UI/CloseSideBar.vue'
import { useCourseStore } from '@/stores/courseStore'
import { useRouter } from 'vue-router'

const courseStore = useCourseStore()

const router = useRouter()
const handleGoBack = () => {
  router.push('/home')
}
</script>

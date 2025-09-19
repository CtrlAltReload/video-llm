<template>
  <section class="flex flex-row w-full h-full bg-light-background">
    <CloseSideBar :close="handleClose" />
    <div v-if="!isCreating" class="flex-1 flex flex-row bg-light-background">
      <div class="flex flex-col max-w-3xl mx-auto">
        <!-- progress -->
        <div class="flex flex-row items-center justify-center gap-2">
          <div v-for="(step, index) in steps" :key="step.id">
            <div
              class="mt-6 mb-4 h-3 w-14 bg-black/30 rounded-full"
              :class="index < currentStep ? 'bg-green-500' : ''"
            ></div>
          </div>
        </div>
        <!-- step one -->
        <div v-if="currentStep === 1" class="flex flex-col my-10">
          <UiTypography variant="title" size="2xl" class="text-center">
            Video Details
          </UiTypography>
          <!-- card -->
          <div
            class="flex mt-10 flex-row gap-3 bg-light-background border border-black/10 p-3 rounded-[44px] shadow-2xl shadow-black/10"
          >
            <!-- thumbnail -->
            <div class="flex flex-row size-[200px] bg-black/20 rounded-4xl"></div>
            <!-- video details -->
            <div class="flex flex-col py-3">
              <UiTypography variant="title" size="md" class="mb-1"
                >Pathwiz AI Tutorial</UiTypography
              >
              <UiTypography
                variant="paragraph"
                size="sm"
                class="font-epilogue text-black/60 max-w-sm"
                >Learn how to build a coding AI tutorial with Pathwiz AI, a platform that uses AI to
                transform any YouTube coding tutorial into a structured, interactive course. Get
                instant feedback and real-time assistance to help you understand complex coding
                concepts.</UiTypography
              >
              <UiTypography
                variant="title"
                size="sm"
                class="mt-auto font-epilogue font-bold bg-black rounded-full py-1 px-3 w-fit text-green-500"
              >
                1hr 30mins
              </UiTypography>
            </div>
          </div>
          <!-- course title -->
          <div class="flex flex-col mt-5">
            <UiTypography variant="title" size="md" class="mb-1">Course Title</UiTypography>
            <UiTypography variant="paragraph" size="sm" class="mb-3 text-black/60"
              >You can edit the course title here</UiTypography
            >
            <input
              class="p-4 border border-black/10 bg-black/5 rounded-3xl font-epilogue text-black focus:outline-green-500 focus:bg-green-500/10"
              type="text"
              placeholder="Learning with Pathwiz AI "
            />
          </div>
        </div>
        <!-- step two -->
        <div v-if="currentStep === 2" class="min-w-lg flex flex-col my-10">
          <UiTypography variant="title" size="2xl" class="text-center">
            Learning Details
          </UiTypography>
          <div class="w-full flex flex-col gap-4 mt-10">
            <div class="flex flex-col w-full mt-5">
              <UiTypography variant="title" size="md" class="mb-1">Course Duration</UiTypography>
              <UiTypography variant="paragraph" size="sm" class="mb-3 text-black/60"
                >How long do you want the course to take?</UiTypography
              >
              <div class="flex flex-row items-center gap-2">
                <input
                  class="flex-1 text-center p-4 border font-bold border-black/10 bg-black/5 rounded-2xl font-epilogue text-black focus:outline-green-500 focus:bg-green-500/10"
                  type="number"
                  max="10"
                  min=""
                  placeholder="3"
                />
                <select
                  class="py-4 px-6 border border-black/10 bg-black/5 rounded-2xl font-epilogue text-black focus:outline-green-500 focus:bg-green-500/10"
                >
                  <option value="hours" class="text-xs font-epilogue">Hours</option>
                  <option value="days" class="text-xs font-epilogue">Days</option>
                  <option value="weeks" class="text-xs font-epilogue">Weeks</option>
                </select>
              </div>
            </div>
            <div class="flex flex-col mt-5">
              <UiTypography variant="title" size="md" class="mb-1">Skill Level</UiTypography>
              <UiTypography variant="paragraph" size="sm" class="mb-3 text-black/60"
                >What is your skill level in this topic?</UiTypography
              >
            </div>
            <div class="w-full flex flex-row items-center gap-2">
              <div
                v-for="(skill, index) in ['beginner', 'intermediate', 'advanced']"
                :key="index"
                class="flex-1 bg-black/5 font-epilogue rounded-xl border p-3 text-sm font-medium text-center capitalize"
                :class="
                  skill === selectedSkillLevel
                    ? 'bg-green-500/5 border-green-500 text-green-500'
                    : 'bg-black/5 border-black/10'
                "
                @click="selectedSkillLevel = skill"
              >
                {{ skill }}
              </div>
            </div>
          </div>
        </div>
        <!-- create button -->
        <div class="flex flex-col justify-center sm:flex-row gap-4">
          <UiButton
            variant="primary"
            size="lg"
            :icon="true"
            icon-position="after"
            class="px-4"
            :onclick="handleNext"
          >
            <template #icon>
              <ChevronRight />
            </template>
            <p class="">Next</p>
          </UiButton>
        </div>
      </div>
    </div>
    <CourseCompleteSection v-else />
  </section>
</template>

<script setup lang="ts">
import CourseCompleteSection from '@/components/course/CourseCompleteSection.vue'
import CloseSideBar from '@/components/UI/CloseSideBar.vue'
import UiButton from '@/components/UI/UiButton.vue'
import UiTypography from '@/components/UI/UiTypography.vue'
import { ChevronRight } from 'lucide-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClose = () => {
  router.push('/home')
}

const steps = ref([
  { id: 1, name: 'Step 1', description: 'Create a course' },
  { id: 2, name: 'Step 2', description: 'Create a course' },
])

const currentStep = ref(1)
const selectedSkillLevel = ref('beginner')
const isCreating = ref(false)

const handleNext = () => {
  if (currentStep.value < steps.value.length) {
    currentStep.value++
  } else {
    isCreating.value = true
  }
}
</script>

<style scoped>
section {
  background-color: var(--light-background);
}

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
</style>

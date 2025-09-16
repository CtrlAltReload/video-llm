<template>
  <MainLayout>
    <section class="w-full h-full flex flex-col">
      <HeaderComponent />
      <div class="flex-1 flex flex-col items-center justify-center gap-2">
        <h1 class="text-8xl max-w-4xl font-gloock text-center mx-auto">
          Unlock Your Coding Potential &mdash; One Video at a Time.
        </h1>
        <UiTypography variant="paragraph" size="md" class="text-center max-w-4xl">
          Imagine turning that epic 3-hour coding tutorial on YouTube into a structured, interactive
          course tailored just for you. No more endless scrolling, note-taking chaos, or getting
          lost in the weeds. With CodeCourse AI, we harness cutting-edge AI to convert any lengthy
          video into a bite-sized, engaging learning experience, complete with progress tracking,
          real-time assistance, and hands-on projects that give you instant feedback.
        </UiTypography>

        <UiButton
          variant="primary"
          :icon="true"
          icon-position="after"
          size="xl"
          class="mt-8"
          :onclick="handleClick"
        >
          <template #icon>
            <ChevronRight name="arrow-right-on-reply" class="mr-2" />
          </template>
          Get Started
        </UiButton>
      </div>
    </section>
  </MainLayout>
</template>

<script setup lang="ts">
import HeaderComponent from '@/components/landing/HeaderComponent.vue'
import MainLayout from '@/components/layout/MainLayout.vue'
import UiButton from '@/components/UI/UiButton.vue'
import UiTypography from '@/components/UI/UiTypography.vue'
import router from '@/router'
import { ChevronRight } from 'lucide-vue-next'

const handleClick = () => {
  router.push('/home')
}
</script>

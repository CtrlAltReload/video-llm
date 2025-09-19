<script setup lang="ts">
import { X } from 'lucide-vue-next'

const props = defineProps<{
  close: () => void
}>()
</script>

<template>
  <!-- sidebar -->
  <div class="h-full w-24 border-r-[1px] border-black/10 flex flex-col">
    <div
      class="relative flex flex-row justify-center w-fit mx-auto mt-6 p-3 bg-black/5 rounded-2xl group hover:cursor-pointer transition-all ease-in-out duration-500"
      @click="props.close"
    >
      <span class="text-black">
        <component :is="X" :size="28" />
        <span
          class="absolute -right-12 bg-black text-white font-epilogue capitalize text-sm px-2 py-1 rounded-lg invisible group-hover:visible transition-opacity duration-100 ease-in-out"
          >Close</span
        >
      </span>
    </div>
  </div>
</template>

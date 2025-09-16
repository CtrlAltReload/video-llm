<script setup lang="ts">
defineProps<{
  collapsed: boolean
  navigation: { name: string; icon: string; active: boolean }[]
}>()
defineEmits(['toggle-sidebar', 'nav-click'])
</script>

<template>
  <div :class="['bg-white shadow-lg transition-all duration-300', collapsed ? 'w-16' : 'w-64']">
    <div class="flex flex-col h-full">
      <!-- Logo + Toggle -->
      <div class="flex items-center justify-between p-4 border-b border-gray-200">
        <div v-show="!collapsed" class="flex items-center">
          <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">CC</span>
          </div>
          <span class="ml-2 text-xl font-bold text-gray-800">CodeCourse AI</span>
        </div>
        <button
          @click="$emit('toggle-sidebar')"
          class="p-1 rounded-md hover:bg-gray-100 transition-colors"
        >
          <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="collapsed ? 'm9 18 6-6-6-6' : 'm15 18-6-6 6-6'"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Navigation -->
      <nav class="flex-1 p-4 space-y-2">
        <div
          v-for="item in navigation"
          :key="item.name"
          :class="[
            'flex items-center p-3 rounded-lg cursor-pointer transition-colors',
            item.active ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100',
          ]"
          @click="$emit('nav-click', item.name)"
        >
          <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="item.icon"
            ></path>
          </svg>
          <span v-show="!collapsed" class="ml-3 font-medium">{{ item.name }}</span>
        </div>
      </nav>
    </div>
  </div>
</template>

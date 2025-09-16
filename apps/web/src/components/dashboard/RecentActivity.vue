// RecentActivity.vue
<script setup lang="ts">
import ActivityItem from '@/components/dashboard/ActivityItem.vue'
import type { PropType } from 'vue'

defineProps({
  activities: {
    type: Array<PropType<{ id: number; action: string; date: string }>>,
    required: true,
  },
})
</script>

<template>
  <div>
    <h3 class="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
    <div v-if="activities.length > 0" class="space-y-3">
      <activity-item
        v-for="activity in activities"
        :key="activity.id"
        :activity="activity"
      ></activity-item>
    </div>
    <div v-else class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
      <svg
        class="w-8 h-8 text-gray-400 mx-auto mb-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <p class="text-sm text-gray-600">Your activity will appear here.</p>
    </div>
  </div>
</template>

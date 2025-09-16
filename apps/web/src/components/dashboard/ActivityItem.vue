<script setup lang="ts">
const props = defineProps<{
  activity: Activity
}>()

const formatDate = (dateString: string) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<template>
  <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
    <p class="text-sm text-gray-900 mb-1">{{ props.activity.action }}</p>
    <p class="text-xs text-gray-500">{{ formatDate(props.activity.date) }}</p>
  </div>
</template>

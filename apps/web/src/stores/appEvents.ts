import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAppEvents = defineStore('appEvents', () => {
  const activeTab = ref('Home')

  const updateActiveTab = (newTab: string) => {
    activeTab.value = newTab
  }

  return { activeTab, updateActiveTab }
})

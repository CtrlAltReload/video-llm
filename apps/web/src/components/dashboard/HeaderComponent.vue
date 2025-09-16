<script setup lang="ts">
defineProps<{
  user: {
    name: string
    avatar: string
  }
  showProfileMenu: boolean
}>()

defineEmits<{
  (e: 'toggle-profile'): void
}>()
</script>

<template>
  <header class="bg-white shadow-sm border-b border-gray-200">
    <div class="flex items-center justify-between px-6 py-4">
      <div class="flex items-center">
        <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <!-- User Profile -->
      <div class="flex items-center space-x-4">
        <div class="relative">
          <button
            @click="$emit('toggle-profile')"
            class="flex items-center space-x-3 text-sm rounded-full focus:outline-none"
          >
            <img class="h-8 w-8 rounded-full" :src="user.avatar" alt="User avatar" />
            <span class="hidden md:block text-gray-700 font-medium">{{ user.name }}</span>
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 9-7 7-7-7"
              ></path>
            </svg>
          </button>

          <!-- Profile Dropdown -->
          <div
            v-show="showProfileMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

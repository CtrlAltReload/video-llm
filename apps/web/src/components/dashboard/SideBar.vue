<script setup lang="ts">
import { useAppEvents } from '@/stores/appEvents'
import { LayoutDashboard, LibraryBig, LogOut, User } from 'lucide-vue-next'
import { ref } from 'vue'

const eventsStore = useAppEvents()

const icons: Record<string, typeof LayoutDashboard | typeof LibraryBig | typeof User> = {
  LayoutDashboard,
  LibraryBig,
  User,
}

const navItems = ref<{ name: string; icon: keyof typeof icons }[]>([
  { name: 'Home', icon: 'LayoutDashboard' },
  { name: 'Courses', icon: 'LibraryBig' },
  { name: 'profile', icon: 'User' },
])
</script>

<template>
  <!-- sidebar -->
  <div class="h-full w-24 border-r-[1px] border-black/10 flex flex-col">
    <div class="flex items-center justify-center mb-10 mt-3">
      <img src="@/assets/pathwiz_icon_logo.png" alt="PathWiz Logo" class="h-8 md:h-14" />
    </div>
    <!-- nav items -->
    <div class="flex flex-col gap-8 justify-center b">
      <div
        v-for="(item, index) in navItems"
        :key="index"
        :item="item"
        class="relative flex flex-row justify-center w-fit mx-auto p-3 bg-black/5 rounded-2xl group hover:cursor-pointer transition-all ease-in-out duration-500"
        :class="{
          'bg-green-500/70 shadow-xl shadow-green-500/50 ': eventsStore.activeTab === item.name,
        }"
        @click="eventsStore.updateActiveTab(item.name)"
      >
        <span
          class="text-black"
          :class="
            eventsStore.activeTab === item.name
              ? 'text-black hover:text-black'
              : 'text-black hover:text-green-800'
          "
        >
          <component :is="icons[item.icon]" :size="28" />
          <span
            class="absolute -right-12 bg-black text-white font-epilogue capitalize text-sm px-2 py-1 rounded-lg invisible group-hover:visible transition-opacity duration-100 ease-in-out"
            >{{ item.name }}</span
          >
        </span>
      </div>
    </div>
    <!-- logout -->
    <div class="mt-auto mb-3">
      <div class="flex flex-row justify-center w-fit mx-auto p-3 bg-black/5 rounded-2xl">
        <span class="text-black hover:text-primary">
          <LogOut :size="28" stroke-width="" />
          <span class="hidden group-hover:block">Logout</span>
        </span>
      </div>
    </div>
  </div>
</template>

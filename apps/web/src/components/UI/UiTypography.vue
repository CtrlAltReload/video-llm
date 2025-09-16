<template>
  <component :is="tag" :class="classes">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'title' | 'subtitle' | 'paragraph'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'

interface Props {
  variant?: Variant
  size?: Size
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'paragraph',
  size: 'md',
})

/**
 * Map variant -> semantic HTML tag
 */
const tag = computed(() => {
  switch (props.variant) {
    case 'title':
      return 'h1'
    case 'subtitle':
      return 'h2'
    default:
      return 'p'
  }
})

/**
 * Build Tailwind classes dynamically
 */
const classes = computed(() => {
  const base = {
    title: 'font-bold text-gray-900',
    subtitle: 'font-semibold text-gray-700',
    paragraph: 'font-normal font-epilogue text-gray-600',
  }[props.variant]

  return [`text-${props.size}`, base].join(' ')
})
</script>

<template>
  <div :class="classes" v-bind="$attrs">
    <!-- Icon before -->
    <span v-if="icon && iconPosition === 'before'" :class="iconSpacingClasses.before">
      <slot name="icon" />
    </span>

    <!-- Button text -->
    <span><slot /></span>

    <!-- Icon after -->
    <span v-if="icon && iconPosition === 'after'" :class="iconSpacingClasses.after">
      <slot name="icon" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Variant = 'primary' | 'secondary' | 'text'
type IconPosition = 'before' | 'after'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?: Variant
  size?: Size
  icon?: boolean
  iconPosition?: IconPosition
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  icon: false,
  iconPosition: 'before',
})

/**
 * Size styles
 */
const sizeClasses = computed(() => {
  const sizes: Record<Size, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm rounded-2xl',
    md: 'px-4 py-2 text-base rounded-xl',
    lg: 'px-5 py-2.5 text-lg rounded-xl',
    xl: 'px-6 py-3 text-xl rounded-3xl',
  }
  return sizes[props.size]
})

/**
 * Icon spacing based on size
 */
const iconSpacingClasses = computed(() => {
  const spacing: Record<Size, { before: string; after: string }> = {
    xs: { before: 'mr-1  items-center', after: 'ml-1  items-center' },
    sm: { before: 'mr-1.5  items-center', after: 'ml-1.5  items-center' },
    md: { before: 'mr-2  items-center', after: 'ml-2  items-center' },
    lg: { before: 'mr-2.5  items-center', after: 'ml-2.5  items-center' },
    xl: { before: 'mr-3  items-center', after: 'ml-3  items-center' },
  }
  return spacing[props.size]
})

/**
 * Variant styles
 */
const classes = computed(() => {
  const base =
    ' flex flex-row gap-2 cursor-pointer items-center justify-center font-medium focus:outline-none transition-all duration-500'

  const variants: Record<Variant, string> = {
    primary: 'bg-primary text-white hover:bg-gradient-to-r from-primary to-secondary/70',
    secondary: 'bg-gray-200 font-epilogue border border-black/30 text-gray-900 hover:bg-gray-300',
    text: 'bg-transparent text-blue-600 hover:underline',
  }

  return [base, variants[props.variant], sizeClasses.value].join(' ')
})
</script>

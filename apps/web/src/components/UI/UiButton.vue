<template>
  <div
    :class="classes"
    v-bind="$attrs"
    @click="handleClick"
    :style="ctaGradientStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <!-- Icon before -->
    <span
      v-if="icon && iconPosition === 'before'"
      :class="iconSpacingClasses.before"
      class="transition-transform duration-300"
      :style="iconTransform"
    >
      <slot name="icon" />
    </span>

    <!-- Button text -->
    <span class="transition-transform duration-300 relative" :style="textTransform">
      <slot />

      <!-- CTA shine effect -->
      <div
        v-if="variant === 'cta'"
        class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transition-all duration-700"
        :class="{ 'translate-x-full': isShining, '-translate-x-full': !isShining }"
      ></div>
    </span>

    <!-- Icon after -->
    <span
      v-if="icon && iconPosition === 'after'"
      :class="iconSpacingClasses.after"
      class="transition-transform duration-300"
      :style="iconTransform"
    >
      <slot name="icon" />
    </span>

    <!-- CTA pulse rings -->
    <div
      v-if="variant === 'cta'"
      class="absolute inset-0 rounded-full opacity-75 animate-ping"
      :class="ctaPulseClass"
    ></div>
    <div
      v-if="variant === 'cta'"
      class="absolute inset-0 rounded-full opacity-50 animate-ping"
      :class="ctaPulseClass"
      style="animation-delay: 0.5s"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'

type Variant = 'primary' | 'secondary' | 'text' | 'cta'
type IconPosition = 'before' | 'after'
type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

interface Props {
  variant?: Variant
  size?: Size
  icon?: boolean
  iconPosition?: IconPosition
  onClick?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  icon: false,
  iconPosition: 'before',
})

const isClicked = ref(false)
const isHovered = ref(false)
const isShining = ref(false)

// Auto-shine effect for CTA buttons
onMounted(() => {
  if (props.variant === 'cta') {
    const shineInterval = setInterval(() => {
      isShining.value = true
      setTimeout(() => {
        isShining.value = false
      }, 200)
    }, 5000)

    // Clean up interval if component unmounts
    return () => clearInterval(shineInterval)
  }
})

/**
 * Size styles
 */
const sizeClasses = computed(() => {
  const sizes: Record<Size, string> = {
    xs: 'px-2 py-1 text-xs',
    sm: 'px-3 py-1.5 text-sm rounded-full',
    md: 'px-4 py-2 text-base rounded-full',
    lg: 'px-5 py-2.5 text-lg rounded-full',
    xl: 'px-6 py-3 text-xl rounded-full',
  }
  return sizes[props.size]
})

/**
 * Icon spacing based on size
 */
const iconSpacingClasses = computed(() => {
  const spacing: Record<Size, { before: string; after: string }> = {
    xs: { before: 'mr-1 items-center', after: 'ml-1 items-center' },
    sm: { before: 'mr-1.5 items-center', after: 'ml-1.5 items-center' },
    md: { before: 'mr-2 items-center', after: 'ml-2 items-center' },
    lg: { before: 'mr-2.5 items-center', after: 'ml-2.5 items-center' },
    xl: { before: 'mr-3 items-center', after: 'ml-3 items-center' },
  }
  return spacing[props.size]
})

/**
 * CTA gradient style for dynamic background
 */
const ctaGradientStyle = computed(() => {
  if (props.variant !== 'cta') return {}

  return {
    background: isHovered.value
      ? 'linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3)'
      : 'linear-gradient(45deg, #667eea, #764ba2)',
    backgroundSize: '300% 300%',
    animation: isHovered.value ? 'gradient 2s ease infinite' : 'none',
  }
})

/**
 * CTA pulse ring classes
 */
const ctaPulseClass = computed(() => {
  return 'bg-gradient-to-r from-purple-400 to-pink-400'
})

/**
 * Click animation transforms
 */
const textTransform = computed(() => {
  if (!isClicked.value) return {}
  return {
    transform: 'scale(0.95)',
  }
})

const iconTransform = computed(() => {
  if (!isClicked.value) return {}
  return {
    transform:
      props.iconPosition === 'before'
        ? 'translateX(-2px) scale(0.9)'
        : 'translateX(2px) scale(0.9)',
  }
})

/**
 * Variant styles
 */
const classes = computed(() => {
  const base =
    'relative overflow-hidden flex flex-row gap-2 cursor-pointer items-center justify-center font-medium focus:outline-none transition-all duration-500 ease-in-out transform active:scale-95'

  const variants: Record<Variant, string> = {
    primary:
      'bg-black text-white border-2 border-black/30  hover:border-primary hover:shadow-black/70 hover:shadow-2xl hover:scale-105 ',
    secondary:
      'font-epilogue border-2 border-black/30 text-gray-900 hover:bg-gray-100 hover:scale-105 hover:shadow-lg',
    text: 'bg-transparent text-blue-600 hover:underline hover:text-blue-800',
    cta: 'text-white font-bold shadow-2xl hover:shadow-pink-500/50 hover:scale-110 transform-gpu animate-pulse hover:animate-none border-2 border-white/20',
  }

  return [base, variants[props.variant], sizeClasses.value].join(' ')
})

const handleClick = () => {
  isClicked.value = true

  // Reset click animation after duration
  setTimeout(() => {
    isClicked.value = false
  }, 150)

  if (props.onClick) {
    props.onClick()
  }
}

const handleMouseEnter = () => {
  isHovered.value = true
}

const handleMouseLeave = () => {
  isHovered.value = false
}
</script>

<style scoped>
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Enhanced pulse animation for CTA */
@keyframes enhanced-pulse {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.05);
  }
}

.animate-enhanced-pulse {
  animation: enhanced-pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>

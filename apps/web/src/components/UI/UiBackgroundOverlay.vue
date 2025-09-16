<!-- src/components/BgCirclesOverlay.vue -->
<template>
  <div
    class="absolute top-0 left-0 z-0 h-full w-full flex flex-row items-center justify-center overflow-hidden pointer-events-none"
  >
    <!-- wrapper to keep circle coords relative to the container -->
    <div class="">
      <!-- Circle 1 (top-left on the 45deg diagonal) -->
      <div class="rounded-full" :style="circle1Style" aria-hidden="true" />

      <!-- Circle 2 (bottom-right on the 45deg diagonal) -->
      <div class="rounded-full -mt-32 ml-24" :style="circle2Style" aria-hidden="true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

/**
 * Tweak these values if you want different sizes or positions.
 *
 * Explanation of approach:
 * - Each circle is sized as a vmin value so it scales with viewport (responsive).
 * - The circles' centers are placed along a 45° diagonal by using left/top for circle1
 *   and right/bottom for circle2. That makes them overlap at a 45° line.
 * - Sizes + offsets chosen so at least ~60% of each circle remains visible inside the container.
 */

const size = '300px' // circle diameter; adjust to be larger/smaller
// conceptual (we tuned offsets to keep ~60% visible)
// const visibleMarginPercent = 0.6

/* Circle 1: place toward top-left along a diagonal */
const circle1Style = computed(() => {
  return {
    width: size,
    height: size,
    left: '8%', // shift from left (keeps most of circle inside)
    top: '12%', // shift from top
    transform: 'translate(0, 0) rotate(0deg)',

    /* radial gradient using primary color (#3e8784) */
    background:
      'radial-gradient(circle at 30% 30%, rgba(62,135,132,0.95) 0%, rgba(62,135,132,0.9) 45%, rgba(62,135,132,0.7) 100%)',
    boxShadow: '0 30px 80px rgba(17,24,39,0.35)',
  }
})

/* Circle 2: place toward bottom-right along same diagonal */
const circle2Style = computed(() => {
  return {
    width: size,
    height: size,
    right: '8%', // shift from right
    bottom: '12%', // shift from bottom
    transform: 'translate(0, 0) rotate(0deg)',

    /* radial gradient using secondary color (#d2ffcf) */
    background:
      'radial-gradient(circle at 70% 70%, rgba(210,255,207,0.95) 0%, rgba(210,255,207,0.9) 45%, rgba(210,255,207,0.7) 100%)',
    boxShadow: '0 30px 80px rgba(2,6,23,0.3)',
  }
})
</script>

<style scoped>
/* make sure rounded-full + exact sizes produce perfect circles */
div[style] {
  /* ensure element is circular and doesn't collapse */
  min-width: 0;
  min-height: 0;
}

/* ensure our absolute circle elements are block-level to honor width/height */
.absolute.rounded-full {
  display: block;
}

/* Optional: if you'd like a rotated visual angle, you can uncomment transform rotates */
/* .rotate-45 { transform: rotate(45deg); } */
</style>

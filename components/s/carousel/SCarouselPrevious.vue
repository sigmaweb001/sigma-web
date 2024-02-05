<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollPrev, scrollPrev } = useCarousel()
</script>

<template>
  <SButton
    :disabled="!canScrollPrev" class="absolute flex-center touch-manipulation size-40px! rounded-full! p-0!" :class="[
      orientation === 'horizontal'
        ? '-left-16 top-1/2 -translate-y-1/2'
        : '-top-16 left-1/2 -translate-x-1/2 rotate-90']" variant="outline" @click="scrollPrev"
  >
    <slot>
      <div class="i-ri:arrow-left-s-line text-24px" />
    </slot>
  </SButton>
</template>

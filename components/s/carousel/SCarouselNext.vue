<script setup lang="ts">
import { useCarousel } from './useCarousel'
import type { WithClassAsProps } from './interface'

const props = defineProps<WithClassAsProps>()

const { orientation, canScrollNext, scrollNext } = useCarousel()
</script>

<template>
  <SButton
    :disabled="!canScrollNext" class="absolute flex-center touch-manipulation size-40px! rounded-full! p-0!" :class="[
      orientation === 'horizontal'
        ? '-right-16 top-1/2 -translate-y-1/2'
        : '-bottom-16 left-1/2 -translate-x-1/2 rotate-90',
      props.class,
    ]" variant="outline" @click="scrollNext"
  >
    <slot>
      <div class="i-ri:arrow-right-s-line text-24px" />
    </slot>
  </SButton>
</template>

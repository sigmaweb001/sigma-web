<script setup lang="ts">

const card = ref<HTMLDivElement>();
const { elementX, elementY } = useMouseInElement(card);
</script>

<template>
  <div ref="card" :style="{
    '--x': `${elementX}px`,
    '--y': `${elementY}px`,
  }"
    class="border-gradient group relative rounded-xl before:absolute before:content-empty before:inset--2px before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:rounded-xl">
    <div class="absolute wrapper inset-0 rounded-[11px] transition-colors duration-300"></div>

    <slot />
  </div>
</template>

<style>
.border-gradient::before {
  background: radial-gradient(154px circle at var(--x) var(--y),
      $dt('color.primary.500') 0,
      $dt('color.secondary.300') 95%,
      transparent 100%);
}

.wrapper {
  --un-gradient-to: $dt('color.gray.800');
  --un-gradient-from: $dt('color.gray.700');
  --un-gradient-stops: var(--un-gradient-from),$dt('color.gray.900'),var(--un-gradient-to);
  background-image: radial-gradient(at 0% 100%,var(--un-gradient-stops));
}
</style>

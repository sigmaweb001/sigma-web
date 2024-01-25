<script lang="ts" setup>
defineProps<{
  left?: boolean
}>()

defineSlots<{
  default?: () => any
  subtitle?: () => any
  title?: () => any
}>()
</script>

<template>
  <div class="" :class="`container flex w-full flex-col my-10 ${left ? '' : 'items-center justify-center text-center'}`">
    <div v-if="$slots.subtitle" class="text-lg text-primary font-bold tracking-wider uppercase">
      <ContentSlot :use="$slots.subtitle" unwrap="p" />
    </div>

    <h2
      v-if="$slots.title"
      class="mt-1 max-w-2xl text-3xl text-gray-800 font-bold leading-snug tracking-tight lg:text-4xl dark:text-white lg:leading-tight"
    >
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h2>
    <div v-if="$slots.default" class="max-w-2xl py-2 text-start text-lg prose prose-trueGray lg:text-xl xl:text-xl dark:prose-invert">
      <slot />
    </div>
  </div>
</template>

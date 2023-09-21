<script lang="ts" setup>
defineProps<{
  align?: 'left'
  title: string
  pretitle: string
}>()
</script>

<template>
  <div
    :class="`container flex w-full flex-col mt-10 ${align === 'left' ? '' : 'items-center justify-center text-center'}`"
  >
    <template v-if="pretitle">
      <div class="text-lg font-bold tracking-wider uppercase text-primary">
        {{ pretitle }}
      </div>
    </template>

    <template v-if="title">
      <h2
        class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white"
      >
        {{ title }}
      </h2>
    </template>

    <template v-if="$slots.default">
      <p class="max-w-2xl py-4 text-lg leading-normal text-gray-500 lg:text-xl xl:text-xl dark:text-gray-300">
        <slot />
      </p>
    </template>
  </div>
</template>

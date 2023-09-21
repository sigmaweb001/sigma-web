<script lang="ts" setup>
defineProps<{
  item: {
    align?: 'left'
    title: string
    pretitle: string
    description: string
  }
}>()
</script>

<template>
  <div
    class=""
    :class="`container flex w-full flex-col mt-10 ${item.align === 'left' ? '' : 'items-center justify-center text-center'}`"
  >
    <template v-if="item.pretitle">
      <div class="text-lg font-bold tracking-wider uppercase text-primary">
        {{ item.pretitle }}
      </div>
    </template>

    <template v-if="item.title">
      <h2
        class="mt-3 max-w-2xl text-3xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight dark:text-white"
      >
        {{ item.title }}
      </h2>
    </template>

    <template v-if="item.description">
      <SSanityContent :blocks="item.description" class="max-w-2xl py-2 text-start text-lg prose prose-gray lg:text-xl xl:text-xl" />
    </template>
  </div>
</template>

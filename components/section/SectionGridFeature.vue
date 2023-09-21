<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    items: {
      icon: any
      description: string
      title: string
    }[]
    size: number
    title?: string
  }
}>()
</script>

<template>
  <div class="my-10 gap-24px container">
    <div v-if="data.title" class="mb-4 text-xl font-bold leading-snug tracking-tight text-gray-800 lg:text-2xl lg:leading-tight dark:text-white">
      <p>{{ data.title }}</p>
    </div>
    <div
      class="grid grid-cols-[repeat(var(--size),minmax(0,1fr))] mx-auto gap-24px" :style="{
        '--size': data.size || 3,
      }"
    >
      <div
        v-for="(item, i) in data.items" :key="i"
        class="grid content-start rounded-2xl bg-gray-100 p-6 px-10 py-10 dark:bg-trueGray-800"
      >
        <div class="mx-auto h-60px w-60px flex-center border border-primary-300/50 rounded-lg p-2">
          <i :class="item.icon" class="text-24px text-primary" />
        </div>
        <h4 class="mt-4 text-center font-medium text-gray-800 dark:text-gray-200">
          {{ item.title }}
        </h4>
        <SSanityContent :blocks="item.description" class="prose-li-sigma text-start prose-gray" />
      </div>
    </div>
  </div>
</template>

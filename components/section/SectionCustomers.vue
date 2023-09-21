<script lang="ts" setup>
const { data } = definePropsRefs<{
  data: {
    items: {
      icon: any
      description: string
      title: string
    }[]
  }
}>()
</script>

<template>
  <div class="my-10 rounded-lg bg-gray-200 container dark:bg-trueGray-800">
    <div class="grid grid-cols-2 gap-5">
      <div v-for="(item, i) in data.items" :key="i" class="flex items-center gap-4 p-5">
        <div class="h-60px w-60px flex-center flex-shrink-0 rounded-full bg-gray-100 text-primary dark:bg-trueGray-700">
          <i :class="item.icon" class="text-24px text-primary" />
        </div>
        <p class="mt-1 text-balance text-base text-gray-600 dark:text-gray-400">
          {{ item.title }}
        </p>
      </div>
    </div>
  </div>
</template>

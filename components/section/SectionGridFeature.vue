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
  <div class="grid grid-cols-3 my-10 gap-24px container">
    <div v-for="(item, i) in data.items" :key="i" class="grid justify-items-center rounded-2xl bg-gray-100 p-6 px-10 py-10 text-center dark:bg-trueGray-800">
      <div class="h-60px w-60px flex-center border border-primary-300/50 rounded-lg p-2">
        <i :class="item.icon" class="text-24px text-primary" />
      </div>
      <h4 class="mt-4 text-xl font-medium text-gray-800 dark:text-gray-200">
        {{ item.title }}
      </h4>
      <p class="mt-1 text-balance text-sm text-gray-500 dark:text-gray-400">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

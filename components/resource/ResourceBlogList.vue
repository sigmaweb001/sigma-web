<script lang="ts" setup>
const { data, loading } = definePropsRefs<{
  data: any[]
  loading?: boolean
  title: string
}>()
</script>

<template>
  <h1 class="py-10 text-center text-4xl font-bold dark:text-white">
    {{ title }}
  </h1>
  <div class="grid mt-5 gap-6 px-6 md:grid-cols-3 lg:gap-6">
    <template v-if="loading">
      <div v-for="item in 3" :key="item" class="h-300px animate-pulse rounded-md bg-gray-100/75 dark:bg-gray-900/75" />
    </template>
    <template v-else-if="!data?.length">
      <div class="col-span-3 flex-center flex-col py-10">
        <div class="i-ri:box-1-line text-30px" />
        <h2 class="mt-4 text-center text-2xl font-bold dark:text-white">
          No data
        </h2>
      </div>
    </template>
    <template v-else>
      <template v-for=" item in data " :key="item._id">
        <ResourceItem v-if="item._type === 'resource'" :item="item" />
        <BlogsItem v-if="item._type === 'blog'" :post="item" aspect="landscape" />
      </template>
    </template>
  </div>
</template>

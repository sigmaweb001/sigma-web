<script lang="ts" setup>
const { path } = definePropsRefs<{ path: string }>()
const { data: item } = await useAsyncData(`section-resource-item:${path.value}`, () => queryContent('resources').where({
  _path: {
    $eq: path.value,
  },
}).findOne())
</script>

<template>
  <SCarouselItem v-if="item" class="lg:basis-1/4 md:basis-1/3">
    <ResourceItemImp v-if="item.type === 'resource'" class="h-full" :item="item" />
    <BlogItem v-else :item="item" class="h-full" />
  </SCarouselItem>
</template>

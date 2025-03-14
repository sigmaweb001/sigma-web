<script lang="ts" setup>
const props = defineProps<{
  path: string
}>()

const { path } = toRefs(props)

const { data: item } = await useAsyncData(
  `resources:${path.value}`,
  () => queryCollection('content').where('path', '=', path.value).first(),
)
</script>

<template>
  <SCarouselItem
    v-if="item"
    class="lg:basis-1/4 md:basis-1/3"
  >
    <ResourceItemImp
      v-if="item.type === 'resource'"
      class="h-full"
      :item="item"
    />
    <BlogItem
      v-else
      :item="item"
      class="h-full"
    />
  </SCarouselItem>
</template>

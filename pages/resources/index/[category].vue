<script lang="ts" setup>
const { category } = definePropsRefs<{
  category: any
}>()
const slug = eagerComputed(() => useRoute().params.category)

const { data, pending } = await useSanityData(resourceByCategoryQuery, { slug: slug.value })
</script>

<template>
  <ResourceBlogList :title="category?.title" :data="data" :loading="pending" />
</template>

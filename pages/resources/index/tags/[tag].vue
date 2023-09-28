<script lang="ts" setup>
const { tag } = definePropsRefs<{
  tag: string
}>()
const slug = eagerComputed(() => useRoute().params.tag)

const { data, pending } = await useSanityData(resourceByTagQuery, { slug: slug.value })
</script>

<template>
  <ResourceBlogList :title="tag?.title ? `Tag: ${tag?.title}` : ''" :data="data" :loading="pending" />
</template>

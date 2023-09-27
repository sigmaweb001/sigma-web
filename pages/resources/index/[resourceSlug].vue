<script lang="ts" setup>
const slug = eagerComputed(() => useRoute().params.resourceSlug)

const resourceMap = {
  blog: blogResourceQuery,
  resource: resourceResourceQuery,
}
const { data } = await useSanityData(resourceMap[slug.value])
</script>

<template>
  <ResourceBlogList :data="data" />
</template>
